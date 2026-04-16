# HSDJ_VIDEO_LOGO_SCALE_UP_V1 — Stage FINAL

## 1. Change summary (logo scale increase)

The **homepage “In motion” video** logo overlay in **`HomeVideoProof`** was scaled up so the **mark dominates the frame** (stronger brand presence and more **masking** of busy motion in the footage), while staying **inside** the rounded video box via **`max-w-[600px]`**, **`object-contain`**, and horizontal **`px-3 sm:px-4`** on the centered flex wrapper.

## 2. New sizing values used

| Token | Before (approx.) | After |
|--------|------------------|--------|
| Mobile width | `w-[40%]`, `max-w-[320px]` | **`w-[78%]`**, **`max-w-[600px]`** |
| Desktop (`md+`) | `md:w-[30%]` | **`md:w-[62%]`** (within 60–65% target) |
| Max width cap | 320px | **600px** |
| Opacity | 0.82 | **0.76** (within 0.7–0.8) |
| `sizes` | `40vw, 320px` | **`80vw, 600px`** (matches larger display) |

**Layering:** Unchanged — video `z-0`, dim/gradient overlays `z-[1]`, logo `z-[2]`, all overlays **`pointer-events-none`**.

## 3. Files touched

- `src/components/home-video-proof.tsx` — logo **`Image`** `className`, **`sizes`**, wrapper horizontal padding tweak only.

## 4. Visual impact assessment

- Logo reads as the **primary focal point** in the video card; **edges of the clip** remain visible around it (width &lt; 100%, **`object-contain`**).
- Slightly **lower opacity (0.76)** keeps the mark from feeling overly flat or opaque against motion.

## 5. Responsiveness validation

- **Mobile:** ~**78%** width (target **75–80%**), capped at **600px** (typical viewports stay under cap).
- **Desktop:** **`md:w-[62%]`**, same **600px** cap so the logo **scales with the video** but does not exceed the frame.
- **Containment:** Parent **`overflow-hidden`** + **`rounded-[1.75rem]`** on the video shell unchanged — logo stays **within** the rounded rect.

## 6. Non-regression confirmation

- **No asset or video source changes**; **no** CTA or section layout edits.
- **Centered** flex layout preserved; **`object-contain`** prevents aspect distortion.
- **Overlays** still **`pointer-events-none`** — **video controls** remain clickable; **no layout shift** introduced beyond the existing overlay stack.

## Success condition

The logo is **visually dominant** in the video area, **drawing attention away from fine motion artifacts** while the **background video** still shows **motion and energy** at the edges and through the mark.
