# HSDJ_SECONDARY_INQUIRY_PATH_RESTORE_V1 — Stage FINAL

## 1. UX / business problem addressed

The contact flow prioritized **availability → inquiry**, so couples who were **not ready to pick a date** or **continue after availability** had **no lower-friction way** to ask a question without going through the full availability-led inquiry path. The site needed a **clearly secondary** “ask a question” path that **does not compete** with **Check Availability** or **Book a Consult**.

## 2. Restored vs newly added

There was **no** separate reusable inquiry component in the repo beyond **`ContactAvailabilityForm`** (which only exposes the full inquiry **after** a date checks **available**). A **new** **`ContactSecondaryInquiryForm`** client component was added; the **primary** availability + Calendly flow was **left intact**.

## 3. Placement and hierarchy

1. **Primary:** Hero and **`#availability`** — date entry, **Check Availability**, then **Continue with Inquiry** + **Book a Consult** when the date is open (unchanged).
2. **Secondary high-intent:** **Book a Consult** (Calendly) remains on the **unavailable** and **available** branches inside **`ContactAvailabilityForm`** (unchanged).
3. **Secondary lower-friction:** Inside the **same availability section**, **below** the main form, a **border-separated** block with a **smaller eyebrow/heading** (`text-xl` / muted `text-white/40` eyebrow), supporting copy, and a **less prominent** submit button (outline / `bg-white/5`, not amber primary).

## 4. Files touched

| File | Change |
|------|--------|
| `src/components/contact-secondary-inquiry-form.tsx` | **New** — compact fields (name, email, optional date/venue, message), honeypot, Turnstile, submits with `formType: "secondary_inquiry"`. |
| `src/app/contact/page.tsx` | Import secondary form; add **“Question before the next step”** block **under** `ContactAvailabilityForm`, still within `#availability` section container. |
| `src/app/api/contact/route.ts` | **`formType === "secondary_inquiry"`** → require only **name, email, message**; optional wedding date/venue; set **`inquirySource: "secondary_question"`** in email payload. |
| `src/lib/inquiry-email.ts` | **`inquirySource`** on **`InquiryPayload`**; subject/body headers distinguish **contact page question** vs **new inquiry**. |
| `src/components/contact-availability-form.tsx` | POST body includes **`formType: "availability_inquiry"`** for explicit primary-path labeling. |

## 5. Backend / API handling

- **Single** **`POST /api/contact`** pipeline: rate limit, honeypot, Turnstile, Resend — **unchanged**.
- **`formType: "secondary_inquiry"`** relaxes validation (no required wedding date/venue); empty optional fields are stored as **“Not provided yet”** for date/venue when missing.
- Emails are **labeled** in subject and body so operators can tell **secondary questions** from **availability-led** inquiries.

## 6. Analytics handling

**No new event names.** Reused existing **`contact_form_start`**, **`contact_form_submit_attempt`**, **`contact_form_submit_success`**, **`contact_form_submit_error`** with:

- **Primary path:** `form_type: "inquiry"`, `surface: "contact_form"` (existing).
- **Secondary path:** `form_type: "inquiry_secondary"`, `surface: "contact_page_secondary"`.

This separates paths in GA4 params without duplicating event families.

## 7. Validation results

| Check | Result |
|--------|--------|
| `npm run lint` | Pass |
| `npm run build` | Pass |

## 8. Manual QA notes

1. **Primary flow:** Pick date → check → available → **Continue with Inquiry** still works; **Book a Consult** still opens Calendly with **`calendly_click`**.
2. **Secondary form:** Submit with name/email/message + Turnstile → success copy; email subject should show **Contact question:** or **Contact page question** variant.
3. **Mobile:** Secondary block stacks; button is not amber-primary.
4. **No duplicate confusion:** Copy points users who want a full intake to **availability above**.

## 9. Non-regression confirmation

- **Check Availability** remains the **dominant** action in the hero and availability card; **amber** primary buttons unchanged on the main path.
- **Book a Consult** remains **visible** where it was (Calendly links); **not** placed below the secondary form in a way that demotes it relative to the new block (secondary is **below** the whole availability UI, consult stays **inside** availability outcomes).
- **contact_form_*** events still fire for the primary form; secondary uses **distinct** `form_type` / `surface` params.
- **Turnstile**, rate limit, honeypot, and **503** paths unchanged for misconfiguration.
- **Mobile** layout: additive section only.

**Explicit:** This pass did not weaken the **Check Availability** primary funnel, **Book a Consult**, **contact hierarchy** as specified, **analytics** (extended params only), **mobile usability**, or **backend submission safety**.

## Tone / claim-safety

Copy avoids positioning the secondary path as **preferred**; it explicitly steers full planning and date checks to **availability above**. No new venue or partnership claims.
