import type { Metadata } from "next";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { AuthorityProofStrip } from "@/components/authority-proof-strip";
import { ImageSlot } from "@/components/image-slot";
import { SITE_IMAGE_ALT, SITE_IMAGES } from "@/config/site-images";
import { VENUE_PAGES } from "@/config/venue-pages";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { CTA_FINALE_SECTION_TOP } from "@/lib/cta-section-spacing";
import { JsonLd } from "@/components/json-ld";
import { squamishWeddingDjBreadcrumbJsonLd } from "@/lib/json-ld";

const desc =
  "Squamish wedding DJ for Sea-to-Sky celebrations: corridor-native sound, cinematic reception energy, and dance floors built for mountain weddings—from ceremony to last song.";

export const metadata: Metadata = {
  title: "Squamish Wedding DJ | Mountain Dance Floors That Stay Packed",
  description: desc,
  openGraph: {
    title: "Squamish Wedding DJ | Mountain Dance Floors That Stay Packed",
    description: desc,
    url: "/squamish-wedding-dj",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Squamish Wedding DJ | Mountain Dance Floors That Stay Packed",
    description: desc,
    images: ["/og-share.jpg"],
  },
  alternates: { canonical: "/squamish-wedding-dj" },
};

const PILLAR_VENUE_SLUGS = new Set([
  ...VENUE_PAGES.filter((v) => v.area === "squamish").map((v) => v.slug),
  "sea-to-sky-gondola",
  "sunwolf",
]);

