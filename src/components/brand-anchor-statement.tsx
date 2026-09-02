import { HeroSoundIdentity } from "@/components/hero-sound-identity";
import { SectionReveal } from "@/components/motion";

const GENRE_EXAMPLES = [
  "Drum & bass",
  "Tech house",
  "Hip-hop",
  "Disco",
  "Dancehall",
  "Afrobeats",
  "Country",
  "Indie",
  "Throwbacks",
] as const;

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
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-300 sm:text-base sm:tracking-[0.28em]">
          A real DJ set · Built for a wedding
        </p>
        <h2
          id="brand-anchor-heading"
          className="mt-6 text-balance text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Wedding is the format.
          <span className="mt-2 block text-amber-200/95 md:mt-3">The music is yours.</span>
        </h2>
        <HeroSoundIdentity variant="anchor" />
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:mt-10 md:text-lg">
          Versatility is not a backup plan here; it is the point. Want the reception to feel like a nightclub? Do it. Want a left turn into drum &amp; bass or a full tech-house run after dinner? Patrick can take it there. The set is mixed live, shaped around your taste, and adjusted to the room. It is never pulled from a wedding playlist.
        </p>
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5" aria-label="Example music genres">
          {GENRE_EXAMPLES.map((genre) => (
            <span key={genre} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/75">
              {genre}
            </span>
          ))}
          <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-200">
            Your genre here
          </span>
        </div>
      </div>
    </SectionReveal>
  );
}
