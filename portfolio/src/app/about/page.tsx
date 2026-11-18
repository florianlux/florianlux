import { pageMetadata } from "@/app/page-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, ProfilePageSchema } from "@/components/StructuredData";
import MotionPortrait from "@/components/MotionPortrait";
import { identity } from "@/app/site-data";
export const metadata: Metadata = pageMetadata(
  "About",
  "The person behind the products. Florian Lux, developer and founder of Synapedia, with a background in healthcare IT.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <ProfilePageSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
      <section className="section-shell page-hero">
        <Link className="text-link" href="/">
          ← Home
        </Link>
        <p className="eyebrow">The person behind the products</p>
        <h1>
          A systems mind.
          <br />A human perspective.
        </h1>
        <p className="page-intro">
          {identity.role} Curious about the space between complex systems and
          simple, thoughtful experiences.
        </p>
      </section>
      <section className="section-shell page-content">
        <div className="editorial-grid">
          <div className="editorial-copy">
            <section>
              <h2>Hi, I’m Florian.</h2>
              <p>
                I build digital products and knowledge systems. I’m the founder
                of Synapedia, responsible for its product direction and
                technology. The project brings my interest in structured
                information into something people can explore.
              </p>
            </section>
            <section>
              <h2>Care for the details.</h2>
              <p>
                My professional background includes working as a Service Owner
                in healthcare IT. It shapes my attention to reliable systems,
                clear responsibilities and the people on the other side of an
                interface.
              </p>
            </section>
            <section>
              <h2>Curiosity, made tangible.</h2>
              <p>
                I’m interested in knowledge graphs, data platforms and the ways
                design can make dense information more approachable. Synapedia
                is public; Suite is in development; Neurocodex remains a
                research direction. Each represents a different stage of that
                thinking.
              </p>
            </section>
            <section>
              <h2>Software. Product. Creative technology.</h2>
              <p>Interfaces, information models and digital experiences. I connect software engineering with product development and considered visual design.</p>
            </section>
            <section>
              <h2>Build. Experiment. Learn. Improve.</h2>
              <p>
                A useful product starts with understanding the problem. I care
                about clear models, considered interfaces and systems that can
                evolve without becoming harder to understand.
              </p>
              <Link href="/projects" className="text-link">
                Explore the work ↗
              </Link>
            </section>
          </div>
          <aside>
            <div className="about-portrait"><MotionPortrait /></div>
            <p className="eyebrow">DEVELOPER / CREATOR / INDEPENDENT BUILDER</p>
            <div className="project-evidence">
              <p className="eyebrow">In the open</p>
              <div style={{ display: "grid", justifyItems: "start" }}>
              <a
                href="https://synapedia.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Synapedia team & mission ↗
              </a>
              <a
                href={identity.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Work on GitHub ↗
              </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
