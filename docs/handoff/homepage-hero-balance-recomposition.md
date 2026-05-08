# Homepage hero balance recomposition

## Files inspected

- `src/app/page.tsx` (hero section implementation)
- `src/components/homepage-hero-headline.tsx` (H1 + tagline subhead; no edits)
- `src/components/hero-sound-identity.tsx` (decorative wave; no edits)
- `src/components/image-slot.tsx` (image frame behavior; no edits)

## Files changed

- `src/app/page.tsx`
- `docs/handoff/homepage-hero-balance-recomposition.md` (this document)

## Hero architecture: before → after

### Before

**Left column**

1. Eyebrow (`Squamish Wedding DJ · Sea-to-Sky`, uppercase via styles)
2. `HomepageHeroHeadline` (H1 variants + tagline “Your Celebration. Our Passion.”)
3. `HeroSoundIdentity` (groove wave)
4. Descriptive paragraph (“Serving Squamish, Whistler, Vancouver…”)
5. CTA row (`CTADuo`: Book a Consult, Check Availability)
6. Microcopy under CTAs (15 minutes…; quick call line)

**Right column**

1. Editorial card (`atmosphere-grain`, padding, border)
2. `ImageSlot` with `SITE_IMAGES.brandEditorialHeroDjGlow`, **`aspect="4/5"`**, `object-[center_35%]`
3. “Atmosphere First” panel below the image only

### After

**Left column**

1. Eyebrow (unchanged source copy / presentation)
2. `HomepageHeroHeadline` (unchanged component; see headline variant note below)
3. `HeroSoundIdentity` (groove wave)
4. CTA row (`CTADuo`) — **moved up** (directly after the wave, `mt-6`)
5. Microcopy under CTAs (15 minutes line unchanged; quick-call line uses a semicolon per hero spec)

**Right column** (single stacked editorial card)

1. `ImageSlot` with **`SITE_IMAGES.brandEditorialHeroDjGlow`** (unchanged source), **`aspect="4/3"`**, `object-cover` via `ImageSlot`, `imageClassName="object-[center_32%]"`, desktop frame **`h-[420px]`** with `aspect-auto` via wrapper utilities; mobile keeps **4/3** rhythm
2. Descriptive paragraph (“Serving Squamish, Whistler, Vancouver…”) — **moved from the left column** into the right card stack below the image
3. “Atmosphere First” panel — **retained**, stacked below the paragraph

## Confirmations (acceptance mapping)

- **Paragraph moved left → right:** The “Serving Squamish, Whistler, Vancouver…” paragraph now lives in the right column under the hero image, inside the same premium card stack.
- **CTAs moved upward on the left:** The `CTADuo` block and its microcopy now follow `HeroSoundIdentity` with `mt-6` and no longer sit below the descriptive paragraph (paragraph removed from the left).
- **Image source unchanged:** Hero image remains `SITE_IMAGES.brandEditorialHeroDjGlow` (canonical `brandEditorialHeroDjGlow` asset).
- **Headline variant note:** `HEADLINE_VARIANTS` **A** and **C** strings were **swapped** so default server HTML (variant **A** per `getHomepageVariant` / SSR) matches the primary line *“Squamish wedding DJ for the Sea to Sky, the right music at the right moment.”* Former **A** copy is now under key **C** so the experiment keys stay **A / B / C** without renaming.

## Validation commands run

Exact commands (repo root `~/Desktop/howesounddj`):

```bash
cd ~/Desktop/howesounddj
npx tsc --noEmit
npm run lint
npm run build
```

## Pass / fail

| Command            | Result |
| ------------------ | ------ |
| `npx tsc --noEmit` | Pass   |
| `npm run lint`     | Pass   |
| `npm run build`    | Pass   |

## Remaining visual QA notes

- **Desktop:** Confirm the **420px**-tall image frame feels balanced with the left column and that `object-[center_32%]` keeps the subject strong without awkward cropping; nudge focal class if the asset reads better at `center_30%` / `center_35%`.
- **Experiment / localStorage:** Users who already have **`hsdj_home_variant=C`** stored will now see the former **A** headline (“packed dance floors every time”) until storage is cleared; new assignments still rotate **A/B/C** with updated strings for **A** and **C**.
- **Mobile:** Order remains text/CTAs first, then the right card (image → paragraph → Atmosphere First) under the two-column breakpoint.
- **Screenshot pass:** Capture desktop and mobile hero after deploy to confirm no residual dead space inside the image frame and that the right stack reads as one editorial column.
