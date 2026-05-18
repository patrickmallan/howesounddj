# Conversion intelligence pass v1 — handoff

**Tranche:** Post-availability trust-path instrumentation + consult funnel attribution  
**Date:** 2026-05-18  
**Repo:** `howesounddj`

---

## Files inspected

| Area | Path |
|------|------|
| Analytics core | `src/lib/analytics.ts` |
| GA loader | `src/components/google-analytics.tsx` |
| Availability form | `src/components/contact-availability-form.tsx` |
| Consult CTA | `src/components/book-consult-tracked-link.tsx` |
| Check availability CTA | `src/components/check-availability-tracked-link.tsx` |
| CTA duo | `src/components/cta-duo.tsx` |
| Site chrome (nav/footer) | `src/components/site-chrome.tsx` |
| Homepage headline experiment | `src/components/homepage-hero-headline.tsx` |
| Secondary contact form | `src/components/contact-secondary-inquiry-form.tsx` |
| Availability API | `src/app/api/availability/route.ts` |
| Prior audit | `docs/handoff/premium-trust-conversion-psychology-audit.md` |

---

## Analytics architecture discovered

- **Single abstraction:** `src/lib/analytics.ts` exports `ANALYTICS_EVENTS`, `trackEvent()`, and shared param helpers.
- **GA4 loading:** `src/components/google-analytics.tsx` loads gtag with `send_page_view: false` and sends `page_path` on route changes.
- **Gating:** Events no-op when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is unset or `window.gtag` is missing.
- **Existing availability events:** `availability_check_start` / `availability_check_result` with `date_selected`, `page_path`, `availability_status` (`available` \| `unavailable`).
- **Existing consult events:** `book_consult_click` (surface + intent), `calendly_click` (surface).
- **No Redux / cookies / backend persistence** for behavioral context.

---

## Files changed

| File | Change |
|------|--------|
| `src/lib/post-availability-context.ts` | **New** — sessionStorage context after date available |
| `src/lib/post-availability-trust.ts` | **New** — trust target mapping + `post_availability_trust_click` emitter |
| `src/lib/analytics.ts` | New event, `funnel_context`, `consultClickEventParams`, dev-gated `debug_mode` |
| `src/components/post-availability-trust-link.tsx` | **New** — trust links for reinforcement row |
| `src/components/contact-availability-form.tsx` | Context set/clear, trust row, consult attribution |
| `src/components/book-consult-tracked-link.tsx` | `funnel_context` on all consult clicks |
| `src/components/site-chrome.tsx` | Nav/footer trust clicks when context active |

---

## Event taxonomy implemented

| Event | When | Key parameters |
|-------|------|----------------|
| `availability_check_start` | User submits date check | `date_selected`, `page_path` |
| `availability_check_result` | API resolves | + `availability_status`: `available` \| `unavailable` |
| `post_availability_trust_click` | Trust nav **only** while session context active | `trust_target`, `page_context`, `post_availability_context_active: true` |
| `book_consult_click` | Any tracked Calendly consult CTA | Existing `surface`, `intent` + **`funnel_context`**, `page_path` |
| `calendly_click` | Calendly from availability form | `surface` + **`funnel_context`**, `page_path` |

**Unchanged:** `check_availability_click`, contact form events, `homepage_headline_view`.

**Note:** “Availability open” in QA maps to `availability_check_result` with `availability_status: available` (name preserved for backward compatibility).

---

## Session context architecture

- **Key:** `sessionStorage.hsdj_post_availability_context`
- **Set when:** `availability_check_result` → `available`
- **Structure:**

```json
{
  "active": true,
  "timestamp": 1710000000000,
  "selectedDate": "2026-08-15",
  "source": "availability_checker"
}
```

- **Expiry:** 30 minutes from `timestamp` (read-time check; silent remove if stale)
- **Cleared when:** new check starts, unavailable result, date fields edited, “Try another date”
- **Fails silently** if `sessionStorage` unavailable

---

## Trust-target taxonomy

