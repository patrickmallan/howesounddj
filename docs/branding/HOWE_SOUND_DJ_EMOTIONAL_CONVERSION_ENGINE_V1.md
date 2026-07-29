# Howe Sound Wedding DJ — Emotional Conversion Engine V1

**Document type:** Conversion architecture & customer psychology SSOT  
**Upstream authority:** [`HOWE_SOUND_DJ_BRAND_DNA_REPORT_V1.md`](./HOWE_SOUND_DJ_BRAND_DNA_REPORT_V1.md)  
**Date:** 2026-07-29  
**Scope:** Availability check → consultation booking emotional journey  
**Constitution:** No generic marketing · No pressure tactics · No fake scarcity · Every recommendation traces to Brand DNA or accepted psychology

---

## Executive Summary

**FACT:** The availability checker today is a **calendar API utility** with two surfaces (`ContactAvailabilityForm`, `CompactAvailabilityChecker`) that share `runAvailabilityCheck()` and display the same system message: *"Your date currently appears available. Submit an inquiry to continue."*

**INTERPRETATION:** At the highest-intent moment in the funnel — when a couple learns their wedding date may be open — the experience **resets to software mode**. It delivers certainty about a date but **zero emotional certainty about the vendor**. Trust proof exists elsewhere on the site but is **not architected into the success moment**. Dual CTAs and escape links **fragment momentum** before identity alignment completes.

**RECOMMENDATION:** Transform the success state into a **sequenced Emotional Conversion Engine** with five acts:

1. **Relief** — your date works (personalized, human)  
2. **Recognition** — peer couples describe the same outcome you want  
3. **Identity** — this is the calm, full-wedding partner Brand DNA defines  
4. **Reassurance** — low-risk next step, no pressure  
5. **Commitment** — single primary action: Book a Consult  

The consult itself should be repositioned from *"complimentary wedding DJ consultation"* to a **Sound Check** — evidence-framed as the beginning of the same **stress-free planning communication** couples praise in reviews (Matthew Bundala, Melissa Schweyer).

**Success criterion:** The couple should feel *"We've found our DJ"* **before** clicking Book a Consult — not because of urgency, but because the success moment mirrors what past couples already experienced.

---

## Current Journey

### Surfaces in scope

| Surface | Component | Analytics surface | Success UI |
|---------|-----------|-------------------|------------|
| Contact page | `src/components/contact-availability-form.tsx` | `contact_form` | Full card + dual CTA + trust escape links |
| Header panel (desktop) | `src/components/compact-availability-checker.tsx` | `header_panel` | Compact card + dual CTA + link to contact |
| Shared infrastructure | `src/lib/availability-check-client.ts` | — | Sets `post-availability` session context (30 min) |
| Copy contract | `src/lib/public-availability-contract.ts` | — | System messages for AVAILABLE / UNAVAILABLE / MANUAL |

### Journey map (available outcome)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. VISITOR INTENT                                                             │
│    Couple has a date in mind. Wants to know: "Is Patrick free?" +            │
│    implicitly: "Is this the right DJ for us?"                                 │
│    Entry: header CTA, /contact#availability, inline CTAs                      │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. DATE INPUT                                                                 │
│    YYYY/MM/DD fields. Helper: "Pick your day. We will check it against       │
│    Patrick's calendar." (contact) / "Quickly see if your date is open"       │
│    (header panel)                                                             │
│    Emotional state: Anticipation + mild anxiety                                │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. LOADING                                                                    │
│    Button text: "Checking…" | disabled state                                  │
│    Emotional state: Suspense — no reassurance, no brand presence              │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 4. SUCCESS STATE  ◄── PRIMARY CONVERSION GAP                                  │
│    Message: API system copy (software tone)                                   │
│    CTAs: Book a Consult (primary) + Continue with Inquiry (secondary, equal)  │
│    Escape: "Still exploring? Reviews or About" (contact only)                 │
│           "Full contact page" link (header only)                              │
│    Proof: NONE inline                                                         │
│    Emotional state: Informational relief — NOT emotional commitment           │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 5. BRANCH A — CONSULT (intended path)                                         │
│    External: Calendly Sound Check (45 min)                                    │
│    Supporting copy exists site-wide: "45 minutes · No pressure · Just clarity"│
│    Gap: Calendly handoff is context-free — date + proof not carried forward   │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 5. BRANCH B — INQUIRY (competing path)                                       │
│    Full form: 8+ fields + Turnstile                                           │
│    Emotional state: Administrative burden — opposite of "stress-free"         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### What works today

