# Handoff: Sunwolf editorial story (T2)

**Tranche:** T2 — Sunwolf Editorial Story  
**Date:** 2026-05-23  
**References:** `docs/handoff/sunwolf-authority-enhancement-t1.md`, `docs/handoff/sunwolf-cheakamus-venue-authority-audit.md`

---

## Files changed

| File | Change |
|------|--------|
| `src/app/stories/what-a-sunwolf-riverside-wedding-reception-feels-like/page.tsx` | **New** editorial story (full article) |
| `src/app/stories/page.tsx` | Hub card (second in list, after Gondola) |
| `src/app/sitemap.ts` | New story URL |
| `src/app/venues/[slug]/page.tsx` | Conditional “Also useful” link when `slug === "sunwolf"` |
| `src/app/stories/sea-to-sky-wedding-dance-floor-energy/page.tsx` | Companion cross-link to Sunwolf story |

**Not changed:** `venue-pages.ts`, homepage, global metadata, CTA internals, packages, other venue pages.

---

## Route

- **Slug:** `what-a-sunwolf-riverside-wedding-reception-feels-like`
- **URL:** `/stories/what-a-sunwolf-riverside-wedding-reception-feels-like`
- **Rationale:** Mirrors Gondola naming (`what-a-{setting}-…-feels-like`); clearly venue-shaped; distinct from thesis-only slug `why-some-of-the-best-sunwolf-receptions-feel-focused-not-forced` while embedding focus in body/meta.

---

## Story thesis

**One sentence:** The strongest Sunwolf Riverside Resort receptions often feel complete because riverside calm gives guests a grounded arrival state, and a DJ who shapes a **focused arc** (recognition before intensity, concentrated dance chapter, coherent last song) lets energy peak naturally instead of stretching the night past its emotional end.

**Distinct from Gondola:** Ground-level Brackendale / river / lodge; **pacing and duration philosophy** vs elevation, light, and ridge-line awe.

---

## Emotional positioning strategy

| Layer | Approach |
|-------|----------|
| Opening | Earned pacing vs marathon timelines (observational, not preachy) |
| Setting | Riverside emotional grounding, daylight-to-evening transition |
| Arc | Roomflow: recognition → permission to dance |
| Focus | Concentrated celebration can feel **fuller**; still pro high energy |
| Room-reading | Transitions, restraint, avoid forcing floor early |
| Corridor | Squamish-rooted familiarity; Gondola as contrast (awe vs calm) |
| Close | Coherence and memory over clock length |

**Conversion psychology:** Couples who want intentional, high-energy-but-not-exhausting receptions see themselves; CTA invites venue + timeline without pressure.

---

## Metadata rationale

| Field | Value |
|-------|--------|
| **title** | `What a Sunwolf Riverside Wedding Reception Feels Like` |
| **description** | Focused pacing, riverside calm → earned dance energy, one coherent arc; explicit “editorial reflection” |
| **canonical** | `/stories/what-a-sunwolf-riverside-wedding-reception-feels-like` |
| **publishedTime** | `2026-05-23` |

No hype, no clickbait, no keyword stuffing. Venue name once in title for intent; body carries Squamish/Brackendale naturally.

---

## Schema

Same as existing stories:

- `storyArticleBreadcrumbJsonLd(STORY_TITLE, STORY_SLUG)`
- `storyArticleJsonLd({ slug, headline, description, datePublished })`

No Review, Event, or Person schema.

---

## Internal linking added

| From | To | Anchor / context |
|------|-----|----------------|
| Story hero + Related | `/venues/sunwolf` | Venue guide |
| Story Arc | `/guides/how-to-keep-a-wedding-dance-floor-packed` | Roomflow Method |
| Story Corridor | `/squamish-wedding-dj` | Squamish-rooted planning lens |
| Story Corridor | `/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like` | Contrast (ridge vs riverside) |
| Story Related | `/guides/how-to-choose-a-wedding-dj-in-squamish`, `/stories/sea-to-sky-wedding-dance-floor-energy` | Planning + companion |
| Story finale | `/stories` | Back to Stories |
| `/venues/sunwolf` | New story | “Editorial perspective on focused riverside reception pacing…” |
| `/stories` hub | New story | Card + summary |
| `sea-to-sky-wedding-dance-floor-energy` | New story | Brackendale / Sunwolf companion |

**CTA:** `CTADuo` in hero and finale (`page_cta`), matching Gondola pattern.

---

## Phrases intentionally avoided

magical, unforgettable, epic, dream wedding, luxury, elevated, vibes, best, award-winning, iconic, once-in-a-lifetime, em dashes, “Imagine a couple…”, fictional couple names/dates.

---

## Fictionalization safeguards

- Hero and image caption state **not** a named wedding recap.
- No couple narratives, timelines, or “last summer we played…” claims.
- No venue partnership, exclusivity, or policy numbers.
- Sunwolf named as **setting type** and public resort name only.
- Image: brand editorial packed dance floor, labeled not documentary proof.

---

## Validation results

```text
rg -n "—" src/app/stories/what-a-sunwolf-riverside-wedding-reception-feels-like
# no matches

npx tsc --noEmit   # exit 0
npx eslint .       # exit 0
npm run build      # exit 0
# Route listed: ○ /stories/what-a-sunwolf-riverside-wedding-reception-feels-like
```

---

## Recommended next tranche

1. **Cheakamus T3** — venue copy + pillar/guide links + optional forest-campus editorial.  
2. **Venue pull quote** on `/venues/sunwolf` if a review can be attributed without fabrication.  
3. **GSC watch** — impressions/CTR on new story URL after index.  
4. **Optional:** One contextual link from dance-floor guide Related/footer to this story (only if CTR pass on guide is flat).

---

## Git

No commit (per instructions).
