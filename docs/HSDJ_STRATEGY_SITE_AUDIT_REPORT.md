# Howe Sound Event DJ — Strategy vs. Site Implementation Audit

**Date:** 2026-05-08  
**Scope:** Read-only comparison of the repository against `Strategic Priority Framework Howe Sound Event DJ.txt` and `HSDJ GA4 Strategic Analysis & Next-Step Roadmap.txt`. No site code, copy, layout, or analytics logic was changed for this document.

---

## Executive Summary

The live codebase already reflects many of the strategy documents’ conclusions: a **consult-first contact experience**, **strong GA4 funnel events** (availability + forms + Calendly-adjacent signals), a **substantial venue guide system** (18 dynamic `/venues/[slug]` pages with unique metadata, copy blocks, breadcrumbs, and `Service` JSON-LD), and a **reviews page** with named testimonials and thematic synthesis. The **premium emotional positioning** (Sea-to-Sky, elegant + high-energy, planning clarity) is consistent across key pages.

The largest gaps versus the CEO/strategy brief are **not** “fix the website,” but **scale authority and proof**: there is **no blog or long-form planning library**, **no “featured weddings” / real-wedding recap URLs**, **two high-value venue targets from the strategy list are absent** (North Arm Farm, Brew Creek), and **social proof is still mostly text** (limited venue-named quotes, few explicit “transformation” lines, and a finite image set under `public/images`). **Google Business Profile** and **retargeting pixels** are **out of repo scope**—they are strategic actions, not something the current codebase implements.

**Highest-priority recommendation (business + strategy alignment):** Add **planning-authority content** (first article + editorial calendar) and **close the venue gaps** that the strategy explicitly names (North Arm Farm, Brew Creek), then deepen **proof** (venue-tagged testimonials, real wedding stories, more candid floor/room photography) **without** a redesign—matching both strategy docs’ “scale traffic into a strong foundation” thesis.

**Should implementation happen next?** Yes—but as **content and measurement extensions**, not a site overhaul. The repo is already pointed in the right architecture direction.

---

## 1. Strategy Document Ingestion (Core Objectives)

Summarized from the two source documents in `docs/`:

| Objective | What the strategy asks for |
| ----------- | -------------------------- |
| **Local wedding SEO dominance** | Corridor and city-intent coverage (Squamish, Whistler, Sea-to-Sky, Vancouver planning-from-city), topical depth beyond a service page. |
| **Venue-specific authority** | Dedicated, intent-heavy pages for named venues; high conversion potential; weak competitor set for many venue+Dj queries. |
| **Planning authority content** | Educational articles: dance floor, playlists, choosing a DJ locally, timeline tips, emotional “electric/elegant” framing, regional planning. |
| **Social proof density** | More testimonials, rotation, venue-specific quotes, emotional outcomes, dance-floor proof, real imagery—not generic praise. |
| **Real wedding content** | “Featured weddings” style stories; SEO + trust + portfolio depth. |
| **Google Business Profile support** | Photos, video, posts, reviews mentioning corridor, venues, dance floor—local pack dominance. *(Operations/marketing, not repo code.)* |
| **Retargeting / readiness** | Meta/Google remarketing, visitor and availability-check audiences—slow wedding buyer journeys. *(Mostly tags/ads outside repo.)* |
| **Conversion intelligence** | Expand event coverage: testimonials, venue views, gallery, FAQ, scroll depth, outbound social, Calendly completion, etc. |
| **Premium emotional brand world** | Avoid generic DJ commodity language; own “Sea-to-Sky wedding atmosphere”—elegant mountain + intentional high-energy dance floors. |
| **Sea-to-Sky regional authority** | Become the obvious premium choice psychologically, not just “more traffic.” |

---

## 2. Current State — Website Inventory

### 2.1 Routes / pages (`src/app`)

