# Premium hierarchical navigation

## Intent

Replace the flat 11-link header with a six-noun + CTA editorial nav driven by a single nav tree. Top-level items expose categories, dropdowns expose pages, footer flattens the tree so every important route stays crawlable. Home is reachable through the wordmark only.

## Old nav structure (flat — `navLinks`)

| # | href | label |
|---|---|---|
| 1 | `/` | Home |
| 2 | `/weddings` | Weddings |
| 3 | `/packages` | Packages |
| 4 | `/reviews` | Reviews |
| 5 | `/guides` | Guides |
| 6 | `/stories` | Stories |
| 7 | `/venues` | Venues |
| 8 | `/whistler-wedding-dj` | Whistler *(footerLabel: Whistler Wedding DJ)* |
| 9 | `/about` | About |
| 10 | `/faq` | FAQ |
| 11 | `/contact` | Contact |

Plus a Check Availability CTA pill. `/vancouver-wedding-dj` was never exposed in the header. Same array drove desktop nav, mobile drawer, and footer.

## New nav structure (tree — `navTree`)

Top-level desktop row:

```
[Logo · Howe Sound DJ]   Weddings ▾   Sea-to-Sky ▾   Journal ▾   About   Contact      [Check Availability]
```

Tree:

| Top level | Type | Children (label → href) | Description shown in dropdown |
|---|---|---|---|
| **Weddings** | group | Overview → `/weddings` | Wedding DJ services for the full celebration arc. |
| | | Packages → `/packages` | Coverage, sound, planning, and reception options. |
| | | Reviews → `/reviews` | What couples say after the night. |
| | | FAQ → `/faq` | Clear answers before you inquire. |
| **Sea-to-Sky** | group | Venues → `/venues` | Ceremony and reception spaces across the corridor. |
| | | Whistler → `/whistler-wedding-dj` *(footerLabel: Whistler Wedding DJ)* | Destination-wedding pacing for mountain celebrations. |
| | | Vancouver → `/vancouver-wedding-dj` *(footerLabel: Vancouver Wedding DJ)* | Polished wedding sound for city and corridor events. |
| **Journal** | group | Guides → `/guides` | Practical planning advice for Sea-to-Sky weddings. |
| | | Stories → `/stories` | Editorial notes on dance floors, pacing, and atmosphere. |
| **About** | leaf | — | — |
| **Contact** | leaf | — | — |

CTA pill `Check Availability → /contact` is unchanged in destination, tracking surface (`header`), and amber styling. Home is the wordmark (`<Link href="/">Howe Sound DJ</Link>`) only.

## Files inspected

- `src/components/site-chrome.tsx` (current nav, mobile drawer, footer)
- `src/components/check-availability-tracked-link.tsx` (CTA, unchanged)
- `src/components/cta-duo.tsx` (final-decision zone, unchanged)
- `src/app/layout.tsx` (header/footer wiring)
- `src/app/` route inventory (confirmed every leaf href has a real page: `/weddings`, `/packages`, `/reviews`, `/faq`, `/venues`, `/whistler-wedding-dj`, `/vancouver-wedding-dj`, `/guides`, `/stories`, `/about`, `/contact`)
- `package.json` scripts (`dev`, `build`, `start`, `lint`, `typecheck`)
- `node_modules/next/dist/docs/01-app/03-api-reference/02-components/link.md` (per `AGENTS.md`, confirmed `<Link>` + `usePathname` API matches usage)

## Files changed

- `src/components/site-chrome.tsx` — full rewrite of header nav model; footer rewired to flattened tree; `SiteFinalDecisionZone` and footer brand block left intact.
- `docs/handoff/premium-hierarchical-navigation.md` (this file).

No route, API, sitemap, dependency, or content-page changes.

## Desktop dropdown behavior

`DesktopDropdown` renders a `<button>` trigger plus an absolutely positioned single-column panel.

