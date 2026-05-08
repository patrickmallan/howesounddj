# HSDJ Authority Density Batch 1 — Implementation Report

**Date:** 2026-05-08  
**Scope:** Venue guide expansion, primary nav IA, planning guides system, first long-form article, internal links, sitemap and schema helpers. No API, analytics, or dependency changes.

---

## Executive summary

Batch 1 adds **two strategy-named venue guides** (North Arm Farm, Brew Creek), promotes **Venues** to the **primary header navigation**, introduces a **`/guides` hub** with the first article on **Sea-to-Sky dance floor pacing** using the proprietary **Roomflow Method** framework, and wires **sitemap**, **Article + Breadcrumb JSON-LD**, **conditional footer CTA suppression**, and **light internal links** from home explore, weddings, FAQ (planning section), and venues hub. Venue detail pages now include **Reviews**, **Planning guides**, and **Contact** in the shared “Also useful” block.

Copy stays **planning-forward and honest**: no claim that Howe Sound DJ has worked a specific event at North Arm Farm or Brew Creek; language matches other guides (“when you are planning around…”, “if this is your venue…”).

Validation: **`npx tsc --noEmit`**, **`npm run lint`**, and **`npm run build`** all pass (Next.js 16.2.3, 38 static routes including 20 venue slugs and 2 guide routes).

---

## Files changed

| File | Change |
| ---- | ------ |
| `src/config/venue-pages.ts` | Added `north-arm-farm` and `brew-creek` entries (full `VenuePage` shape). |
| `src/components/site-chrome.tsx` | Inserted **Venues** in `navLinks`; footer now links **Wedding Planning Guides** (removed duplicate Venues footer link because Venues is in `navLinks`). |
| `src/app/sitemap.ts` | Added `/guides` and `/guides/how-to-keep-a-wedding-dance-floor-packed`. |
| `src/lib/json-ld.ts` | Added `guidesHubBreadcrumbJsonLd`, `guideArticleBreadcrumbJsonLd`, `guideArticleJsonLd`. |
| `src/components/conditional-site-final-decision-zone.tsx` | Omitted global finale on `/guides` and `/guides/*`. |
| `src/app/venues/[slug]/page.tsx` | Extended “Also useful” with Reviews, Planning guides, Contact. |
| `src/components/explore-site-links.tsx` | Short paragraph + link to `/guides` under Explore grid. |
| `src/app/weddings/page.tsx` | One paragraph linking to the dance floor guide. |
| `src/app/faq/page.tsx` | Planning group: extra line linking to the dance floor guide. |
| `src/app/venues/page.tsx` | Browse intro links to `/guides`. |
| `src/app/guides/page.tsx` | **New** hub page. |
| `src/app/guides/how-to-keep-a-wedding-dance-floor-packed/page.tsx` | **New** article page. |
| `docs/HSDJ_AUTHORITY_DENSITY_BATCH_1_REPORT.md` | **New** this report. |

---

## Routes added

| Route | Description |
| ----- | ----------- |
| `/guides` | Planning guides index (lists current articles). |
| `/guides/how-to-keep-a-wedding-dance-floor-packed` | First authority article + CTAs. |
| `/venues/north-arm-farm` | SSG via existing `venues/[slug]` template. |
| `/venues/brew-creek` | SSG via existing `venues/[slug]` template. |

---

## Venue pages added

| Slug | Display name | Official URL used |
| ---- | ------------ | ----------------- |
| `north-arm-farm` | North Arm Farm | `https://www.northarmfarm.com/` |
| `brew-creek` | Brew Creek | `https://www.thebrewcreekcentre.com/` |

**SEO note:** Page titles follow the existing dynamic pattern (`Wedding DJ for {name} · {location}` + site template), not a custom pipe-separated title string, to stay consistent with the rest of the venue cluster.

---

## Guide system added

- **Hub:** `/guides` with metadata title **Wedding Planning Guides**, scalable list array for future posts.
- **Article:** Full structured sections, internal links to `/weddings`, `/packages`, `/reviews`, `/venues`, `/venues/sea-to-sky-gondola`, `/venues/sunwolf`, `/contact`, and `/guides`.
- **Schema:** BreadcrumbList on both hub and article; Article JSON-LD on the guide (author/publisher point at sitewide Organization id).

---

## SEO rationale

- **Venues:** Named venue + location intent (Pemberton / Whistler area) without fabricated operational detail; unique `metaDescription` and body sections per existing model.
- **Article:** Targets dance floor and mountain reception intent with explicit Sea-to-Sky, Squamish, and Whistler language and internal links into services, venues, and proof.
- **Sitemap:** New URLs enumerated explicitly alongside venue slugs from config.

---

## Internal linking rationale

- **Home Explore:** One supportive line so guides are discoverable without crowding the tile grid.
- **Weddings / FAQ / Venues hub:** Natural planning context only; no footer or header spam.
- **Venue template:** Centralizes Reviews, guides, and Contact for every venue guide (including the two new ones) without per-slug duplication in config.

---

## Brand positioning rationale

- Language emphasizes **Sea-to-Sky wedding atmosphere**, **ceremony-to-dance-floor arc**, **room-reading**, **guest momentum**, and **planning clarity**.
- Avoids commodity DJ phrasing; **Roomflow Method** frames proprietary thinking.
- **No em dashes** in new copy (per brief).

---

## Validation results

| Check | Result |
| ----- | ------ |
| `npx tsc --noEmit` | Pass |
| `npm run lint` | Pass |
| `npm run build` | Pass (38 routes; 20 venue SSG paths) |
| `rg` bounded string check | Matches present under `src/` and strategy docs as expected |

---

## Recommended next batch

1. **Second and third guides** (e.g. choosing a DJ in Squamish, reception timeline tips) using the same hub list pattern.  
2. **Featured wedding** template route (one story) with links into relevant venue guides.  
3. **Venue-tagged testimonial** snippets on select `/venues/[slug]` pages (data-driven, still honest).  
4. **Optional** `venue_page_view` or `guide_view` analytics when you explicitly open an analytics change batch.  
5. **Whistler pillar** page or filtered hub section if you want a single URL for “Whistler wedding DJ” cluster intent.

---

## No-change confirmation (out of scope for this batch)

- No changes to `/api/*`, Turnstile, or form handlers.  
- No new npm packages.  
- No edits to `src/lib/analytics.ts` or tracking components.  
- No redesign of global styles or hero systems.
