# HSDJ_DIRECT_CONSULT_BOOKING_PATH_V1 — Stage FINAL

## 1. UX problem addressed

Couples and **existing booked clients** had to infer that consult scheduling lived behind **Check Availability**, or run the date check again—even when a date might show **unavailable** for new leads but their wedding was **already booked**. That added friction for warm leads and final planning calls.

## 2. Contact page path hierarchy after implementation

Within `#availability`, order is:

1. **Check Availability** — Unchanged: date picker, calendar check, then continue/inquiry or contextual **Book a Consult** after a result (primary new-lead path, strongest amber CTA).
2. **Book a consult** — New block (`#book-consult`): direct Calendly link, **secondary** visual weight (outline/amber-tint button, muted card).
3. **Send a message** — `#send-message`: secondary inquiry form; copy reframed as **general questions** with links back to Check Availability and Book a consult.

Global nav was **not** changed.

## 3. Consult booking URL / source

- **URL:** `https://calendly.com/patrick-howesounddj` (same as the existing contact flow).
- **Source of truth:** `src/lib/consult-calendly.ts` exports `CONSULT_CALENDLY_URL`; `contact-availability-form.tsx` imports it (replaces the previous file-local constant).

No placeholder URL was introduced.

## 4. Files touched

| File | Change |
|------|--------|
| `src/lib/consult-calendly.ts` | **New** — shared `CONSULT_CALENDLY_URL`. |
| `src/lib/analytics.ts` | Added `bookConsultClick: "book_consult_click"`. |
| `src/components/contact-availability-form.tsx` | Import `CONSULT_CALENDLY_URL` from consult-calendly (behavior unchanged). |
| `src/components/contact-book-consult-section.tsx` | **New** — client section + CTA + `book_consult_click` tracking. |
| `src/app/contact/page.tsx` | Insert Book consult block between availability form and secondary form; refine “Send a message” copy and anchors. |
| `logs/HSDJ_DIRECT_CONSULT_BOOKING_PATH_V1_STAGE_FINAL.md` | This log. |

## 5. Analytics handling

- **Direct consult CTA** (new block): `trackEvent(ANALYTICS_EVENTS.bookConsultClick, { surface: "contact_page", intent: "direct_consult" })` → GA4 event **`book_consult_click`**.
- **Calendly links inside the availability flow** (after date check): unchanged — still **`calendly_click`** with `surface: "contact_form"`.
- **Check Availability** tracking: unchanged (`check-availability-tracked-link`, availability form events).

## 6. Validation results

- `npm run lint` — pass  
- `npm run build` — pass  
- `rg` — Book a consult / `book_consult` / copy strings present under `src/app/contact` and `src/components` as expected.

## 7. Manual QA checklist

1. `/contact` still opens with **Check Availability** as the primary story (hero + `#availability` + amber **Check Availability** button).  
2. **Book a consult** card appears **below** the full availability form and **above** the secondary form.  
3. Copy reads well for **warm leads** (already in touch, date known open) and **existing clients** (final planning call / already booked).  
4. **Book a Consult** opens **Calendly** in a new tab (`patrick-howesounddj`).  
5. Secondary **Send a message** form still submits (`secondary_inquiry` path, Turnstile).  
6. **Mobile:** three blocks stack cleanly; consult CTA meets **min-height 44px**.  
7. No competing **full amber** CTAs in the new consult block (outline style only).  
8. With GA + `gtag` enabled, **book_consult_click** fires on the direct consult link; **calendly_click** still fires from post-check consult links.

## 8. Non-regression confirmation

This pass did **not** weaken:

- **Check Availability primary funnel** — Same form, API, and post-result branches; no removal of date check or inquiry path.  
- **Secondary inquiry form** — Still rendered; only surrounding copy and anchors were clarified.  
- **Existing availability logic** — `/api/availability` and form behavior untouched.  
- **Contact page mobile usability** — Layout remains single-column with spacing between sections.  
- **Analytics tracking** — Existing events preserved; one additive event for the direct consult surface.

## Success condition

The contact page now offers a **clear direct Book a Consult path** (`#book-consult`) so users do not have to infer consult booking only from **Check Availability**, and **existing / warm** visitors can schedule without re-running the availability check.
