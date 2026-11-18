import Link from "next/link";
import { projects } from "@/app/site-data";
import { BreadcrumbSchema, ProjectSchema } from "@/components/StructuredData";
const content: Record<string, { title: string; text: string }[]> = {
  synapedia: [
    {
      title: "A clearer way into complex knowledge.",
      text: "Synapedia is a public information platform for psychoactive substances. It brings structured profiles, interaction tools, comparisons and reference material into a connected interface. Florian is its founder, responsible for product and technology.",
    },
    {
      title: "Model the relationships.",
      text: "Substances, receptors, sources and interactions belong to a shared information domain. The platform makes those relationships navigable through dedicated tools and structured pages. The architecture combines Next.js, TypeScript and structured content.",
    },
    {
      title: "Keep the limits visible.",
      text: "The project serves scientific information and harm reduction. Evidence labels and source references matter because a missing entry is not a safety assessment. The platform does not replace medical advice; the portfolio presents the product and its engineering, without endorsing clinical claims.",
    },
  ],
  suite: [
    {
      title: "More room for connected research.",
      text: "Synapedia Suite is a macOS workspace in development, extending the public Synapedia project into local research. Its public preview describes search, a knowledge graph, comparisons, sources and working boards. These remain development features described by the project.",
    },
    {
      title: "Local work, connected references.",
      text: "The preview describes a bundled development snapshot and local working notes. It distinguishes stored references, calculated relationships and unresolved evidence. The aim is a coherent research workspace with clear provenance.",
    },
    {
      title: "A product taking shape.",
      text: "At the evidence check on 11 October 2026, the public page states that a first release is planned and no public download is available. This portfolio links to the preview. It does not distribute binaries or offer an active newsletter enrollment.",
    },
  ],
  luxlabs: [
    { title: "A workspace for careful output.", text: "LuxLabs is a private project in development. Its repository describes an editorial workflow for turning sourced knowledge into versioned content that people can inspect and review." },
    { title: "Make review part of the process.", text: "Version history, human approval and export are explicit parts of the architecture. Source evidence remains connected to the content instead of disappearing behind the final visual." },
    { title: "Keep the stage visible.", text: "The local source was inspected on 11 October 2026. It establishes the project and its intended workflow; it does not establish a public launch, a live AI-provider run or autonomous social publishing." },
  ],
  neurocodex: [
    {
      title: "An open research direction.",
      text: "Neurocodex reflects Florian’s interest in neuroscience, pharmacology and knowledge graphs. The owner’s repository introduction describes it as an exploration of the relationships between those fields.",
    },
    {
      title: "Questions worth exploring.",
      text: "How can a model preserve context while making concepts easy to navigate? How should the interface show a relationship without implying more certainty than the source supports? Those questions guide this research direction.",
    },
    {
      title: "A repository is a starting point.",
      text: "A public repository exists under Florian’s GitHub account. Its README also describes Synapedia. That is evidence of a repository, not a separate launched neuroscience platform. This page presents the direction as exploratory and links directly to the available source.",
    },
  ],
};
export default function ProjectDetail({ slug }: { slug: string }) {
  const project = projects.find((item) => item.slug === slug)!;
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: project.name, href: project.href },
        ]}
      />
      <ProjectSchema project={project} />
      <section className="section-shell page-hero">
        <Link href="/projects" className="text-link">
          ← Project index
        </Link>
        <p className="eyebrow">{project.category}</p>
        <h1>{project.name}</h1>
        <span className="status">
          <i aria-hidden="true" />
          {project.status}
        </span>
        <p className="page-intro" style={{ marginTop: "1.5rem" }}>
          {project.description}
        </p>
      </section>
      <section className="section-shell page-content">
        <div className="editorial-grid">
          <div className="editorial-copy">
            {content[slug].map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </section>
            ))}
          </div>
          <aside className="project-evidence">
            <p className="eyebrow">{project.evidence.href ? "In the open / evidence" : "Development / provenance"}</p>
            <h2>{project.evidence.label}</h2>
            <p>{project.evidence.basis}</p>
            {project.evidence.href && <a
              href={project.evidence.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              View the source <span aria-hidden="true">↗</span>
            </a>}
            {project.externalHref && (
              <a
                href={project.externalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-light"
              >
                {slug === "synapedia"
                  ? "Visit the platform"
                  : slug === "suite"
                    ? "See the preview"
                    : "Explore the repository"}
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <div className="work-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
