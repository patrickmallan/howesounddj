# HSDJ-WEB-AVAILABILITY-SUCCESS-V3 — Design Exploration Handoff

**Date:** 2026-07-30  
**Current status:** `PATRICK_APPROVED_IMPLEMENTATION_AUTHORIZED_USER_VALIDATION_PENDING`  
**Historical verdict (research tranche):** `BLOCK_PATRICK_APPROVAL_REQUIRED` — **superseded** 2026-07-30  
**Type:** Research & prototypes — production implementation completed in bounded tranche

**Implementation handoff:** `docs/handoff/HSDJ_WEB_AVAILABILITY_SUCCESS_V3_IMPLEMENTATION.md`  
**Copy contract:** `docs/branding/HSDJ_AVAILABILITY_SUCCESS_V3_COPY_CONTRACT.md` — `APPROVED_FOR_IMPLEMENTATION` (Patrick 2026-07-30)  
**Qualitative sessions:** 0/8 — post-implementation validation pending; no fabricated evidence

---

## Executive Handoff

V3 research identifies **container architecture**, not copy, as the primary blocker to an emotionally rewarding availability success moment. The header panel stacks the completed date form under a nested success card inside a fixed-height scroll region. **The CTA is below the fold on all four measured viewports.**

**Winning concept:** **Human Connection** — replace form with success state, Stephen Henry proof centre, Patrick-forward invitation, sticky footer CTA **`Meet Patrick`**.

**Next step:** Patrick review pack + 5–8 mobile qualitative sessions → bounded implementation tranche.

**Patrick review pack:** `research/availability-success-v3/patrick-review-pack.html`  
**Facilitator guide:** `research/availability-success-v3/facilitator-guide.md`  
**Copy contract:** `docs/branding/HSDJ_AVAILABILITY_SUCCESS_V3_COPY_CONTRACT.md`

---

## Current Defect

| Signal | Measurement |
|--------|-------------|
| CTA initially visible (1280×720) | **NO** — CTA bottom 666px, panel ~639px visible |
| CTA initially visible (375×812) | **NO** — 192px scroll overflow |
| Form visible after success | **YES** — all viewports |
| Focus on success | **NO** — remains on `BODY` |
| Primary cause | Non-collapsing form + fixed `max-h` panel + nested card |

Source: `research/availability-success-v3/geometry-audit.json`

---

## Winning Concept — Human Connection

**Emotional mechanism:** Patrick feels like a caring partner couples would want at their wedding (Stephen proof).

**Architecture:** CONTAINER A (state replacement) + CONTAINER D (sticky CTA footer).

**Memory objective:** *"Patrick feels like someone we'd genuinely want at our wedding—and our date is open."*

---

## Canonical Copy (proposed for implementation)

| Element | Copy |
|---------|------|
| Confirmed bar | **Thursday, June 15, 2028** is available · Edit |
| Headline | Patrick would love to hear what you're planning. |
| Bridge | A complimentary 45-minute Sound Check is the calm next step: your venue, vision, music, and fit. |
| Stephen quote (SSOT verbatim) | We would get married all over again just so we could hangout and work with Patrick again. He's a talented DJ and a truly caring person. |
| Attribution | Stephen Henry |
| CTA supporting line | Complimentary wedding planning session |
| Primary CTA (compact) | **Meet Patrick** |
| Risk reducer | 45 minutes · No pressure · Just clarity |
| Change date | Edit / Try a different date (text) |

**Note:** SSOT uses **hangout** (one word). Do not add "My wife and I" or venue line without SSOT update.

---

## Container Behavior

### Compact header panel

```
[BEFORE]  Title + date fields + Check button
[AFTER]   Confirmed bar → headline → bridge → Stephen figure → [sticky footer: risk + CTA + change date]
```

Form hidden on `phase.kind === "available"`. Check button hidden. Panel scroll only if quote + copy exceed viewport; CTA always in sticky footer.

### Contact full surface

Same narrative; may retain longer CTA label. Inline transform (CONTAINER E) — no fixed modal height constraint.

---

## Desktop & Mobile Geometry (prototype targets)

| Viewport | Concept 2 panel | CTA visible without scroll |
|----------|-----------------|---------------------------|
| 1280×720 | ~497px | YES |
| 1512×982 | ~497px | YES |
| 390×844 | ~544px (max panel) | YES |
| 375×812 | ~544px | YES |

