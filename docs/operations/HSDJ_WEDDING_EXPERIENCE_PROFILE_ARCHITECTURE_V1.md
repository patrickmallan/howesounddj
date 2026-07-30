# HSDJ Wedding Experience Profile — Architecture V1

**Document type:** Internal operations architecture SSOT  
**Upstream authority:** [`HOWE_SOUND_WEDDING_EXPERIENCE_FRAMEWORK_V1.md`](../branding/HOWE_SOUND_WEDDING_EXPERIENCE_FRAMEWORK_V1.md) (HSWEF)  
**System:** HSDJ Operations (`ops.howesounddj.com` and related internal surfaces)  
**Date:** 2026-07-29  
**Scope:** Stage 1 → Stage 2 operationalization (architecture only; no public website or client workflow changes)

**Constitution:** Lightweight · Operator judgment overrides defaults · Wedding-first · No internal jargon exposed to couples · No gimmick libraries

---

## Executive Summary

**OBJECTIVE:** Introduce the **Wedding Experience Profile (WEP)** as the canonical internal record that makes HSWEF executable inside HSDJ Operations.

**WHAT WEP IS:** A single, governed document per booked wedding that holds emotional and experiential planning data: Atmosphere Arc emphasis, archetype signals, guest dynamics, Signature Moment candidates, Roomflow linkage, execution notes, and post-event reflection.

**WHAT WEP IS NOT:** A replacement for contract/billing, calendar availability, Music Essentials, or day-of timeline systems. WEP **references** those systems and adds the experience layer HSWEF defines.

**OWNERSHIP:** Primary operator (Patrick or assigned DJ) owns WEP. System auto-creates a **Draft** shell when a wedding is confirmed in Operations. No field is required until **Execution Ready** (minimal gate).

**RELATIONSHIP TO HSWEF STACK:**

```
Wedding (Operations core)
  └── Wedding Experience Profile (WEP)  ← this document
        ├── Atmosphere Arc
        ├── Archetype signals
        ├── Guest dynamics
        ├── Signature Moment candidates[]
        ├── Roomflow plan (reference + notes)
        ├── Sound Check capture
        ├── Execution block
        └── Reflection
```

**SUCCESS CRITERION:** Every booked wedding can be planned and executed through one internal profile without duplicating Music Essentials or timeline data, without burdening operators with corporate forms, and without exposing HSWEF terminology to couples.

---

## Domain Model

### Core entities

| Entity | Description | Cardinality | Owner |
|--------|-------------|-------------|-------|
| **Wedding** | Operational wedding record (date, venue, couple, package, status) | 1 per event | HSDJ Operations (existing) |
| **Wedding Experience Profile (WEP)** | HSWEF operational projection for one wedding | **1:1** with Wedding (booked) | Primary operator |
| **Atmosphere Arc** | Embedded structure: nine phase segments with emphasis + notes | 1 per WEP | Operator |
| **ArchetypeSignals** | Internal adaptation metadata (axes/tags) | 1 per WEP | Operator |
| **GuestDynamics** | Guest composition and participation notes | 1 per WEP | Operator |
| **SignatureMomentCandidate** | Governed moment proposal (not a preset library) | 0..n per WEP | Operator |
| **SoundCheckCapture** | Consultation discovery notes | 0..1 per WEP (grows over time) | Operator |
| **RoomflowPlan** | Reception execution notes + link to Essentials | 1 per WEP (may be sparse early) | Operator |
| **ExecutionBlock** | Day-of cues, vendor coordination, contingencies | 1 per WEP | Operator |
| **ExperienceReflection** | Post-wedding learning record | 0..1 per WEP (after event) | Operator |

### Entity relationships (ER summary)

