# HSDJ Top-Down Hardware Source Gate V1

## Decision

The V2 macro-isolation proof is rejected in full. None of its four assets may be used. Their source resolution was high, but their camera axes were incompatible with a mixer faceplate.

The next library is not allowed to begin with extraction. It begins with camera-axis qualification.

## Absolute camera-axis rule

A source passes only when all of the following are true:

- the mixer/controller faceplate is seen directly overhead;
- the camera sensor plane is parallel to the faceplate;
- circular controls remain circular;
- parallel rails and panel edges remain parallel;
- the top surface, rather than the side wall, is the dominant visible face of every control;
- no perspective warp, AI viewpoint change, generative redraw, or invented surface is required; and
- an extracted control could be placed back on the original faceplate without a viewpoint mismatch.

Angled, three-quarter, side-view, shallow-depth-of-field, and lifestyle photographs fail regardless of pixel dimensions.

## Repository audit

The current equipment-photo folder does not contain a high-resolution directly overhead capture suitable for large isolated controls.

- `CDJ 3000.jpg` has the correct axis but is only 295×420 and fails resolution.
- The fifteen large Pexels equipment photographs are angled, perspective-heavy, or shallow-focus and fail camera axis.
- The screenshot-labelled material in `source-library/09 - knobs` is too small and too panel-bound for hero-scale extraction.

## Official top-down masters located

### XDJ-AZ

- Source: AlphaTheta product CGI, directly overhead.
- Native file: 3300×1990.
- Status: **QUALIFIED FOR WHOLE-DEVICE USE.**
- Individual controls: **UI-SCALE ONLY.** Typical knobs, buttons, and pads occupy roughly 60–120 source pixels and must not be enlarged into collage-scale objects.
- Source URL: `https://assets.alphatheta.com/wp-content/uploads/2024/09/XDJ-AZ_CGI_Top_3300x1990.webp`

### DJM-A9

- Source: Pioneer DJ launch asset, directly overhead.
- Native file: 1792×1316.
- Status: **QUALIFIED FOR WHOLE-DEVICE USE.**
- Individual controls: **REFERENCE OR SMALL UI ONLY.** The mixer occupies only part of the canvas, leaving insufficient native pixels for large isolated knobs, buttons, and fader caps.
- Source URL: `https://images.microcms-assets.io/assets/3b9e29ce734e49babfedb3f8d1e728e3/4d98c225a5bd49fca694ec8a917b9e06/B1AF6BE3-E1F1-47B8-84D7-8479111A1C05.png`

## What is usable now

- The complete XDJ-AZ may be used as a top-down deck/faceplate environment.
- The complete DJM-A9 may be used as a top-down mixer environment at moderate display sizes.
- Small native-resolution control crops may be tested only where the final CSS size stays below their source dimensions, such as 24–48px bullets.
- Neither master can supply the oversized isolated hardware needed for poster-scale collage.

## What must be captured to finish the physical sample library

Patrick's actual mixer/controller must be photographed directly overhead at full camera resolution.

Required capture set:

1. One full-device master with all four corners visible and the camera perfectly parallel to the faceplate.
2. One overhead macro of each knob family, with the complete control at least 1000px across.
3. One overhead macro of CUE, PLAY/PAUSE, and each performance-pad state, with the full illuminated bezel visible.
4. One overhead macro of a channel-fader cap and one of the complete rail, without moving the camera axis.
5. Powered-off and powered-on passes from the same locked camera position.

Use original RAW, HEIF Max, or highest-quality JPEG files. Do not submit screenshots, Photos previews, messaging-app copies, or images that have been resized for email or the web.

## Release statuses

```text
V1_PANEL_CROPS: REJECTED
V2_ANGLED_MACROS: REJECTED
XDJ_AZ_TOP_DOWN_MASTER: WHOLE_DEVICE_PASS / LARGE_CONTROL_FAIL
DJM_A9_TOP_DOWN_MASTER: WHOLE_DEVICE_PASS / LARGE_CONTROL_FAIL
LARGE_ISOLATED_TOP_DOWN_CONTROLS: SOURCE_CAPTURE_REQUIRED
PRODUCTION_MUTATION: NONE
```
