# Florian Lux portfolio audit

Audit completed before implementation, 11 October 2026 (Europe/Berlin).

Labels: **Verified** means inspected source, installed package, or identified public evidence. **Recommendation** means a proposed change. **Unknown** means the evidence does not establish the claim. This is a repository audit; production deployment, field performance, account access, and mailbox delivery are separate checks.

## 1. Current architecture

**Verified:** The repository is a GitHub profile repository containing a standalone application in `portfolio/`; it is not a package-workspace monorepo. The root README and three SVG assets are independent of the website. Installed versions: Next.js 16.2.3 (App Router), React/React DOM 19.2.4, TypeScript 5.9.3, Tailwind CSS 4.2.2, Framer Motion 12.38.0. npm lockfile and existing dependencies are present. The installed npx initially resolved through Node 22.22.3; the final shell toolchain reports Node 25.8.0 and npm 11.11.0. `AGENTS.md` requires consulting the bundled Next.js documentation; `CLAUDE.md` references it.

**Verified:** Seven content routes: `/`, `/about`, `/projects`, `/projects/synapedia`, `/projects/neurocodex`, `/websites`, `/contact`; custom not-found page, generated sitemap and robots. The root layout owns global navigation/footer, English HTML language, and two Google fonts downloaded and hosted by Next.js. Most page bodies are server components; navigation, motion and request drafting are client components. Content is hard-coded, with some centralization in `src/app/site-data.ts`. No API routes, database, CMS, authenticated integrations, analytics, environment-variable references, or environment files were found in the application. No deployment config or CI workflow is tracked. Production provider/domain ownership is **Unknown**, despite hard-coded `florianlux.dev` URLs.

## 2. Existing functionality

**Verified:** Homepage with product screenshots, two project case studies, biography, GitHub/LinkedIn links, contact page, and German website-service landing page with established offers. The request form generates a `mailto:` draft; it does not deliver or store a message. Demo website designs are explicitly labeled concepts. The homepage uses the existing Synapedia screenshot, while the Neurocodex image is a portfolio architecture-page capture rather than an independent product screenshot.