| Route | Role |
| ----- | ---- |
| `/` | Homepage: hero (headline experiment), explore tiles, video proof section, brand anchor, features, proof image, 3 testimonials, venue cards → internal guides, services, FAQ teaser, about strip, final CTA. |
| `/weddings` | Wedding services (metadata: Squamish-focused; body mentions Whistler / corridor). |
| `/packages` | Packages (present in sitemap; not fully re-audited line-by-line in this pass beyond structure). |
| `/about` | About Patrick (uses configured images). |
| `/reviews` | Long-form reviews hub: many named quotes + value themes + CTAs. |
| `/faq` | FAQ with accordion UI + **FAQPage JSON-LD** via `faqPageJsonLd`. |
| `/contact` | Consult-first layout: Book consult section → availability → secondary “Send a Message” form. |
| `/venues` | Hub listing all venue guides. |
| `/venues/[slug]` | 18 venue-specific guides from `VENUE_PAGES` in `src/config/venue-pages.ts`. |
| `/vancouver-wedding-dj` | Vancouver-origin / corridor positioning page + breadcrumb JSON-LD. |
| `/api/availability`, `/api/contact` | Backend for availability check and inquiries. |
| `sitemap.ts`, `robots.ts` | Sitemap lists core routes + all venue slugs; robots allows crawl and points to sitemap. |

**Not present:** `/blog`, `/journal`, `/guides`, `/weddings/featured/...`, or similar content routes.

### 2.2 Key components (`src/components`)

- **CTAs:** `cta-duo.tsx` (Book a Consult + Check Availability), `book-consult-tracked-link.tsx`, `check-availability-tracked-link.tsx`, `contact-page-cta-trio.tsx` (adds Send a Message on contact).
- **Chrome:** `site-chrome.tsx` — header nav, mobile menu (Check Availability prominent), footer links, `SiteFinalDecisionZone` (global finale).
- **Conditional finale:** `conditional-site-final-decision-zone.tsx` — omits global finale on pages that already have strong endings (home, weddings, packages, reviews, about, contact, faq, vancouver, venues hub, and all `/venues/*`).
- **Forms:** `contact-availability-form.tsx`, `contact-secondary-inquiry-form.tsx`, `contact-book-consult-section.tsx`.
- **SEO helpers:** `json-ld.tsx`; logic in `src/lib/json-ld.ts` (Organization, breadcrumbs, FAQPage, venue Service).
- **Analytics:** `google-analytics.tsx` (GA4 + manual `page_path` on navigation).

### 2.3 Config / content data

- `src/config/venue-pages.ts` — canonical venue dataset (18 entries), each with `metaDescription`, structured sections (`whyFit`, `planningFocus`, `localExpertise`).
- `src/config/venues.ts` — re-exports for homepage cards.
- `src/config/site-images.ts` — image URLs and alt text catalog.

### 2.4 Image / media assets (`public/`)

- **Images:** `public/images/home/*`, `about/*`, `weddings/*`, `logo/*` — real photography slots in use (hero, proof, Patrick, crowd/support).
- **Video:** `public/videos/home-proof.mp4` exists; `HomeVideoProof` uses it when present.
- **Social share:** `public/og-share.jpg`, `og-default.svg`.

### 2.5 Metadata / SEO patterns

- **Root** `src/app/layout.tsx`: `metadataBase`, default title template, description, OG/Twitter, robots index/follow.
- **Page-level** `metadata` or `generateMetadata` on home, contact, venues hub, each venue slug, vancouver page, etc.
- **Canonicals:** Present on multiple pages (e.g. venue template sets `alternates.canonical`).
- **Schema:** Organization (global), FAQPage (faq), BreadcrumbList (venues + vancouver + venue detail), Service (per venue guide).

### 2.6 Internal linking (high level)

- Homepage links to `/venues` and individual `/venues/[slug]` from venue cards; explore section links services, packages, reviews, about, vancouver page.
- **Gap:** Primary header nav **does not** include **Venues** (footer does). Deep venue pages link to `/weddings`, `/packages`, `/faq`, `/venues`, `/reviews` (finale).

### 2.7 Testimonials / reviews structure

- **Homepage:** 3 testimonials (named + region label: Squamish / Sea to Sky / Whistler).
- **Reviews page:** Larger static array of quotes + interpretive “themes” sections—strong **review-page depth** relative to typical DJ sites.

### 2.8 Analytics / events (repo)

Declared in `src/lib/analytics.ts` and used from components/forms:

- **Implemented:** `homepage_headline_view`, `book_consult_click`, `check_availability_click`, `availability_check_start`, `availability_check_result`, `contact_form_start`, `contact_form_submit_attempt`, `contact_form_submit_success`, `contact_form_submit_error`, `contact_form_submit`, `calendly_click` (plus post-availability consult path fires `book_consult_click` with distinct intent in availability form).

