# HSDJ SERP Packaging Optimization — CTR-01 (Stage Final)

**Date:** 2026-06-03  
**Objective:** Increase click-through from existing Google rankings without new pages, architecture changes, or SEO volume.  
**Evidence source:** HSDJ SEO Intelligence Report (2026-06-03)

---

## Summary

Revised title and meta description packaging on five commercial/editorial routes plus the primary `weddingdancefloor` editorial story. Copy shifts from generic “wedding DJ service” framing toward **Squamish-rooted corridor expertise**, **packed dance floor authority**, and **atmosphere-first mountain weddings**. Minimal hero/intro alignment on `/about`, `/stories`, `/squamish-wedding-dj`, and the packed dance-floor story deck only where SERP promise must match on-page positioning.

**No changes to:** homepage, guides, venue pages, Sunwolf/Cheakamus assets, redirects, schema, navigation, design systems.

---

## Files modified

| File | Changes |
|------|---------|
| `src/app/about/page.tsx` | Title, meta, OG; hero opening paragraph |
| `src/app/stories/page.tsx` | Title, meta, OG/Twitter; H1; hub intro; hub card for dance-floor story |
| `src/app/stories/sea-to-sky-wedding-dance-floor-energy/page.tsx` | Title, meta, hero deck (weddingdancefloor cluster) |
| `src/app/squamish-wedding-dj/page.tsx` | Title, meta, OG/Twitter; H1; hero paragraph |
| `src/app/weddings/page.tsx` | Title, meta, OG |
| `src/app/packages/page.tsx` | Title, meta, OG |

---

## Page-by-page: before / after

### 1. `/about` (pos 3.0 · CTR 2.4% · expected ~11%)

| Field | Before | After |
|-------|--------|--------|
| **Title** | About Howe Sound DJ \| Sea-to-Sky Wedding Authority | **About Patrick \| Squamish Sea-to-Sky Wedding DJ** |
| **Meta** | Meet Patrick of Howe Sound DJ: Squamish wedding DJ with 15+ years in music, production-trained audio, and a dance-floor-first approach for Sea-to-Sky celebrations. | **Squamish-rooted wedding DJ for the corridor: production-trained sound, real venue familiarity, and reception pacing built around how mountain weddings actually move from vows to dance floor.** |
| **OG description** | Story, approach, and credibility: production-minded sound, corridor venue familiarity, and wedding dance floors built with emotional intention. | **Meet Patrick: corridor-native planning, atmosphere-first receptions, and dance floors shaped by room-reading, not a generic wedding playlist.** |

**Opening shift:** Hero paragraph now names Squamish rooting, venue/weekend context, and vows-to-packed-floor arc.

**Rationale:** “Authority” reads institutional; “Patrick” + “Squamish” reads human and local. Meta promises **understanding their wedding** (pacing, venue familiarity) vs credentials list.

**Expected CTR impact:** Moderate uplift (2.4% → 5–8% band realistic in 28d); largest lever is personal + corridor-specific promise at pos 3.

---

### 2. `/stories` (141 imp · pos 5.3 · CTR 0%) — **highest priority**

| Field | Before | After |
|-------|--------|--------|
| **Title** | Sea-to-Sky Wedding Stories \| Real Dance Floor Moments | **Sea-to-Sky Dance Floor Stories \| Packed Mountain Receptions** |
| **Meta** | Real Squamish and Whistler wedding stories, mountain reception energy, and dance floor moments from the Sea-to-Sky corridor—editorial proof of how corridor weddings actually feel. | **How packed Sea-to-Sky dance floors actually feel: mountain reception energy, guest trust, and the pacing that turns Squamish and Whistler weddings from dinner into celebration.** |
| **H1** | Mountain wedding energy, told through real dance floor moments | **What packed Sea-to-Sky dance floors actually feel like** |

**Rationale:** Title leads with **dance floor** intent (matches GSC `weddingdancefloor` editorial cluster). “Stories” alone is passive; “packed mountain receptions” is emotionally specific and curiosity-driving without clickbait. Removed em dash from meta.

**Expected CTR impact:** High priority target (0% → 3–6% at pos 5–6 if snippet refreshes).

---

### 3. `/squamish-wedding-dj` (35 imp · pos 6.1 · CTR 0%)

| Field | Before | After |
|-------|--------|--------|
| **Title** | Squamish Wedding DJ \| Mountain Dance Floors That Stay Packed | **Squamish Wedding DJ \| Local Reception Energy That Stays Packed** |
| **Meta** | Squamish wedding DJ for Sea-to-Sky celebrations: corridor-native sound, cinematic reception energy, and dance floors built for mountain weddings—from ceremony to last song. | **Squamish wedding DJ rooted in the corridor: venue-aware planning, ceremony-to-reception flow, and dance floors your guests stay on. Built for mountain weddings, not city templates.** |
| **H1** | …unforgettable dance floor | **…packed dance floor** |

**Rationale:** “Local” + “venue-aware” differentiates from imported Vancouver DJs. Removed banned “unforgettable” and em dash. Outcome-led (“guests stay on”) vs cinematic adjective stack.

**Expected CTR impact:** Moderate (0% → 2–5% on low impression volume; positioning clearer for Squamish-intent queries).

