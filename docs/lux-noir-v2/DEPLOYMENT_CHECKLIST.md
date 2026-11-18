# LUX NOIR v2 deployment checklist

Local implementation and automated verification are complete. Public deployment is not performed.

## Before publication

- [ ] Review the actual source increment and screenshots; retain the truthful project stages, evidence and artwork provenance.
- [ ] Resolve the existing dirty checkout into deliberate original-repository commits. The delivered standalone review bundle provides the increment history; it is not an original-repository merge branch.
- [ ] Confirm the canonical origin, domain ownership and hosting target. The retained `https://florianlux.dev` value is existing configuration, not verified DNS or live ownership evidence.
- [ ] Run `npm ci`, lint, typecheck and the webpack production build in the host environment using the retained lockfile and a supported Node runtime.
- [ ] Re-run the twelve-route verifier and browser suite against the intended preview. Confirm redirects, image optimization, local fonts, social image, sitemap, robots, canonical URLs and genuine 404 handling there.
- [ ] Review native Safari/physical devices, VoiceOver, image-overlay contrast, zoom and high-contrast settings. Confirm the actual mail-client draft with consented test values.
- [ ] Verify that security headers survive the hosting adapter. The retained CSP restricts framing, objects, base URLs and form destinations; it is not a full nonce-based script policy.
- [ ] Confirm all public profile/contact destinations and the dated editorial NOW. Candidate brands require real evidence before public cards or schemas are added.
- [ ] Repeat Lighthouse on the actual host and monitor field LCP/CLS/INP when real-user evidence is available. The local mobile LCP measurement has a small margin to 2.5s.
- [ ] Obtain the owner's publication authorization for the concrete preview before deploying. No automatic merge or deployment is part of this delivery.

## After an authorized deployment

- [ ] Verify the actual public URL and deploy identifier, all twelve routes, image/font delivery, security headers, social metadata and local email-draft behavior.
- [ ] Keep sound opt-in and any analytics adapter consent-gated. There is no automatic newsletter, checkout or live-feed integration.
- [ ] Record real field evidence separately from the local test reports. Observe actual error logs and accessibility reports; do not infer success from an empty data source.

## Rollback

The original checkout is protected by captured baseline hashes, a transfer receipt and a local backup of replaced files. The delivered `lux-noir-v2.patch` represents only this increment on the current-source baseline. From the original repository root, use `git apply --reverse --check /path/to/lux-noir-v2.patch` before considering reversal. Proceed only if it succeeds and no later work depends on the increment. The patch removes the two newly introduced application files and six new report files, and restores only this increment's modified files. Do not reset the repository or remove unrelated untracked content.

No infrastructure, database, DNS, secret, payment or third-party account is mutated by the implementation.
