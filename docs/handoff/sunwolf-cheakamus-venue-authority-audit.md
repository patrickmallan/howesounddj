# Sunwolf + Cheakamus Centre — venue authority audit

**Tranche:** Analysis + recommendations only (no implementation).  
**Repo:** `~/Desktop/howesounddj`  
**Date:** 2026-05-23  
**Business priority (Patrick):** Sunwolf Riverside Resort = **#1** venue target; Cheakamus Centre = **secondary**, still important for Squamish venue authority.

**Patrick business context (strategic input — not published on site today):**

- Sunwolf: ideal wedding flow; Wednesday and Saturday weddings; **11 PM** end time; ideal dance-floor length; **maximum ~3-hour dance window**; parties feel **focused, energetic**, not drawn out.
- Treat all venue **policy, schedule, capacity, and partnership** facts as **verify before publishing** unless confirmed on `sunwolf.net`, `cheakamuscentre.ca`, or supplied explicitly by Patrick.

---

## 1. Executive summary

Both venues already have **dedicated, indexable venue guides** (`/venues/sunwolf`, `/venues/cheakamus-centre`) with unique meta descriptions, three content sections (why fit / planning / local expertise), **BreadcrumbList + Service JSON-LD**, and **sitemap** inclusion. The site does **not** use the full brand string “Sunwolf Riverside Resort” anywhere in `src/`; on-page naming is **“Sunwolf”** only.

**Sunwolf** is ahead on **internal discovery**: it is on the **Squamish wedding DJ pillar** venue grid, gets an **explicit Squamish pillar** link on its venue detail page, and is the **only non-gondola venue** named in the dance-floor planning guide’s “Place” section (as a “riverside lodge”). **Cheakamus** is present on the venue hub and homepage grid but has **no** pillar inclusion, **no** guide/story contextual link, and **no** venue-specific editorial asset (unlike Sea to Sky Gondola).

**Critical content gap:** Neither page reflects Patrick’s highest-value Sunwolf differentiators (**11 PM end**, **Wed/Sat flow**, **short focused dance window**, cabin/resort riverside specificity). Copy for both venues is **template-strong but emotionally interchangeable** with other water-adjacent or campus venues—fine for crawl coverage, **weak for venue-intent conversion** and for couples comparing DJs who “get” that property.

**SEO posture:** Pages can rank for long-tail “{venue} wedding DJ” queries over time, but generic body copy and missing full venue name on Sunwolf likely cap click-through and authority vs. competitors with venue-specific proof, imagery, and FAQs.

**Highest ROI (when implementing):** (1) Sunwolf venue page enhancement with verified logistics + dance-window philosophy, (2) dedicated Sunwolf editorial story cross-linked like Gondola, (3) Squamish cluster internal links including Cheakamus, (4) title/meta pass for “Sunwolf wedding DJ” / full name variant—**without** preferred-vendor claims unless verified.

---

## 2. Current content inventory

### 2.1 Site-wide mentions (bounded search)

| Signal | Sunwolf | Cheakamus Centre |
|--------|---------|------------------|
| `src/config/venue-pages.ts` | Yes (`slug: sunwolf`) | Yes (`slug: cheakamus-centre`) |
| Dedicated URL | `/venues/sunwolf` | `/venues/cheakamus-centre` |
| `src/app/sitemap.ts` | Yes (via `getAllVenueSlugs()`) | Yes |
| Squamish pillar (`/squamish-wedding-dj`) | **Yes** (explicit `PILLAR_VENUE_SLUGS`) | **No** (`area: sea-to-sky`, not in pillar set) |
| Dance-floor guide contextual link | **Yes** (“riverside lodge”) | **No** |
| Dedicated `/stories/*` | **No** | **No** |
| Reviews page venue tag | **No** named mention in `src/app/reviews` | **No** |
| “11 PM”, “Wednesday”, “3-hour dance” | **No** sitewide | **No** sitewide |
| Full name “Sunwolf Riverside Resort” | **No** in `src/` | N/A |

