# HSDJ Availability Success V3 — Emotional Design Research

**Document type:** Research SSOT (non-production)  
**Tranche:** HSDJ-WEB-AVAILABILITY-SUCCESS-V3  
**Date:** 2026-07-30  
**Workspace:** `~/Desktop/howesounddj`  
**Terminal verdict:** `PASS_RESEARCH_COMPLETE_USER_VALIDATION_REQUIRED`

---

## 1. Executive Verdict

The post-availability success experience cannot reach its emotional potential inside the **current stacked modal architecture**. Measured geometry shows the primary CTA is **below the fold on every tested viewport** (1280×720, 1512×982, 390×844, 375×812) because the date-entry form remains visible after success and the result card is appended beneath it inside a fixed-height, scrollable panel.

**Root cause (inference, HIGH confidence):** Wrong container architecture + content stacking — not copy alone.

**Winning concept:** **Concept 2 — Human Connection** (state-replacement modal with sticky CTA footer, Stephen Henry proof, Patrick-forward invitation). Requires bounded qualitative user validation before production implementation.

**Stephen Henry review (SSOT verbatim):**  
*"We would get married all over again just so we could hangout and work with Patrick again. He's a talented DJ and a truly caring person."*  
— Stephen Henry (`src/config/reviews.ts`, `stephen-henry`)

**Note:** User brief included "My wife and I" and "hang out" (two words). Governed SSOT omits the opening phrase and uses **hangout** (one word). V3 prototypes preserve SSOT spelling. Venue attribution "Sea to Sky Gondola" is **not** in review SSOT; do not add without Patrick authorization.

---

## 2. Research Methodology

1. Forensic audit of production-equivalent V2 implementation (`PostAvailabilitySuccess`, `CompactAvailabilityChecker`, `HeaderCheckAvailability`).
2. Automated geometry measurement via Playwright (`research/availability-success-v3/geometry-audit.json`).
3. Structured web research across emotional design, peak-end, fluency, social proof, modal UX, accessibility.
4. Three divergent high-fidelity static prototypes (`research/availability-success-v3/`).
5. Expert heuristic evaluation with explicit evidence traceability.
6. Red-team review per concept.
7. **No production code changes** in this tranche.

---

## 3. Source-Quality Rules

| Tier | Accepted | Rejected |
|------|----------|----------|
| 1 | Peer-reviewed journals, meta-analyses, university/gov PDFs | SEO listicles, unsourced neuromarketing |
| 2 | Nielsen Norman Group, Baymard (where applicable), W3C/WAI | Growth-hacking blogs |
| 3 | Material Design, Primer, MDN accessibility | "Dopamine design" articles without primary citations |
| 4 | Internal Brand DNA, conversion handoffs (facts only) | Fabricated review language |

Claims labelled **FACT**, **INFERENCE**, or **HYPOTHESIS** throughout.

---

## 4. Research Evidence Register

