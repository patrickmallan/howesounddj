# HSDJ OPUS Repo Intelligence Report

## Report metadata and freshness

| Field | Value |
|-------|-------|
| **Scan date** | 2026-04-15 |
| **Git SHA** | `eab6b919612d39fc8e389e735d94fd8bc5fdbe6e` |
| **Git short** | `eab6b91` |
| **Commit context** | `Copy, punctuation, asset paths, Turnstile env fallbacks, contact dynamic; ignore GCP key JSON filename pattern` |
| **Scan spec** | `docs/HSDJ OPUS SCAN.txt` (Tier-S scan contract, current revision) |
| **Supersession** | Any prior `logs/hsdj_opus_repo_intelligence_report.md` produced from an older commit is superseded by this report for backlog and operator decisions until a newer scan re-validates at HEAD. |

---

## Executive summary

howesounddj.com is a strong, well-structured Next.js marketing site for a Squamish-based wedding DJ. The codebase demonstrates high standards across conversion path integrity, trust/proof density, analytics hygiene, technical SEO, and local positioning. The site scores **97/100** on the weighted scan contract, placing it firmly in the **Excellent** band.

**Zero P0 or P1 defects were found.** The conversion funnel (Check Availability → availability API → inquiry form → Turnstile → Resend email) is complete, measurable, and well-guarded. Trust signals are dense and placed before scroll fatigue across commercial routes. Analytics events match contract naming, fire deterministically, and no-op safely in SSR.

The scan surfaces **one P2 finding** (homepage H1 softness), **three P5 findings** (metadata inconsistencies and a missing internal link), and **three P6 findings** (analytics enrichment opportunities). All are upgrade-worthy refinements, not blocking defects.

---

## Overall score and interpretation band

| **Total Score** | **97 / 100** |
|-----------------|--------------|
| **Band** | **90–100: Excellent** — implementation optional except maintenance |

---

## P0 / P1 / P2 defect register

### P0 — Conversion Integrity

**NONE FOUND** — verified via: `src/components/site-chrome.tsx` (header/footer CTAs), `src/app/contact/page.tsx`, `src/components/contact-availability-form.tsx` (full form flow with availability gating, Turnstile, analytics events, success/error states), `src/app/api/contact/route.ts` (Resend, validation, rate limit, Turnstile verify), `src/app/api/availability/route.ts` (Google Calendar + fallback), `env.example` (all required keys documented).

### P1 — Trust and Proof

**NONE FOUND** — verified via: `src/app/reviews/page.tsx` (12 named testimonials), `src/app/page.tsx` (3 testimonials on home, venue section with 16 venues from `src/config/venues.ts`, video proof via `src/components/home-video-proof.tsx`, proof image section, about preview with named identity), `src/app/about/page.tsx` (Patrick named, OIART training, 15+ years, Squamish-rooted).

### P2 — Message Clarity

| ID | Finding | File | Evidence | Business impact |
|----|---------|------|----------|-----------------|
| **P2-1** | Homepage H1 is soft: "Creating unforgettable wedding experiences." matches the scan contract FAIL pattern "vague copy ('creating unforgettable moments')". Service clarity (wedding DJ) relies on the badge above the H1 ("Squamish Wedding DJ · Sea-to-Sky") and the subhead, not the H1 itself. | `src/app/page.tsx:109` | `<h1>Creating unforgettable wedding experiences.</h1>` — badge at line 106 says "Squamish Wedding DJ · Sea-to-Sky" | The H1 is the strongest on-page SEO signal and the primary screen-reader heading. A specific H1 like the /weddings page ("Wedding DJ for Squamish, Whistler and the Sea-to-Sky, tailored to you.") would reinforce search intent and first-screen clarity without losing premium tone. Impact: moderate — affects CTR from SERPs and 3-second clarity for direct visitors. |

**Required action:** Rewrite the homepage H1 to include "wedding DJ" and geography (Squamish / Sea-to-Sky) directly. The badge can remain as secondary reinforcement. Preserve premium tone per non-regression invariants.

---

## P3+ defect register (and intentionally deferred items)

### P5 — Metadata Differentiation

