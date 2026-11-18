import Link from "next/link";
import type { Project } from "@/app/site-data";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const cardClassName = featured
    ? "surface group relative overflow-hidden rounded-[2.25rem] p-7 sm:p-10"
    : "surface group relative overflow-hidden rounded-[1.75rem] p-6";

  return (
    <article className={cardClassName}>
      <div className="card-glow" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            {project.category}
          </p>
          <h3 className="mt-4 text-[clamp(1.8rem,4vw,3.5rem)] font-medium tracking-[-0.06em] text-white transition-transform duration-300 group-hover:translate-x-1">
            {project.name}
          </h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/62">
          {project.status}
        </div>
      </div>

      <p className={`mt-5 leading-8 text-white/66 ${featured ? "max-w-2xl text-lg" : "text-base"}`}>
        {project.description}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/8 bg-black/10 px-3 py-1.5 text-xs text-white/56"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className={`mt-8 grid gap-3 ${featured ? "sm:grid-cols-3" : "sm:grid-cols-1"}`}>
        {project.metrics.map((metric) => (
          <div key={metric} className="rounded-2xl border border-white/8 bg-black/14 px-4 py-4 text-sm leading-6 text-white/62">
            {metric}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={project.href} className="premium-button premium-button-secondary px-4 py-2 text-sm">
          View case study
        </Link>
        {project.externalHref ? (
          <a
            href={project.externalHref}
            target="_blank"
            rel="noreferrer"
            className="premium-button premium-button-secondary px-4 py-2 text-sm text-white/68"
          >
            Visit live product
          </a>
        ) : null}
      </div>
    </article>
  );
}