# HSDJ_LEGACY_SITELINK_REDIRECTS_V3 — Stage FINAL

**Pack ID:** HSDJ_LEGACY_SITELINK_REDIRECTS_V3  
**Repo HEAD at validation:** `5c6a81cac18fac597865e935b3b108dc085baca3`

## 1. Problem addressed

Additional legacy Google sitelinks still pointed at exact historical paths that return **404** on the current site. This pass adds **explicit permanent redirects** so those URLs resolve to the intended live routes in one hop, without wildcards or sitemap changes.

## 2. Exact legacy URLs confirmed by live testing

| Legacy path | Target live route |
|-------------|-------------------|
| `/about-howe-sound-wedding-dj` | `/about` |
| `/dj-packages` | `/packages` |
| `/whistler-dj-services` | `/weddings` |

Each path is also covered **with a trailing slash** so both URL forms redirect cleanly.

**Note:** These are distinct from earlier V1/V2 rules (e.g. `/whistler-wedding-dj-services` vs `/whistler-dj-services`); no conflicting mappings were removed—only new rows were added.

## 3. Redirect mappings implemented

| Source | Destination |
|--------|-------------|
| `/about-howe-sound-wedding-dj` | `/about` |
| `/about-howe-sound-wedding-dj/` | `/about` |
| `/dj-packages` | `/packages` |
| `/dj-packages/` | `/packages` |
| `/whistler-dj-services` | `/weddings` |
| `/whistler-dj-services/` | `/weddings` |

All use `permanent: true` (Next.js **308**). Prior V1/V2 redirects remain in the same `redirects()` array.

## 4. Files touched

- `next.config.ts` — six new redirect entries.

**Not modified:** `src/app/sitemap.ts`.

## 5. Validation results

| Check | Result |
|-------|--------|
| `rg` for V3 paths in `next.config.ts` | Present |
| `npm run lint` | Pass |
| `npm run build` | Pass |

## 6. Manual QA notes

After deploy, verify in browser:

1. `/about-howe-sound-wedding-dj` and `/about-howe-sound-wedding-dj/` → single redirect → `/about` (200).  
2. `/dj-packages` and `/dj-packages/` → `/packages` (200).  
3. `/whistler-dj-services` and `/whistler-dj-services/` → `/weddings` (200).  
4. Spot-check earlier legacy URLs (e.g. `/squamish-dj-services`, `/whistler-wedding-dj-services`) still behave as before.  
5. No redirect loops.

## 7. Non-regression confirmation

This pass did **not** weaken:

- **Current page architecture** — no new pages, no renames of live slugs.  
- **Sitemap integrity** — `sitemap.ts` unchanged.  
- **Conversion flow** — targets remain primary intent pages (`/about`, `/packages`, `/weddings`), not a blanket homepage redirect.  
- **Canonical live routes** — only additive redirects in `next.config.ts`.

## 8. Search Console follow-up recommendation

After deploy, use **URL Inspection** on each legacy URL to confirm **308** to the correct destination. Allow recrawl time for sitelinks to update; no sitemap edit required for legacy paths.

## Success condition

The three exact legacy bases above (plus trailing-slash variants) now resolve via **permanent redirect** to **`/about`**, **`/packages`**, or **`/weddings`** instead of **404**.
