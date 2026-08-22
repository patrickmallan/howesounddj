# HSI GA4 Measurement Accreditation — Production

**Tranche:** `HSI_GA4_PAGE_VIEW_MEASUREMENT_REPAIR` + architecture continuity  
**Accredited:** 2026-08-18T04:03:37Z  
**Verdict:** `PASS_HSO_GA4_PAGE_VIEW_MEASUREMENT_DEPLOYED_AND_VERIFIED`  
**Architecture continuity:** `DIRECT_GTAG_GA4_ARCHITECTURE_ACCEPTED_NO_GTM_REQUIRED`  
**Production:** https://www.howesounddj.com  
**GA4 measurement ID:** `G-J8FSC9QGQE`  
**GA4 property ID (HSI Data API):** `491575411`

---

## Summary

Production GA4 measurement is **accredited**. Direct gtag integration (no Google Tag Manager) is the accepted architecture. Future audits should not reopen GTM unless marketing/tag-management requirements materially change.

Machine-readable harness output: `logs/ga4-production-accreditation-2026-08-18.json`  
Re-run: `node scripts/ga4-production-accreditation.mjs`

---

## Production behavioral proof (Playwright harness)

| Check | Result | Evidence |
|-------|--------|----------|
| Fresh load → 1× `page_view` | **PASS** | `page_path: /` |
| Client nav → 1× additional `page_view` | **PASS** | `/` → `/about` |
| Second nav → 1× additional `page_view` | **PASS** | `/about` → `/contact` |
| Path accuracy (pillar) | **PASS** | `/vancouver-wedding-dj` |
| `book_consult_click` fires once | **PASS** | `surface`, `intent`, `funnel_context`, `provider`, `booking_purpose` |
| `check_availability_click` fires once | **PASS** | `surface: header_cta`, `destination: header_panel` |
| `contact_form_start` fires once | **PASS** | `surface: contact_page_secondary`, `form_type: inquiry_secondary` |
| No runaway duplicate `page_view` | **PASS** | Session navigations did not multiply page views |
| Architecture | **PASS** | No GTM container; single gtag script; `send_page_view: false` |

### Conversion event parameter contract (verified)

**`book_consult_click`**

```json
{
  "surface": "hero",
  "intent": "direct_consult",
  "funnel_context": "homepage",
  "page_path": "/",
  "provider": "calendly",
  "booking_purpose": "sound_check"
}
```

**`check_availability_click`**

```json
{
  "surface": "header_cta",
  "destination": "header_panel",
  "page_path": "/contact"
}
```

**`contact_form_start`**

```json
{
  "surface": "contact_page_secondary",
  "form_type": "inquiry_secondary",
  "status": "start",
  "page_path": "/contact"
}
```

---

## Consent / ad-block posture

| Topic | Finding |
|-------|---------|
| Consent banner | **Not installed** — GA loads unconditionally today |
| GTM container | **Not installed** — no second tag path |
| Duplicate gtag scripts | **1** — no double-bootstrap |
| Ad-block behavior | Blocking `googletagmanager.com` / `google-analytics.com` prevents hits reaching Google → **undercount**, not duplicate inflation |
| Future consent | If a banner is added, it must **gate** GA loading — not stack consent mode on top of unconditional gtag |

---

## HSI GA4 Data API reconciliation

| Check | Result | Notes |
|-------|--------|-------|
| `hsdj-seo ga4-check` | **PASS** | `properties/491575411 (AUTHORIZED_WITH_DATA)` |
| `hsdj-seo ga4-pull --range 28d` | **PASS (connectivity)** | API returns rows for property |
| Pre-repair era in API | **Confirmed impaired** | `screenPageViews: 0` across 28d window ending 2026-08-14 despite sessions |
| Post-accreditation `page_view` in API | **Pending lag** | Re-pull after 24–48h; trustworthy era begins 2026-08-18T04:03:37Z |

Pre-repair and post-repair GA4 populations **must not** be compared without era segmentation. See `HSDJ_SEO_Intelligence/data/operational/measurement/ga4_measurement_era.v1.json`.

---

## Architecture decision (protected continuity)

**`DIRECT_GTAG_GA4_ARCHITECTURE_ACCEPTED_NO_GTM_REQUIRED`**

- GA4 is implemented in-repo via `src/components/google-analytics.tsx` + `src/lib/analytics.ts`
- HSI reads GA4 through the Data API — GTM adds no value for current instrumentation
- Do **not** add GTM without removing in-code gtag (double-count risk)
- Revisit GTM only if non-developers need frequent third-party pixel changes without deploys

Canonical continuity record: `HSDJ_SEO_Intelligence/data/operational/measurement/direct_gtag_ga4_architecture.v1.json`

---

## Follow-up (non-blocking)

1. **2026-08-20** — Re-run `hsdj-seo ga4-pull --range 7d` and confirm `page_view` + `screenPageViews` > 0 in post-repair window
2. Mark `contact_form_submit_success` as GA4 conversion in UI if not already done (see `docs/LAUNCH_CHECKLIST.md`)