```
┌─────────────┐       1:1        ┌──────────────────────────┐
│   Wedding   │─────────────────│ Wedding Experience Profile │
└─────────────┘                  └─────────────┬────────────┘
       │                                       │
       │ references                            │ embeds
       ▼                                       ▼
┌─────────────┐                  ┌──────────────────────────┐
│ Music       │◄─── link only ───│ AtmosphereArc (9 phases) │
│ Essentials  │                  │ ArchetypeSignals         │
│ (external)  │                  │ GuestDynamics            │
└─────────────┘                  │ SoundCheckCapture        │
       │                         │ RoomflowPlan             │
       │                         │ ExecutionBlock           │
       ▼                         │ ExperienceReflection     │
┌─────────────┐                  └─────────────┬────────────┘
│ Timeline /  │◄─── link only ─────────────────┤
│ Run of show │                                │ 1..n
└─────────────┘                                ▼
                                   ┌──────────────────────────┐
                                   │ SignatureMomentCandidate[] │
                                   └──────────────────────────┘
```

### Wedding vs WEP boundary

| Concern | Wedding (core) | WEP (experience) |
|---------|----------------|------------------|
| Contract, invoice, deposit | Wedding | — |
| Calendar hold / availability | Wedding + Ops API | — |
| Couple contact info | Wedding | — |
| Package tier, hours, locations | Wedding | — |
| Emotional goals, fears | — | WEP |
| Phase emphasis, arc notes | — | WEP |
| Signature Moment governance | — | WEP |
| Room-read latitude vs fixed script | — | WEP |
| Post-event learning | — | WEP |

**RULE:** If it answers *"what should this day feel like and how do we protect that?"* it belongs in WEP. If it answers *"what did they book and when?"* it stays in Wedding.

### Lifecycle ownership

| Transition | Who acts | System behavior |
|------------|----------|-----------------|
| Wedding confirmed | System or operator | Auto-create WEP in `draft` |
| Sound Check completed | Operator | Advance to `sound_check_started` or `experience_drafted` |
| Planning underway | Operator | `planning_active` |
| Week-of lock | Operator | `execution_ready` |
| Wedding day passed | System (date) | `wedding_complete` |
| Reflection saved | Operator | `reflection_complete` |

Operator may **skip** intermediate states if data is entered in one session; states are for clarity, not bureaucracy.

---

## Lifecycle

### States

| State | Code | Meaning | Minimum data to enter |
|-------|------|---------|------------------------|
| **Draft** | `draft` | WEP shell exists; wedding booked | Wedding ID linked |
| **Sound Check Started** | `sound_check_started` | Consultation begun or scheduled | `sound_check_capture.scheduled_at` OR first note |
| **Experience Drafted** | `experience_drafted` | Initial arc + priorities captured | ≥1 emotional priority OR archetype signal |
| **Planning Active** | `planning_active` | Essentials / planning calls in progress | `roomflow_plan.music_essentials_ref` OR planning note |
| **Execution Ready** | `execution_ready` | Operator ready for day-of | Arc reviewed; execution block has `day_of_operator` |
| **Wedding Complete** | `wedding_complete` | Event date passed | Auto on date |
| **Reflection Complete** | `reflection_complete` | Post-event learning captured | `experience_reflection.completed_at` |

### State diagram (allowed transitions)

```
                    ┌─────────────────┐
                    │      draft      │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              │
     sound_check_started     │              │
              │              │              │
              └──────┬───────┘              │
                     ▼                      │
           experience_drafted               │
                     │                      │
                     ▼                      │
            planning_active ◄───────────────┘ (re-entry allowed)
                     │
                     ▼
           execution_ready
                     │
                     ▼ (wedding date + 1 day, or manual)
           wedding_complete
                     │
                     ▼
          reflection_complete
```

### Transition rules

| From | To | Trigger | Reversible? |
|------|-----|---------|-------------|
| `draft` | `sound_check_started` | Sound Check scheduled or notes added | Yes |
| `sound_check_started` | `experience_drafted` | Arc or priorities drafted | Yes |
| `experience_drafted` | `planning_active` | Essentials shared or planning call | Yes |
| `planning_active` | `execution_ready` | Operator marks ready | Yes (until wedding day) |
| `execution_ready` | `planning_active` | Material change (venue, timeline) | Yes |
| `*` | `wedding_complete` | `wedding.date < today` | No |
| `wedding_complete` | `reflection_complete` | Reflection saved | No |

