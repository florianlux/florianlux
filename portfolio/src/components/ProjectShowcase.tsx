import Image from "next/image";
import Link from "next/link";
import { projects } from "@/app/site-data";

export default function ProjectShowcase() {
  return (
    <div className="work-list">
      {projects.map((project, i) => (
        <article
          className={`work-item work-${project.slug}`}
          key={project.slug}
        >
          <div className="work-copy">
            <div className="work-meta">
              <span className="eyebrow">
                {String(i + 1).padStart(2, "0")} / {project.category}
              </span>
              <span className="status">
                <i aria-hidden="true" />
                {project.status}
              </span>
            </div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="work-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Link href={project.href} className="text-link">
              Explore the project <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="work-media">
            {project.slug === "synapedia" ? (
              <>
                <div className="browser-chrome" aria-hidden="true">
                  <span>•••</span>
                  <span>synapedia.com</span>
                  <span>↗</span>
                </div>
                <div className="screenshot-wrap">
                  <Image
                    src="/artifacts/synapedia-product-home.png"
                    alt="Existing Synapedia interface: substance knowledge, search and interaction checker."
                    fill
                    sizes="(min-width: 1000px) 600px, 90vw"
                  />
                </div>
                <p className="media-caption">
                  Product interface / repository capture
                </p>
              </>
            ) : project.slug === "suite" ? (
              <>
                <div className="workspace-study" aria-hidden="true">
                  <div className="workspace-core">
                    <span className="study-symbol">S</span>
                    <span>
                      Synapedia
                      <br />
                      Suite
                    </span>
                  </div>
                  <div className="workspace-orbit">
                    <span>Discover</span>
                    <span>Connect</span>
                    <span>Research</span>
                    <span>Keep</span>
                  </div>
                </div>
                <p className="media-caption">
                  Workspace concept / in development
                </p>
              </>
            ) : project.slug === "luxlabs" ? (
              <>
                <div className="workflow-study" aria-hidden="true"><span>Source</span><span>Review</span><span>Export</span></div>
                <p className="media-caption">Workflow concept / private development</p>
              </>
            ) : (
              <>
                <div className="research-study" aria-hidden="true">
                  <svg viewBox="0 0 500 200" fill="none">
                    <g stroke="#5b7187">
                      <path d="M90 100 210 40l90 60 100-40M90 100l120 60 90-60 100 40M210 40v120" />
                    </g>
                    {[
                      [90, 100],
                      [210, 40],
                      [210, 160],
                      [300, 100],
                      [400, 60],
                      [400, 140],
                    ].map(([x, y], idx) => (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r={idx === 3 ? 13 : 7}
                        fill={idx === 3 ? "#c0d4e8" : "#53697c"}
                      />
                    ))}
                  </svg>
                  <p>
                    From isolated facts.
                    <br />
                    <span>To connected understanding.</span>
                  </p>
                </div>
                <p className="media-caption">
                  Research direction / exploratory illustration
                </p>
              </>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
