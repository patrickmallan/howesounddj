/**
 * Visual-only “sound identity” for the hero: a soft waveform motif.
 * No audio, no autoplay — artistic hint of musicality only.
 */
export function HeroSoundIdentity() {
  /* Primary: main contour. Back: same phase, gentler amplitude (reads as depth; avoids double-stroke when static). */
  const wavePrimary =
    "M0 18c16-12 32-12 48 0s32 12 48 0 32-12 48 0 32 12 48 0 32-12 48 0 32 12 48 0 32-12 48 0";
  const waveBack =
    "M0 19c16-10 32-10 48 0s32 10 48 0 32-10 48 0 32 10 48 0 32-10 48 0 32 10 48 0 32-10 48 0";
  const waveMid =
    "M0 22c20 8 40 8 60 0s40-8 60 0 40 8 60 0 40-8 60 0 40 8 60 0 40-8 60 0";

  return (
    <div
      className="hero-sound-identity mt-5 max-w-[min(100%,20rem)]"
      aria-hidden
    >
      <svg
        viewBox="0 0 320 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-sound-identity-svg w-full text-amber-300/50"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Back: soft echo — damped contour, thinnest */}
        <g className="hero-sound-wave hero-sound-wave--back">
          <path
            d={waveBack}
            stroke="currentColor"
            strokeWidth="0.55"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        {/* Mid: counter-phase body */}
        <g className="hero-sound-wave hero-sound-wave--mid">
          <path
            d={waveMid}
            stroke="currentColor"
            strokeWidth="0.85"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        {/* Front: clearest line */}
        <g className="hero-sound-wave hero-sound-wave--primary">
          <path
            d={wavePrimary}
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
    </div>
  );
}
