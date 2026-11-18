import { pageMetadata } from "@/app/page-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { journal } from "@/app/site-data";
export const metadata: Metadata = pageMetadata(
  "Journal",
  "Notes on engineering, design and thoughtful product development, drawn from this portfolio’s implementation.",
  "/journal",
);
export default function JournalPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Journal", href: "/journal" },
        ]}
      />
      <section className="section-shell page-hero">
        <Link href="/" className="text-link">
          ← Home
        </Link>
        <p className="eyebrow">Journal / Build notes</p>
        <h1>
          Notes from
          <br />
          the workbench.
        </h1>
        <p className="page-intro">
          Thoughts on design, engineering and building things with intention.
          These notes document the choices behind this website.
        </p>
      </section>
      <section className="section-shell page-content">
        <div className="journal-grid">
          {journal.map((entry) => (
            <Link
              href={`/journal/${entry.slug}`}
              key={entry.slug}
              className="journal-card"
            >
              <span className="eyebrow">{entry.category}</span>
              <h2>{entry.title}</h2>
              <p>{entry.intro}</p>
              <span className="text-link">Read the note ↗</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