Other pages use **generic** riverside / forest / dance-floor language without naming these venues (homepage, FAQ, stories hub, corridor editorials).

### 2.2 Sunwolf — `/venues/sunwolf`

| Field | Current value |
|-------|----------------|
| **URL** | `https://www.howesounddj.com/venues/sunwolf` |
| **Config name** | Sunwolf |
| **Location label** | Brackendale, BC |
| **Area** | `sea-to-sky` (not `squamish`, but treated as Squamish-adjacent for linking) |
| **Venue type** | Riverside lodge & event space |
| **Official URL** | `https://sunwolf.net/` |

**Metadata** (from `generateMetadata` in `src/app/venues/[slug]/page.tsx`):

- **Title:** `Wedding DJ for Sunwolf · Brackendale, BC` → template adds `| Howe Sound DJ`
- **Meta description:** “Sunwolf wedding DJ services: relaxed Sea-to-Sky riverside character with professional reception support. Howe Sound DJ, Squamish-rooted, with personalized music and clear planning.”
- **Canonical:** `/venues/sunwolf`
- **OG/Twitter:** Same title/description pattern; `og-share.jpg`

**H1:** `Wedding DJ planning for Sunwolf`

**Hero supporting line:** “Riverside Sea-to-Sky atmosphere where relaxed daytime energy can transition into a reception that still needs a confident musical plan.”

**Body sections (template H2s):**

1. **Why this guide exists** — Flow, atmosphere, pacing (2 × `whyFit` paragraphs: water-adjacent calm → intentional evening; setting vs soundtrack)
2. **Planning & experience** — Ceremony to dance floor (2 × `planningFocus`: guest movement dinner → celebration; reduce day-of improvisation)
3. **Local expertise** — Sea-to-Sky / Brackendale (2 × `localExpertise`: corridor weekends; availability conversation)
4. **Also useful** — Weddings, packages, FAQ, venues hub, reviews, guides, stories, **Squamish wedding DJ pillar**, contact
5. **Next step** — CTADuo + reviews secondary button

**Schema / JSON-LD:**

- `venueDetailBreadcrumbJsonLd("Sunwolf", "sunwolf")`
- `venueWeddingDjServiceJsonLd` — Service named “Wedding DJ services (ceremonies & receptions)”; audience “Couples planning weddings at or near Sunwolf”; **no** FAQPage, **no** Article, **no** Review schema

**Card copy (hub/home):** “Riverside atmosphere with a relaxed Sea-to-Sky feel.”

### 2.3 Cheakamus Centre — `/venues/cheakamus-centre`

| Field | Current value |
|-------|----------------|
| **URL** | `https://www.howesounddj.com/venues/cheakamus-centre` |
| **Config name** | Cheakamus Centre |
| **Location label** | Paradise Valley, BC |
| **Area** | `sea-to-sky` |
| **Venue type** | Forest campus & gathering spaces |
| **Official URL** | `https://cheakamuscentre.ca/` |

**Metadata:**

- **Title:** `Wedding DJ for Cheakamus Centre · Paradise Valley, BC`
- **Meta description:** “Cheakamus Centre wedding DJ support in the Sea-to-Sky: nature-forward celebrations with professional audio thinking and personalized dance-floor energy. Howe Sound DJ.”

**H1:** `Wedding DJ planning for Cheakamus Centre`

**Hero:** “Forest-campus atmosphere with purpose-built gathering spaces, ideal when you want nature-forward flow and a thoughtful evening arc.”

**Body sections:** Same template structure as Sunwolf; content emphasizes **multi-space campus flow**, ceremony-to-reception chapters, corridor logistics.

**Also useful:** Standard links; **no** Squamish pillar link (slug not in `squamish` area and not in `sunwolf` / `sea-to-sky-gondola` exceptions in `venues/[slug]/page.tsx`).

**Schema:** Same BreadcrumbList + Service pattern as all venue guides.

