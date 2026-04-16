# HSDJ_SECONDARY_INQUIRY_DATE_UX_V1 — Stage FINAL

**Pack ID:** HSDJ_SECONDARY_INQUIRY_DATE_UX_V1  
**Commit:** `7841d2d005bb4221cfa1194415aeb3aba1d0ee47` (at time of discovery; amend if you commit after this pass)

## 1. UX issue addressed

The secondary inquiry form’s optional wedding date used a **native `<input type="date">`**. On many desktop browsers the **built-in calendar control is only obvious after focus/tab**, so users had to discover it indirectly. There was **no always-visible** control to open the picker, unlike the clearer segmented + calendar affordance story in the availability section.

## 2. Actual date control type found in repo

**Native single-field date input** (`type="date"`) in `ContactSecondaryInquiryForm`, state held as `weddingDateOptional` (YYYY-MM-DD string), submitted as `weddingDate` in the existing JSON body.

The **availability** flow uses **segmented** year/month/day inputs with auto-advance in `contact-availability-form.tsx`; the secondary inquiry form did **not** use that pattern.

## 3. Implementation path chosen

**Path B (native date retained):** Keep the native date input for consistent browser/mobile behavior and unchanged payload shape. Add:

- A **relative wrapper** around the input  
- A **visible calendar button** (amber-styled, icon) aligned to the **right inside the field**  
- **`showPicker()`** when supported (with **try/catch** and **focus** fallback), otherwise **focus** the input  
- **`pr-12`** on the input so the value does not run under the button  

No custom calendar UI, no change to validation or API contract.

## 4. Files touched

| File | Change |
|------|--------|
| `src/components/contact-secondary-inquiry-form.tsx` | Split `inputClass` into `inputClassBase` + `inputClass`; add `weddingDateInputRef`, `openWeddingDatePicker`, wrap date field with relative container + visible button |

## 5. Auto-advance behavior added or preserved

**Not applicable** to this form: it remains a **single** native date field. **Auto-advance (year → month → day)** stays on the **availability** segmented inputs only; no duplication of that logic was introduced here.

## 6. Visible calendar affordance approach used

- **`type="button"`** with **`aria-label="Open calendar to choose wedding date"`**  
- Inline **calendar outline SVG** (`aria-hidden`), amber tones matching the site  
- Positioned **`absolute right-2`**, `z-10` above the field, **focus-visible** ring for keyboard users  

## 7. Validation results

- `npm run lint` — **pass**  
- `npm run build` — **pass**  

## 8. Manual QA notes

Recommended checks in the browser (contact page → secondary inquiry form):

1. Wedding date row shows a **visible calendar icon/button** without tabbing first.  
2. **Click** the button: native picker opens where `showPicker` is supported; otherwise input **focuses** and native UX proceeds.  
3. **Type or use the native control** to set a date; value still updates and submits as before.  
4. **Tab order:** label → date input → calendar button → following fields (sensible; button is after input in tab order).  
5. **Mobile:** no horizontal overflow; tap targets remain usable; native mobile date UX unchanged in nature.  
6. Submit with Turnstile: inquiry still succeeds; `weddingDate` still optional string.

## 9. Non-regression confirmation

This pass did **not** weaken:

- **Inquiry form submission flow** — same `fetch("/api/contact")` body, same `formType: "secondary_inquiry"`, same `weddingDate` trimming.  
- **Mobile usability** — native `type="date"` preserved; button is in-flow visually without replacing native behavior.  
- **Keyboard accessibility** — label `htmlFor` unchanged; button has an accessible name and focus styles; no focus trap added.  
- **Backend / date payload handling** — no changes to `src/app/api/contact/route.ts` or email assembly for this task.  
- **Contact page hierarchy** — only the date field presentation inside the existing form component changed.

---

**Success:** The secondary inquiry wedding date field keeps native date behavior, adds a **visible** calendar trigger at rest, and avoids relying solely on focus-revealed browser chrome for discoverability.
