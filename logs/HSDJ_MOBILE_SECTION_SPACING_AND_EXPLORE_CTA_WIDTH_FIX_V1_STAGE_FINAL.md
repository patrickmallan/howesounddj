# HSDJ_MOBILE_SECTION_SPACING_AND_EXPLORE_CTA_WIDTH_FIX_V1 — Stage FINAL

## 1. Issues addressed

1. **Oversized vertical gap** on mobile between **Venue familiarity** (after the venue card grid) and **Services / Support for the full wedding-day experience** — largely from **stacked `py-20`** on adjacent sections (80px + 80px).
2. **Explore** grid: **Check Availability** and **Book a Consult** appeared **narrow** vs full-width cards because merged **`CTA_PILL_FLEX_CENTER`** used **`inline-flex`**, which **does not stretch** to the grid cell like block-level **`flex`** links, and competed with **`flex flex-col`** on the card classes.

## 2. Root causes found

| Issue | Cause |
|-------|--------|
| Large venues → services gap | Homepage `#venues` inner wrapper and `#services` **SectionReveal** both used **`py-20`** on all breakpoints, doubling vertical padding at the boundary. |
| Narrow Explore CTAs | **`CheckAvailabilityTrackedLink` / `BookConsultTrackedLink`** always appended **`inline-flex`** (pill alignment), shrinking links to content width inside `<li>` grid cells and overriding intended **`flex flex-col`** card layout. |

## 3. Files touched

| File | Change |
|------|--------|
| `src/app/page.tsx` | Homepage section wrappers: **`py-14 md:py-20`** (and proof block **`py-14 md:py-16 lg:py-20`**) instead of uniform **`py-20`** on mobile for major bands (Why, Proof, Reviews, Venues, Services, About, FAQ, Contact). |
| `src/components/explore-site-links.tsx` | All Explore **`li`** items: **`min-w-0`**; all card links: **`w-full min-w-0`**. Check Availability / Book a Consult: **`visualLayout="card"`**. |
| `src/components/check-availability-tracked-link.tsx` | Optional **`visualLayout?: "pill" \| "card"`** (default **`pill`**). **`card`** applies only **`text-center`** + motion, not **`inline-flex`**, so caller **`flex flex-col`** survives. |
| `src/components/book-consult-tracked-link.tsx` | Same **`visualLayout`** behavior. |
| `logs/HSDJ_MOBILE_SECTION_SPACING_AND_EXPLORE_CTA_WIDTH_FIX_V1_STAGE_FINAL.md` | This document. |

## 4. Mobile spacing standard chosen

- **Mobile:** **`py-14`** (3.5rem) on listed homepage section containers.  
- **md+:** **`py-20`** (or **`py-16`** for proof inner at md, **`lg:py-20`** preserved).  
- **Desktop (lg):** Existing **`lg:px-8`** and hero unchanged.

This trims the **venues ↔ services** seam by **2.5rem** total (1.25rem less bottom on venues + 1.25rem less top on services vs before on small screens) while keeping rhythm aligned across sections.

## 5. Explore CTA/card sizing fix

- **Full width:** **`w-full min-w-0`** on every Explore card control + **`min-w-0`** on **`li`** (grid overflow safety).  
- **Layout:** **`visualLayout="card"`** on the two tracked links so **`flex flex-col justify-center`** from the shared card `className` is not replaced by pill **`inline-flex`**.  
- **Hierarchy:** Unchanged — Check Availability keeps **amber** card styling; Book a Consult keeps **neutral/outline** card styling.

## 6. Validation results

- `npm run lint` — pass  
- `npm run build` — pass  

## 7. Manual QA checklist

1. Mobile homepage: scroll **Venue familiarity** → **Services** — spacing feels closer to other section transitions.  
2. Mobile **Explore**: all seven tiles (four primary + Check Availability + Book a Consult + Whistler & Vancouver) — **equal full-width** footprint in one column.  
3. Check Availability still reads as **primary** (amber tile).  
4. Book a Consult still **secondary** (neutral tile).  
5. Desktop homepage: section density unchanged at **md+** (`py-20`).  
6. No horizontal scroll; tap targets unchanged.  
7. CTA labels still **centered** (`text-center` on card layout).

## 8. Non-regression confirmation

- **No copy, routes, or tracking** changes.  
- **`SectionReveal` / motion** unchanged — only padding utilities on section wrappers.  
- **Pill CTAs** site-wide still default **`visualLayout="pill"`** with existing **`CTA_PILL_FLEX_CENTER`**.  
- **Header / nav** untouched.

## Success condition

Mobile homepage **section spacing** is **tighter and consistent** at major boundaries, and **Explore** tiles share a **full-width card footprint** on small screens while preserving **primary / secondary** visual hierarchy.
