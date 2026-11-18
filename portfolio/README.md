# Florian Lux — digital identity

An original personal site for Florian Lux: developer, founder and creative technologist. Next.js App Router, TypeScript and React; English portfolio with the retained German website-service page.

## Run and validate

Run these commands from `portfolio/`, using the existing npm lockfile:

```sh
npm ci
npm run dev
```

Development defaults to `http://localhost:3000`. No environment variables or external account credentials are required.

```sh
npm run lint
npm run build
npm run typecheck
npm run start -- --hostname 127.0.0.1 --port 3016
```

In another terminal, verify the running production build:

```sh
npm run verify
# Or supply the URL of a different running instance:
npm run verify -- http://localhost:3000
```

`verify` checks every content route, canonicals, structured data, social metadata, security headers, sitemap, robots, social-image response and real 404 responses. The production build uses Next's supported webpack mode, which completed reliably in this workspace. No new runtime dependencies were added for this redesign.

## Design and architecture

LUX NOIR v2 uses a near-black canvas, off-white type and restrained plum accents. A 52/48 desktop hero pairs the editorial identity with the owner-supplied portrait. Mobile has its own image-led composition. Dark, slightly elevated Story and NOW sections set the rhythm. Product presentations retain their actual stages and evidence.

`src/app/globals.css` owns colors, fluid typography, spacing, radii, elevation and motion tokens. Layout thresholds are 640px, 800px and 1000px. `src/app/website-service.css` is imported by `/websites`; all selectors are scoped under `.website-page` so retained styles cannot change portfolio layouts after client navigation.

Pages and project visuals render on the server. The small `FadeIn` enhancement uses IntersectionObserver to add an entrance only after content already exists visibly; JavaScript failure never leaves content hidden. CSS respects reduced motion. The native mobile disclosure and ecosystem radio group remain operable without JavaScript, with text relationship descriptions and keyboard support. No WebGL renderer, video, runtime analytics or third-party data SDK is mounted.

Fonts are licensed local Instrument Sans and JetBrains Mono subsets. Their SIL Open Font Licenses are in `src/app/fonts/`. Main font display is optional; the mono face is not preloaded. No build-time font download or external font request is required.

## Content maintenance

- `src/app/site-data.ts`: identity, contact destination, social profiles, project stage/evidence and the three substantive journal notes.
- `src/components/ProjectShowcase.tsx`: existing Synapedia screenshot and original, explicitly conceptual Suite/exploration diagrams.
- `src/app/page-metadata.ts`: shared per-page canonical and social-card metadata.
- `src/components/StructuredData.tsx`: connected Person, WebSite, CreativeWork, Article and breadcrumb entities; JSON serialization escapes `<`.
- `src/app/opengraph-image.tsx` and `src/app/icon.svg`: original brand sharing image and icon.
- `src/app/sitemap.ts`: the twelve content routes and their editorial modification date. Update the date when published content changes.

Synapedia is presented as public, Suite as in development, and Neurocodex as exploration. Source references and stages must stay aligned across visible copy, project evidence and schema. Lux Labs, FLO.CLIPS and WinPilot OS await ownership and product evidence. Journal entries document this implementation; they do not invent past publications.

Contact links open a mail client. The German request form prepares an email draft locally; it neither sends nor stores submissions. Without JavaScript, it offers a direct email link. Delivery is not independently tested.

## Publication boundary

The existing canonical origin `https://florianlux.dev` is configured in `site-data.ts`; hosting, DNS and a live portfolio deployment were not verified. Confirm the origin before publishing. The basic CSP covers embedding, base URLs, objects and form destinations; a host-specific script policy is a separate deployment task.

There is no newsletter enrollment, paid checkout or downloadable Suite binary. Public links do not imply API access. Integration permissions, caching, rate limits and fallbacks are documented in [the integration contracts](../docs/portfolio-integrations.md).

The [pre-implementation audit](../docs/portfolio-audit.md) records the original state. The [validation report](../docs/portfolio-validation.md) records actual local results, conditions and remaining production checks. Browser screenshots and machine reports are in ignored `output/playwright/`; they are local evidence rather than application assets.


## MOTIONSWITCH increment - 11 October 2026

The homepage uses the owner-supplied portrait artwork and five modes, now ordered:
BUILD, THINK, CREATE, FIELD and ARCHIVE. Mode definitions, typed person/media
models, dated editorial NOW and source-backed repository timeline live in
`src/app/motionswitch-data.ts`. `motionswitch.css` extends the retained tokens.
Small client enhancements add image failure handling, announcements, a bounded
pointer spring and optional sound. There is no new analytics vendor; the
optional adapter requires consent. Essential mode selection works without JS.

See `../docs/motionswitch-audit.txt` and `../docs/motionswitch-qa.txt` for source
provenance and current validation. The earlier notes above describe the retained
portfolio foundation. The supplied artwork supersedes the earlier homepage
photography fallback; it does not provide a full identity reference dataset.

The portable social kit is in `brand/MOTIONSWITCH_SOCIAL_KIT.html`. Open it in a
browser to edit still templates or preview the thirty-second timing study.
Actual process/result footage must be added in a video editor.

## LUX NOIR v2 validation

`EST. 2000` is the owner-confirmed birth year. The supplied portrait bytes remain
unchanged. Five semantic buttons enhance the native radio fallback; arrow keys,
Home and End select modes. Mobile navigation locks background scrolling, isolates
focus and closes on Escape. Reduced motion removes the entrances and pointer spring.

The six current reports are in `../docs/lux-noir-v2/` in the original repository
and beside this application in the portable delivery. Earlier audit reports above
describe the retained foundation. The source adds no application dependency.

