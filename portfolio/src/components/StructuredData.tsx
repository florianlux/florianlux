export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Florian Lux",
    url: "https://florianlux.dev",
    jobTitle: "Builder digitaler Systeme",
    description:
      "Florian Lux entwickelt intelligente digitale Systeme an der Schnittstelle von Wissen, Design und Technologie.",
    knowsAbout: [
      "Product Architecture",
      "SEO Systems",
      "Data Modeling",
      "Fullstack Development",
      "UI Systems",
    ],
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Florian Lux",
    url: "https://florianlux.work",
    description:
      "Persönliche Website von Florian Lux — Builder digitaler Systeme, Produkte & Wissensplattformen.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://florianlux.dev${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