**No state blocks operator access.** States are progress indicators, not permissions.

---

## Entity Relationships (detailed)

### WeddingExperienceProfile (root)

```typescript
// Conceptual schema — implementation language-agnostic

WeddingExperienceProfile {
  id: UUID
  wedding_id: UUID                    // FK → Wedding (unique)
  lifecycle_state: LifecycleState
  schema_version: "1.0"
  primary_operator_id: UUID
  created_at: timestamp
  updated_at: timestamp

  atmosphere_arc: AtmosphereArc
  archetype_signals: ArchetypeSignals
  guest_dynamics: GuestDynamics
  sound_check_capture: SoundCheckCapture | null
  roomflow_plan: RoomflowPlan
  execution_block: ExecutionBlock
  experience_reflection: ExperienceReflection | null

  signature_moment_candidates: SignatureMomentCandidate[]

  // Lightweight cross-links (IDs only — no duplicate payloads)
  music_essentials_document_id: string | null
  timeline_document_id: string | null
  venue_guide_slug: string | null      // optional link to site venue knowledge
}
```

### AtmosphereArc

Nine fixed phases (HSWEF Tier 1 taxonomy). Each phase is a **segment**, not a free-form tag.

```typescript
AtmosphereArcPhaseId =
  | "arrival"
  | "ceremony"
  | "transition"
  | "cocktail"
  | "dinner"
  | "speeches"
  | "dance_floor"
  | "late_night"
  | "closing"

AtmosphereArcPhase {
  phase_id: AtmosphereArcPhaseId
  emphasis: "low" | "medium" | "high"   // operator weight — NOT a score
  operator_notes: string | null
  concerns: string | null
  opportunities: string | null
  covered_by_package: boolean | null     // optional: ceremony-only vs full arc
}

AtmosphereArc {
  phases: AtmosphereArcPhase[]           // always 9 entries; defaults medium
  arc_summary: string | null             // 1–3 sentences internal
  last_reviewed_at: timestamp | null
}
```

### ArchetypeSignals

Internal only. Never shown to couple.

```typescript
ArchetypeSignals {
  energy: "quiet" | "balanced" | "high" | null
  formality: "elegant" | "balanced" | "relaxed" | null
  guest_culture: "family_forward" | "balanced" | "friend_crew" | null
  setting: "mountain_destination" | "local_community" | null
  operator_tags: string[]                // free tags, e.g. "multigenerational"
  operator_notes: string | null
}
```

### GuestDynamics

```typescript
GuestDynamics {
  approximate_guest_count: number | null
  age_spread_notes: string | null
  dance_participation_expectation: "low" | "mixed" | "high" | null
  cultural_music_notes: string | null
  sensitive_dynamics_private: string | null   // operator-only; never client-visible
  inclusion_priorities: string | null
}
```

### SignatureMomentCandidate

```typescript
SignatureMomentStatus =
  | "idea"           // captured, not evaluated
  | "evaluating"     // acceptance checklist in progress
  | "accepted"       // meets criteria; planned
  | "rejected"       // failed criteria or couple declined
  | "executed"       // day-of complete
  | "reflected"      // post-event outcome recorded

SignatureMomentCandidate {
  id: UUID
  description: string
  reason: string | null                  // why it matters to couple
  phase_id: AtmosphereArcPhaseId
  moment_type: "anchor" | "pivot" | "breath" | "thread" | "support" | null
  status: SignatureMomentStatus

  acceptance_checklist: {
    emotionally_meaningful: boolean | null
    natural: boolean | null
    authentic: boolean | null
    repeatable: boolean | null
    adaptable: boolean | null
    memorable: boolean | null
    story_enhancing: boolean | null
    guest_inclusive: boolean | null
    operationally_achievable: boolean | null
    stress_neutral_or_reducing: boolean | null
  }

  rejection_reason: string | null      // if rejected
  execution_notes: string | null
  post_event_outcome: string | null
  created_at: timestamp
  updated_at: timestamp
}
```

