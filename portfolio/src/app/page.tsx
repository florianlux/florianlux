import { PersonSchema, WebSiteSchema } from "@/components/StructuredData";
import FadeIn from "@/components/FadeIn";
import HeroTimestamp from "@/components/HeroTimestamp";
import PipelineVisual from "@/components/PipelineVisual";
import KnowledgeField from "@/components/KnowledgeField";

// ─────────────────────────────────────────────────────────
// Pipeline arrow — accent-colored, sequentially pulsing
// ─────────────────────────────────────────────────────────
function PipelineArrow({ delay }: { delay: number }) {
  return (
    <span
      style={{
        color: "#00E5A0",
        animation: `arrow-pulse 3s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        display: "inline-block",
      }}
    >
      →
    </span>
  );
}

// ─────────────────────────────────────────────────────────
// Status indicator — filled circle + label
// ─────────────────────────────────────────────────────────
function StatusBadge({ label = "Active" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ background: "#00E5A0" }}
      />
      <span className="font-mono text-[12px]" style={{ color: "#00E5A0" }}>
        {label}
      </span>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <PersonSchema />
      <WebSiteSchema />

      {/* ═══════════════════════════════════════════════════
          HERO — 100vh
          Dark void. Name in left-third. Pipeline below.
          ═══════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative flex min-h-svh items-center overflow-hidden"
        style={{ background: "#0A0A0F" }}
      >
        {/* Knowledge graph — latent system structure behind the typography */}
        <KnowledgeField />

        {/* Metadata cluster — upper right */}
        <HeroTimestamp />

        {/* Content — left-weighted, sits above the graph layer */}
        <div
          className="relative w-full px-6 sm:px-10"
          style={{ paddingLeft: "clamp(24px, 15%, 200px)" }}
        >
          {/* Name */}
          <h1
            className="font-sans font-normal leading-none tracking-[0.02em]"
            style={{
              fontSize: "clamp(48px, 10vw, 140px)",
              color: "#E8E8EC",
            }}
          >
            Florian Lux
          </h1>

          {/* Pipeline */}
          <p
            className="mt-6 font-mono"
            style={{ fontSize: "16px", color: "#6A6A75" }}
          >
            Search{" "}
            <PipelineArrow delay={0} />{" "}
            Signal{" "}
            <PipelineArrow delay={1} />{" "}
            Aggregation{" "}
            <PipelineArrow delay={2} />{" "}
            Knowledge
          </p>

          {/* Tagline */}
          <p
            className="mt-12 font-sans"
            style={{ fontSize: "18px", color: "#6A6A75" }}
          >
            I build intelligent digital systems.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          VOID — breathing space between sections
          ═══════════════════════════════════════════════════ */}
      <div style={{ height: "120px" }} />

      {/* ═══════════════════════════════════════════════════
          PHILOSOPHY — ~80vh
          Dense manifesto fragment. Signal line first appears.
          ═══════════════════════════════════════════════════ */}
      <section
        id="philosophy"
        className="flex items-center px-6 sm:px-10"
        style={{
          minHeight: "80vh",
          paddingLeft: "clamp(24px, 15%, 200px)",
        }}
      >
        <FadeIn direction="none" duration={0.8}>
          <p
            className="font-sans leading-relaxed"
            style={{
              fontSize: "clamp(18px, 2vw, 22px)",
              lineHeight: "1.65",
              maxWidth: "600px",
              color: "#A0A0AA",
            }}
          >
            Most systems accumulate noise. The interesting work happens in the
            layer between raw data and structured knowledge — where signal
            separates from static. I build the infrastructure for that
            transformation: systems that search, filter, connect, and surface
            what matters. The pipeline is not a metaphor. It is the architecture.
          </p>
        </FadeIn>
      </section>

      <div style={{ height: "120px" }} />

      {/* ═══════════════════════════════════════════════════
          SYSTEM VISUAL — 100vh
          Pipeline diagram. Sequential illuminate on scroll.
          ═══════════════════════════════════════════════════ */}
      <section
        id="pipeline"
        className="flex min-h-svh flex-col items-center justify-center px-6 sm:px-10"
      >
        <div style={{ width: "100%", maxWidth: "900px" }}>
          <PipelineVisual />
        </div>
      </section>

      <div style={{ height: "120px" }} />

      {/* ═══════════════════════════════════════════════════
          PROJECT: SYNAPEDIA — 100vh
          ═══════════════════════════════════════════════════ */}
      <section
        id="synapedia"
        className="flex min-h-svh items-center px-6 sm:px-10"
        style={{ paddingLeft: "clamp(24px, 15%, 200px)" }}
      >
        <div className="grid w-full max-w-[1200px] grid-cols-1 gap-16 sm:grid-cols-[3fr_2fr] sm:gap-0">
          {/* Left column */}
          <div className="flex flex-col justify-center">
            <FadeIn direction="none" duration={0.5}>
              <span
                className="font-mono text-[14px]"
                style={{ color: "#00E5A0" }}
              >
                001
              </span>
            </FadeIn>

            <FadeIn direction="none" duration={0.5} delay={0.2}>
              <h2
                className="mt-4 font-sans font-normal leading-none"
                style={{
                  fontSize: "clamp(48px, 6vw, 80px)",
                  color: "#E8E8EC",
                }}
              >
                Synapedia
              </h2>
            </FadeIn>

            <FadeIn direction="none" duration={0.5} delay={0.4}>
              <p
                className="mt-4 font-mono text-[14px]"
                style={{ color: "#6A6A75" }}
              >
                Knowledge Aggregation System
              </p>
            </FadeIn>

            <FadeIn direction="none" duration={0.5} delay={0.45}>
              <div className="mt-3">
                <StatusBadge label="Active" />
              </div>
            </FadeIn>

            <FadeIn direction="none" duration={0.5} delay={0.6}>
              <p
                className="mt-8 font-sans leading-relaxed"
                style={{
                  fontSize: "clamp(15px, 1.2vw, 18px)",
                  lineHeight: "1.65",
                  maxWidth: "480px",
                  color: "#A0A0AA",
                }}
              >
                Synapedia connects fragmented knowledge sources into a
                structured, queryable graph. It transforms search into signal,
                and signal into understanding — a living system that grows
                more precise as it ingests.
              </p>
            </FadeIn>
          </div>

          {/* Right column — image placeholder */}
          <FadeIn direction="none" duration={0.6} delay={0.8}>
            <div
              className="flex items-center justify-center sm:pl-12"
              style={{ minHeight: "280px" }}
            >
              <div
                className="flex w-full max-w-[420px] items-center justify-center rounded-sm"
                style={{
                  aspectRatio: "16/10",
                  background: "rgba(0, 229, 160, 0.03)",
                  border: "1px solid rgba(0, 229, 160, 0.08)",
                  boxShadow:
                    "0 0 60px rgba(0, 229, 160, 0.06), 0 0 120px rgba(0, 229, 160, 0.03)",
                  filter: "brightness(0.85)",
                }}
              >
                <span
                  className="font-mono text-[11px]"
                  style={{ color: "#4A4A55" }}
                >
                  synapedia.interface
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div style={{ height: "120px" }} />

      {/* ═══════════════════════════════════════════════════
          PROJECT: NEUROCODEX — 100vh
          ═══════════════════════════════════════════════════ */}
      <section
        id="neurocodex"
        className="flex min-h-svh items-center px-6 sm:px-10"
        style={{ paddingLeft: "clamp(24px, 15%, 200px)" }}
      >
        <div className="grid w-full max-w-[1200px] grid-cols-1 gap-16 sm:grid-cols-[3fr_2fr] sm:gap-0">
          {/* Left column */}
          <div className="flex flex-col justify-center">
            <FadeIn direction="none" duration={0.5}>
              <span
                className="font-mono text-[14px]"
                style={{ color: "#00E5A0" }}
              >
                002
              </span>
            </FadeIn>

            <FadeIn direction="none" duration={0.5} delay={0.2}>
              <h2
                className="mt-4 font-sans font-normal leading-none"
                style={{
                  fontSize: "clamp(48px, 6vw, 80px)",
                  color: "#E8E8EC",
                }}
              >
                Neurocodex
              </h2>
            </FadeIn>

            <FadeIn direction="none" duration={0.5} delay={0.4}>
              <p
                className="mt-4 font-mono text-[14px]"
                style={{ color: "#6A6A75" }}
              >
                Neuroscience Knowledge Architecture
              </p>
            </FadeIn>

            <FadeIn direction="none" duration={0.5} delay={0.45}>
              <div className="mt-3">
                <StatusBadge label="In Development" />
              </div>
            </FadeIn>

            <FadeIn direction="none" duration={0.5} delay={0.6}>
              <p
                className="font-sans leading-relaxed"
                style={{
                  marginTop: "32px",
                  fontSize: "clamp(15px, 1.2vw, 18px)",
                  lineHeight: "1.65",
                  maxWidth: "480px",
                  color: "#A0A0AA",
                }}
              >
                Neurocodex encodes complex neuroscience literature into a
                navigable, structured architecture. Where Synapedia aggregates,
                Neurocodex classifies — building the taxonomy layer that makes
                deep knowledge searchable at scale.
              </p>
            </FadeIn>
          </div>

          {/* Right column — image placeholder */}
          <FadeIn direction="none" duration={0.6} delay={0.8}>
            <div
              className="flex items-center justify-center sm:pl-12"
              style={{ minHeight: "280px" }}
            >
              <div
                className="flex w-full max-w-[420px] items-center justify-center rounded-sm"
                style={{
                  aspectRatio: "16/10",
                  background: "rgba(0, 229, 160, 0.03)",
                  border: "1px solid rgba(0, 229, 160, 0.08)",
                  boxShadow:
                    "0 0 60px rgba(0, 229, 160, 0.06), 0 0 120px rgba(0, 229, 160, 0.03)",
                  filter: "brightness(0.85)",
                }}
              >
                <span
                  className="font-mono text-[11px]"
                  style={{ color: "#4A4A55" }}
                >
                  neurocodex.interface
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div style={{ height: "120px" }} />

      {/* ═══════════════════════════════════════════════════
          ABOUT — ~60vh
          Minimal. A few lines. Email link.
          ═══════════════════════════════════════════════════ */}
      <section
        id="about"
        className="flex items-center px-6 sm:px-10"
        style={{
          minHeight: "60vh",
          paddingLeft: "clamp(24px, 15%, 200px)",
        }}
      >
        <FadeIn direction="none" duration={0.8}>
          <div style={{ maxWidth: "560px" }}>
            <p
              className="font-sans leading-relaxed"
              style={{
                fontSize: "clamp(15px, 1.2vw, 18px)",
                lineHeight: "1.65",
                color: "#A0A0AA",
              }}
            >
              Based in Bonn. Building at the intersection of knowledge systems,
              information architecture, and applied intelligence. Interested in
              the layer where data becomes structure and structure becomes
              understanding.
            </p>

            <a
              href="mailto:hello@florianlux.work"
              className="mt-10 inline-block font-mono text-[14px] transition-opacity duration-300 hover:opacity-70"
              style={{
                color: "#00E5A0",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              hello@florianlux.work
            </a>
          </div>
        </FadeIn>
      </section>

      <div style={{ height: "120px" }} />
    </>
  );
}
