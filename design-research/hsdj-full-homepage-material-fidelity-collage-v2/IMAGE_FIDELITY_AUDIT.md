# Image Fidelity Audit

Audit covers every raster displayed above 160 CSS px in either dimension. Ratios use the largest intended desktop display; repeated backgrounds are measured per source tile. Atmospheric full-bleed images are assessed separately from foreground evidence.

| Source file | Source pixels | Displayed max CSS size | Effective pixel ratio | Origin | Rights status | Result | Reason |
|---|---:|---:|---:|---|---|---|---|
| `assets/official/xdj-az-top.webp` | 2560×1544 | 1650×995 substrate | 1.55× | AlphaTheta official | Research only; production clearance none | PASS | Full machine substrate remains sharp at 100%; no foreground enlargement beyond source. |
| `assets/official/xdj-az-angle.webp` | 2560×1578 | 1000×580 | 2.56× | AlphaTheta official | Research only; production clearance none | PASS | CH00 foreground machine exceeds preferred 2× width. |
| `assets/official/djm-a9-hero.png` | 1792×1316 | 1100×807 | 1.63× | Pioneer DJ official | Research only; production clearance none | PASS | CH01–CH03 crops remain materially sharp; certified at 200%. |
| `assets/official/djm-a9-playability.jpg` | 1053×1053 | 535×350 | 1.97× | Pioneer DJ official | Research only; production clearance none | PASS | CH05 detail is restrained and near preferred density. |
| `assets/materials/torn-paper-sheet-v1.png` | 1536×1024 | 990×660 | 1.55× | Generated research material | Research only | PASS | Used as paper/ink texture, not semantic foreground photography. |
| `../../public/images/brand-editorial/hsdj-hero-crowd-behind-mountains-editorial.webp` | 1920×1665 | 778×910 | 1.83× limiting axis | HSDJ project | Project-held | PASS | Primary Patrick hero remains sharp at 100%. |
| `../../public/images/home/home-proof.webp` | 1800×1200 | 1440×1040 background | 1.15× limiting axis | HSDJ project | Project-held | PASS | Accepted only as atmospheric full-bleed substrate; foreground flash use is above 3×. |
| `../../public/images/about/patrick-wedding-conversation.webp` | 1997×2746 | 342×778 | 3.52× limiting axis | HSDJ project | Project-held | PASS | High-density CH01 documentary portrait. |
| `../source-library/04-weddings-documentary/Meghan & Brodie-55 (2).jpg` | 4250×2835 | 550×405 | 7.00× limiting axis | HSDJ source library | Project-held | PASS | High-resolution working photograph supports aggressive CH02/CH04 crops. |
| `../../public/images/weddings/weddings-crowd.webp` | 1600×1067 | 370×300 | 3.56× limiting axis | HSDJ project | Project-held | PASS | CH03 photographic fragment is well above 2×. |
| `../source-library/04-weddings-documentary/Patrick & Hannah.JPEG` | 4032×3024 | 520×420 | 7.20× limiting axis | HSDJ source library | Project-held | PASS | High-resolution documentary photograph supports CH03/CH04 collage crops. |
| `../../public/images/about/patrick-dj-action.webp` | 1000×1734 | 535×760 | 1.87× limiting axis | HSDJ project | Project-held | PASS | CH05 Patrick portrait remains sharp at output size. |
| `../../public/images/stories/sunwolf-riverside-resort-dj.webp` | 1536×1024 | 350×340 | 3.01× limiting axis | HSDJ project | Project-held | PASS | CH06 evidence photograph exceeds 2×. |
| `../../public/images/home/home-hero.webp` | 1800×1200 | 430×405 | 2.96× limiting axis | HSDJ project | Project-held | PASS | CH06 evidence photograph exceeds 2×. |
| `../deconstructed-hardware-design-system-v1/primitives/textures/brushed-panel-texture.png` | 1200×1115 | 820×762 tile | 1.46× limiting axis | Local research system | Research only | PASS | Repeating texture carrier; never a foreground subject. |

## Certification result

- Foreground raster blur at 100%: NONE.
- Required hardware surfaces at 200%: PASS.
- Low-resolution screenshot crops displayed: NONE.
- Static photographed VU conflict: NONE.
