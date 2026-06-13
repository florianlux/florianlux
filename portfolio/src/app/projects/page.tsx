import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { projects } from "@/app/site-data";

export const metadata: Metadata = {
  title: "Systems — Florian Lux",
  description:
    "Knowledge systems by Florian Lux: Synapedia and Neurocodex — structured information products built as systems.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  const featured = projects.find((p) => p.highlighted);
  const others = projects.filter((p) => !p.highlighted);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
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
            Systems
          </p>
          <h1
            className="mt-4 font-medium text-white"
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              lineHeight: "0.97",
              letterSpacing: "-0.065em",
            }}
          >
            Knowledge systems
          </h1>
          <p
            className="mt-5 leading-[1.8] text-white/42"
            style={{
              fontSize: "clamp(0.93rem, 1.2vw, 1.05rem)",
              maxWidth: "50ch",
            }}
          >
            Each project starts with domain modeling, information architecture
            and a product surface that makes complex knowledge usable.
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

      {/* Featured project */}
      {featured && (
        <section
          className="section-shell"
          style={{
            paddingBlockStart: "clamp(3.5rem, 6vw, 5.5rem)",
            paddingBlockEnd: "clamp(2rem, 3vw, 3rem)",
          }}
        >
          <FadeIn direction="none" duration={0.65}>
            <p
              className="font-mono text-[9.5px] uppercase text-accent/60"
              style={{ letterSpacing: "0.3em" }}
            >
              Featured
            </p>
            <Link href={featured.href} className="group mt-5 block">
              <div className="flex items-start justify-between gap-8">
                <div className="min-w-0">
                  <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.0] tracking-[-0.06em] text-white transition-opacity duration-200 group-hover:opacity-75">
                    {featured.name}
                  </h2>
                  <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.84] text-white/46">
                    {featured.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.05] px-2.5 py-1 font-mono text-[9.5px] text-white/28"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3 pt-1">
                  <span className="hidden rounded-full border border-white/[0.05] px-2.5 py-1 font-mono text-[9px] text-white/28 sm:inline">
                    {featured.status}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-white/24 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-white/60"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
        </section>
      )}

      {/* Other projects */}
      {others.length > 0 && (
        <section
          className="section-shell"
          style={{
            paddingBlockStart: "clamp(2rem, 3vw, 3rem)",
            paddingBlockEnd: "clamp(5rem, 9vw, 8rem)",
          }}
        >
          <div className="border-t border-white/[0.06]">
            {others.map((project, index) => (
              <FadeIn
                key={project.name}
                direction="none"
                duration={0.55}
                delay={index * 0.07}
              >
                <Link
                  href={project.href}
                  className="group block border-b border-white/[0.06] py-8 transition-colors hover:border-white/[0.1]"
                >
                  <div className="flex items-start justify-between gap-8">
                    <div className="min-w-0">
                      <p
                        className="font-mono text-[9.5px] uppercase text-white/30"
                        style={{ letterSpacing: "0.3em" }}
                      >
                        {project.category}
                      </p>
                      <h3 className="mt-2.5 text-[clamp(1.45rem,2.6vw,2.05rem)] font-medium leading-[1.07] tracking-[-0.05em] text-white">
                        {project.name}
                      </h3>
                      <p className="mt-3 max-w-[52ch] text-[14px] leading-[1.8] text-white/42">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 pt-0.5">
                      <span className="hidden rounded-full border border-white/[0.05] px-2.5 py-1 font-mono text-[9px] text-white/28 sm:inline">
                        {project.status}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-white/24 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-white/60"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
