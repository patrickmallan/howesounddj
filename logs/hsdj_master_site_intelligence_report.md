# HSDJ Master Site Intelligence Report

**Scan date:** 2026-04-28
**Repository:** `/Users/patrickmallan/Desktop/howesounddj`
**Git commit:** `88cdaf6` — `88cdaf63ca173ee632375cfd0e80a05edede0dc5` (`chore: commit pending changes`)
**Scan spec:** `docs/HSDJ_MASTER_SITE_INTELLIGENCE_SCAN.md` v1.0
**Mode:** READ-ONLY. No application code modified.
**Supersession:** any prior `logs/hsdj_master_site_intelligence_report.md` from an older commit is superseded by this report for backlog and operator decisions until a newer scan re-validates at HEAD or the stated commit.

---

## 1. Executive summary

The repository is in **strong operational shape** for a focused wedding-DJ marketing and conversion site. The Next.js 16 / React 19 app uses App Router cleanly, separates server pages from client interactive components, ships a thoughtful availability + inquiry pipeline (Google Calendar with manual fallback merge, Cloudflare Turnstile, Resend with auto-reply, structured logs), and demonstrates real attention to a11y (skip-to-content, `useReducedMotion`, ARIA labels, keyboard-friendly nav) and SEO (canonicals, OG, sitemap, robots, organization + breadcrumb + service + FAQ JSON-LD).

There are **no CRITICAL defects**. The most material gaps are:

- **No CI** (`.github/workflows/` does not exist) — lint/typecheck/build is operator-discretionary; a regression that compiles but crashes at runtime, or stale typings, can ship if Vercel's build catches nothing else.
- **5 moderate `npm audit` advisories** in transitive deps (`postcss`, `uuid` via `next` and `resend`/`svix`) with no clean upgrade path inside current major versions.
- **Availability timezone semantics** — Google Calendar lookup uses **UTC** day bounds for a Pacific-Time wedding date; late-evening PT events on either side of the queried day can produce **false negatives or false positives** (manual `BOOKED_DATES` partially mitigates).
- **`public/og-share.jpg` is 2.29 MB** — exceeds the launch checklist's own ≤500 KB guidance; some social scrapers fall back or skip.
- **Homepage `/videos/home-proof.mp4` is 9.5 MB and autoplays** — meaningful mobile-data and CWV cost on first load.
- **Rate-limit on `/api/contact` is in-memory per serverless instance** — limited abuse protection; Turnstile is the real gatekeeper. Worth knowing, not urgent.
- Two large contact form components share substantial duplicated logic (date composer, digit-only handlers, Turnstile mount, GA scaffolding) — a clean bounded extraction opportunity.

**Verdict:** Production-ready, ship-ready. Close the four "world-class hygiene" items above and the site moves from "competent local site" to "site that signals a deliberate, professional operator." Single strongest next move is at the bottom (§10).

---

## 2. Scan scope & method

**Surfaces audited:** `src/app/`, `src/components/`, `src/lib/`, `src/config/`, `src/data/`, `src/types/`, `src/app/api/`, `public/`, `docs/`, `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.gitignore`, `env.example`, `README.md`, `AGENTS.md`, `CLAUDE.md`, `.github/` (verified absent).

**Method:** Bounded `rg` and direct file reads. `npm audit --omit=dev` was run (read-only). No application code or tracked configs modified. Single artifact written: this report.

---

## 3. Product & experience capability scorecard (Capability Fitness analog)