| ID | Finding | File | Evidence | Business impact | Required action |
|----|---------|------|----------|-----------------|-----------------|
| **P5-1** | Vancouver page `twitter.images` uses `/og-default.svg` (SVG) while layout default and all other pages use `/og-share.jpg` (raster JPG). Some social platforms do not render SVG in card previews. | `src/app/vancouver-wedding-dj/page.tsx:25` | `images: ["/og-default.svg"]` vs layout `images: ["/og-share.jpg"]` | Twitter/social cards for the Vancouver landing page may show a blank or broken image, reducing click-through from social shares. | Align Vancouver twitter images to `/og-share.jpg` or provide a page-specific raster asset. |
| **P5-2** | Packages page body does not include an internal link to `/faq`, which the page contract requires ("Internal links: To /contact, /faq"). | `src/app/packages/page.tsx` | No `<a href="/faq">` or `<Link href="/faq">` found in the page body. Only `/contact` and `/reviews` are linked. | Minor: users comparing tiers may want to check FAQ for objection answers. Missing link reduces internal link equity to FAQ. | Add a contextual link to `/faq` in the packages page (e.g., near the pricing/availability note or the CTA section). |
| **P5-3** | Homepage OG image alt text says "Howe Sound Event DJ wedding dance floor" — uses "Event DJ" instead of "Wedding DJ". | `src/app/layout.tsx:40` | `alt: "Howe Sound Event DJ wedding dance floor"` | Very minor: alt text is not user-visible in social cards but affects accessibility metadata consistency. | Update alt to "Howe Sound DJ wedding dance floor" or "Howe Sound Wedding DJ dance floor". |

### P6 — Analytics Completeness

| ID | Finding | File | Evidence | Business impact | Required action |
|----|---------|------|----------|-----------------|-----------------|
| **P6-1** | `contact_form_submit_error` fires for Turnstile-not-ready (reason: `"turnstile_pending"`) without a preceding `contact_form_submit_attempt`. The analytics contract states "attempt precedes success or error for a given submit." | `src/components/contact-availability-form.tsx:120-124` | Error fires at L121; attempt only fires at L126 after Turnstile check passes. | Funnel analysis may count Turnstile rejections as errors with no corresponding attempt, inflating error:attempt ratio. Semantic justification exists (rejection before POST attempt). | Either (a) fire attempt before the Turnstile check so every submit gesture has an attempt, or (b) add an explicit exception for pre-POST validation errors in the scan contract analytics section. |
| **P6-2** | Calendly outbound links are rendered (`CALENDLY_URL` at L8; links at L222, L250) but no `calendly_click` event fires. Per analytics contract: "if outbound Calendly links exist, PASS requires event when GA is on." | `src/components/contact-availability-form.tsx:8,222,250` | `const CALENDLY_URL = "https://calendly.com/patrick-howesounddj"` — used in two `<a>` tags with no `onClick` tracking. | Calendly clicks from the contact flow are invisible in GA4; cannot measure how many leads use the consult path vs. the inquiry form. | Add `calendly_click` event to `ANALYTICS_EVENTS` in `src/lib/analytics.ts`; wire `onClick` handler on Calendly `<a>` tags; update this scan contract in the same change set. |
| **P6-3** | Form events send minimal custom params (error sends `reason`; attempt and success send no custom params). Recommended payload fields (`page_path`, `surface`, `form_type`, `status`) are not included. | `src/components/contact-availability-form.tsx:126,164` | `trackEvent(ANALYTICS_EVENTS.contactFormSubmitAttempt)` — no params. `trackEvent(ANALYTICS_EVENTS.contactFormSubmitSuccess)` — no params. | Minor: GA4 automatically captures page_path, so core attribution works. Adding `surface` and `form_type` would improve future funnel segmentation if multiple forms or CTA surfaces are added. | Enrichment only — add recommended params when touching the analytics code for P6-1 or P6-2. Not blocking. |

### Intentionally deferred

| Item | Tier | Reason |
|------|------|--------|
| `check_availability_click` event | P6 (deferred) | No CTA click tracking exists in the repo for header/footer/hero Check Availability buttons. Per analytics contract this is deferred / implementation-phase only. Add when CTA funnel analysis is needed. |
| `phone_click` / `email_click` events | P6 (N/A) | No `tel:` or `mailto:` links found in `src/`. N/A per contract until such links are added. |
| Blog / content expansion | P7 | No blog exists; FAQ provides long-tail coverage. Blog is optional per contract P7. |

---

## Per-layer scores (layers 1–10)