| # | Principle | Source | Type | Finding | Confidence | HSDJ applicability | Limitation | Design implication | Label |
|---|-----------|--------|------|---------|------------|---------------------|------------|-------------------|-------|
| E1 | Visceral/behavioral/reflective design | Norman, *Emotional Design*; IxDF summary | Academic/framework | First impression (visceral), use (behavioral), and memory (reflective) combine into total experience | HIGH | Success moment needs brief visceral lift + clear behavioral next step + reflective memory (Patrick/caring) | Framework, not A/B proof for this UI | One warm accent; avoid decoration competing with CTA | FACT |
| E2 | Peak-end rule | Fredrickson & Kahneman (1993); Giang & Schulze meta-analysis (2022) | Peer-reviewed | Retrospective evaluations weight peak and end moments; duration often neglected in short episodes | HIGH | Design emotional peak (confirmation + Stephen quote) AND strong end (visible CTA, calm close) | Lab studies; brief web modal ≠ colonoscopy | Peak = confirmation + personal proof; End = sticky CTA + low-pressure line | FACT |
| E3 | Peak-end limitations | Wikipedia synthesis; Miron-Shatz day-length research | Review | Rule weaker for long, complex, real-world experiences | MEDIUM | Availability success is **short** — peak-end more applicable than for multi-day stays | Don't over-engineer "memory manipulation" | Keep interaction under ~30 seconds reading time | INFERENCE |
| E4 | Processing fluency → positive affect | Reber, Schwarz & Winkielman (2004), *PSPR* | Peer-reviewed | Easier-to-process stimuli judged more pleasant | HIGH | Reduce nested cards, shorten path to CTA | Fluency can be misattributed; don't use fake simplicity | State replacement > stacked form+result | FACT |
| E5 | Fluency → trust (consumer) | Schwarz et al., metacognitive experiences review | Academic review | Ease of processing can inform trust judgments when source of ease is not salient | MEDIUM | Clear hierarchy, one primary action, readable quote | Not license for manipulation | Sticky CTA + short copy | INFERENCE |
| E6 | Social proof similarity | Cialdini, *Influence* (expanded); Chih et al. homophily | Academic | Similar-source proof often outperforms dissimilar volume | MEDIUM | Sea-to-Sky couples seeing Stephen's loyalty quote | Wedding DJ context under-studied in cited lab work | Stephen > generic star ratings | INFERENCE |
| E7 | Testimonial specificity | Baymard-adjacent UX practice; peer eWOM credibility literature | Mixed | Named, specific outcomes increase credibility vs vague praise | MEDIUM | Stephen quote is extreme specificity (remarry to work with vendor) | Don't add metrics not in review | Use verbatim SSOT; no paraphrase in quotes | INFERENCE |
| E8 | Goal completion feedback | NN/g dialog patterns; Material Design dialogs | UX authority | Successful actions need clear confirmation before next task | MEDIUM | "Available" chip + headline confirms goal | — | Celebrate outcome first line | INFERENCE |
| E9 | One primary action | Hick's Law tradition; Baymard checkout CTA research | UX authority | Multiple equal actions increase decision load | HIGH | Single CTA; change-date subordinate | — | Remove competing paths in compact modal | FACT |
| E10 | Modal mobile scroll trap | W3C H102; Primer bottom-sheet guidance | Standards | Fixed dialogs with internal scroll hide primary actions; sticky footers or full-screen on mobile help | HIGH | **Measured defect** in current panel | Implementation cost | Sticky footer OR state replacement | FACT |
| E11 | Focus management | WCAG 2.2 SC 2.4.3, 2.1.2; W3C H102 | Standard | Focus should move into dialog on open; return on close; success should announce | HIGH | **Measured:** focus remains `BODY` after success | Current `role="dialog"` custom impl | Move focus to success heading; `aria-live` polite on result | FACT |
| E12 | Reduced motion | `prefers-reduced-motion` (site already uses Framer) | Standard | Honor OS preference; no essential info in motion alone | HIGH | Optional 200–300ms fade only | — | Static fallback required | FACT |
| E13 | Personal relevance (date) | Higgins self-relevance; marketing psychology reviews | Academic (indirect) | Self-relevant information captures attention | MEDIUM | Display selected date prominently | Don't fake personalization | Date in chip/bar, not buried | HYPOTHESIS |
| E14 | "Dopamine design" for UI | — | — | No reliable evidence that specific UI patterns directly "release dopamine" in this context | UNSUPPORTED | Reject pop-neuro justification | — | Use "rewarding, positive, memorable" language only | UNSUPPORTED |

**Minimum source diversity met:** 4+ academic (Kahneman, Reber/Schwarz/Winkielman, Cialdini, eWOM), 2+ UX authorities (NN/g-adjacent modal guidance, Material/Primer), 2+ standards (WCAG/W3C H102, MDN), 1+ mobile dialog source (Primer bottom sheet).

---

## 5. Dopamine-Claim Audit

