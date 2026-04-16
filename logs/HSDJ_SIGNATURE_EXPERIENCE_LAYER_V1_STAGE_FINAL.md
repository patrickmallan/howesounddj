# HSDJ_SIGNATURE_EXPERIENCE_LAYER_V1 — Stage FINAL

**Pack ID:** HSDJ_SIGNATURE_EXPERIENCE_LAYER_V1  
**Commit (at verification):** `8170f211d79c824be2058a3ccb7c9af089b06281` (update after your commit if needed)

## 1. Overall strategy chosen

This pass **layers on top of** the existing **HSDJ motion foundation** (Framer Motion `SectionReveal` / stagger / CSS premium surfaces). It adds two **signature** elements only on the **homepage** where impact is highest:

1. **Visual sound identity** in the hero — no audio, no autoplay.
2. **One brand-anchor statement block** — bold, short, spaced, emotionally confident — placed **after the “In motion” video strip** and **before** “Why Howe Sound DJ” so it reads as a **midpage memory beat** after proof-of-energy media.

No new conversion architecture, no contact-page drama, no sitewide copy overhaul.

## 2. Shared motion system approach used

**Reused as-is:** `SectionReveal`, `StaggerGroup` / `StaggerItem`, `motion-tokens`, `globals.css` utilities (`.premium-surface`, `.motion-interactive`, `.atmosphere-grain`, etc.).

The **brand anchor** section is wrapped in **`SectionReveal`** so it enters with the same **fade + slight rise** profile as other major blocks, with **reduced motion** handled inside that component.

## 3. Hero sound-identity implementation used

- **Component:** `src/components/hero-sound-identity.tsx`
- **What it is:** Two **SVG stroke paths** (soft waveform lines) in **low-contrast amber**, sitting **directly under** the hero headline + tagline (`HomepageHeroHeadline`) and **above** the first body paragraph.
- **Motion:** CSS **`hero-sound-breathe`** on `.hero-sound-identity-svg` — a **slow opacity pulse** only when `prefers-reduced-motion: no-preference`. Under **reduced motion**, animation is off and opacity is fixed lower.
- **Accessibility:** Wrapper is **`aria-hidden`** — purely decorative; H1 / tagline / CTAs unchanged in order and prominence.
- **Audio:** **None.** No `<audio>`, no user-triggered playback in this pass.

## 4. Statement section copy and placement

- **Placement:** **`HomeVideoProof`** → **`BrandAnchorStatement`** → **“Why Howe Sound DJ”** (`#why`).
- **Headline:** “**Packed dance floors.**” + second line “**Every time.**” (accent on the second line via `text-amber-200/95`).
- **Eyebrow:** “Howe Sound DJ” (small caps tracking).
- **Supporting line (one sentence):** “Music, room, and crowd—read with intention, not left to chance.”

## 5. Atmospheric treatments added

- **Brand anchor section:** Layered **radial gradients** (soft amber ellipse + faint bottom glow) behind centered copy — **no** particles, **no** heavy blur.
- **Hero:** Existing hero radial gradient unchanged; waveform uses **global** animation rules in `globals.css`.

## 6. Files touched

| File | Change |
|------|--------|
| `src/components/hero-sound-identity.tsx` | **New** — SVG waveform motif |
| `src/components/brand-anchor-statement.tsx` | **New** — brand anchor section + `SectionReveal` |
| `src/app/page.tsx` | Insert `HeroSoundIdentity`, `BrandAnchorStatement` |
| `src/app/globals.css` | `hero-sound-breathe` + `.hero-sound-identity-svg` rules |
| `logs/HSDJ_SIGNATURE_EXPERIENCE_LAYER_V1_STAGE_FINAL.md` | This log |

## 7. Validation results

- `npm run lint` — pass  
- `npm run build` — pass  

Suggested grep checks:

- `rg -n "HeroSoundIdentity|BrandAnchorStatement|Packed dance floors|hero-sound" src`

## 8. Manual QA notes

1. **Homepage:** Hero H1 + tagline + **Check Availability** remain visually primary; waveform is **subordinate**.  
2. **Statement block:** Should feel like a **pause** and a **memory moment**, not a wall of text.  
3. **Reduced motion:** OS setting on — waveform pulse should **stop**; section reveal should **collapse** via existing Framer + CSS patterns.  
4. **Mobile:** Waveform scales with `max-w`; statement stays readable and centered.  
5. **No sound** on load or interaction from these components.

## 9. Non-regression confirmation

This pass did **not** weaken:

- **Check Availability funnel** — same links, same hierarchy; hero CTA unchanged.  
- **Readability** — statement is short; hero copy flow is headline → tagline → motif → paragraph.  
- **CTA hierarchy** — primary button still amber / first in row.  
- **Wedding-only positioning** — language stays wedding- and experience-focused.  
- **Mobile usability** — no new fixed overlays or horizontal traps.  
- **Performance expectations** — lightweight SVG + CSS; no audio, no heavy canvas/video added.

## 10. Recommended next refinement step

- Optional A/B: **micro-adjust** waveform opacity** after real device QA on **OLED / sunlight**.  
- Optional: add the **same statement** (or a shorter variant) to **one** other high-intent page (e.g. `/weddings`) only if analytics show homepage anchor resonates.

---

**Success:** The homepage now has a **coherent signature layer**: established **motion system**, a **subtle music-led visual** in the hero without noise, and a **single bold brand moment** users can recall—without trading clarity or conversion for flash.
