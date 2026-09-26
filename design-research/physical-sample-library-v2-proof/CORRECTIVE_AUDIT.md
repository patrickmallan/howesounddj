# HSDJ Physical Sample Library — Corrective Audit

## Verdict on V1

V1 was incorrectly marked as passing. Patrick's screenshots expose two disqualifying failures:

1. Full-device resolution was mistaken for control-level resolution.
2. Rounded geometric crop masks retained surrounding panel pixels instead of isolating the object contour.

The V1 assets remain as failure evidence. They are not approved source samples and must not be used in later composition work.

## Source findings

- The 16 screenshot-labelled files in `source-library/09 - knobs` range from 88×133 to 1913×184. Most individual controls are too small for large isolated use.
- The 3300×1990 XDJ-AZ source is high resolution as a full product image, but its individual knobs are generally only about 80–140 pixels across.
- Official DJM-A9 detail graphics are typically 640×400. They are useful mechanical references, not large photographic cutouts.
- Fifteen repository equipment photographs range from 3376px to 6984px on the long edge. Several contain macro-scale controls large enough for high-fidelity isolation.

## Replacement gate

An asset may enter the rebuilt sample library only when:

- the object itself is at least 500px on its long edge before extraction;
- the native source and licence/provenance are recorded;
- the mask follows the real contour instead of a generic circle or rounded rectangle;
- no panel fragment, adjacent label, nearby control, or screenshot boundary remains;
- no generative redraw, fill, or invented detail is used;
- the result is not upscaled;
- it passes 1:1 inspection on black and light backgrounds; and
- it remains useful at the intended maximum CSS display size.

## Authenticity boundary

The high-resolution Pexels photographs can prove the extraction method and support research. They are not a substitute for proprietary HSDJ material. The final production library should come from new macro photographs of Patrick's actual equipment wherever possible.

## Status

```text
PHYSICAL_SAMPLE_LIBRARY_V1: REJECTED
REAL_HARDWARE_EXTRACTION_V1: FAIL
V2_MACRO_ISOLATION_PROOF: REJECTED — WRONG CAMERA AXIS
PRODUCTION_MUTATION: NONE
```

## Why V2 failed

V2 proved only that a large photographic object could be masked. It did not prove that the result could function as a mixer-native composition primitive.

- The knob is a side/angled view.
- The CUE button is photographed in perspective.
- The performance pad is photographed in perspective.
- The fader cap is vertical rather than seen from directly overhead.

These assets cannot sit naturally on a top-down mixer faceplate. They are prohibited from all later composition work.

## Corrected non-negotiable gate

Every control source must be orthographic or photographed directly overhead from a complete mixer/controller top panel. No perspective correction, generative redraw, or simulated top surface is permitted. If a control cannot be placed back onto a top-down faceplate without a viewpoint mismatch, it is not a usable source asset.
