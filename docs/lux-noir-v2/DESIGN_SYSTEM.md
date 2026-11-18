# LUX NOIR design system

Version 2.0, 11 October 2026. Design principle: “Quiet luxury. Visible ambition.” MOTIONSWITCH remains the interaction model; LUX NOIR unifies its visual language.

## Tokens

| Role | Value | Use |
| --- | --- | --- |
| Background | `#080809` | Main canvas and hero |
| Secondary | `#101012` | Story, menu and media surfaces |
| Elevated | `#171719` | NOW and selected mode |
| Primary text | `#F5F5F3` | Headings and active controls |
| Secondary text | `#A1A1A6` | Body, metadata and inactive controls |
| Decorative muted | `#68686D` | Large nonessential indices; never small essential text |
| Border | `rgba(255,255,255,0.09)` | Dividers and surface separation |
| Accent | `#C5A4BD` | Selection marker, focus, small arrows and restrained emphasis |

The CSS source of truth is the theme in `src/app/globals.css`. `motionswitch.css` consumes those variables. Colored gradients in the service wrapper are replaced by a neutral surface; the explicitly labeled demo-site artwork preserves its own colors.

## Typography and composition

Reuse local Instrument Sans, a licensed variable grotesk, for display and body. Display weight 550–600, tight editorial tracking and fluid `clamp()` sizing create hierarchy without a new font dependency. JetBrains Mono remains the locally served metadata face. Normal body copy is 16px or larger. Identity buttons are 12px with 48px hit areas. Metadata uses 10–11px where secondary; primary controls and body are larger.

Desktop hero columns are 52% copy and 48% portrait. The subject occupies the right panel at full section height. The left panel contains the name, BUILD / CREATE / EXPLORE, independent-by-design label, the owner-confirmed birth year and the active editorial statement. Mobile uses a separate image-led vertical composition with a compact single-line name; it does not shrink the desktop split.

The portrait-only original stays byte-for-byte unchanged. Next.js optimizes responsive deliveries. CSS controls framing, restrained exposure and neutral shadow masks. The mask, clothing and visible eyes remain authentic to the supplied artwork. No hidden facial features, unrelated scene or synthetic biography are introduced. The typographic fallback reserves the same frame.

## Identity modes

| Code | Mode | Editorial headline |
| --- | --- | --- |
| 01 | BUILD | I build what I want to exist. |
| 02 | THINK | Everything starts with a question. |
| 03 | CREATE | Creativity is a form of independence. |
| 04 | FIELD | Outside the interface. |
| 05 | ARCHIVE | Progress leaves traces. |

Website v2 uses these five codes; it supersedes the website numbering from v1. Earlier seven-scene capture recipes remain historical material, not additional public modes. The existing social-kit mode order and archive code follow v2.

Mode buttons update the native radio state without routing or reloads. Arrow keys move through modes; Home and End jump to the ends. A roving tab stop keeps the keyboard path short. Pressed state, hero metadata, portrait code, supporting copy and selected work stay aligned. Without JavaScript, labeled native radio inputs drive the same CSS state. Essential HTML is available before animation.

## Motion and navigation

- Name reveal: 620ms, with a 70ms second-line stagger; opacity starts at 0.6 and content remains visible.
- Portrait reveal: 650ms, small clipping change and opacity from 0.78; critical media is preloaded.
- Metadata: 450ms with a 100ms delay. Navigation is immediately usable.
- Mode copy/work entrance: 240ms, 6px translation; only the active panel is displayed.
- Pointer response: reuse the bounded damped spring on fine-pointer devices. Maximum travel is about 4px horizontally and 3px vertically. Touch input does not activate it.
- Section reveal: reuse the existing one-time IntersectionObserver/CSS component; off-screen content is visible without the enhancement.
- Hover: narrow underline, small arrow movement and 1.012 image scale. No scroll-jacking, continuous renderer or page-transition dependency.

Reduced-motion preferences remove entrances, pointer motion, scaling and smooth scrolling. Sound remains explicitly optional and off by default. No animation is required to navigate or read.

The mobile menu retains its native disclosure fallback. With JavaScript it locks background scrolling, makes main/footer inert, moves focus into navigation, cycles Tab/Shift+Tab and restores the trigger on Escape. Cleanup restores prior styles and inert states. Crossing to desktop closes the menu. The header changes surface through an intersection sentinel, without a per-frame scroll handler or blur effect.

## Content and expansion

Keep the existing project stages, evidence links, timeline checkpoints, dated editorial NOW and privacy-gated analytics adapter. The Person model remains extensible, with no invented partner profile or active duo presentation. Candidate brands require actual project evidence before becoming public cards or schema entities.

Verify contrasts and interactions with the QA suite; exact token values alone do not establish conformance. Field performance, native assistive-technology review and live hosting remain separate checks.