| Layer | Name | Weight | Score | Evidence | Issue | Business impact | Required action |
|-------|------|--------|-------|----------|-------|-----------------|-----------------|
| 1 | Search Visibility | 10 | **10** | Sitemap lists all 8 routes (no API routes); robots allows `/`; all titles unique; strong internal link graph from home to all money pages. | None | — | None |
| 2 | Message Clarity | 12 | **10** | Home badge "Squamish Wedding DJ · Sea-to-Sky" + subhead provide clarity; weddings H1 is strong; all pages have one clear H1. | P2-1: Home H1 is generic ("Creating unforgettable wedding experiences"). | H1 weakens SERP CTR and 3-second comprehension. | Rewrite home H1 to include "wedding DJ" + geography. |
| 3 | Trust & Authority | 16 | **16** | 12 named testimonials on /reviews; 3 on home; 16 venues in config; video proof; about page with named identity and credentials. | None | — | None |
| 4 | Conversion Engine | 18 | **18** | Check Availability in header + footer; contact flow complete with availability gating, Turnstile, Calendly escape, analytics; success/error UX present. | None | — | None |
| 5 | User Experience | 12 | **12** | Header CTA and mobile menu meet 44px touch pattern; form uses full-width inputs; responsive grid; priority hero image. | None | — | None |
| 6 | Brand Positioning | 8 | **8** | "Bangers Only", "Rooted in Squamish", "Real connection" — distinct, consistent across pages; no contradictions. | None | — | None |
| 7 | Content Depth | 6 | **6** | 14 FAQ Q/As across 5 groups; FAQ schema present; 3 package tiers with features; pricing stance explained. | None | — | None |
| 8 | Analytics | 8 | **7** | GA loads only with env; trackEvent no-ops in SSR; 3 contract events fire correctly; error includes `reason`. | P6-1: Error without attempt for Turnstile. P6-2: Calendly clicks untracked. | Funnel accuracy and Calendly visibility. | Fix attempt/error order; add calendly_click. |
| 9 | Offer Structure | 5 | **5** | 3 tiers (Celebration, Complete Wedding, Signature); features listed; consult/quote stance stated. | None | — | None |
| 10 | Local Dominance | 5 | **5** | Vancouver page targets corridor; 16 venues consistent; areaServed schema covers Squamish/Whistler/Vancouver/corridor; footer geo strings. | None | — | None |

---

## D1–D4 mandatory checklist results

### D1. Technical SEO — **PASS**

| Check | Result | Evidence |
|-------|--------|----------|
| Self-referencing canonical on production host | **PASS** | `metadataBase: new URL("https://www.howesounddj.com")` in `layout.tsx:23`. All 8 pages set `alternates.canonical` (relative paths resolved by metadataBase). Home uses absolute `https://www.howesounddj.com`. |
| No localhost / preview / Wix hosts | **PASS** | Verified via grep: no `localhost`, `vercel.app`, `wixsite`, or non-production hosts in metadata exports. |
| Robots allows commercial routes | **PASS** | `robots.ts`: `allow: "/"` for all user agents. |
| Sitemap matches route list | **PASS** | `sitemap.ts` lists exactly: `""`, `/weddings`, `/vancouver-wedding-dj`, `/about`, `/packages`, `/reviews`, `/faq`, `/contact`. No API routes. |
| Unique title + description per page | **PASS** | All 8 pages have differentiated titles and descriptions (verified per-page metadata exports). |
| OG + Twitter production URLs | **PASS** (minor P5-1) | Layout OG images use relative `/og-share.jpg` resolved by metadataBase. Vancouver page twitter overrides to `/og-default.svg` (SVG — see P5-1). |
| Organization JSON-LD in layout | **PASS** | `layout.tsx:67`: `<JsonLd data={organizationJsonLd()} />` |
| FAQ JSON-LD on FAQ page | **PASS** | `faq/page.tsx:195`: `<JsonLd data={faqPageJsonLd(faqStructuredData)} />` |
| Breadcrumb JSON-LD on Vancouver page | **PASS** | `vancouver-wedding-dj/page.tsx:144`: `<JsonLd data={vancouverWeddingDjBreadcrumbJsonLd()} />` |
| No accidental noindex | **PASS** | Layout sets `robots: { index: true, follow: true }`. No per-page noindex overrides. |
| One clear H1 per page | **PASS** | Each of 8 pages has exactly one `<h1>`. |

### D2. Analytics + Conversion Tracking — **PASS** (minor P6)

