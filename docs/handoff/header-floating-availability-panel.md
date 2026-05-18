# Header floating availability panel — handoff

**Tranche:** Desktop header inline availability check  
**Date:** 2026-05-18  
**Repo:** `howesounddj`

---

## Files inspected

| Area | Path |
|------|------|
| Site header | `src/components/site-chrome.tsx` |
| Contact availability | `src/components/contact-availability-form.tsx` |
| Availability API | `src/app/api/availability/route.ts` |
| Analytics | `src/lib/analytics.ts` |
| Calendly | `src/lib/consult-calendly.ts` |
| Consult CTA | `src/components/book-consult-tracked-link.tsx` |
| Check availability link | `src/components/check-availability-tracked-link.tsx` |
| Post-availability context | `src/lib/post-availability-context.ts` |

---

## Files changed

| File | Change |
|------|--------|
| `src/lib/wedding-date-input.ts` | **New** — shared date segment helpers |
| `src/lib/availability-check-client.ts` | **New** — shared API call + analytics + session context |
| `src/hooks/use-wedding-date-input.ts` | **New** — date field state + focus helpers |
| `src/components/wedding-date-fields.tsx` | **New** — reusable YYYY/MM/DD inputs |
| `src/components/compact-availability-checker.tsx` | **New** — panel UI + compact copy |
| `src/components/header-check-availability.tsx` | **New** — desktop trigger + floating panel + mobile link |
| `src/components/site-chrome.tsx` | Header CTA → `HeaderCheckAvailability`; mobile drawer `href` |
| `src/components/contact-availability-form.tsx` | Uses shared client + date helpers |
| `src/lib/analytics.ts` | `surface` on availability events; `header_availability_panel` funnel |
| `src/components/check-availability-tracked-link.tsx` | Surface types `header_cta`, `header_panel` |

---

## Component architecture

```
HeaderCheckAvailability (xl breakpoint split)
├── < xl: CheckAvailabilityTrackedLink → /contact#availability
└── xl+: button (aria-expanded) → floating panel
    └── CompactAvailabilityChecker
        ├── WeddingDateFields (useWeddingDateInput)
        └── runAvailabilityCheck("header_panel")

ContactAvailabilityForm (unchanged UX, shared core)
└── runAvailabilityCheck("contact_form")
```

No separate `header-availability-panel.tsx`; panel shell lives in `header-check-availability.tsx` to keep positioning with the trigger.

---

## How contact-page logic was reused

- **`runAvailabilityCheck(date, surface)`** centralizes POST `/api/availability`, `availability_check_start` / `availability_check_result`, and post-availability `sessionStorage` context.
- **Date validation** shared via `wedding-date-input.ts` (contact form still uses local state; panel uses `useWeddingDateInput`).
- Contact page keeps full form, inquiry flow, Turnstile, and long availability message from API.
- Panel uses approved **compact** open-date copy (not the full API message block).

---

## Desktop behavior (xl+, 1280px)

1. Click **Check Availability** → panel opens below CTA (no navigation).
2. `check_availability_click` with `surface: header_cta`, `destination: header_panel`.
3. Year field focused; user enters date and checks.
4. Available → compact celebration copy + **Book a Consult** (Calendly) + link to full contact page.
5. Unavailable → calm message + optional “Ask about alternatives”.
6. **Escape** or outside click closes panel; focus returns to CTA.
7. Client route change closes panel (path-scoped open state).
8. Opening panel closes desktop nav dropdowns (`onPanelOpen`).

---

## Mobile behavior (< xl)

- Header amber button: `CheckAvailabilityTrackedLink` → `/contact#availability` (unchanged intent).
- Mobile drawer CTA: same, with `closeMobileMenu` on click.
- **No floating panel** on mobile.

---

## Analytics events / params

| Event | When | Notable params |
|-------|------|----------------|
| `check_availability_click` | Desktop CTA opens panel | `surface: header_cta`, `destination: header_panel` |
| `check_availability_click` | Mobile/header link navigate | `surface: header` (existing) |
| `availability_check_start` | Panel or contact check begins | `surface: header_panel` \| `contact_form`, `date_selected`, `page_path` |
| `availability_check_result` | Outcome | + `availability_status`, `surface` |
| `book_consult_click` | Panel Calendly | `surface: header_panel`, `funnel_context: header_availability_panel` |
| `calendly_click` | Panel Calendly | `surface: header_panel`, `funnel_context: header_availability_panel` |

Event names unchanged. Post-availability trust tracking still works when panel sets session context on available.

---

## Accessibility

- Trigger: `aria-expanded`, `aria-controls`, `aria-haspopup="dialog"`.
- Panel: `role="dialog"`, `aria-label="Check wedding date availability"`.
- Date fields: visible label + per-segment `aria-label`; not placeholder-only.
- Escape and outside-click close; focus restored to trigger.
- No focus trap (popover pattern, not modal).
- Nav dropdowns remain independent (z-index: panel `z-[85]`).

---

## State handling

| State | UI |
|-------|-----|
| idle | Date inputs + check button + subtle contact link |
| loading | Disabled check button (“Checking…”) |
| available | Compact copy + consult primary + contact secondary |
| unavailable | API/calm message + alternatives link |
| error | Inline error (network); no consult push |

- Result resets when date segments change.
- Panel remounts on each open (`key={pathname}`) for a clean session.
- Stale results avoided on segment edit via `onSegmentsChange`.

---

## Validation results

```bash
rg -n "—" src/app src/components src/config src/lib   # no em dashes (comment match in image-slot only)
npx tsc --noEmit   # pass
npx eslint .       # pass
npm run build      # pass
```

---

## Manual QA checklist

### Desktop (xl+)

- [ ] Header CTA opens panel without navigation
- [ ] Year input focused on open
- [ ] Valid date check returns available/unavailable correctly
- [ ] Book a Consult opens Calendly
- [ ] Escape closes panel; focus on CTA
- [ ] Outside click closes panel
- [ ] Route change closes panel
- [ ] Nav dropdowns still work; panel does not block logo

### Mobile (< xl)

- [ ] Header CTA goes to `/contact#availability`
- [ ] No floating panel
- [ ] Contact page availability unchanged

### Analytics

- [ ] Single `availability_check_start` per check
- [ ] Panel consult uses `funnel_context: header_availability_panel`
- [ ] No duplicate events on open-only (start fires on check, not open)

---

## Intentionally deferred

- Single `type="date"` input (kept YYYY/MM/DD parity with contact page)
- Google Reviews link in panel (`google_reviews` trust target still unused site-wide)
- Panel trust reinforcement row (contact page only from prior tranche)
- Keyboard trap / modal overlay (popover preferred)
- Tablet-specific panel (uses same xl breakpoint as desktop nav)
