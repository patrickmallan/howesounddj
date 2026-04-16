# HSDJ_HERO_SOUND_IDENTITY_REFINEMENT_V1 — Stage FINAL

**Pack ID:** HSDJ_HERO_SOUND_IDENTITY_REFINEMENT_V1  
**Repo HEAD at validation:** `a6eaf1107387363bb77bda318507c139396efc8f` (with uncommitted changes to the files listed below)

## 1. Problem addressed

The hero waveform read as a mostly static decorative sine motif: motion was limited to **opacity breathing** on the whole SVG, so it did not suggest pulse, rhythm, or energy moving through the graphic.

## 2. Motion strategy chosen

**Layered SVG groups + CSS keyframes** (no new runtime dependencies):

- **Per-layer amplitude motion** — each `<g>` uses a distinct multi-step `translateX` + `scaleY` loop with different durations, delays, and easing so layers move **out of phase** (refined “EDM pulse” feel without eq-bar or dashboard clichés).
- **Horizontal flow** — each path uses **stroke-dasharray** + **stroke-dashoffset** animation at different speeds; mid layer runs **reverse** for counter-flow.
- **Hierarchy** — primary line is strongest; mid and back are softer and slower; overall SVG opacity stays **subordinate** to the headline.

Framer Motion was not added; the site already uses global CSS for motion patterns.

## 3. Number of waveform layers used

**Three** layered groups:

1. **Back** — damped contour (`waveBack`), thinnest stroke, slowest amplitude + dash drift.  
2. **Mid** — existing offset body curve (`waveMid`), medium stroke, reverse dash.  
3. **Primary** — main contour (`wavePrimary`), strongest stroke, clearest dash flow.

The back path uses a **gentler amplitude** than primary so the echo does not collapse into a double-stroke when **reduced motion** freezes animation.

## 4. Animation behaviors added

| Behavior | Implementation |
|----------|----------------|
| Amplitude drift | `hero-sound-amp-primary`, `hero-sound-amp-mid`, `hero-sound-amp-back` (transform on each layer) |
| Horizontal energy flow | `hero-sound-dash`, `hero-sound-dash-rev`, `hero-sound-dash-slow` (dash offset on paths) |
| Layered pulse | Independent durations (≈4.1s / 5.2s / 6.8s), negative `animation-delay`, staggered opacity on groups |
| Glow / rainbow / bars | **Not used** (restraint vs. brief) |

## 5. Files touched

- `src/components/hero-sound-identity.tsx` — three `<g>` layers, shared path constants, damped back path.  
- `src/app/globals.css` — replaced `hero-sound-breathe` with layered animations + reduced-motion fallbacks.

## 6. Validation results

| Check | Result |
|-------|--------|
| `npm run lint` | Pass |
| `npm run build` | Pass |
| `rg` for hero sound / waveform / keyframes / reduced motion | Confined to `hero-sound-identity.tsx`, `globals.css`, `page.tsx` import |

## 7. Manual QA notes

**Not run in this environment** (no browser session). Recommended checks:

1. **Desktop** — Confirm waveform feels alive (amplitude + dash), still premium, headline still visually dominant, Check Availability still the obvious primary action.  
2. **Mobile** — Confirm no crowding, motion stays smooth on a real device.  
3. **Reduced motion** — System “Reduce motion” on: waveform stays visible, **no** dash march or amplitude loops; static hierarchy via group opacity + stroke weights.  
4. **Taste** — More pulse/flow than a breathing line; not nightclub EQ, not random jitter.

## 8. Non-regression confirmation

This pass did **not** intend to weaken:

- **Hero clarity** — H1 and layout unchanged; waveform remains a supporting motif under the headline.  
- **CTA hierarchy** — No changes to `CheckAvailabilityTrackedLink` or hero button structure.  
- **Wedding-first positioning** — Copy and section order unchanged.  
- **Mobile usability** — Same container (`max-w` / placement); no new interactive chrome.  
- **Performance expectations** — CSS-only animation on a small SVG; no audio, no heavy filters, no `will-change` layer hints.  
- **Reduced-motion handling** — `@media (prefers-reduced-motion: reduce)` disables path and group motion; solid strokes; graphic remains as a quiet design element.

## Success condition (target)

The hero waveform should read as **stylized music energy** moving through layered lines—**pulse, rhythm, flow**—with the **restraint** of a premium wedding brand, not a static decorative sine or a club equalizer.
