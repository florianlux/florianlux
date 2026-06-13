import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Synapedia — Pharmacology Knowledge System",
  description:
    "Synapedia is a pharmacology knowledge system with structured substance data, interaction routes, comparison pages, sitemaps and intelligent content architecture. A project by Florian Lux.",
  alternates: {
    canonical: "/projects/synapedia",
  },
};

const caseSections = [
  {
    kicker: "Problem",
    heading: "Fragmented knowledge",
    body: [
      "Information about psychoactive substances online is fragmented, contradictory and often dangerously inaccurate. Anyone seeking evidence-based knowledge finds forum opinions, outdated articles or outright misinformation. There is no place that connects scientific depth with accessibility.",
    ],
    subsections: undefined as { title: string; text: string }[] | undefined,
  },
  {
    kicker: "Vision",
    heading: "Trusted evidence",
    body: [
      "Synapedia is designed to become the most trustworthy source for evidence-based harm-reduction information — a platform that doesn't simplify knowledge, but structures it intelligently. Every substance, every effect, every interaction is part of a larger knowledge graph.",
    ],
    subsections: undefined as { title: string; text: string }[] | undefined,
  },
  {
    kicker: "Architecture",
    heading: "System & layers",
    body: ["Synapedia is not a blog and not a wiki. It is a knowledge system with several interlocking layers:"],
    subsections: [
      {
        title: "Structured knowledge base",
        text: "Every entity — substances, effects, receptors, interactions — is modeled as a structured data record.",
      },
      {
        title: "SEO engine",
        text: "SEO is built into the architecture. URL structures, internal linking, structured data and semantic page logic.",
      },
      {
        title: "Knowledge graph",
        text: "Substances don't stand in isolation — they're connected through interactions, receptor profiles and categories.",
      },
      {
        title: "Modular frontend",
        text: "Next.js App Router, Tailwind CSS, component-based architecture. Fast, accessible, optimized for performance.",
      },
    ],
  },
];

const capabilities = [
  "Structured knowledge graph",
  "SEO-native architecture",
  "AI-assisted enrichment workflows",
];

const stack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Structured Data",
  "SEO Architecture",
  "Knowledge Graph",
];

export default function SynapediaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: "Synapedia", href: "/projects/synapedia" },
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
            href="/projects"
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/28 transition-colors duration-200 hover:text-white/55"
          >
            ← Projects
          </Link>
          <div className="mt-10 flex items-center gap-3">
            <span
              className="font-mono text-[10px] uppercase text-accent/70"
              style={{ letterSpacing: "0.34em" }}
            >
            Knowledge System
            </span>
            <span className="rounded-full border border-white/[0.06] px-2.5 py-1 font-mono text-[9px] text-white/30">
              Active
            </span>
          </div>
          <h1
            className="mt-4 font-medium text-white"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 8.75rem)",
              lineHeight: "0.9",
              letterSpacing: "-0.075em",
            }}
          >
            Synapedia
          </h1>
          <p
            className="mt-5 text-white/36"
            style={{
              fontSize: "clamp(0.84rem, 1vw, 0.95rem)",
              letterSpacing: "-0.005em",
            }}
          >
            Pharmacology data, interactions, comparisons and community signals as a structured information product.
          </p>
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

      {/* Case study content */}
      <section
        className="section-shell"
        style={{
          paddingBlockStart: "clamp(3.5rem, 6vw, 5.5rem)",
          paddingBlockEnd: "clamp(4rem, 7vw, 7rem)",
        }}
      >
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20">
          {/* Left: case study sections */}
          <div className="space-y-14">
            {caseSections.map((section) => (
              <FadeIn key={section.kicker} direction="none" duration={0.6}>
                <div>
                  <p
                    className="font-mono text-[9.5px] uppercase text-white/28"
                    style={{ letterSpacing: "0.3em" }}
                  >
                    {section.kicker}
                  </p>
                  <h2 className="mt-3 text-[clamp(1.15rem,1.8vw,1.45rem)] font-medium tracking-[-0.035em] text-white/88">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.body.map((para, i) => (
                      <p key={i} className="text-[15px] leading-[1.84] text-white/46">
                        {para}
                      </p>
                    ))}
                  </div>
                  {section.subsections && (
                    <div className="mt-8 space-y-7">
                      {section.subsections.map((sub) => (
                        <div key={sub.title} className="flex items-start gap-4">
                          <div
                            className="mt-2 h-px w-5 shrink-0"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(0,229,160,0.5), transparent)",
                            }}
                          />
                          <div>
                            <h3 className="text-[14px] font-medium tracking-[-0.02em] text-white/70">
                              {sub.title}
                            </h3>
                            <p className="mt-1.5 text-[13.5px] leading-[1.7] text-white/38">
                              {sub.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}

            {/* Stack */}
            <FadeIn direction="none" duration={0.6}>
              <div>
                <p
                  className="font-mono text-[9.5px] uppercase text-white/28"
                  style={{ letterSpacing: "0.3em" }}
                >
                  Stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.06] px-3 py-1.5 font-mono text-[10.5px] text-white/38"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: system proof + CTAs */}
          <FadeIn direction="none" duration={0.65} delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <p
                className="font-mono text-[9.5px] uppercase text-white/28"
                style={{ letterSpacing: "0.3em" }}
              >
                System proof
              </p>
              <div className="mt-4">
                {capabilities.map((cap, idx) => (
                  <div
                    key={cap}
                    className={idx === 0 ? "pb-5" : "border-t border-white/[0.05] py-5"}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 shrink-0 font-mono text-[9px] text-accent/55"
                        style={{ letterSpacing: "0.28em" }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[13.5px] font-medium leading-[1.54] tracking-[-0.02em] text-white/60">
                        {cap}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-3">
                <a
                  href="https://synapedia.com"
                  target="_blank"
                  rel="noreferrer"
                  className="premium-button premium-button-primary block w-full text-center text-[13px]"
                >
                  Visit Synapedia ↗
                </a>
                <Link
                  href="/projects"
                  className="premium-button premium-button-secondary block w-full text-center text-[13px]"
                >
                  ← All projects
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
