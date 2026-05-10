# Mobile Hero + Image Composition Refinement

Tranche scope: tighten the homepage / weddings / about visual experience and the homepage headline at the **first mobile impression**, without touching routes, metadata, sitemap, redirects, APIs, analytics, nav, package files, image asset filenames, CTA tracking, or canonical systems.

---

## Files inspected

- `src/app/page.tsx` (homepage)
- `src/app/weddings/page.tsx` (weddings page)
- `src/app/about/page.tsx` (about page — left untouched, see below)
- `src/components/homepage-hero-headline.tsx` (variant client renderer)
- `src/components/image-slot.tsx` (frame / object-cover behavior)
- `src/config/site-images.ts` (image paths + alt; left untouched)
- `src/lib/experiment.ts` (A/B/C variant logic; left untouched)
- `public/images/brand-editorial/hsdj-hero-crowd-behind-mountains-editorial.webp`
  (1920×1665, native ratio ≈ 1.154)
- `public/images/weddings/weddings-crowd.webp` (1600×1067, native ratio 1.5)
- `public/images/about/patrick-dj-action.webp` (1000×1734, native portrait ratio ≈ 0.577)

---

## Files changed

- `src/app/page.tsx`
- `src/app/weddings/page.tsx`

No image asset files were modified. No routes, metadata, sitemap, robots, APIs, analytics, nav, package files, or canonical systems were touched.

---

## Headline change

The previous A/B/C variants were:

- **A** “Squamish wedding DJ for the Sea to Sky, the right music at the right moment.”
- **B** “Squamish wedding DJ for the Sea to Sky, reception energy that builds with intention.”
- **C** “Squamish wedding DJ for the Sea to Sky, a dance floor that earns the room.”

Variant **C** carried the weak / party-DJ framing the user flagged. Variant **B** was tied to “packed”-style copy noted in prior audits.

### What was done

- `HEADLINE_VARIANTS.A`, `.B`, `.C` are now all bound to one canonical line:

  > Squamish wedding DJ for the Sea-to-Sky, elegant when it matters, wild when it should.

- The A/B/C keys are intentionally preserved (instead of deleting the experiment) so the existing variant-resolver in `getHomepageVariant()` and the `homepage_headline_view` analytics event in `homepage-hero-headline.tsx` continue to work without any analytics regression.
- Because all three keys resolve to the same string, **no client / mobile / localStorage variant can fall back to "earns the room", "packed every time", or any prior party-DJ framing.** Verified via repo-wide search after the edit.
- The duplicated **“Elegant when it matters. Wild when it should.”** tagline that previously appeared in the homepage hero’s “Atmosphere First” inline card was rewritten to **“Music with intention. Built around your people.”** so the new H1 doesn’t echo itself two boxes down.

### Why not retire the experiment entirely

- Retiring the experiment touches `src/lib/experiment.ts`, `analytics.ts`, and the headline component, expanding the change surface. The user explicitly limited scope to the listed files. Collapsing the variants to a single string is the smallest change that guarantees the bad headline can never render again.

---

## Homepage hero image (mobile crop)

**Image:** `public/images/brand-editorial/hsdj-hero-crowd-behind-mountains-editorial.webp` (1920×1665, ratio ≈ 1.154 — almost square; DJ + decks at the bottom, crowd around DJ, mountain backdrop in upper third behind windows).

**Problem:** The mobile container was `aspect-[4/3]` (1.33) with `object-[center_32%]`. With a frame wider than the image is tall, object-cover overflowed vertically; the 32% y-bias kept the mountain top and **chopped the DJ + decks at the bottom** — exactly the emotional core of the photo.

**Fix (layout-only, no asset edits):**

