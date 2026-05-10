# Handoff: Venue–story emotional authority ecosystem (foundation pass)

## New routes / pages

| Route | File |
|--------|------|
| `/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like` | `src/app/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like/page.tsx` |

- **Canonical / OG:** `/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like` (relative, resolved via existing `metadataBase`).
- **Structured data:** `storyArticleBreadcrumbJsonLd` + `storyArticleJsonLd` (same pattern as `sea-to-sky-wedding-dance-floor-energy`).
- **Published date (meta):** `2026-05-10` (`STORY_DATE`).

## Story content architecture (emotional positioning)

Editorial **observation** only—explicit disclaimers that it is **not** a named-wedding recap or fabricated testimonial.

**Sections delivered:**

1. Hero (breadcrumb, editorial label, date, H1, deck + link to venue guide, `CTADuo`)
2. Emotional setup / arrival energy (`Block` “Arrival”)
3. Why mountain receptions feel different (`Block` “Altitude”, banded)
4. The transition into dancing (`Block` “Threshold”)
5. Guest trust + Roomflow Method (`Block` “Trust”, link to dance-floor guide)
6. Atmosphere Arc (`Block` “Arc”)
7. Why local familiarity matters (`Block` “Place”, Squamish pillar + Whistler pillar links)
8. Related planning links (venue guide, choose-a-DJ guide, companion dance-floor story)
9. Soft finale CTA (`CTADuo` + “Back to Stories”)

**Tone:** Cinematic, calm, observant; avoids hype, “epic,” and sales language.

## Internal links added / strengthened

| From | To | Rationale |
|------|-----|-----------|
| New story (hero + Related) | `/venues/sea-to-sky-gondola` | Venue ↔ story relationship |
| New story | `/guides/how-to-keep-a-wedding-dance-floor-packed` | Roomflow Method depth |
| New story | `/guides/how-to-choose-a-wedding-dj-in-squamish` | Planning authority |
| New story | `/squamish-wedding-dj` | Local-specialist posture (named as “planning lens”) |
| New story | `/whistler-wedding-dj` | Corridor / destination contrast |
| New story | `/stories/sea-to-sky-wedding-dance-floor-energy` | Companion editorial |
| `sea-to-sky-wedding-dance-floor-energy` story | New story | Cross-link from “Services” block |
| `/venues/[slug]` when `slug === "sea-to-sky-gondola"` | New story | “Also useful” editorial line |
| `/stories` hub | New story (card) | Discovery |

**Not changed:** Nav tree, homepage, CTA component internals, APIs, analytics, `metadataBase`, redirects, package pages.

## Files touched

- `src/app/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like/page.tsx` — **new**
- `src/app/stories/page.tsx` — story list: **gondola first**, dance-floor second; same 2-column grid
- `src/app/stories/sea-to-sky-wedding-dance-floor-energy/page.tsx` — contextual companion link
- `src/app/venues/[slug]/page.tsx` — conditional “Also useful” item for **Sea to Sky Gondola** only  
  *(There is no separate `venues/sea-to-sky-gondola/page.tsx`; all venues use the dynamic route.)*
- `src/app/sitemap.ts` — new story URL for crawl consistency

## Authority relationships (ecosystem notes)

- **Venue guide** stays the **operational / named-setting** layer.
- **New story** is the **emotional / atmospheric** layer for the same setting—harder for competitors to mimic without local fluency.
- **Hub** presents two stories side by side without adding feed UI—still calm, editorial.

## Future expansion (recommendations)

- Add **venue-tagged** story entries only when each piece has a distinct emotional thesis (avoid blog cadence).
- Consider a **lightweight “stories by setting”** pattern later (still not a blog archive).
- Optional: one **pull-quote** interlude component for future long-form if typography needs more rest.
- When licensed couple media exists, **separate** “featured wedding” template from **editorial** template to protect trust.

## Validation results

```bash
cd ~/Desktop/howesounddj
npx tsc --noEmit   # exit 0
npx eslint .       # exit 0
npm run build      # exit 0 — route list includes ○ /stories/what-a-sea-to-sky-gondola-dance-floor-feels-like
```

## Manual QA checklist

- [ ] New story: desktop + mobile (375px) — readable line length, section rhythm, no clutter
- [ ] Hero: editorial disclaimer + venue guide link work
- [ ] All internal links resolve (venue, guides, pillars, companion story, stories hub)
- [ ] `/venues/sea-to-sky-gondola` “Also useful” shows **only** on that venue
- [ ] Stories hub: **two** cards, gondola first, layout balanced
- [ ] Companion story updated paragraph reads cleanly
- [ ] `sitemap.xml` includes new story URL
- [ ] Canonical in head matches `/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like`
- [ ] No duplicate global finale on story route (existing `/stories/*` omission in conditional finale)
- [ ] `CTADuo` still fires consult + availability (tracking surfaces unchanged: `page_cta`)

## Git

No commit performed unless explicitly requested.
