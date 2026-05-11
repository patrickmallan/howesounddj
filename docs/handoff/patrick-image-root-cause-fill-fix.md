# Patrick homepage image — root cause + definitive fill fix

## Bounded discovery (`rg`)

Command (from repo root):

```bash
rg -n "patrick-dj-action|patrick.*action|aboutPortrait|ImageSlot|object-contain|object-cover|Meet Patrick|siteImages" src/app src/components src/config --glob '!*.map'
```

**Relevant hits:**

| Area | Finding |
|------|---------|
| `src/config/site-images.ts` | `aboutPatrickAction` / `homeAboutPreview` → `/images/about/patrick-dj-action.webp` |
| `src/app/page.tsx` | Single `ImageSlot` for that asset in the `#about` section immediately **above** the “Meet Patrick” `<h2>` |
| `src/app/about/page.tsx` | “Meet Patrick” **copy** in hero; image is `aboutPatrickConversation` (`patrick-wedding-conversation.webp`), **not** `patrick-dj-action.webp` |
| `src/components/image-slot.tsx` | All slots: Next `<Image fill />` + Tailwind `object-cover` |

## Files inspected

- `src/app/page.tsx` — Meet Patrick / `#about` grid + wrapper classes
- `src/components/image-slot.tsx` — frame, `fill`, merged `imageClassName`
- `src/config/site-images.ts` — path + alt (no edits)
- `src/app/about/page.tsx` — confirms different hero asset
- Production CSS bundle (post-`next build`) — **Tailwind `@layer base`** rules for `img`
- `public/images/about/patrick-dj-action.webp` — **decoded pixel sampling** (sharp) for baked letterboxing

## Exact rendering path (homepage Patrick)

1. `HoweSoundDJHomepage` in **`src/app/page.tsx`** renders `<SectionReveal as="section" id="about">`.
2. Inner grid: first column is a div (`atmosphere-grain` + **`hsdj-home-patrick-card`**) wrapping **`ImageSlot`** with `src={SITE_IMAGES.aboutPatrickAction}`.
3. **`ImageSlot`** (`src/components/image-slot.tsx`) renders `<figure>` → `<div className={frame}>` (`relative w-full overflow-hidden … aspect-[4/5]` by default, overridden on mobile via parent utilities) → **`<Image fill … />`** with merged classes.
4. **`premiumPhotoTreatment`** sets the frame background to **`bg-black`** and stacks gradient / blend overlays **above** the bitmap (still inside the clipped frame).

## Root-cause questions (answers)

### 1. Which file renders this exact image on the homepage?

**`src/app/page.tsx`** — `ImageSlot` with `SITE_IMAGES.aboutPatrickAction` in the `#about` section.

### 2. ImageSlot, Next Image, background, or `<img>`?

**`ImageSlot` → Next.js `next/image` with `fill`** (not a CSS background, not a plain `<img>` outside `Image`).

### 3. Inner max-width, object-contain, aspect mismatch?

- **No `object-contain`** on this slot (site-wide `ImageSlot` uses **`object-cover`** only).
- **Aspect**: mobile uses a parent override `max-lg:[&_figure>div]:!aspect-[3/4]`; desktop keeps `aspect="4/5"` from `ImageSlot` when `lg:` override is off.
- **Critical layout bug**: Tailwind **preflight** includes:

  ```css
  img,
  video {
    max-width: 100%;
    height: auto;
  }
  ```

  (visible in compiled app CSS after `next build`). For **`fill`** images, Next still relies on **percentage height/width** filling a positioned parent. When `height: auto` competes with that model, the bitmap can resolve to **intrinsic** sizing inside the frame → **letterboxing** and the frame’s **`bg-black`** reads as a large empty **right/bottom** void (classic “narrow image in a black box”).

### 4. Black space — asset, wrapper, or layout?

- **Asset**: Quick luminance scan of the WebP (1000×1734) shows **no full black canvas/letterboxing** baked into the file edges; bottom strip is very light (likely stage/edge light), right mid-columns are mid-bright. **The dominant “empty black” read was layout/preflight + `bg-black` frame**, not a padding region inside the file.
- **Wrapper**: Outer card uses `bg-neutral-950/60` and padding; inner slot uses **`bg-black`** when `premiumPhotoTreatment` is on — any unfilled region shows **black** immediately.

### 5. Why didn’t the prior fix visibly change production?

Earlier work **only adjusted aspect ratio, padding, `object-position`, and `scale`** on the homepage wrapper. If the **`img` element was still honoring `height: auto` behavior from preflight** in the user’s browser/cache pipeline, the **bitmap never fully covered the aspect box**, so the UI still looked like a **black portrait mat** around a **too-small image**. Changing aspect ratio alone cannot fix intrinsic-size letterboxing.

## Files changed

| File | Change |
|------|--------|
| **`src/components/image-slot.tsx`** | All `fill` images: add **`!h-full !w-full max-w-none min-h-0 object-cover`** so **preflight `height:auto` / `max-width:100%` cannot break** the fill layout; short JSX comment for maintainers. |
| **`src/app/page.tsx`** | Patrick card: `hsdj-home-patrick-card`; mobile aspect **`2/3` → `3/4`** (shorter frame, stronger editorial crop); padding **`p-4` → `p-3`** on small screens; **`imageClassName`** → `max-lg:object-[44%_28%] lg:object-[52%_45%]` (bias subject / arm, drop `scale` to reduce transform variables). |
| **`docs/handoff/patrick-image-root-cause-fill-fix.md`** | This document. |

**Not edited:** `site-images.ts` (paths already correct), `/about` hero (different file), image bytes on disk.

## Layout / crop notes

- **Global `ImageSlot` fix** is intentionally **minimal and safe** for every slot: same `fill` + `object-cover` contract, strictly stronger geometry.
- **Patrick-specific**: `3/4` mobile frame + `object-[44%_28%]` aims for a **full-bleed** feel inside the rounded frame while keeping **face + raised arm** in the crop; tune `44%` / `28%` in 2–4% steps if a device clips the arm.

## Mobile QA (manual)

At **375 / 390 / 430** px:

- Confirm the **photo touches** the inner rounded frame on **all sides** (no large **black mat** inside the slot).
- Confirm **no** huge dead **right** or **below-image** black area inside the **inner** `ImageSlot` frame.
- Desktop (`lg+`): still **4/5** + `lg:object-[52%_45%]`.

**About page:** still `patrick-wedding-conversation.webp`; spot-check that hero **ImageSlot** still looks correct after the shared `ImageSlot` change.

## Validation

```bash
cd ~/Desktop/howesounddj
npx tsc --noEmit
npx eslint .
npm run build
```

**Result:** All three completed successfully (Next.js **16.2.3**, production build).

## Related doc

Earlier narrative fix (aspect/padding only): `docs/handoff/patrick-image-container-fill-fix.md` — superseded for **root cause** by this note; the **preflight + `fill`** issue is documented here.
