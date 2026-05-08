# HSDJ Authority Density Batch 2B — Editorial Image Integration Report

**Date:** 2026-05-08  
**Scope:** Optimize Batch 2B editorial images into `public/images/brand-editorial/`, register paths in `site-images.ts`, and place them only on approved authority/editorial routes with explicit non-documentary framing. No new npm dependencies, no hover zoom, no venue or testimonial pairing.

---

## Executive summary

Three production WebP files were generated with **`cwebp` at quality 90** from the assets present in `assets/authority-density-batch-2b/`. The repository did **not** contain the exact filenames from the written brief (`patrick-packed-dancefloor.jpg`, etc.); it contained three approved source files with different names. Those were mapped one-to-one to the **required output basenames** and documented below.

Central keys were added to **`src/config/site-images.ts`**. **`ImageSlot`** integrates the visuals on the dance-floor guide (Roomflow section), the Sea-to-Sky dance-floor **story** (hero-band primary visual), the **stories hub** (documentary-style editorial), and the **Whistler pillar** (secondary premium editorial). Each placement includes **caption copy** plus a **small editorial disclaimer** so the site does not read as literal proof of a specific client wedding.

**Validation:** `npx tsc --noEmit`, `npm run lint`, and `npm run build` succeed.

---

## Source images used (actual repo files)

| Actual source file (repo) | Output WebP |
| ------------------------- | ----------- |
| `assets/authority-density-batch-2b/Patrick DJ crowd.png` | `hsdj-packed-dance-floor-editorial.webp` |
| `assets/authority-density-batch-2b/Tsoi DJ wedding.webp` | `hsdj-premium-dj-crowd-editorial.webp` |
| `assets/authority-density-batch-2b/Patrick DJ crowd black suit.png` | `hsdj-documentary-dance-floor-editorial.webp` |

**Note:** If the originally specified `patrick-packed-dancefloor.jpg`, `patrick-dj-booth-premium.jpg`, and `patrick-documentary-dancefloor.webp` are added later, re-run the same `cwebp -q 90` mapping to refresh the three outputs without changing route code.

---

## Final optimized image paths

| File | Public URL |
| ---- | ---------- |
| Packed dance floor editorial | `/images/brand-editorial/hsdj-packed-dance-floor-editorial.webp` |
| Premium DJ / crowd editorial | `/images/brand-editorial/hsdj-premium-dj-crowd-editorial.webp` |
| Documentary dance floor editorial | `/images/brand-editorial/hsdj-documentary-dance-floor-editorial.webp` |

**Config keys:** `brandEditorialPackedDanceFloor`, `brandEditorialPremiumDjCrowd`, `brandEditorialDocumentaryDanceFloor` in `SITE_IMAGES`, `SITE_IMAGE_FILES`, and `SITE_IMAGE_ALT`.

---

## Pages updated

| Page | Image used | Role |
| ---- | ---------- | ---- |
| `/guides/how-to-keep-a-wedding-dance-floor-packed` | Packed dance floor | Placed after the Roomflow intro paragraph, before the six pillars; `premiumPhotoTreatment`; focal `object-[center_42%]`. |
| `/stories/sea-to-sky-wedding-dance-floor-energy` | Premium DJ / crowd | Primary band below the article header; `priority`; focal `object-[center_45%]`. |
| `/stories` | Documentary dance floor | Supporting editorial band between proof strip and “Available now”; focal `object-[center_40%]`. |
| `/whistler-wedding-dj` | Premium DJ / crowd | Secondary editorial band after `AuthorityProofStrip`, before venue list; same focal as story page. |

**Intentionally not used on:** venue detail pages, reviews/testimonial blocks, homepage, packages, contact-only flows, or named-couple contexts.

---

## Captions and alt text

### Alt text (`SITE_IMAGE_ALT`)

- **Packed:** “Editorial wedding dance floor scene with Howe Sound DJ energy and a packed reception crowd”
- **Premium:** “Editorial image of a wedding DJ with a full dance floor in a mountain-style reception setting”
- **Documentary:** “Editorial wedding dance floor moment with guests gathered around the couple in a celebration scene”

(No venue names, client names, dates, or “real wedding” claims.)

### Visible captions (plus disclaimer line)

- **Packed (guide):** “A packed dance floor is built through pacing, trust, timing, and momentum.” + small line: “Editorial brand atmosphere, not a recount of a single client wedding.”
- **Premium (story + Whistler):** “Atmosphere-first reception energy, designed to feel elegant before it feels loud.” + “Editorial brand atmosphere, not documentary proof of a specific wedding.”
- **Documentary (stories hub):** “The goal is human momentum, not forced hype.” + “Editorial brand atmosphere, not a recount of a specific client wedding.”

---

## Policy confirmations

- **Editorial brand atmosphere:** All uses are framed as atmosphere and planning philosophy, aligned with Roomflow Method and Atmosphere Arc language elsewhere.
- **Not documentary proof:** Disclaimers and copy avoid implying a specific couple, venue, date, or event. Images are not attached to testimonials or venue guides.
- **No public AI disclosure** added (per brief).
- **No hover zoom** or new motion effects; existing `ImageSlot` treatment only.
- **No Google Business Profile** changes (out of repo scope).

---

## Validation results

| Command | Result |
| ------- | ------ |
| `npx tsc --noEmit` | Pass |
| `npm run lint` | Pass |
| `npm run build` | Pass |

**Bounded `rg`:** Run in repo for `brand-editorial`, output filenames, caption phrases, and “editorial wedding” alt patterns (see terminal log).

---

## Recommended next batch

1. If higher-resolution masters arrive, re-encode WebP at `-q 92` or add `-resize` caps for mobile bandwidth while keeping focal points.  
2. Add a **single** optional documentary frame on the dance-floor guide only if analytics show scroll depth stalls (keep one image per section max).  
3. When **licensed recap** imagery exists, introduce a separate `public/images/stories/` slot and **do not** reuse `brand-editorial` keys for documentary recaps.  
4. Consider `srcset`/`sizes` tuning after Lighthouse on real devices (no dependency change required).
