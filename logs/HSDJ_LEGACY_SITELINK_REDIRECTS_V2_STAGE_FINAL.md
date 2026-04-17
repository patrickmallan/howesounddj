# HSDJ_LEGACY_SITELINK_REDIRECTS_V2 — Stage FINAL

**Pack ID:** HSDJ_LEGACY_SITELINK_REDIRECTS_V2  
**Repo HEAD at validation:** `54e8a93b7bb7380612fcbf2b4f53ba87ee3b79f5`

## 1. Problem addressed

Additional legacy Google sitelinks still pointed at URLs that no longer exist on the current Next.js site, producing **404** for labels such as “A little About Me,” “Wedding DJ Packages in …,” and “Whistler Wedding DJ Services.” This pass adds **explicit permanent redirects** so those paths resolve to the closest live pages without chains or homepage-only fallbacks.

## 2. Legacy URLs added in this pass

| Legacy path | Sitelink intent (from scope) |
|-------------|-------------------------------|
| `/a-little-about-me` | “A little About Me” → about |
| `/wedding-dj-packages-in-squamish` | “Wedding DJ Packages in …” (Squamish) → packages |
| `/whistler-wedding-dj-services` | “Whistler Wedding DJ Services” → wedding DJ hub |

**Packages slug:** The pack specified **`/wedding-dj-packages-in-squamish`** as the source; no alternate slug was required—repository search did not surface a conflicting canonical legacy path.

## 3. Redirect mappings implemented

| Source | Destination |
|--------|-------------|
| `/a-little-about-me` | `/about` |
| `/a-little-about-me/` | `/about` |
| `/wedding-dj-packages-in-squamish` | `/packages` |
| `/wedding-dj-packages-in-squamish/` | `/packages` |
| `/whistler-wedding-dj-services` | `/weddings` |
| `/whistler-wedding-dj-services/` | `/weddings` |

**Retained from V1** (same file, no chains):

| Source | Destination |
|--------|-------------|
| `/squamish-dj-services` | `/weddings` |
| `/squamish-dj-services/` | `/weddings` |

All use `permanent: true` (Next.js **308** Permanent Redirect). Trailing-slash variants avoid duplicate 404s.

## 4. Files touched

- `next.config.ts` — extended `redirects()` array only.

**Not modified:** `src/app/sitemap.ts` (per scope).

## 5. Validation results

| Check | Result |
|-------|--------|
| `rg` for legacy paths in `next.config.ts` | All six new sources + V1 pair present |
| `npm run lint` | Pass |
| `npm run build` | Pass |

## 6. Manual QA notes

**Run in browser after deploy:**

1. `/a-little-about-me` and `/a-little-about-me/` → `/about` (200).  
2. `/wedding-dj-packages-in-squamish` and trailing slash → `/packages` (200).  
3. `/whistler-wedding-dj-services` and trailing slash → `/weddings` (200).  
4. `/squamish-dj-services` still → `/weddings`.  
5. No redirect loops; each legacy URL is a **single hop** to the final path.

## 7. Non-regression confirmation

This pass did **not** weaken:

- **Current page architecture** — no new pages, no slug changes on live routes.  
- **Sitemap integrity** — `sitemap.ts` unchanged; canonical URLs unchanged.  
- **Conversion flow** — destinations are primary intent pages (`/about`, `/packages`, `/weddings`), not a blanket homepage redirect.  
- **Canonical live routes** — no middleware or metadata edits; only additive redirects.

## 8. Search Console follow-up recommendation

After deploy, use **URL Inspection** on each legacy URL to confirm Google receives **308** to the target. Allow recrawl time for sitelinks to refresh; request indexing on destination URLs if needed. No sitemap change required for legacy URLs.

## Success condition

The listed legacy paths now resolve via **permanent redirect** to **`/about`**, **`/packages`**, or **`/weddings`** instead of **404**, alongside the existing **`/squamish-dj-services`** rule.
