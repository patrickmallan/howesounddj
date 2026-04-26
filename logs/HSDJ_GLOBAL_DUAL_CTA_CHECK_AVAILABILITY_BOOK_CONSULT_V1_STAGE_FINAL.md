# HSDJ_GLOBAL_DUAL_CTA_CHECK_AVAILABILITY_BOOK_CONSULT_V1 — Stage FINAL

## 1. CTA strategy

- **Primary:** **Check Availability** stays first in every updated button group, full **amber** pill, unchanged `check_availability_click` behavior via `CheckAvailabilityTrackedLink`.
- **Secondary:** **Book a Consult** immediately follows (or pairs in compact rows), **outline** pill (`border-white/15`, white label) so it never competes visually with the primary.
- **Tertiary:** Existing links (Reviews, Packages, About, FAQ, etc.) remain after the dual conversion pair where they already existed.
- **Header / mobile nav:** **Unchanged** — single dominant Check Availability CTA only; no Book a Consult in global chrome (per pack).

## 2. Surfaces updated

| Surface | Location |
|---------|-----------|
| Homepage | Hero CTA row; Reviews section inline row; About band; bottom Contact band |
| Homepage explore | `HomepageExploreSection` grid: new card after Check Availability |
| Site-wide footer strip | `ExploreSiteLinksStrip`: text link after Check Availability |
| Home video proof | CTA row under video |
| Contact | Hero (supporting line + second button); closing “Ready when you are” band; in-page `ContactBookConsultSection` now uses shared `BookConsultTrackedLink` |
| Weddings | Hero; bottom “Next step” band |
| Packages | Hero; bottom “Next step” band |
| Venues hub | Hero; bottom “Next step” band |
| Venue detail | Hero; bottom availability band |
| Vancouver wedding DJ | Hero; bottom “Lock in fit” band |
| About | Closing CTA band |
| FAQ | Hero; closing CTA band |
| Reviews | Hero; proof-first strip; closing CTA band |

**Not added:** Per guidance, small inline text-only links and the **header** were left as-is.

## 3. Consult link source

- **URL:** `CONSULT_CALENDLY_URL` from `src/lib/consult-calendly.ts` → `https://calendly.com/patrick-howesounddj`
- Same destination as the contact flow Calendly buttons in `contact-availability-form.tsx`.

## 4. Tracking behavior

- **Component:** `BookConsultTrackedLink` (`src/components/book-consult-tracked-link.tsx`)
- **Event:** `book_consult_click` (`ANALYTICS_EVENTS.bookConsultClick`)
- **Params:** `surface` (e.g. `hero`, `page_cta`, `venues_hub`, `venue_hero`, `venue_page_cta`, `inline`, `footer`, `explore_card`, `contact_page`), `intent: direct_consult`, `page_path` when available
- **Unchanged:** `check_availability_click`, availability form events, `calendly_click` on post-check Calendly links inside the form

## 5. Files touched

- `src/components/book-consult-tracked-link.tsx` — **new** shared client CTA + `bookConsultOutlineButtonClassName`
- `src/components/contact-book-consult-section.tsx` — uses `BookConsultTrackedLink` (`surface: contact_page`)
- `src/components/explore-site-links.tsx` — explore card + footer strip
- `src/components/home-video-proof.tsx`
- `src/app/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/weddings/page.tsx`
- `src/app/packages/page.tsx`
- `src/app/venues/page.tsx`
- `src/app/venues/[slug]/page.tsx`
- `src/app/vancouver-wedding-dj/page.tsx`
- `src/app/about/page.tsx`
- `src/app/faq/page.tsx`
- `src/app/reviews/page.tsx`
- `logs/HSDJ_GLOBAL_DUAL_CTA_CHECK_AVAILABILITY_BOOK_CONSULT_V1_STAGE_FINAL.md` — this file

## 6. Validation results

- `npm run lint` — pass  
- `npm run build` — pass  

## 7. Non-regression confirmation

This pass did **not** weaken:

- **Check Availability** as the visual and positional primary CTA  
- **Contact page structure** from prior packs (availability form, Book a consult block, secondary inquiry) — only additive hero/closing CTAs and shared tracking on the existing consult block  
- **Availability / API / form logic** — no backend changes  
- **Mobile UX** — flex-wrap, `min-h-[44px]` on outline consult buttons  
- **Analytics** — existing events preserved; `book_consult_click` is additive with explicit `surface` for reporting  

## Success condition

Major marketing and venue surfaces now pair **Check Availability** with a tracked **Book a Consult** path to Calendly, with **Check Availability** remaining the clear primary action and **Book a Consult** a consistent secondary.