The optional browser suite uses separate QA tooling. With the production server
running at port 3037, install tools outside the application dependency graph:

```sh
npm install --prefix .qa --no-audit --no-fund playwright axe-core
./.qa/node_modules/.bin/playwright install chromium firefox webkit
LUX_NOIR_PLAYWRIGHT_MODULE="$PWD/.qa/node_modules/playwright" \
LUX_NOIR_AXE_MODULE="$PWD/.qa/node_modules/axe-core" \
LUX_NOIR_BROWSERS="chromium,firefox,webkit" \
LUX_NOIR_QA_OUTPUT="$PWD/output/lux-noir" \
npm run verify:ui -- http://127.0.0.1:3037
```

An installed Chrome executable can optionally be selected with `LUX_NOIR_CHROME`.
The suite checks routes, local link destinations, WCAG axe rules, mode controls,
menu focus, eight widths, reduced motion, JS-disabled operation, image failure,
consent defaults and a throttled interaction sequence. It fills synthetic form
values but does not send email. WebKit automation does not certify native Safari,
VoiceOver or physical iPhone behavior. Lighthouse and Event Timing are local lab
measurements; public Core Web Vitals still require field data.


## Release 2026: legal preparation and contact boundary

The existing LUX NOIR / MOTIONSWITCH identity and content routes remain. New legal routes are explicitly incomplete drafts. The complete release/processor/security reports are in the repository-level docs directory. Public release is BLOCKED.

### Local verification and preview

Node >=20.9 is required. The audited local runtime was Node 25.8.0. Install the locked application dependencies with npm ci, then use:

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

Preview listens on 127.0.0.1:3037. Development also binds loopback; npm start uses the guarded production-build launcher. Stop the owned preview process with Ctrl-C. The default publication mode is preview, with global noindex, disallow and an empty sitemap. These controls are not remote authentication. Before any hosted preview, verify authentication at the existing host, including direct deploy URLs. No hosting resources or public deploy were created.

`PORTFOLIO_PUBLICATION_MODE=public` is blocked until the fixed review requirements in release-evidence.json and all required facts are confirmed and legal draft markers are removed. The Next configuration checks this even for direct Next commands. HSTS remains disabled until production HTTPS and its scope are verified; no includeSubDomains/preload assumption is made.

### Contact delivery: deliberately disabled

The recipient is mngmt@synapedia.com. DNS does not verify that mailbox. The UI prepares a RAM-only mail draft; it does not submit inputs to the disabled endpoint. /api/contact returns 503/no-store before reading the body or contacting a provider while configuration/review is absent. Do not send a test mail or change an existing mailbox without appropriate authorization.

`.env.example` is a safe configuration template, not active credentials. The optional adapter uses Brevo's transactional-email API and shared Upstash Redis REST; no accounts, databases or contracts were created. Activate only after confirmed mailbox, privacy/data-flow review, approved providers/regions/contracts and an authorized verified sender. The sender may differ from the recipient; the visitor address is Reply-To, never a forged sender.

Configure secrets server-side only: CONTACT_BREVO_API_KEY, CONTACT_REDIS_REST_TOKEN and CONTACT_ABUSE_SECRET (at least 32 characters; generate securely in the approved secret store). Set HTTPS CONTACT_ORIGIN and a verified CONTACT_FROM_EMAIL. CONTACT_REDIS_REST_URL accepts only HTTPS Upstash domains without redirect/query/credential components. All feature/review/verification flags stay false until their evidence exists. Never use NEXT_PUBLIC_ prefixes for these values, commit actual .env files, paste keys into reports or log message contents.

The trusted IP header must be overwritten by the approved edge and the direct origin must be inaccessible. Supported headers are x-nf-client-connection-ip or x-vercel-forwarded-for; their mere presence is not proof of trust. A real deployment must validate the chosen platform behavior. Without that proof the service stays closed. The atomic Lua counter is shared across instances (5 submissions or 20 challenges per 10 minutes). Redis stores HMAC IP-derived keys, counts and HMAC nonce claims for 600 seconds, not the body or visitor email. These are pseudonymous data and require appropriate disclosure/provider review.

The signed challenge needs a minimum 1.2-second age, expires after 10 minutes, and is claimed atomically before delivery. Replay gives 409; limiter outage gives 503; rate excess gives 429/Retry-After; malformed/oversized data is rejected. Bodies are capped at 24KB with a 5-second read deadline, limiter requests at 5 seconds and provider requests at 8 seconds. Provider redirects are refused. Network uncertainty is never reported as delivery success or automatically retried; the operator must decide any follow-up after checking the provider. A successful response only confirms API acceptance, not inbox delivery.

### Meaningful QA

Node tests cover configuration/release gates, input abuse, consent-free closed behavior, trusted origin/IP, shared limiter failures, challenge signature/expiry, recipient/sender isolation and atomic replay protection. Browser scripts support external local Playwright/axe installations using LUX_NOIR_PLAYWRIGHT_MODULE, LUX_NOIR_AXE_MODULE, LUX_NOIR_CHROME and LUX_NOIR_QA_OUTPUT. Existing verify-lux-noir.cjs covers Chromium/Firefox/WebKit; verify-release.cjs adds contact/legal/reflow checks. Its enabled-form UI fixture uses mocked local responses only and is not an app route or provider-delivery proof.

Runtime npm audit is clean at the audit timestamp. Five high development-chain entries remain around braces through the Next ESLint plugin; no forced major downgrade was applied. Keep auditing before actual release. See docs/SECURITY_AUDIT.md for the exact limitation and docs/LEGAL_RELEASE_CHECKLIST.md for operator gates.