**Card copy:** “Forest and river campus with natural, purpose-built gathering spaces.”

---

## 3. Internal linking map

### 3.1 Links **in** (discovery paths)

| Source | Sunwolf | Cheakamus |
|--------|---------|-----------|
| `/venues` hub (all cards) | ✓ | ✓ |
| `/` homepage venue grid (`VENUES` from config) | ✓ | ✓ |
| `/squamish-wedding-dj` venue grid | ✓ | ✗ |
| `/guides/how-to-keep-a-wedding-dance-floor-packed` | ✓ (inline “riverside lodge”) | ✗ |
| `/guides/how-to-choose-a-wedding-dj-in-squamish` | ✗ | ✗ |
| `/stories` hub or story articles | ✗ | ✗ |
| `/whistler-wedding-dj` venue grid | ✗ | ✗ |
| `docs/HSDJ Editorial Authority Expansion — Tranche 02.txt` (planned Story B) | Planned → `/venues/sunwolf` | Planned → `/venues/cheekye-ranch` only (not Cheakamus Centre) |
| Site chrome / footer | ✗ (no per-venue nav) | ✗ |

### 3.2 Links **out** (from venue detail template)

Both pages link to: `/weddings`, `/packages`, `/faq`, `/venues`, `/reviews`, `/guides`, `/stories`, `/contact`, official venue site (external), CTADuo surfaces `venue_hero` / `venue_page_cta`.

**Sunwolf-only outbound authority link:** `/squamish-wedding-dj`.

**Gondola-only pattern (not replicated):** `/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like` conditional in “Also useful” — **missing for Sunwolf and Cheakamus**.

### 3.3 Related guides & stories (today)

| Asset | Relevance to Sunwolf / Cheakamus |
|-------|--------------------------------|
| `/guides/how-to-keep-a-wedding-dance-floor-packed` | Sunwolf named once; strong **Roomflow / pacing** thesis—good tie-in for 3-hour dance window **once verified and written in venue voice** |
| `/guides/how-to-choose-a-wedding-dj-in-squamish` | Squamish hiring intent; no venue anchors |
| `/stories/sea-to-sky-wedding-dance-floor-energy` | Corridor-wide editorial; no venue names |
| `/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like` | Model for **venue-specific emotional layer**; Gondola only |

---

## 4. Sunwolf — current state assessment

### 4.1 What works

- **Indexable dedicated URL** with unique meta and canonical.
- **Keyword seeding** in meta: “Sunwolf wedding DJ”, “riverside”, “Sea-to-Sky”, “Squamish-rooted”.
- **Pillar inclusion** signals Squamish commercial importance to crawlers and users on `/squamish-wedding-dj`.
- **Guide contextual link** positions Sunwolf as the **riverside** archetype vs gondola (dramatic viewpoint) and generic “forest sanctuary” phrasing elsewhere.
- **Tone** matches site standards: planning-oriented, no cheesy wedding clichés, no exclusivity claims in venue config comment/header.
- **Service schema** describes DJ services in venue context without implying partnership.

### 4.2 What is weak or missing

| Gap | Impact |
|-----|--------|
| Name **“Sunwolf”** only vs “Sunwolf Riverside Resort” | May miss branded venue searches and feel less specific to couples who know the full property name |
| **No** Patrick priority signals on-site (11 PM, Wed/Sat, 3-hour dance window, focused party) | Couples choosing Sunwolf for those reasons **won’t feel seen**; HSDJ fit is implied, not demonstrated |
| Copy is **interchangeable** with other water-adjacent venues | Weak differentiation in SERP snippets and on-page skim |
| **No** venue-tagged testimonial or quote module | Strategy audit (`docs/HSDJ_STRATEGY_SITE_AUDIT_REPORT.md`) already flagged Sunwolf for venue-specific proof |
| **No** dedicated editorial story | Gondola has emotional authority layer; Sunwolf does not |
| **No** venue-specific imagery | Shared OG / brand editorial only |
| **No** FAQ block or FAQ schema | Missed long-tail (“Sunwolf wedding DJ ceremony sound”, etc.) **if** Q&A are verified |
| `area: sea-to-sky` vs Squamish mental model | Minor; partially compensated by pillar exception |