| Element | Why it works | Brand DNA alignment |
|---------|--------------|---------------------|
| Post-availability session context (`post-availability-context.ts`) | Enables trust-click analytics for 30 min | Infrastructure for future personalized reinforcement |
| `PostAvailabilityTrustLink` | Instrumented Reviews/About clicks | Correct destinations; wrong placement (escape, not sequence) |
| Amber success card styling | Visual differentiation from neutral states | Premium warmth — underused for emotional content |
| Book a Consult as primary button styling | Clear visual hierarchy on button | Undermined by equal-weight secondary CTA |
| "45 minutes · No pressure · Just clarity" (site-wide) | Low-risk commitment framing | Matches stress-free customer language (Matthew, Lauren) |
| Sound Check naming (`site-scheduling.ts`) | Distinct from generic "consultation" | Under-leveraged in availability success state |

### Emotional gaps (ranked by severity)

| # | Gap | Where | Psychology impact |
|---|-----|-------|-------------------|
| 1 | **Success message is software, not celebration** | API copy → both surfaces | Breaks premium illusion; couple feels they used a tool, not joined a journey |
| 2 | **Zero inline social proof at peak intent** | Success state | Peak anxiety moment (vendor trust) meets zero peer validation |
| 3 | **Dual competing CTAs** | Contact success | Decision paralysis; "Continue with Inquiry" signals the consult isn't enough |
| 4 | **Escape links before commitment** | Contact: Reviews/About; Header: full contact page | Permission to leave before identity alignment — momentum leak |
| 5 | **Loading state is sterile** | Both surfaces | Missed micro-moment to prime calm competence |
| 6 | **No personalization with selected date** | Success state | Date is in session context but not reflected emotionally |
| 7 | **Inquiry form contradicts brand promise** | Branch B | 8 fields + captcha after "stress-free" positioning |
| 8 | **Calendly handoff is context-free** | External | Couple re-explains what they already entered |
| 9 | **Header compact surface cannot deliver full engine** | Panel geometry | Architecture must be tiered: compact ≠ full |

### Trust gaps (ranked)

| # | Gap | Brand DNA evidence unused |
|---|-----|---------------------------|
| 1 | Matthew stress-free communication quote | #1 ranked conversion quote in Brand DNA |
| 2 | Lauren "seamless, stress-free, seriously fun" | #1 one-sentence brand candidate |
| 3 | Wedding couple "more than a DJ / vital part of team" | Strongest differentiator — absent from funnel |
| 4 | Full-arc coverage (ceremony → reception) | Danya, Cassandra — not in success state |
| 5 | Named couple attribution | 12 named reviews exist; success state uses none |
| 6 | Planning partnership language | Melissa "prep and planning to day-of" — consult not framed this way |

### Momentum loss points

1. **Success → escape link click** — couple leaves funnel to read reviews elsewhere (content not brought forward)  
2. **Success → inquiry form expand** — high-friction detour; many abandon  
3. **Header → "Full contact page"** — surface-hopping breaks emotional continuity  
4. **Calendly new tab** — context switch without priming copy on what the call covers  
5. **Date field reset on any edit** — clears availability state; correct technically, abrupt emotionally  

---

## Psychological Analysis

### Canonical conversion framework

The optimal sequence for post-availability conversion, with psychological rationale:

