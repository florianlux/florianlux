# Portfolio Website Services Consolidation

Review date: 18 November 2026. Status: **technical review candidate PASS; public release BLOCKED**. No production deployment or merge was performed.

## Repository and Recovery Point

- Repository: `/Users/florianlux/Developer/florianlux`; application: `portfolio/`.
- Discovery branch: `master`; HEAD: `4b295534684870fbaf9540f2e64663c5e61b5e35`, one commit ahead of `origin/master`.
- Refreshed remote base: `829d9943777e4900e3de733adc03ae79347aba0f`.
- Review branch: `codex/portfolio-website-services-consolidation`.
- Discovery: 26 modified tracked files, 60 untracked files, no staged files, no conflicts, one worktree.
- External recovery directory: `/private/tmp/florianlux-consolidation-w8QSZY` (mode 0700; backup files mode 0600).
- Backup: `worktree-files.tar.gz`, `unstaged.patch`, `staged.patch`, `status.txt`, `manifest.json`, `history.bundle`.
- All 86 archived files were extracted into a separate recovery directory and their SHA-256 hashes matched the manifest. `git bundle verify` passed.
- Manifest SHA-256: `d72fdd4e79db49d1723c4f6997e178373efd9b025164267ced7cf32fbd09add8`.

The original master ref remains at its discovery commit. No reset, clean, stash, rebase or history rewrite was used. The external backup is local and should be moved to durable private storage before temporary-directory cleanup.

## Classification and Attribution

The complete per-file and per-hunk inventory is [portfolio-consolidation-change-matrix.json](portfolio-consolidation-change-matrix.json). Categories can overlap for shared integration and security configuration.

| Category | Scope | Treatment |
| --- | --- | --- |
| A: Website services | `/websites`, service block, mockups, request form, SEO and shared navigation/style references | Reviewed and integrated |
| B: Existing portfolio | LUX NOIR / MOTIONSWITCH, project/journal content, local fonts, portrait, metadata, existing release tooling and tests | Adopted intentionally as the current portfolio foundation in a separate commit |
| C: Independent creative work | `brain.psd`, `stickerpsd.psd`, `portfolio/brand/MOTIONSWITCH_SOCIAL_KIT.html` | Preserved byte-for-byte, untracked, excluded from commits |
| D: Generated/system data | Modified root `.DS_Store`, `.next`, dependencies, QA screenshots/reports and TypeScript caches | Excluded from new commits; `portfolio/output/` ignored |
| E: Sensitive configuration boundary | Blank `.env.example`, CSP/release gates and existing disabled contact-service source | Reviewed; no actual credentials, provider activation or real `.env` files |

The inherited feature commit `4b29553` already combined website services with other portfolio files and added `.DS_Store` during the earlier user-requested `git add .`. That historical commit was preserved. No additional system metadata is staged by this consolidation. The branch diff therefore contains the earlier feature commit as well as the deliberately separated current integration; it is not presented as a newly isolated feature-only history.

Mixed files are mapped at hunk level. Service references (A) and their retained layout/token/security context (B/E) are reviewed together as one functioning integration. Independent C/D files are never staged. The original foundation was staged from saved snapshot bytes, leaving current working files untouched; the subsequent commit contains only the reviewed delta against that foundation.

## Architecture and Changes

The app retains Next.js App Router, React 19.2.4, TypeScript and Tailwind 4. Server-rendered pages use small client enhancements for modes, navigation, portrait fallback and contact drafts. No new application dependency or backend integration was introduced.

