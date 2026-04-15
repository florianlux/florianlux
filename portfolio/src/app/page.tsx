import Link from "next/link";
import {
  PersonSchema,
  WebSiteSchema,
} from "@/components/StructuredData";
import FadeIn from "@/components/FadeIn";
import HeroGlow from "@/components/HeroGlow";

const projects = [
  {
    number: "01",
    name: "Synapedia",
    tagline: "Wissen, das sich selbst organisiert.",
    description:
      "Eine KI-gestützte Plattform, die Wissen nicht nur speichert, sondern aktiv verknüpft und zugänglich macht.",
    tags: ["KI", "Wissensmanagement", "RAG"],
    href: "/projects/synapedia",
  },
  {
    number: "02",
    name: "Neurocodex",
    tagline: "Neurowissen als navigierbare Architektur.",
    description:
      "Komplexes Neurowissen, systematisch strukturiert und als durchsuchbare Wissensarchitektur aufbereitet.",
    tags: ["Neuro", "Wissensarchitektur", "Datenstruktur"],
    href: "/projects/neurocodex",
  },
];

const capabilities = [
  {
    title: "Klarheit",
    text: "Die beste Lösung ist die, die man sofort versteht. Struktur vor Dekoration.",
  },
  {
    title: "Tiefe",
    text: "Systeme, die unter der Oberfläche weiterdenken. Substanz statt Oberfläche.",
  },
  {
    title: "Reduktion",
    text: "Was nicht nötig ist, existiert nicht. Jedes Element verdient seinen Platz.",
  },
];