| Step | Psychological state | Purpose | Brand DNA anchor | Why this order |
|------|---------------------|---------|------------------|----------------|
| **1. Anticipation** | "Does he have our date?" | Motivate check completion | — | Pre-success; already exists in date entry |
| **2. Relief** | "Our date might work" | Convert API result into human good news | Lauren: "seamless" | Must come first — validates the action they just took |
| **3. Certainty** | "This is real, not a glitch" | Personalize with their date; distinguish from generic SaaS | Natasha: thrilled when logistics confirmed | Relief without certainty feels tentative |
| **4. Social proof** | "Couples like us felt the same" | Peer validation at peak trust anxiety | Matthew (#1 proof quote) | After certainty, before identity — classic Cialdini ordering for high-involvement services |
| **5. Emotional reassurance** | "We won't be stressed" | Transfer Matthew/Lauren outcomes to visitor's future | stress-free (2 reviews) | Wedding buyers fear vendor-caused chaos |
| **6. Identity alignment** | "This is our kind of DJ" | Differentiate from commodity DJ | Wedding couple: "more than a DJ" | Proof alone doesn't answer "is this us?" |
| **7. Low-risk commitment** | "A conversation is safe" | Remove fear of sales pressure | Site: "No pressure · Just clarity" | Must precede CTA — otherwise button feels like trap |
| **8. Confidence** | "We're making a good decision" | Pre-commit identity before click | Cassandra: "one of the best decisions" | Final emotional frame before action |

**Rejected sequence:** Proof → CTA without reassurance = feels like sales. CTA → proof = feels like apology.

### Cognitive load budget

Wedding decisions are **high involvement, emotionally loaded, often researched by both partners**. The success state has **~8–12 seconds** of attention before scroll or exit (mobile shorter).

| Budget | Allocation |
|--------|------------|
| 1 headline | Relief + certainty |
| 1 proof block | Social proof (named quote) |
| 2–3 bullets OR 1 short paragraph | Identity + reassurance |
| 1 risk reducer | Low-risk commitment |
| 1 CTA | Confidence action |

**Do not exceed** this in the primary success view. Inquiry path is progressive disclosure, not co-equal.

### Anxiety model (wedding DJ category)

| Anxiety | Customer evidence | Engine response |
|---------|-------------------|-----------------|
| "Will they stress us out?" | Matthew: calm communication → stress-free | Lead reassurance with communication proof |
| "Will the party fall flat?" | Vanessa, Cassandra: packed floor | Secondary proof or bullet — not headline |
| "Are they just a playlist?" | Wedding couple: vital part of team | Identity alignment beat |
| "Will they handle the whole day?" | Danya: ceremony through reception | Authority bullet |
| "Is booking a call a sales trap?" | Site consult framing | Explicit no-pressure microcopy |

### What we deliberately exclude

| Tactic | Why excluded |
|--------|--------------|
| Fake scarcity ("only 2 dates left") | Constitution; no evidence; damages premium trust |
| Countdown timers | Pressure tactic; contradicts stress-free brand |
| "Most couples book within 24 hours" | Normative pressure (flagged in premium-trust audit) |
| Molly "run don't walk" as primary CTA frame | Valid as attributed quote; too aggressive for success state |
| Star ratings without GBP governance | Brand DNA: no ratings in repo |

---

## Trust Architecture

### Trust element evaluation

| Element | Conversion potential | Brand DNA fit | Implementation cost | Verdict |
|---------|---------------------|---------------|---------------------|---------|
| **Named review snippet (1)** | **Highest** | Highest — Matthew, Lauren | Low | **Primary** — always visible in full success state |
| **Review rotation (contextual)** | High | High — 12 reviews tagged by theme | Medium | **Secondary** — rotate by segment/analytics |
| **Named couples (attribution)** | High | Required for credibility | Low | **Mandatory** on every quote |
| **Patrick photo** | Medium-High | About page already has editorial imagery | Low | **Supporting** — small avatar or none in compact; optional in full |
| **Micro testimonial (≤25 words)** | High | Vanessa, Lauren work well | Low | **Preferred format** for compact surface |
| **Planning reassurance** | High | Melissa, Natasha | Low | **Consult positioning** — not separate block |
| **Authority (full-arc coverage)** | Medium-High | Danya, Cassandra | Low | **One bullet** in full state |
| **Credibility (OIART, years)** | Medium | About page — not review evidence | Low | **Omit from success state** — wrong proof type for this moment |
| **Premium cues (spacing, typography)** | High | Existing design system | Low–Medium | **Required** — whitespace = luxury |
| **Venue familiarity** | Medium | Natasha only (1 review) | Low | **Defer** — insufficient evidence frequency |
| **Video proof** | Medium | Exists on homepage | High in modal | **Future** — not v1 |

### Optimal trust sequence (full success state)

```
[Relief headline — personalized date]
        ↓
[Micro testimonial — Matthew or Lauren, named]
        ↓
[Identity line — "more than a DJ" theme, paraphrase or short quote]
        ↓
[2 authority bullets — full-arc + dance floor, customer-language]
        ↓
[Risk reducer — 45 min · No pressure · Just clarity]
        ↓
[Single CTA — Book a Consult]
        ↓
[Optional tertiary — inquiry as text link, not button parity]
```

### Review rotation strategy (architecture only)

Centralize reviews in future `src/config/reviews.ts` with theme tags from Brand DNA:

| Rotation slot | Default quote | Alternate (energy-seeking traffic) | Alternate (planning-anxious) |
|---------------|---------------|-----------------------------------|------------------------------|
| Primary proof | Matthew Bundala (stress-free) | Vanessa Pocock (packed floor) | Melissa Schweyer (planning → day-of) |
| Secondary bullet | Danya Karras (seamless full arc) | Cassandra Wilding (guests talking) | Wedding couple (team member) |

**Rotation trigger (future):** `surface` + optional `headline_variant` + time-based shuffle. v1: static Matthew primary.

### Compact vs full trust density

| Surface | Trust elements | Rationale |
|---------|----------------|-----------|
| **Header panel** | Headline + 1 micro-quote + risk reducer + CTA | Geometry constraint; link to full engine on contact |
| **Contact page** | Full 5-act sequence | Primary Emotional Conversion Engine surface |
| **Future modal** | Full sequence | If dedicated availability modal ships |

---

## Emotional Architecture

### Concept brief

Transform "date available" from **API status** into **narrative beat** — the moment the wedding starts to feel real and the right partner is already here.

### Concepts explored

| # | Concept | Narrative frame | Brand DNA fit | Risk |
|---|---------|-----------------|---------------|------|
| A | **Finding your date** | "Your date is open" as personal milestone | High — relief + certainty | Low — factual, warm |
| B | **Finding your team** | "More than a DJ — your wedding team" | **Highest** — Wedding couple quote | Medium — must not over-promise relationship before consult |
| C | **The wedding begins today** | "Today you took the first step" | Medium | High — can feel cliché if not grounded in evidence |
| D | **The first great decision** | Cassandra: "one of the best decisions" | High | Medium — strong but borrows post-wedding hindsight for pre-booking moment |
| E | **The journey starts here** | Planning arc begins now | High — Melissa planning language | Low–Medium — generic without proof |
| F | **The moment everything becomes real** | Date confirmation = emotional activation | Medium | Medium — premium weddings often resist "everything changes" drama |
| G | **Sound Check moment** | Calendar open → now let's check fit | **Highest** — leverages existing Sound Check brand | Low — ties to consult, not hype |

### Ranked concepts (recommended primary frame)

| Rank | Concept | Rationale |
|------|---------|-----------|
| **1** | **G — Sound Check moment** | Bridges availability → consult with existing naming; implies collaboration not transaction; extends Matthew's communication promise into next step |
| **2** | **A — Finding your date** | Clean, honest, personalized; best headline layer inside G |
| **3** | **B — Finding your team** | Strongest identity differentiation; use as identity beat inside sequence, not sole frame |
| **4** | **E — Journey starts here** | Supports planning positioning; needs proof attached |
| **5** | **D — First great decision** | Powerful but better as post-proof confidence line, not opening |
| **6** | **F — Everything becomes real** | Use sparingly — one line max |
| **7** | **C — Wedding begins today** | Weakest — highest generic-wedding risk |

### Recommended emotional narrative (full engine)

**Act 1 — Relief + certainty (Finding your date)**  
Psychological function: Close the open loop from step 3 (loading).  
Content type: Personalized headline referencing selected date.  
Evidence hook: Lauren "seamless."

**Act 2 — Social proof (Peer recognition)**  
Psychological function: Transfer trust from past couples.  
Content type: Named blockquote — Matthew default.  
Evidence: Brand DNA #1 ranked quote.

**Act 3 — Identity (Finding your team)**  
Psychological function: Answer "is this our kind of vendor?"  
Content type: Short identity line — Wedding couple theme.  
Evidence: "more than just a DJ… vital part of our team."

**Act 4 — Transformation preview (Stress-free future)**  
Psychological function: Visualize outcome.  
Content type: 2 bullets — full arc + dance floor.  
Evidence: Danya + Vanessa.

**Act 5 — Low-risk bridge (Sound Check)**  
Psychological function: Make next step feel safe.  
Content type: Consult explanation + microcopy.  
Evidence: Matthew communication + site "no pressure" standard.

**Act 6 — Confidence CTA**  
Psychological function: Single clear action.  
Content type: Book a Consult button only.

### Unavailable / manual emotional architecture (brief)

| State | Emotional need | Direction |
|-------|----------------|-----------|
| Unavailable | Disappointment without dead end | Empathetic acknowledgment + alternative paths; no guilt |
| Manual | Uncertainty without anxiety spike | Honest "we'll confirm" + direct human path; maintain calm voice |

*Out of scope for v1 implementation detail — maintain consistency with stress-free tone.*

---

## Consult Positioning

### Current positioning

**FACT:** `PUBLIC_SOUND_CHECK_SUPPORTING_COPY`:  
*"A complimentary wedding DJ consultation — a 45-minute conversation about your wedding, your vision, and whether Howe Sound DJ is the right fit."*

**INTERPRETATION:** Accurate but **category-generic**. "Consultation" signals vendor evaluation, not **partnership onset**. Misses Melissa's planning arc and Matthew's communication promise.

### Alternative identities (ranked)

| Rank | Identity | Visitor perception | Brand DNA evidence | Psychology |
|------|----------|-------------------|-------------------|------------|
| **1** | **Sound Check** (evolved) | Collaborative first listen — fit + plan | Existing brand asset + Matthew communication | Low threat; musical metaphor fits DJ without "party DJ" narrowness |
| **2** | **Planning conversation** | Stress-reducing start to logistics | Melissa: prep → day-of; Natasha: pre-wedding meetings | Reduces fear for planning-oriented couples |
| **3** | **Wedding music planning session** | Concrete deliverable expected | Ceremony → reception coverage reviews | Clear scope; slightly transactional |
| **4** | **Vision session** | Aspirational, emotional | Lauren: seriously fun; atmosphere themes | Strong for creative couples; weak on logistics reassurance |
| **5** | **Strategy session** | Business-like | Weak customer language match | Too corporate for wedding psychology |
| **6** | **Wedding blueprint session** | Comprehensive planning | Implies deliverable Patrick may not provide in call 1 | Over-promises; avoid |

### Recommended consult identity

**Primary label (keep):** Book a Consult  
**Internal/event name (keep):** Sound Check  
**Evolved supporting frame:** *A 45-minute Sound Check — the same calm, personable conversation couples describe when they say their day felt stress-free. We'll talk about your date, your venue, and how music moves from ceremony to the last song. No pressure — just clarity on whether we're the right fit.*

**Evidence trace:**
- "calm, professional, yet personable communication" — Matthew  
- "stress-free" — Matthew, Lauren  
- "ceremony… reception" — Danya  
- "No pressure · Just clarity" — site standard (aligns with stress-free)  
- Sound Check — `site-scheduling.ts`

### Consult ≠ sales call (explicit psychology)

| Fear | Neutralizer |
|------|-------------|
| High-pressure close | "Whether we're the right fit" — mutual evaluation |
| Unprepared | "Your date" + venue mentioned — they arrive oriented |
| Wasted time | "45 minutes" — bounded commitment |
| Wrong vendor type | Identity beat before CTA — team member, not playlist |

### Calendly handoff enhancement (architecture)

| Data point | Source | Calendly carry-forward |
|------------|--------|------------------------|
| Wedding date | `post-availability-context.selectedDate` | Pre-fill via Calendly URL params if supported |
| Funnel context | `funnel_context: post_availability` | Already partially instrumented |
| Emotional priming | Success state copy | Calendly description / confirmation email — ops layer |

---

## Copy Strategy

**This section defines strategy only — not final copy.**

### Global voice principles (from Brand DNA)

| Attribute | Specification |
|-----------|---------------|
| **Tone** | Calm, warm, confident — never hype |
| **Voice** | Third-party proof first; Patrick voice second; system voice never |
| **Emotional cadence** | Relief → recognition → belonging → safety → action |
| **Sentence length** | Headlines: 6–12 words. Body: 12–20 words max per sentence. Bullets: 8–14 words |
| **Language style** | Customer words over marketing words; prefer "stress-free" over "unforgettable experience" |
| **Reading level** | Grade 8–10 — accessible, not academic |
| **Branding characteristics** | Premium restraint; Sea-to-Sky grounded; no exclamation stacks |

### Per-section copy strategy

| Section | Tone | Voice source | Cadence | Length | Style notes |
|---------|------|--------------|---------|--------|-------------|
| **Date input helper** | Inviting, practical | Patrick-adjacent editorial | Neutral anticipation | 1 sentence | Already adequate; avoid "submit" language |
| **Loading** | Calm, present | Brand editorial | Brief suspense | 1 line + optional subline | Prime competence; not "please wait" |
| **Relief headline** | Warm confirmation | Editorial + date personalization | Peak relief | 1 headline | Use "your date" not "the date" |
| **Proof block** | Peer voice | Customer verbatim | Recognition | 1–2 sentences + attribution | Always named; curly quotes |
| **Identity line** | Aspirational belonging | Customer-theme paraphrase | Alignment | 1 sentence | "More than a DJ" territory |
| **Authority bullets** | Factual confidence | Customer-language derived | Certainty | 2 bullets max | Verb-led; outcome-led |
| **Risk reducer** | Safety | Site standard + Matthew echo | De-escalation | 1 line | "No pressure" mandatory |
| **CTA button** | Confident invitation | Site canonical | Action | 2–3 words | "Book a Consult" — do not vary without analytics plan |
| **Inquiry tertiary** | Optional, low emphasis | Editorial | Fallback | Text link | "Prefer email first?" not second button |
| **Escape links** | — | — | — | — | **Remove from success state** per Brand DNA Phase 8 |

### Words to use (customer-evidenced)

`stress-free` · `seamless` · `calm` · `professional` · `personable` · `packed dance floor` · `energy` · `ceremony` · `reception` · `team` · `planning` · `highly recommend` · `go-to`

### Words to avoid in success state

`submit` · `inquiry to continue` · `currently appears available` · `unforgettable experiences` · `luxury` · `epic` · `bangers` · `limited availability` · `act now` · `don't miss`

### Compact surface copy strategy

Compress to: **headline + 1 attributed micro-quote + risk line + CTA**.  
Omit identity paragraph; link "See what couples say" → `/reviews` only as **post-CTA** tertiary if space requires — prefer omitting.

---

## Visual Recommendations

*Preserve existing brand identity: dark field, amber accents, premium-surface cards, rounded-full buttons.*

### Spacing

| Element | Current | Recommended | Rationale |
|---------|---------|-------------|-----------|
| Success card padding | `p-6 lg:p-8` | Increase top padding +12–16px before headline | Luxury = breathing room; headline needs isolation |
| Proof block margin | None dedicated | `mt-6` above, `mb-6` below proof | Separate acts visually |
| CTA isolation | `mt-6` with secondary adjacent | `mt-8` above sole primary CTA | Single-action focus |
| Compact panel | `p-4` | Keep; tighter rhythm acceptable | Geometry constraint |

### Hierarchy

| Level | Element | Treatment |
|-------|---------|-------------|
| 1 | Relief headline | `text-lg` → `text-xl`, `font-semibold`, `text-white/95` |
| 2 | Proof quote | `text-sm` → `text-base`, `text-white/85`, italic or blockquote styling |
| 3 | Attribution | `text-xs`, `uppercase tracking-wide`, `text-amber-300/90` |
| 4 | Bullets / identity | `text-sm`, `text-white/70` |
| 5 | Risk reducer | `text-sm`, `text-white/50` |
| 6 | CTA | Existing amber primary — no change |
| 7 | Tertiary inquiry | `text-sm` text link — `text-white/45` |

### Motion

| Moment | Recommendation | Rationale |
|--------|----------------|-----------|
| Loading → success | Subtle fade-in (`opacity` + `translateY` 4px, 300ms) | Marks narrative transition; existing motion system supports |
| Success card | Optional soft amber glow pulse once on appear | Draws attention without casino energy |
| CTA | Keep existing `hover:scale-[1.02]` | Already premium-appropriate |
| Proof block | Stagger 50ms after headline | Directs reading order |

**Avoid:** confetti, bounce, celebration Lottie, slot-machine metaphors.

### Loading experience

| Current | Recommended |
|---------|-------------|
| "Checking…" | "Checking Patrick's calendar…" (human agent) |
| Button disabled only | Optional single line below: calm editorial subline about response time |
| No brand presence | Optional subtle amber pulse on button border |

### Visual reassurance

| Cue | Implementation |
|-----|----------------|
| Success ≠ software | Replace neutral system border with warmer amber treatment (already partially present) |
| Human presence | Optional 32px Patrick avatar beside proof — **only full state**; omit if cramped |
| Date confirmation chip | Small pill: "Your date: {formattedDate}" — uses session context |
| Progress implication | Optional 3-dot step indicator: Date ✓ → Conversation → Celebration — **future** |

### Button hierarchy

| Rank | Action | Visual weight |
|------|--------|---------------|
| 1 | Book a Consult | Amber fill — sole filled button |
| 2 | Inquiry | Text link below CTA — not `border` button parity |
| 3 | Reviews/About | **Remove from success state** |
| 4 | Try another date | Unavailable state only |

### Progression (full contact success)

```
┌──────────────────────────────────────┐
│  [date chip]  Saturday, June 14, 2026 │  ← certainty
│                                       │
│  Headline (relief)                    │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │  "Proof quote…"                 │ │  ← social proof
│  │  — Name                         │ │
│  └─────────────────────────────────┘ │
│                                       │
│  Identity line                        │
│  • Bullet 1                           │  ← authority
│  • Bullet 2                           │
│                                       │
│  45 min · No pressure · Just clarity  │  ← risk
│                                       │
│  [      Book a Consult      ]         │  ← CTA
│                                       │
│  Prefer email? Continue with inquiry  │  ← tertiary
└──────────────────────────────────────┘
```

---

## Implementation Roadmap

### Tier definitions

| Tier | Definition | Typical effort |
|------|------------|----------------|
| Quick win | Copy + hierarchy; no new components | 2–4 hours |
| Medium impact | Shared component + config extraction | 1–2 days |
| High impact | New component system + both surfaces unified | 2–4 days |
| Future | Personalization, rotation, modal, Calendly depth | 1+ weeks |

### Quick wins

| # | Item | Surfaces | Complexity | Impact | Brand DNA ref |
|---|------|----------|------------|--------|---------------|
| Q1 | Replace API message display with layered emotional content (headline + proof); keep API message as screen-reader / data attribute only | Contact + compact | **S** | **High** | Phase 8 wireframe |
| Q2 | Demote "Continue with Inquiry" from button to text link | Contact | **S** | **High** | Dual CTA gap |
| Q3 | Remove "Still exploring? Reviews or About" from success state | Contact | **S** | Medium | No escape CTAs |
| Q4 | Humanize loading copy | Both | **S** | Low–Medium | Calm competence |
| Q5 | Add date chip from `selectedDate` in session context | Contact | **S** | Medium | Certainty step |
| Q6 | Update `AVAILABLE_NEXT` in compact checker to evidence-based frame | Header | **S** | Medium | Phase 8 |
| Q7 | Add `funnel_context: post_availability` to all success-state consult clicks | Both | **S** | Analytics | Funnel doc |

### Medium impact

| # | Item | Surfaces | Complexity | Impact | Notes |
|---|------|----------|------------|--------|-------|
| M1 | Extract `PostAvailabilitySuccess` shared component | Both | **M** | **High** | Tiered props: `variant: "full" \| "compact"` |
| M2 | Create `src/config/reviews.ts` — canonical 12 + theme tags | Sitewide | **M** | **High** | Brand DNA recommendation |
| M3 | Add subtle success entrance motion | Both | **M** | Medium | Use existing `framer-motion` patterns |
| M4 | Evolve `PUBLIC_SOUND_CHECK_SUPPORTING_COPY` for post-availability context | Consult surfaces | **M** | Medium | Consult positioning #1 |
| M5 | Restructure success card typography per hierarchy spec | Both | **M** | Medium | Visual section |
| M6 | Compact: remove "Full contact page" as equal post-success action | Header | **M** | Medium | Momentum leak |

### High impact

| # | Item | Surfaces | Complexity | Impact | Notes |
|---|------|----------|------------|--------|-------|
| H1 | Full 5-act Emotional Conversion Engine on contact success | Contact | **M–L** | **Highest** | Primary SSOT surface |
| H2 | Unified emotional architecture across header + contact | Both | **L** | **High** | Requires M1 |
| H3 | Review rotation by theme (static config first) | Success state | **M** | Medium | Trust architecture |
| H4 | Calendly pre-fill / UTM for date + funnel context | External | **M** | Medium | Ops + dev coordination |
| H5 | Dedicated availability modal (if product decision) | Modal | **L** | **High** | Geometry handoff docs exist |

### Future enhancements

| # | Item | Complexity | Notes |
|---|------|------------|-------|
| F1 | GBP review ingest + dynamic proof | **L** | Brand DNA V1.1 |
| F2 | A/B test proof quote (Matthew vs Vanessa) | **M** | Requires experiment framework |
| F3 | Post-success inline video snippet (3–5 sec) | **L** | Homepage video proof exists |
| F4 | Partner-specific success variants (planner referral traffic) | **M** | Segment-based |
| F5 | Calendly webhook → `consult_booking_completed` | **L** | Funnel doc deferred item |
| F6 | AI-free "Sound Check prep" email triggered on context | **L** | Ops automation |
| F7 | Step progress indicator (Date ✓ → Sound Check → Booked) | **M** | Emotional architecture extension |

### Suggested implementation sequence

```
Sprint 1 (Quick wins):     Q1 → Q2 → Q3 → Q5 → Q7
Sprint 2 (Foundation):     M1 → M2 → M4
Sprint 3 (Full engine):    H1 → M3 → M5
Sprint 4 (Parity):         H2 → M6 → H3
Sprint 5 (Measure):        Analytics review → F2 if needed
```

### Engineering touchpoints (for implementers)

| File | Change type |
|------|-------------|
| `src/lib/public-availability-contract.ts` | Keep API copy; add separate `POST_AVAILABILITY_EMOTIONAL` config |
| `src/components/post-availability-success.tsx` | **New** — shared engine component |
| `src/config/reviews.ts` | **New** — canonical review SSOT |
| `src/components/contact-availability-form.tsx` | Replace success block with shared component |
| `src/components/compact-availability-checker.tsx` | Replace success block with `variant="compact"` |
| `src/config/site-scheduling.ts` | Context-aware supporting copy |
| `tests/` | Snapshot or unit tests for copy structure + date chip |

### Analytics success metrics

| Metric | Target signal |
|--------|---------------|
| `book_consult_click` with `funnel_context: post_availability` | Increase vs baseline |
| `post_availability_trust_click` | **Decrease** (proof inline — fewer escape clicks) |
| Inquiry form opens from success | Decrease as % of success (consult preferred) |
| Time on success state before CTA click | Moderate increase (reading proof) |
| Bounce from `/contact` post-available | Decrease |

---

## Executive Recommendations

### 1. Elevate the success state to a first-class product surface

The availability success state is not a **message display** — it is the **highest-intent emotional conversion surface** on the site. It deserves a named component, canonical config, and the same design rigor as the homepage hero.

### 2. Adopt the Sound Check Moment as the master narrative frame

Availability confirms **when**; Sound Check begins **how**. This connects calendar utility to the consult identity already in `site-scheduling.ts` and to Matthew's communication promise.

### 3. One primary action, proof before pressure

Remove escape CTAs from the success state. Bring Matthew or Lauren forward. Demote inquiry. The couple who needs email will find it; the couple ready to trust should not be given three equal doors.

### 4. Tier the engine — compact ≠ full

The header panel cannot carry the full 5-act sequence. Build `variant="compact"` with headline + micro-proof + CTA; reserve the full engine for `/contact#availability`.

### 5. Centralize reviews before rotation

Extract 12 reviews to `src/config/reviews.ts` with Brand DNA theme tags. This unblocks proof rotation, modal integration, and future GBP merge.

### 6. Do not add pressure to compensate for weak proof

If conversion stalls after implementation, **add proof density** or **clarify consult value** — never scarcity, countdowns, or normative "most couples book now" language.

### 7. Measure trust-seeking as a diagnostic

Rising `post_availability_trust_click` after launch means **inline proof is insufficient**. Falling rate with stable consult clicks = engine working.

---

## Final Verdict

The Howe Sound Wedding DJ availability checker already has **correct infrastructure** — shared API client, post-availability session context, instrumented trust links, Sound Check consult naming, and premium visual tokens. What it lacks is **emotional architecture**.

Customers have already defined the brand at the moment of decision:

> *Calm, professional, personable communication that makes the day stress-free — plus a packed dance floor guests won't stop talking about.*

The current success state says:

> *Your date currently appears available. Submit an inquiry to continue.*

That gap is not a copy problem. It is a **conversion architecture problem**.

The Emotional Conversion Engine closes it by sequencing **relief → proof → identity → reassurance → single confident action** — using only language customers have already spoken.

When implemented, a couple who checks their date should not think *"the system says available."*  
They should think *"We've found our DJ — and our date works."*

Then Book a Consult becomes the natural next step, not a leap of faith.

---

## Appendix A — Traceability matrix

| Recommendation | Source |
|----------------|--------|
| Lead with stress-free + seamless | Brand DNA Executive Summary |
| Matthew as primary proof | Brand DNA Phase 10 — most powerful quotes #1 |
| Lauren headline frame | Brand DNA one-sentence candidates #1 |
| Wedding couple identity beat | Brand DNA differentiators + Phase 9 |
| Remove escape CTAs | Brand DNA Phase 8 psychological sequence |
| Single CTA | Brand DNA Phase 8 + premium-trust audit (decision fatigue) |
| Sound Check consult frame | `site-scheduling.ts` + Brand DNA consult messaging |
| No fake scarcity | Mission constitution |
| Review centralization | Brand DNA strategic recommendations |
| post_availability analytics | `docs/HSDJ Behavioral Conversion Funnel.txt` |

## Appendix B — Component state machine (target)

```
idle → checking → available | unavailable | manual
                      │
                      ├─► [Emotional Conversion Engine renders]
                      │         │
                      │         └─► consult_click (primary)
                      │         └─► inquiry_expand (tertiary)
                      │
                      └─► sessionStorage: post_availability_context
```

---

## Implementation status (HSDJ-WEB-CONVERSION-01, 2026-07-29)

**Implemented:** `PostAvailabilitySuccess` (full + compact), review SSOT, single-CTA conversion copy, non-blocking operator notification, `Server-Timing` on `/api/availability`, expanded post-availability analytics.

**Pending:** Production browser proof after Patrick review; full latency target validation on deployed build (warm p50 ~1.0s on production pre-deploy sample; cold start can exceed 5s).

---

*End of Emotional Conversion Engine V1*
