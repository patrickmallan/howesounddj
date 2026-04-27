# HSDJ_MOBILE_VENUE_FAMILIARITY_VISIBILITY_FIX_V1 — Stage FINAL

## 1. Root cause

The homepage **Venue familiarity** block is wrapped in **`SectionReveal`**, which used Framer Motion `whileInView` with **`amount: 0.12`** (12% of the element must be visible to trigger).

On **mobile**, the venue grid is a **single column** of many cards (~22), so the **`motion.section`** is **very tall**. For Intersection Observer, the **maximum** intersection ratio for a target much taller than the viewport is roughly **viewport height ÷ section height**. That ratio often stays **below 12%**, so **`whileInView` never fired**, the section stayed at **`opacity: 0`**, and users saw a long **empty gap** (layout still reserved; content invisible) between **Client backed** and **Support for the full wedding-day experience**.

**Desktop** often stayed OK because multi-column grids shorten the section, raising the max intersection ratio above the threshold.

The same **`amount: 0.08`** risk existed on **`StaggerGroup`** for long grids; it was relaxed in the same pass.

## 2. Files touched

| File | Change |
|------|--------|
| `src/components/motion/section-reveal.tsx` | `viewport.amount` **0.12 → 0.01**; replace shrinking **`margin: "-48px"`** with **`"0px 0px 80px 0px"`** (easier early trigger); comment documents tall-section behavior. |
| `src/components/motion/stagger-reveal.tsx` | `StaggerGroup` **`viewport.amount` 0.08 → 0.01**; **`margin`** aligned with section reveal. |
| `logs/HSDJ_MOBILE_VENUE_FAMILIARITY_VISIBILITY_FIX_V1_STAGE_FINAL.md` | This document. |

## 3. Exact fix

- **`SectionReveal`:** `viewport: { once: true, margin: "0px 0px 80px 0px", amount: 0.01 }`
- **`StaggerGroup`:** `viewport: { once: true, margin: "0px 0px 80px 0px", amount: 0.01 }`

Motion still respects **`useReducedMotion`** (unchanged). No homepage markup or copy changes.

## 4. Desktop / mobile validation

- **Mobile:** As soon as a small slice of the venues section enters the viewport (≥~1% visibility), the reveal runs; **Venue familiarity** heading, body copy, and cards become visible; gap disappears.
- **Desktop:** Slightly earlier / easier in-view triggers; entrance animation preserved; layout unchanged.

## 5. Lint / build results

- `npm run lint` — pass  
- `npm run build` — pass  

## 6. Non-regression confirmation

This pass did **not**:

- Remove or rewrite the **Venue familiarity** section or **CTA** hierarchy  
- Change **availability**, **routing**, or **content**  
- Introduce **horizontal overflow** (no layout/CSS width changes)  
- Disable motion for users who prefer reduced motion  

It **only** made **`whileInView` thresholds realistic for very tall sections** on narrow viewports.

## Success condition

**Venue familiarity** is **visible and properly spaced on mobile**, with **no blank invisible gap**, and **desktop** behavior remains **acceptable or improved** (reveal still subtle, triggers reliably).