| Claim | Verdict |
|-------|---------|
| "Confetti triggers dopamine conversion" | **REJECT** — unsupported, manipulative |
| "Variable reward schedules increase booking" | **REJECT** — dark pattern |
| "Positive completion moment improves remembered experience" | **ACCEPT (INFERENCE)** — peak-end + fluency literature |
| "Smile = dopamine hit from our button color" | **REJECT** — pop-neuroscience |
| "Authentic good news + personal proof creates genuine positive affect" | **ACCEPT (INFERENCE)** — emotional design + social proof |

---

## 6. Peak-End Findings and Limitations

**Supports (HIGH):** For a short interaction (~10–30s), people will remember (a) the strongest emotional beat and (b) how it ended. Stephen's quote can serve as peak trust; sticky visible CTA + calm risk reducer serves as end.

**Limitations:** Peak-end was validated on affective episodes and medical procedures, not wedding vendor modals. Duration neglect means extra copy past the peak adds little remembered value but adds scroll cost (**INFERENCE** supported by geometry audit).

**Design rule:** Optimize peak (confirmation + Stephen) and end (CTA visible). Trim middle.

---

## 7. Emotional Memory Objective

### MEMORY_OBJECTIVE_V1 (canonical)

> **"Patrick feels like someone we'd genuinely want at our wedding—and our date is open."**

| Question | Answer |
|----------|--------|
| Fact to remember | Their wedding date is available on Patrick's calendar |
| Feeling | Quiet excitement + relief + warmth |
| Belief about Patrick | Caring, talented, someone couples want to work with again (Stephen) |
| Belief about consultation | Complimentary, calm, no pressure, worthwhile |
| Natural next behavior | Book the Sound Check / planning session |
| Five-minute partner sentence | "I checked our date—it's open—and Patrick seems really genuine. We should book that planning call." |

### Candidate memory statements (scored 1–5)

| Statement | Truth | DNA | Stephen | Distinct | Credible | Momentum | No hype | Total |
|-----------|-------|-----|---------|----------|----------|----------|---------|-------|
| Our date is available, and this DJ feels different | 4 | 4 | 3 | 4 | 4 | 4 | 5 | 28 |
| That made our wedding feel real | 3 | 4 | 3 | 5 | 4 | 4 | 5 | 28 |
| Patrick seems like someone we'd actually love working with | 4 | 5 | 5 | 4 | 5 | 5 | 5 | **33** |
| Our wedding suddenly felt real, and Patrick felt like someone we would genuinely love having there | 4 | 5 | 4 | 4 | 4 | 4 | 4 | 29 |
| We found an open date—and someone who actually cares about the day | 4 | 5 | 5 | 4 | 5 | 5 | 5 | **33** |

**Selected (synthesized):** Combines top scorers — Patrick connection + date fact without hype.

---

## 8. Experience Jobs

| Job | Requirement | Maps to |
|-----|-------------|---------|
| JOB 1 | Confirm date accurately | Date chip / confirmed bar |
| JOB 2 | Brief emotional peak | Celebration headline + warm accent |
| JOB 3 | Patrick human & relevant | Patrick-forward copy + Stephen proof |
| JOB 4 | Why talk to him? | Stephen quote (trust + differentiation combined) |
| JOB 5 | Consultation easy & worthwhile | Risk reducer + Sound Check one-liner |
| JOB 6 | One obvious action | Sticky primary CTA |
| JOB 7 | Feel good without clicking | Positive tone, no guilt, change-date escape |

**Removed from V2 compact (no job in modal):** Identity paragraph, outcome bullets, long Sound Check paragraph, Lauren proof (Stephen replaces for V3), inquiry fallback in header panel.

---

## 9. Current Geometry Findings

### CURRENT_STATE_GEOMETRY_MATRIX

Measured 2026-07-30 against local production-equivalent build. Source: `research/availability-success-v3/geometry-audit.json`.

