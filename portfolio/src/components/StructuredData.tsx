import { identity, type Project } from "@/app/site-data";
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function PersonSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${identity.origin}/#person`,
        name: identity.name,
        url: identity.origin,
        description: identity.description,
        jobTitle: "Developer, Founder, Creative Technologist",
        sameAs: [identity.github, identity.linkedin, identity.instagram],
        knowsAbout: [
          "Software engineering",
          "Information architecture",
          "Knowledge systems",
        ],
      }}
    />
  );
}
export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${identity.origin}/#website`,
        name: identity.name,
        url: identity.origin,
        inLanguage: "en",
        description: identity.description,
        creator: { "@id": `${identity.origin}/#person` },
      }}
    />
  );
}
export function ProjectSchema({ project }: { project: Project }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${identity.origin}${project.href}#project`,
        name: project.name,
        url: `${identity.origin}${project.href}`,
        description: project.description,
        creativeWorkStatus: project.status,
        creator: {
          "@type": "Person",
          "@id": `${identity.origin}/#person`,
          name: identity.name,
          url: identity.origin,
        },
        citation: project.evidence.href,
      }}
    />
  );
}
export function ProfessionalServiceSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${identity.origin}/websites#service`,
        name: "Florian Lux Websites",
        url: `${identity.origin}/websites`,
        description:
          "Moderne Websites für lokale Unternehmen, Selbstständige und kleine Marken — persönlich umgesetzt von Florian Lux.",
        founder: {
          "@type": "Person",
          "@id": `${identity.origin}/#person`,
          name: identity.name,
        },
        areaServed: "Germany",
        serviceType: [
          "Website Design",
          "Webentwicklung",
          "Responsive Webdesign",
          "SEO Basics",
        ],
      }}
    />
  );
}
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${identity.origin}${item.href}`,
        })),
      }}
    />
  );
}

export function ProfilePageSchema() {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", "@id": `${identity.origin}/about#profile`, url: `${identity.origin}/about`, name: `${identity.name} — About`, mainEntity: { "@type": "Person", "@id": `${identity.origin}/#person`, name: identity.name, url: identity.origin } }} />;
}
