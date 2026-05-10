# Weddings Image Crop Refinement + No Em-Dash Sitewide

Tranche scope:
1. Step the previous mobile crop of `weddings-crowd.webp` back from over-aggressive 1:1 edge-to-edge to a balanced 4:3 with a left-bias that keeps the foreground dancing crowd central.
2. Remove every em dash (`—`) from the source under `src/app`, `src/components`, `src/config`, `src/lib` and replace the prior tranche's editorial copy with a colon-form rewrite per spec.

---

## Issue 1 — Weddings crowd image mobile crop

**Image:** `public/images/weddings/weddings-crowd.webp` (1600×1067, native ratio 1.5).

The dance-floor procession is composed left-to-center: leftmost groomsman is laughing/dancing (~0–15% from the left edge), bride is at ~33% from left, additional smiling/dancing party fills the middle. The right ~25–30% of the image holds standing/non-dancing onlookers.

### What was wrong

The previous tranche set mobile to `aspect-[1/1]` edge-to-edge. On a 390px viewport that resolved to:

- Image scaled to fit height (390 / 1067 ≈ 0.366 scale).
- Rendered image width: 585px in a 390px frame.
- Side crop: ~16.7% of the **native** image lost on each side.
- Net effect: the leftmost dancing groomsman was largely cropped out, while the right onlookers stayed visible. Composition shifted away from the dance-floor emotion the photo was chosen for.

### Fix (layout-only — no asset modification)

All edits in `src/app/weddings/page.tsx`:

| Layer | Before | After |
|---|---|---|
| Mobile (`< sm`) aspect | `!aspect-[1/1]` (square) | `!aspect-[4/3]` |
| Tablet (`sm`–`lg`) aspect | `!aspect-[4/3]` | `!aspect-[4/3]` (collapsed both into one rule: `max-lg:!aspect-[4/3]`) |
| Desktop (`lg+`) aspect | `aspect-[16/10]` (from `ImageSlot` prop) | unchanged |
| `imageClassName` | `object-[center_42%]` | `object-[25%_42%] lg:object-[center_42%]` |
| Edge-to-edge mobile | `px-0 sm:px-6 lg:px-8` | unchanged (kept for "larger than before" presence) |
| Mobile sharp corners | `[&_figure>div]:!rounded-none sm:[&_figure>div]:!rounded-[1.5rem]` | unchanged |

### Why these specific values

At mobile (390×293 visible frame after 4:3 + edge-to-edge):

- Image now scales to fit height (293 / 1067 ≈ 0.275). Rendered image is **440×293**.
- Total horizontal overflow vs. frame: only **50px** (≈11.4% of rendered width — vs. 33% with the old 1:1).
- `object-[25%_42%]` shifts the visible window so the image's left edge is preserved (≈45px native lost to left, ≈136px native lost to right). Concretely:
  - **Leftmost dancing groomsman: fully preserved.**
  - **Bride: sits at ~34% of frame width — naturally off-center, leaving frame energy to her right.**
  - **Right-edge non-dancing onlookers: trimmed (~8.5% of native image width), the foreground dance focus is restored.**
- Vertical fit is exact at this aspect, so the y-component of `object-position` has no effect on mobile/tablet — the existing `42%` value is preserved purely for the desktop 16:10 case where it still biases up to keep guests' faces centered.
- `subtleBottomGradient` retained (subtle bottom vignette, no black dead space).
- `object-contain` was considered and rejected: the frame `bg-neutral-900` would show as black bars (the spec explicitly forbids dead black space). `object-cover` with a near-native aspect achieves the "less aggressive crop" intent without letterboxing.

### Image presence vs. previous tranche

| State | Mobile visible area (390-wide phone) | Native image width preserved |
|---|---|---|
| Pre-tranche (16:10, contained) | 342 × 214 = 73k px² | 100% |
| Tranche 1 (1:1, edge-to-edge) | 390 × 390 = 152k px² | ~67% (16.7% cropped each side) |
| **This tranche (4:3, edge-to-edge, 25% x-bias)** | **390 × 293 = 114k px²** | **~89% (2.8% lost left / 8.5% lost right)** |

→ Still ~56% larger area than the original, with the dance-foreground intact.

---

## Issue 2 — Weddings editorial copy

Replaced the prior tranche's pull-quote (which contained an em dash) with the spec's exact colon-form copy:

> The best dance floors don't feel forced. They unfold naturally: the right song at the right moment, your people fully present, and a room that slowly lets go together.

(Apostrophe rendered via `&rsquo;` to preserve the curly typography already used elsewhere in the file.)

---

## Sitewide em-dash removal

`rg -n -- "—" src/app src/components src/config src/lib` reported **30 hits** before this tranche. After:

```
$ rg -n -- "—" src/app src/components src/config src/lib || echo "NO_MATCHES"
NO_MATCHES
```

Replacements were chosen per the spec's preferred order (colon → comma → semicolon → period → parentheses → plain hyphen only where stylistically correct), picking whichever read most natural in context. Reading flow, sentence rhythm, and existing copy voice were preserved.

### Visible copy changes

