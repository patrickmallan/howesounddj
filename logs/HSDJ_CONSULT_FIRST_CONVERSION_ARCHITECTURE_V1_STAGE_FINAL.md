# HSDJ_CONSULT_FIRST_CONVERSION_ARCHITECTURE_V1 — Stage FINAL

Pack ID: **HSDJ_CONSULT_FIRST_CONVERSION_ARCHITECTURE_V1**

## 1. Business problem addressed

Warm leads treated **Check Availability**, **Book a Consult**, and **Send a Message** as similarly weighted paths, so many chose the secondary inquiry form first. That increased low-intent messages and manual follow-up (“please book a consult”). The goal was to make **Book a Consult** the clearest, most persuasive next step for serious wedding inquiries while keeping availability checking, the secondary form, vendor email visibility, and all backend behavior intact.

## 2. Final contact page hierarchy

1. **Hero** — Wedding-first framing; **Book a Consult** as primary CTA (amber), **Check Availability** as outline secondary; tertiary links to reviews and packages.
2. **Primary consult panel** (`#book-consult`) — Premium panel with required headline, supporting copy, value bullets, reassurance line, and **Book a Consult** (same Calendly URL as elsewhere).
3. **What happens next** — Short reassurance bridge (conversation-first).
4. **Check Availability** (`#availability`) — Heading “Already have a date in mind?” plus helper bullets and **`ContactAvailabilityForm`** (unchanged behavior).
5. **Prefer email** (`#send-message`) — Heading “Prefer email?”, fallback copy, **`patrick@howesounddj.com`** mailto, then **`ContactSecondaryInquiryForm`** (unchanged fields and submission path).
6. **Supporting sections** — Partial brief, why reach out, closing **Ready when you are** strip with consult-first copy and CTAs.

## 3. Copy added or changed

| Location | Change |
|----------|--------|
| Metadata title/description | Consult-first framing while staying wedding-specific. |
| Hero | Badge “Weddings · Sea-to-Sky”; H1 “Plan your wedding night with warmth and clarity.”; body copy emphasizes consult vs date-check without sounding pushy. |
| Primary consult panel | Required heading (“Let’s map out your wedding”), supporting paragraph, three bullets, reassurance line, optional helper text linking to `#availability`. |
| Availability section | Eyebrow “Check availability”; H2 “Already have a date in mind?”; body copy per spec; bullet tweak (“below” vs “above”). |
| Send-message section | H2 “Prefer email?”; body “If you’d rather start with a message…”; vendor line “Planner, venue, or vendor inquiry? You can email directly at patrick@howesounddj.com.” |
| What happens next | Mentions consult first or availability depending on visitor. |
| Closing strip | Headline/subcopy aligned with consult-first hierarchy (no longer “checking availability” as the single first step). |

## 4. CTA behavior confirmed

| CTA | Behavior |
|-----|----------|
| **Book a Consult** (hero, primary panel, bottom strip) | `BookConsultTrackedLink` → `CONSULT_CALENDLY_URL` (same as existing repo); opens new tab; `book_consult_click` with `surface: contact_page_primary` on `/contact` primary placements. |
| **Check Availability** (hero, bottom strip) | `CheckAvailabilityTrackedLink` → `/contact#availability` with existing same-page scroll/hash behavior and `check_availability_click`. |
| Secondary inquiry form | Still posts to `/api/contact` with `formType: "secondary_inquiry"`; Turnstile unchanged. |
| **patrick@howesounddj.com** | `mailto:` unchanged. |

## 5. Files touched

- `src/app/contact/page.tsx` — Layout reorder; hero and closing CTAs; availability vs send-message split into two `<section>`s; copy updates; metadata.
- `src/components/contact-book-consult-section.tsx` — Rebuilt primary consult panel (visual treatment, required copy, `#book-consult` preserved).
- `src/components/book-consult-tracked-link.tsx` — Added `contact_page_primary` surface; exported `bookConsultPrimaryButtonClassName`.
- `src/app/page.tsx` — Homepage `#contact` strip: Book a Consult primary (amber), Check Availability outline; supporting sentence aligned with contact page hierarchy.

Not touched (by design): `contact-availability-form.tsx`, `contact-secondary-inquiry-form.tsx`, `check-availability-tracked-link.tsx`, API routes, Turnstile wiring, Resend.

## 6. Analytics handling

- **`book_consult_click`** — Still fired from `BookConsultTrackedLink`; primary CTAs on `/contact` now pass **`surface: "contact_page_primary"`** (hero primary panel uses this; homepage `#contact` keeps **`page_cta`**).
- **`check_availability_click`** — Unchanged; still attached to `CheckAvailabilityTrackedLink` with existing surfaces (`page_cta` on contact hero/footer strip).
- **Availability form / secondary form** — No event renames; `contact_form`, `contact_page_secondary`, availability checks, and Calendly clicks inside the availability widget behave as before.

## 7. Validation results

| Check | Result |
|-------|--------|
| `npm run lint` | Pass |
| `npm run build` | Pass |

## 8. Manual QA checklist

1. Open `/contact` on desktop — consult panel is visually primary; hero CTAs match hierarchy.
2. Confirm **Book a Consult** reads as the clearest primary action (hero + panel + bottom strip).
3. Confirm **Check Availability** remains visible (hero + dedicated section + form button label).
4. Confirm **Prefer email?** section and form feel secondary to the consult panel.
5. Confirm **patrick@howesounddj.com** is visible and clickable.
6. Click **Book a Consult** — opens correct Calendly URL (`CONSULT_CALENDLY_URL`).
7. Click **Check Availability** from hero — scrolls to `#availability`; hash updates per existing component behavior.
8. Exercise secondary inquiry form (respect prod vs staging Turnstile rules).
9. Resize to mobile — consult panel first after hero; buttons readable; no excessive gaps.
10. Scan page for CTA overload — hero row may include reviews/packages; intentional tertiary navigation only.
11. Scroll full page — no accidental blank sections introduced by split sections.
12. Analytics — confirm `book_consult_click` payloads include `contact_page_primary` where DevTools/network allows.

## 9. Non-regression confirmation

This pass did **not** intentionally weaken:

- **Check Availability flow** — Same `#availability` id, same `ContactAvailabilityForm`, same `/api/availability` usage inside the component.
- **Book a Consult link** — Still Calendly via shared URL and tracked link component.
- **Secondary inquiry form** — Same component, fields, and payload shape (`secondary_inquiry`).
- **Email delivery / auto-reply** — API route untouched.
- **Turnstile validation** — Forms unchanged.
- **Mobile usability** — Flex/stack patterns preserved; primary panel uses responsive padding and full-width CTA on small screens where applied.
- **Wedding-first positioning** — Hero badge and copy remain wedding-centric.
- **Analytics tracking** — Event names unchanged; surface extended only for primary consult placements.

## 10. Recommended follow-up

- Monitor GA4 funnels for **`book_consult_click`** vs **`contact_form_submit_success`** from **`contact_page_secondary`** after deployment.
- Optionally align other pages’ dual CTAs (venues hub, FAQ, packages) with **Book a Consult** primary where business confirms same hierarchy site-wide.
- A/B test hero H1/subcopy if consult CTR does not move after this structural change alone.