| Check | Result | Evidence |
|-------|--------|----------|
| GA loads only with env | **PASS** | `google-analytics.tsx:47`: `if (!gaId) return null` |
| Page views on navigation | **PASS** | `google-analytics.tsx:23-44`: `useEffect` sends `page_path` on pathname change with retry logic. |
| Form events: attempt / success / error | **PASS** | `contact-availability-form.tsx:126` (attempt), `:164` (success), `:121,151,158,168` (error with `reason`). |
| No duplicate / noisy firing | **PASS** | Each event fires once per code path; no effect-based wrapping. |
| Safe no-ops in SSR | **PASS** | `analytics.ts:20-22`: returns on `typeof window === "undefined"`, missing env, missing `gtag`. |
| Minor: attempt/error order | **P6-1** | Turnstile-pending error fires without preceding attempt (L121 before L126). |

### D3. Homepage + Contact Funnel CRO — **PASS**

| Check | Result | Evidence |
|-------|--------|----------|
| Hero: service + geography + differentiation | **PASS** (P2-1 on H1) | Badge: "Squamish Wedding DJ · Sea-to-Sky" (`page.tsx:106`). H1 is soft but first screen delivers clarity via badge + subhead. |
| Check Availability in header + footer | **PASS** | Header: `site-chrome.tsx:54-59`. Footer: `site-chrome.tsx:78-83`. Both link to `/contact`. |
| Trust before scroll fatigue | **PASS** | Home layout: hero → video proof → "Why" features → proof image → reviews → venues → services → about → FAQ → contact CTA. Trust appears early. |
| Availability check before inquiry | **PASS** | `contact-availability-form.tsx:75-115`: availability check gates inquiry form display. |
| Turnstile behavior | **PASS** | Graceful fallback when unconfigured: displays message with `TURNSTILE_SITE_KEY` guidance (`contact-availability-form.tsx:392-397`). |

### D4. Page-Level SEO + CRO — **PASS** (minor P5-2)

| Route | Result | Notes |
|-------|--------|-------|
| `/` | **PASS** | All contract clauses met. P2-1 on H1. |
| `/weddings` | **PASS** | Strong H1, full internal links, wedding-specific. |
| `/vancouver-wedding-dj` | **PASS** | Vancouver-explicit, breadcrumb JSON-LD, corridor positioning. P5-1 on twitter image. |
| `/packages` | **PASS** (P5-2) | Clear tiers, CTA present. Missing `/faq` internal link per contract. |
| `/reviews` | **PASS** | 12 named testimonials, CTA present, links to /contact, /packages, /about. |
| `/faq` | **PASS** | 14 Q/As, FAQ schema, accordion UX, CTA present. |
| `/about` | **PASS** | Named identity (Patrick), OIART, Squamish-rooted, CTA present. |
| `/contact` | **PASS** | Availability gating, inquiry form, Turnstile, Calendly, success/error states. |

---

## Page contract matrix (core routes)

| Route | Primary intent | Message | CTA | Trust/proof | Metadata | Internal links | Status |
|-------|---------------|---------|-----|-------------|----------|----------------|--------|
| `/` | Broad local discovery | ✅ (P2-1 on H1) | ✅ | ✅ Video, reviews, venues, about | ✅ Unique | ✅ All money pages | **PASS** |
| `/weddings` | Wedding service depth | ✅ | ✅ | ✅ Image, FAQ | ✅ Unique | ✅ packages, faq, contact, vancouver, reviews | **PASS** |
| `/vancouver-wedding-dj` | Vancouver + corridor | ✅ | ✅ | ✅ Reviews, breadcrumb | ✅ Unique (P5-1) | ✅ weddings, contact, reviews, packages, faq | **PASS** |
| `/packages` | Tier understanding | ✅ | ✅ | — | ✅ Unique | ⚠️ Missing /faq (P5-2) | **PASS** (minor) |
| `/reviews` | Social proof | ✅ | ✅ | ✅ 12 named | ✅ Unique | ✅ contact, about, packages | **PASS** |
| `/faq` | Long-tail + rich results | ✅ | ✅ | — | ✅ Unique | ✅ contact, packages, reviews | **PASS** |
| `/about` | Trust + identity | ✅ | ✅ | ✅ Named, credentials | ✅ Unique | ✅ contact, reviews, packages | **PASS** |
| `/contact` | Conversion | ✅ | ✅ | ✅ Turnstile, honest errors | ✅ Unique | ✅ reviews, packages, #availability | **PASS** |

---

## Analytics contract audit

### Required events