**RULE:** A moment is **accepted** only when all ten checklist booleans are `true` OR operator documents explicit override in `execution_notes` with reason (judgment preserved).

### SoundCheckCapture

```typescript
SoundCheckCapture {
  scheduled_at: timestamp | null
  completed_at: timestamp | null
  emotional_priorities: {
    must_feel_calm: string | null
    must_feel_celebratory: string | null
    must_not_feel: string | null
  }
  couple_story_notes: string | null
  guest_expectations: string | null
  fears_and_risks: string | null
  must_have_outcomes: string | null
  planning_style: "planners" | "improvisers" | "mixed" | null
  planning_notes: string | null
  fit_assessment: "strong" | "good" | "nurture" | null
  operator_raw_notes: string | null    // unstructured Calendly/notes paste
}
```

### RoomflowPlan

```typescript
RoomflowPlan {
  music_essentials_ref: string | null  // document ID or URL
  reception_notes: string | null         // pacing, genres, trust-building
  transition_priorities: string | null
  latitude_notes: string | null          // where operator can read room
  fixed_script_notes: string | null      // where script is fixed
  last_synced_from_essentials_at: timestamp | null
}
```

### ExecutionBlock

```typescript
ExecutionBlock {
  day_of_operator_id: UUID | null
  vendor_coordination: {
    planner_name: string | null
    planner_contact: string | null
    mc_overlap_notes: string | null
    other_vendor_notes: string | null
  }
  venue_logistics: string | null
  contingency_notes: string | null
  cue_sheet_notes: string | null         // freeform or link to timeline
  week_of_locked_at: timestamp | null
}
```

### ExperienceReflection

```typescript
ExperienceReflection {
  completed_at: timestamp | null
  what_worked: string | null
  unexpected_highlights: string | null
  operator_observations: string | null
  future_improvements: string | null
  review_received: boolean | null
  review_theme_tags: string[] | null     // align with src/config/reviews.ts themes when applicable
  signature_moment_outcomes: { candidate_id: UUID; note: string }[]
}
```

---

## Field Catalog

Governance columns: **P** purpose · **R** required · **Op** operator-editable · **Cl** client-editable · **De** derived · **Auto** automation candidate

### Profile root

| Field | P | R | Op | Cl | De | Auto |
|-------|---|---|----|----|----|------|
| `wedding_id` | Link to core wedding | Yes (create) | No | No | Yes | Yes (on booking) |
| `lifecycle_state` | Progress tracking | Yes | Yes | No | No | Partial (date-based) |
| `primary_operator_id` | Accountability | Yes | Yes | No | No | Default Patrick |
| `schema_version` | Migration | Yes | No | No | Yes | Yes |

### Atmosphere Arc (per phase × 9)

| Field | P | R | Op | Cl | De | Auto |
|-------|---|---|----|----|----|------|
| `emphasis` | Phase weight | No (default medium) | Yes | No | No | Suggest from archetype (future) |
| `operator_notes` | Execution context | No | Yes | No | No | No |
| `concerns` | Risk flags | No | Yes | No | No | No |
| `opportunities` | Signature Moment seeds | No | Yes | No | No | No |
| `covered_by_package` | Scope clarity | No | Yes | No | Yes (from package) | Future |

### Archetype signals

| Field | P | R | Op | Cl | De | Auto |
|-------|---|---|----|----|----|------|
| All axis enums | Adaptation lens | No | Yes | No | No | Suggest from Sound Check (future) |
| `operator_tags` | Edge cases | No | Yes | No | No | No |

