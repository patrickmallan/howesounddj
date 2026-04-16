/**
 * Visual-only “sound identity” for the hero: a soft waveform motif.
 * No audio, no autoplay — artistic hint of musicality only.
 *
 * Layering suggests bass-led groove + lighter harmonic motion; motion is 128 BPM–locked in CSS.
 */
type HeroSoundIdentityProps = {
  /**
   * `groove` / `anchor` — four-on-the-floor motion (128 BPM), shared between hero + brand sections.
   * `anchor` only changes layout (narrower, centered under “Every time.”).
   */
  variant?: "default" | "groove" | "anchor";
  className?: string;
};

export function HeroSoundIdentity({
  variant = "default",
  className = "",
}: HeroSoundIdentityProps) {
  /* Primary: main contour. Back: damped parallel (avoids double-stroke when static). Mid: offset body / “harmonics”. */
  const wavePrimary =
    "M0 18c16-12 32-12 48 0s32 12 48 0 32-12 48 0 32 12 48 0 32-12 48 0 32 12 48 0 32-12 48 0";
  const waveBack =
    "M0 19c16-10 32-10 48 0s32 10 48 0 32-10 48 0 32 10 48 0 32-10 48 0 32 10 48 0 32-10 48 0";
  const waveMid =
    "M0 22c20 8 40 8 60 0s40-8 60 0 40 8 60 0 40-8 60 0 40 8 60 0 40-8 60 0";

  const rootClass =
    variant === "anchor"
      ? `hero-sound-identity hero-sound-identity--groove mt-6 max-w-[min(100%,24rem)] mx-auto ${className}`.trim()
      : variant === "groove"
        ? `hero-sound-identity hero-sound-identity--groove mt-5 max-w-[min(100%,28rem)] ${className}`.trim()
        : `hero-sound-identity mt-5 max-w-[min(100%,28rem)] ${className}`.trim();

  return (
    <div className={rootClass} aria-hidden>
      <svg
        viewBox="0 0 320 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-sound-identity-svg w-full text-amber-300/50"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Back: soft echo — damped contour, thinnest */}
        <g className="hero-sound-wave hero-sound-wave--back">
          <g className="hero-sound-flow hero-sound-flow--back">
            <path
              d={waveBack}
              stroke="currentColor"
              strokeWidth="0.7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>
        {/* Mid: counter-phase body */}
        <g className="hero-sound-wave hero-sound-wave--mid">
          <g className="hero-sound-flow hero-sound-flow--mid">
            <path
              d={waveMid}
              stroke="currentColor"
              strokeWidth="1.05"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>
        {/* Front: clearest line */}
        <g className="hero-sound-wave hero-sound-wave--primary">
          <g className="hero-sound-flow hero-sound-flow--primary">
            <path
              d={wavePrimary}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
