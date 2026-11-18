import { pageMetadata } from "@/app/page-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journal, identity, editorialDate } from "@/app/site-data";
import { BreadcrumbSchema, JsonLd } from "@/components/StructuredData";
export const dynamicParams = false;
export function generateStaticParams() {
  return journal.map((entry) => ({ slug: entry.slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = journal.find((item) => item.slug === slug);
  if (!entry) notFound();
  return pageMetadata(entry.title, entry.intro, `/journal/${entry.slug}`);
}
export default async function JournalArticle({ params }: Props) {
  const { slug } = await params;
  const entry = journal.find((item) => item.slug === slug);
  if (!entry) notFound();
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Journal", href: "/journal" },
          { name: entry.title, href: `/journal/${entry.slug}` },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: entry.title,
          description: entry.intro,
          datePublished: editorialDate,
          dateModified: editorialDate,
          author: {
            "@type": "Person",
            name: identity.name,
            "@id": `${identity.origin}/#person`,
          },
          mainEntityOfPage: `${identity.origin}/journal/${entry.slug}`,
          image: `${identity.origin}/opengraph-image`,
        }}
      />
      <article className="section-shell article-shell">
        <header className="page-hero">
          <Link href="/journal" className="text-link">
            ← All notes
          </Link>
          <p className="eyebrow">{entry.category} / Build note</p>
          <h1>{entry.title}</h1>
          <p className="page-intro">{entry.intro}</p>
          <p className="article-date">
            Portfolio implementation note ·{" "}
            <time dateTime={editorialDate}>11 October 2026</time>
          </p>
        </header>
        <div className="editorial-copy">
          {entry.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
        <nav className="article-next" aria-label="More journal notes">
          {journal
            .filter((item) => item.slug !== slug)
            .map((item) => (
              <Link
                href={`/journal/${item.slug}`}
                className="text-link"
                key={item.slug}
              >
                {item.title} ↗
              </Link>
            ))}
        </nav>
      </article>
    </>
  );
}
