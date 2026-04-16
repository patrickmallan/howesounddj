# HSDJ Remediation — Stage FINAL (Batch 04)

## 1. Pack ID

**`HSDJ_BATCH_04_P5_P6_META_ANALYTICS`**

## 2. Scope executed

Closed all OPEN findings from **`logs/hsdj_opus_repo_intelligence_report.md`** in the **P5** (metadata / differentiation) and **P6** (analytics) tiers in one pass:

- **P5-1** — Vancouver page Twitter card image aligned to site-wide raster OG asset.
- **P5-2** — Packages page internal link to `/faq` (page contract).
- **P5-3** — Root layout OG image `alt` uses wedding positioning wording.
- **P6-1** — `contact_form_submit_attempt` fires at the start of the submit handler, before Turnstile validation; errors include `status: "error"` after attempt.
- **P6-2** — `calendly_click` event added and wired to both Calendly outbound links on `/contact`.
- **P6-3** — Form funnel events include `surface`, `form_type`, and `status` (plus existing `reason` on errors).

**Out of scope (honored):** P0–P4 batches, new features not in **`$R`**, layout redesign.

## 3. Evidence sections from `$R`

| `$R` section | Use |
|--------------|-----|
| P3+ defect register | P5-1, P5-2, P5-3, P6-1, P6-2, P6-3 definitions and file anchors |
| Analytics contract audit | Event naming, Calendly N/A → now tracked |
| Recommended remediations | Consolidated P5/P6 actions |

**Scan contract:** `docs/HSDJ OPUS SCAN.txt` — D1, D2, page contract for `/packages`, non-regression invariants.

## 4. Finding status table

| ID | Status |
|----|--------|
| **P5-1** | **DONE** — `twitter.images` uses `/og-share.jpg` in `src/app/vancouver-wedding-dj/page.tsx` |
| **P5-2** | **DONE** — `Link` to `/faq` in pricing block in `src/app/packages/page.tsx` |
| **P5-3** | **DONE** — OG `alt` updated in `src/app/layout.tsx` |
| **P6-1** | **DONE** — Attempt fires first; Turnstile error follows with enriched params |
| **P6-2** | **DONE** — `ANALYTICS_EVENTS.calendlyClick` + `onClick` on both Calendly `<a>` |
| **P6-3** | **DONE** — Attempt / success / error include `surface`, `form_type`, `status` |

## 5. Files touched

| File | Role |
|------|------|
| `src/app/layout.tsx` | P5-3 OG alt text |
| `src/app/vancouver-wedding-dj/page.tsx` | P5-1 Twitter images |
| `src/app/packages/page.tsx` | P5-2 FAQ internal link |
| `src/lib/analytics.ts` | P6-2 `calendly_click` constant |
| `src/components/contact-availability-form.tsx` | P6-1, P6-2, P6-3 analytics behavior |

## 6. Exact change descriptions

**P5-1:** `metadata.twitter.images` changed from `["/og-default.svg"]` to `["/og-share.jpg"]` to match `layout.tsx` raster usage and avoid SVG social-preview gaps.

**P5-2:** Imported `next/link`; added a short line under the “Pricing & availability” copy with **See our FAQ** → `/faq` and supporting text.

**P5-3:** `openGraph.images[0].alt` changed from `Howe Sound Event DJ wedding dance floor` to **`Howe Sound Wedding DJ dance floor`**.

**P6-1:** `submitInquiry` now calls `contact_form_submit_attempt` immediately after `preventDefault` / `setFieldErrors({})`, with `{ surface: "contact_form", form_type: "inquiry", status: "attempt" }`, then runs Turnstile gate; `turnstile_pending` error includes matching `surface` / `form_type` / `status: "error"` / `reason`.

**P6-2:** Added `calendlyClick: "calendly_click"` to `ANALYTICS_EVENTS`; `trackCalendlyClick()` calls `trackEvent` with `{ surface: "contact_form" }` on both “Book a Consult” links (unavailable + available states).

**P6-3:** Shared `FORM_ANALYTICS` base; all form `trackEvent` calls spread `FORM_ANALYTICS` and add `status` (`attempt` | `success` | `error`); errors retain `reason` where applicable.

## 7. Validation results

| Check | Result |
|-------|--------|
| `npm run lint` | **PASS** |
| `npm run build` | **PASS** (Next.js 16.2.3) |

## 8. Non-regression confirmation

This batch **did not**:

- Remove or weaken the **Check Availability** path — `site-chrome` unchanged; contact form and CTAs unchanged in behavior except analytics ordering/enrichment.
- Change **wedding-first** positioning — copy edits are metadata/FAQ link/analytics only; no broad homepage or service rewrites.
- Dilute **Squamish / Sea-to-Sky** relevance — no geography copy removed.
- Reduce **trust/proof** — reviews, venues, proof components untouched.

## 9. Re-run verification commands

```bash
cd ~/Desktop/howesounddj || exit 1
test -f logs/hsdj_opus_repo_intelligence_report.md && echo "R_ok=1"
git rev-parse HEAD
git log -1 --oneline
rg -n "og-share.jpg" src/app/vancouver-wedding-dj/page.tsx
rg -n 'href="/faq"' src/app/packages/page.tsx
rg -n "calendly_click" src/lib/analytics.ts src/components/contact-availability-form.tsx
rg -n "trackEvent" src/components/contact-availability-form.tsx
npm run lint
npm run build
```

**Git identity at Stage FINAL write:** `eab6b919612d39fc8e389e735d94fd8bc5fdbe6e` — `eab6b91` Copy, punctuation, asset paths, Turnstile env fallbacks, contact dynamic; ignore GCP key JSON filename pattern
