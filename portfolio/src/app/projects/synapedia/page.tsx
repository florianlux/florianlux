import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Synapedia — Wissenschaftliche Harm-Reduction Plattform",
  description:
    "Synapedia ist eine wissenschaftlich fundierte Harm-Reduction Plattform mit strukturierter Wissensbasis, SEO-Engine und intelligenter Inhaltsarchitektur. Ein Projekt von Florian Lux.",
  alternates: {
    canonical: "/projects/synapedia",
  },
};

export default function SynapediaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Projekte", href: "/projects" },
          { name: "Synapedia", href: "/projects/synapedia" },
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
            Synapedia
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Eine wissenschaftlich fundierte Harm-Reduction Plattform — gebaut
            als Wissenssystem, nicht als Content-Seite.
          </p>
        </FadeIn>

        <div className="mt-24 max-w-2xl space-y-20">
          <FadeIn direction="none" duration={0.8}>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-faint">
                Problem
              </p>
              <h2 className="mt-4 text-2xl font-medium tracking-tight">
                Fragmentiertes Wissen
              </h2>
              <p className="mt-6 leading-[1.8] text-muted">
                Informationen zu psychoaktiven Substanzen sind im Internet
                fragmentiert, widersprüchlich und oft gefährlich ungenau. Wer
                fundiertes Wissen sucht, findet Foren-Meinungen, veraltete
                Artikel oder schlicht Desinformation. Es gibt keinen Ort, der
                wissenschaftliche Tiefe mit Zugänglichkeit verbindet.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="none" duration={0.8}>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-faint">
                Vision
              </p>
              <h2 className="mt-4 text-2xl font-medium tracking-tight">
                Vertrauenswürdige Evidenz
              </h2>
              <p className="mt-6 leading-[1.8] text-muted">
                Synapedia soll die vertrauenswürdigste Quelle für
                evidenzbasierte Harm-Reduction Informationen werden — eine
                Plattform, die Wissen nicht vereinfacht, sondern intelligent
                strukturiert. Jede Substanz, jede Wirkung, jede Interaktion
                ist Teil eines größeren Wissensgraphen.
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
              <p className="mt-6 leading-[1.8] text-muted">
                Synapedia ist kein Blog und kein Wiki. Es ist ein
                Wissenssystem mit mehreren ineinandergreifenden Schichten:
              </p>
              <div className="mt-10 space-y-10">
                {[
                  {
                    title: "Strukturierte Wissensbasis",
                    text: "Jede Entität — Substanzen, Wirkungen, Rezeptoren, Interaktionen — ist als strukturierter Datensatz modelliert.",
                  },
                  {
                    title: "SEO Engine",
                    text: "SEO ist in die Architektur eingebaut. URL-Strukturen, interne Verlinkung, Structured Data und semantische Seitenlogik.",
                  },
                  {
                    title: "Knowledge Graph",
                    text: "Substanzen stehen nicht isoliert — sie sind über Wechselwirkungen, Rezeptor-Profile und Kategorien verbunden.",
                  },
                  {
                    title: "Modulares Frontend",
                    text: "Next.js App Router, Tailwind CSS, komponentenbasierte Architektur. Schnell, zugänglich, auf Performance optimiert.",
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
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Structured Data",
                "SEO Architecture",
                "Knowledge Graph",
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
