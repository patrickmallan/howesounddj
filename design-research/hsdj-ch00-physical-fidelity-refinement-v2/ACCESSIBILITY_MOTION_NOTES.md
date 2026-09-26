# Accessibility and Motion Notes

- Navigation uses six semantic links with plain-language destination labels.
- `CHECK YOUR DATE` and `BOOK A CONSULT` remain literal link labels; visitors never need to interpret CUE or Sound Check terminology.
- Keyboard focus uses a high-contrast off-white outline that is distinct from illuminated colour states.
- Performance-pad and CTA links exceed a 44 x 44 CSS-pixel target at desktop and mobile sizes. Their visible skins are photographic crops, while their names remain ordinary text and semantic link labels.
- Decorative controller photography, platter crop, mixer reveal, VU meter and fader architecture are removed from the accessibility tree.
- The Patrick photograph has contextual alternative text naming Patrick, the wedding crowd and Squamish mountains.
- VU activity is explicitly decorative. It uses two correlated but non-identical channels, fast attack, slower decay and rare red peaks.
- Reduced-motion mode produces a stable meter and suppresses transition timing.
- Fader position follows page scroll without scroll-jacking or changing the reading order.
- The prototype loads no framework, remote font, autoplay media, canvas, WebGL or 3D runtime.
