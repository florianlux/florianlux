import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Kontakt — Florian Lux",
  description:
    "Kontakt zu Florian Lux aufnehmen. Offen für Gespräche über digitale Systeme, Produktarchitektur und Zusammenarbeit.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Kontakt", href: "/contact" },
        ]}
      />

      <section className="mx-auto max-w-[960px] px-6 pt-32 pb-[120px] sm:pt-40 sm:pb-[160px]">
        <FadeIn direction="none" duration={0.8}>
          <Link
            href="/"
            className="text-sm text-faint transition-colors duration-300 hover:text-muted"
          >
            ← Zurück
          </Link>

          <p className="mt-20 text-sm uppercase tracking-[0.2em] text-faint">
            Kontakt
          </p>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-[40px]">
            Lassen Sie uns sprechen.
          </h1>
          <p className="mt-8 max-w-xl leading-[1.8] text-muted">
            Der beste Weg ist eine kurze, klare Nachricht. Kein
            Kontaktformular — eine direkte E-Mail ist persönlicher und
            effizienter.
          </p>
          <a
            href="mailto:hello@florianlux.dev"
            className="mt-8 inline-block border-b border-transparent text-base text-muted transition-all duration-400 hover:border-faint hover:text-foreground"
          >
            hello@florianlux.dev
          </a>
        </FadeIn>
      </section>
    </>
  );
}
