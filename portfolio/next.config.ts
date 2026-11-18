import type { NextConfig } from "next";
import { checkPublication } from "./scripts/check-public-release.mjs";

// Applies to direct Next commands too. Preview indexing is not an access control;
// remote previews additionally require verified host-level authentication.
checkPublication();
const preview = process.env.PORTFOLIO_PUBLICATION_MODE !== "public";
const development = process.env.NODE_ENV === "development";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${development ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${development ? " ws://localhost:* ws://127.0.0.1:*" : ""}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' mailto:",
].join("; ");
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { remotePatterns: [], formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "no-referrer" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
      { key: "Content-Security-Policy", value: csp },
      ...(preview ? [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] : []),
      ...(!preview && process.env.PORTFOLIO_HSTS_ENABLED === "true" ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }] : []),
    ] }];
  },
};
export default nextConfig;
