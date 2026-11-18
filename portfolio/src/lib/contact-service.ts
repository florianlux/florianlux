// Node-only delivery boundary. No caller-supplied recipient, sender, endpoint or secret.
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { isIP } from "node:net";
import { validateContact, type ContactMessage } from "./contact-policy";

type Environment = Record<string, string | undefined>;
type ContactConfig = { origin: string; sender: string; apiKey: string; redisUrl: string; redisToken: string; secret: string; ipHeader: string };
const recipient = "mngmt@synapedia.com";
const ttlSeconds = 600;
const maxBodyBytes = 24_000;
const responseHeaders = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
const rateScript = "local n=redis.call('INCR',KEYS[1]);if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end;return {n,redis.call('TTL',KEYS[1])}";

export function contactConfiguration(env: Environment, reviewed = false): ContactConfig | null {
  if (!reviewed || env.CONTACT_DELIVERY_ENABLED !== "true" || env.CONTACT_PROVIDER !== "brevo" || env.CONTACT_SENDER_VERIFIED !== "true" || env.CONTACT_TRUSTED_PROXY_VERIFIED !== "true") return null;
  const values = { origin: env.CONTACT_ORIGIN, sender: env.CONTACT_FROM_EMAIL, apiKey: env.CONTACT_BREVO_API_KEY, redisUrl: env.CONTACT_REDIS_REST_URL, redisToken: env.CONTACT_REDIS_REST_TOKEN, secret: env.CONTACT_ABUSE_SECRET, ipHeader: env.CONTACT_TRUSTED_IP_HEADER };
  if (Object.values(values).some(value => !value?.trim())) return null;
  const config = values as ContactConfig;
  try {
    const origin = new URL(config.origin), redis = new URL(config.redisUrl);
    if (origin.protocol !== "https:" || origin.username || origin.password || origin.origin !== config.origin) return null;
    if (redis.protocol !== "https:" || !redis.hostname.endsWith(".upstash.io") || redis.username || redis.password || redis.pathname !== "/" || redis.search || redis.hash) return null;
  } catch { return null; }
  if (config.secret.length < 32 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(config.sender)) return null;
  if (!["x-nf-client-connection-ip", "x-vercel-forwarded-for"].includes(config.ipHeader)) return null;
  return config;
}

function digest(config: ContactConfig, value: string) { return createHmac("sha256", config.secret).update(value).digest("hex"); }
export function makeChallenge(config: ContactConfig, now = Date.now()) {
  const payload = `${now}.${randomBytes(18).toString("hex")}`;
  return `${payload}.${digest(config, payload)}`;
}
export function validChallenge(config: ContactConfig, token: unknown, now = Date.now()) {
  if (typeof token !== "string" || !/^\d{13}\.[a-f0-9]{36}\.[a-f0-9]{64}$/.test(token)) return false;
  const [timestamp, nonce, signature] = token.split(".");
  const age = now - Number(timestamp);
  return age >= 1200 && age <= ttlSeconds * 1000 && timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(digest(config, `${timestamp}.${nonce}`), "hex"));
}

export function providerPayload(config: ContactConfig, data: ContactMessage, token: string) {
  return { sender: { email: config.sender, name: "Florian Lux Portfolio" }, to: [{ email: recipient, name: "Florian Lux" }], replyTo: { email: data.email, name: data.name }, subject: `[Portfolio / ${data.category}] ${data.subject}`, textContent: `Name: ${data.name}\nReply email: ${data.email}\nTopic: ${data.category}\n\n${data.message}`, headers: { "Idempotency-Key": digest(config, token) } };
}

