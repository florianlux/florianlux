export type Project = {
  name: string;
  slug: string;
  status: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
  externalHref?: string;
  highlighted?: boolean;
  metrics: string[];
};

export type StackGroup = {
  title: string;
  description: string;
  items: string[];
};

export type FocusArea = {
  title: string;
  description: string;
};

export type ShippedOutcome = {
  system: string;
  outcome: string;
  proof: string;
};

export const projects: Project[] = [
  {
    name: "Synapedia",
    slug: "001",
    status: "Active",
    category: "Knowledge System",
    description:
      "A public pharmacology knowledge platform that turns substances, interactions, receptors, comparisons and community signals into an indexed information architecture.",
    tags: ["Knowledge Architecture", "Structured Data", "Information Product"],
    href: "/projects/synapedia",
    externalHref: "https://synapedia.com",
    highlighted: true,
    metrics: [
      "1,090 public sitemap entries across 11 sitemap groups",
      "240 indexed interaction routes and 356 comparison routes",
      "Substances, receptors, effects, knowledge articles and community signals modeled as product surfaces",
    ],
  },
  {
    name: "Neurocodex",
    slug: "002",
    status: "In Development",
    category: "Research Knowledge System",
    description:
      "A research architecture for neuroscience and cognitive systems, focused on preserving deep context while making entities, concepts and relationships navigable.",
    tags: ["Research Architecture", "Knowledge Graph", "Semantic Navigation"],
    href: "/projects/neurocodex",
    metrics: ["Relational knowledge modeling", "Semantic navigation", "Research-oriented information structure"],
  },
];

export const focusAreas: FocusArea[] = [
  {
    title: "Entity modeling",
    description:
      "I define the objects, taxonomies and relationships that make complex domains explorable.",
  },
  {
    title: "Information architecture",
    description:
      "I turn dense material into paths, indexes, comparisons and decision-ready product surfaces.",
  },
  {
    title: "Operational intelligence",
    description:
      "I build pipelines that keep structured content useful, searchable and maintainable over time.",
  },
];

export const shippedOutcomes: ShippedOutcome[] = [
  {
    system: "Synapedia public knowledge graph",
    outcome:
      "A domain model for psychoactive substances that connects substances, receptors, effects, interactions, comparisons and learning resources.",
    proof: "1,090 public sitemap entries; 11 sitemap groups; JSON-LD website, organization and breadcrumb schema.",
  },
  {
    system: "Interaction and comparison architecture",
    outcome:
      "Programmatic product surfaces that let users move from isolated substance pages into relationship-based understanding.",
    proof: "240 indexed interaction routes and 356 indexed comparison routes.",
  },
  {
    system: "Community signal archive",
    outcome:
      "A separate evidence layer for field reports and early-warning signals, clearly separated from scientific reference content.",
    proof: "155 indexed community entries, visible safety disclaimers and source-status labeling.",
  },
  {
    system: "SEO-native knowledge archive",
    outcome:
      "Content architecture designed as a system, not a blog: sitemaps, canonical routes, localized knowledge pages and structured metadata.",
    proof: "Core, substances, effects, knowledge, interactions, comparisons, receptors, community and fresh sitemaps.",
  },
];

export const stackGroups: StackGroup[] = [
  {
    title: "Frontend",
    description: "Fast, precise interfaces with product-grade polish.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "AI / Automation",
    description: "Intelligent pipelines and LLM-native workflows.",
    items: ["Python", "LLM APIs", "Automation Pipelines", "Prompt Engineering"],
  },
  {
    title: "Data / Infrastructure",
    description: "Structured data, search and systems-oriented modeling.",
    items: ["Postgres", "Supabase", "Knowledge Graphs", "Cloudflare"],
  },
  {
    title: "Product Systems",
    description: "Lean delivery focused on reliability and maintainability.",
    items: ["SEO Architecture", "Content Architecture", "UX Strategy", "GitHub"],
  },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/florianlux" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/florian-lux-75a198258",
  },
  { label: "Email", href: "mailto:hello@florianlux.dev" },
];
