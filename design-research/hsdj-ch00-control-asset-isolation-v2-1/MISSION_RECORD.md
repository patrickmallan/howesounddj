# HSDJ CH00 Control Asset Isolation + Integration V2.1

**Status:** Complete for Patrick's visual judgment  
**Date:** 2026-09-11  
**Scope:** CH00 hardware controls only  
**Production:** Locked

This mission preserves the complete approved CH00 V2 composition and corrects only physical-button isolation and interface integration.

## Preserved without alteration

- Hero composition and exact headline
- Patrick/wedding image
- Stereo VU meter and motion engine
- Fader position and scroll behaviour
- Machine background and selective DJM reveal
- Real platter intervention
- Proof plate and 51-review statement
- Colour system
- Desktop/mobile architecture

## Corrections

- Regenerated all six navigation controls from the original 2560 × 1544 official XDJ-AZ source.
- Removed surrounding panel pixels with transparent, antialiased masks fitted to each physical bezel.
- Replaced CSS background crops with complete semantic `<img>` controls rendered using `object-fit: contain`.
- Preserved one coherent performance-pad family, perspective and illumination system.
- Rebuilt the primary CUE control as the complete `CHECK YOUR DATE` link, with the wording integrated on the button face.
- Rebuilt PLAY as the complete subordinate `BOOK A CONSULT` link, with the wording integrated on its face.
- Preserved rest, hover, active-route, press and external keyboard-focus states.
- Added explicit accessible names for both CTA controls.
- Structured both CTA links so later checking, available and manual-follow-up signal states can be added without representing a current availability result.

## Visual inspection

- Full desktop: `certification/ch00-v2-1-desktop-1440x1000.png`
- Full mobile: `certification/ch00-v2-1-mobile-390x844.png`
- Navigation at 200% pixel density: `certification/ch00-v2-1-navigation-detail-200-percent.png`
- Check Your Date at 200% pixel density: `certification/ch00-v2-1-check-your-date-detail-200-percent.png`
- Keyboard focus: `certification/ch00-v2-1-desktop-keyboard-focus-1440x1000.png`
- Reduced motion: `certification/ch00-v2-1-desktop-reduced-motion-1440x1000.png`

The rendered pixels were inspected at each required state. Complete bezels remain visible; no adjacent label, neighbouring control, source rectangle or CSS cover-crop survives.

## Certification result

- `NAVIGATION PAD ISOLATION: PASS`
- `PRIMARY CTA INTEGRATION: PASS`
- `SECONDARY CONTROL INTEGRATION: PASS`
- `RECTANGULAR SCREENSHOT BOUNDARIES: NONE`
- `HARDWARE EDGE CROPPING: NONE`
- `SOURCE TRACEABILITY: PASS`
- `DESKTOP VISUAL: PASS`
- `MOBILE VISUAL: PASS`

## Remaining boundary

All official AlphaTheta/Pioneer imagery remains third-party research reference with no production clearance. The prototype routes outward to existing public URLs and does not implement availability checking or analytics.

`PRODUCTION_MUTATION: NONE`

`PATRICK_CREATIVE_APPROVAL: PENDING`

Stop here. Do not proceed to CH01 or migrate this research prototype into production.
