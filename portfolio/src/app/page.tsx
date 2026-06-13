import { PersonSchema, WebSiteSchema } from "@/components/StructuredData";
import FadeIn from "@/components/FadeIn";
import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import WebsiteServiceBlock from "@/components/WebsiteServiceBlock";
import { projects, socialLinks, type Project } from "@/app/site-data";

const projectCopy: Record<string, string> = {
  Synapedia:
    "A public knowledge platform for pharmacology, interactions and connected research.",
  Neurocodex:
    "A neuroscience research system for mapping concepts, entities and relationships.",
};

const capabilities = [
  "Product Interfaces",
  "Knowledge Systems",
  "Automation Systems",
  "AI Tooling",
];

const contactLinks = [
  { label: "Projects", href: "/projects" },
  ...socialLinks.filter((link) => ["GitHub", "Email"].includes(link.label)),
];

function ProjectPreview({ name }: { name: string }) {
  if (name === "Synapedia") {
    return (
      <div className="project-preview project-preview-synapedia">
        <Image
          src="/artifacts/synapedia-product-home.png"
          alt="Synapedia product interface with search, navigation, and interaction checker"
          fill
          className="project-artifact-image project-artifact-synapedia"
          sizes="(min-width: 1024px) 590px, 90vw"
        />
      </div>
    );
  }

  if (name === "Neurocodex") {
    return (
      <div className="project-preview project-preview-neurocodex">
        <Image
          src="/artifacts/neurocodex-architecture-page.png"
          alt="Neurocodex architecture case study interface"
          fill
          className="project-artifact-image project-artifact-neurocodex"
          sizes="(min-width: 1024px) 420px, 90vw"
        />
      </div>
    );
  }

  return (
    <div className="project-preview project-preview-system">
      <div className="preview-system-card" />
      <div className="preview-system-card" />
      <div className="preview-system-card" />
    </div>
  );
}

function ProjectPanel({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const description = projectCopy[project.name] ?? project.description;

  return (
    <article className={featured ? "portfolio-card portfolio-card-featured" : "portfolio-card"}>
      <ProjectPreview name={project.name} />

      <div className="relative z-10 mt-auto">
        <div className="flex flex-wrap items-center gap-2">
          <span className="portfolio-meta">{project.category}</span>
          <span className="portfolio-status">{project.status}</span>
        </div>

        <h3 className={featured ? "portfolio-title portfolio-title-featured" : "portfolio-title"}>
          {project.name}
        </h3>
        <p className="portfolio-description">{description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="portfolio-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
          <Link href={project.href} className="portfolio-link">
            View project <span aria-hidden="true">-&gt;</span>
          </Link>
          {project.externalHref ? (
            <a
              href={project.externalHref}
              target="_blank"
              rel="noreferrer"
              className="portfolio-link portfolio-link-muted"
            >
              Open live <span aria-hidden="true">-&gt;</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const featuredProject = projects.find((project) => project.highlighted);
  const secondaryProjects = projects.filter((project) => !project.highlighted);

  return (
    <>
      <PersonSchema />
      <WebSiteSchema />
      <Hero />

      <section className="section-shell portfolio-intro">
        <FadeIn direction="none" duration={0.65}>
          <div className="portfolio-intro-line">
            <span>Featured systems</span>
            <p>
              Polished interfaces for dense domains, built around structure,
              clarity and real product surfaces.
            </p>
          </div>
        </FadeIn>
      </section>

      <section
        id="featured-projects"
        className="section-shell portfolio-project-section pt-0"
      >
        <FadeIn direction="none" duration={0.65}>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">Featured Projects</p>
              <h2 className="mt-3 max-w-[12ch] text-4xl font-medium leading-[0.96] tracking-normal text-white sm:text-5xl lg:text-6xl">
                Built systems, presented beautifully.
              </h2>
            </div>
            <Link href="/projects" className="portfolio-index-link">
              All projects <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </FadeIn>

        <div className="portfolio-project-grid">
          {featuredProject ? (
            <FadeIn direction="up" duration={0.7} className="lg:row-span-2">
              <ProjectPanel project={featuredProject} featured />
            </FadeIn>
          ) : null}

          {secondaryProjects.map((project, index) => (
            <FadeIn key={project.name} direction="up" duration={0.62} delay={index * 0.08}>
              <ProjectPanel project={project} />
            </FadeIn>
          ))}

          <FadeIn direction="up" duration={0.62} delay={0.12}>
            <Link href="/projects" className="portfolio-card portfolio-card-quiet">
              <span className="portfolio-meta">Archive</span>
              <strong>Explore the full project index.</strong>
              <span className="portfolio-card-arrow" aria-hidden="true">
                -&gt;
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>

      <WebsiteServiceBlock />

      <section className="section-shell capability-section">
        <FadeIn direction="none" duration={0.65}>
          <div className="capability-strip">
            {capabilities.map((capability) => (
              <div key={capability} className="capability-chip">
                <span />
                {capability}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <ContactSection links={contactLinks} />
    </>
  );
}
