import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "About — Florian Lux",
  description:
    "Knowledge systems builder at the intersection of information architecture, structured data and software engineering.",
  alternates: {
    canonical: "/about",
  },
};

const sections = [
  {
    kicker: "Perspective",
    heading: "How I think",
    body: [
      "My approach never starts with code. It starts with the question: what is the actual problem — and what does a system look like that doesn't just solve it, but stays sound long-term? I think in data structures, in relations, in information flows. Before a single line of code exists, the architecture does.",
      "This way of thinking didn't come from a single discipline. It emerged at the intersection of neuroscience, information design, software engineering and a deep fascination with the structure of knowledge.",
    ],
  },
  {
    kicker: "Motivation",
    heading: "What drives me",
    body: [
      "Knowledge is the most valuable resource — but only when it's accessible, structured and connected. Most digital products treat information as content. I treat it as a system.",
      "I'm not interested in the next feature or the next launch. I'm interested in: how do you build something that is more relevant in five years than it is today? That question drives every project I work on.",
    ],
  },
  {
    kicker: "Background",
    heading: "Where I come from",
    body: [
      "I don't come from a single field — and that's the point. My work lives on the fact that I understand SEO not as marketing, but as architecture. That I see design not as surface, but as system language. And that technology for me is not an end in itself, but a tool for making knowledge structures come alive.",
      "Currently building Synapedia and Neurocodex — two projects that translate this approach into concrete products.",
    ],
  },
];

const profileMeta = [
  { label: "Based in", value: "Bonn, Germany" },
  { label: "Focus", value: "Knowledge systems" },
  { label: "Currently", value: "Synapedia · Neurocodex" },
  { label: "Approach", value: "Model first, interface second" },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
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
            className="mt-10 font-mono text-[10px] uppercase text-accent/70"
            style={{ letterSpacing: "0.34em" }}
          >
            About
          </p>
          <h1
            className="mt-4 font-medium text-white"
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              lineHeight: "0.97",
              letterSpacing: "-0.065em",
            }}
          >
            Florian Lux
          </h1>
          <p
            className="mt-5 leading-[1.8] text-white/46"
            style={{
              fontSize: "clamp(0.93rem, 1.2vw, 1.05rem)",
              maxWidth: "50ch",
            }}
          >
            I build knowledge systems at the intersection of information
            architecture, structured data and software engineering.
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

      {/* Editorial content */}
      <section
        className="section-shell"
        style={{
          paddingBlockStart: "clamp(3.5rem, 6vw, 5.5rem)",
          paddingBlockEnd: "clamp(5rem, 9vw, 8rem)",
        }}
      >
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-20 xl:gap-24">
          {/* Left: content sections */}
          <div className="space-y-14">
            {sections.map((section) => (
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
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Right: profile metadata */}
          <FadeIn direction="none" duration={0.65} delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <div className="border-t border-white/[0.06]">
                {profileMeta.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[90px_minmax(0,1fr)] items-baseline border-b border-white/[0.05] py-4"
                  >
                    <p
                      className="font-mono text-[9px] uppercase text-white/26"
                      style={{ letterSpacing: "0.22em" }}
                    >
                      {item.label}
                    </p>
                    <p className="text-[13px] leading-[1.6] text-white/55">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/projects"
                  className="premium-button premium-button-secondary block w-full text-center text-[13px]"
                >
                  View projects →
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
