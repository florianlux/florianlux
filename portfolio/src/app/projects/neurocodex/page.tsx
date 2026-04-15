import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Neurocodex — Neurowissen als digitale Systemarchitektur",
  description:
    "Neurocodex ist ein Systemprojekt an der Schnittstelle von Neurowissen und digitaler Struktur — modulare Wissensarchitektur für komplexe Zusammenhänge. Von Florian Lux.",
  alternates: {
    canonical: "/projects/neurocodex",
  },
};

export default function NeurocodexPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Projekte", href: "/projects" },
          { name: "Neurocodex", href: "/projects/neurocodex" },
        ]}
      />

      <section className="mx-auto max-w-[960px] px-6 pt-32 pb-[120px] sm:pt-40 sm:pb-[160px]">
        <FadeIn direction="none" duration={0.8}>
          <Link
            href="/projects"
            className="text-sm text-faint transition-colors duration-300 hover:text-muted"
          >
            ← Projekte
          </Link>
          <h1 className="mt-12 text-4xl font-semibold tracking-tight sm:text-5xl">
            Neurocodex
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Neurowissen als navigierbare Systemarchitektur — Komplexität
            strukturieren, ohne sie zu reduzieren.
          </p>
        </FadeIn>

        <div className="mt-24 max-w-2xl space-y-20">
          <FadeIn direction="none" duration={0.8}>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-faint">
                Problem
              </p>
              <h2 className="mt-4 text-2xl font-medium tracking-tight">
                Fragmentiertes Neurowissen
              </h2>
              <p className="mt-6 leading-[1.8] text-muted">
                Neurowissenschaftliches Wissen ist fragmentiert über
                Fachpublikationen, Lehrbücher und lose Online-Ressourcen
                verteilt. Die Zusammenhänge zwischen Neurotransmittern,
                Rezeptoren, Gehirnregionen und Verhaltensweisen sind komplex —
                aber nirgends als zusammenhängendes System dargestellt.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="none" duration={0.8}>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-faint">
                Vision
              </p>
              <h2 className="mt-4 text-2xl font-medium tracking-tight">
                Navigierbares Netzwerk
              </h2>
              <p className="mt-6 leading-[1.8] text-muted">
                Neurocodex baut eine digitale Wissensarchitektur, die
                neurologische Zusammenhänge als verknüpftes System modelliert.
                Nicht als Lexikon, nicht als Kurs — sondern als navigierbares
                Netzwerk, das Tiefe und Überblick gleichzeitig ermöglicht.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="none" duration={0.8}>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-faint">
                Architektur
              </p>
              <h2 className="mt-4 text-2xl font-medium tracking-tight">
                System & Schichten
              </h2>
              <div className="mt-10 space-y-10">
                {[
                  {
                    title: "Modulare Wissensknoten",
                    text: "Jeder Wissensknoten — ob Neurotransmitter, Rezeptortyp oder Gehirnregion — ist eine eigenständige, strukturierte Einheit mit definierten Relationen.",
                  },
                  {
                    title: "Relationales Datenmodell",
                    text: "Die Stärke liegt in den Verbindungen. Dopamin → Belohnungssystem → Motivation → Suchtmechanismen — diese Ketten sind explizit modelliert.",
                  },
                  {
                    title: "Semantische Navigation",
                    text: "Nutzer navigieren durch Bedeutung. Jede Seite bietet Kontext und Anschlussfähigkeit.",
                  },
                  {
                    title: "SEO-native Struktur",
                    text: "Die Inhaltsarchitektur generiert organisch Sichtbarkeit durch klare Hierarchien und semantische Tiefe.",
                  },
                ].map((item) => (
                  <div key={item.title}>
                    <h3 className="text-base font-medium">
                      {item.title}
                    </h3>
                    <p className="mt-2 leading-[1.8] text-muted">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="none" duration={0.8}>
            <div className="flex flex-wrap gap-4">
              {[
                "Neurowissenschaften",
                "Knowledge Architecture",
                "Data Modeling",
                "SEO Systems",
                "TypeScript",
                "Next.js",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs uppercase tracking-[0.15em] text-faint"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