### Guest dynamics

| Field | P | R | Op | Cl | De | Auto |
|-------|---|---|----|----|----|------|
| `approximate_guest_count` | Room-read | No | Yes | No | Yes (Wedding) | Future |
| `sensitive_dynamics_private` | Risk | No | Yes | No | No | No |
| Other fields | Planning | No | Yes | No | No | No |

### Sound Check capture

| Field | P | R | Op | Cl | De | Auto |
|-------|---|---|----|----|----|------|
| `emotional_priorities.*` | HSWEF discovery | No | Yes | No | No | No |
| `fears_and_risks` | Stress reduction | No | Yes | No | No | No |
| `must_have_outcomes` | Non-negotiables | No | Yes | No | No | No |
| `operator_raw_notes` | Fast capture | No | Yes | No | No | No |

### Signature Moment candidate

| Field | P | R | Op | Cl | De | Auto |
|-------|---|---|----|----|----|------|
| `description` | Intent | Yes (if row exists) | Yes | No | No | No |
| `phase_id` | Arc placement | Yes | Yes | No | No | No |
| `acceptance_checklist` | Governance | No until `evaluating` | Yes | No | No | No |
| `status` | Workflow | Yes | Yes | No | No | No |

### Roomflow / Execution / Reflection

| Field | P | R | Op | Cl | De | Auto |
|-------|---|---|----|----|----|------|
| `music_essentials_ref` | Link only | No | Yes | No | No | Future sync |
| `cue_sheet_notes` | Day-of | No | Yes | No | No | No |
| `week_of_locked_at` | Execution gate | No | Yes | No | No | No |
| Reflection fields | Learning | No | Yes | No | No | No |

### Required-field philosophy

| State | Hard requirements |
|-------|-------------------|
| Through `planning_active` | **None** beyond `wedding_id` |
| `execution_ready` | `primary_operator_id`, arc `last_reviewed_at`, execution `day_of_operator_id` |
| `reflection_complete` | `experience_reflection.completed_at` + at least one reflection text field |

**Rejected complexity:** scoring, percentages, mandatory Signature Moments, client-facing WEP fields, duplicate song lists.

---

## Atmosphere Arc Model

### Canonical phases (fixed order)

1. `arrival`  
2. `ceremony`  
3. `transition`  
4. `cocktail`  
5. `dinner`  
6. `speeches`  
7. `dance_floor`  
8. `late_night`  
9. `closing`  

### Emphasis semantics

| Value | Meaning for operator |
|-------|---------------------|
| `low` | Minimal creative investment; maintain flow |
| `medium` | Default; balanced attention |
| `high` | Critical to couple story; extra prep and room-read |

**No numeric scoring.** Emphasis is ordinal judgment, not analytics.

### Operator actions per phase

| Action | Stored in |
|--------|-----------|
| Weight phase | `emphasis` |
| Capture context | `operator_notes` |
| Flag risk | `concerns` |
| Seed Signature Moment | `opportunities` → may spawn candidate |

### Default initialization

On WEP create: all phases `emphasis: medium`, notes null. Operator adjusts after Sound Check.

### Package scope hint

`covered_by_package` optional boolean per phase — helps operators align arc with what was sold (ceremony-only vs full day) without duplicating package SKU data.

---

## Signature Moment Governance

### Framework implementation (no preset library)

Operators create **candidates** per wedding. There is no global catalog of "moments to sell."

### Workflow

```
idea → evaluating → accepted | rejected
accepted → executed → reflected (via Reflection.signature_moment_outcomes)
```

### Acceptance gate

All ten HSWEF criteria map 1:1 to `acceptance_checklist` booleans. UI should present as checklist with criterion labels from HSWEF (internal).

**Override policy:** Operator may set `accepted` with incomplete checklist only if `execution_notes` contains `override_reason:` — preserves accountability without blocking judgment.

### Rejection gate