| ID | Dimension | Status | Score 0-5 | Evidence |
|----|-----------|--------|-----------|----------|
| PC-01 | Performance & CWV readiness | PARTIAL | **3** | Hero/proof WebPs ~115-155 KB; `next/image` with explicit `sizes`; **but** `og-share.jpg` 2.29 MB and `home-proof.mp4` 9.5 MB autoplays muted on home (`src/components/home-video-proof.tsx:47-58`). |
| PC-02 | SEO & indexing | IMPLEMENTED | **5** | Per-page `metadata` + `alternates.canonical` on every route (`rg metadata src/app`); `metadataBase` set in layout; `sitemap.ts` enumerates static + venue slugs; `robots.ts` allows all + sitemap link; OG + Twitter wired; `next.config.ts` ships **14 permanent (308) redirects** matching `docs/WIX_MIGRATION.md`. |
| PC-03 | Accessibility | IMPLEMENTED | **4** | Skip-to-content (`layout.tsx:74-79`); `aria-current` on nav (`site-chrome.tsx:58,86,102`); `aria-labelledby` on major sections; `useReducedMotion` everywhere motion lives (`section-reveal.tsx`, `stagger-reveal.tsx`); honeypot field hidden via `aria-hidden` + offscreen positioning; visible focus rings; min 44 px touch targets on header CTA. Light gap: mobile menu is `<details>`/`<summary>` without explicit `aria-expanded` and no focus-trap when open. |
| PC-04 | Trust & proof | IMPLEMENTED | **4** | Reviews page with **12 named testimonials** (`/reviews`); homepage feature grid; FAQ + venue guides reinforce E-E-A-T; About cites OIART training; structured data: `Organization`, `Service` (per venue), `BreadcrumbList`, `FAQPage`. Light gap: `Organization` schema lacks `telephone`/`address`/`sameAs` — intentional per `lib/json-ld.ts` comment ("no street address; no verified social profiles"). |
| PC-05 | Conversion architecture | IMPLEMENTED | **5** | Dual primary CTAs (Check Availability + Book a Consult) on every key page; tracked via stable GA4 event names (`ANALYTICS_EVENTS`); same-page hash scroll handled in `check-availability-tracked-link.tsx:35-48`; `/contact` page mirrors both flows with explicit copy on which is which. |
| PC-06 | Mobile & responsive | IMPLEMENTED | **4** | Min-tap targets ≥ 44 px on header CTA (`site-chrome.tsx:71,118`); `details`-based mobile menu auto-closes on navigation (`site-chrome.tsx:32-34`); responsive grid breakpoints (`md:`, `lg:`, `xl:`). One observed risk: `details`/`summary` opening is not closed on outside click — minor. |
| PC-07 | Content system | IMPLEMENTED | **4** | Venue guides driven by `src/config/venue-pages.ts` (single source); `[slug]/page.tsx` uses `generateStaticParams`; sitemap auto-includes all slugs. Homepage is hand-authored, ~476 lines, mixing data + JSX (see WEB-1). |
| PC-08 | Internationalization | N/A — single locale | **3** | `lang="en-CA"`, `locale: "en_CA"` set; no i18n abstraction. Acceptable for the business. |
| PC-09 | Analytics & instrumentation | IMPLEMENTED | **5** | `gtag` strictly gated by `NEXT_PUBLIC_GA_MEASUREMENT_ID` (`analytics.ts:28`); 10 stable event names declared; `homepage_headline_view` + `headline_variant` payload supports the A/B/C experiment cleanly; no PII in event params (only `surface`, `form_type`, `page_path`, `headline_variant`, `result`). |
| PC-10 | Brand & UX cohesion | IMPLEMENTED | **5** | Centralized motion tokens (`lib/motion-tokens.ts`); single CTA alignment helper (`lib/cta-alignment.ts`); shared button class names (`book-consult-tracked-link.tsx`); consistent amber-300 accent + dark surface; `atmosphere-grain` and `premium-surface` utility classes for reusable feel. |

**PC capability gap register (≤25 rows; bounded, severity-tagged):**

| Gap | Severity | Remediation one-liner |
|-----|---------|----------------------|
| `og-share.jpg` 2.29 MB | HIGH | Re-export at 1200×630, target ≤300 KB JPG (mozjpeg/squoosh). |
| Home video 9.5 MB autoplay | HIGH | Switch `preload="auto"` → `preload="metadata"`; consider `IntersectionObserver` lazy-mount or smaller poster-only treatment on mobile (≤480 px). |
| OG fallback `/og-default.svg` referenced as `Organization.logo` | LOW | Replace with raster logo at 600×600+ when available; LinkedIn/X dislike SVG logos. |
| Mobile menu missing `aria-expanded` semantic | LOW | Add `<button aria-expanded>` pattern instead of `<details>`, **or** keep `<details>` and accept (most AT readers handle both). |
| Some `description` fields >160 chars | LOW | Trim FAQ/venues to ≤160 chars where Google may truncate. |
| No GA4 consent banner | LOW (CA jurisdiction) | Optional. Add a privacy notice link in footer if you collect any cookies cross-site. |

**checked_surfaces:** `src/app/**`, `src/components/**`, `src/lib/**`, `public/`, layout, route metadata, `globals.css`.
**commands_used:** `rg -n "metadata|generateMetadata|openGraph|alternates" src/app`, `stat -f` on `public/og-share.jpg` and `public/videos/home-proof.mp4`, direct reads of layout / pages / components.
**what_was_verified:** SEO meta presence on every route; reduced-motion behavior; analytics gating; touch-target sizing on primary CTAs; OG asset presence and size; honeypot wiring.
**what_remained_unproven:** real-user CWV (no field data here — needs Search Console / GA4 web vitals); browser-level keyboard testing of every form; cross-browser font loading.

---

## 4. Architecture & codebase opportunity register (Architectural Opportunity analog)

**Register cap: 15.** Reason codes per scan spec.

### Executive summary (architecture)

The repo follows the App Router conventions cleanly. **Server pages** import metadata + visual components; **client components** carry the `"use client"` directive only where they need state, refs, or browser APIs (forms, tracked links, motion wrappers, mobile menu, GA loader). `lib/` holds pure helpers and integrations and never reaches into UI; `components/` does not import API routes. Layering is correct.

The two genuinely high-leverage opportunities are (a) extracting shared form scaffolding from the two contact form components, and (b) consolidating duplicated copy strings (site description + brand statements) into a single content module. Most other observations are LOW priority.

### Architectural Opportunity Register

