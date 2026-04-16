# HSDJ_MOTION_SYSTEM_FOUNDATION_V1 — Stage FINAL

**Pack ID:** HSDJ_MOTION_SYSTEM_FOUNDATION_V1  
**Commit (at verification):** `390fef8e2259491e89684e3edb8508c465d82377` (update after your commit)

## 1. Motion strategy chosen

**Framer Motion** was added as the shared animation layer, with:

- **Centralized easing and duration** in `src/lib/motion-tokens.ts` (`MOTION_EASE`, `MOTION_DURATION`).
- **`SectionReveal`** — one-shot viewport reveal (fade + short upward travel, ~0.5s) for **major sections below the fold**. Hero bands stay **unanimated** so first paint stays immediate.
- **`StaggerGroup` / `StaggerItem`** — restrained stagger for **card grids** (testimonials, venue cards, package tiers, etc.).
- **CSS layer** in `globals.css` for **hover lift** (`.premium-surface`), **link/button polish** (`.motion-interactive`), **image hover** (`.motion-media-zoom` inside `.group`), optional **grain** (`.atmosphere-grain`), and **form field** border/box-shadow transitions when reduced motion is off.

**Reduced motion:** `useReducedMotion()` from Framer Motion zeros out movement duration and opacity deltas; CSS blocks disable transforms for `.premium-surface` and `.motion-media-zoom` when `prefers-reduced-motion: reduce`.

## 2. Shared primitives or components introduced

| Piece | Role |
|--------|------|
| `src/lib/motion-tokens.ts` | Shared `MOTION_EASE`, `MOTION_DURATION` |
| `src/components/motion/section-reveal.tsx` | `SectionReveal` (section/div) |
| `src/components/motion/stagger-reveal.tsx` | `StaggerGroup`, `StaggerItem` |
| `src/components/motion/index.ts` | Barrel export |
| `globals.css` | `.premium-surface`, `.motion-interactive`, `.motion-media-zoom`, `.atmosphere-grain`, form transition block |

## 3. Pages / surfaces updated

- **Home** — section reveals for video strip, why, proof, reviews, venues, services, about, FAQ, contact; stagger on feature/testimonial/venue grids; hero stat cards + key panels use premium/grain; **ImageSlot** gets subtle zoom on hover.
- **Weddings, Packages, Reviews, FAQ, About** — section reveals + stagger/premium on card grids and CTAs where applicable.
- **Contact** — **minimal** motion: reveals on calm explainer strips and closing CTA; **`#availability` block left as static structure** (no extra motion wrapping the primary funnel forms).
- **Venues hub + venue detail** — section reveals; hub uses stagger + premium on venue cards; detail pages use reveals from “Why this guide” through CTA.

## 4. Hover / reveal / atmosphere treatments applied

- **Hover:** `.premium-surface` — slight lift, border brightening, shadow (disabled under reduced motion).
- **Reveal:** section-level fade + translate; grid stagger on lists of cards.
- **Media:** `ImageSlot` image uses `.motion-media-zoom` under `.group` (no layout shift; overflow already on frame).
- **Atmosphere:** `.atmosphere-grain` on selected panels (low-opacity SVG noise), not global.
- **Check Availability links:** `CheckAvailabilityTrackedLink` appends `.motion-interactive` for consistent transition timing on all surfaces.

## 5. Reduced-motion handling used

- Framer **`useReducedMotion()`** in `SectionReveal` and `StaggerGroup` / `StaggerItem`.
- CSS **`@media (prefers-reduced-motion: reduce)`** for transforms on surfaces and media zoom.

## 6. Files touched

**New:** `src/lib/motion-tokens.ts`, `src/components/motion/section-reveal.tsx`, `src/components/motion/stagger-reveal.tsx`, `src/components/motion/index.ts`, `logs/HSDJ_MOTION_SYSTEM_FOUNDATION_V1_STAGE_FINAL.md`

**Updated:** `package.json` / lockfile (framer-motion), `src/app/globals.css`, `src/components/image-slot.tsx`, `src/components/check-availability-tracked-link.tsx`, `src/app/page.tsx`, `src/app/weddings/page.tsx`, `src/app/packages/page.tsx`, `src/app/reviews/page.tsx`, `src/app/faq/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/venues/page.tsx`, `src/app/venues/[slug]/page.tsx`

## 7. Validation results

- `npm run lint` — pass  
- `npm run build` — pass  

## 8. Manual QA notes

1. Scroll **home** and key marketing pages: motion should feel **consistent**, not busy.  
2. **Contact:** availability + forms should feel **calm**; no distracting motion on inputs.  
3. **Mobile:** scroll reveals should not jank; hover lift is desktop-oriented; touch still works.  
4. **macOS / Windows:** enable **Reduce motion** in OS settings — reveals should collapse to near-instant / no lift.  
5. **Check Availability** header + in-page links still navigate and scroll to `#availability` as before.

## 9. Non-regression confirmation

This pass did **not** weaken:

- **Check Availability funnel** — same routes, same `#availability` behavior; forms not wrapped in motion-heavy trees.
- **Readability** — animations are section- or card-level, not per-paragraph.
- **CTA hierarchy** — primary buttons unchanged in structure; only transition polish added.
- **Mobile usability** — no scroll-jacking; touch targets unchanged.
- **Performance expectations** — viewport triggers use `once: true`; durations short; no parallax loops.
- **Page contract clarity** — metadata, copy, and layout hierarchy preserved.

## 10. Recommended next refinement pass

- Optional: **`scrollIntoView({ behavior })`** in `CheckAvailabilityTrackedLink` could respect `prefers-reduced-motion` for smoother accessibility parity.  
- Optional: extract **one** shared “CTA panel” component if future pages repeat the same gradient CTA block.  
- Optional: **vancouver-wedding-dj** and any remaining marketing pages can adopt the same `SectionReveal` pattern for full parity.

---

**Success:** The site uses **one coherent motion language** (Framer + shared CSS tokens), **premium but restrained** interaction, and **accessible** reduced-motion behavior while preserving clarity and conversion paths.
