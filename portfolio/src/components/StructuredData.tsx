export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Florian Lux",
    url: "https://florianlux.dev",
    jobTitle: "Knowledge Systems Builder",
    description:
      "Florian Lux builds knowledge systems, intelligence platforms and structured information products.",
    knowsAbout: [
      "Knowledge Architecture",
      "Information Architecture",
      "Data Modeling",
      "Knowledge Systems",
      "Structured Content",
      "Intelligence Platforms",
    ],
    sameAs: [
      "https://github.com/florianlux",
      "https://linkedin.com/in/florian-lux-75a198258",
      "https://synapedia.com",
    ],
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
    url: "https://florianlux.dev",
    description:
      "Personal website of Florian Lux — knowledge systems builder for structured information products.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProfessionalServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Florian Lux Websites",
    url: "https://florianlux.dev/websites",
    description:
      "Moderne Websites für lokale Unternehmen, Selbstständige und kleine Marken - persönlich umgesetzt von Florian Lux.",
    founder: {
      "@type": "Person",
      name: "Florian Lux",
      jobTitle: "Fachinformatiker und Webentwickler",
      url: "https://florianlux.dev",
    },
    areaServed: "Germany",
    serviceType: [
      "Website Design",
      "Webentwicklung",
      "Responsive Webdesign",
      "SEO Basics",
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Starter Website",
        priceCurrency: "EUR",
        price: "299",
      },
      {
        "@type": "Offer",
        name: "Business Website",
        priceCurrency: "EUR",
        price: "599",
      },
      {
        "@type": "Offer",
        name: "Premium Website",
        priceCurrency: "EUR",
        price: "999",
      },
    ],
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