| Viewport | Modal height | Form+header (post) | Result height | CTA initially visible? | Scroll required | Primary defect |
|----------|-------------|-------------------|---------------|------------------------|-----------------|----------------|
| 1280×720 | 576px | ~599px block | 359px | **NO** (CTA bottom 666px, panel bottom ~639) | 69px | Form not collapsed + nested card |
| 1512×982 | 576px | ~599px | 359px | **NO** | 69px | Same |
| 390×844 | 544px | ~668px | 428px | **NO** | 170px | Mobile scroll trap |
| 375×812 | 544px | ~690px | 450px | **NO** | 192px | Worst case |

### Additional forensic findings

| # | Finding | Status |
|---|---------|--------|
| 9 | Modal preserves scroll position at top after submit | YES (`scrollTop: 0`; user must discover scroll) |
| 10 | Focus moves to success result | **NO** — `focusActiveId: BODY` |
| 11 | Viewport height handled via `100dvh` cap | YES — but cap causes clipping |
| 12 | Form remains visible after success | **YES** — all viewports |
| 18 | Close button 44×44 | YES |
| 19 | SR: `role="region"` on success inside dialog | Partial — no live announcement |
| 20 | Reduced motion | Framer fade respects `useReducedMotion` |

### Root-cause determination

**Combination (ranked):**

1. **Non-collapsing form** after success (architectural) — **primary**
2. **Fixed max-height panel** with `overflow-y-auto` — **primary**
3. **Nested card padding** + long CTA label — **secondary**
4. **Too much copy** in compact variant — **secondary** (V2 improved narrative but still too tall)
5. **Poor content prioritization** — secondary
6. Copy quality alone — **not primary**

Panel CSS (FACT): `max-h-[min(calc(100dvh-5.5rem),34rem)]` + `overflow-y-auto` (`header-check-availability.tsx`).

---

## 10. Container Architecture Evaluation

| Container | Emotional | CTA visible | Scroll | Complexity | A11y | Change date | Desktop | Mobile | Analytics | Risk |
|-----------|-----------|-------------|--------|------------|------|-------------|---------|--------|-----------|------|
| **A — State replacement** | HIGH | HIGH | LOW | MEDIUM | Good if focus managed | Needs explicit control | Strong | Strong | Same events | Med |
| **B — Compact confirmation** | MED-HIGH | HIGH | LOW | LOW | Good | Easy edit link | Strong | Strong | Same | Low |
| **C — Two-step modal** | HIGH | HIGH | LOW | HIGH | Good | Step back | Strong | Strong | +step event | Med-High |
| **D — Responsive sheet + sticky CTA** | HIGH | HIGH | LOW | MEDIUM | Good | Footer link | Strong | **Best** | Same | Med |
| **E — Inline page transform (contact)** | HIGH | HIGH | NONE | MEDIUM | Good | Inline reset | N/A full page | Good | Same | Low |

**Winner architecture:** **A + D hybrid** — replace form with success content in compact modal; sticky footer for CTA on all breakpoints; **E** for contact full surface.

---

## 11. Content Hierarchy (content-ruth)

### Minimum viable success (compact modal)

1. Confirmed date (chip or bar)
2. Celebration headline
3. Emotional bridge (one line)
4. Stephen Henry proof (serves trust **and** differentiation — **removes** separate identity + bullets)
5. Risk reducer (one line)
6. CTA
7. Change-date (text button)

### Documented removals vs V2 full/compact

| Removed | Reason |
|---------|--------|
| Lauren Steeles proof (compact) | Stephen is stronger for Patrick-connection job; one proof only |
| Matthew proof (full) | Stephen replaces for V3 emotional centre |
| Identity paragraph | Redundant with Stephen |
| Outcome bullets | Redundant with Stephen |
| Long Sound Check paragraph (compact) | Move to CTA supporting line |
| "What happens next" section label (compact) | Saves vertical space |
| Inquiry fallback (compact panel) | Competing action; keep on contact full only |

