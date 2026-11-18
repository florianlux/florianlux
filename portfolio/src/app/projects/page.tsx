import { pageMetadata } from "@/app/page-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import ProjectShowcase from "@/components/ProjectShowcase";
import { BreadcrumbSchema } from "@/components/StructuredData";
export const metadata: Metadata = pageMetadata(
  "Selected work",
  "Synapedia, Synapedia Suite, Neurocodex and LuxLabs. Public work, projects in development and research by Florian Lux.",
  "/projects",
);
export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ]}
      />
      <section className="section-shell page-hero">
        <Link className="text-link" href="/">
          ← Home
        </Link>
        <p className="eyebrow">Project index / 2026</p>
        <h1>Ideas, put to work.</h1>
        <p className="page-intro">
          A public platform. A workspace taking shape. A research direction.
          Work at different stages, connected by a belief in thoughtful systems.
        </p>
      </section>
      <section className="section-shell page-content">
        <ProjectShowcase />
      </section>
    </>
  );
}
