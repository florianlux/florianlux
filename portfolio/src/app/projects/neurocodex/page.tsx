import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Neurocodex — Neuroscience Knowledge Architecture",
  description:
    "Neurocodex is a system project at the intersection of neuroscience and digital structure — modular knowledge architecture for complex connections. By Florian Lux.",
  alternates: {
    canonical: "/projects/neurocodex",
  },
};

const caseSections = [
  {
    kicker: "Problem",
    heading: "Fragmented neuro knowledge",
    body: [
      "Neuroscientific knowledge is scattered across academic publications, textbooks and loose online resources. The relationships between neurotransmitters, receptors, brain regions and behaviors are complex — but nowhere represented as a coherent system.",
    ],
    subsections: undefined as { title: string; text: string }[] | undefined,
  },
  {
    kicker: "Vision",
    heading: "Navigable network",
    body: [
      "Neurocodex builds a digital knowledge architecture that models neurological relationships as a connected system. Not a lexicon, not a course — but a navigable network that enables both depth and overview simultaneously.",
    ],
    subsections: undefined as { title: string; text: string }[] | undefined,
  },
  {
    kicker: "Architecture",
    heading: "System & layers",
    body: ["Every layer of Neurocodex is designed to make complexity navigable without flattening it:"],
    subsections: [
      {
        title: "Modular knowledge nodes",
        text: "Each knowledge node — whether neurotransmitter, receptor type or brain region — is a standalone, structured unit with defined relations.",
      },
      {
        title: "Relational data model",
        text: "The strength lies in the connections. Dopamine → reward system → motivation → addiction mechanisms — these chains are explicitly modeled.",
      },
      {
        title: "Semantic navigation",
        text: "Users navigate through meaning. Each page offers context and connectivity to adjacent concepts.",
      },
      {
        title: "SEO-native structure",
        text: "The content architecture generates organic visibility through clear hierarchies and semantic depth.",
      },
    ],
  },
];

const capabilities = [
  "Relational knowledge modeling",
  "Semantic navigation",
  "Long-horizon product thinking",
];

const stack = [
  "Neuroscience",
  "Knowledge Architecture",
  "Data Modeling",
  "SEO Systems",
  "TypeScript",
  "Next.js",
];

export default function NeurocodexPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: "Neurocodex", href: "/projects/neurocodex" },
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
              className="font-mono text-[10px] uppercase text-white/40"
              style={{ letterSpacing: "0.34em" }}
            >
              Experimental System
            </span>
            <span className="rounded-full border border-white/[0.06] px-2.5 py-1 font-mono text-[9px] text-white/30">
              In Development
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
            Neurocodex
          </h1>
          <p
            className="mt-5 text-white/36"
            style={{
              fontSize: "clamp(0.84rem, 1vw, 0.95rem)",
              letterSpacing: "-0.005em",
            }}
          >
            Neuroscience as navigable architecture. Complexity structured, not reduced.
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
                                "linear-gradient(90deg, rgba(255,255,255,0.2), transparent)",
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

          {/* Right: architecture focus + CTAs */}
          <FadeIn direction="none" duration={0.65} delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <p
                className="font-mono text-[9.5px] uppercase text-white/28"
                style={{ letterSpacing: "0.3em" }}
              >
                Architecture focus
              </p>
              <div className="mt-4">
                {capabilities.map((cap, idx) => (
                  <div
                    key={cap}
                    className={idx === 0 ? "pb-5" : "border-t border-white/[0.05] py-5"}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 shrink-0 font-mono text-[9px] text-white/30"
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
                <Link
                  href="/projects"
                  className="premium-button premium-button-secondary block w-full text-center text-[13px]"
                >
                  ← All projects
                </Link>
                <Link
                  href="/contact"
                  className="premium-button premium-button-secondary block w-full text-center text-[13px]"
                >
                  Discuss this project →
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
