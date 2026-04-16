# HSDJ_VIDEO_LOGO_OVERLAY_V1_CLEAN — Stage FINAL

## 1. Problem addressed (AI video artifacts)

The homepage **“In motion”** proof video (`HomeVideoProof`) can draw attention to **imperfect or busy motion** in the footage. The goal was to **soften** that without removing playback or changing the asset.

## 2. Visual strategy used

- **Shift attention to brand:** A **centered logo** (`/images/logo/howe-sound-logo.webp`) gives the eye a clear focal point.
- **Soften the picture:** **Low-opacity black** plus **top/bottom gradients** reduce harsh contrast and motion noise while **keeping the video visible** and energetic underneath.
- **No heavy blur:** Only **light overlays**—no blur filters.

## 3. Layers implemented (bottom → top)

All overlays use **`pointer-events-none`** so **video controls remain usable** (clicks pass through to the `<video>`).

| Layer | Role |
|--------|------|
| `<video>` | Base; `relative z-0`, unchanged source/controls/attributes. |
| `bg-black/20` | Uniform **light dim** across the frame. |
| `bg-gradient-to-b` | Darker **top** and **bottom** (via transparent middle) to soften edges. |
| `bg-gradient-to-t` | Extra lift from the **bottom** edge. |
| Centered **`next/image`** logo | **`w-[40%] max-w-[320px] md:w-[30%]`**, **`opacity-[0.82]`**, flex-centered with horizontal **`px-4`**. |

Decorative overlays use **`aria-hidden`**. Logo uses **`alt=""`** (purely decorative over a video that already has an **`aria-label`**).

## 4. Files touched

| File | Change |
|------|--------|
| `src/components/home-video-proof.tsx` | Import **`next/image`**, **`LOGO_SRC`**, overlay stack + logo inside existing **`relative`** video wrapper. |

**Unchanged:** Section copy, **`CheckAvailabilityTrackedLink`**, video **`src`**, **`poster`**, layout outside the video card.

## 5. Responsiveness validation

- **Mobile:** Logo width **`40%`** of the video container (capped **`320px`**).
- **Desktop (`md+`):** **`30%`** width (still capped).
- **`sizes`:** `(max-width: 768px) 40vw, 320px` for sensible image selection.
- Wrapper keeps **`aspect-video`**, **`overflow-hidden`**, **`rounded-[1.75rem]`**—no layout structure change beyond **absolute** children inside the existing box (no CLS from the section shell).

## 6. Non-regression confirmation

- **Playback:** `<video>` unchanged; overlays do not intercept pointer events.
- **Performance:** One static logo image; no extra JS; no blur.
- **CTAs:** Block below the video untouched.
- **Analytics:** No changes.
- **Video source:** Unchanged.

**Note:** The only homepage **`<video>`** lives in **`HomeVideoProof`** (“See how the night feels”), not the top hero (still image). Overlays apply there per scope.

## Success condition

The clip **still plays with energy**, but **brand and softened tonality** pull focus **away from raw motion detail**, improving perceived polish without replacing the file or blocking interaction.