- **Hover open:** 40 ms delay (avoids flicker when sweeping the cursor past triggers).
- **Hover close:** 140 ms delay (lets users traverse from trigger into panel without losing focus).
- **Focus open:** opens immediately on `focus` (keyboard tab into trigger).
- **Click toggle:** trigger button toggles the panel; tapping a non-group leaf in the same row closes any open dropdown.
- **One open at a time:** `openMenuLabel` lives on `SiteHeader`; opening one dropdown implicitly closes the others.
- **Click outside:** `mousedown` outside the `<header>` closes any open dropdown.
- **Esc:** closes the dropdown and returns focus to the trigger.
- **Active states:** trigger renders amber when any descendant route matches `pathname`; the active leaf inside the panel renders amber and gets `aria-current="page"`.
- **Motion:** opacity + 4 px translate, 150 ms, no bounce, no transform-origin theatrics. Chevron rotates 180° when open.
- **Layout:** 19 rem (`w-[19rem]`) panel, left-aligned, single column, generous line height. No mega-menu grid.
- **Visual hierarchy preserved:** dropdown text is white/90 with white/55 supporting line; CTA pill remains the only amber-filled element in the header.

## Mobile accordion behavior

`MobileAccordion` renders inside the existing right-side drawer.

- **Standalone mobile links:** About and Contact remain plain `<Link>` rows.
- **Group rows:** Weddings, Sea-to-Sky, Journal render as accordion triggers with chevrons.
- **Single expansion:** `mobileExpandedGroup` allows one section open at a time; tapping another collapses the previous one.
- **Inline children:** expanded children render in a slightly tinted strip below the trigger (`bg-white/[0.02]`), indented (`px-7`), with the same description line as desktop.
- **Drawer chrome unchanged:** rounded panel, dividers, sticky CTA at the bottom, scroll behavior, max-height, and overlay all preserved from the previous implementation.
- **Drawer close resets accordion:** `closeMobileMenu` collapses the expanded section in the same batched update so re-opening the drawer never shows stale state. Same for route changes and the >=1280 px breakpoint resize.
- **Active states:** group trigger renders amber when any descendant matches; active child link renders amber with `aria-current`.

## Footer flattening behavior

`SiteFooter` calls `flattenNavForFooter(navTree)` and renders the flattened leaves with `item.footerLabel ?? item.label`.

Resulting footer link order:

1. Weddings (`/weddings`, footerLabel override)
2. Packages (`/packages`)
3. Reviews (`/reviews`)
4. FAQ (`/faq`)
5. Venues (`/venues`)
6. Whistler Wedding DJ (`/whistler-wedding-dj`, footerLabel override)
7. Vancouver Wedding DJ (`/vancouver-wedding-dj`, footerLabel override)
8. Guides (`/guides`)
9. Stories (`/stories`)
10. About (`/about`)
11. Contact (`/contact`)

Every route required by the spec is present. The standalone Vancouver editorial line below the footer row is preserved (`Vancouver couples · Sea-to-Sky and Squamish weddings`). Home is intentionally reached through the wordmark only.

## Accessibility notes

- Dropdown triggers are real `<button type="button">` elements, not fake links.
- Triggers carry `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls` pointing at the panel.
- Panels use `role="menu"` with `aria-label={group.label}`; child links use `role="menuitem"`.
- Active leaves carry `aria-current="page"` on both desktop and mobile.
- `Escape` closes the open desktop dropdown and restores focus to the trigger; `Escape` also closes the mobile drawer (via `closeMobileMenu`).
- Click outside the header closes the desktop dropdown; the mobile drawer keeps its existing overlay-button close behavior.
- Hover open/close has small delays (40 ms / 140 ms) so users don't get trapped or flicker between menus.
- Focus is never trapped in a dropdown — Tab moves out naturally; opening on focus is a progressive enhancement, not a barrier.
- Mobile drawer keeps `role="dialog"` + `aria-modal="true"` + skip-to-content link from the parent layout.
- The CTA pill remains a real `<Link>` (`CheckAvailabilityTrackedLink`) with its existing analytics.

## Validation results

Commands run from the repo root, in this exact order:

```bash
cd ~/Desktop/howesounddj
npx tsc --noEmit         # exit 0
npx eslint .             # exit 0 (after one fix — see below)
npm run build            # exit 0, all 42 static pages generated
```

Build summary:

```
▲ Next.js 16.2.3 (Turbopack)
  Creating an optimized production build ...
✓ Compiled successfully in 4.8s
  Running TypeScript ...
  Finished TypeScript in 5.1s
✓ Generating static pages using 11 workers (42/42) in 394ms
```