- Restored the existing `WebsiteServiceBlock` after featured work on the current homepage, with scoped service CSS and German language marking.
- Restored a desktop Websites link; existing mobile services link, contact path, footer, project pages and five identity modes remain available.
- Reused identity tokens and retained the original CSS/HTML mockups. Corrected the homepage block's heading scale and unnecessary word breaks; moved an overlay off the mockup title.
- Added local request validation, stable field names, linked errors, first-error focus, length limits and the explicit `E-Mail-Entwurf öffnen` action.
- Added German Twitter metadata for `/websites`, aligned with its existing canonical and Open Graph metadata.
- Fixed WebKit's missing mode-button focus outline after arrow/Home/End selection.
- Upgraded Next.js and eslint-config-next from the uncommitted 16.4.0 baseline to 16.4.6 after npm confirmed security advisories.
- Added `verify:websites` and focused draft-validation/encoding tests. Optional untracked brand files are no longer required for the source scanner to run in a clean checkout.

Existing historical audit documents are preserved as provenance. Their older performance numbers, dates and content assertions are not treated as fresh validation of this commit.

## Form and Contact Boundary

`WebsiteRequestForm` requires name, a valid email and a message. Company/project and need are optional; budget is an enumerated select. Validation returns German field messages, `aria-invalid`, `aria-describedby` and focus on the first problem. Explicit label spans keep accessible names stable when error text appears. Keyboard submission works.

The recipient follows the existing `identity.email`: `mngmt@synapedia.com`. The form generates only `subject` and `body` using `encodeURIComponent`; tests round-trip umlauts, international names, `&`, `?`, `#`, percent signs and multiline text. Header-like single-line input is rejected. The action opens an email draft and never reports a sent inquiry. A direct mail link remains without JavaScript. A source comment identifies the handoff point for any separately authorized future server action.

No actual mail client was invoked and mailbox delivery was not tested. Mailto handling and practical URL-length limits depend on the recipient's device/mail application. The pre-existing optional Brevo/Redis adapter remains disabled by configuration and evidence gates; `/api/contact` rejects unavailable delivery before reading private input. No account, provider, mailbox or infrastructure setting was changed.

## Technical Verification

Application source commit: `4d31def7f48515be4dea29bff65cb6f422905a47`.

| Executed check | Result |
| --- | --- |
| `npm ci` against intended baseline lockfile | PASS; exposed installed Next 16.2.3 vs intended 16.4.0 mismatch, then installed intended versions |
| `npm run lint` | PASS |
| `npx tsc --noEmit` | PASS |
| `npm test` | PASS: 21 tests, zero failures |
| `npm run build` | PASS with Next 16.4.6 / webpack |
| `npm run check:security` | PASS: no credential-pattern or server-marker findings; supplied portrait hash unchanged |
| `npm run verify -- http://127.0.0.1:3037` | PASS: 15 content routes, metadata, schemas, headers, social image, sitemap/robots and actual 404s |
| `npm run verify:ui` with Chromium and WebKit | PASS: 15 Chromium groups + 10 WebKit groups |
| `npm run verify:websites` | PASS: 30 primary-page/viewport/engine cases and keyboard validation in both engines |
| `npm run verify:release` | PASS: 5 groups, 120 route/width cases, contact disabled/privacy checks and 200% text reflow |
| `PORTFOLIO_PUBLICATION_MODE=public npm run check:release` | BLOCKED as expected: incomplete facts, review flags and legal draft markers |

The full application validation was also repeated in detached clean worktree `/private/tmp/florianlux-consolidation-w8QSZY/candidate` at the source commit. Fresh `npm ci`, lint, TypeScript, 21 tests, production build and source security check passed there. The optional local social kit and independent PSD files were absent from that checkout. Generated `.next` files and QA state are not required source dependencies.

Node runtime: 22.22.3. Playwright: 1.58.2. Browser and axe packages were reused from external local QA tooling, outside the application lockfile. Existing tests for an enabled delivery UI were not activated: the optional mocked UI fixture was NOT_RUN. Server-boundary behavior is covered by the executed unit tests; no real provider delivery is inferred.

## Visual and Accessibility Evidence

