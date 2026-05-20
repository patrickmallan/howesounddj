# HSDJ Authority Conversion Tranche 01 — Stage FINAL

**Date:** 2026-05-19  
**Scope:** First authority-conversion tranche driven by live HSDJ_SEO_Intelligence signals  
**Mode:** Metadata, copy, redirects, internal linking only — no redesign, no new routes, no thin pages

---

## Executive summary

This tranche consolidates redirect authority into geo-commercial pillars, sharpens SERP packaging on already-ranking URLs, and strengthens the internal authority graph around Sea-to-Sky wedding DJ intent, dance floor editorial positioning, and `/squamish-wedding-dj` as the primary Squamish commercial pillar.

---

## GSC signals that motivated changes

| Signal | Observation | Action taken |
|--------|-------------|--------------|
| **Stories hub CTR gap** | `/stories` — ~84 impressions, avg position ~4.3, **0 clicks** | Rewrote title + meta description for emotional/editorial intent; reframed H1 and hero copy away from generic “blog” framing; expanded internal links to pillars and guides |
| **Squamish wedding DJ association** | Google already associating HSDJ with Squamish wedding DJ authority | Elevated `/squamish-wedding-dj` as redirect target for `/squamish-dj-services`; strengthened pillar title, description, and hero copy for commercial + dance-floor outcomes |
| **Whistler wedding DJ association** | Legacy `/whistler-wedding-dj-services` resolving to generic `/weddings` hub | Redirect consolidated to `/whistler-wedding-dj` (matches existing `/whistler-dj-services` pattern) |
| **Dance floor editorial intent** | Queries clustering around wedding dance floor energy, Sea-to-Sky wedding atmosphere | Stories, weddings, reviews, and packages metadata reframed toward outcomes (packed floors, mountain energy, trust) — not price-shopping language |
| **Venue-related wedding searches** | Venue pages already in authority cluster | Venues hub anchor text updated to “Sea-to-Sky wedding stories”; story editorials link back to Squamish pillar |

*Note: `seo_summary.json` was not present in-repo at execution time; signals above reflect the live GSC extraction cited in the tranche brief and strategic intelligence from HSDJ_SEO_Intelligence.*

---

## Priority 1 — Redirect authority consolidation

**File:** `next.config.ts`

| Legacy URL | Previous destination | New destination | Rationale |
|------------|---------------------|-----------------|-----------|
| `/squamish-dj-services` (+ `/`) | `/weddings` | **`/squamish-wedding-dj`** | Geo + wedding-DJ commercial intent → strongest semantic pillar |
| `/whistler-wedding-dj-services` (+ `/`) | `/weddings` | **`/whistler-wedding-dj`** | Matches Whistler pillar; eliminates authority leakage to generic hub |

**Reviewed, unchanged (correct semantic match):**

| Legacy URL | Destination | Rationale |
|------------|-------------|-----------|
| `/whistler-dj-services` (+ `/`) | `/whistler-wedding-dj` | Already aligned |
| `/wedding-dj-packages-in-squamish` (+ `/`) | `/packages` | Package/commercial intent, not geo pillar |
| `/a-little-about-me`, `/about-howe-sound-wedding-dj` | `/about` | About intent |
| `/dj-packages` | `/packages` | Package intent |
| `/blog` | `/stories` | Editorial hub |

All redirects remain **permanent (308)** with trailing-slash variants preserved. No redirect chains introduced.

---

## Priority 2 — Squamish commercial pillar

**File:** `src/app/squamish-wedding-dj/page.tsx`

| Element | Before (summary) | After (summary) |
|---------|------------------|-----------------|
| **Title** | “Squamish Wedding DJ” | “Squamish Wedding DJ \| Mountain Dance Floors That Stay Packed” |
| **Meta description** | Planning/logistics framing | Cinematic reception energy, corridor-native sound, ceremony-to-last-song dance floor outcomes |
| **H1** | “Premium Sea-to-Sky support for weddings in Squamish” | “Squamish wedding DJ for celebrations that build to an unforgettable dance floor” |
| **Hero copy** | Operational/local framing | Premium, mountain-specialized, dance-floor-outcome language |
| **Internal links** | Generic “Wedding DJ Services” anchor | “Sea-to-Sky wedding DJ services” + new hero link to `/stories` |

---

## Priority 3 — Stories authority hub

**File:** `src/app/stories/page.tsx`