| `trust_target` | Matched routes |
|----------------|----------------|
| `reviews` | `/reviews` |
| `about` | `/about` |
| `packages` | `/packages` |
| `venues` | `/venues`, `/venues/*` |
| `stories` | `/stories`, `/stories/*` |
| `guides` | `/guides`, `/guides/*` |
| `google_reviews` | Reserved for future external GBP links (no on-site link yet) |

Instrumentation surfaces: reinforcement row (Reviews, About), header dropdown/mobile nav, footer, finale zone package/review links.

---

## Consult attribution changes

- **`funnel_context`** added to `book_consult_click` and `calendly_click` via `consultClickEventParams()`.
- **Resolution order:**
  1. Current page path → `homepage`, `reviews`, `about`, `packages`, `venues`, `stories`, `guides`
  2. Else if post-availability context active on `/contact` → `post_availability`
  3. Else → `direct`
- **Strategic path preserved:** availability → About → consult reports `funnel_context: about` (page wins over session flag).
- **Immediate post-open consult on contact:** `funnel_context: post_availability`.
- **Backward compatible:** event names unchanged; new dimension only.

---

## debug_mode findings / fixes

- **Before:** `availabilityCheckEventParams()` always sent `debug_mode: true` in production (TEMP comment).
- **After:** `gaDebugModeParam()` sets `debug_mode` only when `NODE_ENV === 'development'` or `NEXT_PUBLIC_GA_DEBUG=true`.
- Production emissions are clean unless explicitly opted in for DebugView validation.

---

## UX: trust reinforcement row

After a successful “date available” response on `/contact`:

> Still exploring? Couples often skim Reviews or About before booking.

- Subtle `text-white/50` copy; amber underline links
- Links fire `post_availability_trust_click` when context is active
- No banners, popups, or extra CTAs

---

## QA performed

### Automated

```bash
npx tsc --noEmit   # pass
npx eslint .       # pass
npm run build      # pass
```

### Manual checklist (dev with GA + DebugView recommended)

| # | Flow | Expected |
|---|------|----------|
| 1 | availability → Reviews | `availability_check_result` (available); `post_availability_trust_click` (reviews) |
| 2 | availability → About | trust click (about) |
| 3 | availability → Packages (nav) | trust click (packages) |
| 4 | availability → consult CTA | `book_consult_click` + `funnel_context: post_availability` |
| 5 | Generic browse (no availability) | **No** `post_availability_trust_click` on nav |
| 6 | availability → About → consult | consult `funnel_context: about` |
| 7 | mobile + desktop | Same behavior; reinforcement row readable |

Verify: no duplicate events, no console errors, CTAs unchanged visually.

---

## Validation results

| Command | Result |
|---------|--------|
| `npx tsc --noEmit` | ✓ Pass |
| `npx eslint .` | ✓ Pass |
| `npm run build` | ✓ Pass (44 static routes) |

---

## Intentionally deferred

- Route-change / page-view trust attribution without a click (would add noise)
- `google_reviews` external link instrumentation (no GBP URL in codebase yet)
- Backend session persistence or cross-device return tracking
- GA4 explorations / Looker dashboards (ops follow-up)
- Homepage inline trust links (only contact reinforcement row in this tranche)
- Renaming `availability_check_result` → `availability_open`

---

## Future recommended analysis workflow

1. **GA4 Exploration:** Funnel `availability_check_result` (available) → `post_availability_trust_click` → `book_consult_click`, breakdown by `trust_target` and `funnel_context`.
2. **Path report:** Segment users with `post_availability_context_active` (via trust events) and compare consult rate by `funnel_context`.
3. **About path:** Filter `funnel_context = about` on consult events where prior trust click `trust_target = about` in same session (session-scoped, not user ID).
4. **Time to consult:** `timestamp` delta between `availability_check_result` and `book_consult_click` (custom exploration).
5. **Drop-off:** Available result with no trust click and no consult within 30m (context expiry window).
6. **Production DebugView:** Set `NEXT_PUBLIC_GA_DEBUG=true` briefly on preview deploy only; remove after validation.

---

## Deploy notes

- No new env vars required for core behavior.
- Optional: `NEXT_PUBLIC_GA_DEBUG=true` for staged DebugView validation.
- Requires `NEXT_PUBLIC_GA_MEASUREMENT_ID` for any events to fire (unchanged).
