# HSDJ_SECONDARY_INQUIRY_SEGMENTED_DATE_V1 — Stage FINAL

**Pack ID:** HSDJ_SECONDARY_INQUIRY_SEGMENTED_DATE_V1  
**Commit (at verification):** `b8ca506bcb123b70c2f4431768572d10cb7718ea`

## 1. Why native date input was replaced

A single `<input type="date">` delegates year/month/day behavior to the **browser**, so **true auto-advance between segments while typing** is not controllable in a consistent way. The product goal was parity with the **availability** flow: fluid digit entry, explicit advance rules, and predictable backspace between fields.

## 2. Segmented date UX implemented

In `ContactSecondaryInquiryForm`:

- Three **text** fields with **`inputMode="numeric"`**, **`maxLength`**, and **digits-only** filtering (non-digits stripped, per-field max length).
- **Auto-advance:** valid 4-digit year (2000–2100) → focus month; valid 2-digit month (01–12) → focus day. Uses the same **`isForwardInput`** guard as the availability form so deletes do not trigger spurious jumps.
- **Backspace:** when **month** is empty, Backspace moves focus to **year**; when **day** is empty, Backspace moves focus to **month** (empty-field rule only; avoids fighting normal editing).
- **Validation:** `composedWeddingDate` builds **`YYYY-MM-DD`** only when all three segments are full and the date is **calendar-valid** (same logic pattern as `contact-availability-form.tsx`).

## 3. Submitted date format preserved

The contact API still receives a single **`weddingDate`** string:

- **Complete valid date:** `YYYY-MM-DD` (e.g. `2026-06-20`).
- **Optional / incomplete / invalid:** **`""`** (empty string), matching the prior “optional string” contract—no partial dates are sent.

`formType: "secondary_inquiry"` and the rest of the JSON body are unchanged.

## 4. Files touched

| File | Change |
|------|--------|
| `src/components/contact-secondary-inquiry-form.tsx` | Native date + calendar button removed; segmented Y/M/D with helpers, auto-advance, backspace navigation; submit uses composed `weddingDatePayload`. |

## 5. Validation results

- `npm run lint` — **pass**
- `npm run build` — **pass**

## 6. Manual QA notes

Suggested browser checks on `/contact` (secondary inquiry form):

1. Type **2026** → focus moves to month.
2. Type **06** → focus moves to day.
3. Type **20** → focus stays on day.
4. With **day** empty, Backspace → focus **month**; with **month** empty, Backspace → focus **year**.
5. Submit with a full valid date → success path unchanged (Turnstile + API).
6. Submit with all date fields blank → optional; `weddingDate` should be `""`.
7. On a phone, confirm **numeric** keyboard and layout (no horizontal overflow in the date row).

## 7. Whether the calendar button was retained or intentionally removed

**Intentionally removed.** Pairing a visible native `showPicker` control with **three separate text fields** would either sync awkwardly with partial entry or suggest a second “source of truth.” Per the pack decision rule, **typing UX and a single clear model** took priority; no third-party calendar and no confusing hybrid.

## 8. Non-regression confirmation

This pass did **not** weaken:

- **Inquiry form submission flow** — same `POST /api/contact` shape, same `formType`, Turnstile, and field names for the rest of the form.
- **Backend `weddingDate` handling** — still one string; valid dates remain ISO-style `YYYY-MM-DD`; empty when optional/not fully valid.
- **Mobile usability** — `inputMode="numeric"` preserved; segmented layout uses flex-wrap to avoid forced horizontal overflow.
- **Keyboard accessibility** — visible labels via `htmlFor` on the year field plus **`aria-label`** on each segment; tab order is year → month → day; backspace handlers do not create a focus trap.
- **Contact page hierarchy** — only the wedding date control inside the existing secondary inquiry form changed.

---

**Success:** The secondary inquiry wedding date supports **auto-advance** and **backspace navigation** between segments while preserving the **existing `weddingDate` payload contract**.