**Caveat for measurement:** Some failure paths in the availability check UI return early **without** emitting `availability_check_result` (e.g. JSON parse failure)—worth confirming in GA if “start without result” appears.

---

## 3. What Is Already Strong (Aligned with Strategy)

- **Venue SEO architecture:** Programmatic guides with **unique titles/descriptions** and **on-page H1–H2 structure**, not duplicate thin shells.
- **Regional page:** `/vancouver-wedding-dj` supports “plan from Vancouver, marry in corridor” intent.
- **Consult-first funnel:** Contact page narrative and CTA trio match premium, non-pushy positioning described in GA4 doc.
- **Reviews depth:** `/reviews` goes beyond a widget—patterns and proof themes are explicit.
- **Brand world:** Visual system, copy tone, and “Sea-to-Sky / Squamish-rooted” repetition support the **premium emotional** positioning.
- **Technical SEO baseline:** Sitemap includes venue URLs; JSON-LD breadth is ahead of many local vendors.

---

## 4. What Is Partially Implemented

| Area | Partial state |
| ---- | ------------- |
| **Whistler authority** | Multiple Whistler venue guides exist; **no** single flagship URL like `/whistler-wedding-dj` (strategy example) unless you treat `/weddings` or a venue page as the proxy. |
| **Planning authority** | FAQ + venue guides contain **planning-oriented** paragraphs; **no** dedicated long-form article URLs for the strategy’s article titles. |
| **Social proof** | Good **quantity** of quotes on `/reviews`; limited **venue-attributed** testimonials and **story** depth on homepage; imagery count is modest. |
| **Real wedding content** | Video proof + static images = **some** “real energy” demonstration; **no** named wedding features or case-study URLs. |
| **Conversion intelligence** | Core funnel events exist; **no** `venue_page_view`, `testimonial_click`, `faq_expand`, `scroll_depth_75`, etc. |
| **Internal linking** | Venues discoverable from home and footer; **not** in primary desktop nav. |
| **Retargeting** | No Meta Pixel / Ads tags observed in reviewed layout/components (expected to be separate work). |

---

## 5. What Is Missing (vs. Strategy)

- **Blog / guides section** for the explicitly listed article topics.
- **Featured weddings** (or similar) index + detail routes.
- **Venue pages** for **North Arm Farm** and **Brew Creek** (named in strategy; absent from `VENUE_PAGES`).
- **Systematic venue-tagged testimonial module** (pull quotes by venue or by “mountain / barn / resort” archetype).
- **Expanded image/gallery strategy in code** (more real wedding photos, venue-specific shots—asset work + possibly a dedicated gallery route).
- **Google Business Profile** optimization workflow (not in repo).
- **Remarketing stack** (pixels, audiences—mostly not in repo).

---

## 6. Gap Matrix

| Strategic objective | Already implemented | Partially implemented | Missing | Recommended next action | Priority | Complexity | Business impact |
| ------------------- | ------------------- | --------------------- | ------- | ----------------------- | -------- | ---------- | ----------------- |
| Local wedding SEO dominance | Sitemap, canonicals, strong service + regional pages, 18 venue URLs | City/region coverage split across `/weddings`, `/vancouver-wedding-dj`, venues—not a single “hub” per city keyword | Long-tail article library | Publish 1–2 flagship guides + interlink from FAQ/venues/home | P0 | Medium | High |
| Venue-specific authority | Rich `/venues/[slug]` + hub | Whistler spread across many slugs | North Arm Farm, Brew Creek guides | Add dataset entries + pages (same template) | P0 | Low–Med | High |
| Planning authority content | FAQ + venue copy | — | Dedicated articles | Add `/guides` or `/blog` route + first 2 articles | P0 | Medium | High |
| Social proof density | `/reviews` + home teaser | Venue-specific quotes rare | Rotating/venue modules, more imagery | Collect venue-tagged quotes; add proof strip variants | P1 | Medium | High |
| Real wedding content | Video + photos | — | Featured wedding stories | Define 2–3 stories with SEO slugs | P1 | High | High |
| GBP support | — | — | N/A in repo | Ops: review prompts, photo cadence, Q&A | P0 (ops) | Low | High |
| Retargeting readiness | — | — | Pixel + audiences | Add pixels + consent policy; build availability audience | P2 | Medium | Medium |
| Conversion intelligence | Core GA4 events | — | Deeper events | Add `venue_page_view`, scroll depth, FAQ expand | P1 | Medium | Medium |
| Premium brand world | Design + copy system | — | Continuity in new pages | Extend tone into articles; avoid commodity DJ clichés | P1 | Low | Medium |
| Sea-to-Sky regional authority | Strong repeated positioning | Header nav omits Venues | Content volume | Publish guides + interlink; consider Whistler hub page | P0–P1 | Medium | High |