Direct Playwright screenshots replaced the former in-app screenshot wrapper, which had timed out. Direct capture completed without those timeouts. `/`, `/websites` and `/contact` were checked at **360, 390, 430, 768 and 1440px** in Chromium **145.0.7632.6** and WebKit **26.0**. Every case checked HTTP response, horizontal overflow, clipped heading/button text, visible images, navigation collisions and runtime errors. All 30 passed.

Evidence directory: `portfolio/output/playwright/consolidation/`. It contains viewport captures, full-page desktop/mobile captures, form-error views, reduced-motion and missing-image views, browser reports and both overview sheets. Both overview sheets, full-page compositions and focused views were visually inspected. Header, portrait crops, mobile CTA stacking, demos, prices, inquiry fields and footer remain readable and usable. This is a dark-only design with the retained dark color scheme.

The scripted suites check mode arrows/Home/End, menu Tab cycling/Escape/focus restoration, reduced motion, JavaScript-disabled content, missing-image fallback, local destinations/fragments and no default external requests or storage writes. In addition, a step-by-step manual browser check used Tab/Shift+Tab in the request form and Return on the empty form. Focus moved to company and back to name; the visible first-error focus ring and German messages were inspected.

Axe reported **zero violations across 21 WCAG-tagged scenarios**, plus the contact 200% text scenario in the release suite. Complex/image-background color-contrast evaluations remain incomplete on home, About, service mockups and mode views. Those limitations are retained in [the machine-readable evidence](portfolio-websites-validation.json). Native VoiceOver, physical iOS/Android, high-contrast preferences and real mail-client behavior are NOT_RUN. These results do not certify full WCAG 2.2 AA conformance.

## Performance

Local production preview on loopback; headless Chromium, fresh page contexts, unthrottled layout/screenshot runs. These are observations under local lab conditions, not Lighthouse scores or production guarantees. Resource sizes are browser-reported encoded transfer bodies.

| Route | Width | Observed LCP | Observed CLS | JavaScript |
| --- | --- | --- | --- | --- |
| `/` | 390 | 56 ms | 0 | 148,937 bytes |
| `/` | 1440 | 876 ms | 0 | 154,064 bytes |
| `/websites` | 390 | 36 ms | 0.000147 | 154,064 bytes |
| `/websites` | 1440 | 44 ms | 0.000025 | 154,064 bytes |
| `/contact` | 390 | 40 ms | 0 | 151,751 bytes |
| `/contact` | 1440 | 40 ms | 0 | 156,878 bytes |

The separate scripted interaction sample used a 390px viewport, 150ms latency, 60KB/s network and 4x CPU slowdown. Seven Event Timing interaction samples had a 40ms maximum. This short sequence is **not field INP**. Field CWV and Lighthouse are NOT_RUN. No additional animation or client runtime was introduced. Fonts are served locally; the browser suite found no default external requests. The supplied PNG remains byte-identical (2,051,569 bytes); observed homepage optimized-image transfers were 5,574 bytes at 390px and 17,526 bytes at 1440px.

## SEO and Publication

The service page has the exact absolute German title, description, canonical `/websites`, German OG locale, local share image, Twitter metadata, a single H1, breadcrumbs and one service schema with a stable ID. Demo concepts are explicitly identified; the unsupported numeric Mobile Score was already removed by the reviewed foundation. No ratings or fake customers were added.

The existing canonical origin remains `https://florianlux.dev`; the brief's `florianlux.work` reference was not used to silently change it. Actual domain ownership/canonical destination still requires confirmation. Preview mode intentionally emits `noindex`, `nofollow`, `noarchive`, robots disallow and an empty sitemap. The public-mode source sitemap includes `/websites`; the publication gate prevents public mode until its evidence is completed. Preview indexing controls are not remote access authentication.

## Security and Release Blockers