export function createContactService(config: ContactConfig | null, requestFetch: typeof fetch = fetch, now = Date.now) {
  const json = (status: number, code: string, extra: Record<string, unknown> = {}, headers: Record<string, string> = {}) => Response.json({ code, ...extra }, { status, headers: { ...responseHeaders, ...headers } });
  async function redis(command: string[]) {
    const response = await requestFetch(config!.redisUrl, { method: "POST", headers: { Authorization: `Bearer ${config!.redisToken}`, "Content-Type": "application/json" }, body: JSON.stringify(command), signal: AbortSignal.timeout(5000), redirect: "error" });
    if (!response.ok) throw new Error("Limiter unavailable");
    const data = await response.json();
    if (data.error || !("result" in data)) throw new Error("Invalid limiter response");
    return data.result;
  }
  async function limit(ip: string, scope: string, max: number) {
    const result = await redis(["EVAL", rateScript, "1", `portfolio:contact:v1:${scope}:${digest(config!, ip)}`, String(ttlSeconds)]);
    if (!Array.isArray(result) || !Number.isInteger(result[0]) || !Number.isInteger(result[1]) || result[0] < 1 || result[1] < 0) throw new Error("Invalid limiter result");
    return { allowed: result[0] <= max, retry: Math.max(1, result[1]) };
  }
  function clientIp(request: Request) {
    const value = request.headers.get(config!.ipHeader)?.trim() || "";
    return isIP(value) ? value : null;
  }
  async function readBody(request: Request) {
    if (Number(request.headers.get("content-length") || 0) > maxBodyBytes || !request.body) return null;
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = []; let length = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const deadline = new Promise<never>((_, reject) => { timer = setTimeout(() => { void reader.cancel(); reject(new Error("Body read timeout")); }, 5000); });
    try {
      while (true) {
        const { value, done } = await Promise.race([reader.read(), deadline]); if (done) break;
        length += value.byteLength;
        if (length > maxBodyBytes) { await reader.cancel(); return null; }
        chunks.push(value);
      }
    } finally { clearTimeout(timer); }
    try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); } catch { return null; }
  }
  return {
    async challenge(request: Request) {
      if (!config) return json(503, "unavailable");
      if (request.headers.get("origin") && request.headers.get("origin") !== config.origin) return json(403, "origin_rejected");
      const ip = clientIp(request); if (!ip) return json(503, "unavailable");
      try {
        const result = await limit(ip, "challenge", 20);
        return result.allowed ? json(200, "challenge", { token: makeChallenge(config, now()) }) : json(429, "rate_limited", {}, { "Retry-After": String(result.retry) });
      } catch { return json(503, "unavailable"); }
    },
    async submit(request: Request) {
      if (!config) return json(503, "unavailable");
      if (request.headers.get("origin") !== config.origin) return json(403, "origin_rejected");
      if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return json(415, "json_required");
      const ip = clientIp(request); if (!ip) return json(503, "unavailable");
      try {
        const result = await limit(ip, "submit", 5);
        if (!result.allowed) return json(429, "rate_limited", {}, { "Retry-After": String(result.retry) });
        const body = await readBody(request);
        if (!body || typeof body !== "object") return json(400, "invalid_request");
        if (body.website || !validChallenge(config, body.token, now())) return json(400, "invalid_challenge");
        const valid = validateContact(body);
        if (!valid.ok) return json(422, "invalid_fields", { errors: valid.errors });
        const claimed = await redis(["SET", `portfolio:contact:v1:request:${digest(config, body.token)}`, "claimed", "NX", "EX", String(ttlSeconds)]);
        if (claimed === null) return json(409, "already_processed");
        if (claimed !== "OK") return json(503, "unavailable");
        const sent = await requestFetch("https://api.brevo.com/v3/smtp/email", { method: "POST", headers: { "Content-Type": "application/json", "api-key": config.apiKey }, body: JSON.stringify(providerPayload(config, valid.data, body.token)), signal: AbortSignal.timeout(8000), redirect: "error" });
        if (!sent.ok) return json(502, "delivery_not_confirmed");
        const accepted = await sent.json();
        if (typeof accepted.messageId !== "string" || !accepted.messageId) return json(502, "delivery_not_confirmed");
        return json(202, "accepted");
      } catch { return json(503, "unavailable"); }
    },
  };
}