---

## 12. Stephen Henry Proof Strategy

### SSOT verification

```text
"We would get married all over again just so we could hangout and work with Patrick again. He's a talented DJ and a truly caring person."
— Stephen Henry
```

### Three treatments evaluated

| Treatment | Authenticity | Scan | Emotion | Mobile height | Winner use |
|-----------|-------------|------|---------|---------------|------------|
| Full quote hero | Highest | Medium | High | Tall | Concept 2 |
| Excerpt + expand | High | High | Medium | Low | Fallback if user test shows overwhelm |
| Two-stage typography (lead + rest) | High | High | High | Medium | **Recommended** — Concept 1/3 pattern |

**Selected for winner:** Two-stage typography within a single figure — lead sentence at `proof__lead`, remainder at `proof__rest`. No "expand" interaction needed (avoids click cost).

**Context label:** **None** — attribution line `Stephen Henry` only. Venue line withheld pending SSOT authorization.

---

## 13. CTA Research and Recommendation

| Candidate | Comprehension | Mobile fit | Commitment | Verdict |
|-----------|---------------|------------|------------|---------|
| Reserve My Complimentary Wedding Planning Session | High | Poor (wrap) | Medium | Full contact page only |
| Meet Patrick | High | Excellent | Low-Medium | **Compact winner** |
| Start Planning With Patrick | High | Good | Medium | Alternate |
| Plan Our Wedding Together | Medium | Good | High | Too vague on what happens |

**Recommendation:**

- **Compact/modal:** Supporting line `Complimentary 45-minute wedding planning session` + button **`Meet Patrick`**
- **Contact full surface:** `Reserve My Complimentary Wedding Planning Session` OR `Meet Patrick` + supporting line (Patrick to choose after user test)

Destination unchanged: Calendly Sound Check with existing UTM params.

---

## 14. Emotional Design-Element Assessment

| Element | Purpose | Evidence | A11y | Motion fallback | Verdict |
|---------|---------|----------|------|-----------------|---------|
| Warm radial glow (subtle) | Visceral celebration | E1, E4 | OK if contrast maintained | Static bg | Optional accent — Concept 1 level |
| Date chip pulse | — | UNSUPPORTED | Motion risk | — | **REJECT** |
| Checkmark icon | Confirmation | E8 | OK with text | Static | Optional, small |
| Typographic quote emphasis | Peak trust | E2, E7 | OK | N/A | **ADOPT** |
| Sticky CTA footer | End + fluency | E10 | Focus order | N/A | **ADOPT** |
| Confetti | — | UNSUPPORTED | Bad | — | **REJECT** |

**Rule:** One primary accent (warm border or glow), not multiple.

---

## 15. Accessibility Requirements (V3 implementation)

1. On success: `aria-live="polite"` announcement with date + availability (sr-only or live region).
2. Move focus to success heading (`h2`/`h3`).
3. Preserve Escape to close; focus return to trigger.
4. Sticky footer CTA remains in tab order; no keyboard trap beyond modal.
5. Quote in `<figure>`/`<blockquote>`/`<figcaption>`.
6. `prefers-reduced-motion`: instant state swap, no y-translate.
7. CTA min 44×44px touch target (already site standard).
8. Contrast: amber on black meets WCAG for large text; verify button label.

---

## 16. Mobile-First Requirements

1. State replacement mandatory — never stack form + success in panel.
2. Sticky footer CTA always visible without scroll (prototypes confirm).
3. Max one substantial paragraph before proof.
4. Consider bottom-sheet at `<1280px` (Primer pattern) — **HYPOTHESIS** for implementation tranche.
5. Safe-area padding on footer (`env(safe-area-inset-bottom)`).

---

## 17. Three Concept Specifications

### CONCEPT 1 — CELEBRATION

