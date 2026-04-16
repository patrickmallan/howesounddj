# HSDJ_CONTACT_FOOTER_CTA_SCROLL_FIX_V1 — Stage FINAL

## 1. UX issue addressed

On **`/contact`**, the **footer** (black/outline) **“Check Availability”** control uses the shared **`CheckAvailabilityTrackedLink`** with the **default** `href="/contact"` (no hash). Clicking it while already on the contact page performed **same-route navigation** with **no scroll** to the date/availability area, so the action felt **dead**.

## 2. Root cause found

**`CheckAvailabilityTrackedLink`** only applied same-page **smooth scroll** when `href` included **`#…`** or **`/contact#…`**. The footer (and header) CTAs rely on the **default** **`/contact`** URL, which **did not** enter that branch, so **`pathname === "/contact"`** still resulted in **no** scroll-to-fragment behavior.

## 3. Files touched

| File | Change |
|------|--------|
| `src/components/check-availability-tracked-link.tsx` | In **`hashIdForSamePageScroll`**, when **`href === "/contact"`** and **`pathname === "/contact"`**, return **`"availability"`** so the existing click handler **`preventDefault`s**, **`scrollIntoView`**, and updates the hash—same as explicit **`/contact#availability`** links. |

No footer layout or class changes; **`surface="footer"`** unchanged.

## 4. Exact target used for the CTA

- **DOM:** `document.getElementById("availability")` — the existing **`section`** on **`/contact`** that wraps the availability copy and **`ContactAvailabilityForm`** (includes date input), with **`scroll-mt-24`** for header offset.

## 5. Analytics tracking

**Preserved.** Still **one** **`check_availability_click`** per click with **`surface`** (e.g. **`footer`**), **`destination: "/contact"`**, **`page_path`**, and **`headlineVariantPayload()`** — **no** duplicate events and **no** new handlers.

## 6. Validation results

| Check | Result |
|--------|--------|
| `npm run lint` | Pass |
| `npm run build` | Pass |

## 7. Manual QA notes (recommended)

1. **`/contact`**, scroll to footer, click **Check Availability** → should **smooth-scroll** to the availability section.
2. **Other pages** (e.g. `/`) → footer CTA still **navigates** to **`/contact`** (no premature scroll; **`pathname !== "/contact"`**).
3. **Mobile:** same behavior; no layout change.
4. **Console:** no errors.

## 8. Non-regression confirmation

This pass **did not**:

- Change **footer** markup, spacing, or **Check Availability** **styling**.
- Remove or alter **analytics** payload shape (beyond route logic inside the existing handler).
- Affect **non-contact** pages: default **`/contact`** only gains scroll behavior when **`pathname === "/contact"`** and the **`#availability`** element exists.

**Explicit:** Check Availability funnel, CTA analytics, footer layout, contact page flow, and existing **non-contact** CTA behavior (navigate to `/contact`) remain **intact**; **`/contact`** now gets a **useful scroll** for default **`href="/contact"`** links (footer and header).

## Success condition

The **black footer-area** **“Check Availability”** on **`/contact`** **scrolls reliably** to the **availability / date-input** section instead of behaving like a **no-op**.
