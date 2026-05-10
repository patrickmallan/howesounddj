# Handoff: Homepage premium calmness + CTA hierarchy pass

## Issues identified (from audit + this pass)

- Four stacked conversion surfaces on the homepage (header + hero + About-band `CTADuo` + finale) produced **mild ask fatigue**.
- Hero microcopy (“Most couples start with a quick call…”) sat beside “No pressure” and read as **light social pressure**.
- **Headline variants B/C** leaned on “high energy / packed” framing, competing with **premium calm** when the client headline resolver swaps them in.
- **Explore** surfaced Whistler and venues but not the **Squamish pillar**, weakening geographic authority balance.
- Some section headings and body lines (“packed floors,” “packed dance floors,” proof “energy”) skewed **party-DJ** relative to editorial mountain-wedding positioning.
- Finale → Explore → footer needed **clearer rest** after the primary conversion block.

## Changes made

### `src/app/page.tsx`

- **CTA hierarchy:** Removed the **About** column `CTADuo` block (mid-page consult/availability). Replaced with **low-friction text links** to `/about` and `/contact` (“Full story on About” · “Contact when you are ready”) so the **hero** and **finale** remain the main consult/availability moments, plus the **sticky header** Check Availability (unchanged component).
- **Hero microcopy:** Replaced normative “most couples / fastest way” line with: *“If a short call would help, it stays low-key: alignment first, on your timeline.”*
- **Hero column supporting paragraph:** Reframed around **Squamish-rooted, corridor-wide** language and a calmer closing than “wild (often all three)” alone.
- **HEADLINE_VARIANTS B/C:** Softened to **intention / earned room** language (no “packed every time” / raw “high energy” phrasing).
- **Why section:** H2 and lead paragraph tuned away from “packed floors” toward **lasting guest memory** and **flow that respects the setting**; increased vertical padding (`py-16 md:py-24`) and stagger top margin (`mt-14`).
- **Proof:** Calmer caption; slightly increased section padding and proof header margin.
- **Reviews:** H2 → *“In their own words.”* with a **single** subtle link to `/reviews` for depth; increased section padding and header spacing.
- **Venues intro:** Removed “packed dance floors”; emphasis on **sound, pacing, and flow vs. landscape**; spacing aligned with other bands.
- **Services:** `gap-14` and `py-16 md:py-24` for **breathing room** between split columns.
- **About band:** More vertical padding; **no** `CTADuo` (see above).
- **FAQ:** `py-16 md:py-24` for rhythm consistency.
- **Finale:** Reduced bottom padding on the finale **section wrapper** (`pb-6 md:pb-8`) and increased top padding (`pt-16 md:pt-24`) so the card feels **settled** before Explore; Explore section picks up **extra top/bottom padding** (see below).

### `src/components/explore-site-links.tsx`

- Added **Squamish Wedding DJ** → `/squamish-wedding-dj` as the **first** card with required supporting line: *“Local wedding DJ support for Squamish and Sea-to-Sky celebrations.”*
- Reordered: **Squamish → Guides → Stories → Whistler → Venues**.
- Introduced optional `description` + `emphasize` (Squamish card uses slightly stronger border/background).
- Grid: `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5` so **mobile stays 1→2 columns** (less cramming than five-across on small screens).
- Section container: **`pt-10 pb-16 md:pt-12 md:pb-20`** for **rest after finale** and a gentler handoff to the footer.
- Heading copy: calmer, editorial **“going deeper”** framing (no “dance-floor atmosphere” push in the explore title).

### Not changed (per scope)

- **Metadata / SEO fields** in `page.tsx` (title, description, openGraph, canonical) — untouched.
- **`CTADuo`** implementation and tracking surfaces (`hero`, `page_cta`) — unchanged; only **placement count** on homepage reduced.
- APIs, analytics plumbing, routes, sitemap, nav, venue/guide/story bodies, assets, packages.

## CTA hierarchy decisions

| Location | Before | After |
|----------|--------|--------|
| Sticky header | Check Availability | Same |
| Hero | `CTADuo` + reassurance lines | Same pair + calmer second line |
| About band | `CTADuo` + reassurance | **Removed**; text links to About / Contact |
| Finale | `CTADuo` + reassurance | Same |

**Rationale:** Three explicit **consult/availability** duos on one scroll was the main fatigue driver. About is already **relational** content; a soft path to **read more** or **contact** preserves agency without a second full-width button row.

## Sections removed / softened

- **Removed:** About-band `CTADuo` + duplicate “15 minutes…” under About.
- **Softened:** Multiple headlines/body lines that over-indexed on **packed / energy**; A/B/C variants; proof blurb; venues paragraph; Bangers Only **supporting sentence** (title retained for brand continuity).

## Squamish reinforcement

- Explore now **leads with Squamish pillar** + supporting description and **visual emphasis**.
- Hero supporting paragraph now **opens with Squamish-rooted** framing.

## Mobile UX observations (code-level)

- **375 / 390 / 430:** Explore grid stacks **1 col → 2 cols** at `sm`; five cards render as **2+2+1** then **3+2** at `lg`, **5-across** only at `xl`—reduces **tiny tap targets** and cramped copy on phones.
- **Hero:** Still **stacked CTAs** full-width below `sm` breakpoint (existing `CTADuo` behavior); **one fewer** duo later in scroll **shortens** the path to finale.
- **Finale + Explore:** Extra vertical padding on Explore and adjusted finale section padding aims to reduce **“double ask”** compression before footer.

## Emotional pacing rationale

- **Trust → story → proof → depth → soft human (About) → FAQ → single strong ask → optional discovery** reads more **editorial** when the About band does not **re-pitch** the same buttons as the hero.
- Calmer microcopy and fewer **performance** words align with **luxury hospitality**: confidence without **normative urgency**.

## Validation results

```text
cd ~/Desktop/howesounddj
npx tsc --noEmit   # exit 0
npx eslint .       # exit 0
npm run build      # exit 0
```

## Before / after hierarchy notes

- **Before:** Header CTA + Hero duo + About duo + Finale duo (four “full” conversion rows on page).
- **After:** Header CTA + Hero duo + Finale duo (**three** full rows); About offers **navigation** to deepen trust without duplicating Calendly/availability chrome.

## Manual QA checklist

- [ ] Desktop: homepage scroll feels **less repetitive**; About reads as **breathing room**.
- [ ] Mobile (~375–430px): hero → reviews → about → FAQ → finale **rhythm**; no layout break on Explore **2-column** cards.
- [ ] **Hero** second line reads **calm**, not pushy.
- [ ] **Finale** `CTADuo` still opens consult + `/contact#availability` correctly; **tracking** surfaces unchanged (`hero`, `page_cta`).
- [ ] **Explore:** Squamish card first, description visible, link works; grid acceptable at **sm / lg / xl**.
- [ ] **Footer** transition: enough **air** after Explore.
- [ ] If **HomepageHeroHeadline** client variant activates B/C, copy is **less** “packed floor” aggressive than before.
- [ ] **SEO:** meta tags unchanged in source (spot-check in devtools if needed).

## Git

No commit performed unless explicitly requested.
