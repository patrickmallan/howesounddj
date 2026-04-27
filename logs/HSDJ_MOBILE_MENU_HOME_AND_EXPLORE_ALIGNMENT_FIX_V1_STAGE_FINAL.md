# HSDJ_MOBILE_MENU_HOME_AND_EXPLORE_ALIGNMENT_FIX_V1 — Stage FINAL

## 1. Issues fixed

1. **Mobile menu** had no explicit **Home** entry; users had to infer the logo was home.
2. **Explore** tiles mixed alignment: plain `Link` cards were effectively **left-aligned** text; **Check Availability** and **Book a Consult** used **`visualLayout="card"`** with merged **`text-center`**, so labels looked **centered**.

## 2. Files touched

| File | Change |
|------|--------|
| `src/components/site-chrome.tsx` | Mobile `<nav>`: **Home** `Link` to **`/`** as **first** row; **`onClick={closeMobileMenu}`**; **`aria-current="page"`** when `pathname === "/"`**; **`text-left`** on Home and existing nav rows for consistency. |
| `src/components/check-availability-tracked-link.tsx` | **`visualLayout === "card"`** alignment: **`text-center` → `text-left`**. |
| `src/components/book-consult-tracked-link.tsx` | Same **`text-left`** for **`card`**. |
| `src/components/explore-site-links.tsx` | Shared **`exploreCardBase`** (`text-left`, padding, flex, full width); all seven tiles use base + variant border/colors. |
| `logs/HSDJ_MOBILE_MENU_HOME_AND_EXPLORE_ALIGNMENT_FIX_V1_STAGE_FINAL.md` | This document. |

## 3. Menu update details

- **Label:** Home  
- **Href:** `/`  
- **Position:** First item in the mobile dropdown, **before** Wedding DJ Services.  
- **Behavior:** Same block row styling and **amber active** state as other items when `pathname === "/"`.  
- **Close:** Uses existing **`closeMobileMenu`** on click; **`useEffect`** still closes on route change.

## 4. Explore alignment correction

- **`exploreCardBase`** enforces **`text-left`** (and unchanged **`px-6 py-5`**, **`justify-center`** for vertical centering of content in the tile — does not center text horizontally when combined with **`text-left`**).  
- Tracked links with **`visualLayout="card"`** no longer inject **`text-center`**.  
- **Width / hierarchy:** Full-width **`w-full`**, **`min-w-0`**, and amber vs neutral card styles unchanged.

## 5. Validation results

- `npm run lint` — pass  
- `npm run build` — pass  

## 6. Manual QA checklist

1. **Mobile menu:** Home first; tap → `/`; menu closes; on `/`, Home shows active styling.  
2. **Explore (mobile):** All cards left-aligned copy; no center jump on Check Availability / Book a Consult.  
3. **Desktop:** Header/nav unchanged (Home only in mobile panel).  
4. **Tiles:** Full width, tappable, no horizontal scroll.

## 7. Non-regression confirmation

- **Desktop** primary nav unchanged; no Home row added there.  
- **Routes, tracking, CTA colors** unchanged.  
- **Pill CTAs** still use **`visualLayout="pill"`** (default) with **`CTA_PILL_FLEX_CENTER`**.  

## Success condition

Mobile menu includes a clear **Home** link, and **all** homepage Explore tiles share **left-aligned** labels and the same structural classes, with no mixed center/left treatment.
