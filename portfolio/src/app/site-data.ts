/** Public editorial content; source evidence does not imply live API access. */
export const identity = {
  name: "Florian Lux",
  // Birth year confirmed by the owner in this chat on 11 October 2026.
  birthYear: 2000,
  origin: "https://florianlux.dev",
  email: "mngmt@synapedia.com",
  role: "Developer. Founder. Creative Technologist.",
  description:
    "Building thoughtful digital products and systems at the intersection of technology, creativity and human needs.",
  github: "https://github.com/florianlux",
  linkedin: "https://linkedin.com/in/florian-lux-75a198258",
  instagram: "https://instagram.com/florian.lux",
} as const;
export type Project = {
  name: string;
  slug: string;
  status: "Public platform" | "In development" | "Exploration";
  category: string;
  description: string;
  tags: string[];
  href: string;
  externalHref?: string;
  highlighted?: boolean;
  metrics: string[];
  evidence: { label: string; href?: string; basis: string };
};
export const projects: Project[] = [
  {
    name: "Synapedia",
    slug: "synapedia",
    status: "Public platform",
    category: "Connected knowledge",
    description:
      "Making complex substance knowledge easier to explore. A public platform connecting structured profiles, interactions and sources.",
    tags: ["Next.js", "TypeScript", "Structured data"],
    href: "/projects/synapedia",
    externalHref: "https://synapedia.com",
    highlighted: true,
    metrics: [
      "Structured substance profiles",
      "Interaction and comparison tools",
      "Sources and visible evidence boundaries",
    ],
    evidence: {
      label: "Public platform & team",
      href: "https://synapedia.com/about",
      basis:
        "Public About page identifies Florian as founder responsible for product and technology. Inspected 11 October 2026.",
    },
  },
  {
    name: "Synapedia Suite",
    slug: "suite",
    status: "In development",
    category: "A native workspace",
    description:
      "A macOS workspace for connected research. Bringing references, relationships and local working notes into one place.",
    tags: ["macOS", "Local research", "Knowledge graph"],
    href: "/projects/suite",
    externalHref: "https://synapedia.com/suite",
    metrics: [
      "Public product preview",
      "Local research workspace in development",
      "Public download not yet available",
    ],
    evidence: {
      label: "Public product preview",
      href: "https://synapedia.com/suite",
      basis:
        "Public preview inspected 11 October 2026. First public release is planned; no public download is available. Development features described by the preview are not independently tested by this portfolio.",
    },
  },
  {
    name: "Neurocodex",
    slug: "neurocodex",
    status: "Exploration",
    category: "Research & experiments",
    description:
      "An ongoing interest in neuroscience, knowledge graphs and the relationships that turn isolated facts into understanding.",
    tags: ["Research", "Knowledge modeling", "Experiments"],
    href: "/projects/neurocodex",
    externalHref: "https://github.com/florianlux/neurocodex",
    metrics: [
      "Owner-described research direction",
      "Public repository",
      "No separate product release claimed",
    ],
    evidence: {
      label: "Public repository",
      href: "https://github.com/florianlux/neurocodex",
      basis:
        "Owner README describes Neurocodex as an exploration. The public repository exists; its README also describes Synapedia, so a separate deployed neuroscience product is not established.",
    },
  },
  {
    name: "LuxLabs",
    slug: "luxlabs",
    status: "In development",
    category: "Editorial workflows",
    description: "A private workspace for turning sourced knowledge into versioned content, with human review and export at the centre of the workflow.",
    tags: ["Workflow systems", "Editorial tools", "Human review"],
    href: "/projects/luxlabs",
    metrics: ["Versioned content workflows", "Human approval before export", "Private development project"],
    evidence: {
      label: "Local development repository",
      basis: "Owner's LuxLabs repository and architecture README inspected on 11 October 2026. They describe versioned content, human approvals and exports. No public product launch or live-provider result is asserted.",
    },
  },
];
export type StackGroup = {
  title: string;
  description: string;
  items: string[];
};
export const stackGroups: StackGroup[] = [
  {
    title: "Interfaces",
    description: "Precise, responsive product surfaces.",
    items: ["Next.js", "React", "TypeScript", "CSS"],
  },
  {
    title: "Knowledge",
    description: "Model the relationships before the interface.",
    items: ["Entity modeling", "Structured data", "Information architecture"],
  },
  {
    title: "Systems",
    description: "Clear boundaries and maintainable workflows.",
    items: ["Supabase", "Postgres", "Python", "Git"],
  },
];
export const socialLinks = [
  { label: "GitHub", href: identity.github },
  { label: "LinkedIn", href: identity.linkedin },
  { label: "Instagram", href: identity.instagram },
  { label: "Email", href: `mailto:${identity.email}` },
];
export const journal = [
  {
    slug: "designing-for-clarity",
    category: "Design",
    title: "Clarity is an engineering decision.",
    intro:
      "A few choices behind this portfolio: less decoration, stronger hierarchy, and an interface that gets out of the way.",
    sections: [
      {
        title: "Start with the reading order",
        text: "A name, a point of view, the work, and a way to connect. This portfolio follows that sequence. Type and spacing do most of the work; an accent is useful when it helps identify a link or a relationship.",
      },
      {
        title: "Give the work room",
        text: "A project is easier to understand when its purpose, status and evidence appear together. Synapedia gets a real interface capture. Suite gets a labeled workspace illustration, because a diagram should never be mistaken for an approved product screenshot.",
      },
      {
        title: "Use contrast deliberately",
        text: "Near-black sections frame the product work. Slightly elevated editorial surfaces give the personal introduction its own rhythm. Each context shares the same spacing and type system. Muted copy still needs to be readable.",
      },
    ],
  },
  {
    slug: "motion-as-an-enhancement",
    category: "Engineering",
    title: "An interface should work before it moves.",
    intro:
      "How this site keeps its content, navigation and project map usable with motion reduced or JavaScript disabled.",
    sections: [
      {
        title: "Visible is the default",
        text: "A reveal animation should not own the visibility of an entire page. The FadeIn component starts with ordinary visible HTML. When an off-screen section enters view, a short CSS animation can run. If the observer or JavaScript is unavailable, the content is already there.",
      },
      {
        title: "Let the browser do the interaction",
        text: "The ecosystem uses native radio inputs and CSS to select a project. Keyboard users can move through the options with arrow keys; the same interaction works without a JavaScript bundle. Mobile navigation uses a native disclosure with optional Escape and close-on-navigation enhancements.",
      },
      {
        title: "Motion needs an off switch",
        text: "Entrance and hover motion use transforms and opacity. Reduced-motion preferences disable the animation and smooth scrolling. There is no autoplaying video, continuous 3D renderer or pointer-following scene running in the background.",
      },
    ],
  },
  {
    slug: "show-the-evidence",
    category: "Product",
    title: "Show the work. Keep the uncertainty.",
    intro:
      "Why a public link, a product preview and a research idea deserve different labels.",
    sections: [
      {
        title: "A preview is a preview",
        text: "A public product page establishes that a project can be described publicly. It does not prove that downloads, payments or every planned feature are ready. Suite is presented here as in development, with a link to its public preview.",
      },
      {
        title: "Relationships need a meaning",
        text: "In the ecosystem, Florian is the founder behind Synapedia, and Suite is a planned workspace extending that project. Neurocodex is a separate research direction. A connecting line does not imply a shared database, a shipped API or a commercial partnership.",
      },
      {
        title: "Avoid convenient numbers",
        text: "This portfolio does not show live user counts, revenue, GitHub stars or search-index totals. A manually entered number needs a source and a date; a live metric needs an actual data integration and a reliable fallback. A smaller set of evidenced claims is more useful.",
      },
    ],
  },
] as const;
export const editorialDate = "2026-10-11";
