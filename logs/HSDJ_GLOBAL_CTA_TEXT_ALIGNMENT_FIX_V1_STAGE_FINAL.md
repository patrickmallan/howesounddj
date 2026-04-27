# HSDJ_GLOBAL_CTA_TEXT_ALIGNMENT_FIX_V1 — Stage FINAL

## 1. Issue addressed

Button-style CTAs (especially **`inline-flex`** pills next to **Book a Consult**) could show **left-aligned** labels because `inline-flex` defaults to **`justify-content: flex-start`**. **Book a Consult** already used **`items-center justify-center text-center`**, so mixed rows looked inconsistent (e.g. homepage “Let’s talk about your wedding” block).

## 2. Root cause found

- **Shared tracked links** (`CheckAvailabilityTrackedLink`, `BookConsultTrackedLink`) did not enforce flex/text centering on the anchor itself; consumers passed varying class strings.
- Many **raw `<a>`** pills had **`text-center`** but not **`inline-flex items-center justify-center`**, so flex layout did not center the label inside the pill.

## 3. Shared components / files touched

| Area | Change |
|------|--------|
| `src/lib/cta-alignment.ts` | **New** — exports `CTA_PILL_FLEX_CENTER` (`inline-flex items-center justify-center text-center`) for reuse/documentation. |
| `src/components/check-availability-tracked-link.tsx` | Merges **`CTA_PILL_FLEX_CENTER`** into every instance (after caller `className`, before `motion-interactive`). |
| `src/components/book-consult-tracked-link.tsx` | Same merge; **`bookConsultOutlineButtonClassName`** built from `CTA_PILL_FLEX_CENTER` + outline styles. |
| `src/components/site-chrome.tsx` | Header primary CTA: added **`text-center`**; footer outline CTA: **`inline-flex items-center justify-center text-center`**. |
| `src/components/contact-availability-form.tsx` | Primary **`Check Availability` / `Continue with Inquiry` / `Send inquiry`** buttons: **`inline-flex items-center justify-center text-center`**. |
| `src/components/contact-secondary-inquiry-form.tsx` | Submit button: same alignment utilities. |
| `src/components/home-video-proof.tsx` | Check Availability link: **`items-center justify-center`**. |
| `src/app/page.tsx` (and other route files) | Raw pill `<a>` / **`motion-interactive`** links: prefixed with **`inline-flex items-center justify-center`** where needed. |

**Route files updated:** `page.tsx`, `about/page.tsx`, `weddings/page.tsx`, `contact/page.tsx`, `packages/page.tsx`, `reviews/page.tsx`, `venues/page.tsx`, `venues/[slug]/page.tsx`, `vancouver-wedding-dj/page.tsx`, `faq/page.tsx`.

## 4. CTA surfaces audited

- Homepage hero, reviews band, about band, contact band, FAQ preview  
- Contact, weddings, packages, reviews, FAQ, Vancouver landing, venues hub, venue detail hero + closing bands  
- Header + footer (`site-chrome`)  
- `HomeVideoProof`, contact availability + secondary forms  

**Intentionally unchanged:** Non-CTA inline links, FAQ `<summary>` text, eyebrow chips, body copy.

## 5. Validation results

- `npm run lint` — pass  
- `npm run build` — pass  

## 6. Manual QA checklist

1. Homepage lower contact container: **Check Availability**, **Book a Consult**, **Wedding DJ Services** — label centered in each pill.  
2. Homepage hero CTAs — centered.  
3. Contact / weddings / packages — primary + outline pills centered.  
4. Venues hub + venue detail — hero and bottom CTAs centered.  
5. Mobile — same; no horizontal scroll.  
6. Inline text links in paragraphs — still default alignment, not forced center.

## 7. Non-regression confirmation

- **Routes, tracking, and hierarchy** unchanged (only `className` / shared merge on existing components).  
- **Primary/secondary** visual styles (amber vs outline) preserved.  
- **No copy or structural redesign.**

## Success condition

All **button-style** CTA labels are **centered** on desktop and mobile via consistent **`inline-flex items-center justify-center text-center`** (global on tracked links + matching raw pills), without changing behavior or funnel priority.