Auto-suggest rejection when operator marks any HSWEF disqualifier in notes (viral stunt, couple day-of logistics, etc.). Status → `rejected` + `rejection_reason`.

### No library rule

| Allowed | Not allowed |
|---------|-------------|
| Per-wedding candidates | Global "moment templates" catalog |
| Copy candidate from past wedding (manual) | Automated "recommended moments" to couples |
| Acceptance checklist | Pre-built stunt packages |

---

## Sound Check Mapping

Maps HSWEF consultation blocks → WEP fields. **Does not change Calendly or public consult workflow in this tranche.**

| HSWEF Sound Check block | WEP destination |
|-------------------------|-----------------|
| **1. Connection** | `sound_check_capture.operator_raw_notes` (rapport) |
| **2. Story** | `couple_story_notes`, `archetype_signals.*`, `emotional_priorities` |
| **3. Guest lens** | `guest_dynamics.*`, `guest_expectations` |
| **4. Day shape** | `atmosphere_arc.phases[].emphasis`, `opportunities` |
| **5. Fears** | `fears_and_risks`, `atmosphere_arc.phases[].concerns` |
| **6. Fit + next steps** | `fit_assessment`, `planning_notes`, lifecycle → `experience_drafted` |

### Discovery category → field map

| Category | Fields |
|----------|--------|
| Emotional priorities | `emotional_priorities.must_feel_calm`, `must_feel_celebratory`, `must_not_feel` |
| Guest dynamics | `guest_dynamics.*`, `guest_expectations` |
| Fears | `fears_and_risks`, phase `concerns` |
| Must-have outcomes | `must_have_outcomes`, Signature Moment `idea` rows |
| Planning notes | `planning_notes`, `roomflow_plan.latitude_notes` / `fixed_script_notes` |

### Post-Sound Check operator checklist (manual, Stage 2)

1. Set lifecycle ≥ `experience_drafted`  
2. Set at least one non-default arc `emphasis`  
3. Record `sound_check_capture.completed_at`  
4. Optional: create 0–2 Signature Moment `idea` rows from `opportunities`  

---

## Roomflow Integration

### Single source of truth rules

| Data type | SSOT | WEP role |
|-----------|------|----------|
| Song lists, do-not-play, must-plays | **Music Essentials** (Google Doc / future Ops doc) | `roomflow_plan.music_essentials_ref` only |
| Clock times, processional order | **Timeline** (planner doc / Ops attachment) | `execution_block.cue_sheet_notes` or `timeline_document_id` |
| Reception pacing philosophy | **Roomflow Method** (HSWEF) | `roomflow_plan.reception_notes`, `transition_priorities` |
| Phase emotional weight | **Atmosphere Arc** | `atmosphere_arc` |
| Day-of tasks | **Execution checklist** | `execution_block.*` |

### Anti-duplication rules

1. **Never store song titles in WEP** — link Essentials.  
2. **Never store ceremony start time in WEP** — link Timeline/Wedding.  
3. **WEP stores interpretation:** latitude, concerns, opportunities, transition intent.  
4. **Sync is pull, not push:** operator reviews Essentials → updates `last_synced_from_essentials_at` manually (until automation).

### Roomflow Plan derivation flow

```
Music Essentials (songs, genres)
        +
Atmosphere Arc (dance_floor / late_night emphasis)
        +
Guest dynamics (participation)
        ↓
RoomflowPlan (operator narrative)
        ↓
ExecutionBlock.cue_sheet_notes (day-of)
```

### Vendor coordination

Stored in `execution_block.vendor_coordination` — names/contacts only, not full vendor CRM.

---

## Reflection Model

### Purpose

Organizational learning and HSWEF refinement — **not** operator performance scoring.

### Trigger

- Auto-prompt when lifecycle → `wedding_complete`  
- Operator completes when review received or within 14 days  

### Capture template