### 4.3 SEO strength (Sunwolf)

| Dimension | Rating | Notes |
|-----------|--------|-------|
| Keyword targeting | **Medium** | Meta hits core intent; body under-targets “Sunwolf wedding DJ”, riverside wedding, Brackendale/Squamish |
| Title/meta strength | **Medium** | Clear but not distinctive; no emotional hook or dance-window angle |
| Uniqueness vs other venue pages | **Low–medium** | Template paragraphs; less specific than e.g. Evans Lake or Brew Creek entries |
| Squamish/local relevance | **Medium–high** | Brackendale + pillar + guide link |
| Wedding DJ relevance | **High** | Page type and schema are on-intent |
| Venue-specific emotional specificity | **Low** | Riverside “calm → celebration” is generic |
| Rank likelihood (venue-intent) | **Medium** with enhancement; **low–medium** as-is | Competing against venue site, planners, and other DJs; needs depth + proof + CTR packaging |

### 4.4 Conversion psychology (Sunwolf)

| Question | Assessment |
|----------|------------|
| Does the couple feel understood? | **Partially** — riverside / relaxed day is acknowledged; **not** the focused 11 PM / short peak-dance experience Patrick describes as ideal |
| Why HSDJ fits this venue? | **Implied** (local, pacing, planning) — **not argued** with venue-shaped examples |
| Atmosphere, timing, dance-floor flow explained? | **Generic** ceremony→dinner→dance arc only |
| Premium/editorial vs generic? | **Editorial voice, generic substance** — reads like a competent template, not a property fluency piece |

---

## 5. Cheakamus Centre — current state assessment

### 5.1 What works

- Full venue guide with **forest campus** positioning in hero, card, and meta (“nature-forward”).
- **Multi-space / chapter** language in `whyFit` and `planningFocus` is directionally right for campus venues.
- Same technical SEO foundation (canonical, sitemap, Service schema) as the cluster.
- Official link to `cheakamuscentre.ca` for couples validating the property.

### 5.2 What is weak or missing

| Gap | Impact |
|-----|--------|
| **Not** on Squamish pillar venue list | Weaker tie to “Squamish venue authority” goal despite Paradise Valley / corridor adjacency |
| **No** inbound links from guides or stories | Low PageRank flow and low human discovery |
| No Cheakamus-specific editorial | No emotional authority layer |
| No sound/logistics detail beyond one generic “speeches heard” line | Campus weddings often care about **zones, transitions, outdoor ceremony** — **verify before claiming** |
| No testimonials tagged to Cheakamus | Same proof gap as Sunwolf |
| Tranche 02 editorial plan links **Cheekye Ranch**, not Cheakamus Centre | Possible confusion between two “Squamish nature” venues in future content |

### 5.3 SEO strength (Cheakamus)

| Dimension | Rating | Notes |
|-----------|--------|-------|
| Keyword targeting | **Medium** | “Cheakamus Centre wedding DJ” in meta; limited body reinforcement |
| Title/meta strength | **Medium** | Accurate, not compelling |
| Uniqueness | **Low–medium** | Campus-flow template shared conceptually with CapU campus, railway museum multi-zone copy |
| Squamish/local relevance | **Medium** | Paradise Valley label; **weaker** than Sunwolf due to no pillar link |
| Wedding DJ relevance | **High** | Same as cluster |
| Emotional specificity | **Low–medium** | “Forest campus” slightly more distinct than Sunwolf’s riverside boilerplate |
| Rank likelihood | **Medium** long-term with content; **low–medium** as-is | |

### 5.4 Conversion psychology (Cheakamus)

