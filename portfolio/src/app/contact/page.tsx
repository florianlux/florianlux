import { pageMetadata } from "@/app/page-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { contactConfiguration } from "@/lib/contact-service";
import evidence from "../release-evidence.json";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { identity, socialLinks } from "@/app/site-data";
export const dynamic = "force-dynamic";
export const metadata: Metadata = pageMetadata(
  "Connect",
  "Connect with Florian Lux about thoughtful digital products, knowledge systems or a website for your business.",
  "/contact",
);
export default function ContactPage() {
  const reviewed = evidence.checks.privacyReviewed && evidence.checks.managementMailboxVerified && evidence.checks.dataFlowsReviewed;
  const enabled = !!contactConfiguration(process.env, reviewed);
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Connect", href: "/contact" },
        ]}
      />
      <section className="section-shell page-hero">
        <Link href="/" className="text-link">
          ← Home
        </Link>
        <p className="eyebrow">A conversation is a good beginning.</p>
        <h1>What’s on your mind?</h1>
        <p className="page-intro">
          Have a thoughtful project, an interesting problem, or a different
          perspective? I’d like to hear it.
        </p>
        <a className="contact-email" href={`mailto:${identity.email}`}>
          {identity.email} <span aria-hidden="true">↗</span>
        </a>
        <p className="body-copy">
          Opens your email app. Tell me what you’re building and the outcome you
          have in mind.
        </p>
      </section>
      <section className="section-shell"><ContactForm enabled={enabled} email={identity.email} /></section>
      <section className="section-shell page-content">
        <div className="editorial-grid">
          <div>
            <p className="eyebrow">Find me elsewhere</p>
            <div className="connect-links">
              {socialLinks
                .filter((link) => link.label !== "Email")
                .map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">For your business</p>
            <h2 className="display-heading">A website with intention.</h2>
            <p className="section-description">
              Persönlich entwickelte Websites für lokale Unternehmen,
              Selbstständige und kleine Marken.
            </p>
            <Link className="text-link" href="/websites">
              Website-Service ansehen ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
