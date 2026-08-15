# HSI GA4 Page-View Measurement Repair

**Tranche:** `HSI_GA4_PAGE_VIEW_MEASUREMENT_REPAIR`  
**Status:** `PENDING_PRODUCTION_VERIFICATION`  
**Target verdict:** `PASS_HSO_GA4_PAGE_VIEW_MEASUREMENT_DEPLOYED_AND_VERIFIED`  
**Authorization:** Operator — proceed now (not gated on P01)  
**Implemented:** 2026-08-15  
**Deployed:** _pending_

---

## Defect

GA4 collected some custom events but **no reliable `page_view` data** because:

1. gtag bootstrap set `send_page_view: false`
2. Route changes called `gtag('config', id, { page_path })` — which **does not** emit `page_view` when automatic page views are disabled

Observed symptom: **32 GSC clicks vs 3 GA4 sessions and 0 screen page views** (P02 diagnosis window).

---

## Fix (measurement-only)

| File | Change |
|------|--------|
| `src/lib/analytics.ts` | Add `trackPageView()` — explicit `gtag('event', 'page_view', …)` |
| `src/components/google-analytics.tsx` | Call `trackPageView(pathname)` on load + navigations |
| `tests/ga4-page-view-measurement.test.ts` | Assert `page_view` event shape |

**Unchanged:** `send_page_view: false` on bootstrap (prevents double-count on first load; explicit events own page views).

---

## Scope boundary (honored)

Does **not** alter:

- Page content, SEO packaging, titles/meta
- P01 internal-link treatment
- P02 frozen SERP copy
- Navigation, CTAs, conversion design

---

## Production validation (operator)

Full protocol: `HSDJ_SEO_Intelligence/logs/HSI_GA4_PAGE_VIEW_MEASUREMENT_PRODUCTION_VERIFICATION.md`

| # | Check |
|---|-------|
| 1 | Fresh load → exactly **one** `page_view` |
| 2 | Client nav → exactly **one additional** `page_view` |
| 3 | `page_path` matches URL |
| 4 | Multi-page nav → no double-count |
| 5 | Events under intended GA4 property |
| 6 | `session_start`, `scroll`, `user_engagement` intact |

On pass: record deployment timestamp (UTC) as start of **trustworthy GA4 measurement era**. Pre-repair GA4 is not comparable.

Historical data is **not** backfilled; clean accumulation starts at deploy.