| Question | Assessment |
|----------|------------|
| Feel understood? | **Light touch** on multi-space flow; missing forest/ceremony/reception **specifics** couples ask DJs about |
| HSDJ fit | **Generic local DJ** framing |
| Logistics / sound / pacing | **One line** on chapters; no operational depth (appropriately cautious, but thin for conversion) |
| Premium/editorial | Same as Sunwolf — **voice yes, venue fluency no** |

---

## 6. SEO gaps (cross-cutting)

1. **Venue-intent body depth** — Both pages ~6 short paragraphs; competitors often ship FAQs, timelines, photos, and “we’ve played here” proof.
2. **Full venue naming** — Sunwolf missing “Riverside Resort” variant in titles/H1/body (test in SERP; don’t keyword-stuff).
3. **SERP differentiation** — Meta descriptions don’t state a **single memorable thesis** per venue (cf. Patrick’s Sunwolf dance-window story).
4. **Internal anchor diversity** — Sunwolf has one strong contextual anchor (“riverside lodge”); Cheakamus has **zero** named anchors off-hub.
5. **Editorial cluster** — No story URLs targeting “riverside wedding DJ Squamish” or “forest campus wedding DJ” that funnel to venue guides.
6. **Proof density** — No structured venue tags on reviews; homepage/reviews **preferred vendor** language is **sitewide**, not venue-attributed (see §10).
7. **Image search / engagement** — No venue-specific visuals; OG is global.
8. **FAQ schema opportunity** — Only if FAQs are **real, verified** Q&A (not invented policies).

---

## 7. Conversion gaps (cross-cutting)

1. **Couples can’t see “why this DJ for this room”** — Pages explain what a good DJ does anywhere, not what changes at **this** property.
2. **No anxiety reducers tied to venue shape** — e.g. Sunwolf: end time and pacing; Cheakamus: moving guests between spaces (**verify** all operational claims).
3. **No social proof at point of decision** — Venue page finales push availability/reviews hub, not “others at this setting.”
4. **CTA is correct but generic** — Same `CTADuo` as every venue; no consult prompt framed as “Sunwolf timeline / Wed–Sat date.”
5. **Missed emotional alignment** — Patrick’s “focused, energetic, not drawn out” positioning is a **conversion differentiator** vs DJs who sell “party until 2 AM”; **not expressed** on site today.

---

## 8. Authority opportunities

### 8.1 Sunwolf (aligned with Patrick priority)

**On-page (after verification):**

- **Riverside + cabin/resort atmosphere** — How daylight by the river sets guest mood; how evening reception energy should **respect** the setting (observational, not resort brochure copy).
- **11 PM end time** — Frame as **feature**: clarity, guest energy, cleaner arc (**verify** current policy with venue).
- **~3-hour dance window** — Tie to **Roomflow Method**: recognition → peak → memorable last song; why **shorter, intentional** floors often feel better than exhausted marathons (editorial thesis, not a guarantee).
- **Wednesday / Saturday wedding flow** — **Verify** which days/properties/packages apply; if confirmed, explain how pacing differs (midweek guest travel vs Saturday corridor traffic).
- **Ceremony-to-reception transition** — Riverside photos, cocktail timing, when to open the floor (**generic planning** unless Patrick supplies repeatable patterns).
- **Local DJ familiarity** — Corridor logistics, Brackendale/Squamish vendor rhythm, rain/backup tone (**no** “preferred vendor” unless verified).

**Off-page / cluster:**

- Squamish pillar: optional **featured callout** for Sunwolf (one sentence + link), not just grid equality.
- Dance-floor guide: second mention or footer link when discussing **time-bounded** reception energy.
- Future **Sunwolf editorial story** (see §9).

### 8.2 Cheakamus Centre