| Section | Field | Prompt (internal) |
|---------|-------|-------------------|
| What worked | `what_worked` | What matched the arc? |
| Surprises | `unexpected_highlights` | What exceeded plan? |
| Observations | `operator_observations` | Room-read notes for next time |
| Improvements | `future_improvements` | Process only — not couple criticism |
| Reviews | `review_received`, `review_theme_tags` | Map to `REVIEW_THEME_TAGS` if applicable |
| Moments | `signature_moment_outcomes[]` | Per accepted candidate |

### Theme tag alignment (optional)

When a Google/review arrives, tag with themes from `src/config/reviews.ts` (`STRESS_FREE`, `DANCE_FLOOR`, etc.) for Stage 5 measurement — stored in WEP reflection only, not public site.

### Closure

Saving reflection with any text field → lifecycle `reflection_complete`.

---

## Operations UI Architecture

**Architecture only.** No visual redesign in this tranche.

### Navigation (per wedding)

```
Wedding Detail
├── Overview          ← summary cards + lifecycle + quick links
├── Experience Profile ← emotional priorities, archetype, Sound Check
├── Atmosphere Arc    ← 9-phase grid editor
├── Guest Dynamics    ← guest form
├── Signature Moments ← candidate table + checklist drawer
├── Execution         ← roomflow + vendor + cue notes
└── Reflection        ← post-event form (visible after wedding date)
```

### Section responsibilities

| Section | Primary actions | Data owned |
|---------|-----------------|------------|
| **Overview** | Lifecycle badge, operator assign, links to Essentials/Timeline | Derived summary |
| **Experience Profile** | Sound Check fields, emotional priorities, archetype | `sound_check_capture`, `archetype_signals`, priorities |
| **Atmosphere Arc** | 9-phase emphasis + notes/concerns/opportunities | `atmosphere_arc` |
| **Guest Dynamics** | Guest form | `guest_dynamics` |
| **Signature Moments** | CRUD candidates, run checklist, status | `signature_moment_candidates[]` |
| **Execution** | Roomflow + vendor + lock week-of | `roomflow_plan`, `execution_block` |
| **Reflection** | Post-event form | `experience_reflection` |

### Overview card content (read-only aggregates)

- Lifecycle state + last updated  
- Top 3 high-emphasis phases  
- Count: Signature Moments by status  
- Links: Open Music Essentials · Open Timeline  
- **No HSWEF jargon on any client-exportable surface**

### UX principles

1. **One wedding, one scroll depth per section** — avoid nested modals hell.  
2. **Empty states invite notes, not required fields.**  
3. **Checklist for Signature Moments, not for entire WEP.**  
4. **Private fields visually distinct** (`sensitive_dynamics_private`).  
5. **Operator override always visible** — no hidden automation.

---

## Implementation Roadmap

### Foundation (this tranche — complete with this document)

- [x] WEP architecture V1  
- [x] Entity schemas (conceptual)  
- [x] Lifecycle + field governance  
- [ ] Operator alignment session (Patrick)  

### Data model (HSDJ Operations — next)

| Task | Dependency | Effort |
|------|------------|--------|
| Add `wedding_experience_profiles` table/collection | Wedding entity exists | M |
| JSON column or child tables for arc phases | Profile table | M |
| `signature_moment_candidates` child table | Profile table | S |
| Migration: `schema_version` | Profile table | S |
| API: CRUD profile by `wedding_id` | Auth in Ops | M |

### Operator workflow (Stage 2)

| Task | Dependency | Effort |
|------|------------|--------|
| Sound Check note template → WEP field mapping UI | Data model | M |
| Auto-create WEP on booking | Wedding webhook | S |
| Lifecycle state controls | Data model | S |
| Signature Moment checklist UI | Candidate CRUD | M |

### UI (Stage 3)

| Task | Dependency | Effort |
|------|------------|--------|
| Seven-section wedding detail nav | Data model | L |
| Atmosphere Arc 9-phase grid | Profile API | M |
| Execution week-of lock | Profile API | S |
| Reflection prompt post-date | Cron or date job | S |

