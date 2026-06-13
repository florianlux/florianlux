import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { socialLinks } from "@/app/site-data";

export const metadata: Metadata = {
  title: "Contact — Florian Lux",
  description:
    "Get in touch with Florian Lux about knowledge systems, intelligence platforms and structured information products.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const externalLinks = socialLinks.filter((l) => !l.href.startsWith("mailto:"));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      {/* Page hero */}
      <section
        className="section-shell pt-0"
        style={{
          paddingBlockStart: "clamp(6.5rem, 10vw, 9rem)",
          paddingBlockEnd: "clamp(3.5rem, 5vw, 5rem)",
        }}
      >
        <FadeIn direction="none" duration={0.7}>
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/28 transition-colors duration-200 hover:text-white/55"
          >
            ← Home
          </Link>
          <p
            className="mt-10 font-mono text-[10px] uppercase text-white/36"
            style={{ letterSpacing: "0.34em" }}
          >
            Contact
          </p>
          <h1
            className="mt-4 font-medium text-white"
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              lineHeight: "0.97",
              letterSpacing: "-0.065em",
            }}
          >
            Build a knowledge system.
          </h1>
          <p
            className="mt-5 leading-[1.8] text-white/46"
            style={{
              fontSize: "clamp(0.93rem, 1.2vw, 1.05rem)",
              maxWidth: "46ch",
            }}
          >
            For knowledge platforms, intelligence products, structured
            information systems or a modern website for a local business, send
            a short direct message with the outcome you need.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/websites#anfrage" className="premium-button premium-button-primary sm:w-auto">
              Website anfragen
            </Link>
            <a href="mailto:hello@florianlux.dev" className="premium-button premium-button-secondary sm:w-auto">
              Direkt mailen
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Hairline */}
      <div className="section-shell py-0">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Contact content */}
      <section
        className="section-shell"
        style={{
          paddingBlockStart: "clamp(3.5rem, 6vw, 5.5rem)",
          paddingBlockEnd: "clamp(5rem, 9vw, 8rem)",
        }}
      >
        <FadeIn direction="none" duration={0.65}>
          {/* Primary email CTA */}
          <div>
            <p
              className="font-mono text-[9.5px] uppercase text-white/28"
              style={{ letterSpacing: "0.3em" }}
            >
              Email
            </p>
            <a
              href="mailto:hello@florianlux.dev"
              className="group mt-4 flex items-baseline gap-3 transition-opacity duration-200 hover:opacity-75"
            >
              <span
                className="font-medium text-white"
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                }}
              >
                hello@florianlux.dev
              </span>
              <span
                aria-hidden="true"
                className="text-white/36 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>

          {/* Social links */}
          <div className="mt-14 border-t border-white/[0.06]">
            {externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-white/[0.06] py-5 transition-colors hover:border-white/[0.1]"
              >
                <p
                  className="font-mono text-[9.5px] uppercase text-white/40"
                  style={{ letterSpacing: "0.28em" }}
                >
                  {link.label}
                </p>
                <span
                  aria-hidden="true"
                  className="text-sm text-white/24 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-white/55"
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </FadeIn>
      </section>
    </>
  );
}