**Verified:** Repository README self-describes Florian as a healthcare IT Service Owner, full-stack developer, and creator of Synapedia. [Synapedia About](https://synapedia.com/about), inspected during this audit, identifies Florian as founder responsible for product and technology and provides `flo@synapedia.com`. [Public Neurocodex repository](https://github.com/florianlux/neurocodex) exists under the same account, but its rendered README describes Synapedia. Therefore its existence does not establish a separately launched neuroscience product.

**Unknown:** Lux Labs, FLO.CLIPS and WinPilot OS ownership, public functionality and release status were not established by repository files or the first public search. Candidates are not evidence of launched products. Suite was fetched over normally verified HTTPS: the public page explicitly describes a preview without public download, and a closed newsletter. Public GitHub API returned the owner account’s public repositories; it did not establish the three unverified candidate brands. No approved portrait is present. Use a typographic profile until specifically approved photography is available.

## 3. Technical problems

**Verified:** `globals.css` has 2,206 lines with overlapping generations of homepage styling and numerous unused decorative selectors. Several unmounted components retain animation dependencies, timers, inline color palettes and outdated section IDs. `FadeIn` renders opacity zero in initial HTML, making wrapped content invisible without JavaScript. Existing Framer Motion wrappers add client work to otherwise static pages. Reduced-motion preferences are not respected by the JavaScript animation implementations. `HeroTimestamp` would risk a hydration mismatch if mounted because it computes a current timestamp during rendering. Pipeline timers are not cleared on unmount; that component is currently unmounted.

**Verified:** Baseline ESLint passed. No tests, test scripts, or test configuration are tracked. Two PNG artifacts total approximately 715 KB and are rendered with Next Image. No portraits or local font source files are tracked. Approximately 2.1 GiB storage was available at audit time: avoid unnecessary toolchain installs, duplicate builds, and large media.

**Recommendation:** Keep the existing stack; use small progressive client enhancements and CSS motion rather than a new animation/3D dependency. Vendor licensed local font assets if build-time network access cannot be relied upon. Introduce reproducible acceptance checks appropriate to the interactive map, routing, and metadata.

## 4. Design and accessibility problems

**Verified:** The present design mixes emerald/gold glows, stacked fake windows, generic glass surfaces, and several font sizes with white text at 24–46% opacity. Navigation mixes German labels with English pages; the service page is German under an English document language. The new mission's about/ecosystem/engineering/journal sections are absent. The navigation has no skip link; mobile controls have no `aria-controls` relationship or Escape behavior. Current decorative previews lack provenance labels. A decorative website-service card claims a mobile score of 98 without measurement.

**Recommendation:** Establish near-black/silver-blue colors, readable muted text, clamp typography, consistent English portfolio navigation, German language marking for the retained service, generous spacing, and restrained line work. Add visible focus, native disclosures and accessible labels. Render essential content and links independently of motion. A typographic profile is the truthful photo fallback. Existing offer copy and prices should be retained, not reinterpreted as third-party achievements.

## 5. SEO problems

**Verified:** Person, WebSite, BreadcrumbList and ProfessionalService JSON-LD exist, but lack persistent entity IDs. Person `sameAs` incorrectly identifies the Synapedia website as the person. Structured data is serialized without escaping `<` (safe with current constants, unsuitable for future user content). Root Open Graph locale is `de_DE` despite English portfolio copy. No OG image or Twitter image exists. Several page titles repeat the root title template. Sitemap dates use the current build time instead of editorial change dates. Hard-coded quantitative sitemap/index claims have no dated evidence; sitemap inclusion is also not proof of search indexing.

**Recommendation:** Centralize identity/origin and contact values, use Person ↔ WebSite creator references, and project CreativeWork schema with explicit status. Limit `sameAs` to evidenced personal profiles. Add an original OG image, route-specific canonicals, actual-language metadata and an accurate sitemap. Keep English primary; the repository does not justify duplicating the entire site into a new locale system. Mark the existing German service content appropriately. Do not claim authority, indexed counts, verified degrees, or achievement metrics without evidence.

## 6. Integration opportunities

| Service | Class | Evidence and boundary |
| --- | --- | --- |
| GitHub | A now; B later | Public account link in README. Future cached public API snapshot requires dated provenance, failure fallback and API limits; no authenticated API assumed. |
| Synapedia | A | Public website and About page. Link to live platform/case study; no private database scraping. |
| Suite | A if public teaser verified | Describe as in development; no download, checkout or newsletter activation. |
| LinkedIn / Instagram | A, owner-attested | Exact links in owner repository README. Account content/live reachability not independently established; no scraping/API credentials. |
| Lux Labs / FLO.CLIPS / WinPilot OS | D | Await ownership, public URL, status and actual product evidence. |
| Newsletter | D | No provider or verified double opt-in flow. No fake form or enrollment. |
| Analytics | D | No existing vendor or consent configuration. No tracking script added by default. |
| Server-side services | C, future | Explicit permission, server-only credentials, scoped access, caching/rate limiting, graceful fallback needed before integration. |

## 7. Reusable components

**Verified:** Next Image, Next Link, page-shell patterns, route metadata, sitemap/robots conventions, breadcrumb components, project data, website demo mockups and the request-draft workflow are reusable. Existing Synapedia product screenshot has provenance in the existing repository. Public profile references are available in the owner README.

**Recommendation:** Rework shared navigation, footer, FadeIn and project showcase components. Retain service-page mockups scoped to their labeled demos. Replace the unverified Neurocodex product presentation with an explicitly exploratory architecture visualization.

## 8. Migration risks

**Verified:** The application files are initially clean. Unrelated `.DS_Store` modification and untracked `brain.psd`/`stickerpsd.psd` exist at root; leave them intact. Branch `master` is one local commit ahead of its remote. No commit/push/deploy is necessary for local implementation.

**Recommendation:** Preserve existing route URLs and German service offers. Do not create a new framework, duplicate backend, fake products, testimonials or metric feed. Avoid an aggressively restrictive CSP that breaks Next.js inline hydration; add tested security headers, with deployment-specific CSP deferred to a verified host. Content editing must keep schema, project status and provenance aligned. Do not import Suite binaries or screenshots without publication approval. Do not infer public release from local source or historical QA.

## 9. Recommended architecture

Keep the existing Next.js App Router application. One typed content module owns identity, verified projects, evidence links and journal articles. Server-render all content, project cases, metadata and diagrams. A small client component progressively enhances the ecosystem with selection, retaining a complete static list and native navigation. CSS implements entrance/hover motion, gated by reduced-motion preferences; IntersectionObserver animations finish visible and never initialize content as hidden. Journal articles are factual design/engineering notes grounded in the actual portfolio implementation, not invented publication history. Preserve existing routes and add only substantive journal content. Local licensed fonts, optimized images and a generated original social card keep third-party browser requests at zero.

## 10. Prioritized implementation roadmap

1. **P0:** Save this pre-implementation audit; finalize current public project evidence and photography fallback. Remove unsupported counts/scores and misleading project launch claims.
2. **P1:** Implement shared tokens, navigation, footer, hero, typographic about, selected work, accessible ecosystem, engineering, journal and connect.
3. **P1:** Align case studies and contact paths; preserve `/websites` offers and make request drafting explicit and usable.
4. **P1:** Implement Person/WebSite/project entities, OG/Twitter card, canonicals, sitemap, robots and basic security headers.
5. **P1:** Run typecheck, lint, production build, desktop/mobile navigation, JavaScript-disabled and reduced-motion checks. Measure Lighthouse against the production server under documented conditions. Record LCP/CLS/TBT separately from real-user INP, which cannot be established from a single Lighthouse navigation.
6. **P2:** Document integration contracts, verification evidence and remaining production-only checks. Expose a reviewable local preview. Publication, mailbox delivery, field Web Vitals and authenticated integrations remain distinct from local completion.