The initial Next 16.4.0 build stopped on a security advisory. npm confirmed affected Next versions; upgrading to 16.4.6 removed the runtime audit findings and the build failure. Final `npm audit --omit=dev --json` passed with **zero vulnerabilities**. Full `npm audit --json` still reports **9 high and 6 moderate development-tooling entries**, including glob matching and the ESLint toolchain. No forced major downgrade or unrelated toolchain rewrite was applied. Treat full dependency security as FAIL until these are reviewed/resolved.

Source/client-boundary scanning found no recognizable credential values or private server markers in browser chunks. No active `.env` file was present. Staged files were checked by path and content before commit; blank configuration examples were reviewed. The source scanner is heuristic, not a comprehensive secret-security certification. Preserved third-party font-license bytes contain one upstream trailing space; this does not affect lint or builds.

Public release remains BLOCKED by missing operator address, legal/privacy review, hosting/provider/location/log-retention/contracts, mailbox verification and retention, media-rights evidence, canonical confirmation and explicit owner release approval. No unknown fact or approval flag was filled in. This task grants a draft-review branch, not production publication.

## Commits and GitHub

- Inherited feature: `4b29553 feat(portfolio): add premium website service landing page`.
- Reviewed foundation: `0ecf520 chore(portfolio): consolidate reviewed portfolio foundation`.
- Focused fixes: `4d31def fix(portfolio): validate website inquiries and harden service integration`.
- This report, inventory and validation receipt are the following documentation commit; resolve its exact SHA with `git log -1 -- docs/PORTFOLIO_WEBSITES_CONSOLIDATION.md`.
- Draft PR: [florianlux/florianlux#2](https://github.com/florianlux/florianlux/pull/2), target `master`.
- GitHub Actions queries returned no runs for the reviewed commits. **GITHUB_ACTIONS=NOT_RUN**. There is no observed billing failure; `CI_UNAVAILABLE_BILLING` is therefore not claimed.
- The existing Netlify integration automatically created a `deploy-preview` when the draft PR was pushed. Its status check reports success for `2ef0630`, but read-only requests to `/`, `/websites` and `/contact` all returned **404**. This status is not a passing application smoke test. No app CSP was present; Netlify returned `X-Robots-Tag: noindex`.
- Observed preview deploy: `6afddb538d71a7d004588a68`; [Netlify deploy details](https://app.netlify.com/projects/adorable-bunny-27729a/deploys/6afddb538d71a7d004588a68). It reports an unknown framework and no server/functions or processed header rules. The exact host build/publish settings were not returned by the available read API; a wrongly targeted source/static publish is an inference, not a verified setting.
- Netlify project access controls report no password requirement or team SSO. A hosted preview therefore does not satisfy the documented authenticated-preview requirement. Hosting configuration and preview access control are **BLOCKED** pending an intentional host review; no paid feature or security setting was changed.
- Production remains at deploy `69df1641f73c1000081672f6`, commit `829d9943777e4900e3de733adc03ae79347aba0f`, originally published on 15 April 2026. The candidate was not published to production. **DEPLOYMENT_STATUS=NOT_DEPLOYED (production); AUTOMATIC_PREVIEW=FAIL (routes)**.

## Rollback and Next Action

For this incremental fix alone, inspect `git show 4d31def` and revert that commit in a new clean review branch if needed. The foundation remains independently reviewable. Reverting the foundation also requires considering its source dependencies; never revert it in isolation beneath the service fix or overwrite the current dirty worktree.

To recover the complete original local state, create a separate recovery checkout from `history.bundle` at `4b29553`, apply the saved nonempty tracked patch, then extract `worktree-files.tar.gz` there and compare every file with `manifest.json`. The original index was empty. Do not restore over subsequent work without first checking hashes and differences.

The next action is review of the draft PR, correction of the existing host build/publish setup with authenticated preview access, and completion of legal, hosting, mailbox and media evidence plus the outstanding development-tooling security review. Production release approval is a later, explicit step. The locally validated candidate is ready for that review; hosted acceptance and public release remain blocked.