---

## 7. Venue SEO Audit (Strategy List + Corridor)

Assessment uses the **existing template**: multi-section copy, unique meta, internal links, CTAs, Service + Breadcrumb JSON-LD. **“Strong”** = unique, substantial, crawl-worthy; **adequate** = usable but would benefit from proof assets; **thin** = little unique content (not the case for current guides).

| Venue / area | Exists? | URL (if yes) | Depth | What would improve it |
| ------------ | ------- | ------------ | ----- | --------------------- |
| **Sea to Sky Gondola** | Yes | `https://www.howesounddj.com/venues/sea-to-sky-gondola` | **Strong** (for template-based) | Venue-specific photo, 1–2 pull quotes naming the setting, outbound internal links from FAQ/articles |
| **Squamish Lil’wat Cultural Centre** | Yes | `/venues/squamish-lilwat-cultural-centre` | **Strong** | Same + sensitivity-appropriate storytelling; consider extra FAQ re: cultural spaces |
| **North Arm Farm** | **No** | — | — | New `VENUE_PAGES` entry + `/venues/north-arm-farm` (or exact slug you standardize) |
| **Brew Creek** | **No** | — | — | New entry + page (confirm official naming/spelling for SEO) |
| **Sunwolf** | Yes | `/venues/sunwolf` | **Strong** | Testimonials tagged “Sunwolf”; optional real wedding link |
| **Whistler (general intent)** | **Partial** | No single `/whistler-wedding-dj`; multiple Whistler venue URLs | **Adequate as cluster** | Dedicated hub page OR clear pillar page linking all Whistler slugs |
| **Vancouver / Sea-to-Sky corridor** | Yes | `/vancouver-wedding-dj` + regional copy sitewide | **Strong** | Link hub to venue guides + first planning article |

**Per-page enhancement checklist (when you implement):** unique hero imagery where licensing allows, 1–2 venue-specific testimonials, `Service` schema already present—consider `WebPage` or expanded FAQ only if it adds real Q&A, tighten CTA surfaces with consistent `surface` params for future `venue_page_view`.

---

## 8. Planning Authority Content Audit

| Topic (from strategy) | Exists as dedicated URL? | Where intent is partially covered today | Build order suggestion |
| ----------------------- | ------------------------- | ---------------------------------------- | ---------------------- |
| Keep dance floor packed | No | Homepage/reviews language; FAQ mentions dance floor in passing | **First** — bridges SEO + conversion proof |
| Best wedding songs / music planning | No | FAQ “music + personalization”; services copy | **Second** — playlist SEO is competitive; win with Sea-to-Sky angle |
| How to choose a wedding DJ in Squamish | No | Implicit in About + FAQ | **High** — pure local intent |
| Wedding reception timeline tips | No | FAQ references custom timeline in planning | **High** — natural FAQ internal links |
| Energetic / elegant / intentional wedding feel | No (essay form) | Brand copy across site | **Third** — brand pillar article |
| Sea-to-Sky wedding planning guidance | Partial | `/vancouver-wedding-dj`, venue guides | Combine into a **pillar** that links to venue cluster |

---

## 9. Social Proof Audit

**Strengths**

- `/reviews` is unusually strong: many **named** couples, several **dance floor** and **communication** proofs, thematic synthesis.
- Homepage includes **3 named** testimonials with light **geo** tags.

**Gaps vs. strategy**

- **Venue/context-specific proof:** Only a few quotes (e.g. Natasha Beaudry) mention venue meetings; most are generic “our wedding.”
- **Emotional transformation:** Some lines approach it (“get married all over again…”)—strategy wants **more density** and repetition of outcomes (“effortless,” “elegant and wild”).
- **Dance floor proof:** Strong in text on `/reviews`; **visual** proof is mostly **shared** hero/proof/weddings images—not a large gallery of distinct moments.
- **Real wedding imagery:** `public/images` is **small by design** (documented slots)—fine for launch, **underweight** for “authority” phase.
- **Review page:** Strong on copy; could eventually add **aggregate rating** schema **only** if ethically sourced and policy-compliant (not currently in repo).