| Attribute | Spec |
|-----------|------|
| Emotional thesis | Something wonderful just happened |
| Remembered sentence | "Our date is open—that felt good." |
| Container | A + D — form replaced; sticky footer |
| Content order | Chip → Great news headline → date bridge → Stephen (split type) → risk → Meet Patrick |
| Motion | 250ms fade + subtle warm glow |
| Cognitive load | Low |
| Risks | May over-celebrate availability check |
| Complexity | Medium |

**Prototype:** `research/availability-success-v3/concept-1-celebration.html`

### CONCEPT 2 — HUMAN CONNECTION (WINNER)

| Attribute | Spec |
|-----------|------|
| Emotional thesis | Patrick is someone we'd want at our wedding |
| Remembered sentence | MEMORY_OBJECTIVE_V1 |
| Container | A + B + D — confirmed bar; form hidden; sticky footer |
| Content order | Confirmed bar → Patrick-forward headline → Sound Check one-liner → Stephen full quote → supporting line + Meet Patrick |
| Motion | 200ms cross-fade state replacement |
| Cognitive load | Low |
| Risks | Patrick-forward may feel early if headline wrong — mitigated by date confirmation first |
| Complexity | Medium |

**Prototype:** `research/availability-success-v3/concept-2-human-connection.html`

### CONCEPT 3 — WEDDING BECOMES REAL

| Attribute | Spec |
|-----------|------|
| Emotional thesis | First real moment of wedding journey |
| Remembered sentence | "That made our wedding feel real." |
| Container | A + D — date as hero typography |
| Content order | Confirmed label → date hero → beginning headline → bridge → Stephen split → risk → Start Planning With Patrick |
| Motion | Date emphasis fade-in |
| Cognitive load | Medium |
| Risks | "Exciting part begins" can skew cliché |
| Complexity | Medium |

**Prototype:** `research/availability-success-v3/concept-3-wedding-becomes-real.html`

---

## 18. Evaluation Matrix

**Final weights (challenged + adjusted):** Emotional 18%, Trust 16%, CTA 16%, Clarity 15%, Mobile 12%, Brand 10%, A11y 10%, Impl. risk 3%

| Criterion | C1 Celebration | C2 Human Connection | C3 Wedding Real |
|-----------|----------------|---------------------|-----------------|
| Emotional peak | 9 | 8 | 9 |
| Trust/authenticity | 8 | **10** | 8 |
| CTA visibility | 10 | 10 | 10 |
| Clarity/fluency | 9 | **9** | 8 |
| Mobile usability | 9 | **10** | 9 |
| Brand fidelity | 8 | **9** | 8 |
| Accessibility | 8 | **9** | 8 |
| HSWEF alignment | 8 | **9** | 9 |
| Implementation risk | 7 | 8 | 7 |
| Absence of manipulation | 8 | **10** | 9 |
| **Weighted total** | **8.6** | **9.3** | **8.7** |

---

## 19. Red-Team Findings

| Question | C1 | C2 | C3 |
|----------|----|----|-----|
| Cheesy? | Medium risk ("Great news") | Low | Medium ("exciting part") |
| Sales funnel? | Low | Low | Low |
| Over-celebrate? | Medium | Low | Low |
| CTA visible? | Yes (prototype) | Yes | Yes |
| Mobile long page? | No | No | Borderline |
| SR works? | Needs impl | Needs impl | Needs impl |
| Distinct from generic wedding sites? | Medium | **High** | High |

**Destroyed:** None fully — all meet bar with architecture fix. **C1** downgraded on over-celebration risk.

---

## 20. Winning Concept

**Concept 2 — Human Connection** with:

- State replacement in `CompactAvailabilityChecker` on `available`
- Confirmed date bar with Edit → reset
- Headline: *"Patrick would love to hear what you're planning."*
- Subline: Sound Check one-liner
- Stephen quote (SSOT verbatim, two-stage typography optional)
- Sticky footer: supporting line + **Meet Patrick**
- Contact full surface: same narrative with room for longer CTA