| Event | Status | File:Line | Params | Contract compliance |
|-------|--------|-----------|--------|---------------------|
| `contact_form_submit_attempt` | **IMPLEMENTED** | `contact-availability-form.tsx:126` | None | ✅ Fires once before POST. |
| `contact_form_submit_success` | **IMPLEMENTED** | `contact-availability-form.tsx:164` | None | ✅ Fires once on success. |
| `contact_form_submit_error` | **IMPLEMENTED** | `contact-availability-form.tsx:121,151,158,168` | `{ reason }` | ⚠️ P6-1: Turnstile error fires without preceding attempt. |

### Deferred events

| Event | Status | Evidence |
|-------|--------|----------|
| `check_availability_click` | **DEFERRED** | No CTA click events in repo. Deferred per contract. |
| `calendly_click` | **OPEN (P6-2)** | `CALENDLY_URL` at `contact-availability-form.tsx:8`; rendered at L222, L250. No tracking. Contract requires event or explicit N/A. |
| `phone_click` | **N/A** | No `tel:` links in `src/`. |
| `email_click` | **N/A** | No `mailto:` links in `src/`. |

### Safe no-op behavior

| Guard | Status | Evidence |
|-------|--------|----------|
| `typeof window === "undefined"` | ✅ | `analytics.ts:20` |
| Missing `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ✅ | `analytics.ts:21` |
| `typeof window.gtag !== "function"` | ✅ | `analytics.ts:22` |

### Duplicate prohibition

**PASS** — No effect-based wrapping of `trackEvent` for user gestures. Each event fires exactly once per code path. React Strict Mode double-invoke only applies to effects, not event handlers.

### Payload enrichment (recommended, not required)

Current: error events include `reason`. Attempt and success send no custom params.
Recommended additions for future: `page_path` (window.location.pathname), `surface` ("contact_form"), `form_type` ("inquiry"), `status` ("attempt" | "success" | "error").

---

## Recommended remediations (ordered by priority tier)

### P2 — Message Clarity

| ID | Remediation | Contract clause |
|----|-------------|-----------------|
| **P2-1** | Rewrite homepage H1 to include "wedding DJ" and geography. Example: "Squamish Wedding DJ for Sea-to-Sky Weddings" or "Your Squamish Wedding DJ — Sea-to-Sky, Whistler, Vancouver". Preserve premium tone. Badge can remain as secondary reinforcement. | Layer 2 PASS, Deterministic Copy/CRO Rules, Non-regression invariants (wedding positioning). |

### P5 — Metadata Differentiation

| ID | Remediation | Contract clause |
|----|-------------|-----------------|
| **P5-1** | Change Vancouver page `twitter.images` from `["/og-default.svg"]` to `["/og-share.jpg"]` (or a Vancouver-specific raster asset if available). | D1: OG + Twitter production URLs. |
| **P5-2** | Add an internal link to `/faq` in the packages page body (e.g., near pricing note or CTA section). | Page contract for /packages: "Internal links: To /contact, /faq." |
| **P5-3** | Update layout OG alt text from "Howe Sound Event DJ wedding dance floor" to "Howe Sound DJ wedding dance floor". | D1: metadata consistency. |

### P6 — Analytics Completeness

| ID | Remediation | Contract clause |
|----|-------------|-----------------|
| **P6-1** | Either (a) fire `contact_form_submit_attempt` before the Turnstile check so every submit gesture has an attempt event, or (b) add explicit contract exception for pre-POST validation errors. | Analytics contract: "attempt precedes success or error." |
| **P6-2** | Add `calendly_click` to `ANALYTICS_EVENTS` in `analytics.ts`; wire `onClick` on Calendly `<a>` tags in `contact-availability-form.tsx`; update scan contract event list in the same change set. | Analytics contract: Calendly link rendered → event required when GA is on. |
| **P6-3** | When touching analytics code for P6-1 or P6-2, enrich form events with recommended payload fields (`surface: "contact_form"`, `form_type: "inquiry"`, `status`). | Analytics contract: recommended payload shape. |

---

## Blockers (not provable from repo alone)

| Blocker | Why repo evidence is insufficient | How to resolve |
|---------|-----------------------------------|----------------|
| **Production canonical/redirect behavior** | Code sets `metadataBase` to `https://www.howesounddj.com` and all canonicals are consistent. However, whether the deployed site actually redirects apex → www (or vice versa) depends on Vercel/Cloudflare/DNS configuration, which is out of repo. A misconfigured redirect could create duplicate canonical signals despite correct code. | Verify via `curl -I https://howesounddj.com` and `curl -I https://www.howesounddj.com` that one redirects to the other with a 301. Check Search Console for indexing of both hosts. |
| **GA4 event firing in production** | Code paths are correct per static analysis. Whether events actually fire in the browser depends on GA4 measurement ID being set in Vercel env, gtag loading without ad blockers, and no GTM interference. | Verify via browser DevTools → Network tab → collect?v=2 requests on a real contact submission. Check GA4 DebugView. |
| **OG/Twitter card rendering** | `/og-share.jpg` is referenced but its existence, dimensions (1200×630), and render quality can only be verified by checking `public/og-share.jpg` on disk and testing via social card validators. | Run `test -f public/og-share.jpg && identify public/og-share.jpg` locally. Test URLs at https://cards-dev.twitter.com/validator and https://developers.facebook.com/tools/debug/. |
| **Turnstile in production** | Code handles configured/unconfigured gracefully. Whether the widget renders and tokens verify depends on Cloudflare dashboard configuration and env vars being set in Vercel. | Submit a test inquiry on the live site and verify Turnstile widget appears, token is generated, and server-side verification succeeds. |
| **Image assets existence** | `SITE_IMAGES` config references 6 image paths under `public/images/`. Code uses `ImageSlot` which handles missing images gracefully, but actual visual proof depends on files being present on disk. | Run `ls -la public/images/home/ public/images/about/ public/images/weddings/` to verify all referenced assets exist. |

