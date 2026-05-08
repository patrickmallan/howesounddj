# Authority navigation & homepage discovery fix

## Evidence / discovery (before edits)

Bounded searches (repo root):

```bash
rg -n "Home|Weddings|Packages|Reviews|Venues|Contact|guides|stories|whistler-wedding-dj" src/components src/app --glob '!*.map' | head -120
find src/components -maxdepth 2 -type f | sort
```

Findings: primary nav lived only in `src/components/site-chrome.tsx` as `navLinks` (desktop + mobile map the same array; footer mapped `navLinks` plus extra manual links to `/guides` and `/whistler-wedding-dj`). Homepage explore lived in `src/components/explore-site-links.tsx` and was imported once from `src/app/page.tsx`.

## Files inspected

- `src/components/site-chrome.tsx`
- `src/components/explore-site-links.tsx`
- `src/app/page.tsx`
- `src/app/layout.tsx` (read-only: confirms `/` omits `ConditionalSiteFinalDecisionZone`, so last homepage `<main>` content sits directly above `SiteFooter`)

## Files changed

- `src/components/site-chrome.tsx`
- `src/components/explore-site-links.tsx`
- `src/app/page.tsx`
- `docs/handoff/authority-navigation-discovery-fix.md` (this file)

## Where navigation is defined

| Surface | Location |
| -------- | -------- |
| **Header (desktop)** | `src/components/site-chrome.tsx` — `<nav aria-label="Primary">` maps **`navLinks`** |
| **Header (mobile)** | Same file — drawer `<nav aria-label="Mobile primary">` maps **`navLinks`**, then **`CheckAvailabilityTrackedLink`** (unchanged) |
| **Footer crawlable links** | Same file — **`SiteFooter`** maps **`navLinks`** using `item.footerLabel ?? item.label` |

There is **one canonical array**: `navLinks` in `site-chrome.tsx` (now typed as `SiteNavLink[]` with optional `footerLabel` for Whistler).

## Homepage authority discovery section

- **Component:** `HomepageExploreSection` in `src/components/explore-site-links.tsx`
- **Rendered:** `src/app/page.tsx` — **after** the final in-page “Let’s talk about your wedding” `SectionReveal`, **immediately before** `</main>` (on `/`, layout does not render `SiteFinalDecisionZone`, so this sits directly above **`SiteFooter`**)

## Links added / updated

### Primary nav order (`navLinks`)

1. `/` — Home  
2. `/weddings` — Weddings  
3. `/packages` — Packages  
4. `/reviews` — Reviews  
5. `/guides` — **Guides** (new in primary nav)  
6. `/stories` — **Stories** (new in primary nav)  
7. `/venues` — Venues  
8. `/whistler-wedding-dj` — **Whistler** (new in primary nav; header label short)  
9. `/about` — About  
10. `/faq` — FAQ  
11. `/contact` — Contact  

### Footer (via `navLinks`, no duplicate extra rows)

Crawlable targets required by the brief are included: **Guides** (`/guides`), **Stories** (`/stories`), **Venues** (`/venues`), **Whistler Wedding DJ** (`/whistler-wedding-dj` via `footerLabel`).

### Homepage authority cards (exact order)

1. Wedding Planning Guides → `/guides`  
2. Featured Wedding Stories → `/stories`  
3. Whistler Wedding DJ → `/whistler-wedding-dj`  
4. Sea-to-Sky Venues → `/venues`  

**Section heading (visible `h2`, exact copy):**  
Planning a Sea-to-Sky wedding? Explore venue guides, planning advice, and real dance-floor atmosphere.

No Book a Consult / Check Availability in this block.

## Header density tweak

Desktop primary nav: slightly tighter **`gap-x`** and **`text-[0.8125rem]`** at `xl`, scaling to **`text-sm`** at `xl` breakpoint as before, per “reduce gap/text size slightly” guidance.

## Validation

Commands (exact):

```bash
cd ~/Desktop/howesounddj
npx tsc --noEmit
npm run lint
npm run build
```

| Command | Result |
| -------- | ------ |
| `npx tsc --noEmit` | Pass |
| `npm run lint` | Pass |
| `npm run build` | Pass |

## Visual QA notes

- At **`xl`**, confirm **11 links + Check Availability** still fit without wrapping awkwardly; if needed, nudge `gap-x` or `text-[0.8125rem]` one step.
- **Mobile:** scroll the drawer with the longer list; touch targets unchanged on **`Check Availability`**.
- **Homepage:** authority block is **below** the last in-page CTA card and **above** the global footer; no duplicate explore strip under the hero anymore.
- **Footer:** “Wedding Planning Guides” standalone link is removed; **`/guides`** is labeled **Guides** in the footer row (matches brief).

## Git

Not committed (per operator instruction).
