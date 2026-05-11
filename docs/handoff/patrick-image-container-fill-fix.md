# Patrick image — homepage Meet section container fill (mobile)

## Files inspected

- `src/app/page.tsx` — homepage `#about` / “Meet Patrick” block (`SITE_IMAGES.aboutPatrickAction` → `public/images/about/patrick-dj-action.webp`)
- `src/components/image-slot.tsx` — confirms `fill` + `object-cover` (no `object-contain`); `premiumPhotoTreatment` uses a black frame background under the image layer
- `src/app/about/page.tsx` — hero uses `SITE_IMAGES.aboutPatrickConversation` (different asset); no change
- `src/config/site-images.ts` — path confirmation only (not edited)

## Files changed

- `src/app/page.tsx` — Meet Patrick editorial wrapper + `ImageSlot` `imageClassName` (layout/CSS only)
- `docs/handoff/patrick-image-container-fill-fix.md` — this note

## Root cause

The mobile override `max-lg:[&_figure>div]:!aspect-[3/5]` matched the photo’s native width/height ratio (~0.577) closely. With `object-cover`, the bitmap still fills the inner frame, but the **frame itself** stayed very tall and skinny on phones. Together with **`p-6`** on the outer `atmosphere-grain` card, the section read as a **narrow vertical photo band** floating in a large dark card (`bg-neutral-950/60` padding + `premiumPhotoTreatment`’s `bg-black` frame), which users perceived as **empty black voids** rather than intentional editorial crop.

`ImageSlot` was not letterboxing via `object-contain`; the issue was **frame proportion + outer padding**, not a missing `object-cover`.

## Layout / crop changes made

1. **Mobile aspect (`< lg`)** — `!aspect-[3/5]` → **`!aspect-[2/3]`** via `max-lg:[&_figure>div]:!aspect-[2/3]`. A wider (less tall) frame for the same column width increases visible image area and reads more like a **cinematic portrait** than a thin strip. `object-cover` trims more from the top/bottom of the source portrait; focal point tuning below protects face and raised arm.

2. **Focal point (`< lg`)** — **`max-lg:object-[50%_30%]`** anchors the upper-mid composition (headphones, raised arm, decks context). **`lg:object-[52%_45%]`** keeps the previous desktop bias unchanged.

3. **Slight zoom (`< lg`)** — **`max-lg:scale-[1.08]`** on the image (frame already `overflow-hidden`) tightens any residual edge read and matches the spirit of other editorial slots (e.g. About hero scale), without aggressive cropping.

4. **Padding** — outer card **`p-6`** → **`p-4 sm:p-6`** so small viewports give more width/height to the rounded inner frame while preserving desktop spacing.

5. **Grid safety** — **`max-lg:[&_figure]:min-w-0 max-lg:[&_figure]:w-full`** so the figure cannot shrink below the column width in the CSS grid.

**Unchanged:** `rounded-[2rem]` editorial shell, `ImageSlot` inner `rounded-[1.5rem]`, `premiumPhotoTreatment`, asset path, desktop `aspect="4/5"` default when `max-lg` overrides no longer apply.

## Mobile QA notes (manual)

Check at **375px**, **390px**, **430px** widths:

- Inner image frame should **fully paint** with `object-cover` (no “pillarboxed” photo inside the slot).
- **Face** and **raised arm** should remain in frame; if the arm clips on a device, nudge **`max-lg:object-[50%_30%]`** slightly toward **`28%`–`32%`** on the Y axis or reduce **`scale-[1.08]`** toward **`1.04`**.

Also verify **desktop homepage** (`lg+`): crop should match prior behavior via `lg:object-[52%_45%]` and default **`4/5`** frame.

**About (`/about`):** still **`patrick-wedding-conversation.webp`** in the hero — no regression expected from this change; optional spot-check for parity only.

## Validation results

Run from repo root:

```bash
npx tsc --noEmit
npx eslint .
npm run build
```

**Result:** All three completed successfully (Next.js 16.2.3 production build, 44 static routes).