- **Forest / campus / nature setting** — Guest immersion, quiet early, celebration later.
- **Guest flow across spaces** — Planning in “chapters”; announcements and music that **guide** without feeling like a school event (**tone**: respectful, nature-forward).
- **Ceremony / reception transitions** — Outdoor ceremony audio, regrouping, dinner acoustics (**verify** typical layouts with venue or Patrick’s experience).
- **Sound & logistics** — Multi-zone clarity, speech intelligibility in larger rooms (**verify**).
- **Atmosphere & pacing** — Softer early soundtrack; dance section when the room is ready (aligns with existing brand).
- **Squamish authority** — Link from Squamish pillar + choose-a-DJ guide as “Paradise Valley / forest campus” example.

---

## 9. Venue-story opportunities

| Priority | Asset | Thesis (one sentence) | Model |
|----------|-------|----------------------|--------|
| **P0** | **Sunwolf editorial story** e.g. `/stories/what-a-sunwolf-riverside-wedding-reception-feels-like` | A Sunwolf night works when the DJ treats the **river-day calm** and **tight evening window** as one arc—building to a **focused** dance peak instead of stretching the room past its natural energy. | `what-a-sea-to-sky-gondola-dance-floor-feels-like` |
| **P1** | **Cheakamus editorial** e.g. forest-campus threshold / multi-space trust story | Campus-style Sea-to-Sky weddings need a DJ who **connects chapters**—ceremony hush, dinner warmth, dance-floor lift—so guests never feel lost between buildings and trees. | Same pattern |
| **P2** | Enhance `/stories/sea-to-sky-wedding-dance-floor-energy` | Add **one** contextual link to Sunwolf (riverside) and Cheakamus (forest campus) in “Place” section—only if it reads naturally post-Sunwolf story | Tranche 02 Enhancement Pass A (docs) |
| **Defer** | Invented “real wedding recap” at either venue | Trust risk | — |

**Story requirements (from existing handoff standards):**

- Editorial disclaimer; no fabricated couple/ date.
- Cross-links: venue guide, Squamish pillar, dance-floor guide, `/stories` hub.
- Conditional “Also useful” link from `venues/[slug]/page.tsx` when story ships (Gondola pattern).

---

## 10. Internal linking opportunities

| Action | Target | Rationale |
|--------|--------|-----------|
| Add Cheakamus to `PILLAR_VENUE_SLUGS` or `area` exception | `/squamish-wedding-dj` | Squamish venue authority goal |
| Squamish pillar callout (copy block) | Sunwolf | Reflect #1 business priority without burying in alphabetical grid |
| `venues/[slug]` Squamish pillar exception | `cheakamus-centre` | Match Sunwolf/gondola treatment |
| Dance-floor guide “Place” paragraph | Cheakamus as forest-campus example | Parity with Sunwolf |
| Choose-a-DJ Squamish guide | Both venue guides | Hiring-intent path |
| New Sunwolf story → venue + pillar + guide | `/venues/sunwolf` | Gondola playbook |
| Venues hub intro | Optional “featured guides” sentence | Human discovery |
| **Do not** add footer spam | — | Keep editorial discipline |

**Planned but not in `src`:** Tranche 02 Story B (`why-mountain-weddings-need-different-dj-energy`) → `/venues/sunwolf`; does **not** currently plan Cheakamus Centre link—consider adding Cheakamus if Story B discusses campus/forest pacing.

---

## 11. Facts requiring verification

Publish **none** of the below until confirmed with venue official sources and/or Patrick’s contracted experience.

### 11.1 Sunwolf (Patrick-supplied — highest priority to verify)

| Claim | Status on site | Action |
|-------|----------------|--------|
| Ideal wedding flow | Not on site | Verify with Patrick + venue wedding coordinator materials |
| Wednesday weddings | Not on site | **Verify before publishing** |
| Saturday weddings | Not on site | **Verify before publishing** |
| 11 PM end time | Not on site | **Verify before publishing** (policies change) |
| Ideal dance-floor length / dimensions | Not on site | **Verify before publishing** |
| Maximum ~3-hour dance window | Not on site | May be **Patrick planning philosophy** vs venue rule—label clearly |
| “Sunwolf Riverside Resort” official naming | Site uses “Sunwolf” | Confirm preferred branding for SEO/titles |
| Preferred vendor / exclusive DJ status | Not claimed on venue pages | **Do not add** unless verified; note sitewide “preferred” copy on homepage/reviews is **generic**, not Sunwolf-specific |

