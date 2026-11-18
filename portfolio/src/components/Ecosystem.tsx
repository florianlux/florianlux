import Link from "next/link";
import { projects } from "@/app/site-data";

// The existing knowledge-project graph retains its three mapped nodes.
const knowledgeProjects = projects.filter(project => ["synapedia", "suite", "neurocodex"].includes(project.slug));

/** Native radio selection works without JavaScript; relationships have text equivalents. */
export default function Ecosystem() {
  return (
    <fieldset className="ecosystem-selector">
      <legend className="sr-only">
        Explore the project ecosystem. Select a project to read its
        relationship.
      </legend>
      <div className="ecosystem-tabs">
        {knowledgeProjects.map((project, i) => (
          <div key={project.slug}>
            <input
              type="radio"
              name="ecosystem"
              id={`eco-${project.slug}`}
              className="sr-only"
              defaultChecked={i === 0}
            />
            <label htmlFor={`eco-${project.slug}`}>
              {project.name} <span aria-hidden="true">↗</span>
            </label>
          </div>
        ))}
      </div>
      <div className="ecosystem-body">
        <div className="ecosystem-map" aria-hidden="true">
          <svg viewBox="0 0 650 320" fill="none">
            <g stroke="#384554" strokeWidth="1">
              <path d="M150 160h180M330 160l170-85M150 160l350 90" />
              <circle cx="150" cy="160" r="80" strokeDasharray="2 9" />
              <circle cx="330" cy="160" r="48" />
              <circle cx="500" cy="75" r="36" />
              <circle cx="500" cy="250" r="36" />
            </g>
            <path
              className="eco-edge-synapedia"
              d="M150 160h180"
              stroke="#b3cae1"
              strokeWidth="2"
            />
            <path
              className="eco-edge-suite"
              d="M330 160l170-85"
              stroke="#b3cae1"
              strokeWidth="2"
            />
            <path
              className="eco-edge-neurocodex"
              d="M150 160l350 90"
              stroke="#b3cae1"
              strokeWidth="2"
            />
            <g fill="#b3cae1">
              <circle cx="150" cy="160" r="4" />
              <circle cx="330" cy="160" r="4" />
              <circle cx="500" cy="75" r="4" />
              <circle cx="500" cy="250" r="4" />
            </g>
            <g className="map-label">
              <text x="150" y="135" textAnchor="middle">
                FLORIAN LUX
              </text>
              <text x="330" y="230" textAnchor="middle">
                SYNAPEDIA
              </text>
              <text x="500" y="25" textAnchor="middle">
                SUITE
              </text>
              <text x="500" y="309" textAnchor="middle">
                NEUROCODEX
              </text>
            </g>
          </svg>
        </div>
        <div className="ecosystem-details">
          {knowledgeProjects.map((project) => (
            <div
              key={project.slug}
              className={`eco-panel eco-panel-${project.slug}`}
            >
              <p className="eyebrow">{project.category}</p>
              <h3>{project.name}</h3>
              <p>
                {project.slug === "synapedia"
                  ? "Founded by Florian. The public knowledge platform at the heart of this work."
                  : project.slug === "suite"
                    ? "Extends Synapedia into a planned local macOS research workspace. Public preview; release in preparation."
                    : "A research direction explored by Florian. Connected by curiosity about knowledge systems; no shared production infrastructure is claimed."}
              </p>
              <span className="status">
                <i aria-hidden="true" />
                {project.status}
              </span>
              <Link className="text-link" href={project.href}>
                Read the project <span aria-hidden="true">↗</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <p className="ecosystem-footnote">
        One maker. Related ideas. Each with its own purpose and stage.
      </p>
    </fieldset>
  );
}