export default function SquamishWeddingDjPage() {
  const pillarVenues = [...VENUE_PAGES]
    .filter((v) => PILLAR_VENUE_SLUGS.has(v.slug))
    .sort((a, b) => a.name.localeCompare(b.name));

  const whyLocal = [
    {
      title: "Less travel friction",
      text: "When your DJ is already on the corridor map, routing, timing, and day-of flexibility tend to be simpler. You are not stacking mountain logistics on top of a long inbound commute that has to work perfectly once.",
    },
    {
      title: "Venue shapes you can plan for",
      text: "Squamish runs from breweries and downtown rooms to valley farms and forest-lake weekends. Familiarity with how those spaces breathe, where speeches land, and how guests move helps the night feel intentional rather than improvised at the last minute.",
    },
    {
      title: "Mountain-adjacent reality",
      text: "Light, weather, and outdoor-adjacent moments can shift the schedule. Sound and pacing work best when they are built to flex with the day instead of treating it like a downtown ballroom template.",
    },
    {
      title: "Planning confidence",
      text: "Clear communication and a calm run-of-show reduce the mental load you carry in the final weeks. The goal is fewer unknowns about how audio, transitions, and crowd energy will behave in this place.",
    },
    {
      title: "How Squamish weddings tend to move",
      text: "Weekend guests, corridor traffic, and mixed local-and-travel crowds change the emotional rhythm. Music and hosting land better when they match that flow rather than rushing a generic city-wedding arc.",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <JsonLd data={squamishWeddingDjBreadcrumbJsonLd()} />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.14),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
              Squamish wedding DJ
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Squamish home base · Sea-to-Sky wedding specialist</div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Squamish wedding DJ for celebrations that build to an unforgettable dance floor</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Howe Sound DJ is Squamish-rooted: a calm planning partner for couples marrying in the mountains, whether you live here or are bringing guests into the corridor. The through-line is
              cinematic reception energy—ceremony clarity, cocktail warmth, and a dance floor your people actually stay on—built with corridor-native sound and pacing, not a generic city-wedding template.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
              For the full service breakdown, see{" "}
              <Link href="/weddings" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                Sea-to-Sky wedding DJ services
              </Link>
              . For editorial dance floor proof from real corridor celebrations, read{" "}
              <Link href="/stories" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                Sea-to-Sky wedding stories
              </Link>
              . Venue-specific questions map to the{" "}
              <Link href="/venues" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                venue guides
              </Link>
              .
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="hero" checkSurface="hero" />
              <p className="text-sm leading-relaxed text-white/60">15 minutes &bull; No pressure &bull; Just clarity</p>
            </div>
          </div>
        </div>
      </section>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Why local matters</div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Squamish weddings reward a DJ who already reads this corridor</h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            “Local” here is operational, not decorative. It is about fewer moving parts on the day, and music planning that respects how Sea-to-Sky celebrations actually unfold.
          </p>
        </div>
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
          {whyLocal.map((item) => (
            <StaggerItem key={item.title}>
              <div className="premium-surface h-full rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionReveal>

      <SectionReveal as="section" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">From Vancouver</div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">When your wedding is in Squamish, the setting is part of the brief</h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-white/70">
              <p>
                Many couples plan from Vancouver and host in Squamish. That is a normal Sea-to-Sky pattern. You do not need to default to importing a city vendor simply because your search started there.
                The question is who understands load-in, guest travel, and mountain-weekend pacing before the contract is signed.
              </p>
              <p>
                Hiring someone who specializes in this corridor is a practical choice: the same care for music and hosting, framed for the place where your guests will actually stand, toast, and dance.
                If you want the planning-from-Vancouver lens explicitly, the{" "}
                <Link href="/vancouver-wedding-dj" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                  Vancouver couples page
                </Link>{" "}
                walks through that path in more detail.
              </p>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Venues</div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Squamish and nearby Sea-to-Sky settings on the planning map</h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            These guides tie named properties to flow, sound-thinking, and reception pacing. They are planning tools, not claims about exclusivity. Browse the full{" "}
            <Link href="/venues" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              venue hub
            </Link>{" "}
            for Whistler and corridor pages too.
          </p>
        </div>
        <ul className="mt-10 grid list-none gap-4 sm:grid-cols-2">
          {pillarVenues.map((v) => (
            <li key={v.slug}>
              <Link
                href={`/venues/${v.slug}`}
                className="premium-surface flex flex-col rounded-[1.25rem] border border-white/10 bg-white/5 p-5 transition hover:border-amber-300/25 hover:bg-white/[0.07]"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/85">{v.locationLabel}</span>
                <span className="mt-2 text-base font-semibold text-white">{v.name}</span>
                <span className="mt-2 text-sm text-white/55">{v.venueType}</span>
              </Link>
            </li>
          ))}
        </ul>
      </SectionReveal>

      <SectionReveal as="section" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Atmosphere Arc · Roomflow</div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Local expertise expressed as one continuous evening</h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-white/70">
              <p>
                The Atmosphere Arc is the planning lens for how your wedding should feel from arrival through last song: ceremony clarity, cocktail warmth, dinner and speeches, then celebration when the
                room is ready. In Squamish, the landscape often does part of that emotional work; the soundtrack should support it instead of racing past it.
              </p>
              <p>
                The Roomflow Method is the dance-floor side of the same idea: build recognition and trust before intensity, then let momentum come from your real crowd. For a longer read, see{" "}
                <Link
                  href="/guides/how-to-keep-a-wedding-dance-floor-packed"
                  className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
                >
                  How to Keep a Wedding Dance Floor Packed at a Sea-to-Sky Wedding
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </SectionReveal>

      <AuthorityProofStrip />

      <section className="border-y border-white/10 bg-neutral-950">
        <div className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
          <ImageSlot
            src={SITE_IMAGES.brandEditorialPremiumDjCrowd}
            alt={SITE_IMAGE_ALT.brandEditorialPremiumDjCrowd}
            aspect="16/9"
            label="Editorial atmosphere"
            reservedHint="Brand atmosphere imagery."
            sizes="(max-width: 1024px) 100vw, 56rem"
            imageClassName="object-[center_45%]"
            premiumPhotoTreatment
          >
            <span className="block text-white/60">Reception energy planned to feel elegant before it feels loud.</span>
            <span className="mt-2 block text-xs text-white/40">Editorial brand atmosphere, not documentary proof of a specific wedding.</span>
          </ImageSlot>
        </div>
      </section>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Related planning</div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Go deeper when you are ready</h2>
          <ul className="mt-8 list-none space-y-4 text-lg leading-8 text-white/70">
            <li>
              <Link href="/guides" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                Wedding Planning Guides
              </Link>
              , including how to choose a DJ in Squamish and Sea-to-Sky dance-floor pacing.
            </li>
            <li>
              <Link href="/stories" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                Sea-to-Sky wedding stories
              </Link>
              for editorial proof on corridor dance floor energy (not invented recaps).
            </li>
            <li>
              <Link href="/whistler-wedding-dj" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                Whistler wedding DJ
              </Link>
              , when your day lives further up the highway and needs destination-weekend framing.
            </li>
            <li>
              <Link href="/vancouver-wedding-dj" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                Vancouver couples · Sea-to-Sky weddings
              </Link>
              , when your inbox is in the city but the event is not.
            </li>
          </ul>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className={`${CTA_FINALE_SECTION_TOP} mx-auto max-w-6xl px-6 pb-24 lg:px-8`}>
        <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">When it feels right</div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">A short conversation, on your timeline</h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              If Squamish is where you are marrying, start with whatever reduces uncertainty first: a consult to align on vibe and flow, a calendar check for your date, or both. Couple voices in their own
              words stay on the{" "}
              <Link href="/reviews" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                reviews page
              </Link>
              .
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
              <p className="text-sm leading-relaxed text-white/60">15 minutes &bull; No pressure &bull; Just clarity</p>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
