# Authority flow + topological clustering pass — handoff

Execution date: 2026-05-08  
Runbook: `docs/HSDJ AUTHORITY FLOW + TOPOLOGICAL CLUSTERING PASS.txt` (QC version)

## Topology before (summary)

- **Global nav/footer** (`site-chrome.tsx`): already linked Guides, Stories, Venues, Whistler, plus the rest of the primary set.
- **Homepage**: `HomepageExploreSection` already surfaced `/guides`, `/stories`, `/venues`, `/whistler-wedding-dj`.
- **Strong hubs**: weddings, FAQ (planning + travel), guides hub, Whistler pillar, venues hub, and both guide articles already had multiple cross-links.
- **Gaps**: several high-value pages had **no `/stories`** in body copy (FAQ planning, weddings, Whistler hero, packed-dance-floor guide, stories hub footer strip, venues hub intro). **Guides hub** lacked an explicit **Whistler pillar** sentence. **Squamish hiring guide** lacked **stories** (venues were already linked elsewhere). **Venue detail** “Also useful” lacked **stories** and **Whistler pillar** for Whistler-area venues only.

## Topology after (summary)

- **Stories** are now reachable from FAQ (planning), weddings (planning strip), both guide articles (where missing), guides hub (already had stories; added Whistler), Whistler hero blurb, venues hub intro, stories hub (added venues + Whistler), editorial story page (services block), and all venue detail pages (Also useful).
- **Whistler pillar** reinforced from guides hub, packed-dance-floor guide, stories hub, editorial story, and **conditionally** on venue pages where `venue.area === "whistler"`.
- **Venue ecosystem** reinforced from stories hub and editorial story (explicit venue guides link).

No new routes, no nav/footer duplication, no keyword blocks.

## Files inspected

- Runbook targets and `rg` across `src/app`, `src/components` for `/guides`, `/stories`, `/venues`, `/whistler-wedding-dj`, Atmosphere Arc, Roomflow Method.
- `src/components/explore-site-links.tsx`, `src/components/site-chrome.tsx` (confirm existing coverage; **no edits**).

## Files changed

| File | Change |
|------|--------|
| `src/app/faq/page.tsx` | Planning group: added paragraph linking to `/stories`. |
| `src/app/weddings/page.tsx` | Planning strip: added paragraph linking to `/stories`. |
| `src/app/guides/page.tsx` | Closing context: added `/whistler-wedding-dj` sentence. |
| `src/app/guides/how-to-keep-a-wedding-dance-floor-packed/page.tsx` | Place section: paragraph for Whistler pillar + `/stories`. |
| `src/app/guides/how-to-choose-a-wedding-dj-in-squamish/page.tsx` | HSDJ block: paragraph for `/stories` only (venues already linked earlier). |
| `src/app/whistler-wedding-dj/page.tsx` | Hero: extended blurb with `/stories`. |
| `src/app/stories/page.tsx` | Footer strip: `/venues` + `/whistler-wedding-dj`. |
| `src/app/stories/sea-to-sky-wedding-dance-floor-energy/page.tsx` | “Where services fit”: `/venues` + `/whistler-wedding-dj`. |
| `src/app/venues/page.tsx` | Intro: link to `/stories`. |
| `src/app/venues/[slug]/page.tsx` | Also useful: `/stories`; Whistler pillar when `area === "whistler"`. |

## Contextual links added (by destination)

- **`/stories`**: FAQ (planning), weddings, dance-floor guide, Whistler page, venues hub, venue detail (all), plus choose-guide and stories hub as above.
- **`/whistler-wedding-dj`**: guides hub, dance-floor guide, stories hub, editorial story, venue detail (Whistler venues only).
- **`/venues`**: stories hub, editorial story (explicit); choose-guide already linked venues in the Place block.

## Homepage authority flow

- **Unchanged**: explore cards already satisfied Phase 2A; no extra in-hero links to avoid duplication.

## Cluster reinforcement

- **Cluster A (planning)**: FAQ + weddings now point readers at **stories** alongside existing guide links; guides hub ties **Whistler** into the same paragraph as venues/stories.
- **Cluster B (emotional)**: No new definitional copy; existing Atmosphere Arc / Roomflow usage unchanged.
- **Cluster C (geo)**: Whistler + corridor ties strengthened via pillar and venue **area** on Whistler venue pages.
- **Cluster D (venues)**: Hub + detail “Also useful” + story page services block point at venue guides and stories.

## Crawled-not-indexed (in-repo scope)

- Not measured. This pass only adds **contextual internal links** and short supporting sentences.

## Validation results

```text
npx tsc --noEmit   # pass (exit 0)
npx eslint .       # pass (exit 0)
npm run build      # pass (Next.js 16.2.3)
```

## Intentional omissions

- **`site-chrome.tsx` / `explore-site-links.tsx`**: already met runbook footer/home discovery; not modified.
- **`src/app/page.tsx`**: homepage discovery unchanged.
- **`/vancouver-wedding-dj`**: still linked from weddings and footer; no extra changes this pass.
- **Lateral venue-to-venue links**: not added (would need a curated, non-spammy policy per venue).
- **FAQ travel group**: already had Squamish guide + Whistler; stories added under **planning** only to avoid link stacking in travel.

## Future opportunities

- Add **one** contextual `/stories` mention in FAQ **travel** if analytics show that section earns clicks.
- When more stories ship, add a compact “Related stories” row on **Whistler** and **venues** without repeating the hub paragraph.
- Search Console: monitor coverage for `/stories` and guide URLs after deploy.

## Git

Not committed per runbook; operator may commit when ready.
