# LUX NOIR v2 QA

11 October 2026. Tests run against the production build in an isolated current-source copy. Baseline checks also passed before modification.

## Automated results

| Check | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS, all twelve content routes |
| Existing `npm run verify -- http://127.0.0.1:3037` | PASS, 12 routes, zero failures |
| Chromium 154.0.8037.98 | PASS, 15 check groups |
| Firefox 153.0 | PASS, 10 check groups |
| Playwright WebKit 26.5 | PASS, 10 check groups |
| axe-core 4.14.0, WCAG 2 A/AA and 2.1 AA tags | Zero reported violations in 18 scenarios |
| Local navigation | 31 destinations respond successfully; linked fragments exist |
| Portrait and dependency lockfile SHA-256 | Unchanged |
| Recognizable source secret patterns | Zero matches; a scoped heuristic, not a security certification |

The 18 axe scenarios cover all twelve routes, all five homepage modes and the open mobile menu. Axe leaves contrast checks incomplete on image/complex-background content on home, About and the service page. Human contrast and assistive-technology review remain necessary. An earlier THINK sample caught the 240ms opacity entrance mid-animation; the final check waits for finite animations to finish and reports the settled rendered state without hiding violations or suppressing rules.

## Interaction and resilience coverage

- Five semantic mode buttons, exact copy/codes, one visible hero/work panel, native state alignment and pressed state.
- Arrow keys, Home/End, roving focus and visible focus outline.
- Widths 320, 375, 390, 430, 768, 1024, 1440 and 1920px: no document or name overflow; mode targets are at least 44×44px.
- Mobile menu: scroll lock, inert main/footer, first-link focus, Tab/Shift+Tab cycle, Escape/trigger restoration, link-close and desktop-resize cleanup.
- Native timeline disclosure and source-backed checkpoint detail.
- Reduced motion: all essential content available, no name entrance or portrait pointer transform.
- JS disabled: native mode selection, native menu and essential About/project/contact/service content work.
- Portrait request fails with 404: reserved frame and typographic fallback remain usable in all three engines.
- Slow network and 4× CPU: mode/menu/timeline interactions succeed; the short Event Timing sample is documented separately.
- No uncaught page errors throughout the route sequence; no external browser requests, cookies or storage writes in the tested default state. Sound is off by default.
- Analytics adapter ignores interactions without consent and reports only after an explicitly consenting test adapter is supplied. No real analytics service is called.
- Synthetic email-form values render correctly. The form remains a local `mailto:` draft; no submission or message is sent. Source uses `encodeURIComponent` and JSON-LD escapes `<`.
- Existing route verifier validates canonicals, JSON-LD, social metadata/image, robots, sitemap, security headers and genuine 404 responses.

The final production build also passes a targeted About link-separation and axe check in all three engines. All twelve routes are checked at all eight widths in Chromium, with no horizontal document overflow; see `qa/final-layout-report.json`. The final favicon uses the LUX NOIR palette.

## Visual evidence

`screenshots/` contains before/after desktop and mobile views, About, projects, the retained service page and the open menu. `qa/width-*.png`, `qa/reduced-motion.png` and `qa/missing-image.png` record narrower layouts and resilience states. The desktop and mobile compositions were visually inspected; the name, portrait, dark editorial rhythm and preserved project status labels are coherent.

## Remaining manual checks

Native Safari and physical iOS/Android devices are not certified by Playwright WebKit. Native VoiceOver/screen-reader announcements, image-overlay contrast, browser zoom/high-contrast preferences and actual mail-client draft delivery need manual review. No live hosting, DNS, public form delivery, external-profile availability, field INP or real-user Lighthouse guarantee is claimed. Preserved external links are not submitted to or audited as third-party services.

## Reproduction

Use the production build and the optional QA setup in `portfolio/README.md`. `scripts/verify-lux-noir.cjs` writes the machine report and viewport screenshots to `LUX_NOIR_QA_OUTPUT`; its default engine is Chromium. Select all three engines with `LUX_NOIR_BROWSERS=chromium,firefox,webkit`. QA tools stay separate from application dependencies. The full machine result is `qa/browser-report.json`.
