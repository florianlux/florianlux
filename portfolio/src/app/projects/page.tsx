import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Projekte — Digitale Systeme & Wissensplattformen",
  description:
    "Projekte von Florian Lux: Synapedia (Harm-Reduction Wissensplattform) und Neurocodex (Neurowissen-Systemarchitektur).",
  alternates: {
    canonical: "/projects",
  },
};

const projects = [
  {
    number: "01",
    name: "Synapedia",
    tagline: "Wissen, das sich selbst organisiert.",
    tags: ["Knowledge System", "SEO Engine", "Harm Reduction"],
    href: "/projects/synapedia",
  },
  {
    number: "02",
    name: "Neurocodex",
    tagline: "Neurowissen als navigierbare Architektur.",
    tags: ["Neuro", "Wissensarchitektur", "Datenstruktur"],
    href: "/projects/neurocodex",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Projekte", href: "/projects" },
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
          <h1 className="mt-12 text-4xl font-semibold tracking-tight sm:text-5xl">
            Projekte
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Jedes Projekt ist ein System — eine durchdachte Architektur aus
            Daten, Struktur und Interface.
          </p>
        </FadeIn>

        <div className="mt-24 space-y-[120px]">
          {projects.map((project) => (
            <FadeIn key={project.name} direction="none" duration={0.8}>
              <Link href={project.href} className="group block">
                <div className="flex items-start justify-between">
                  <h2 className="text-4xl font-medium tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.25,0.4,0.25,1)] group-hover:translate-x-2 sm:text-5xl">
                    {project.name}
                  </h2>
                  <span className="font-mono text-sm text-faint">
                    {project.number}
                  </span>
                </div>
                <p className="mt-4 text-xl text-muted">
                  {project.tagline}
                </p>
                <div className="mt-4 flex gap-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs uppercase tracking-[0.15em] text-faint"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-10 h-px bg-line" />
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
