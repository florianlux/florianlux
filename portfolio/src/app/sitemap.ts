import type { MetadataRoute } from "next";
import { isPublicRelease } from "./publication";
import { identity, projects, journal, editorialDate } from "./site-data";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublicRelease) return [];
  return [
    "",
    "/about",
    "/projects",
    ...projects.map((project) => project.href),
    "/journal",
    ...journal.map((entry) => `/journal/${entry.slug}`),
    "/websites",
    "/contact",
    "/impressum",
    "/datenschutz",
  ].map((path) => ({
    url: `${identity.origin}${path}`,
    lastModified: editorialDate,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.startsWith("/projects/") ? 0.8 : 0.6,
  }));
}
