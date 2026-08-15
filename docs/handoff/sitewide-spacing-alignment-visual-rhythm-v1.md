# Sitewide spacing alignment & visual rhythm — V1

**Tranche:** `HSDJ-WEB-SITEWIDE-SPACING-ALIGNMENT-AND-VISUAL-RHYTHM-POLISH-V1`  
**Date:** 2026-08-15  
**Deployment:** NOT_DEPLOYED (Patrick visual review required)

---

## Executive verdict

**PASS_BOUNDED_FIX_COMPLETE_BROADER_REDESIGN_NOT_REQUIRED**

---

## Phase 0 — Layout owners (repository truth)

| Concern | Owner |
|---------|--------|
| Root shell | `src/app/layout.tsx` — `body` flex column, `#main-content` |
| Site chrome | `src/components/site-chrome.tsx` — sticky header `px-4 sm:px-6 lg:px-8`, footer `px-6 lg:px-8` |
| Motion wrapper | `src/components/motion/section-reveal.tsx` — animation only, no spacing |
| Image frames | `src/components/image-slot.tsx` — aspect + fill layout |
| Spacing tokens | `src/lib/cta-section-spacing.ts` (expanded in this tranche) |
| Homepage sections | `src/app/page.tsx` — all bands including `#about` Patrick portrait |
| Video proof band | `src/components/home-video-proof.tsx` |
| Brand anchor | `src/components/brand-anchor-statement.tsx` — intentional large `py-24 md:py-28 lg:py-32` (unchanged) |
| Inner pages | Each `src/app/*/page.tsx` — mix of `MAIN_SECTION_Y` and ad-hoc `py-*` |
| Tailwind | v4 via `globals.css` — default scale, no custom spacing theme |
| Desktop nav breakpoint | `xl` (1280px), not `lg` |

No shared `Container` / `PageHero` primitive exists. Convention: `mx-auto max-w-6xl px-6 lg:px-8`.

---

## Phase 1 — Patrick portrait defect (root cause)

### Ownership chain

```
page.tsx #about SectionReveal
  └── grid (SECTION_SHELL + PAGE_GUTTER_X + SECTION_BAND_BORDER_ENTRY + MEDIA_COPY_GRID_GAP)
        ├── portrait card (MEDIA_CARD_PAD + ImageSlot)
        └── copy column (About eyebrow → Meet Patrick)
```

### Geometry cause (mobile, 375px)

| Factor | Before | After | Notes |
|--------|--------|-------|-------|
| Services bottom padding | `py-16` → 64px | `pb-10` → 40px | `SECTION_BAND_PRE_BORDER_BOTTOM` |
| About top padding | `py-16` → 64px | `pt-10` → 40px | `SECTION_BAND_BORDER_ENTRY` |
| **Combined dead zone above portrait** | **128px** | **80px** | Nested multiplication (Class B) |
| Portrait → About copy gap | `gap-12` → 48px | `gap-8` → 32px | `MEDIA_COPY_GRID_GAP` |
| Card padding | `p-3 sm:p-6` | `p-3 sm:p-4` | `MEDIA_CARD_PAD` |
| Copy vertical align | `justify-center` | `max-lg:justify-start` | Removed false vertical centering on mobile stack |
| ImageSlot figure | default `space-y-4` | `!m-0 !space-y-0` | Matches hero pattern |

**Primary cause:** Class **B — nested-spacing multiplication** between `#services` bottom padding and `#about` top padding inside a bordered band, compounded by large mobile grid gap and `justify-center` isolating the portrait from the About eyebrow.

**Not the cause:** asset letterboxing (addressed in prior tranche), header gutter mismatch alone, or min-height artifacts.

### Canonical mobile gutter

Content bands: **24px** each side (`px-6`). Header uses `px-4` (16px) at smallest breakpoint — **intentional** compact chrome; content axis remains 24px.

---

## Phase 2 — Sitewide audit summary

### Genuine defects (corrected)

