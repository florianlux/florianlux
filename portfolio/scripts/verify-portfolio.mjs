import assert from "node:assert/strict";

const base = process.argv[2] || "http://127.0.0.1:3037";
const publicOrigin = "https://florianlux.dev";
const routes = [
  "/",
  "/about",
  "/impressum",
  "/datenschutz",
  "/contact",
  "/projects",
  "/projects/synapedia",
  "/projects/suite",
  "/projects/luxlabs",
  "/projects/neurocodex",
  "/websites",
  "/journal",
  "/journal/designing-for-clarity",
  "/journal/motion-as-an-enhancement",
  "/journal/show-the-evidence",
];
const failures = [];
const preview = process.env.PORTFOLIO_PUBLICATION_MODE !== "public";
for (const route of routes) {
  try {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200, "route status");
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("x-frame-options"), "DENY");
    assert.equal(response.headers.get("referrer-policy"), "no-referrer");
    if (preview) assert.match(response.headers.get("x-robots-tag"), /noindex/);
    const csp = response.headers.get("content-security-policy");
    assert.match(csp, /default-src 'self'/);
    assert.match(csp, /connect-src 'self'/);
    assert.ok(!csp.includes("'unsafe-eval'"), "no production eval");
    assert.equal(response.headers.get("x-powered-by"), null);
    assert.match(
      response.headers.get("content-security-policy"),
      /frame-ancestors 'none'/,
    );
    const html = await response.text();
    for (const match of html.matchAll(/href="mailto:([^"?]+)/g)) assert.equal(match[1], "mngmt@synapedia.com", "central management recipient");
    assert.equal(
      (html.match(/<h1[\s>]/g) || []).length,
      1,
      "one primary heading",
    );
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(
      new URL(canonical).href,
      new URL(publicOrigin + route).href,
      "correct canonical",
    );
    assert.ok(
      html.includes('name="twitter:card" content="summary_large_image"'),
      "Twitter card",
    );
    assert.ok(html.includes('property="og:image"'), "Open Graph image");
    assert.ok(html.includes('name="twitter:image"'), "Twitter image");
    const schemas = [
      ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g),
    ].map((match) => JSON.parse(match[1]));
    assert.ok(schemas.length, "parseable structured data");
    if (route === "/") {
      const person = schemas.find((schema) => schema["@type"] === "Person");
      assert.ok(person?.["@id"]?.endsWith("/#person"));
      assert.ok(
        !person.sameAs.includes("https://synapedia.com"),
        "project is distinct from person",
      );
      assert.equal(
        schemas.find((schema) => schema["@type"] === "WebSite").creator["@id"],
        person["@id"],
      );
    }
    if (route.startsWith("/projects/"))
      assert.ok(schemas.some((schema) => schema["@type"] === "CreativeWork"));
    if (route.startsWith("/journal/"))
      assert.ok(schemas.some((schema) => schema["@type"] === "Article"));
    if (route === "/websites")
      assert.ok(html.includes('lang="de"'), "German service content marked");
  } catch (error) {
    failures.push({ route, error: error.message });
  }
}
try {
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  assert.equal(locations.length, preview ? 0 : routes.length, "sitemap route count");
  assert.equal(
    new Set(locations).size,
    locations.length,
    "no duplicate sitemap entries",
  );
  for (const route of preview ? [] : routes)
    assert.ok(
      locations.includes(`${publicOrigin}${route === "/" ? "" : route}`),
    );
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  assert.ok(robots.includes(`Sitemap: ${publicOrigin}/sitemap.xml`));
  if (preview) assert.ok(robots.includes("Disallow: /"));
  for (const method of ["GET", "POST"]) {
    const response = await fetch(`${base}/api/contact`, { method, ...(method === "POST" ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "QA" }) } : {}) });
    assert.equal(response.status, 503, "unconfigured form must be closed");
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.deepEqual(await response.json(), { code: "unavailable" });
  }
  const image = await fetch(`${base}/opengraph-image`);
  assert.equal(image.status, 200);
  assert.match(image.headers.get("content-type"), /image\/png/);
  for (const route of ["/missing-page", "/journal/missing-note"])
    assert.equal((await fetch(`${base}${route}`)).status, 404);
} catch (error) {
  failures.push({ route: "metadata and 404s", error: error.message });
}
console.log(
  JSON.stringify({ routesChecked: routes.length, failures }, null, 2),
);
if (failures.length) process.exitCode = 1;