Screenshots: `docs/handoff/screenshots/availability-success-v3/concept-2-human-connection-*.png`

---

## CTA Behavior

- **Compact:** `Meet Patrick` + supporting line above (not inside button)
- **Full contact:** `Reserve My Complimentary Wedding Planning Session` OR shortened variant after user test
- Destination: existing Calendly URL + UTM (`post-availability-calendly.ts`)
- One primary action; change-date subordinate; no inquiry link in compact panel

---

## Motion Behavior

- State replacement: 200–300ms opacity fade (respect `prefers-reduced-motion`)
- Optional: subtle warm radial on panel background (success only)
- No confetti, pulse, or slot-machine effects

---

## Stephen Review Presentation

- Full SSOT quote in `<figure>` / `<blockquote>`
- Optional two-stage typography: lead sentence emphasized, remainder secondary
- Attribution immediately below: `Stephen Henry`
- No venue label until SSOT includes it
- Replace Matthew (full) / Lauren (compact) as post-availability proof IDs in implementation tranche

---

## Analytics Changes Proposed (implementation)

| Change | Type |
|--------|------|
| `success_variant: human_connection_v3` | New property on existing events |
| `container_variant: state_replace_sticky_footer` | New property |
| `cta_initially_visible` | Boolean on `post_availability_success_view` |
| `change_date_click` | New event (optional) |

**No changes** to event names or API in this tranche.

---

## Files Likely Affected (implementation tranche)

| File | Change |
|------|--------|
| `src/components/compact-availability-checker.tsx` | State replacement UI |
| `src/components/header-check-availability.tsx` | Sticky footer layout, panel structure |
| `src/components/post-availability-success.tsx` | Compact variant layout, sticky footer slot |
| `src/config/post-availability-copy.ts` | V3 copy, Stephen proof IDs |
| `src/config/reviews.ts` | `POST_AVAILABILITY_PROOF_*` → `stephen-henry` |
| `tests/post-availability-conversion.test.ts` | Geometry + copy assertions |

---

## Risks

| Risk | Mitigation |
|------|------------|
| Patrick-forward headline too early | Date confirmation bar first |
| Stephen quote too long on small screens | Two-stage typography; sticky CTA |
| State replacement disorients users | Edit date control + focus management |
| User test fails gate | Fall back to excerpt treatment |

---

## Acceptance Criteria (V3 Implementation)

- [ ] Form hidden in compact panel after available result
- [ ] CTA visible without scroll at 1280×720 and 375×812
- [ ] Stephen quote SSOT verbatim with clear attribution
- [ ] Focus moves to success heading; polite live announcement
- [ ] `Meet Patrick` compact CTA + supporting line
- [ ] No confetti, countdown, fake urgency
- [ ] Analytics properties added without breaking existing events
- [ ] typecheck, lint, tests, build pass

---

## Artifacts

| Artifact | Path |
|----------|------|
| Research SSOT | `docs/branding/HSDJ_AVAILABILITY_SUCCESS_V3_EMOTIONAL_DESIGN_RESEARCH.md` |
| Prototypes | `research/availability-success-v3/` |
| Geometry audit | `research/availability-success-v3/geometry-audit.json` |
| Screenshots | `docs/handoff/screenshots/availability-success-v3/` |
| V2 reference | `docs/handoff/screenshots/availability-success-v2/` |

**Local prototype review:** Open `research/availability-success-v3/index.html` in browser.

---

## Production Mutation Confirmation

| Check | Result |
|-------|--------|
| `src/` production components modified | **NO** (this tranche) |
| API / Operations | **NO** |
| Analytics contracts | **NO** |
| typecheck / lint / tests / build | **PASS** (65 tests) |

---

## Exact Next Tranche

**HSDJ-WEB-AVAILABILITY-SUCCESS-V3-IMPLEMENTATION**

Prerequisites: Patrick approves Concept 2 + canonical copy; qualitative user test gate (≥6/8 comprehension).

Scope: State replacement, sticky CTA, Stephen proof, focus/a11y, analytics properties — compact panel first, then contact full surface.

---

*End of V3 Design Exploration Handoff*