| ID | Code | Family | Surface | Current owner | Problem | Proposed pattern | Impact | Implementation class | Status |
|----|------|--------|---------|---------------|---------|------------------|--------|----------------------|--------|
| AO-1 | WEB-7 / WEB-11 | Form scaffolding | `src/components/contact-availability-form.tsx` (647 LOC), `src/components/contact-secondary-inquiry-form.tsx` (426 LOC) | Two client components | Duplicate `digitsOnly`, `composedWeddingDate`, `isForwardInput`, Turnstile mount/unmount lifecycle, `clientPagePath`, GA event emit scaffolding | Extract `src/components/forms/_shared/{date-composer-hook.ts, turnstile-widget-hook.ts, ga-form-events.ts}`; both forms consume hooks | medium → strategic | bounded extraction (local) | implement_now |
| AO-2 | WEB-2 / WEB-5 | Site copy | `src/app/layout.tsx`, `src/lib/json-ld.ts`, page-level `description`s | Per-page `Metadata` literals | Site-level brand description duplicated as `siteDescription` (layout) + `ORG_DESCRIPTION` (json-ld) + similar phrasing on `/`, `/weddings`, `/vancouver-wedding-dj` | Single `src/config/brand-copy.ts` exporting canonical descriptions; layout/json-ld/pages import | medium | shared_contract_extraction | implement_now |
| AO-3 | WEB-1 | Homepage data co-location | `src/app/page.tsx:42-116` | Homepage server component | `testimonials`, `features`, `services`, `faqs` arrays embedded inline (~75 LOC of data) before JSX | Move to `src/config/home-content.ts` (or per-section under `src/components/home/`); page.tsx imports | low | local_extraction | implement_after_unlock |
| AO-4 | WEB-13 | Calendar + booked-dates layering | `src/lib/google-calendar.ts`, `src/data/booked-dates.ts`, `src/app/api/availability/route.ts` | API route + lib + data | Already layered correctly: route reads merged result of lib + data | none — terminal boundary | n/a | terminal_boundary | terminal_boundary |
| AO-5 | WEB-13 | Email pipeline | `src/lib/inquiry-email.ts`, `src/lib/turnstile.ts`, `src/lib/contact-rate-limit.ts`, `src/app/api/contact/route.ts` | API route + lib | Email formatter, Turnstile verifier, and rate limiter cleanly extracted; route orchestrates | none — terminal boundary | n/a | terminal_boundary | terminal_boundary |
| AO-6 | WEB-15 | Tracked link surfaces | `src/components/check-availability-tracked-link.tsx`, `src/components/book-consult-tracked-link.tsx` | Two client components | Two near-identical components diverge only on destination + event name + `surface` union | Extract `useTrackedCtaClick({event, surface, destination})` and a single `<TrackedLinkOrAnchor>` primitive | low | local_extraction | implement_after_unlock |
| AO-7 | WEB-7 | Server/client boundary clarity | `src/app/contact/page.tsx:14-20` | Server page + client form | `turnstileSiteKey()` resolves on the server but the client also reads `process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY` as a backup — two sources of truth for the same value | Pick one; pass via prop only OR rely on `NEXT_PUBLIC_*` only | low | dependency_fix | implement_after_unlock |

### Family cluster map

- **Form family** (AO-1, AO-6) — high-density duplication; single bounded extraction de-risks future form changes.
- **Brand-copy family** (AO-2) — small but multi-file drift risk; cheap to fix.
- **Data pipeline family** (AO-4, AO-5) — terminal; do not over-engineer.
- **Server/client boundary** (AO-7) — minor; clarify when you next touch the form.

### Dependency-direction notes

`lib/` ↔ `components/` ↔ `app/` direction is correct. No `lib` imports `components`; no `components` imports `app/api/*`. `src/config/venue-pages.ts` is consumed by both `app/sitemap.ts` and `app/venues/[slug]/page.tsx`, which is correct. **No inversions detected.**

### Single strongest bounded next move (architecture)

**Extract shared form scaffolding (AO-1).** Both contact forms together are >1000 LOC with non-trivial duplicated state machines. Extracting `useDateComposer()`, `useTurnstileWidget()`, and a thin `<TurnstileWidget>` component into `src/components/forms/_shared/` gives a single place to fix the inevitable next form behavior (e.g. paste-handling for date, Turnstile timeout, expanded GA payloads). Bounded; finishes in a single PR; immediate change-velocity payoff.

### Red Team QC notes (rejected)

- "Move `lib/google-calendar.ts` into `src/integrations/`" — cosmetic, no payoff. Rejected.
- "Co-locate JSON-LD with page" — duplicated breadcrumb logic across pages would grow; central `lib/json-ld.ts` is correct. Rejected.
- "Server-only mark on every API helper" — overkill for this footprint; existing `runtime = "nodejs"` is enough. Rejected.

---

## 5. Data & integration integrity (Data Pipeline Integrity analog)

**Register cap: 20.** Findings only where the gap could measurably hurt couples or the business.

### Data flow map

1. **Availability flow:**
   `client form` → `POST /api/availability` (`route.ts`) → `isValidCalendarDate(YYYY-MM-DD)` → `BOOKED_DATES.includes(date)` (manual) **AND** `isDateBookedInGoogleCalendar(date)` (lib) — merged: `googleBooked === null ? manualBooked : googleBooked || manualBooked` → JSON response with copy.
2. **Contact / inquiry flow:**
   `client form` → `POST /api/contact` → IP-based in-memory rate limit → JSON parse → honeypot check (`company`) → field validation (different rules for `formType === "secondary_inquiry"` vs default) → env config check (Resend, mail, Turnstile secret) → `verifyTurnstileToken` → Resend operator email → Resend client auto-reply (failure non-fatal) → JSON success.