---

## Re-run verification commands

```bash
cd ~/Desktop/howesounddj

# Report existence
test -f logs/hsdj_opus_repo_intelligence_report.md && echo "R_ok=1"

# Git identity
git rev-parse HEAD
git log -1 --oneline

# D1 — Canonical / metadata
rg -n "metadataBase" src/app/layout.tsx
rg -n "canonical" src/app/*/page.tsx src/app/vancouver-wedding-dj/page.tsx
rg -n "noindex" src/app/ --type ts

# D1 — Sitemap + robots
rg -n "url\|path" src/app/sitemap.ts
rg -n "allow\|sitemap" src/app/robots.ts

# D1 — JSON-LD
rg -n "JsonLd\|jsonLd\|json-ld" src/app/layout.tsx src/app/faq/page.tsx src/app/vancouver-wedding-dj/page.tsx

# D1 — H1 count per page
rg -c "<h1" src/app/page.tsx src/app/weddings/page.tsx src/app/vancouver-wedding-dj/page.tsx src/app/packages/page.tsx src/app/reviews/page.tsx src/app/faq/page.tsx src/app/about/page.tsx src/app/contact/page.tsx

# D2 — GA conditional load
rg -n "gaId" src/components/google-analytics.tsx | head -5

# D2 — Analytics events
rg -n "trackEvent\|ANALYTICS_EVENTS" src/components/contact-availability-form.tsx

# D2 — SSR safety
rg -n "typeof window" src/lib/analytics.ts

# D3 — CTA presence
rg -n "Check Availability" src/components/site-chrome.tsx

# P2-1 — Homepage H1
rg -n "<h1" src/app/page.tsx

# P5-1 — Vancouver twitter images
rg -n "twitter" src/app/vancouver-wedding-dj/page.tsx

# P5-2 — Packages internal links
rg -n 'href="/faq"' src/app/packages/page.tsx

# P6-2 — Calendly tracking
rg -n "CALENDLY_URL\|calendly_click" src/components/contact-availability-form.tsx src/lib/analytics.ts

# P6-1 — Attempt/error order
rg -n "trackEvent" src/components/contact-availability-form.tsx

# Deferred: tel/mailto links
rg -n "tel:\|mailto:" src/ --type ts --type tsx 2>/dev/null || echo "none_found"

# Build validation (optional — run if implementing)
# npm run lint && npm run build
```

---

## Scan spec evolution notes (optional)

No scan spec updates required from this scan. The contract accurately reflects the current repo state. All route paths, file references, analytics event names, and structural assumptions match the codebase at `eab6b91`.

**Potential future updates:**
- If P6-2 is resolved (add `calendly_click`), the analytics contract deferred events section should be updated to mark `calendly_click` as required rather than deferred.
- If P6-1 is resolved by option (b) (contract exception), the analytics contract "attempt precedes error" clause should add an explicit carve-out for pre-POST validation rejections.
- If additional CTA click events (`check_availability_click`) are added, the analytics contract deferred events section should be promoted to required.
