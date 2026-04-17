# HSDJ_MOBILE_MENU_AUTO_CLOSE_V1 — Stage FINAL

## 1. UX issue addressed

On **mobile**, the primary navigation lived inside a native **`<details>` / `<summary>`** “Menu” control. After tapping a route link (Weddings, Packages, About, Reviews, FAQ, Contact / Check Availability copy), the app **navigated** correctly, but the **expanded menu stayed open** until the user toggled **Menu** again—unfinished, extra-tap friction.

## 2. Root cause found

There was **no programmatic close** tied to navigation. The **`<details>`** element remained **`open`** after **Next.js** client navigation because **nothing** reset **`open`** on route change or link activation.

## 3. Files touched

| File | Change |
|------|--------|
| `src/components/site-chrome.tsx` | Added **`ref`** on the mobile **`<details>`**, **`closeMobileMenu`** (sets **`open = false`**), **`useEffect`** on **`pathname`** to close after route changes, and **`onClick={closeMobileMenu}`** on each mobile **`Link`** in the shared **`navLinks`** map. |

## 4. Implementation strategy used

- **Per-link close:** **`onClick={closeMobileMenu}`** on every mobile nav **`Link`** so the panel dismisses **immediately** on tap (including when **`pathname`** might not change for edge cases).
- **Route-change safeguard:** **`useEffect`** depending on **`pathname`** calls **`closeMobileMenu`** so any **client-side** navigation also leaves the menu **closed** (Tier-S deterministic reset).

Desktop **`<nav>`** (hidden on small screens) is **unchanged**. **`CheckAvailabilityTrackedLink`** in the header (outside the menu) is **untouched**. **`navLinks`**, **`isActiveNavHref`**, and **`aria-current`** behavior are **unchanged**.

## 5. Validation results

| Check | Result |
|--------|--------|
| `npm run lint` | Pass |
| `npm run build` | Pass |

**Git at validation:** `6068c69` — `chore: commit pending changes`

## 6. Manual QA notes

Recommended checks on a **narrow / mobile** viewport (or device toolbar):

1. Open **Menu**, tap **Wedding DJ Services** → lands on **`/weddings`**, menu **closed**.
2. Repeat for **Packages**, **Reviews**, **About**, **FAQ**, **Contact** (labeled Check Availability in the list).
3. Open **Menu** on **`/contact`**, tap **Contact** again → menu **closes**; CTA behavior on the **amber** header button should match **prior** behavior (tracked link, same-page scroll on contact).
4. **Desktop** width: nav links **unchanged**; no mobile **`<details>`** regression.
5. Watch for **double navigation** or **flash**—none expected from **`open = false`** alone.

## 7. Non-regression confirmation

This pass **did not**:

- Change **desktop** primary nav markup, links, or styling.
- Modify **`CheckAvailabilityTrackedLink`** (header/footer CTAs, analytics, same-page **`/contact`** scroll behavior).
- Alter **`navLinks`** labels, **`href`s**, or **active-state** logic (**`isActiveNavHref`** + **`aria-current`** preserved on both desktop and mobile lists).
- Add **duplicate** navigations or **replace** **`Link`** with custom routing.

**Explicit non-regression:** This pass did **not** weaken **desktop navigation**, **Check Availability CTA** behavior (including analytics and contact-page scroll), **active-route highlighting**, **mobile usability** (summary still toggles the menu; links still behave as links), or **navigation reliability**.

## Success condition

On **mobile**, tapping a **menu item** both **navigates** to the selected page and **closes** the expanded menu **automatically**, with **no extra tap** required to dismiss the panel.
