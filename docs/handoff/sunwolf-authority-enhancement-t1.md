# Handoff: Sunwolf authority enhancement (T1)

**Tranche:** T1 — Sunwolf Authority Enhancement  
**Date:** 2026-05-23  
**Authoritative audit:** `docs/handoff/sunwolf-cheakamus-venue-authority-audit.md`

---

## Files changed

| File | Change |
|------|--------|
| `src/config/venue-pages.ts` | Sunwolf entry: name, venue type, card, hero summary, meta, `whyFit`, `planningFocus`, `localExpertise` |
| `src/app/squamish-wedding-dj/page.tsx` | One editorial paragraph + link to `/venues/sunwolf` before venue grid |
| `src/app/guides/how-to-keep-a-wedding-dance-floor-packed/page.tsx` | Refined Sunwolf anchor + one sentence on concentrated reception arc |

**Not changed:** `src/app/venues/[slug]/page.tsx`, homepage, sitemap, schema, stories, other venues, CTA/analytics.

---

## Before / after strategic intent

| Dimension | Before | After |
|-----------|--------|--------|
| Positioning | Generic “riverside lodge,” water-adjacent calm → party | **Brackendale riverside resort** with intentional day arc and **focused reception pacing** |
| Emotional specificity | Template paragraphs; “magical” in copy | Observational: breathe → build recognition → peak naturally; **no hype words** |
| HSDJ fit | Implied local familiarity | **Squamish-rooted, low travel friction** for Brackendale; room-reading and transitions |
| Dance floor | “Matches your crowd” | **Concentrated chapter** vs marathon; Roomflow-aligned trust-before-intensity |
| Naming / SERP | “Sunwolf” only | **Sunwolf Riverside Resort** on page title, H1, meta (via existing dynamic metadata) |
| Discovery | Pillar grid only | Pillar **editorial sentence** + stronger guide contextual link |

---

## Sunwolf positioning thesis

**One sentence:** Sunwolf Riverside Resort weddings land best when the DJ treats the riverside day as a single intentional arc—relaxed arrival, clear transitions, and a dance floor that peaks because pacing earned it, not because the timeline kept stretching.

**What the page now subtly communicates:**

- Riverside + lodge character shapes guest energy from daytime through evening.
- Receptions feel **fuller** when pacing is **focused**, not extended past natural momentum.
- Atmosphere and flow matter more than volume or forced hype.
- Squamish-rooted planning reduces day-of friction for Brackendale.

**What it does not claim:** exclusivity, preferred-vendor status, partnership, curfews, day-of-week packages, dance-floor dimensions, or fixed end times.

---

## Title / meta adjustments

Dynamic pattern unchanged in `venues/[slug]/page.tsx`:

- **Title:** `Wedding DJ for Sunwolf Riverside Resort · Brackendale, BC` (template → `| Howe Sound DJ`)
- **Meta description:** “Sunwolf Riverside Resort wedding DJ in Brackendale: riverside Sea-to-Sky receptions with intentional pacing, ceremony-to-dance-floor flow, and Squamish-rooted planning from Howe Sound DJ.”

**Rationale:** Full resort name for venue-intent queries; “intentional pacing” and “ceremony-to-dance-floor” for CTR without spam; no “best” or superlative language.

---

## Internal linking adjustments

| From | Adjustment |
|------|------------|
| `/squamish-wedding-dj` | New paragraph: “Sunwolf Riverside Resort guide” → `/venues/sunwolf` (focused arc, not marathon framing) |
| `/guides/how-to-keep-a-wedding-dance-floor-packed` | Anchor text `Brackendale riverside resort`; added one sentence on concentrated arc / natural end of energy |

No duplicate anchor spam; no repeated “Sunwolf wedding DJ” in body links.

---

## Squamish pillar adjustments

- **Type:** Single supporting paragraph (`text-white/60`), below main venues intro, above grid.
- **Tone:** Editorial planning pointer, not “featured venue” or ranking language.
- **Balance:** Grid unchanged; all pillar venues still equal in the list.

---

## Phrases intentionally avoided

- magical, unforgettable, dream wedding, epic, vibes, elevated, luxury, best, award-winning  
- preferred vendor, exclusive, partnership  
- 11 PM, Wednesday, Saturday-only, capacity numbers, policy claims  
- em dashes in **new** copy  

---

## Verification-sensitive facts intentionally excluded

| Topic | Status |
|-------|--------|
| 11 PM end time | Not published (Patrick context; verify with venue first) |
| Wednesday / Saturday wedding structure | Not published |
| Maximum 3-hour dance window | Expressed only as **philosophy** (“concentrated chapter,” “not stretched,” “natural end”) |
| Dance-floor dimensions | Not published |
| Wedding frequency / “we play here often” | Not published |
| Preferred vendor / exclusivity | Not published |

**Included without policy risk:** Squamish-rooted, Brackendale location, riverside resort character (public positioning), intentional pacing, Roomflow-style observational logic.

---

## Validation results

```text
rg -n "—" src/app src/components src/config src/lib
# New/edited files: no em dashes in venue-pages Sunwolf block, squamish pillar addition, guide edit.
# Pre-existing em dashes remain elsewhere (unchanged scope).

npx tsc --noEmit   # exit 0
npx eslint .       # exit 0
npm run build      # exit 0; /venues/sunwolf SSG included in venue slug set
```

---

## Recommended next tranche

1. **T2 — Sunwolf editorial story** (`/stories/what-a-sunwolf-riverside-wedding-reception-feels-like` or similar): emotional layer + conditional “Also useful” on venue detail (Gondola pattern).  
2. **Venue-specific proof:** Pull quote on `/venues/sunwolf` only if a review can be tagged to Sunwolf without fabrication.  
3. **Cheakamus T3:** Pillar + guide links + copy enhancement per audit.  
4. **GSC title/meta watch:** After 4–8 weeks, evaluate CTR on “Sunwolf wedding DJ” before further SERP experiments.

---

## Git

No commit (per instructions).
