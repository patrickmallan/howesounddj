# CH00 Control Asset Isolation V2.1 — Source Register

**Mission:** HSDJ_CH00_CONTROL_ASSET_ISOLATION_V2_1  
**Date:** 2026-09-11  
**Boundary:** Research prototype only. No asset in this register has production clearance.

## Controlling hardware source

- Original: `design-research/controller-native-interface-primitives-v1/assets/reference/official/xdj-az-top.webp`
- Manufacturer/source family: official AlphaTheta XDJ-AZ research reference
- Original dimensions: 2560 × 1544 pixels
- Classification: `THIRD-PARTY VISUAL RESEARCH / REFERENCE`
- Production clearance: `NONE`
- Derivation rule: every V2.1 control below was regenerated from this original file, not from a prior crop, screenshot or certification render.

Coordinates use `x, y, width, height` in original-source pixels.

## Transparent navigation-pad family

Each pad is an exact 90 × 90 crop followed by a rounded alpha mask fitted to the photographed outer bezel. The mask removes surrounding faceplate pixels, retains the face, illuminated rim, bevel and useful edge shadow, and adds an approximately one-pixel antialiased transition. Output is 8-bit RGBA PNG with alpha range 0–255.

- `assets/hardware/pad-red-isolated.png`
  - Source region: `343, 1211, 90, 90`
  - Use: Reviews
- `assets/hardware/pad-cyan-isolated.png`
  - Source region: `428, 1211, 90, 90`
  - Use: Weddings
- `assets/hardware/pad-green-isolated.png`
  - Source region: `513, 1211, 90, 90`
  - Use: About
- `assets/hardware/pad-purple-isolated.png`
  - Source region: `598, 1211, 90, 90`
  - Use: Contact
- `assets/hardware/pad-orange-isolated.png`
  - Source region: `428, 1296, 90, 90`
  - Use: Venues
- `assets/hardware/pad-blue-isolated.png`
  - Source region: `513, 1296, 90, 90`
  - Use: Journal

All six outputs share the same deck, pad bank, perspective, lighting, bezel geometry and source resolution. No source labels or adjacent-pad pixels remain attached.

## Transparent CTA controls

### Primary CUE / availability

- Output: `assets/hardware/cue-control-isolated.png`
- Source region: `140, 1155, 140, 130`
- Isolation: circular alpha mask centred at `68,69` within the crop with a 54px outer radius and an antialiased edge
- Output dimensions: 140 × 130 pixels, 8-bit RGBA PNG
- Transparency: alpha range 0–255
- Preserved: full orange illuminated ring, metal button face, bevel, outer bezel and useful natural shadow
- Removed: surrounding deck faceplate and nearby PLAY control
- Use: the complete `CHECK YOUR DATE` semantic link; wording is layered on the photographed face inside the physical control

### Secondary PLAY / consultation

- Output: `assets/hardware/play-control-isolated.png`
- Source region: `140, 1255, 140, 150`
- Isolation: circular alpha mask centred at `68,90` within the crop with a 54px outer radius and an antialiased edge
- Output dimensions: 140 × 150 pixels, 8-bit RGBA PNG
- Transparency: alpha range 0–255
- Preserved: full green illuminated ring, metal PLAY face, bezel and useful natural shadow
- Removed: surrounding deck faceplate and nearby CUE control
- Use: the complete subordinate `BOOK A CONSULT` semantic link; wording is layered on the photographed face

## Preserved non-control sources

- `public/images/brand-editorial/hsdj-hero-crowd-behind-mountains-editorial.webp` remains the unchanged Patrick/wedding image. It is composition-authorized by Patrick; photographer, editing lineage and production permission remain unresolved.
- The machine background, platter and DJM-A9 selective reveal are inherited unchanged from CH00 V2 and retain their research-only classifications recorded there.
- `design-research/source-library/09 - knobs/` remains research ancestry only. Its screenshot pixels were not used to produce these V2.1 controls.

## Rights statement

These isolated assets improve research fidelity; isolation does not create production rights. Before production use, replace them with rights-cleared Patrick-owned equipment photography, obtain a suitable licence, or receive explicit source clearance.
