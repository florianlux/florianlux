import type { Metadata } from "next";
import { identity } from "./site-data";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  locale = "en_US",
): Metadata {
  const shareTitle = `${title} — ${identity.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: shareTitle,
      description,
      url: path,
      locale,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Florian Lux — Building what’s next.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
