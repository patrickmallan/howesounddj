# HSDJ_CONTACT_BOTTOM_CTA_SCROLL_FIX_V1 — Stage FINAL

## 1. UX issue addressed

On `/contact`, the bottom **“Check Availability”** control used `CheckAvailabilityTrackedLink` with a hash target, but **clicking it while already on the contact page did not reliably scroll** to the availability / date area. The action felt like a **no-op**, which hurts trust and the path to completing the inquiry.

## 2. Root cause found

**Next.js `Link` client navigation** to the **same route with a hash** (or **`#availability` only**) often **does not** perform the browser’s normal **scroll-to-fragment** behavior. The destination section (`id="availability"`) was already correct; the problem was **interaction handling**, not a missing anchor.

## 3. Files touched

| File | Change |
|------|--------|
| `src/components/check-availability-tracked-link.tsx` | After the existing **`check_availability_click`** tracking, if the click applies to **same-page** navigation to `/contact#…` while `pathname === "/contact"`, or to a **`#…`** hash only, **resolve the element by id**, **`preventDefault`**, **`scrollIntoView({ behavior: "smooth", block: "start" })`**, and **`history.replaceState`** to sync the URL hash. If the element is missing or it is **not** a same-page hash case, **`Link` behaves as before** (e.g. navigate from other routes to `/contact#availability`). |
| `src/app/contact/page.tsx` | Hero and bottom **Check Availability** CTAs now use **`href="/contact#availability"`** (aligned with homepage / venues / venue pages) so the href is explicit and consistent. |

## 4. Exact target used for scroll behavior

- **DOM target:** `document.getElementById("availability")` — the existing **`section`** with **`id="availability"`** and **`scroll-mt-24`** (lines 87–90 of `contact/page.tsx`), which wraps the availability copy and **`ContactAvailabilityForm`** (date + inquiry flow).

## 5. Analytics tracking

**Unchanged.** Still a **single** `onClick` handler firing **`check_availability_click`** with **`surface`**, **`destination: "/contact"`**, **`page_path`**, and **`headlineVariantPayload()`** as before. **No** duplicate `trackEvent` calls and **no** new analytics events.

## 6. Validation results

| Check | Result |
|--------|--------|
| `npm run lint` | Pass |
| `npm run build` | Pass |

## 7. Manual QA notes (recommended)

1. **`/contact`**, scroll to bottom, click **Check Availability** → should **smooth-scroll** to the availability section (date / form area).
2. **Hero** **Check Availability** on the same page → same behavior.
3. From **another page** (e.g. `/`), link to **`/contact#availability`** → normal **navigation + scroll**; from **`/contact`**, other **Check Availability** links that use **`/contact#availability`** → **scroll only**, no redundant full navigation.
4. **Mobile:** confirm scroll lands under the sticky header region as before (`scroll-mt-24`).
5. **Console:** no errors from click handling.

## 8. Non-regression confirmation

This pass **did not**:

- Remove or weaken **`check_availability_click`** or **`surface`** semantics.
- **Change** default **`/contact`** navigation for CTAs that omit a hash (header/footer/defaults).
- **Break** inbound **`/contact#availability`** links from other pages (no hash handler runs when `pathname !== "/contact"` for `/contact#…` pattern, or when navigating from elsewhere).
- **Alter** form submission, availability API, or **Check Availability** funnel copy or hierarchy.

**Explicit:** Check Availability funnel, CTA analytics, contact page flow, mobile usability, and existing **`/contact#availability`** behavior on other pages remain **intact**; the shared component now **corrects same-page hash UX** without double-firing analytics.

## Success condition

The bottom (and hero) **Check Availability** on **`/contact`** **scrolls reliably** to the **availability** section where date entry and inquiry live, with **one analytics event per click** and **no dead** action when already on the contact page.