### 11.2 Cheakamus Centre

| Claim | Status | Action |
|-------|--------|--------|
| Typical ceremony/reception spaces used for weddings | Generic “campus” copy only | **Verify before publishing** |
| Sound restrictions, curfews, amplified music policies | Not on site | **Verify before publishing** |
| Guest capacity / flow patterns | Not on site | **Verify before publishing** |
| Outdoor vs indoor backup plans | Not on site | **Verify before publishing** |
| HSDJ performance history count at venue | Not stated | Only claim if Patrick confirms |

### 11.3 Sitewide trust copy (adjacent risk)

- `src/app/page.tsx` — “Preferred status with many of the region’s most popular venues”
- `src/app/reviews/page.tsx` — “preferred vendor relationships across the region”

These are **not** Sunwolf/Cheakamus-specific but affect **venue-trust credibility** if couples read venue guides then see unscoped preferred claims. Any future venue enhancement should **not** compound unverified status language.

---

## 12. Future content ideas (ranked)

### Quick copy refinements (venue config + template only)

1. Sunwolf: expand `whyFit` / `planningFocus` with **verified** 11 PM + focused dance arc (Patrick priority).
2. Sunwolf: add “Sunwolf Riverside Resort” once in meta or first paragraph if branding confirmed.
3. Cheakamus: one paragraph on **multi-building guest flow** (verified).
4. Cheakamus: tighten meta to include “Squamish” if geographically accurate per venue marketing.
5. Both: unique closing line in `localExpertise` that names **one** planning question couples at this venue should ask HSDJ.

### Metadata / title improvements

1. Sunwolf meta test: “Sunwolf Wedding DJ · Riverside Squamish Receptions” (stay within SERP length).
2. Cheakamus: “Cheakamus Centre Wedding DJ · Forest Campus, Sea-to-Sky”.
3. Optional H1 variant: keep “planning for {name}” pattern for consistency **or** test “Wedding DJ for {name}” alignment with title.

### Internal linking

1. Cheakamus → Squamish pillar exception.
2. Add Cheakamus to pillar grid.
3. Sunwolf story conditional link in venue “Also useful”.
4. Guide cross-links (both venues).

### Stories / guides

1. Sunwolf editorial story (P0).
2. Cheakamus editorial story (P1).
3. Mini-FAQ section on venue page (P2, verified Q only).
4. Pull quote module on venue pages when reviews exist (P2).

### Squamish pillar tie-ins

1. Featured Sunwolf blurb on pillar.
2. “Forest campus & riverside lodge” pairing linking Sunwolf + Cheakamus.

### Image / media

1. Licensed or Patrick-owned **riverside / forest** editorial (not mislabeled as a specific client wedding unless true).
2. Optional: ambient river/campus b-roll on story pages (docs mention in GBP handoff—future).

### Schema

1. Keep Service + Breadcrumb (adequate).
2. Add FAQPage **only** with verified Q&A.
3. Do **not** add AggregateRating without compliant review sourcing.

---

## 13. Highest ROI recommendations

### A. Do now (next implementation tranche)

1. **Sunwolf venue page enhancement** — Verified logistics + Patrick’s focused dance-window / 11 PM positioning; full name if approved.
2. **Sunwolf pillar prominence** — Short featured link on `/squamish-wedding-dj` (not only alphabetical card).
3. **Internal linking minimum** — Cheakamus Squamish pillar + venue detail pillar link; dance-floor guide mention for Cheakamus.
4. **Title/meta pass for Sunwolf** — CTR packaging for “Sunwolf wedding DJ” without stuffing.

### B. Do soon