| File | Line (pre) | Replacement strategy |
|---|---|---|
| `src/app/page.tsx` | feature copy: "no autopilot playlists—music shaped…" | colon |
| `src/app/page.tsx` | feature copy: "the Sea-to-Sky corridor—venues, vendors…" | period (split into two sentences for cadence) |
| `src/app/page.tsx` | hero descriptor: "elegant, emotional, or celebratory—often all three…" | parentheses (clean parenthetical) |
| `src/app/page.tsx` | "why" intro: "respects your setting—from ceremony…" | comma |
| `src/app/page.tsx` | proof eyebrow: "Sea-to-Sky setting you chose—held with intention…" | period |
| `src/app/page.tsx` | reviews: "Squamish, the corridor, and Whistler—the full set…" | period |
| `src/app/page.tsx` | venues blurb: "restored local spaces—settings where…" | colon |
| `src/components/explore-site-links.tsx` | "editorial notes—when you want them" | comma |
| `src/app/contact/page.tsx` | bullet: "Metro Vancouver—whatever matches your invitation" | parentheses |
| `src/app/contact/page.tsx` | "Local to the corridor": "personalized execution—what couples describe…" | colon |
| `src/app/stories/page.tsx` | story summary: "Howe Sound atmosphere—how guests arrive…" | period |
| `src/app/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like/page.tsx` | meta description: "the arc from ceremony to dancing—without recounting…" | comma |
| ↑ same file | "touched a dance floor—and awe is not the same…" | period |
| ↑ same file | "dancing arrive as relief—as warmth shared…" | colon |
| ↑ same file | "trust the person steering sound—when transitions feel human, when volume…" | comma (preserved the parallel `when …, when …, when …` rhythm) |
| ↑ same file | "trust is even more visible—there is nowhere to hide…" | period |
| ↑ same file | "the natural next page—not a bolt-on finale" | comma |
| ↑ same file | "Squamish weekends actually breathe—all of that shapes…" | period |
| ↑ same file | three Related-link descriptors (`— named-setting flow…`, `— decision support…`, `— companion editorial…`) | colon (Link followed by `: descriptor.`) |
| ↑ same file | finale: "feel when the light changes—no need for a perfect brief" | period |

### Technical-comment changes (easy/safe — covered by spec carve-out)

The spec said "Do not alter… non-visible technical comments **unless easy/safe**." All eight were trivial mechanical replacements, and clearing them out lets the `rg` check stay genuinely empty so future audits don't have to re-classify each hit. Replacements:

- `src/lib/availability-reason.ts` — JSDoc: em-dash → comma.
- `src/components/book-consult-tracked-link.tsx` — JSDoc: em-dash → comma.
- `src/components/site-chrome.tsx` — JSDoc: em-dash → comma.
- `src/lib/analytics.ts` — inline `// gtag present but threw — ignore` → comma.
- `src/app/api/availability/route.ts` — four `// REASON_KEY — description` comments → colon (kept the `KEY: description` structure, which is more idiomatic for label/value comments).

### Intentionally not altered

- External URLs (no em dashes inside any URL in the codebase — verified by the rg output, which showed only prose/comment hits).
- SVG / path / data syntax (no hits in those contexts).
- Generated code, package files, lockfiles.
- The unicode arrow `→` in `src/app/api/availability/route.ts:90` (this is an arrow, not an em dash; precedence chain semantics — left in place).
- `docs/` and `logs/` files (out of scope per the user's specified search roots `src/app | src/components | src/config | src/lib`).

---

## Validation

```
$ cd ~/Desktop/howesounddj
$ rg -n -- "—" src/app src/components src/config src/lib || echo "NO_MATCHES"
NO_MATCHES

$ npx tsc --noEmit
(exit 0)

$ npx eslint .
(exit 0)

$ npm run build
✓ Compiled successfully in 4.5s
✓ Generating static pages (44/44)
(exit 0, full route tree, no warnings)
```

All four checks pass. No type, lint, or build regressions.

---

## Manual mobile QA notes (375 / 390 / 430)

- **Weddings hero proof image**: now reads as a wide editorial frame (~390×293 on a 390 phone), full-bleed with sharp mobile corners. Leftmost dancing groomsman is fully visible, bride sits naturally left-of-center, right-edge onlookers gracefully fall outside the frame. No black dead space, no obvious crop artifact, no "gallery-style" feel. Editorial copy below now reads cleanly with a colon: "They unfold naturally: the right song at the right moment…".
- **Homepage hero**: copy under the H1 ("…celebratory (often all three, in the order that fits your people).") preserves the original rhythm via parentheses.
- **Homepage feature cards**: "no autopilot playlists: music shaped…" and the corridor breakdown into two short sentences both read more crisply.
- **Stories — Sea to Sky Gondola** page: long-form prose now uses period / colon / comma in line with editorial cadence; no rhythm regressions found at 375 / 390 / 430. The "Related" link descriptors with `Link: descriptor.` read like a clean editorial caption row.
- **Contact page**: bullet now reads "…Metro Vancouver (whatever matches your invitation)" — the parenthetical fits the bullet form.

---

## Acceptance check

- [x] `rg -n -- "—" src/app src/components src/config src/lib` returns no matches.
- [x] Weddings crowd image on mobile shows the foreground dancing/smiling people clearly.
- [x] Image no longer feels over-cropped or misfocused.
- [x] Supporting copy contains no em dash (verified by `rg`).
- [x] No black dead space, no letterboxing.
- [x] CTA hierarchy / dark luxury system / performance preserved.
- [x] TypeScript, ESLint, and `npm run build` pass.
