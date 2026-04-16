# HSDJ_SECTION_VERTICAL_RHYTHM_FIX_V1 — Stage FINAL

## 1. Visual issue addressed

On `/contact`, the bottom **“Ready when you are”** gradient CTA panel was **horizontally fine** but felt **stuck to the section above** (“Why reach out now” / `border-y` block). It did not read as its own **vertically contained** block with clear separation from the preceding section.

## 2. Root cause found

The CTA lived in a `<section>` that used **`pb-20` only** (`px-6 pb-20 lg:px-8`)—**no top padding**. The section immediately above uses the site’s usual **`py-20`** on its inner wrapper and a **`border-y`** treatment. With **zero `pt-*`** on the CTA section, the rounded panel began **immediately under** that visual break with no **matching top breathing room**, so the block felt **attached** to the content above instead of sitting inside a balanced vertical band.

There were **no** negative margins or `translate` on this stack; the issue was **asymmetric section padding** (bottom-only).

## 3. Files touched

| File | Change |
|------|--------|
| `src/app/contact/page.tsx` | Bottom CTA section: `pb-20` → **`py-20`** so top and bottom padding match the established section rhythm used elsewhere on the same page (e.g. the “Partial details” section). |

## 4. Local vs shared

**Local to the contact page.** The bottom CTA wrapper is not a shared component; other routes use similar `pb-20`-only patterns where the last section is the page footer, but here the CTA is **between** two major sections, so the same `pb-20`-only contract was inappropriate.

## 5. Spacing / section contract after fix

- **Contract:** Marketing sections on this page use **`py-20`** on the outer wrapper (or equivalent inner `py-20` inside `max-w-6xl`) for **symmetric** vertical padding.
- **Applied:** `className="mx-auto max-w-6xl px-6 py-20 lg:px-8"` on the **“Ready when you are”** section—aligns with the **“You do not need a perfect brief”** block (`py-20` at line 134) and gives **clear top and bottom** space around the CTA panel.

## 6. Validation results

| Check | Result |
|--------|--------|
| `npm run lint` | Pass |
| `npm run build` | Pass |

## 7. Manual QA notes (recommended)

1. **Desktop:** Open `/contact`, scroll to **“Ready when you are”**—confirm **space above** the panel (between the border-y section and the card) feels **intentional** and similar to spacing below / other sections.
2. **Tablet:** Confirm spacing still feels balanced.
3. **Mobile:** Confirm **`py-20`** does not feel like a **huge** gap; it should match other `py-20` sections on the page.

## 8. Non-regression confirmation

This pass **did not**:

- Change **Check Availability** links, `href`, `surface`, or button **order**.
- Change **copy**, **CTA text**, or **analytics** instrumentation.
- Introduce **negative margins** or arbitrary one-off pixel values.
- Add a **new component**; only adjusted **Tailwind padding** on the existing section.

**Explicit:** Check Availability funnel, CTA hierarchy, analytics instrumentation, mobile usability, and contact page flow were preserved; only **symmetric vertical padding** on the CTA section wrapper was added.

## Success condition

The **“Ready when you are”** CTA sits in a section with **clear top and bottom padding**, consistent with the rest of the contact page, so the panel reads as **its own block** rather than **attached** to the section above.
