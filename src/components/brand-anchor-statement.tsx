import { HeroSoundIdentity } from "@/components/hero-sound-identity";
import { SectionReveal } from "@/components/motion";

/**
 * Single high-confidence brand anchor, memorable midpoint on the homepage.
 */
export function BrandAnchorStatement() {
  return (
    <SectionReveal
      as="section"
      className="relative overflow-hidden border-y border-white/10 bg-neutral-950"
      aria-labelledby="brand-anchor-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(253,224,71,0.09),transparent_58%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.03),transparent_45%)]" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-28 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/75">
          Howe Sound DJ
        </p>
        <h2
          id="brand-anchor-heading"
          className="mt-6 text-balance text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Packed dance floors.
          <span className="block mt-2 text-amber-200/95 md:mt-3">Every time.</span>
        </h2>
        <HeroSoundIdentity variant="anchor" />
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/45 md:mt-10 md:text-lg">
          Music, room, and crowd, read with intention, not left to chance.
        </p>
      </div>
    </SectionReveal>
  );
}
