# HSDJ_SITELINK_ENGINEERING_V1 — Stage FINAL

**Pack ID:** HSDJ_SITELINK_ENGINEERING_V1  
**Repo HEAD at validation:** `edf4aae56c78fd68bfb4b56172c260200a634ef6`

## 1. Problem addressed

Google sitelinks favor URLs that receive **consistent internal links**, **clear anchor text**, and **stable page titles**. The site needed stronger **structural signals** (without new routes or sitemap churn) so primary pages—`/weddings`, `/packages`, `/reviews`, `/about`, `/contact`—read as first-class destinations, with `/vancouver-wedding-dj` and `/venues` as secondary discovery paths.

## 2. Pages promoted (primary)

| Path | Intent |
|------|--------|
| `/weddings` | Wedding DJ Services |
| `/packages` | Wedding DJ Packages |
| `/reviews` | Wedding DJ Reviews |
| `/about` | About Howe Sound DJ |
| `/contact` | Check Availability |

**Secondary (rotational):** `/vancouver-wedding-dj`, `/venues` — linked from the homepage Explore section and the global Explore strip; not added to main nav.

## 3. Anchor standardization summary

Standard in-source phrases for internal links (replacing vague CTAs where they pointed at these routes):

| Route | Anchor text |
|-------|-------------|
| `/weddings` | **Wedding DJ Services** |
| `/packages` | **Wedding DJ Packages** |
| `/reviews` | **Wedding DJ Reviews** |
| `/about` | **About Howe Sound DJ** |
| `/contact` | **Check Availability** (via `CheckAvailabilityTrackedLink` where tracking applies) |

**Header & footer nav** (`site-chrome.tsx`) now use these labels. **Homepage** hero sublinks, CTA rows, and key sections updated. **Weddings, packages, reviews, about, contact, FAQ, vancouver, venues** pages updated for hero/secondary CTAs and inline links. **Venue slug** “Also useful” and CTA rows aligned.

Avoided generic anchors like “Learn more” / “Read more” for these targets (remaining “Full FAQ →” style links stay pointed at `/faq` with explicit FAQ context).

## 4. Title updates (metadata)

| Page | `metadata.title` behavior |
|------|---------------------------|
| `/weddings` | `Squamish Wedding DJ Services` → template **… \| Howe Sound DJ** |
| `/packages` | `Wedding DJ Packages` → **… \| Howe Sound DJ** |
| `/reviews` | `Wedding DJ Reviews` → **… \| Howe Sound DJ** |
| `/about` | **Absolute:** `About Howe Sound DJ \| Squamish Wedding DJ` |
| `/contact` | **Absolute:** `Check Availability \| Howe Sound DJ` |

OpenGraph titles updated to match where applicable.

## 5. Internal linking changes

1. **`src/components/explore-site-links.tsx`**
   - **`HomepageExploreSection`:** “Explore” block **immediately below the hero**, before the video proof section. Six prominent cards: four primary routes + **Check Availability** + **Whistler & Vancouver Weddings**.
   - **`ExploreSiteLinksStrip`:** Repeated **Explore** row **site-wide** in `layout.tsx`, **above** `SiteFooter`, linking primary pages + Check Availability + secondary (`/vancouver-wedding-dj`, `/venues` as “Venue guides”).

2. **`src/app/layout.tsx`** — Renders `ExploreSiteLinksStrip` before the footer on every page.

3. **`src/app/page.tsx`** — Imports and renders `HomepageExploreSection`; hero and section CTAs use standardized anchors.

4. **`src/components/site-chrome.tsx`** — Nav order: **Weddings → Packages → Reviews → About → FAQ → Contact** (labels standardized); mobile menu width increased slightly for longer labels.

## 6. Expected sitelink outcome

Search engines now see:

- Repeated, **descriptive** links to the same core URLs from the homepage, interior pages, and a global strip.
- **Aligned `<title>` / OG titles** with those URL intents.
- **No new routes**, **no sitemap edits**, **no redirect changes**.

Sitelinks are **not guaranteed**; over time, consistent crawling may associate branded queries with these URLs more strongly than thin or rarely linked paths.

## 7. Files touched (summary)

- `src/components/explore-site-links.tsx` (new)
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/components/site-chrome.tsx`
- `src/app/weddings/page.tsx`, `packages/page.tsx`, `reviews/page.tsx`, `about/page.tsx`, `contact/page.tsx`
- `src/app/faq/page.tsx`, `vancouver-wedding-dj/page.tsx`, `venues/page.tsx`, `venues/[slug]/page.tsx`

**Not modified:** `src/app/sitemap.ts`.

## 8. Validation

- `npm run lint` — pass  
- `npm run build` — pass  

## 9. Manual QA

- Scroll homepage: **Explore** cards appear under hero, before “In motion” video.  
- Open any interior page: **Explore** strip appears above footer.  
- Click each primary link; confirm destinations and no layout breakage on mobile (longer nav labels).  

## 10. Non-regression confirmation

This pass did **not** intentionally weaken:

- **Current page architecture** — no route renames or new slugs.  
- **Sitemap integrity** — `sitemap.ts` unchanged.  
- **Conversion flow** — `CheckAvailabilityTrackedLink` preserved; contact still primary CTA.  
- **Canonical live routes** — only metadata strings and internal links; canonical URLs in page metadata unchanged in structure.

## 11. Search Console follow-up

After deploy, monitor **Performance → Pages** and **Links** for growth in internal links to `/weddings`, `/packages`, `/reviews`, `/about`, `/contact`. No special GSC action required for sitelinks; allow recrawl.
