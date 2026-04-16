# HSDJ_REMEDIATION_BATCH_05_P7_GROWTH — Stage FINAL

## 1. Pack ID

**HSDJ_BATCH_05_P7_GROWTH**

## 2. Why this deferred analytics work was promoted into execution

The current `$R` (`logs/hsdj_opus_repo_intelligence_report.md`) lists `check_availability_click` under **Intentionally deferred** (P6) and documents no remaining required P0–P6 defects. This batch promotes only that deferred CTA/funnel measurement work so GA can segment **CTA intent**, **availability-step engagement**, and **inquiry engagement** without changing conversion UX, copy, or business logic—aligned with the analytics posture in `docs/HSDJ OPUS SCAN.txt`.

## 3. Exact report sections used from `$R`

- **Intentionally deferred** — table row for `check_availability_click` (no CTA click tracking in repo; deferred until funnel analysis is needed).
- **Analytics contract audit** — “Deferred events” (`check_availability_click` **DEFERRED**), “Safe no-op behavior”, “Duplicate prohibition”, “Payload enrichment (recommended, not required)”.
- **Recommended remediations** — P6 analytics completeness row **P6-3** (enrichment of `surface`, `form_type`, `status` when touching analytics).
- **D2. Analytics + Conversion Tracking** — GA conditional load, form events, SSR guards.

## 4. Exact findings/opportunities addressed

- Promoted **deferred** `check_availability_click` with explicit `surface`, `destination: "/contact"`, and `page_path` on each qualifying CTA click.
- Added funnel events **`availability_check_start`**, **`availability_check_result`** (with `result: "available" | "unavailable"`), and **`contact_form_start`** on the contact availability flow, without altering availability or submit logic.

## 5. Files touched

| File | Change |
|------|--------|
| `src/lib/analytics.ts` | Registry entries for four new events. |
| `src/components/check-availability-tracked-link.tsx` | **New** client `Link` wrapper with one `onClick` `trackEvent` per navigation CTA. |
| `src/components/site-chrome.tsx` | Header + footer Check Availability → tracked links. |
| `src/components/home-video-proof.tsx` | Home video strip CTA → tracked link. |
| `src/app/page.tsx` | Four Check Availability CTAs → tracked links. |
| `src/app/contact/page.tsx` | Two `#availability` CTAs → tracked links. |
| `src/app/weddings/page.tsx` | Two CTAs → tracked links. |
| `src/app/vancouver-wedding-dj/page.tsx` | Two CTAs → tracked links. |
| `src/app/about/page.tsx` | One CTA → tracked link. |
| `src/app/faq/page.tsx` | Two CTAs → tracked links. |
| `src/app/packages/page.tsx` | Two CTAs → tracked links. |
| `src/app/reviews/page.tsx` | Three CTAs → tracked links. |
| `src/components/contact-availability-form.tsx` | Availability start/result events; inquiry `contact_form_start` via one-time focus capture. |

## 6. New events added (registry + wiring)

| Constant | Event name | Wired |
|----------|------------|-------|
| `checkAvailabilityClick` | `check_availability_click` | Yes — all `CheckAvailabilityTrackedLink` instances. |
| `availabilityCheckStart` | `availability_check_start` | Yes — start of `checkAvailability()` after date validation. |
| `availabilityCheckResult` | `availability_check_result` | Yes — once per resolved API outcome (available / unavailable paths). |
| `contactFormStart` | `contact_form_start` | Yes — first focus into a real inquiry field (honeypot excluded). |

## 7. Exact surfaces instrumented for Check Availability clicks

All use `destination: "/contact"` in the payload; `href` may be `/contact`, `/contact#availability`, or `#availability` for in-page scroll.

| `surface` | Where |
|-----------|--------|
| `header` | `site-chrome.tsx` — header CTA. |
| `footer` | `site-chrome.tsx` — footer CTA. |
| `hero` | `page.tsx` (home hero), `weddings/page.tsx`, `reviews/page.tsx`, `faq/page.tsx`, `packages/page.tsx`, `vancouver-wedding-dj/page.tsx` — primary masthead CTAs. |
| `inline` | `home-video-proof.tsx`; `page.tsx` (reviews section row CTA); `reviews/page.tsx` (proof-first strip CTA). |
| `page_cta` | `page.tsx` (home About + Contact sections); `contact/page.tsx` (both `#availability`); `about/page.tsx`; `weddings/page.tsx` (bottom); `faq/page.tsx` (bottom); `packages/page.tsx` (bottom); `vancouver-wedding-dj/page.tsx` (bottom); `reviews/page.tsx` (bottom). |

**DEFERRED sub-items:** None. Every visible repo “Check Availability” **navigation** CTA found in Stage 1 discovery is wired; the in-form **button** that still says “Check Availability” in `contact-availability-form.tsx` is the availability **action** (covered by `availability_check_start` / `availability_check_result`), not a duplicate `check_availability_click` to avoid double-counting the same intent.

## 8. Exact trigger used for `contact_form_start`

**One-time `onFocusCapture` on the inquiry `<form>`** after the user opens the inquiry block: the handler ignores the honeypot (`id === "inquiry-company"`), sets a `useRef` guard, and fires `contact_form_start` once per component lifecycle on the first focus entering a real inquiry `<input>` or `<textarea>`.

## 9. Validation results

- `npm run lint` — **PASS** (exit 0).
- `npm run build` — **PASS** (exit 0; Next.js 16.2.3).

## 10. Non-regression confirmation

This pass did **not** weaken:

- **Check Availability funnel** — availability API, gating, Turnstile, Calendly, and inquiry submit paths unchanged; only analytics hooks added.
- **Wedding-first positioning** — no copy or layout changes to positioning statements.
- **Squamish / Sea-to-Sky relevance** — no geo or copy edits.
- **Trust/proof density** — no content or structural changes to proof sections.
- **Existing submit event instrumentation** — `contact_form_submit_attempt`, `contact_form_submit_success`, `contact_form_submit_error`, and `calendly_click` remain in `analytics.ts` and `contact-availability-form.tsx` with prior behavior preserved.

## 11. Re-run verification commands

```bash
cd ~/Desktop/howesounddj || exit 1
R="$(git rev-parse --show-toplevel)/logs/hsdj_opus_repo_intelligence_report.md"
test -f "$R" && echo "R_ok=1"
git rev-parse HEAD
git log -1 --oneline
rg -n "check_availability_click|availability_check_start|availability_check_result|contact_form_start" src/lib/analytics.ts src/components
rg -n "contact_form_submit_attempt|contact_form_submit_success|contact_form_submit_error|calendly_click" src/lib/analytics.ts src/components/contact-availability-form.tsx
npm run lint
npm run build
```

## Status

**DONE** — All four selected events are implemented, registered in `ANALYTICS_EVENTS`, wired in repo, and verified with lint + build.