**Improvements (non-generic):** Tag testimonials in CMS or data by **venue archetype** (barn, resort, museum, gondola); add **one** venue-specific quote module on matching `/venues/[slug]`; plan **2 new wide shots** that are clearly **crowd energy** without misrepresenting venue.

---

## 10. Conversion Funnel Audit

**Book a Consult**

- Implemented via **Calendly** URL (`CONSULT_CALENDLY_URL`); tracked with `book_consult_click` and surfaces (`hero`, `footer`, `contact_page_primary`, `venue_*`, etc.).

**Check Availability**

- Routes to `/contact#availability` (or scroll on same page); `check_availability_click` tracks surface.
- In-form **Check Availability** action uses `availability_check_start` / `availability_check_result` (not double-fired as navigation click—by design per prior implementation notes).

**Send a Message**

- Tertiary section `#send-message` with `ContactSecondaryInquiryForm`; separate Turnstile path; analytics use `contact_page_secondary` + standard submit events.

**Contact form fields (primary path after availability)**

- Collects name, partner, email, phone, venue, guest count, services, message, wedding date—aligned with qualified lead capture.

**Duplicate / excess CTAs**

- Many pages repeat **CTADuo** + “15 minutes · No pressure” — consistent **premium** rhythm; risk is **fatigue**, not confusion. `ConditionalSiteFinalDecisionZone` **reduces** redundant global finale on key routes.

**Button consistency**

- Primary = amber pill consult; outline = availability / secondary—consistent patterns in reviewed components.

**Mobile**

- Header: Menu + **Check Availability** as prominent control; CTAs meet **44px** touch targets in reviewed classes.

**Consult-first positioning**

- **Matches** strategy: contact hero emphasizes consult; availability is framed as parallel path, not inferior.

---

## 11. SEO / Metadata / Internal Linking Audit

**Titles / descriptions**

- Venue pages: unique `title` and `metaDescription` per slug in `generateMetadata`.
- Home uses absolute title; root layout supplies defaults elsewhere.

**Headings**

- Single H1 pattern on audited pages; venue pages use predictable H1: “Wedding DJ planning for {Venue}.”

**Internal links**

- Good: venue hub, cross-links from venue finale to reviews/faq/services.
- **Improve:** add **Venues** to **header** nav for crawl path + user discovery; add **contextual** links from `/weddings` and `/faq` into **pillar** articles once they exist.

**Cannibalization risk**

- **Home** vs **/weddings** both target “Squamish wedding DJ” language—acceptable if roles differ (home = brand/filter; weddings = service depth). Mitigation: keep **distinct** H1/title focus (e.g. weddings page already emphasizes “services” framing).

**Schema opportunities**

- **Article** schema when blog launches; **VideoObject** for proof video (optional); **LocalBusiness** only if NAP and policy support it (currently Organization + areaServed model).

---

## 12. Analytics / Measurement Readiness

| Event | In repo? | Notes |
| ----- | -------- | ----- |
| `availability_check_start` | Yes | From availability form |
| `availability_check_result` | Yes | On available/unavailable API success paths |
| `book_consult_click` | Yes | Multiple surfaces |
| `check_availability_click` | Yes | Navigation-style checks |
| `contact_form_start` | Yes | Primary + secondary forms |
| `contact_form_submit_success` / `_error` / `_attempt` | Yes | |
| `calendly_click` | Yes | From embedded consult links in flow |
| `testimonial_click` | **No** | — |
| `venue_page_view` | **No** (use GA4 page_view + content groups or custom event) | — |
| `faq_expand` | **No** | `<details>` has no analytics hook |
| `scroll_depth_75` | **No** | — |
| `gallery_view` | **No** | No dedicated gallery route observed |
| `instagram_click` / `spotify_click` | **No** | Not verified in audited files |
| `calendly_completion` | **No** in repo | Needs Calendly webhook → Measurement Protocol or manual CRM tagging |

**Note:** `availabilityCheckEventParams` sets `debug_mode: true` in production—intentional per comment for DebugView; plan to **remove or gate** when no longer needed so reports stay clean.

---

## 13. Recommended Roadmap

