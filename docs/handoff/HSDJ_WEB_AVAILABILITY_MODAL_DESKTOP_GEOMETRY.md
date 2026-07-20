# HSDJ-WEB-AVAILABILITY-01 — Desktop availability modal geometry

**Verdict:** `PASS_HSDJ_WEB_AVAILABILITY_MODAL_DESKTOP_GEOMETRY_CORRECTED`

## Root cause

The header availability panel was capped at **22rem** while `WeddingDateFields` used a **flex row** with `flex-none` and fixed `min-width` segments (YYYY up to 4.75rem, MM/DD 3.5rem each). Inside the panel’s padded content area (`p-5` + `pr-8` for the close control), the date row’s minimum intrinsic width exceeded the viewport, producing **horizontal overflow** on desktop.

## Components changed

| File | Role |
|------|------|
| `src/components/header-check-availability.tsx` | Modal shell width |
| `src/components/wedding-date-fields.tsx` | Segmented date row layout |
| `tests/availability-modal-geometry.test.ts` | Regression guard |

## Before / after geometry

| Surface | Before | After |
|---------|--------|-------|
| Panel width (mobile) | `min(100vw - 1.5rem, 22rem)` | `min(100vw - 1.5rem, 26rem)` |
| Panel width (desktop xl+) | `min(100vw - 2rem, 22rem)` | `min(100vw - 2rem, 28rem)` |
| Date row | Flex + `flex-none` + fixed min-widths | CSS grid `1.4fr / 1fr / 1fr` with `min-w-0` inputs |

## Responsive behavior

- **Desktop:** Year, month, and day visible in one row; no horizontal scrollbar.
- **Mobile:** Same three-column grid; panel remains viewport-safe with existing backdrop and scroll lock.
- **Contact page** availability form unchanged (inline inputs in `contact-availability-form.tsx`).

## Functional invariants preserved

- Launcher, validation, `/api/availability` payload, analytics events, Calendly/contact fallbacks unchanged.
- Dialog semantics, Escape-to-close, focus trap behavior, and close button label unchanged.

## Validation

```bash
npm run typecheck   # exit 0
npm run lint        # exit 0
npm test            # 48 tests passed
npm run build       # exit 0
```

## Browser proof

Local and production: open **Check Availability** on homepage; confirm YYYY/MM/DD fit without horizontal scroll at 1280px, 1512px, and 390px widths.

## Production status

Deployed via `npx vercel --prod --yes` as deployment `dpl_5NMHsPYWPFVqeWeepyuruLnEwxDP` on `https://www.howesounddj.com`.
