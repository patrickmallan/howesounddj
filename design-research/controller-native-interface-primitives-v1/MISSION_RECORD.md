# HSDJ Controller-Native Interface Primitives V1

**Status:** Complete for Patrick's creative review  
**Date:** 2026-09-11  
**Boundary:** Design research only. Not CH 00, not CH 01, not production.  
**Production approval:** `PATRICK_CREATIVE_APPROVAL: PENDING`

## Outcome

The prototype establishes a DJ-controller-native interface system rather than another website skin. Six required primitives are built and visually certified:

1. Performance-pad navigation
2. Primary CTA/CUE control
3. Rotary information markers
4. Animated stereo VU meter
5. Fader/channel-rail architecture
6. Photographic controller background system, including mixer substrate, hardware intrusion and human/machine collision studies

The controls are no longer decorative references beside conventional components. They perform the component's job.

## Authority ingested

- `docs/branding/HSDJ_WEBSITE_REDESIGN_CREATIVE_CONSTITUTION_V1.md`
- `docs/branding/HSDJ_ANTI_TEMPLATE_DESIGN_EXECUTION_PROTOCOL_V1.md`
- `docs/branding/HSDJ_SOURCE_LIBRARY_GAP_REPORT_V1.md`
- `design-research/physical-visual-vocabulary-v1/HSDJ_PHYSICAL_VISUAL_VOCABULARY_V1.md`
- `design-research/deconstructed-hardware-design-system-v1/HSDJ_DECONSTRUCTED_HARDWARE_DESIGN_SYSTEM_V1.md`
- `design-research/source-library/manifest.md`
- every page of `design-research/design mockups/HSDJ Website Idea 01.pdf`
- every page of `design-research/design mockups/HSDJ Website Idea 02.pdf`

## Ancestry record

### Preserved

- The mockups' core replacement relationship: pad as navigation/action, rotary as marker, fader as architecture, meter as live signal and hardware as environment.
- Patrick's documentary authority, specifically the public hero photograph with Patrick's hand raised in the crowd.
- The existing `09 - knobs` screenshot set as visual provenance and inspection evidence.
- The deconstructed system's semantic law: if removing a hardware primitive removes no information, action, hierarchy or structure, remove it.

### Superseded

- Abstract circular knob diagrams and tidy semantic-board treatment.
- Equipment collages built from unrelated stock imagery.
- Conventional rounded website controls with hardware decoration positioned nearby.
- Full-controller wallpaper behind otherwise ordinary page sections.

### Newly established

- A performance pad that is itself a semantic navigation link with rest, hover, pressed, active-route, keyboard-focus and disabled states.
- A tactile CUE action that reads `CHECK YOUR DATE` and demonstrates idle, hover, pressed, focus, loading and success states.
- Original rotary markers with visibly different positions and no false editability.
- A lightweight, decorative stereo VU system with fast attack, slower decay, correlated but non-identical channels, irregular transients, rare red peaks and a static reduced-motion state.
- A scroll-responsive fader cap whose rail replaces the content boundary and locates progress.
- Three art-directed photographic page fragments using crop, masking, scale, selective darkening, occlusion and documentary collision.

## Visual certification

Desktop captures were inspected at 1440 × 900. Mobile captures were inspected at 390 × 844. The final pass confirmed:

- all six primitives are visually distinct without becoming six cards;
- typography remains reconstructable in desktop and mobile layouts;
- the actual HSDJ hero image, not an unrelated couple image, anchors the human/machine study;
- interaction and focus states remain legible;
- hardware photography performs background architecture only inside this research prototype;
- the mobile layout creates no horizontal page overflow;
- the VU meter is hidden from assistive technology and honors reduced motion;
- primary controls exceed a 48 px touch target;
- the prototype produces no runtime errors.

Certification evidence is stored in `certification/`.

## Source and rights boundary

Official Pioneer DJ and AlphaTheta images were acquired from the DJM-A9 and XDJ-AZ product pages. Their page URLs, direct asset identifiers, dimensions, acquisition date and research uses are recorded in `official-source-register.md`.

The four official equipment images are classified `THIRD-PARTY VISUAL RESEARCH / REFERENCE`. They are not production-cleared. The interactive pad, button, rotary, meter and fader primitives are original HTML/CSS/JavaScript reconstructions.

## Accessibility and performance posture

- Semantic navigation links and a semantic button are used for interaction.
- Visible keyboard focus is stronger than the hardware glow state.
- Disabled navigation is not focusable.
- VU animation updates a small fixed segment set at a capped visual frame rate.
- The VU system explicitly states that it is simulated interface energy and has no audio input.
- Reduced-motion preference produces a stable meter and suppresses transitions/animation.
- No framework, runtime dependency or network request is required to view the prototype.

## Gate

`CONTROLLER_NATIVE_PRIMITIVES: 6 OF 6 COMPLETE`

`BACKGROUND_FRAGMENT_STUDIES: 3 OF 3 COMPLETE`

`PRODUCTION_MUTATION: NONE`

`PATRICK_CREATIVE_APPROVAL: PENDING`

Do not adapt these primitives into the public website until Patrick explicitly grants creative approval.
