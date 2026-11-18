# LUX NOIR v2 performance

Measured on 11 October 2026 against the local production build at `http://127.0.0.1:3037/`, with Lighthouse 13.5.0 and isolated Headless Chrome 154. Each row is one lab run. A local server does not measure public hosting, real networks or field Core Web Vitals.

| Metric | Before, mobile | After, mobile | After, desktop | Target |
| --- | ---: | ---: | ---: | ---: |
| Performance | 96 | 97 | 100 | ≥90 |
| Accessibility | 100 | 100 | 100 | ≥95 |
| Best practices | 100 | 100 | 100 | ≥95 |
| SEO | 100 | 100 | 100 | ≥95 |
| LCP | 2.697s | 2.477s | 0.634s | ≤2.5s |
| CLS | 0.00349 | 0.000923 | 0.001149 | ≤0.1 |
| Total blocking time | 6ms | 6.5ms | 0ms | Lab diagnostic |

All requested Lighthouse score targets pass in these runs. Mobile LCP is close to the threshold; repeat on the chosen public host and collect field data before treating it as a persistent guarantee. There is no before-desktop run.

## Conditions and payload

Mobile uses Lighthouse simulated throttling, a 412×823 viewport at device scale 1.75, 150ms RTT, 1,638.4Kbps throughput and a 4× CPU slowdown model. Desktop uses 1350×940, 40ms RTT, 10,240Kbps and a 1× CPU model. Full configuration, environment, diagnostics and audit results are saved in the adjacent JSON and HTML Lighthouse reports.

The measured loaded-resource transfer weight is 299,353 bytes on mobile and 312,314 bytes on desktop. The entire production static JavaScript directory contains 931,154 uncompressed bytes across routes; that is not the initial-route transfer payload. No new application package, remote font, animation renderer, tracking vendor or live-feed SDK is added.

Image optimization and responsive sizes reuse Next.js. The original portrait bytes remain intact. Local fonts, a preloaded hero image, a reserved portrait frame, CSS motion, an intersection sentinel and a bounded fine-pointer spring keep the interaction path small.

## Interaction latency

The browser suite observes Event Timing during a short scripted mobile sequence under 150ms latency, 60KB/s throughput and 4× CPU throttling. Eight observed interactions have a maximum rounded duration and p98 candidate of 16ms. This is a lab sample, not field INP. Lighthouse does not establish the requested field INP ≤200ms target; that target remains unverified until real-user data is available.

No analytics vendor or collection endpoint was added to manufacture field evidence. Reduced-motion, JS-disabled, missing-image and slow-network checks pass independently of these scores.
