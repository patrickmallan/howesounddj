/**
 * Visual-only “sound identity” for the hero: a soft waveform motif.
 * No audio, no autoplay — artistic hint of musicality only.
 */
export function HeroSoundIdentity() {
  return (
    <div
      className="hero-sound-identity mt-5 max-w-[min(100%,20rem)]"
      aria-hidden
    >
      <svg
        viewBox="0 0 320 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-sound-identity-svg w-full text-amber-300/40"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M0 18c16-12 32-12 48 0s32 12 48 0 32-12 48 0 32 12 48 0 32-12 48 0 32 12 48 0 32-12 48 0"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0 22c20 8 40 8 60 0s40-8 60 0 40 8 60 0 40-8 60 0 40 8 60 0 40-8 60 0"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.45"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
