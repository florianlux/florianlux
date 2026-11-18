# LUX NOIR v2 implementation

11 October 2026. The existing Next.js portfolio now has one LUX NOIR visual system, a 52/48 desktop portrait hero, a separate mobile composition, the owner-approved `EST. 2000`, and five accessible identity modes. All twelve routes, real project evidence, schemas and the local email-draft workflow are preserved.

## Changes

- `globals.css` establishes the requested near-black, off-white and plum tokens; `motionswitch.css` applies them to mounted surfaces, editorial sections, responsive typography, the header and mobile menu.
- `MotionHero` and `MotionPortrait` add restrained name/portrait/metadata entrances and mode-specific image codes. The portrait PNG and font files are unchanged. Next Image keeps responsive delivery, preload and a reserved fallback frame.
- `ModeSwitch` adds semantic buttons, pressed state, roving focus, arrow/Home/End selection and native radio synchronization. BUILD, THINK, CREATE, FIELD and ARCHIVE use codes 01–05 and the five supplied headlines. No route reload or state persistence is required.
- `Navigation` adds an intersection-based header state, mobile scroll locking, background inertness, Tab cycling, Escape restoration, link close and desktop-resize cleanup. Its native disclosure remains useful without JS.
- The homepage reuses the existing one-time reveal component. About uses the supplied portrait and the existing factual biography. Project selection remains based on typed IDs and evidence. The favicon, social card and portable still kit follow the new palette and numbering.
- An optional browser regression suite and reproduction instructions are added. Application dependencies and `package-lock.json` are unchanged.

## Validation

Typecheck, lint, production build and the existing twelve-route verifier pass. The browser suite passes 35 check groups across Chromium, Firefox and WebKit, including 18 axe scenarios and 31 local destinations. Mobile Lighthouse scores 97/100/100/100; desktop scores 100/100/100/100. See the dedicated QA and performance reports for conditions and limitations.

## Source preservation and review

Development starts from the current working files, including pre-existing uncommitted changes. Eighteen application files form this increment; 16 are updates and two are new files. The six requested reports are added under `docs/lux-noir-v2` in the original repository. Each original destination must match its captured baseline SHA-256 immediately before transfer. Other captured application files remain byte-for-byte unchanged.

The original Git branch, HEAD and index remain unchanged. Its broad dirty checkout cannot provide a clean increment commit without absorbing earlier work. A separate sanitized review repository imports the current-source baseline and records two logical increment commits: implementation, then verification/documentation. `LUX_NOIR_REVIEW.bundle`, `review-history.txt` and `lux-noir-v2.patch` preserve that review history. This is a standalone review history, not a branch ready to merge into the original repository.

No push, merge or public deployment is performed. The transfer receipt records exact destination hashes; the incremental patch is based on the captured working-source baseline, not the old Git HEAD. Check for later edits before rollback.