### Future automation (Stage 4+)

| Task | Value | Risk |
|------|-------|------|
| Suggest archetype from Sound Check notes | Speed | Wrong inference |
| Pull guest count from Wedding | Less typing | Low |
| Essentials link metadata sync | Freshness | Integration fragility |
| Review theme auto-tag | Learning | Privacy |
| Day-of run sheet export from WEP | Execution | Premature formatting |

**Dependency graph:**

```
Wedding (exists) → WEP data model → API → Operator UI → Automation
                      ↓
              Sound Check template (parallel, no code)
```

---

## Strategic Risks

| Risk | Mitigation |
|------|------------|
| WEP becomes unused paperwork | Minimal required fields; lives inside existing Ops wedding view |
| Duplication with Essentials | Strict link-only rule for songs/times |
| Internal jargon leaks to couples | No client portal for WEP in Stage 2–3 |
| Signature Moment creep | No library; checklist + rejection criteria |
| Over-automation too early | Automation table marked future; manual sync first |
| Multi-DJ without WEP | `day_of_operator_id` required at execution_ready |
| Schema drift | `schema_version` on every profile |

---

## Executive Recommendations

1. **Implement WEP as 1:1 child of Wedding** in HSDJ Operations before any public HSWEF messaging.  
2. **Ship Sound Check → WEP field mapping** as operator UI priority (Stage 2).  
3. **Use nine-phase Atmosphere Arc grid** as the visual centerpiece — not Signature Moment gimmicks.  
4. **Enforce link-not-copy** for Music Essentials and Timeline from day one.  
5. **Defer automation** until 10+ weddings have reflection data.  
6. **Train on lifecycle as progress, not compliance** — empty fields are acceptable early.  

---

## Final Verdict

The **Wedding Experience Profile** is the operational bridge that makes HSWEF real inside HSDJ Operations.

It does not add features couples see. It adds **structure for judgment operators already exercise**: which phases matter, what could go wrong, where latitude lives, which peaks are worth planning, and what was learned afterward.

Implemented lightly, WEP increases consistency without ceremony. Implemented heavily, it becomes shelfware. This architecture chooses **lightweight governance**: fixed arc taxonomy, optional depth, operator override, strict anti-duplication with Essentials and Timeline, and reflection for learning — not scoring.

> **Canonical rule:** One wedding · One profile · One emotional arc · Zero gimmick libraries.

---

## Appendix A — HSWEF traceability

| HSWEF artifact | WEP implementation |
|----------------|-------------------|
| Atmosphere Arc (9 phases) | `AtmosphereArc.phases[]` |
| Archetype matrix | `ArchetypeSignals` |
| Guest dynamics field group | `GuestDynamics` |
| Signature Moment criteria | `acceptance_checklist` |
| Sound Check blocks | `SoundCheckCapture` |
| Roomflow Method | `RoomflowPlan` |
| Execution checklist | `ExecutionBlock` |
| Post-event reflection | `ExperienceReflection` |
| Experience Principles | Operator training (not stored) |

## Appendix B — Review theme tags (reflection optional)

Align with `src/config/reviews.ts`: `STRESS_FREE`, `SEAMLESS`, `COMMUNICATION`, `FULL_EVENT`, `DANCE_FLOOR`, `ENERGY`, `TEAM_MEMBER`, `CARE`, `PLANNING`, `CRAFT`, `LOCAL`.

## Appendix C — Glossary (internal)

| Term | Ops meaning |
|------|-------------|
| **WEP** | Wedding Experience Profile record |
| **Arc** | Nine-phase Atmosphere Arc embedded in WEP |
| **Candidate** | Signature Moment proposal before acceptance |
| **Essentials** | Music Essentials document (external SSOT for songs) |
| **Sound Check** | Consultation; seeds WEP via SoundCheckCapture |

---

*End of Wedding Experience Profile Architecture V1*
