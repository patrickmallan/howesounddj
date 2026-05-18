# Mobile header availability panel — handoff

**Tranche:** Extend header floating panel to mobile + date field width fix  
**Date:** 2026-05-18  
**Repo:** `howesounddj`

---

## Files inspected

| File | Purpose |
|------|---------|
| `src/components/header-check-availability.tsx` | Breakpoint split (desktop panel / mobile link) |
| `src/components/compact-availability-checker.tsx` | Panel content |
| `src/components/wedding-date-fields.tsx` | Date segment widths |
| `src/components/site-chrome.tsx` | Header + mobile drawer CTA |
| `src/hooks/use-wedding-date-input.ts` | Date state (unchanged) |

---

## Files changed

| File | Change |
|------|--------|
| `src/components/header-check-availability.tsx` | Single button all breakpoints; responsive fixed sheet (mobile) + anchored popover (xl); close button; backdrop; body scroll lock below xl |
| `src/components/wedding-date-fields.tsx` | Wider MM/DD (`min-w-[3.5rem]`), touch min-height, `flex-none`, balanced gaps |
| `src/components/contact-availability-form.tsx` | Aligned MM/DD widths on contact page (shared sizing) |

`compact-availability-checker.tsx` and `site-chrome.tsx` unchanged (drawer still links to contact).

---

## Mobile behavior implemented

- Header **Check Availability** opens the same `CompactAvailabilityChecker` panel (no navigation).
- Presentation: centered **fixed** panel below header safe area, `max-width: 22rem`, scrollable if tall.
- Semi-transparent **backdrop** (`bg-black/45`) on viewports below `xl`; tap closes panel.
- **Close** control (top-right, 44px target).
- **Escape**, outside **pointerdown**, and **route change** close panel (path-scoped open state preserved).
- **Body scroll locked** while open on mobile/tablet (`max-width: 1279px`).
- Full contact page remains available via in-panel secondary links.

---

## Desktop behavior preserved

- Same header button toggles panel (no navigation).
- Panel **absolute**-anchored to CTA (`right-0`, `top-full`) at `xl+`.
- Backdrop invisible/non-interactive at `xl+`; outside click via `pointerdown` listener.
- Nav dropdown close on open (`onPanelOpen`) unchanged.
- Analytics unchanged (`header_cta` → `header_panel`).

---

## Date field sizing fix

| Segment | Before | After |
|---------|--------|-------|
| YYYY | `w-[4.25rem]` | `min-w-[4.5rem]` + `sm:min-w-[4.75rem]` |
| MM | `w-[3rem]` (clipped) | `min-w-[3.5rem]`, `px-2.5`, `min-h-[44px]` |
| DD | `w-[3rem]` | `min-w-[3.5rem]`, same treatment |

- `flex-none` + `max-w-full` on row prevents squeeze inside narrow panel.
- Contact form month/day updated to `3.5rem` for parity.

---

## Analytics behavior

Unchanged event names and params:

| Event | Context |
|-------|---------|
| `check_availability_click` | `surface: header_cta`, `destination: header_panel` |
| `availability_check_start` / `result` | `surface: header_panel` |
| `book_consult_click` / `calendly_click` | `surface: header_panel`, `funnel_context: header_availability_panel` |

Mobile header uses the same surfaces (no new mobile-specific events).

---

## Accessibility notes

- Trigger: `aria-expanded`, `aria-controls`, `aria-haspopup="dialog"`.
- Panel: `role="dialog"`, `aria-modal="true"`, labeled.
- Close button: `aria-label="Close availability check"`, 44px hit target.
- Date fields: visible label + segment `aria-label`s.
- Focus returns to trigger on close.
- No focus trap; keyboard can reach panel controls.

---

## Validation results

```bash
rg -n "—" src/app src/components src/config src/lib   # no new em dashes
npx tsc --noEmit   # pass
npx eslint .       # pass
npm run build      # pass
```

---

## Manual QA checklist

### Mobile

- [ ] Header CTA opens panel (no `/contact` navigation)
- [ ] YYYY / MM / DD placeholders fully visible
- [ ] Date check + available/unavailable results
- [ ] Book a Consult opens Calendly
- [ ] Full contact link works
- [ ] Close button, backdrop tap, Escape close panel
- [ ] No horizontal overflow in panel

### Desktop (xl+)

- [ ] Panel still anchors to CTA
- [ ] MM/DD not clipped
- [ ] Nav dropdowns unaffected
- [ ] Outside click + Escape still work

### Analytics

- [ ] One `availability_check_start` per check (not per open)
- [ ] Consult from panel: `funnel_context: header_availability_panel`

---

## Intentionally deferred

- Mobile **drawer** CTA still navigates to `/contact#availability` (secondary path)
- Full-screen sheet takeover (panel stays compact/centered)
- Separate mobile analytics surface dimension
