# HSDJ_VENUE_SYSTEM_FOUNDATION_V1 — Stage FINAL

## 1. Goal of venue system

Ship a **production-grade venue SEO and conversion layer**: indexed venue hub and per-venue guides that capture high-intent local searches, reinforce Squamish / Sea-to-Sky authority, and route visitors into the **existing** Check Availability / contact flow—without a blog, CMS, or generic city-page sprawl.

## 2. Architecture chosen and why

- **`/venues`** — Real navigational hub with intro copy, grid of venues, CTAs, and links to `/weddings`, `/packages`, `/faq`, and `/contact#availability`.
- **`/venues/[slug]`** — Dynamic segment with **`generateStaticParams`** so all venue pages are **SSG** (static HTML at build), aligned with Next.js App Router conventions and easy to extend when new venues are appended to the dataset.
- **`src/config/venue-pages.ts`** — Single typed source of truth for full page content (slugs, areas, unique copy blocks, meta descriptions). **`src/config/venues.ts`** re-exports helpers and maps **`VENUES`** for the homepage card list so existing imports stay stable.

This split keeps **maintainability** (add one object → new route + sitemap entry) and avoids thin “name swap” shells by requiring **distinct paragraphs and meta descriptions** per venue.

## 3. Data model introduced or upgraded

**New:** `VenuePage` in `src/config/venue-pages.ts` with:

- Identity: `slug`, `name`, `officialUrl`, `locationLabel`, `area` (`squamish` | `whistler` | `sea-to-sky` | `corridor`), `venueType`
- Listings: `cardDescription`, `shortSummary`
- SEO: `metaDescription` (unique per venue)
- Body: `whyFit`, `planningFocus`, `localExpertise` (arrays of **unique** paragraphs)

**Upgraded:** `VenueEntry` in `src/config/venues.ts` now includes **`slug`**; **`VENUES`** is derived from **`VENUE_PAGES`** so homepage and hub stay in sync.

Helpers: `getVenueBySlug`, `getAllVenueSlugs`.

## 4. Routes created

| Route | Purpose |
|-------|---------|
| `/venues` | Index hub (`src/app/venues/page.tsx`) |
| `/venues/[slug]` | One page per venue (`src/app/venues/[slug]/page.tsx`), 16 static paths at build |

## 5. Metadata strategy

- **Hub:** Unique title and description; `canonical: /venues`; OG/Twitter aligned with root (`/og-share.jpg`).
- **Detail:** `generateMetadata` per slug: unique title pattern `Wedding DJ for {name} · {locationLabel}`, unique `metaDescription`, `canonical: /venues/{slug}`, `openGraph.type: article`, Twitter card matching site defaults.

Titles flow through the root **`metadataBase`** and layout title template where applicable.

## 6. Schema strategy

Extended **`src/lib/json-ld.ts`** (reused `JsonLd` component):

- **`venuesHubBreadcrumbJsonLd`** — Home → Wedding venues (`/venues`).
- **`venueDetailBreadcrumbJsonLd`** — Home → Venues → Venue name.
- **`venueWeddingDjServiceJsonLd`** — `Service` with `provider` pointing at existing `Organization` `@id`, `areaServed` as `Place`, **no** ratings, ownership, or fake reviews.

## 7. Internal linking strategy

- **Homepage** venue section: primary **internal** link on venue name to `/venues/{slug}`; secondary **official website** link; paragraph with link to **`/venues`** hub.
- **Footer** (not header): **`Venues`** link alongside existing nav links—avoids crowding primary nav.
- **`/weddings`:** Short paragraph with link to **`/venues`** between highlights and “What’s included”.
- **`/faq`:** “Still deciding?” section links to **`/venues`** for venue-specific planning context.
- **Venue detail pages:** Required links to `/contact` (via tracked CTAs), `/weddings`, `/packages`, `/faq`, `/venues`, plus external official URL where relevant.

## 8. Files touched

| File | Role |
|------|------|
| `src/config/venue-pages.ts` | **New** — full venue dataset + helpers |
| `src/config/venues.ts` | Re-exports; `VENUES` derived; `VenueEntry` + `slug` |
| `src/lib/json-ld.ts` | Hub + detail breadcrumbs; `Service` JSON-LD for venue pages |
| `src/app/venues/page.tsx` | **New** — hub |
| `src/app/venues/[slug]/page.tsx` | **New** — detail + `generateMetadata` + `generateStaticParams` |
| `src/app/sitemap.ts` | `/venues` + all `/venues/[slug]` |
| `src/app/page.tsx` | Venue cards + hub link |
| `src/app/weddings/page.tsx` | Link to `/venues` |
| `src/app/faq/page.tsx` | Link to `/venues` |
| `src/components/site-chrome.tsx` | Footer `Venues` link |
| `src/components/check-availability-tracked-link.tsx` | Surfaces: `venues_hub`, `venue_hero`, `venue_page_cta` |

## 9. Validation results

- `npm run lint` — **PASS**
- `npm run build` — **PASS** (32 static routes including 16 venue slugs + hub)

## 10. Non-regression confirmation

This pass did **not** weaken:

- **Check Availability funnel** — Same `/contact` and `/contact#availability` paths; CTAs use existing **`CheckAvailabilityTrackedLink`** with new surface labels only where venue pages fire events.
- **Wedding-only positioning** — Copy stays wedding- and reception-focused; no generic “event DJ” dilution.
- **Squamish / Sea-to-Sky local authority** — Hub and guides explicitly tie to corridor planning; no fake venue partnerships.
- **Analytics instrumentation** — Extended **`CheckAvailabilitySurface`** only; **`trackEvent`** / GA guards unchanged.
- **Existing core page contracts** — No edits to API routes, contact form logic, or core commercial routes beyond additive links and sitemap entries.

## 11. Next recommended expansion path

1. **Expand the dataset** — Add venues by copying the `VenuePage` shape; run build to regenerate static paths and sitemap.
2. **Optional media** — If real photography or venue-specific assets exist later, add optional `imageSrc` / `ogImage` fields and wire through `ImageSlot` or OG overrides without changing URL shape.
3. **Search Console** — Monitor indexing for `/venues` and top venue URLs; watch engagement to `/contact`.
4. **IA decision** — If traffic merits it, consider a **Weddings** submenu or header link to `/venues`; until then footer + contextual links keep the header clean.

---

**Re-run verification (bounded):**

```bash
cd ~/Desktop/howesounddj || exit 1
git rev-parse HEAD
git log -1 --oneline
rg -n "venues" src/app src/config src/components src/lib --type ts --type tsx
rg -n "generateMetadata|metadata|canonical|openGraph|twitter" src/app/venues src/lib --type ts --type tsx
rg -n "Breadcrumb|JsonLd|venueWeddingDjServiceJsonLd|venuesHub" src/app/venues src/lib src/components --type ts --type tsx
rg -n 'href="/venues|href="/contact|href="/weddings|href="/packages|href="/faq"' src/app/venues src/app src/components --type tsx
npm run lint
npm run build
```