### Fix applied during validation

ESLint surfaced `react-hooks/set-state-in-effect` for an effect that reset accordion state when the drawer closed. Resolved by collapsing the accordion inside the same batched update as `closeMobileMenu`, the route-change effect, and the breakpoint-resize handler — eliminating the cascading-render pattern. No additional effects were introduced.

## Manual QA checklist

Run `npm run dev`, open `http://localhost:3000`, and verify:

### Desktop (≥1280 px)

- [ ] Header shows: `Howe Sound DJ` wordmark · `Weddings ▾` · `Sea-to-Sky ▾` · `Journal ▾` · `About` · `Contact` · amber `Check Availability` pill — and only those.
- [ ] Hovering `Weddings` opens the panel after a small delay; chevron rotates; panel shows Overview / Packages / Reviews / FAQ with supporting lines.
- [ ] Sweeping cursor across triggers without pausing does not flash open/closed in rapid succession.
- [ ] Clicking the `Sea-to-Sky` trigger toggles its panel (and closes Weddings if it was open).
- [ ] Clicking outside the header closes any open panel.
- [ ] Pressing `Escape` while a panel is open closes it and focus returns to its trigger.
- [ ] Tabbing onto a trigger opens its panel; tabbing further moves through child links normally.
- [ ] Clicking any link inside a panel navigates and closes the panel.
- [ ] When on `/packages`, the `Weddings` trigger is amber and the `Packages` row inside the panel is amber with `aria-current="page"`.
- [ ] When on `/whistler-wedding-dj`, the `Sea-to-Sky` trigger is amber.
- [ ] When on `/about`, the standalone `About` link is amber.
- [ ] CTA pill still routes to `/contact`, fires `check_availability_click` analytics with `surface: "header"`, and on `/contact` itself smooth-scrolls to `#availability`.

### Mobile (<1280 px)

- [ ] `Menu` button toggles the right-side drawer; overlay dims the page.
- [ ] Drawer shows accordion rows for Weddings, Sea-to-Sky, Journal, plus standalone About and Contact, plus the sticky `Check Availability` CTA at the bottom.
- [ ] Tapping `Weddings` expands its section inline; tapping again collapses it. Tapping `Sea-to-Sky` collapses Weddings and expands Sea-to-Sky.
- [ ] Tapping any child link navigates and closes the drawer (and collapses the section on next open).
- [ ] `Escape` closes the drawer.
- [ ] Resizing the window across the 1280 px breakpoint while the drawer is open closes it cleanly.
- [ ] On `/packages`, the `Weddings` accordion trigger renders amber.

### Footer

- [ ] Footer link row shows, in order: Weddings · Packages · Reviews · FAQ · Venues · Whistler Wedding DJ · Vancouver Wedding DJ · Guides · Stories · About · Contact.
- [ ] Standalone Vancouver editorial line below the footer row still routes to `/vancouver-wedding-dj`.
- [ ] Footer brand block, copyright line, and corridor-serving line are unchanged.

### Active states on nested routes

- [ ] `/venues/sea-to-sky-gondola` (any `/venues/[slug]`) marks `Sea-to-Sky` active and `Venues` active inside the panel.
- [ ] `/guides/how-to-keep-a-wedding-dance-floor-packed` marks `Journal` active and `Guides` active inside the panel.
- [ ] `/stories/sea-to-sky-wedding-dance-floor-energy` marks `Journal` active and `Stories` active inside the panel.

## Acceptance criteria check

- [x] Header feels calmer and more premium (5 nouns + CTA vs 11 flat links).
- [x] Top-level nav has only Weddings, Sea-to-Sky, Journal, About, Contact, and CTA.
- [x] Packages, Reviews, FAQ live under Weddings.
- [x] Venues, Whistler, Vancouver live under Sea-to-Sky.
- [x] Guides and Stories live under Journal.
- [x] Logo remains the only Home affordance.
- [x] Footer remains comprehensive (11 routes, all required entries present).
- [x] `npx tsc --noEmit` passes.
- [x] `npx eslint .` passes.
- [x] `npm run build` passes.

## Git

Not committed — per the operator instruction in the execution block.