export default function HomePage() {
  return (
    <>
      <PersonSchema />
      <WebSiteSchema />

      {/* ═══════════════════════════════════════════════════
          HERO — Lumière Noire
          Atmospheric gradient orbs create cinematic depth.
          Left-aligned headline with two project CTAs.
          ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-svh overflow-hidden">
        <HeroGlow />

        <div className="relative z-10 mx-auto flex min-h-svh max-w-[1120px] items-center px-6 sm:px-10 lg:px-16">
          <div className="w-full">
            <FadeIn direction="none" duration={1.2}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-faint/70">
                Florian Lux
              </p>
            </FadeIn>

            <FadeIn direction="none" duration={1.4} delay={0.15}>
              <h1
                className="mt-7 font-semibold leading-[1.02] tracking-[-0.04em]"
                style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
              >
                Systeme,
                <br />
                <span className="text-muted">nicht Seiten.</span>
              </h1>
            </FadeIn>

            <FadeIn direction="none" duration={1} delay={0.4}>
              <p className="mt-8 max-w-[480px] text-[15px] leading-[1.75] text-muted/80 sm:text-[16px]">
                Ich entwerfe intelligente digitale Produkte — an der
                Schnittstelle von Wissen, Design und Technologie.
              </p>
            </FadeIn>

            <FadeIn direction="none" duration={0.8} delay={0.6}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/projects/synapedia"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] px-5 py-2.5 text-[13px] tracking-[0.01em] text-muted/80 transition-all duration-500 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-foreground/90"
                >
                  Synapedia
                  <span className="text-faint/50 transition-transform duration-500 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
                <Link
                  href="/projects/neurocodex"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] px-5 py-2.5 text-[13px] tracking-[0.01em] text-muted/80 transition-all duration-500 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-foreground/90"
                >
                  Neurocodex
                  <span className="text-faint/50 transition-transform duration-500 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Horizon line at hero base */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════
          PROJECTS — Glass showcase panels
          Frosted glass with top-edge highlight.
          Each panel lifts on hover with brightened border.
          ═══════════════════════════════════════════════════ */}
      <section className="relative px-6 pt-[140px] pb-[160px] sm:px-10 sm:pt-[180px] sm:pb-[200px] lg:px-16">
        <div className="mx-auto max-w-[1120px]">
          <FadeIn direction="none" duration={0.7}>
            <p className="text-[10px] uppercase tracking-[0.35em] text-faint/60">
              Ausgewählte Arbeiten
            </p>
          </FadeIn>

          <div className="mt-16 space-y-6 sm:mt-20 sm:space-y-8">
            {projects.map((project, i) => (
              <FadeIn
                key={project.name}
                direction="none"
                duration={0.9}
                delay={i * 0.15}
              >
                <Link href={project.href} className="group block">
                  <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-white/[0.01] transition-all duration-700 hover:-translate-y-0.5 hover:border-white/[0.12] hover:from-white/[0.05] hover:to-white/[0.02]">
                    {/* Top edge highlight — like light catching glass */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent transition-opacity duration-700 group-hover:via-white/[0.16]" />

                    <div className="relative p-8 sm:p-10 lg:p-12">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <span className="font-mono text-[12px] text-faint/30">
                            {project.number}
                          </span>
                          <h3
                            className="mt-4 font-medium leading-[1.08] tracking-[-0.03em] transition-colors duration-500 group-hover:text-foreground"
                            style={{
                              fontSize: "clamp(1.75rem, 4vw, 3rem)",
                            }}
                          >
                            {project.name}
                          </h3>
                          <p className="mt-4 text-[17px] leading-[1.55] text-muted/75 sm:text-[18px]">
                            {project.tagline}
                          </p>
                          <p className="mt-3 max-w-[520px] text-[14px] leading-[1.7] text-faint/60 sm:text-[15px]">
                            {project.description}
                          </p>
                        </div>
                        <span className="ml-8 hidden pt-2 text-[18px] text-faint/25 transition-all duration-500 group-hover:translate-x-1 group-hover:text-muted/40 sm:block">
                          →
                        </span>
                      </div>

                      <div className="mt-8 flex flex-wrap gap-2.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-faint/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          MANIFEST — Editorial pull-quote
          Framed by thin gradient lines. Subtle glow behind.
          ═══════════════════════════════════════════════════ */}
      <section className="relative px-6 py-[120px] sm:px-10 sm:py-[180px] lg:px-16">
        {/* Subtle atmospheric indigo glow behind text */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse, rgba(99, 102, 241, 0.025) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[720px]">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <FadeIn direction="none" duration={1.2}>
            <blockquote className="py-16 text-center sm:py-24">
              <p
                className="font-light leading-[1.65] tracking-[-0.01em] text-white/55"
                style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}
              >
                Gute Software entsteht nicht durch Features, sondern durch
                Klarheit. Ich entwerfe Systeme, die das Wesentliche sichtbar
                machen — und alles andere weglassen.
              </p>
            </blockquote>
          </FadeIn>
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CAPABILITIES — Glass tile grid
          Three principles in frosted panels.
          ═══════════════════════════════════════════════════ */}
      <section className="px-6 py-[100px] sm:px-10 sm:py-[140px] lg:px-16">
        <div className="mx-auto max-w-[1120px]">
          <FadeIn direction="none" duration={0.7}>
            <p className="text-[10px] uppercase tracking-[0.35em] text-faint/60">
              Denkweise
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-6">
            {capabilities.map((c, i) => (
              <FadeIn
                key={c.title}
                direction="none"
                duration={0.7}
                delay={i * 0.1}
              >
                <div className="rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.025] to-transparent p-6 sm:p-8">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-faint/60">
                    {c.title}
                  </p>
                  <p className="mt-4 text-[14px] leading-[1.75] text-muted/65 sm:text-[15px]">
                    {c.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CONTACT — Quiet, atmospheric, inviting
          Pill-CTA echoes hero style for visual consistency.
          ═══════════════════════════════════════════════════ */}
      <section className="relative px-6 py-[140px] sm:px-10 sm:py-[200px] lg:px-16">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255, 255, 255, 0.015) 0%, transparent 65%)",
          }}
        />
        <FadeIn direction="none" duration={1}>
          <div className="relative mx-auto max-w-[1120px] text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-faint/60">
              Kontakt
            </p>
            <h2
              className="mt-8 font-light tracking-[-0.02em] text-foreground/85"
              style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}
            >
              Lassen Sie uns sprechen.
            </h2>
            <a
              href="mailto:hello@florianlux.dev"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] px-6 py-3 text-[13px] tracking-[0.01em] text-muted/70 transition-all duration-500 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-foreground/90"
            >
              hello@florianlux.dev
              <span className="text-faint/40 transition-transform duration-500 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