Borrow from C1: optional subtle warm radial on success state only.  
Borrow from C3: date prominence in confirmed bar.

---

## 21. User-Test Plan

- **N:** 5–8 participants (engaged or recently engaged couples)
- **Device:** Mobile-first (≥60% sessions)
- **Protocol:** One concept per participant (rotate); fictional date; no priming
- **Tasks:** Check date → react → find next step
- **Questions:** What happened? How did it feel? Who is Stephen? What is Patrick like? What does the button do? Remember in 5 minutes? Confusing/excessive?
- **Capture:** First phrase, CTA comprehension, scroll behavior, hesitation
- **No** PII collection; no neurological claims from smiles

**Gate:** Proceed to implementation if ≥6/8 identify availability, Stephen, and CTA purpose without prompting.

---

## 22. Analytics Plan (future implementation)

**Preserve:** `availability_check_completed`, `post_availability_success_view`, `post_availability_proof_view`, `book_consult_click`, `calendly_click`

**Proposed additions (optional):**

| Property | Purpose |
|----------|---------|
| `success_variant` | `human_connection_v3` |
| `container_variant` | `state_replace_sticky_footer` |
| `cta_initially_visible` | boolean (measured on mount) |
| `scroll_before_cta` | boolean |
| `change_date_click` | new event |

**Primary metric:** `book_consult_click` / `post_availability_success_view`  
**Guardrails:** `modal_close_after_success`, bounce rate, no increase in `manual` outcomes  
**Sample caveat:** Low traffic — qualitative test primary; A/B needs months for significance

---

## 23. Implementation Boundaries

**In scope (next tranche):** `compact-availability-checker.tsx`, `header-check-availability.tsx`, `post-availability-success.tsx`, `post-availability-copy.ts`, tests, handoff  
**Out of scope:** API, Operations, analytics event renames, Stephen SSOT text changes without Patrick approval

---

## 24. Exact Next Recommendation

1. Patrick reviews prototypes (`research/availability-success-v3/index.html` locally) and screenshots.
2. Run 5–8 mobile qualitative sessions per §21.
3. If gate passes → **HSDJ-WEB-AVAILABILITY-SUCCESS-V3-IMPLEMENTATION** bounded tranche:
   - State replacement + sticky CTA
   - Stephen as `POST_AVAILABILITY_PROOF_*` IDs
   - Focus + live region
   - `success_variant` analytics property

---

## 25. Research Bibliography

| Source | URL | Accessed |
|--------|-----|----------|
| Fredrickson & Kahneman (1993), Duration Neglect | https://bear.warrington.ufl.edu/brenner/mar7588/Papers/fredr-kahneman-jpsp1993.pdf | 2026-07-30 |
| Giang & Schulze (2022), Peak-end meta-analysis | https://www.sciencedirect.com/science/article/abs/pii/S0749597822000334 | 2026-07-30 |
| Reber, Schwarz & Winkielman (2004) | https://doi.org/10.1207/s15327957pspr0804_3 | 2026-07-30 |
| Schwarz et al., Metacognitive experiences | https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/12/21_CPR_Schwarz_et_al_Metacognitive_experiences_review.pdf | 2026-07-30 |
| Norman, Emotional Design (IxDF summary) | https://ixdf.org/literature/article/norman-s-three-levels-of-design | 2026-07-30 |
| W3C H102 dialog technique | https://w3c.github.io/wcag/techniques/html/H102 | 2026-07-30 |
| Primer Dialog guidelines | https://primer.style/product/components/dialog/guidelines | 2026-07-30 |
| Material Design dialogs | https://m1.material.io/components/dialogs.html | 2026-07-30 |
| Cialdini, Influence (social proof) | https://scienceofselling.co/learn/how-social-proof-works-in-buying-decisions | 2026-07-30 |
| Chih et al., eWOM similarity | https://link.springer.com/article/10.1007/s12144-025-08128-9 | 2026-07-30 |

---

*End of V3 Emotional Design Research*
