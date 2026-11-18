# Florian Lux portfolio audit

Audit date: 11 October 2026. LUX NOIR v2 evolves the existing MOTIONSWITCH site. The current working files, including earlier uncommitted work, are the implementation baseline.

## Architecture and verified baseline

- Next.js 16.2.3 App Router, React 19.2.4, TypeScript and Tailwind 4.
- Twelve content routes: home, About, contact, project index, three project details, journal index, three journal notes and the German website-service page.
- Server-rendered content with small client components for navigation, the portrait fallback, optional sound, privacy-gated analytics and the email-draft form.
- Instrument Sans and JetBrains Mono are local, licensed font subsets. No font provider request is required.
- Framer Motion is already installed. The mounted reveal component uses CSS and IntersectionObserver; no extra animation package is necessary.
- Typed project content, canonical URLs, Open Graph/Twitter cards, Person/WebSite/CreativeWork/Article schemas, robots and sitemap already exist.
- Security headers include nosniff, DENY framing, referrer and permissions policies, and a limited CSP. The CSP does not claim full script isolation.
- No analytics vendor, live feed, CMS, active newsletter endpoint or public deployment configuration was discovered. Contact prepares a local email draft; it does not deliver or persist a submission.
- Baseline typecheck, lint, production build and the existing twelve-route verifier passed in the isolated current-source copy.

## Assets and factual boundaries

The intended portrait-only PNG is present at `public/identity/florian-supplied-portrait.png`. It has no embedded website typography. Preserve its bytes and authentic visible appearance; use CSS lighting and responsive framing. It is supplied artwork with a masked face, not a complete photographic identity dataset.

The repository includes an actual Synapedia interface capture and a Neurocodex portfolio architecture capture. Suite has a labeled conceptual visual. Keep their distinct provenance. Synapedia, Suite and Neurocodex retain their existing purpose, stage and evidence labels. Lux Labs, Clipport and FLO.CLIPS are candidate names in the brief; this repository does not establish ownership, public functionality or suitable project destinations for them.

The user confirmed in this chat that 2000 is his birth year and may appear as `EST. 2000`. No full date of birth is inferred. Other biography and social profiles remain sourced from existing content.

## Design and engineering findings

| Finding | Treatment |
| --- | --- |
| Global blue accent, plum mode palette and light Story surface form separate visual systems | Establish one LUX NOIR token system and dark editorial sections |
| Hero ratio varies across several overlapping rules | Use a stable 52/48 desktop composition and a separate mobile composition |
| Mode labels are small at narrow widths; native controls work without JS | Add semantic button enhancement with arrow/Home/End navigation while retaining the native fallback |
| Mobile disclosure has Escape support but no scroll lock or background focus isolation | Add reversible scroll locking, focus cycling and inert background content |
| Hero introduction cycles unrelated verbs before the main identity | Replace with a short staggered name/portrait/metadata entrance |
| Existing CSS has legacy unmounted-component rules and hardcoded blue concept illustrations | Preserve unrelated legacy components; align mounted shared surfaces and illustration tokens |
| Existing source already supplies metadata, safe forms, project evidence and routes | Reuse these systems; avoid duplicate integrations |
| Existing Framer Motion dependency remains for legacy components | Add no dependency; do not remove a package used by preserved source |

## Implementation plan

1. Capture current file hashes, baseline checks and desktop/mobile screenshots.
2. Apply LUX NOIR tokens, restrained typography, the 52/48 hero and responsive portrait lighting.
3. Update the five modes to BUILD, THINK, CREATE, FIELD and ARCHIVE, with the supplied editorial headlines and codes 01–05. Improve semantic controls and retain JS-disabled operation.
4. Improve mobile menu focus, scroll behavior, header state and one-time section reveals. Keep reduced-motion content fully visible.
5. Refine verified work, About and social-card presentation. Keep every existing destination and email-draft workflow.
6. Run production checks, eight viewport widths, keyboard/fallback/slow-network/a11y tests and Lighthouse. Fix observed regressions and report measured limits.
7. Transfer only changed files whose original destinations still match the captured baseline. Deliver the six requested reports, source increment and before/after evidence.

## Preservation and rollback

The original repository contains extensive uncommitted changes. Development uses a sanitized copy of its current files, with existing dependencies reused. Secrets, Git internals, build caches and old QA outputs are excluded. Each transfer requires a matching baseline hash; a concurrently edited destination blocks that file from being overwritten.

Retain the original bytes of changed files in the local transfer backup. The delivered incremental patch can be inspected before use and reversed after checking for subsequent edits. Do not reset the checkout, stage unrelated work, merge or deploy. Local validation does not establish public hosting, legal compliance or field Core Web Vitals.
