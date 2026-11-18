# Portfolio validation — 11 October 2026

The redesign is implemented in the existing `portfolio/` Next.js application. Final browser checks completed at 2026-10-11T02:59:09Z. This report covers a local production build, not a published deployment. No commit, push or deployment was performed. The unrelated root `.DS_Store`, `brain.psd` and `stickerpsd.psd` were left intact.

## Delivery

The flagship homepage includes the requested hero, typographic About profile selected by the owner, selected work, interactive ecosystem, engineering examples, journal and contact sections. Original brand vectors, responsive typography, local licensed fonts and a restrained motion system establish the new identity. Existing routes and German website-service offers are retained. Five substantive routes were added: the Suite case study, journal index and three implementation articles.

Synapedia, Suite and Neurocodex have source references and distinct public/development/exploration stages. Candidate brands without sufficient evidence are documented rather than published as products. The integration contracts classify public links and future data/authenticated services. Current operation requires no account tokens, newsletter provider or analytics service.

## Build and HTTP contracts

| Check | Result |
| --- | --- |
| ESLint | Passed |
| TypeScript, `tsc --noEmit` | Passed |
| `next build --webpack` | Passed; all twelve content routes prerendered |
| `npm run verify` | Passed; twelve routes, zero failures |
| Content route responses | HTTP 200 |
| Unknown route and unknown journal note | HTTP 404 |
| Social image | Original 1200 × 630 PNG served successfully |
| Canonicals, OG/Twitter metadata | Present and correct for every content route |
| JSON-LD | Parseable; identity, project and article entities match route purpose |
| Sitemap / robots | Twelve unique content URLs; configured origin and sitemap reference match |
| Security headers | `nosniff`, denied framing, referrer and permissions policy, basic CSP; powered-by disabled |

HTTP checks run with `node scripts/verify-portfolio.mjs` against `http://127.0.0.1:3016`. The repository includes the checker without a new test dependency. Build mode uses webpack because a repeat Turbopack build stalled in this workspace. That is a local build observation, not a claim that Turbopack is generally incompatible.

When deliberately probing an unknown statically generated journal slug, Next.js 16.2.3 logs an internal `NoFallbackError`. The checked external response is the expected HTTP 404; the twelve content routes return HTTP 200. This server diagnostic is retained as an observation rather than claiming that server logs are completely clean.

## Browser acceptance

Chrome 154 on macOS, Playwright CLI against the same local production server. Twelve routes were checked at widths 320, 390, 768 and 1440px: **48 of 48 passed**, with no horizontal overflow, one primary heading, correct canonical, parseable schema and successful responses. No browser page errors were recorded during these checks.

All twelve primary headings and their page content remain visible with JavaScript disabled. Without JavaScript, the native mobile menu opens and navigates, the ecosystem selection displays the corresponding relationship description, and the service page provides a direct contact link.

Keyboard checks passed for the skip link and main-content focus, Escape closing the mobile menu with focus returned to its summary, and radio-group arrow navigation updating the ecosystem. With reduced motion, the brand illustration's animation is `none` and scroll behavior is `auto`.

Client-navigation testing identified retained service CSS changing homepage gutters after visiting `/websites`. All service selectors are now scoped to `.website-page`. The executed `style-isolation.txt` check passed: homepage section styles before and after this client-navigation round trip are identical (desktop horizontal padding remains 56px).

Browser evidence is retained locally:

- `portfolio/output/playwright/browser-acceptance.txt` — executed acceptance function.
- `portfolio/output/playwright/browser-results.json` — recorded results.
- `portfolio/output/playwright/accessibility-check.txt` and `accessibility-results.json` — automated accessibility checks and results.
- `portfolio/output/playwright/desktop-home.png`, `desktop-full.png`, `mobile-viewport.png`, `mobile-home.png` — inspected desktop and mobile compositions.

axe-core 4.14.0 checks for WCAG 2 A/AA and 2.1 AA found **zero violations across all twelve routes** after correcting dark-context profile-label contrast and the service page's labeled group. Solid service-card surfaces also remove ambiguous gradient contrast evaluation.

axe retained contrast review items on the homepage (five decorative arrow/SVG elements) and service page (ten decorative mockup elements and two Demo-Konzept captions). Decorative content is hidden from the accessibility tree and has textual alternatives. The two caption instances were inspected visibly and their style contrast calculated against the solid `#101114` surface: **5.85:1**, above 4.5:1. These review items remain in the machine report rather than being silently deleted. Automated checks do not establish full WCAG conformance or replace assistive-technology testing.

## Measured homepage performance

Lighthouse **13.5.0**, HeadlessChrome **154.0.0.0**, navigation mode against the production server on loopback. Browser storage reset; simulated throttling. These are lab measurements of the homepage. They do not establish live hosting or every route's Lighthouse score.

| Metric | Mobile | Desktop | Requested target |
| --- | --- | --- | --- |
| Performance | **99** | **100** | ≥ 90 |
| Accessibility | **100** | **100** | ≥ 95 |
| Best practices | **100** | **100** | — |
| SEO | **100** | **100** | ≥ 95 |
| LCP | **2.232 s** | **0.497 s** | ≤ 2.5 s |
| CLS | **0** | **0** | ≤ 0.1 |
| TBT | 1.5 ms | 0 ms | Diagnostic; not INP |
| Field INP | Not measured | Not measured | ≤ 200 ms |

Mobile conditions: 412 × 823 viewport, device scale 1.75, RTT 150ms, throughput 1638.4Kbps and 4× CPU slowdown. Desktop conditions: 1350 × 940 viewport, device scale 1, RTT 40ms, throughput 10240Kbps and 1× CPU. Fetch timestamps were 2026-10-11T01:01:34Z (mobile) and 01:02:25Z (desktop). No failed binary Lighthouse audits remained. Subsequent changes were scoped service styling, service group semantics and About-profile label contrast; the homepage composition and runtime behavior were unchanged.

Full reports: `portfolio/output/playwright/lighthouse-mobile.report.html` / `.json` and `lighthouse-desktop.report.html` / `.json`. Report files are ignored local QA output; this document preserves the measured values and conditions.

Representative measurement command, with Lighthouse CLI supplied by the temporary QA tooling rather than the application:

```sh
lighthouse http://127.0.0.1:3016 \
  --chrome-flags='--headless' \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output=html \
  --output-path=output/playwright/lighthouse-mobile --quiet
```

Desktop adds `--preset=desktop` and uses a separate output path. Actual invocation used the CLI's installed `cli/index.js` with Node. A single navigation cannot verify real-user INP; small TBT must not be substituted for it.

## Remaining production evidence

Before publication, confirm the intended canonical origin and hosting configuration. After deployment, verify actual headers, routes, social-card fetches and asset serving on that host. Field Web Vitals, including INP, need representative live interaction data. Mailbox delivery and social-account access were not exercised; contact is a local email draft workflow. Authenticated feeds, metrics, newsletter, analytics and unverified candidate projects remain separate future work under the documented integration contracts.
