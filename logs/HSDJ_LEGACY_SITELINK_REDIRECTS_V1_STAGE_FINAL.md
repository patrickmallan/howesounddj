# HSDJ_LEGACY_SITELINK_REDIRECTS_V1 — Stage FINAL

**Pack ID:** HSDJ_LEGACY_SITELINK_REDIRECTS_V1  
**Repo HEAD at validation:** `4c4d0c1119669fe4ad4b4436560a4f342e16b881` (with local changes through this pass)

## 1. Problem addressed

Google was surfacing a legacy sitelink **`/squamish-dj-services`** that no longer exists in the current Next.js app, so users hit **404** instead of a relevant wedding-DJ page. The goal was to add **deterministic permanent redirects** to the closest live URL so sitelinks preserve trust, SEO equity, and conversion paths.

## 2. Legacy URLs identified

| Legacy path | Evidence |
|-------------|----------|
| `/squamish-dj-services` | Called out in pack scope as a broken sitelink (404). |

Repository search (`src`, `public`, `docs`, `logs`) did not surface additional historical slugs worth redirecting without guessing. No extra legacy paths were added in this pass.

## 3. Redirect mapping implemented

| Source | Destination | Rationale |
|--------|-------------|-----------|
| `/squamish-dj-services` | `/weddings` | General Squamish/wedding DJ “services” intent → primary wedding services hub. |
| `/squamish-dj-services/` | `/weddings` | Same target; avoids duplicate 404 for trailing slash. |

- **Permanent:** `permanent: true` (Next.js issues **308** Permanent Redirect).  
- **No chains:** single hop to final URL.  
- **No wildcards:** explicit paths only.

Mapping rules from scope (for future additions): service-style → `/weddings`; packages → `/packages`; about → `/about`; reviews → `/reviews`; FAQ → `/faq`; contact → `/contact`.

## 4. Files touched

- `next.config.ts` — `redirects()` with the rules above.

Sitemap (`src/app/sitemap.ts`) was **not** modified: legacy URLs are not listed as canonical destinations; redirects handle inbound links only.

## 5. Validation results

| Check | Result |
|-------|--------|
| `rg` for `squamish-dj-services` / `redirects` | Rules present in `next.config.ts` |
| `npm run lint` | Pass |
| `npm run build` | Pass (run after edit) |

## 6. Manual QA notes

**Not run in this environment** (no browser). Recommended:

1. Open `/squamish-dj-services` and `/squamish-dj-services/` — expect **308** (or browser-normalized permanent redirect) to **`/weddings`** with **200** on destination.  
2. Confirm **no loop** and **no double redirect** (one hop).  
3. Spot-check live routes: `/`, `/weddings`, `/packages`, `/contact`, `/venues/...` unchanged.  
4. After deploy, use **URL Inspection** / **Removals** only as needed; prefer letting Google recrawl redirected URLs.

## 7. Non-regression confirmation

This pass did **not** intend to:

- Change **current page architecture** or live slugs.  
- Remove or alter **sitemap** entries (sitemap file unchanged).  
- Add **temporary** redirects or **redirect chains**.  
- Weaken **canonical** behavior on existing routes (no middleware stripping; Next config redirects are additive).

## 8. Recommended follow-up in Search Console

1. After deploy, **request indexing** for `https://www.howesounddj.com/weddings` if needed.  
2. Use **URL Inspection** on `https://www.howesounddj.com/squamish-dj-services` to confirm Google sees the **308** to `/weddings`.  
3. Over time, sitelinks should update as Google recrawls; no need to redirect the homepage.  
4. If new broken sitelinks appear, add **explicit** rows to `redirects()` using the same mapping rules—avoid wildcards unless clearly safe.

## Success condition

**`/squamish-dj-services`** (with or without trailing slash) now resolves via **permanent redirect** to **`/weddings`** instead of **404**, matching the pack goal for known broken sitelinks.