3. **Consult flow:**
   `BookConsultTrackedLink` opens `https://calendly.com/patrick-howesounddj` in a new tab; GA event `book_consult_click` fires.
4. **Analytics flow:**
   `gtag.js` loads only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set; `page_path` sent on initial mount and route changes; custom events from forms and CTAs include `surface`, `form_type`, `result`, `headline_variant`, `page_path` — no PII.
5. **Static content:**
   Venues hub + `[slug]` pages source from `src/config/venue-pages.ts`; sitemap follows `getAllVenueSlugs()`; redirects in `next.config.ts` match `docs/WIX_MIGRATION.md`.

### Data integrity family cluster map

| Family | Surfaces | Posture |
|--------|----------|---------|
| Calendar truth | `lib/google-calendar.ts`, `data/booked-dates.ts` | strong (merge), with timezone caveat |
| Inquiry email | `route.ts`, `inquiry-email.ts`, `turnstile.ts`, `contact-rate-limit.ts` | strong; rate-limit value diluted on serverless |
| Bot defense | Honeypot + Turnstile (server-verified) | strong |
| Analytics PII | `analytics.ts` events | clean (no PII) |
| Static content | `venue-pages.ts`, `site-images.ts`, `venues.ts` | clean |

### Data Integrity Risk Register