1. **Sunwolf editorial story** + conditional venue “Also useful” + hub card.
2. **Cheakamus venue page enhancement** — Forest campus flow, verified sound/transition notes.
3. **Venue-specific proof** — Tag reviews or add one vetted quote module per venue (if available).
4. **Cheakamus editorial story** (after Sunwolf story quality bar met).
5. **Tranche 02 Story B** — Include Cheakamus if forest-campus thesis fits.

### C. Watch / defer

1. FAQ schema until Q&A written and verified.
2. Custom hero photography until assets exist.
3. Aggressive “Sunwolf Wedding DJ” H1/title experiments if GSC shows impressions without clicks post-enhancement.
4. North Arm / sunset corridor story cross-links to Cheakamus (low relevance).

### D. Do not do

1. Claim **preferred vendor** or exclusive status at Sunwolf/Cheakamus without proof.
2. Invent wedding policies, curfews, capacities, or partnership language.
3. Publish Patrick’s Wed/Sat / 11 PM / 3-hour window facts **without verification**.
4. Duplicate a third generic “dance floor feels like” URL (Tranche 02 already guards this).
5. Generic SEO stuffing (“best Sunwolf DJ”, etc.) or cheesy wedding clichés.
6. City-template DJ copy pasted from Vancouver competitors.

---

## 14. Proposed implementation tranches (future — not executed)

| Tranche | Scope | Primary files |
|---------|--------|----------------|
| **T1 — Sunwolf authority** | Expand `venue-pages.ts` Sunwolf entry; optional title/meta tweak in `venues/[slug]/page.tsx` or per-venue meta override; Squamish pillar callout; verify facts doc from Patrick | `src/config/venue-pages.ts`, `src/app/squamish-wedding-dj/page.tsx` |
| **T2 — Sunwolf editorial** | New `/stories/what-a-sunwolf-…`; hub card; sitemap; conditional link in `venues/[slug]/page.tsx` | `src/app/stories/*`, `src/app/sitemap.ts`, `src/lib/json-ld.ts` |
| **T3 — Cheakamus cluster** | Venue copy enhancement; pillar + guide links; optional story | Same patterns as T1–T2 |
| **T4 — Squamish venue cluster linking** | Matrix pass: guides, stories, pillar, hub intro | `src/app/guides/*`, `src/app/stories/*`, `src/app/venues/page.tsx` |
| **T5 — Title/meta SERP pass** | Measure GSC for `/venues/sunwolf`, `/venues/cheakamus-centre`, `/squamish-wedding-dj` | Metadata only after T1 body depth |
| **T6 — Venue FAQ/schema** | Verified FAQ blocks + `faqPageJsonLd` if Q count warrants | `venue-pages.ts` + template or slug-specific FAQ data |

**Suggested ship order:** T1 → T2 → T4 (partial) → T3 → T5 → T6.

---

## 15. Reference: primary source files reviewed

| File | Role |
|------|------|
| `src/config/venue-pages.ts` | All venue copy (Sunwolf, Cheakamus) |
| `src/app/venues/[slug]/page.tsx` | Template, metadata, JSON-LD, Squamish pillar exception |
| `src/app/venues/page.tsx` | Hub |
| `src/app/squamish-wedding-dj/page.tsx` | Pillar venue set (includes Sunwolf) |
| `src/app/guides/page.tsx`, `guides/how-to-keep-a-wedding-dance-floor-packed/page.tsx` | Guide links |
| `src/app/stories/page.tsx` | No Sunwolf/Cheakamus stories |
| `src/lib/json-ld.ts` | Breadcrumb + Service schema |
| `src/app/sitemap.ts` | Both slugs included |
| `src/config/venues.ts` | Homepage grid |
| `docs/HSDJ Editorial Authority Expansion — Tranche 02.txt` | Planned Sunwolf story link |

---

## 16. Validation

- **No code changes** in this tranche.
- **No build** required.
- **No git commit** (per instructions).

---

*End of audit.*