| Element | Change |
|---------|--------|
| **Title** | “Sea-to-Sky Wedding Stories \| Real Dance Floor Moments” |
| **Meta description** | Squamish + Whistler, mountain reception energy, real dance floor moments |
| **H1** | “Mountain wedding energy, told through real dance floor moments” |
| **Hero subcopy** | Editorial framing: real Squamish/Whistler stories, not invented recaps |
| **Section H2** | “Sea-to-Sky wedding stories available now” + dance-floor arc intro |
| **Footer links** | Added `/guides/how-to-keep-a-wedding-dance-floor-packed`, `/weddings`; strengthened pillar anchors |

---

## Priority 4 — Internal authority graph

Contextual editorial anchors updated across the cluster (no nav changes):

| File | Link improvements |
|------|-------------------|
| `src/app/squamish-wedding-dj/page.tsx` | Hero → `/stories`, `/weddings`; related section anchor refresh |
| `src/app/whistler-wedding-dj/page.tsx` | Hero + finale → “Sea-to-Sky wedding stories” |
| `src/app/stories/page.tsx` | Full pillar + guide cross-links in footer |
| `src/app/stories/sea-to-sky-wedding-dance-floor-energy/page.tsx` | Added `/squamish-wedding-dj` + `/stories` hub links |
| `src/app/guides/page.tsx` | Stories anchor → “Sea-to-Sky wedding stories” |
| `src/app/venues/page.tsx` | Stories anchor → “Sea-to-Sky wedding stories” |
| `src/app/weddings/page.tsx` | Stories anchor refresh |

Anchor vocabulary emphasized: dance floor energy, Sea-to-Sky weddings, packed floors, mountain wedding atmosphere, Squamish/Whistler pillars.

---

## Priority 5 — SERP packaging (CTR)

| Route | New title (summary) | CTR psychology shift |
|-------|---------------------|----------------------|
| `/packages` | “Wedding DJ Packages \| Sea-to-Sky Celebration Coverage” | Atmosphere + crowd, not price tiers |
| `/reviews` | “Wedding DJ Reviews \| Couples on Dance Floor Energy” | Trust + packed floors, not generic testimonials |
| `/weddings` | “Sea-to-Sky Wedding DJ \| Dance Floors Built Around You” | Outcome-led hub, not “services” label |
| `/about` | “About Howe Sound DJ \| Sea-to-Sky Wedding Authority” | Authority + dance-floor-first approach |

OpenGraph descriptions aligned with same emotional/trust framing.

---

## Validation performed

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | **PASS** |
| Linter on touched files | **No errors** |
| Redirect config review | Single-hop permanent redirects; no loops |
| Scope guard | No redesign, no new routes, no deleted authority pages |

**Recommended post-deploy checks (operator):**

1. `curl -I https://www.howesounddj.com/squamish-dj-services` → 308 → `/squamish-wedding-dj`
2. `curl -I https://www.howesounddj.com/whistler-wedding-dj-services` → 308 → `/whistler-wedding-dj`
3. GSC URL Inspection on `/stories` after recrawl — monitor CTR vs. baseline (84 imp / 0 clicks)
4. GSC Performance → Pages — watch `/squamish-wedding-dj` impression/click trend after redirect consolidation

---

## Expected SEO outcomes

1. **Redirect equity** flows to geo-commercial pillars instead of diluting into generic `/weddings` hub — stronger semantic match for sitelinks and legacy backlinks.
2. **Stories CTR** should improve as title/description better match the editorial queries Google already ranks the page for (position ~4.3 with zero clicks suggests SERP snippet mismatch, not ranking failure).
3. **Squamish commercial pillar** gains clearer differentiation from generic “DJ services” competitors in both SERP and on-page positioning.
4. **Internal graph** reinforces Google’s existing entity associations: Sea-to-Sky weddings ↔ dance floors ↔ Squamish/Whistler pillars ↔ venue guides ↔ stories.
5. **Hub pages** (`/weddings`, `/packages`, `/reviews`, `/about`) present outcome-led snippets that invite clicks from couples evaluating atmosphere and trust, not price shopping.

---

## Files changed

- `next.config.ts`
- `src/app/squamish-wedding-dj/page.tsx`
- `src/app/stories/page.tsx`
- `src/app/stories/sea-to-sky-wedding-dance-floor-energy/page.tsx`
- `src/app/whistler-wedding-dj/page.tsx`
- `src/app/guides/page.tsx`
- `src/app/venues/page.tsx`
- `src/app/weddings/page.tsx`
- `src/app/packages/page.tsx`
- `src/app/reviews/page.tsx`
- `src/app/about/page.tsx`