- Mobile aspect override changed from `aspect-[4/3]` to `!aspect-[7/6]`. 7/6 ≈ 1.167 — within ~1% of the image’s native 1.154 ratio, so on phones the **entire image is essentially visible** with negligible vertical crop.
- `imageClassName` changed from `object-[center_32%]` to `object-[center_55%] lg:object-[center_32%]`. On mobile the focal point sits slightly below center, so any micro-crop is taken from the top (sky/ceiling) rather than the bottom (DJ/decks). On `lg+` the existing 420px-tall frame and 32% bias are preserved unchanged.
- Result: at 375 / 390 / 430px, the photo now reads as one cinematic frame — mountains, crowd, and DJ all in view — with no black dead-space, no letterboxing, and corner radii / outer card unchanged.

The hero image desktop crop is **intentionally untouched** — the user only flagged mobile.

---

## Weddings crowd image (mobile presence + editorial copy)

**Image:** `public/images/weddings/weddings-crowd.webp` (1600×1067, 3:2 horizontal — bride centered, bridal party flanking her, string lights, walking forward).

**Problem:** The original section was a single `aspect-[16/10]` `ImageSlot` inside `mx-auto max-w-6xl px-6`. On a 390px viewport that resolves to a ~244px-tall, padded-in image with no surrounding context. It read as a “random standalone” photo, not a deliberate atmospheric beat.

**Fix (layout + copy only — image file untouched):**

1. Restructured the section so the image is no longer inside the page-wide `px-6` padding box, but the editorial copy below it still is.
2. **Mobile (`< sm`)**: image is now **edge-to-edge**, with a sharp-cornered `aspect-[1/1]` frame (`max-sm:[&_figure>div]:!aspect-[1/1]` + `[&_figure>div]:!rounded-none`). On a 390px screen this becomes a ~390px-tall full-bleed editorial moment — ~60% taller than before — which is what creates the “premium atmosphere” read.
3. **Tablet (`sm`–`lg`)**: contained back inside `px-6`, rounded corners restored, aspect drops to `4/3` so it doesn’t overwhelm but is still meaningfully larger than 16/10.
4. **Desktop (`lg+`)**: untouched. Still `aspect-[16/10]`, contained under `max-w-6xl` with `lg:px-8`, same crop bias `object-[center_42%]`.
5. Added `subtleBottomGradient` on the `ImageSlot` for a small bottom-anchored vignette — keeps the night-lights image cinematic without obscuring faces.
6. Added an editorial pull-quote directly under the image, centered, max-w-2xl, balanced, in `text-white/75`. Exact requested copy:

   > The best dance floors don’t feel forced. They unfold naturally — the right song at the right moment, your people fully present, and a room that slowly lets go together.

   It’s in a `<figure><blockquote><p>` with semantic HTML, no eyebrow / kicker / heading wrapped around it — so it reads as editorial atmosphere, not a sales pitch. No “best DJ”, no scarcity, no “unforgettable night”, no nightclub framing.

The h2 above the image is still `sr-only`, preserving heading order.

---

## About Patrick image (homepage Meet section, mobile alignment)

**Image:** `public/images/about/patrick-dj-action.webp` (1000×1734 — very tall portrait; Patrick centered, headphones, looking down at decks, right arm raised up-and-right, soft negative space + shadow on the right of the frame).

**Problem:** The container was `aspect="4/5"` with `imageClassName="object-[52%_45%]"`. With image-ratio 0.577 vs frame-ratio 0.8, the image was width-fit (so the `52%` x-offset literally had no effect — width fits exactly) and ~28% of vertical was lost to crop. With the 45% y-bias, on mobile the result was **fingertips clipped on top, decks clipped on bottom** — and Patrick’s naturally left-of-center pose with empty space on his right read as “left-aligned / cut off”, not as composed negative space.

**Fix (layout-only, no asset edits):**

