# Mobile visual rhythm polish — V2

**Tranche:** `HSDJ-WEB-MOBILE-VISUAL-RHYTHM-POLISH-V2`  
**Date:** 2026-08-15  
**Supersedes:** V1 spacing values (not visually final)  
**Deployment:** NOT_DEPLOYED

---

## Executive verdict

**PASS_SYSTEMIC_SPACING_REPAIR_SCREENSHOTS_READY_FOR_PATRICK**

---

## Design law applied

**One owner controls each inter-section transition.**

| Transition | Outgoing owner | Incoming |
|------------|----------------|----------|
| Venue → Services | `SECTION_TRANSITION_OUT` on venues band | `SECTION_TRANSITION_IN` on services |
| Hero → In Motion | `HOMEPAGE_HERO_PADDING` bottom (`pb-8`) | `SECTION_TRANSITION_IN` on video proof |
| FAQ → Finale CTA | `SECTION_TRANSITION_OUT` on FAQ | `HOMEPAGE_FINALE_SECTION` (`pt-0`) + `HOMEPAGE_FINALE_INNER_TOP` |
| Services → About | `SECTION_TRANSITION_OUT` on services | `SECTION_BAND_BORDER_FOLLOW` (`pt-0`) |

Internal card padding unchanged.

---

## Token changes (`src/lib/cta-section-spacing.ts`)

| Token | V1 (mobile) | V2 (mobile) |
|-------|-------------|-------------|
| `SECTION_BAND_TOP/BOTTOM` | pt/pb-14 | pt/pb-8 |
| `SECTION_BAND_BORDER_*` | pt-10 pb-14 | pt-8 pb-8 |
| `SECTION_TRANSITION_OUT` | pb-10 | pb-8 |
| `SECTION_TRANSITION_IN` | (new) | pt-0 |
| `HOMEPAGE_HERO_PADDING` | py-20 | pt-20 pb-8 |
| `HOMEPAGE_FINALE_SECTION` | pt-16 | pt-0 |
| `HOMEPAGE_FINALE_INNER_TOP` | (new) | pt-8 |

Desktop/tablet values scale up via `md:` / `lg:` breakpoints.

---

## Before/after geometry (375×812, document coordinates)

| Transition | V1 approx. | V2 measured | Root cause | Owner changed |
|------------|------------|-------------|------------|---------------|
| Venue → Services | ~112px stacked | **32px** | venues pb + services pt both claimed separation | venues `TRANSITION_OUT`; services `TRANSITION_IN` |
| Hero → In Motion | ~136px stacked | **32px** | hero pb-20 + video pt-14 | `HOMEPAGE_HERO_PADDING`; video `TRANSITION_IN` |
| FAQ → Finale CTA | ~120px stacked | **64px** | FAQ pb + finale pt-16 + inner gap | FAQ `TRANSITION_OUT`; finale `pt-0` + inner `pt-8` |
| Portrait → About | ~48px grid | **32px** | aligned to `MEDIA_COPY_GRID_GAP` | unchanged grid token; border follow on about |

---

## Screenshot evidence

Captured via `npm run test:visual` → `docs/handoff/screenshots/mobile-visual-rhythm-v2/`:

**Mobile:** 375×812, 390×844, 430×932 — per transition + full-page overview  
**Desktop:** 1440×900 overview

Files: `{viewport}-{transition-id}.png`, `{viewport}-homepage-overview.png`, `1440x900-homepage-overview.png`

---

## Files changed

| File | Change |
|------|--------|
| `src/lib/cta-section-spacing.ts` | Mobile-first tokens + transition pair |
| `src/app/page.tsx` | Single-owner transitions; testids |
| `src/components/home-video-proof.tsx` | Hero handoff + testids |
| `tests/homepage-spacing-geometry.test.ts` | Updated contracts |
| `tests/visual/mobile-rhythm-v2.spec.ts` | Playwright geometry + screenshots |
| `playwright.config.ts` | Visual test runner |
| `package.json` | `@playwright/test`, `test:visual` script |

---

## Protected systems

No changes to Availability Success V3.5, contact form, `/api/availability`, Calendly, analytics, or operator notifications.

---

## Validation

| Check | Result |
|-------|--------|
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm test` | PASS — 102 tests |
| `npm run build` | PASS |
| `npm run test:visual` | PASS — 4 tests, screenshots written |

---

## Deployment

**NOT_DEPLOYED** — Patrick to review V2 screenshots before production deploy.