| ID | Family | Surface | Problem type | Proposed pattern | Integrity impact | Status |
|----|--------|---------|--------------|------------------|------------------|--------|
| DI-1 | Calendar truth | `src/lib/google-calendar.ts:48-49` (`timeMin`/`timeMax` use `T00:00:00.000Z` / `T23:59:59.999Z`) | `timestamp_semantics_gap` | Build the day window in **America/Vancouver** (e.g. `Date` with explicit `-07:00` offset around the date or use `Intl.DateTimeFormat` to compute local-day UTC bounds; ic-al's `fromZonedTime` works too) | **HIGH** — risk of false-negative (PT evening event missed because it falls in next UTC day) and false-positive (event on prior PT day showing up in queried UTC day). Manual `BOOKED_DATES` partly compensates. | implement_now |
| DI-2 | Bot defense | `src/lib/contact-rate-limit.ts` | `silent_fallback_risk` | In-memory `Map` resets on serverless cold start; effective rate limit is per-instance only. Either keep + accept (Turnstile is the real gate) or upstream to Vercel Edge Middleware / Cloudflare WAF for a durable limiter | MEDIUM | implement_after_unlock |
| DI-3 | Email pipeline | `src/app/api/contact/route.ts:212-265` | `silent_fallback_risk` | Auto-reply failure is intentionally non-fatal (operator email already succeeded). Confirm behavior with operator-facing notice — currently logs only via `console.error` | LOW | implement_after_unlock |
| DI-4 | Calendar truth | `BOOKED_DATES` is a static TS array | `provenance_gap` | Acceptable as fallback; document operator update cadence in README. Already noted in launch checklist (§6 operator note). | LOW | terminal_boundary |
| DI-5 | Analytics | `availability_check_result` always emits `status: "success"` even on failure path (`contact-availability-form.tsx:151-174`) | `silent_fallback_risk` | Set `status: "error"` (or `network_error`) when `!res.ok` or `data.success === false` so GA reports show real error rate | LOW | implement_now |
| DI-6 | Inquiry email | `[contact] config_check` log always logs whether secrets exist | `provenance_gap` | Acceptable diagnostic; verify Vercel function log retention so secrets discovery (yes/no booleans) is operator-visible only | LOW | terminal_boundary |
| DI-7 | Calendar truth | `isDateBookedInGoogleCalendar` swallows all errors → `null` (`google-calendar.ts:62-64`) | `silent_fallback_risk` | Add a structured `console.error("[availability] google_lookup_failed", { code })` so operators see auth/rotation failure without breaking UX | LOW | implement_now |

### Paper vs live parity notes
N/A — there is no paper/live concept on a marketing site. Closest analog is **dev vs prod env**: `NEXT_PUBLIC_GA_MEASUREMENT_ID` and `GOOGLE_CALENDAR_ENABLED` should differ between local and prod (`docs/LAUNCH_CHECKLIST.md` §10 covers this).

### Replayability & provenance notes
Inquiry emails capture `receivedAt` ISO timestamp + `inquirySource` (`availability_led` vs `secondary_question`) — sufficient for operator triage. No durable archive (Resend is the system of record). For audit, Resend's dashboard is canonical.

### Top bounded next move (data)
**Fix the calendar timezone window (DI-1).** It is one file, ten lines, and removes a real availability-misreporting risk for popular evening Pacific events.

---

## 6. High-ROI / launch-gap verification (High-ROI Gap analog)

| ID | Tier | Item | Status | Evidence |
|----|------|------|--------|----------|
| T1-1 | 1 | `npm run lint` + `npm run build` documented and ideally CI-enforced | **PARTIAL** | Both scripts exist (`package.json`); documented in `docs/LAUNCH_CHECKLIST.md §137-142`. **No `.github/workflows/`** — no automated PR enforcement. Vercel build will block deploys, but stale lint/typecheck regressions can land on `main`. |
| T1-2 | 1 | `docs/LAUNCH_CHECKLIST.md` env vars match code | **PASS** | Cross-referenced: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `TURNSTILE_SITE_KEY`/`SECRET_KEY`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, all `GOOGLE_*` — all consumed in code (`route.ts`, `analytics.ts`, `contact/page.tsx`, `google-calendar.ts`). `env.example` matches docs. |
| T1-3 | 1 | Wix legacy redirects per `docs/WIX_MIGRATION.md` | **PASS** | `next.config.ts:11-83` declares 14 permanent (308) redirects covering legacy paths (`/squamish-dj-services`, `/a-little-about-me`, `/wedding-dj-packages-in-squamish`, `/whistler-wedding-dj-services`, `/about-howe-sound-wedding-dj`, `/dj-packages`, `/whistler-dj-services`) with and without trailing slash. |
| T2-1 | 2 | `/api/contact` + `/api/availability` explicit error surfaces and logging | **PASS** | `/api/contact`: `console.log("[contact] stage", data?)` for happy path stages and `console.error("[contact] resend_send_error" / "_exception" / "client_auto_reply_send_error")` for failures; never logs secrets or full PII (just booleans / IDs). `/api/availability`: returns clear copy; **but** swallows Google errors silently (DI-7). |
| T2-2 | 2 | GA4 events documented in code + `README.md` | **PASS** | `src/lib/analytics.ts` `ANALYTICS_EVENTS` const exports 10 stable names; README §57-63 documents three contact events; `LAUNCH_CHECKLIST.md §10` covers GA setup and validation. |
| T3-1 | 3 | Automated accessibility / smoke tests | **FAIL** | No tests directory, no `axe-core`, no Playwright. |
| T3-2 | 3 | Backup content strategy when Google Calendar disabled | **PASS** | `route.ts:48-53` merges `BOOKED_DATES.includes(date)` regardless; `google-calendar.ts:33-37` returns `null` when `GOOGLE_CALENDAR_ENABLED` ≠ `"true"`/`"1"`/`"yes"`. README and launch checklist document fallback. |

### Mandatory audit booleans

1. **Lint in CI?** — **NO**. No `.github/workflows/` directory. Mitigation: Vercel build fails on TS/lint errors but only at deploy time.
2. **Build in CI?** — **NO** (same).
3. **`env.example` matches required server/client env vars?** — **YES**. Cross-checked against `route.ts`, `google-calendar.ts`, `analytics.ts`, `turnstile.ts`, `contact/page.tsx`.
4. **Availability API failure fallback explicit?** — **YES**. `googleBooked === null ? manualBooked : googleBooked || manualBooked` (`route.ts:52`).
5. **Contact API rate limiting present?** — **YES, with caveat**. `contact-rate-limit.ts` exists and is invoked first in `POST /api/contact` (`route.ts:84-94`). Caveat: in-memory `Map`, so per-instance only on Vercel serverless (DI-2).

---

## 7. Full repository intelligence (OPUS analog, compressed)

### Component / route map (high-level)

```
app/
  layout.tsx ........ org JSON-LD, GA loader, header/footer
  page.tsx .......... homepage (hero + explore + video proof + features + reviews + venues + services + about + faq + contact CTA)
  contact/page.tsx .. consult-first + availability + secondary inquiry + email
  weddings/ ......... services positioning
  packages/ ......... 3-tier offering + add-ons
  reviews/ .......... 12 testimonials + theme summary
  about/ ............ Patrick story + credibility
  faq/ .............. grouped accordion + FAQPage JSON-LD
  vancouver-wedding-dj/ landing for Vancouver couples
  venues/page.tsx ... hub
  venues/[slug]/page.tsx static-paramed detail w/ Service JSON-LD
  api/contact/route.ts (Node runtime; Resend + Turnstile + rate-limit)
  api/availability/route.ts (Node runtime; Calendar + manual merge)
  sitemap.ts, robots.ts
components/
  site-chrome.tsx, json-ld.tsx, google-analytics.tsx
  hero-sound-identity.tsx, homepage-hero-headline.tsx, brand-anchor-statement.tsx
  home-video-proof.tsx, image-slot.tsx
  motion/{section-reveal,stagger-reveal}.tsx
  contact-{availability,secondary-inquiry,book-consult-section}-form*.tsx
  {check-availability,book-consult}-tracked-link.tsx
  explore-site-links.tsx
lib/
  analytics.ts, experiment.ts, motion-tokens.ts, cta-alignment.ts
  consult-calendly.ts, contact-rate-limit.ts, turnstile.ts
  inquiry-email.ts, google-calendar.ts, json-ld.ts
config/
  site-images.ts, venue-pages.ts, venues.ts
data/booked-dates.ts
types/{contact-api,gtag.d,turnstile-globals.d}.ts
```

### CEO-style risk register (severity-tagged)

> Format: `id | severity | domain | confidence | runtime | blast | scope | proof_command | minimal_proof | why_not_false_positive | remediation`

| id | severity | domain | confidence | runtime | blast | scope | proof_command | minimal_proof | why_not_false_positive | remediation |
|----|----------|--------|-----------|---------|-------|-------|----------------|----------------|--------------------------|-------------|
| H-1 | HIGH | I (deps) | HIGH | P1 | LOCAL | dev+prod chain | `npm audit --omit=dev` | `5 moderate severity vulnerabilities (postcss <8.5.10 via next; uuid <14 via resend/svix)` | Verified by running `npm audit`; fixes require breaking-change majors of next/resend | Track upstream; bump `next` to next minor when PostCSS-fixed version ships; revisit `resend` when v7 stable |
| H-2 | HIGH | V (governance) | HIGH | P2 | LOCAL | repo | `ls -la .github/workflows 2>/dev/null` | empty (directory does not exist) | Verified absent; relies entirely on Vercel build for safety net | Add `.github/workflows/ci.yml` running `npm ci && npm run lint && npm run build` on PR + push |
| H-3 | HIGH | H (data) | HIGH | P1 | SUBSYSTEM | availability | read `src/lib/google-calendar.ts:48-49` | `timeMin = ${date}T00:00:00.000Z; timeMax = ${date}T23:59:59.999Z` | Pacific Time wedding dates and UTC-windowed events do not align; concrete edge cases described in DI-1 | Switch to Vancouver-timezone day bounds (see DI-1) |
| H-4 | HIGH | T (perf) | HIGH | P1 | LOCAL | social previews | `stat -f "%z" public/og-share.jpg` | `2292718` bytes (2.29 MB) | Launch checklist itself recommends ≤500 KB; some scrapers cap | Re-export 1200×630 JPG ≤300 KB |
| H-5 | HIGH | T (perf) | HIGH | P1 | LOCAL | homepage CWV | `stat -f "%z" public/videos/home-proof.mp4` and read `src/components/home-video-proof.tsx:47-58` | 9.5 MB MP4 with `autoPlay loop muted preload="auto"` | First-load mobile data + LCP/INP cost; runs on every homepage visit | `preload="metadata"`, lower bitrate to 720p target ≤2-3 MB, or `IntersectionObserver`-mount on viewport |
| M-1 | MEDIUM | L (abuse) | HIGH | P2 | LOCAL | /api/contact | read `src/lib/contact-rate-limit.ts` | `const hits = new Map<string, number[]>();` | Module-scope state; serverless instances reset on cold start; per-instance only | Either accept (Turnstile is primary) or move to durable limiter (Vercel KV / Upstash Redis / Edge Middleware) |
| M-2 | MEDIUM | H (data) | MEDIUM | P3 | LOCAL | analytics fidelity | read `src/components/contact-availability-form.tsx:151-194` | All `availability_check_result` events emit `status: "success"` | Misreports failure rate in GA4 dashboards | Set `status: "error"` on `!res.ok`/`data.success===false`/exception |
| M-3 | MEDIUM | A (arch) | HIGH | P3 | SUBSYSTEM | forms | `wc -l src/components/contact-availability-form.tsx src/components/contact-secondary-inquiry-form.tsx` | `647 426 LOC; lots of identical helpers` | Real duplication across two prod components | Extract `forms/_shared/{date-composer,turnstile-widget,ga-form-events}` (AO-1) |
| M-4 | MEDIUM | A (arch) | MEDIUM | P3 | LOCAL | brand copy | `rg "siteDescription|ORG_DESCRIPTION" src/app src/lib` | repeated in `layout.tsx:20-21` and `lib/json-ld.ts:4-5` | Drift risk on copy edits | Single `src/config/brand-copy.ts` (AO-2) |
| M-5 | MEDIUM | G (SEO) | MEDIUM | P2 | LOCAL | indexing | `rg "alternates: { canonical:" src/app/page.tsx` | `canonical: "https://www.howesounddj.com"` (absolute) | Other routes use relative path with `metadataBase`; mismatch is benign but inconsistent | Either set all canonical to absolute or all to relative; minor consistency |
| L-1 | LOW | V (gov) | HIGH | P3 | LOCAL | repo | `ls -la "Webpage links .txt"` | exists at repo root | Operator notes file in root; acceptable but unusual | Move into `docs/` or remove if obsolete |
| L-2 | LOW | E (3rd-party) | MEDIUM | P3 | LOCAL | scraping | `rg "mailto:patrick@howesounddj.com" src` | `src/app/contact/page.tsx:155-160` | Plain `mailto:` link exposes address to scrapers | Acceptable; Cloudflare email obfuscation can mitigate |
| L-3 | LOW | I (deps) | HIGH | P3 | LOCAL | starter assets | `rg "file\.svg|globe\.svg|next\.svg|vercel\.svg|window\.svg" src` | no matches | Default Next.js scaffolding SVGs in `public/` are unreferenced | Delete from `public/` |
| L-4 | LOW | S (secrets) | HIGH | P3 | LOCAL | exposure | read `env.example` and `docs/LAUNCH_CHECKLIST.md` | `GOOGLE_CALENDAR_ID` / `GOOGLE_CLIENT_EMAIL` / `GOOGLE_PROJECT_ID` committed | These are operationally non-secret but somewhat sensitive (calendar ID is essentially read-token-prone if shared; service-account email is fine) | Acceptable; the **`GOOGLE_PRIVATE_KEY`** is a placeholder and never committed (`.gitignore` covers `*.json` SA files and `*.env*`) |
| L-5 | LOW | J (observability) | HIGH | P3 | LOCAL | calendar errors | read `src/lib/google-calendar.ts:62-64` | `} catch { return null; }` | Operator can't see Google API failure cause without try/catch logging | Add `console.error("[availability] google_lookup_failed", { code: e?.code })` (DI-7) |
| L-6 | LOW | U (operator) | MEDIUM | P3 | LOCAL | docs | read `docs/HSDJ OPUS *.txt` | Multiple legacy `OPUS` text files in `docs/` | Old scan templates next to current docs; mild operator confusion | Move into `docs/archive/` or delete if superseded by master scan |

### CI / invocation map

- `.github/workflows/`: **does not exist**. Verified `ls -la .github/` returns no such directory.
- `docs/LAUNCH_CHECKLIST.md`: documents `npm run lint` and `npm run build` as **optional** local checks.
- `package.json`: `dev`, `build`, `start`, `lint` (raw `eslint`).
- Vercel: build runs on push/PR by default (operator-managed); failure blocks deploy.
- **No automated tests, no E2E, no Lighthouse CI, no axe-core wiring.**

### Security & secrets hygiene

- `.gitignore` excludes `.env*` (with `!env.example` and `!.env.example` allowlisted), `*-service-account*.json`, `*service-account*.json`, `google-credentials.local.json`, `howe-sound-dj-*.json` — **strong**.
- `env.example` contains placeholders only. `GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nPASTE_NEW_KEY_HERE\n-----END PRIVATE KEY-----\n"` — placeholder.
- `rg -n "console\.log" src` returns logs in `src/app/api/contact/route.ts` only; payloads are bounded booleans + IDs, never raw secrets or full PII.
- HTTP security headers: `next.config.ts` does not set custom `headers()`. Vercel ships sane defaults; consider explicit `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` once you also add CSP — **LOW priority** for marketing site, but a fast win.
- `npm audit --omit=dev`: 5 moderate (see H-1).

### Dead asset check

- `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`: **0 inbound references** in `src/`. ORPHAN_CANDIDATE — safe to delete (L-3).
- `Webpage links .txt`, `docs/Howe Sound DJ.txt`, `docs/Howesounddj Git Push.txt`, `docs/HSDJ core layers.txt`, `docs/HSDJ OPUS AUTO INGEST MODE (Tier-S).txt`, `docs/HSDJ OPUS CONTINUATION MODE (BATCH-ENABLED).txt`, `docs/HSDJ OPUS SCAN.txt`: operator notes / prior scan templates. RETAINED_SURFACE — the master scan supersedes the OPUS templates, so they're candidates for `docs/archive/`.

### Performance hot-path notes

- `home-video-proof.tsx` calls `fs.existsSync` on each render (server component). Acceptable on Node serverless — **NON_CRITICAL** at marketing-site QPS.
- `next/image` widely used; `priority` set only on `homeHero` (`page.tsx:181`). Correct.
- No blocking subprocess or network calls on hot paths.

### Observability coverage

- `console.log/error` only in `src/app/api/contact/route.ts` (8 sites). Sufficient for Vercel function logs.
- `/api/availability` does **not** log Google failures (L-5 / DI-7).
- Client-side: GA4 events comprehensive (10 names) and gated.

---

## 8. Wedding-DJ conversion & positioning review

### Positioning clarity — STRONG
The brand says one clean thing in one clean voice: **"Squamish wedding DJ for the Sea-to-Sky."** Hero variants A/B/C all preserve this positioning while testing tone (energy vs craft vs presence). The "Bangers Only" + "Rooted in Squamish" + "Connection" pillars give a memorable shape that competitor sites lacking this discipline don't have. The `/vancouver-wedding-dj` page is a smart, non-stuffy way to capture Vancouver-based couples without diluting the Squamish anchor.

### Objection handling — STRONG
- **"Will you actually personalize?"** — Bangers Only + planning process + "do-not-play" language directly answer this on `/`, `/weddings`, and `/faq`.
- **"Can I trust the audio?"** — `/about` cites OIART training and Netflix/Disney post-work as a credibility anchor. This is concrete, rare, and high-value.
- **"What happens after I inquire?"** — `/contact` explicitly says: **"A conversation first, not a hard sell."** Strong.
- **What is missing for top-1% conversion polish:** explicit price floor or starting range. The current `/packages` page is descriptive but pricing is "confirmed after your date and venue." Some couples filter by budget early; the absence of any anchor (e.g. "weddings start at $X") can leak to inbox vs other vendors who advertise. Consider: "Wedding bookings typically start at $1,800-$2,200 depending on coverage and venue distance" — directional, doesn't lock you in. **Optional growth move; keep your stance if intentional.**

### Friction audit
- **Two doors, same outcome** — Check Availability + Book a Consult. Copy explicitly clarifies which is which (`/contact` hero copy, repeated). This is well-tuned.
- **Date input UX** — three independent year/month/day fields with auto-advance is mobile-friendly (vs `<input type="date">` which has uneven UX on Android Chrome). Solid choice.
- **Turnstile** — visible only after availability passes; reduces upfront friction while still gating spam. Smart.
- **Single CTA-color discipline** — amber-300 reserved for primary action everywhere; outline pills for secondary. Reads professional.

### Visual credibility
- **Typography and spacing** are calm, premium, mature — appropriate for a wedding service positioning above commodity ($/hr) vendors.
- **Imagery** — three production WebPs in place, all sized well; alt text describes what is in the photo (per `SITE_IMAGE_ALT`), not vendor jargon. The OG `og-share.jpg` 2.29 MB stands out as the only weak point in the asset chain (H-4).
- **Motion** — purposeful, brief (`MOTION_DURATION.section = 0.5s`), reduced-motion respected. No layout thrash observed.

### Wedding-DJ-specific recommendations (Patrick-as-business)

1. **Same-name venue capture** — your venue guides are already strong. Add one more SEO move: when a couple Googles `"sea to sky gondola wedding dj"` your `/venues/sea-to-sky-gondola` should already rank. Verify with Search Console once live.
2. **Reviews schema** — currently `Organization` and `FAQPage`. Adding `AggregateRating` requires verifiable rating sources (Google Business, WeddingWire). Once you connect either, this is a notable star-snippet move on SERPs.
3. **Calendar-driven scarcity (truthful)** — when ≥4 weekends in a month are booked, surface a quiet line under `/contact`: *"Booked weekends through August 2026."* Drives consult bookings without inventing scarcity.
4. **Email autoreply** — already implemented; preserve and verify in monthly QA. This single feature ranks you above a meaningful share of competitors who go silent on inquiries.
5. **Track consult-booked-from-Calendly** — Calendly fires its own webhooks. If you want closed-loop conversion data, wire a Calendly webhook → a small `/api/calendly-confirmed` (no auth needed for first-touch info) that pings GA4 Measurement Protocol. Optional; you already have click-side `book_consult_click`.

---

## 9. Prioritized backlog — P0/P1/P2/P3

| Rank | Issue | Severity | Dimension | Feasibility | Deps | Business impact |
|------|-------|----------|-----------|-------------|------|-----------------|
| 1 | DI-1 Calendar timezone window (Pacific) | HIGH | Data integrity | low effort | none | Avoids real availability mistakes |
| 2 | H-4 og-share.jpg 2.29 MB → ≤300 KB | HIGH | Performance / SEO | low | image export | Better social previews; faster crawl |
| 3 | H-5 Home video preload + size | HIGH | Performance | low-med | re-encode | Mobile CWV; data costs |
| 4 | H-2 Add `.github/workflows/ci.yml` (lint+build) | HIGH | Repo governance | low | none | Stops regressions reaching `main` |
| 5 | M-3 Extract shared form scaffolding (AO-1) | MEDIUM | Architecture | med | none | Faster future form changes; fewer bugs |
| 6 | DI-5 Fix availability `status` analytics | MEDIUM | Analytics fidelity | trivial | none | Real error rate visible |
| 7 | M-1 Durable rate limit (Vercel KV / Upstash) | MEDIUM | Abuse | med | env + service | Cross-instance protection |
| 8 | DI-7 Log Google calendar failures | LOW | Observability | trivial | none | Faster ops triage when key rotates |
| 9 | H-1 Track upstream `next` / `resend` updates for postcss + uuid CVEs | HIGH | Deps | medium (waiting) | upstream | Removes audit noise |
| 10 | L-3 Delete unused starter SVGs in `public/` | LOW | Hygiene | trivial | none | Clean repo signal |
| 11 | AO-2 Single `brand-copy.ts` for site description | MEDIUM | Architecture | trivial | none | No drift between layout/JSON-LD |
| 12 | M-5 Canonical URL consistency (relative vs absolute) | MEDIUM | SEO | trivial | none | Consistent SERPs |

---

## 10. Single strongest next move

**Fix `src/lib/google-calendar.ts` so the day window is built in `America/Vancouver`, not UTC (DI-1 / H-3).**

**Why it ranks first:** Every other item on this report is about polish, hygiene, or velocity. This one is the only item that can produce a **real customer-facing failure that costs revenue or reputation** — a date that is actually unavailable showing as available, or vice-versa. It is bounded (one file, ~10 lines), reversible, and verifiable: add a test event at 8:00 PM PT for a date and confirm `/api/availability` reports it correctly. Ship it before re-encoding the OG image, before adding CI, before extracting the form scaffolding. Everything else can wait one more weekend; **double-bookings cannot.**

---

## 11. Re-run verification commands (copy/paste)

```bash
cd /Users/patrickmallan/Desktop/howesounddj
git rev-parse HEAD && git log -1 --oneline
test -f logs/hsdj_master_site_intelligence_report.md && echo "OK: report exists"
test -f docs/HSDJ_MASTER_SITE_INTELLIGENCE_SCAN.md && echo "OK: scan spec exists"
test -d .github/workflows && echo "CI present" || echo "NO CI"
stat -f "%N %z bytes" public/og-share.jpg public/videos/home-proof.mp4 2>/dev/null
npm run lint
npm run build
npm audit --omit=dev | head -40
rg -n "T00:00:00.000Z|T23:59:59.999Z" src/lib/google-calendar.ts
```