- Wrapper now adds `max-lg:[&_figure>div]:!aspect-[3/5]` (frame ratio 0.6 — within ~4% of the image’s native 0.577 portrait ratio). On mobile this means **the full photo is shown with negligible vertical crop**: fingertips, raised arm, Patrick, the negative space, the decks — all preserved as the photographer composed them.
- `imageClassName` updated from `object-[52%_45%]` to `object-[center_50%] lg:object-[52%_45%]`. On mobile the residual 4% overflow centers symmetrically; on `lg+` the original 4/5 frame + existing tuning is preserved exactly.
- Result: on phones, the composition reads as a deliberate portrait with breathing room, not a left-clamped crop. On desktop nothing changed.

The `/about` page hero (`patrick-wedding-conversation.webp`, a different asset) was **intentionally not touched** — the spec called out `patrick-dj-action.webp` specifically, and that asset only appears on the homepage Meet Patrick section.

---

## Implementation pattern notes

- All four image fixes were done through `[&_figure>div]:!aspect-…` and responsive `object-position` overrides applied to the wrapper around `ImageSlot`. This is the same pattern already used elsewhere in `page.tsx` and avoids modifying `image-slot.tsx`’s public API or adding new aspect keys.
- No new dependencies, no new components, no asset processing. Pure JSX + Tailwind.
- The `7/6`, `3/5`, `1/1`, and `4/3` aspect classes were verified to compile in Tailwind JIT (Next 16 / Turbopack) via the production build.

---

## Mobile QA notes (375 / 390 / 430)

- **375 (iPhone SE)**: hero image fits inside its rounded-2rem panel as a 7:6 frame; mountains + crowd + DJ all visible. Headline lays out as ~3 lines without orphans. Atmosphere card no longer echoes the H1.
- **390 (iPhone 14 / 15)**: weddings crowd photo becomes a full-bleed ~390-tall square moment, then rolls into the centered editorial pull-quote with a clear breath of `mt-8`. Reads like one intentional beat.
- **430 (iPhone 14 Pro Max / 15 Plus)**: about-Patrick portrait reads at near-native aspect (~3:5 frame), arm fully visible, decks visible, Patrick framed by his own negative space — no left-clamp.
- CTAs in the hero (`Book a Consult` / `Check Availability`) are unchanged — `CTADuo bookSurface="hero" checkSurface="hero"` is exactly as before, so all CTA tracking stays intact.

---

## Validation results

```
$ cd ~/Desktop/howesounddj
$ npx tsc --noEmit
(exit 0, no errors)

$ npx eslint .
(exit 0, no lint errors)

$ npm run build
✓ Compiled successfully in 4.5s
✓ Generating static pages (44/44)
(exit 0, full route tree printed, no warnings)
```

Types, lint, and full Next.js production build all pass clean.

---

## Intentionally untouched

- `src/lib/experiment.ts` — variant logic preserved to keep analytics infrastructure intact.
- `src/components/homepage-hero-headline.tsx` — still consumes `HEADLINE_VARIANTS`; no behavioral change needed since all keys now resolve to the same line.
- `src/config/site-images.ts` — image paths and alt text unchanged.
- `src/components/image-slot.tsx` — public API and aspect-key set untouched (we used wrapper overrides instead).
- `src/app/about/page.tsx` — uses `aboutPatrickConversation` (a different image), which the spec did not call out.
- All routes, metadata, OG, sitemap, robots, redirects, APIs, analytics, nav architecture, package files, image asset filenames, CTA tracking, and canonical systems.
- All physical image files in `public/images/**`.

---

## Acceptance check

- [x] First mobile impression is stronger (full near-native hero crop, premium H1).
- [x] Headline is clear, premium, emotional, and Sea-to-Sky aligned; no variant can output the old line.
- [x] Image crops feel intentional on 375 / 390 / 430.
- [x] Bridal-party image no longer feels random / small (full-bleed mobile + editorial copy).
- [x] Patrick image is balanced, not awkwardly cut off.
- [x] Build / lint / types pass.
- [x] Dark luxury system, CTA hierarchy, and performance preserved.
