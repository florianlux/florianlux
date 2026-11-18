import type { MetadataRoute } from "next";
import { isPublicRelease } from "./publication";
import { identity } from "./site-data";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: isPublicRelease ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${identity.origin}/sitemap.xml`,
    host: identity.origin,
  };
}