### Immediate (P0) — confirmation / low-risk

- Confirm GA4 **custom definitions** for `surface`, `form_type`, `availability_status`, `intent`.
- Verify availability **error paths** in Realtime (whether `availability_check_result` should fire on failure—product decision).
- Add **Venues** to primary nav when you next touch chrome (small IA win).

### Next 2 weeks

- Publish **first planning article** (dance floor or “choose a DJ in Squamish”) and link from FAQ + one venue guide.
- Add **North Arm Farm** and **Brew Creek** to `venue-pages.ts` using the existing template.
- Collect **3 venue-tagged** testimonials for upcoming on-page modules.

### Next 30 days

- **Featured wedding** #1 (even one strong page) with internal links to relevant venue guide.
- **Whistler pillar** page or enhanced `/venues` filtering by `area === "whistler"` section anchor (UX + SEO clarity).
- Phase 1 **measurement:** `faq_expand` or `venue_page_view` custom event (pick one for learning).

### Next 60–90 days

- 4–6 article library with internal linking mesh (venues ↔ guides ↔ services).
- **Image/gallery** expansion strategy (assets + optional `/gallery` if warranted).
- **Retargeting** pixels + consent banner policy as needed; availability-check audience in Ads platforms.

---

## 14. Top 5 Next Actions

1. **Ship two missing venue guides** (North Arm Farm, Brew Creek) using the existing dynamic route—fastest alignment with the written SEO plan.  
2. **Publish one flagship planning article** with Sea-to-Sky positioning and internal links from `/faq` and `/venues`.  
3. **Upgrade proof density** with venue-attributed quotes (data + optional block on matching venue pages).  
4. **IA:** surface **Venues** in the header nav to match the business’s venue-first SEO strategy.  
5. **Measurement:** add **one** depth event (`faq_expand` or `venue_page_view`) and plan removal/gating of `debug_mode: true` on availability params.

---

## 15. Files / Routes Reviewed

**Strategy sources**

- `docs/Strategic Priority Framework Howe Sound Event DJ.txt`
- `docs/HSDJ GA4 Strategic Analysis & Next-Step Roadmap.txt`

**App routes**

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/contact/page.tsx`
- `src/app/reviews/page.tsx`
- `src/app/weddings/page.tsx` (partial)
- `src/app/faq/page.tsx` (partial)
- `src/app/venues/page.tsx`
- `src/app/venues/[slug]/page.tsx`
- `src/app/vancouver-wedding-dj/page.tsx` (partial)

**Config / lib**

- `src/config/venue-pages.ts` (full)
- `src/config/venues.ts`
- `src/config/site-images.ts`
- `src/lib/analytics.ts` (full)
- `src/lib/json-ld.ts` (full)

**Components**

- `src/components/site-chrome.tsx`
- `src/components/conditional-site-final-decision-zone.tsx`
- `src/components/cta-duo.tsx`
- `src/components/book-consult-tracked-link.tsx`
- `src/components/check-availability-tracked-link.tsx`
- `src/components/contact-book-consult-section.tsx`
- `src/components/contact-page-cta-trio.tsx`
- `src/components/contact-availability-form.tsx` (partial)
- `src/components/contact-secondary-inquiry-form.tsx` (partial)
- `src/components/explore-site-links.tsx`
- `src/components/google-analytics.tsx`
- `src/components/json-ld.tsx`
- `src/components/homepage-hero-headline.tsx`
- `src/components/home-video-proof.tsx` (partial)

**Public assets (listing)**

- `public/images/**` (via `glob` + `site-images.ts`)
- `public/videos/home-proof.mp4` (confirmed present)

---

## 16. No-Change Confirmation

For this audit pass:

- **No** application code, copy, layout, SEO metadata, analytics logic, or assets were modified.  
- **Only** this report file was added: `docs/HSDJ_STRATEGY_SITE_AUDIT_REPORT.md`.

---

## 17. Post-Write Validation

Run after creating this document:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

*(Results recorded below immediately after execution.)*

### Validation results

| Command | Result |
| ------- | ------ |
| `npm run lint` | **Pass** (eslint, exit 0) |
| `npx tsc --noEmit` | **Pass** (exit 0; no diagnostics emitted) |
| `npm run build` | **Pass** (Next.js 16.2.3 production build, static generation for 34 routes including 18 venue slugs + hub) |
