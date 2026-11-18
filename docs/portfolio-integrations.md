# Public identity and integration contracts

Evidence checked 11 October 2026. Public content lives in `portfolio/src/app/site-data.ts`. The portfolio makes no runtime external data requests, stores no submitted contact data, and has no analytics or newsletter SDK. There are no credentials or environment variables required for the current application.

## Current publication decisions

| Item | Evidence | Public presentation |
| --- | --- | --- |
| Florian Lux | Owner repository README; [Synapedia About](https://synapedia.com/about) identifies founder / product and technology | Developer, founder, creative technologist; background in healthcare IT, without employer, dates, awards or added qualifications |
| Synapedia | Public platform, About page, existing repository screenshot | Public platform; descriptive features and source links, without user counts, clinical endorsements or indexing claims |
| Synapedia Suite | [Public preview](https://synapedia.com/suite) fetched over verified HTTPS | In development; conceptual workspace illustration, without distribution, payments, approved product screenshots or enrollment |
| Neurocodex | Owner README and [public repository](https://github.com/florianlux/neurocodex); repository README also describes Synapedia | Exploration, without claiming a separate launched neuroscience platform |
| Lux Labs, FLO.CLIPS, WinPilot OS | Candidate names in brief; ownership and public functionality not established | Excluded from public work and schema until owner supplies supporting evidence |
| Portrait | No approved asset in repository; owner selected typographic profile | Original initials treatment; no synthesized face or imported photograph |
| Contact | Owner README explicitly publishes `luxflorian2@gmail.com` | Direct email app link and local draft preparation. Mailbox delivery has not been tested. Previous `hello@florianlux.dev` was inconsistent and not independently evidenced. |
| Social profiles | Exact GitHub, LinkedIn and Instagram URLs in owner repository | Owner-attested public links; no API access or independent account-content verification claimed |

The configured canonical origin `https://florianlux.dev` was retained from the existing application. DNS ownership, a live portfolio deployment and its hosting configuration were not established in this task. Revalidate the intended origin before deployment.

## A — public links

GitHub, LinkedIn, Instagram, Synapedia and the Suite preview require no credentials. External links use `noopener noreferrer`. The project `evidence` field records a label, source URL and editorial basis. Each project detail exposes this source alongside its stage. Person `sameAs` identifies the personal profiles; projects are separate CreativeWork entities attributed to the person.

## B — future verified public data

A GitHub activity or release feed would be a new integration, not an implied capability of these links. Contract: server fetch of publicly accessible repository metadata, cache at least 15 minutes, attach retrieval date, bound requests and payload size, respect provider rate-limit headers and retry-after, and retain the last valid snapshot. On missing or stale evidence, show a plain repository link and an explicit unavailable state; never substitute an invented count. No browser token. Add this only for a defined visitor need.

Synapedia metrics similarly require a documented public endpoint and definitions for every measurement. Sitemap inclusion must not be presented as search indexing. Platform infrastructure is outside this portfolio's scope; no private table reads or production mutations were made.

## C — future authenticated server integration

Requires an owner-authorized provider/account, specific permissions, server-only secrets, request validation, origin checks where applicable, rate limiting, timeout/retry policy and a graceful public fallback. Names and values must never be committed or included in browser bundles. There is no authenticated integration in this implementation and no API access has been assumed.

## D — future work

Newsletter: provider setup, dedicated consent wording, genuine double opt-in, unsubscribe, expiry/replay behavior and tested delivery must precede enabling signup. The current page contains no signup form or simulated success state.

Analytics: choose a provider and a concrete privacy/consent contract before adding tracking. Current rendering requires no third-party browser resources. No visitor metrics are presented.

Candidate brands: record ownership, an approved public destination, actual product functionality, stage and approved media before adding them to selected work or the ecosystem. A conceptual idea can be labeled as such only after confirming it belongs to Florian.

## Maintenance

Project status is editorial evidence from the stated date, not a live monitor. Recheck it when updating the portfolio. Keep visible copy, evidence, schema and project relationship descriptions consistent. The three journal notes document this site's implementation and do not invent earlier publications or project milestones. The standalone website-service offers and prices are retained from the owner repository; the portfolio does not transform demo concepts into customer work.
