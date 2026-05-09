# Handoff: Squamish wedding DJ pillar page

## Files inspected (for patterns and linking)

- `src/app/layout.tsx` (metadataBase / canonical resolution)
- `src/app/whistler-wedding-dj/page.tsx`
- `src/app/vancouver-wedding-dj/page.tsx`
- `src/components/site-chrome.tsx`
- `src/app/sitemap.ts`
- `src/lib/json-ld.ts`
- `src/config/venue-pages.ts` (read-only; venue list for pillar cards filtered in-page)
- `src/app/page.tsx`, `src/app/weddings/page.tsx`, `src/app/venues/page.tsx`, `src/app/venues/[slug]/page.tsx`, `src/app/guides/page.tsx`, `src/app/stories/page.tsx`

## Files changed

| File | Change |
|------|--------|
| `src/app/squamish-wedding-dj/page.tsx` | **New** pillar route: hero, why local, Vancouver couples, venue ecosystem, Atmosphere Arc / Roomflow, proof strip, image slot, related planning, finale CTA; metadata + JSON-LD breadcrumb |
| `src/app/sitemap.ts` | Added `/squamish-wedding-dj` |
| `src/lib/json-ld.ts` | Added `squamishWeddingDjBreadcrumbJsonLd()` |
| `src/components/site-chrome.tsx` | Sea-to-Sky nav: Squamish → `/squamish-wedding-dj` (before Whistler/Vancouver); footer via `footerLabel: "Squamish Wedding DJ"` |
| `src/app/page.tsx` | Internal link from venue familiarity section |
| `src/app/weddings/page.tsx` | Squamish pillar + guide ordering in hero supporting copy |
| `src/app/venues/page.tsx` | Squamish pillar sentence before Whistler pillar |
| `src/app/venues/[slug]/page.tsx` | “Also useful”: Squamish pillar for `area === "squamish"` or `sea-to-sky-gondola` / `sunwolf` |
| `src/app/whistler-wedding-dj/page.tsx` | Cross-link when the wedding is Squamish-first |
| `src/app/vancouver-wedding-dj/page.tsx` | `Link` import + Squamish pillar paragraph under “Where this lands” |
| `src/app/guides/page.tsx` | Related-planning paragraph: Squamish pillar |
| `src/app/stories/page.tsx` | Related paragraph: Squamish pillar |

## Route

- **Path:** `/squamish-wedding-dj`
- **File:** `src/app/squamish-wedding-dj/page.tsx`

## Sitemap

- `src/app/sitemap.ts` includes `https://www.howesounddj.com/squamish-wedding-dj` (via `base + path`).

## Navigation

- **Desktop / mobile:** Under **Sea-to-Sky**, order is Venues → **Squamish** (description: “Local wedding DJ support for Squamish celebrations.”) → Whistler → Vancouver.
- **Footer:** Flattened link **Squamish Wedding DJ** → `/squamish-wedding-dj`.

## Internal links added (natural placements)

- Home (`page.tsx`): venue section copy
- Weddings: hero supporting links
- Venues hub: intro paragraph
- Venue detail: “Also useful” when Squamish-local or listed Squamish-adjacent slugs
- Whistler pillar: venue hub footnote
- Vancouver pillar: “Where this lands”
- Guides hub: related paragraph
- Stories hub: related paragraph

## Metadata and canonical

- **title:** `Squamish Wedding DJ` (template → `Squamish Wedding DJ | Howe Sound DJ`)
- **description:** Unique pillar description in `page.tsx`
- **alternates.canonical:** `/squamish-wedding-dj` → resolves to **https://www.howesounddj.com/squamish-wedding-dj** via `metadataBase` in `src/app/layout.tsx`
- **openGraph:** `title`, `description`, `url: "/squamish-wedding-dj"`, `type: "website"`
- **twitter:** card, title, description, `/og-share.jpg`
- **Structured data:** `BreadcrumbList` via `squamishWeddingDjBreadcrumbJsonLd()` (full URLs use `SITE_ORIGIN` in `src/lib/json-ld.ts`)

## Validation results (2026-05-09)

Commands run from repo root:

```text
npx tsc --noEmit   # exit 0
npx eslint .       # exit 0
npm run build      # exit 0; route list includes ○ /squamish-wedding-dj
```

## Manual QA checklist

- [ ] `/squamish-wedding-dj` loads and matches intended sections and tone
- [ ] View source or devtools: canonical is `https://www.howesounddj.com/squamish-wedding-dj`
- [ ] Header **Sea-to-Sky** dropdown lists Squamish before Whistler and Vancouver
- [ ] Footer includes **Squamish Wedding DJ**
- [ ] `sitemap.xml` contains the new URL
- [ ] Mobile menu: Sea-to-Sky accordion shows Squamish with supporting line
- [ ] Hero and finale **Book a Consult** / **Check Availability** behave like other pillars (same `CTADuo` surfaces)
- [ ] Production build passes (see validation above)

## Git

- No commit was made as part of this task (per instructions).
