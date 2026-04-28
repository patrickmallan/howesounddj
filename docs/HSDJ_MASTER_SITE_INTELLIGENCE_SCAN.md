# HSDJ Master Site & Repository Intelligence Scan

**Version:** 1.0  
**Domain:** Howe Sound Event DJ — [howesounddj.com](https://www.howesounddj.com) (wedding / event DJ, Sea-to-Sky & Vancouver positioning)  
**Repository root:** `/Users/patrickmallan/Desktop/howesounddj`  
**Amalgamates (repurposed from Trading_Scripts brain scans):**
- Capability Fitness Scan (Tier-S) → **product & experience capability**
- STEAM Architectural Opportunity Scan → **app & repo architecture**
- Data Pipeline Integrity Scan → **content, API, and user-data integrity**
- High-ROI Gap Verification Scan → **roadmap / launch / automation gaps**
- OPUS Repo Intelligence Scan → **full-stack hygiene, risk register, operator trust**

**Single authorized output artifact (when you run this scan in Cursor):**  
`logs/hsdj_master_site_intelligence_report.md`

---

## How to use this document

Paste this file (or the **Execution block** at the end) as a user message. The AI performs a **read-only** audit unless you explicitly ask for code changes. The only write should be the report at `logs/hsdj_master_site_intelligence_report.md`.

**Cadence:** After major features, seasonal campaigns (engagement/wedding season), redesigns, or every **3–6 months**.

**Scan distinction:** This is one integrated pass. It does not replace `docs/LAUNCH_CHECKLIST.md` for go-live steps; it **audits** whether the repo and site meet a high bar for **trust, conversion, maintainability, and data integrity**.

---

## Role

You are a **principal web engineer**, **senior product designer**, and **business strategist** for a **local premium wedding DJ** brand. You audit a **Next.js** marketing and conversion site (not a trading system). Goals:

- **Couples** find the site, believe the brand, and book a consult or send a qualified inquiry.
- **Operators** (owner/agency) can deploy, observe, and change the site without silent breakage.
- **Data** (forms, calendar, email) is correct, fresh, and explainable.

Read **`node_modules/next/dist/docs/`** (or current Next.js docs) when unsure about framework-specific APIs.

---

## Business & brand context (Howe Sound Event DJ)

Use this lens in every section:

| Pillar | Implication for the site |
|--------|---------------------------|
| **Trust** | Social proof, consistent NAP-like contact clarity, professional media, no broken flows on mobile. |
| **Clarity** | Packages, process, and “what happens next” after inquiry must be obvious. |
| **Local relevance** | Vancouver, Sea-to-Sky, Whistler, venues — landing pages and schema should reinforce service area without keyword stuffing. |
| **Conversion** | Primary: consult booking (Calendly) and **Check availability** + inquiry on `/contact`. Secondary: FAQ, packages, reviews. |
| **Risk** | Wrong availability = double-booking reputation damage; spam or dropped email = lost revenue. |

---

## World-class web & repo benchmarks (2025–2026)

Use these as **scoring and gap** references (not as a rigid certification).

**Performance & UX**
- **Core Web Vitals:** LCP, INP, CLS within “good” thresholds; prioritize real-user data when available.
- **Progressive enhancement:** Critical paths work if non-essential JS is slow; forms fail gracefully.
- **Motion:** Purposeful, reduced-motion aware (`prefers-reduced-motion`), no layout thrash.

**Accessibility & quality**
- **WCAG 2.2** orientation: perceivable, operable, understandable; keyboard and screen-reader sanity on nav, forms, modals.
- **Semantic HTML** and heading order; visible focus; form labels and errors.

**Discovery & trust (local service)**
- **E-E-A-T-style signals:** clear about page, real reviews/testimonials path, accurate service area, legitimate business details.
- **Structured data** where appropriate (`LocalBusiness` / `Service` patterns — align with `src/lib/json-ld.tsx` and actual business facts).

**Technical product**
- **App Router** clarity: server vs client components, where data is fetched, caching defaults.
- **API routes:** validation, rate limits, bot protection (e.g. Turnstile), structured errors, no secret leakage.
- **Analytics:** Consent posture if you add non-essential scripts; event naming consistency for GA4.

**Repository**
- **TypeScript** strictness, **ESLint** clean or documented exceptions.
- **Dependencies:** minimal, patched; lockfile committed; no secrets in git.
- **CI:** lint/build on PR (if missing, report as gap).

---

## Non-negotiable execution rules

- **Read-only:** Do not edit application code unless the operator explicitly requests fixes after the report.
- **Authorized output only:** `logs/hsdj_master_site_intelligence_report.md` (create `logs/` if needed).
- **No invention:** Do not claim files, scripts, or CI jobs exist without evidence (`ls`, `rg`, reading paths).
- **Token discipline:** Bounded `rg`; no dumping whole files; one-line proofs where possible.

**Directory exclusions (for scans):**  
`node_modules/`, `.next/`, `out/`, `.vercel/`, `coverage/`, build artifacts.

**Primary scan surfaces (adjust if tree changes):**

- `src/app/` — routes, layouts, metadata
- `src/components/` — UI, chrome, forms
- `src/lib/` — integrations (analytics, email, calendar, Turnstile, JSON-LD, rate limits)
- `src/config/` — site config, venues
- `src/data/` — static data merged with live sources
- `src/app/api/` — server endpoints
- `public/` — static assets
- `docs/` — launch, migration
- `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`
- `.github/workflows/` — if present

---

## MASTER OUTPUT STRUCTURE (deterministic)

The report **`logs/hsdj_master_site_intelligence_report.md`** MUST follow this order. If a section has no findings: **NONE FOUND — verified via &lt;surfaces/commands&gt;.**

Include a **header block:**
- Scan date (use user-provided “today” if available)
- `git rev-parse HEAD` (short + full SHA)
- Supersession note: newer report at newer commit replaces older backlog prioritization until re-scan.

```markdown
# HSDJ Master Site Intelligence Report

## 1. Executive summary
## 2. Scan scope & method
## 3. Product & experience capability scorecard (maps: Capability Fitness)
## 4. Architecture & codebase opportunity register (maps: Architectural Opportunity)
## 5. Data & integration integrity — flows and risks (maps: Data Pipeline Integrity)
## 6. High-ROI / launch-gap verification (maps: High-ROI Gap)
## 7. Full repository intelligence — hygiene, security, CI, ops (maps: OPUS)
## 8. Wedding-DJ conversion & positioning review (business strategist subsection)
## 9. Prioritized backlog — P0/P1/P2/P3
## 10. Single strongest next move
## 11. Re-run verification commands (copy/paste)
```

---

## PART A — Product & experience capability (Capability Fitness analog)

Audit **dimensions** below. For each: **IMPLEMENTED | PARTIAL | GAP** + evidence paths.

| ID | Dimension | What “good” looks like |
|----|-----------|------------------------|
| PC-01 | Performance & CWV readiness | Builds clean; images/layout stable; JS proportion sane; no obvious perf foot-guns |
| PC-02 | SEO & indexing | Metadata, canonical, sitemap, robots, OG images; migrations/redirects documented |
| PC-03 | Accessibility | Landmarks, labels, keyboard, contrast, motion preferences |
| PC-04 | Trust & proof | Reviews, FAQs,About, imagery; JSON-LD matches visible content |
| PC-05 | Conversion architecture | `/contact` flow, CTAs, Calendly, analytics events wired |
| PC-06 | Mobile & responsive | Navigation, forms, typography, tap targets |
| PC-07 | Content system | Venues/pages scalable; duplication under control |
| PC-08 | Internationalization | If English-only, state explicitly; date/locale formatting |
| PC-09 | Analytics & instrumentation | GA4 gates, meaningful events, no PII leakage |
| PC-10 | Brand & UX cohesion | Typography, spacing, motion tokens (`src/lib/motion-tokens.ts` etc.) |

**Bounded discovery (examples — adapt paths):**

```bash
rg -n "metadata|generateMetadata|openGraph|robots|sitemap" src/app --glob '!**/node_modules/**' | head -80
rg -n "json-ld|JsonLd|schema.org" src | head -40
rg -n "framer-motion|motion\\.|prefers-reduced-motion" src | head -40
rg -n "contact_form_submit|gtag|analytics" src | head -60
```

**Output:** Capability table + **PC capability gap register** (severity, remediation one-liner). Cap: **25** rows.

---

## PART B — Architecture & opportunity register (Architectural Opportunity analog)

Search for **bounded** improvements — not trivia. Mirrors: ownership, dependency direction, mixed concerns.

**Conditions to surface:**

- **Mixed concerns:** Business logic inlined in giant components; API routes doing too much without helpers.
- **Ownership:** Site copy, constants, URLs split across unrelated files causing drift risk.
- **Dependency direction:** `lib/` importing UI; circular imports; ambiguous server/client boundaries.
- **Duplication:** Repeated JSON-LD, CTA configs, calendar merge rules.
- **Terminal boundaries:** Third-party widgets (Calendly, Turnstile) isolated — extraction has a natural stop.

**Anti-patterns:** cosmetic-only moves, huge refactors without payoff.

**Register cap:** **15** entries.  
**Reason codes — WEB-1 … WEB-15** (mirror ARCH-n):

| Code | Typical condition |
|------|-------------------|
| WEB-1 | UI mixed with uncached/unbounded data fetching |
| WEB-2 | Shared constants duplicated → drift risk |
| WEB-3 | Contract-ish data (prices, areas) far from consumption |
| WEB-4 | Import inversion (wrong layer importing wrong layer) |
| WEB-5 | Duplicated semantic strings / SEO fields |
| WEB-6 | Pure helpers trapped in Client Components unnecessarily |
| WEB-7 | Shell vs server boundary unclear for new contributors |
| WEB-10 | Larger redesign candidate (explicitly bounded) |
| WEB-11 | One feature family split across many files |
| WEB-13 | Terminal boundary — do not extract further |
| WEB-15 | Other bounded opportunity |

**Output sections:** Executive summary (architecture), **Opportunity register**, **Family cluster map**, **Dependency-direction notes**, **Single strongest bounded next move**, **Red team QC** (what you rejected).

---

## PART C — Data & integration integrity (Data Pipeline Integrity analog)

**Question this part answers:** Where can **wrong, stale, inconsistent, or untrusted** data hurt couples or the business?

**Flows to map (reconstruct end-to-end):**

1. **Availability:** `booked-dates.ts` ↔ Google Calendar API (`/api/availability`) — merge, failure modes, caching.
2. **Contact:** Client validation → Turnstile → `/api/contact` → Resend — errors, rate limit, logging.
3. **Consult / Calendly:** Links, UTM or analytics if any; no double-booking promise without calendar truth.
4. **Analytics:** Event payload safety; no PII in event params.
5. **Static content:** Venue list, images paths — broken assets, 404s.

**Problem types (rename of trading taxonomy):**  
`api_validation_gap`, `stale_data_risk`, `merge_logic_gap`, `spam_abuse_gap`, `provenance_gap`, `schema_drift`, `silent_fallback_risk`, `timestamp_semantics_gap` (for date-only fields).

**Register cap:** **20** entries.

**False-positive rules:**  
If code already validates body shape, rate-limits, and verifies Turnstile, do not report “no validation” for that path without evidence of a bypass.

**Bounded discovery:**

```bash
rg -n "booked-dates|availability|GOOGLE_|calendar" src --glob '!**/node_modules/**' | head -120
rg -n "rateLimit|turnstile|resend|CONTACT_" src | head -80
rg -n "fetch\\(|cache|revalidate" src/app/api | head -40
```

---

## PART D — High-ROI gap verification (High-ROI Gap analog)

Trading roadmap items become **site-specific verification tiers**. Use **PASS | FAIL | PARTIAL** with evidence.

**Suggested tiers (customize yearly):**

**Tier 1 — quick wins**
- T1-1: `npm run lint` + `npm run build` documented and passing; ideally **CI** runs both.
- T1-2: `docs/LAUNCH_CHECKLIST.md` items for production domains, env vars on Vercel — spot-check coherence with code (`env.example`).
- T1-3: Critical redirects from `docs/WIX_MIGRATION.md` reflected in `next.config.ts` or middleware if claimed.

**Tier 2 — medium**
- T2-1: `/api/contact` + `/api/availability` have **explicit** error surfaces and logging strategy (even if minimal).
- T2-2: GA4 key events documented in README and emitted in code (single source of truth).

**Tier 3 — strategic**
- T3-1: Automated accessibility or smoke tests (if absent, PARTIAL/FAIL — do not pretend).
- T3-2: Backup content strategy when Google Calendar is disabled (documented merge behavior).

**Mandatory audit booleans:** Answer YES/NO with proof for:

1. Lint in CI?
2. Build in CI?
3. `env.example` matches required server/client env vars?
4. Availability API failure fallback explicit?
5. Contact API rate limiting present?

---

## PART E — Full repository intelligence (OPUS analog, compressed)

Broaden coverage without running “nested scans.” Domains adapted from trading **A–AC** → web:

**A** Repo architecture | **B** Runtime (Node/Edge) | **C** Forms & outbound email | **D** Recoverability | **E** Third-party integrations | **F** Staging vs production parity | **G** Discovery / SEO | **H** Content & data correctness | **I** Dependencies & licenses | **J** Observability (logs/monitoring) | **K** Product capabilities | **L** Abuse resistance | **M** Deterministic builds | **N** Stateless server assumptions | **O** Operational risk | **P** Growth experiments | **Q** Portfolio of landing pages | **R** AI/LLM usage (if none, N/A) | **S** Secrets & headers | **T** Performance | **U** Operator runbooks | **V** Repo governance | **W** External assumptions | **X** Incident / rollback | **Y** Competitive differentiation | **Z** Assurance | **+/AB** Integration matrix

Produce:

- **Component / route map** (brief).
- **CEO-style risk register** (CRITICAL/HIGH/MEDIUM/LOW) with IDs `C-1`, `H-1`, … — each with **proof_command**, **minimal_proof**, **why_not_false_positive**.
- **CI / invocation map:** `.github/workflows/*`, Vercel, local scripts — **explicit NO CI** if none.
- **Security:** `rg` secrets patterns; middleware headers if any; dependency audit suggestion `npm audit` (run if allowed).

**Secrets / config hygiene:** `.gitignore`, `env.example`, never commit `.env.local`.

**Dead asset check:** orphaned components — only report with inbound reference search (`rg` imports).

---

## PART F — Wedding-DJ strategist & designer review

Short qualitative subsections:

1. **Positioning clarity** — headline/value prop vs competitors; differentiation (experience, bilingual, genres, geography).
2. **Objection handling** — FAQ, packages, “what’s included.”
3. **Friction audit** — steps to inquire; calendar vs form redundancy; trust on first scroll.
4. **Visual credibility** — imagery, typography, whitespace, Motion usage vs distraction.

This is judgment grounded in repo evidence (copy location, `/about`, `/packages`, `/reviews`), not generic marketing filler.

---

## Aggregates & scorecards

### Design fitness scorecard (0–5 per PC-01 … PC-10)

- 0 absent, 5 excellent with evidence  
Include **research_alignment** when scoring 4–5.

### Prioritized backlog

Table: rank | issue | severity | dimension | feasibility | deps | business impact |

**Register caps:** Architecture **15**, Data/integration **20**, CEO risks uncapped prefer grouped batch keys.

---

## STOP CONDITIONS

If repository root inaccessible or execution would require mutating tracked code **without consent**, emit: `STOP:SCAN_CONSTRAINT_VIOLATION`.

---

## Re-run verification commands (operators)

```bash
cd /Users/patrickmallan/Desktop/howesounddj
git rev-parse HEAD && git log -1 --oneline
test -f logs/hsdj_master_site_intelligence_report.md && echo "OK: report exists"
npm run lint
npm run build
```

---

## Execution directive (paste as agent instruction)

Perform the **HSDJ Master Site Intelligence Scan** now (read-only). Use bounded `rg` and file reads across `src/`, `docs/`, `public/`, config files, and `package.json`. Cross-reference benchmarks and business context above. Write the complete report to **`logs/hsdj_master_site_intelligence_report.md`** following the MASTER OUTPUT STRUCTURE. End the report with the **Re-run verification commands** fenced block exactly as in this doc. Suppress cosmetic-only findings.

---

## Lineage note

Derived from Tier-S STEAM scans (Capability Fitness v4, Architectural Opportunity v2.1, Data Pipeline Integrity v1, High-ROI Gap Verification v1, OPUS Repo Intelligence 2026-04+) and repurposed under the **MIT / internal use** discipline of those prompts: deterministic structure, bounded registers, evidence-first, single output artifact.