---

### 4. `/weddings` (34 imp · pos 5.6 · CTR 0%)

| Field | Before | After |
|-------|--------|--------|
| **Title** | Sea-to-Sky Wedding DJ \| Dance Floors Built Around You | **Sea-to-Sky Wedding DJ \| Ceremony to Packed Dance Floor** |
| **Meta** | Personalized wedding DJ for Squamish, Whistler, and the Sea-to-Sky corridor: ceremony through reception, emotional pacing, and dance floors your guests stay on all night. | **Wedding DJ for Squamish, Whistler, and the corridor: calm planning, ceremony-through-reception coverage, and dance floors shaped by how your crowd actually moves.** |
| **OG** | Tailored music and atmosphere for mountain weddings—elegant and emotional or full dance party—built with intention from first dance to last song. | **Mountain wedding sound and pacing from vows through last song: atmosphere-first planning, clear communication, and reception energy built around your people.** |

**Rationale:** Title names full arc (ceremony → floor). Meta leads with **planning confidence** and corridor geography; reduces generic “personalized” DJ language.

**Expected CTR impact:** Moderate (0% → 2–4%).

---

### 5. `/packages` (48 imp · pos 4.8 · CTR 2.1%)

| Field | Before | After |
|-------|--------|--------|
| **Title** | Wedding DJ Packages \| Sea-to-Sky Celebration Coverage | **Wedding DJ Packages \| Clear Sea-to-Sky Coverage** |
| **Meta** | Wedding DJ packages for Squamish and Sea-to-Sky celebrations: ceremony through reception, dance floor energy, and atmosphere built around your crowd—not a generic playlist. | **What couples actually receive: ceremony-through-reception DJ coverage, planning calls, custom playlists, and corridor-ready sound for Squamish and Sea-to-Sky weddings.** |
| **OG** | Clear tiers for ceremony-to-reception coverage, dance floor energy, and optional enhancements—built for couples who care about atmosphere, not price-shopping. | **Transparent wedding DJ tiers for the corridor: planning confidence, full-day coverage options, and atmosphere built around your crowd, not a feature checklist.** |

**Rationale:** Shifts SERP from “packages/coverage” commodity to **clarity and what you receive**; reduces feature-shopping frame.

**Expected CTR impact:** Low–moderate (2.1% → 4–6%).

---

### 6. `/stories/sea-to-sky-wedding-dance-floor-energy` (`weddingdancefloor` cluster · 265 imp · pos 5.9 · CTR 0%)

| Field | Before | After |
|-------|--------|--------|
| **Title** | What a High-Energy Sea-to-Sky Wedding Dance Floor Feels Like | **What a Packed Sea-to-Sky Wedding Dance Floor Feels Like** |
| **Meta** | Editorial proof from Howe Sound DJ: what high-energy Sea-to-Sky wedding dance floors feel like, how guest trust builds, and how the Roomflow Method shows up in real celebration arcs. | **Observational editorial on how Sea-to-Sky wedding dance floors get packed: guest trust, dinner-to-dance pacing, and mountain reception momentum from Howe Sound DJ.** |

**Deck alignment:** Hero intro updated to “packed” / observational framing (no fabricated wedding).

**Rationale:** Direct alignment with GSC editorial query intent; “packed” is the corridor’s proof language and matches hub + Sunwolf authority thesis.

**Expected CTR impact:** High for this URL if Google selects it for `weddingdancefloor` impressions (0% → 3–7%).

---

## Phrases intentionally avoided

best, top-rated, award-winning, luxury, magical, unforgettable, epic, clickbait superlatives, em dashes in **new** copy.

---

## Internal consistency

- Aligns with **Sunwolf** focused-arc / packed-floor philosophy (no contradiction).
- Reinforces **Sea-to-Sky authority** and **Roomflow / atmosphere-first** thesis.
- No new venue claims, preferred-vendor language, or fabricated proof.
- Story retitle matches hub card and prior Tranche 02 enhancement intent.

---

## Validation

```text
npx tsc --noEmit                    # exit 0
npx eslint [6 touched page files]   # exit 0
```

Build not run (not required by touched route architecture; metadata-only + light hero copy).

---

## Measurement (28-day window)

| URL | Baseline | Target signal |
|-----|----------|----------------|
| `/stories` | 0% CTR @ 5.3 | ≥3% CTR or ≥4 clicks |
| `/stories/sea-to-sky-wedding-dance-floor-energy` | 0% @ 5.9 | ≥2 clicks on weddingdancefloor cluster |
| `/about` | 2.4% @ 3.0 | ≥5% CTR |
| `/squamish-wedding-dj` | 0% @ 6.1 | ≥1 click |
| `/weddings` | 0% @ 5.6 | ≥1 click |
| `/packages` | 2.1% @ 4.8 | ≥4% CTR |

Re-check GSC **Performance → Pages** after snippet refresh (typically 3–14 days).

---

## Recommended next tranche

**CTR-02 (defer):** Revisit `/guides/how-to-keep-a-wedding-dance-floor-packed` title/meta only if hub + story CTR lift is flat after 28d. Do not expand scope until CTR-01 data returns.

---

## Git

No commit (per instructions).
