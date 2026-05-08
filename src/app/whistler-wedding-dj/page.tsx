import type { Metadata } from "next";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { AuthorityProofStrip } from "@/components/authority-proof-strip";
import { ImageSlot } from "@/components/image-slot";
import { SITE_IMAGE_ALT, SITE_IMAGES } from "@/config/site-images";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { CTA_FINALE_SECTION_TOP } from "@/lib/cta-section-spacing";
import { getWhistlerVenuePages } from "@/config/venue-pages";
import { JsonLd } from "@/components/json-ld";
import { whistlerWeddingDjBreadcrumbJsonLd } from "@/lib/json-ld";

const desc =
  "Planning a Whistler wedding? Howe Sound DJ brings calm sound planning, Sea-to-Sky atmosphere, and elegant high-energy reception flow to mountain weddings in Whistler and beyond.";

export const metadata: Metadata = {
  title: "Whistler Wedding DJ",
  description: desc,
  openGraph: {
    title: "Whistler Wedding DJ | Howe Sound DJ",
    description: desc,
    url: "/whistler-wedding-dj",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whistler Wedding DJ | Howe Sound DJ",
    description: desc,
    images: ["/og-share.jpg"],
  },
  alternates: { canonical: "/whistler-wedding-dj" },
};

export default function WhistlerWeddingDjPage() {
  const whistlerVenues = getWhistlerVenuePages();

  const whyDifferent = [
    {
      title: "Destination guest flow",
      text: "Weekend guests often travel together, arrive on different schedules, and share lodging. Music and announcements work best when they respect that rhythm instead of treating the night like a single local crowd.",
    },
    {
      title: "Mountain weather and logistics",
      text: "Outdoor moments, load-in timing, and backup plans are real. Sound planning should flex with the day, not fight it.",
    },
    {
      title: "Ceremony-to-reception transitions",
      text: "Whistler days can move across spaces and elevations. Clear handoffs between chapters keep guests oriented and emotions connected.",
    },
    {
      title: "Resort and private-venue pacing",
      text: "Ballroom scale and forest sanctuary intimacy both need intentional timing. The arc should match your venue’s character before the dance floor asks for peak energy.",
    },
    {
      title: "Guest momentum",
      text: "Trust builds in small moments: warmth at cocktail hour, clarity in speeches, then celebration when the room is ready. That is how a Whistler reception still feels alive, not forced.",
    },
  ];

  const coupleQuestions = [
    {
      q: "Can you support ceremony and reception sound?",
      a: "Yes. Coverage can run from vows through last dance with one cohesive plan for levels, transitions, and the moments that need to be heard clearly.",
    },
    {
      q: "Do you travel to Whistler?",
      a: "Yes. Whistler and Sea-to-Sky weddings are part of the same corridor map as Squamish-rooted work, with planning that respects mountain timing and travel reality.",
    },
    {
      q: "Can the music feel elegant and high-energy?",
      a: "That is the point of atmosphere-first planning: the early chapters can stay refined while the night still opens into real dance floor momentum when your crowd is ready.",
    },
    {
      q: "How early should we check availability?",
      a: "Popular mountain weekends move. When your date is real, checking availability and having a short consult is the fastest way to reduce uncertainty without pressure.",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <JsonLd data={whistlerWeddingDjBreadcrumbJsonLd()} />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.14),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
              Whistler wedding DJ
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Sea-to-Sky</div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Whistler wedding DJ for elegant mountain celebrations
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              For couples marrying in Whistler who want calm planning, polished sound, and a dance floor that feels alive without feeling forced. Howe Sound DJ works in the Sea-to-Sky wedding atmosphere
              lane: ceremony-to-dance-floor thinking, room-reading, and guest momentum that matches mountain settings.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
              For dance floor philosophy, read{" "}
              <Link
                href="/guides/how-to-keep-a-wedding-dance-floor-packed"
                className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
              >
                How to Keep a Wedding Dance Floor Packed at a Sea-to-Sky Wedding
              </Link>
              .
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="hero" checkSurface="hero" />
              <p className="text-sm leading-relaxed text-white/60">
                15 minutes &bull; No pressure &bull; Just clarity
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Mountain weddings</div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Why Whistler weddings need a different kind of DJ</h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            Whistler is not a generic banquet hall market. Guests are often celebrating a full weekend, the setting does emotional work on its own, and the best receptions respect that story before they
            try to change it.
          </p>
        </div>
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
          {whyDifferent.map((item) => (
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
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">The Atmosphere Arc</div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">The Atmosphere Arc for Whistler weddings</h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-white/70">
              <p>
                The Atmosphere Arc is Howe Sound DJ&apos;s planning lens for how a wedding should feel from arrival through last song. Ceremony sound, cocktail warmth, dinner pacing, speeches, and dance
                floor momentum are treated as one continuous emotional experience, not separate gigs stitched together.
              </p>
              <p>
                In Whistler, that arc matters even more because the landscape already sets tone. Music should support the setting first, then guide guests through the night with transitions that feel
                human, not mechanical. That pairs naturally with the{" "}
                <Link href="/guides/how-to-keep-a-wedding-dance-floor-packed" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                  Roomflow Method
                </Link>
                : earn the room, build recognition before intensity, and keep momentum grounded in your real crowd.
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
            <span className="block text-white/60">Atmosphere-first reception energy, designed to feel elegant before it feels loud.</span>
            <span className="mt-2 block text-xs text-white/40">
              Editorial brand atmosphere, not documentary proof of a specific wedding.
            </span>
          </ImageSlot>
        </div>
      </section>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Venues</div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Whistler venues and nearby Sea-to-Sky settings</h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            These planning guides connect named settings to music, flow, and sound-thinking questions. Open the ones that match your venue search, then use the same{" "}
            <Link href="/contact" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              contact
            </Link>{" "}
            flow as the rest of the site when you are ready.
          </p>
          <p className="mt-4 text-sm leading-7 text-white/55">
            Browse the full{" "}
            <Link href="/venues" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              venue hub
            </Link>{" "}
            for Squamish and corridor properties too.
          </p>
        </div>
        <ul className="mt-10 grid list-none gap-4 sm:grid-cols-2">
          {whistlerVenues.map((v) => (
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
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Questions</div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">What couples usually ask</h2>
          </div>
          <div className="mt-10 space-y-4">
            {coupleQuestions.map((item) => (
              <div key={item.q} className="premium-surface rounded-[1.5rem] border border-white/10 bg-neutral-950/70 p-6">
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        as="section"
        className={`${CTA_FINALE_SECTION_TOP} mx-auto max-w-6xl px-6 pb-24 lg:px-8`}
      >
        <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Next step</div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Plan the Whistler atmosphere you actually want</h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              When the fit feels right, most couples book a short consult, check availability for their date, or both. Proof from past weddings lives on the{" "}
              <Link href="/reviews" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                reviews page
              </Link>
              .
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
              <p className="text-sm leading-relaxed text-white/60">
                15 minutes &bull; No pressure &bull; Just clarity
              </p>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