- Homepage bordered bands (`proof`, `reviews`, `venues`, `#about`) — stacked `py-16 md:py-24` after adjacent sections
- Homepage `#services` → `#about` transition — double padding
- Homepage `#about` portrait — excessive media→copy gap and mobile vertical centering
- Homepage `#why`, `#faq`, video proof — inconsistent band tokens vs bordered sections
- Repeated eyebrow→heading `mt-4` duplicated as literals — now tokenized on homepage

### Intentional spacing (unchanged)

- `BrandAnchorStatement` large midpoint padding (`py-24 md:py-28 lg:py-32`)
- Hero `py-20 lg:py-28` — first-fold premium breathing room
- Header `px-4` vs content `px-6` — chrome density
- Inner pages using `MAIN_SECTION_Y` (`py-20 lg:py-24`) — different but consistent within those pages
- Availability Success V3.5 governed geometry — **not touched**
- Finale CTA asymmetric `pt-16 md:pt-24` + tight bottom before explore section

### Findings deliberately left unchanged

- Reviews/FAQ/Contact inner pages mix `py-16` and `py-20` — no measurable user-reported defect; future tranche if needed
- Location SEO pages (`squamish-wedding-dj`, etc.) — consistent within themselves
- Footer `py-10` — appropriate terminal rhythm

---

## Phase 4 — Bounded spacing vocabulary

Added to `src/lib/cta-section-spacing.ts`:

| Token | Value | Use |
|-------|-------|-----|
| `PAGE_GUTTER_X` | `px-6 lg:px-8` | Horizontal content gutter |
| `SECTION_SHELL` | `mx-auto max-w-6xl` | Content width |
| `SECTION_BAND_Y` | `pt-14 md:pt-20 lg:pt-24 pb-14 md:pb-20 lg:pb-24` | Standard section |
| `SECTION_BAND_BORDER_ENTRY` | `pt-10 pb-14 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24` | Bordered band entry |
| `SECTION_BAND_PRE_BORDER_BOTTOM` | `pb-10 md:pb-14 lg:pb-16` | Before bordered band |
| `EYEBROW_TO_HEADING` | `mt-4` | Eyebrow → heading |
| `MEDIA_COPY_GRID_GAP` | `gap-8 md:gap-10 lg:gap-12` | Media + copy grids |
| `MEDIA_CARD_PAD` | `p-3 sm:p-4` | Editorial card wrap |

Existing `MAIN_SECTION_Y` preserved for About/Packages inner pages.

---

## Files changed

| File | Change |
|------|--------|
| `src/lib/cta-section-spacing.ts` | Spacing vocabulary tokens |
| `src/app/page.tsx` | Homepage band rhythm + `#about` portrait fix + testids |
| `src/components/home-video-proof.tsx` | Tokenized section shell |
| `tests/homepage-spacing-geometry.test.ts` | Geometry contract tests |
| `docs/handoff/sitewide-spacing-alignment-visual-rhythm-v1.md` | This document |

---

## Validation

| Check | Result |
|-------|--------|
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm test` | PASS — 100 tests (9 files), incl. 5 new geometry contracts |
| `npm run build` | PASS |

---

## Protected systems

Verified unchanged:

- `/api/availability` contract
- `PostAvailabilitySuccess` + styles module
- Contact form, Calendly, analytics event names
- Operator notification `after()` pattern
- HSDJ Operations boundary

Homepage edits do not import or restyle availability success surfaces.

---

## Responsive screenshot matrix

**Status:** NOT captured in CI (no Playwright runner in repo). Patrick should capture locally at:

**Mobile:** 375×812, 390×844, 393×852, 430×932  
**Tablet:** 768×1024  
**Desktop:** 1280×720, 1440×900, 1512×982  

**Focus area:** Homepage header → `#about` portrait → About eyebrow → Meet Patrick → first paragraph.

Suggested local capture after `npm run dev`:

```bash
# Scroll to #about and capture — or use browser devtools device toolbar at listed widths
open http://localhost:3000/#about
```

---

## Recommendation

Ready for **Patrick visual review** and a separate bounded production deployment.

The Patrick portrait / About transition should show ~48px less dead space above the portrait and a tighter (but still premium) portrait→copy relationship on mobile, with gutters aligned to the canonical `px-6` content axis.

Do not deploy until Patrick approves screenshots at the required viewports.
