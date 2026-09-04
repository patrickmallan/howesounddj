import type { Metadata } from "next";
import Link from "next/link";
import { HOMEPAGE_FEATURED_REVIEW_IDS, getReviewById } from "@/config/reviews";
import { HOMEPAGE_TITLE, SITE_ORIGIN } from "@/config/site-brand";
import { BrandAnchorStatement } from "@/components/brand-anchor-statement";
import { JsonLd } from "@/components/json-ld";
import CTADuo from "@/components/cta-duo";
import { HomepageExploreSection } from "@/components/explore-site-links";
import { HeroSoundIdentity } from "@/components/hero-sound-identity";
import { HomepageHeroHeadline } from "@/components/homepage-hero-headline";
import { HomeVideoProof } from "@/components/home-video-proof";
import { ImageSlot } from "@/components/image-slot";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SITE_IMAGE_ALT, SITE_IMAGES } from "@/config/site-images";
import { VENUES } from "@/config/venues";
import { websiteJsonLd } from "@/lib/json-ld";
import { getGoogleRatingSummary } from "@/lib/google-rating";
import {
  EYEBROW_TO_HEADING,
  HOMEPAGE_FINALE_SECTION,
  HOMEPAGE_HERO_PADDING,
  MEDIA_CARD_PAD,
  MEDIA_COPY_GRID_GAP,
  PAGE_GUTTER_X,
  SECTION_BAND_BORDER_FOLLOW,
  SECTION_BAND_BORDER_TOP,
  SECTION_BAND_BORDER_Y,
  SECTION_BAND_TOP,
  SECTION_BAND_Y,
  SECTION_SHELL,
  SECTION_TRANSITION_IN,
  SECTION_TRANSITION_OUT,
} from "@/lib/cta-section-spacing";

/**
 * Homepage H1 unified line. The eyebrow carries service and geography while the
 * headline sells the outcome couples actually want. A/B/C remain only so the
 * existing experiment and analytics pipeline stay compatible.
 */
const HOMEPAGE_HEADLINE =
  "A packed dance floor that still feels like your wedding.";

const HEADLINE_VARIANTS = {
  A: HOMEPAGE_HEADLINE,
  B: HOMEPAGE_HEADLINE,
  C: HOMEPAGE_HEADLINE,
} as const;

export const metadata: Metadata = {
  title: { absolute: HOMEPAGE_TITLE },
  description:
    "Versatile Squamish wedding DJ mixing drum & bass, tech house, hip-hop, disco, country and everything between. Your taste, mixed live.",
  openGraph: {
    title: HOMEPAGE_TITLE,
    description:
      "Wedding is the format; the music is yours. Open-format DJing, local venue knowledge, and a Squamish dance floor built around your people.",
    url: `${SITE_ORIGIN}/`,
  },
  twitter: {
    title: HOMEPAGE_TITLE,
    description:
      "Versatile Squamish wedding DJ mixing drum & bass, tech house, hip-hop, disco, country and everything between. Your taste, mixed live.",
  },
  alternates: {
    canonical: `${SITE_ORIGIN}/`,
  },
};

const HOMEPAGE_REVIEW_VENUES: Record<(typeof HOMEPAGE_FEATURED_REVIEW_IDS)[number], string> = {
  "vanessa-pocock": "Squamish",
  "natasha-beaudry": "Squamish",
  "matthew-bundala": "Sea to Sky",
};

export default async function HoweSoundDJHomepage() {
  const googleRating = await getGoogleRatingSummary();
  const testimonials = HOMEPAGE_FEATURED_REVIEW_IDS.map((id) => {
    const review = getReviewById(id);
    if (!review) throw new Error(`Missing homepage review: ${id}`);
    return {
      quote: review.quote,
      name: review.reviewerName,
      venue: HOMEPAGE_REVIEW_VENUES[id],
    };
  });

  const features = [
    {
      title: "A real DJ set, not wedding autopilot",
      text: "Drum & bass, tech house, hip-hop, disco, country, throwbacks, or a night that moves through all of it. Your taste sets the brief."
    },
    {
      title: "Rooted in Squamish",
      text: "Home base in Squamish, with local knowledge of the venues, vendors, access, sound, and timing that shape weddings here."
    },
    {
      title: "Seamless planning",
      text: "Fast replies, clear communication, and zero guesswork from first message to last song."
    },
    {
      title: "Experienced at local venues",
      text: "Familiarity with Sea-to-Sky spaces means fewer day-of unknowns around access, audio, timing, and guest flow."
    },
    {
      title: "Client backed",
      text: "Real couples, real parties, real reviews. The results speak for themselves."
    },
    {
      title: "Connection",
      text: "Real connection creates real results. You’re not just another booking."
    }
  ];

  const services = [
    "Ceremony audio",
    "Cocktail hour + dinner music",
    "Reception DJing",
    "MC support",
    "Timeline coordination",
    "Music planning guidance"
  ];

  const faqs = [
    {
      q: "Can we request songs and create a do-not-play list?",
      a: "Yes. The planning process is designed to help shape the soundtrack around your taste while protecting the energy of the room."
    },
    {
      q: "Do you provide ceremony audio and microphones?",
      a: "Yes. Ceremony coverage can include speaker setup and microphones for the officiant, vows, and key announcements."
    },
    {
      q: "Can our wedding actually sound like a club night?",
      a: "Absolutely. Wedding is the event format, not a genre. If you want drum & bass, tech house, hip-hop, disco, dancehall, country, or an open-format journey across all of it, the music direction starts there."
    },
    {
      q: "Can you help with the flow of the evening?",
      a: "Yes. DJ support is not just about music. It also includes helping the night feel smooth, well-paced, and stress-reduced."
    }
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
        <JsonLd data={websiteJsonLd()} />
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.18),transparent_45%)]" />
          <div
            data-testid="home-hero-inner"
            className={`mx-auto flex max-w-6xl flex-col gap-12 ${PAGE_GUTTER_X} ${HOMEPAGE_HERO_PADDING} lg:flex-row lg:items-center lg:gap-16`}
          >
            <div className="relative z-10 flex min-w-0 flex-col lg:basis-0 lg:flex-1">
              <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
                Squamish Wedding DJ · Local by design
              </div>
              <HomepageHeroHeadline headlines={HEADLINE_VARIANTS} />
              <HeroSoundIdentity variant="groove" />
              <div className="mt-6 max-w-xl space-y-4">
                <CTADuo bookSurface="hero" checkSurface="hero" />
                <p className="text-sm leading-relaxed text-white/60">
                  45 minutes &bull; No pressure &bull; Just clarity
                </p>
                <p className="text-sm leading-relaxed text-white/55">
                  If a short call would help, it stays low-key: alignment first, on your timeline.
                </p>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Howe Sound DJ trust signals">
                <a
                  href={googleRating.googleMapsUri}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${googleRating.rating.toFixed(1)} rating from ${googleRating.reviewCount} reviews on Google Maps`}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-amber-300/30 hover:bg-white/[0.07]"
                >
                  <div className="text-sm font-semibold text-white">
                    {googleRating.rating.toFixed(1)} <span className="font-normal" translate="no">Google Maps</span> rating
                  </div>
                  <div className="mt-1 text-xs leading-5 text-white/50">
                    {googleRating.reviewCount} {googleRating.reviewCount === 1 ? "review" : "reviews"}
                  </div>
                </a>
                {[
                  ["15+ years", "Music & live events"],
                  ["Squamish based", "Squamish weddings"],
                ].map(([value, label]) => (
                  <div key={value} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-sm font-semibold text-white">{value}</div>
                    <div className="mt-1 text-xs leading-5 text-white/50">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex w-full min-w-0 flex-col lg:basis-0 lg:flex-1">
              <div className="atmosphere-grain flex w-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30">
                <div className="w-full [&_figure]:m-0 [&_figure]:space-y-0 [&_figure>div]:rounded-2xl max-lg:[&_figure>div]:!aspect-[7/6] lg:[&_figure>div]:!aspect-auto lg:[&_figure>div]:!h-[420px]">
                  <ImageSlot
                    src={SITE_IMAGES.brandEditorialHeroDjGlow}
                    alt={SITE_IMAGE_ALT.brandEditorialHeroDjGlow}
                    aspect="4/3"
                    label="Atmosphere"
                    reservedHint="Editorial reception atmosphere, the first impression of the night you are planning."
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="!m-0 !space-y-0"
                    imageClassName="object-[center_55%] lg:object-[center_32%]"
                  />
                </div>
                <p className="mt-4 text-lg leading-8 text-white/70">
                  Squamish-rooted and venue-ready: polished sound, calm planning, and a dance floor shaped around the people you actually invited.
                </p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300/90">
                    Atmosphere First
                  </div>
                  <div className="mt-2 text-lg font-medium leading-snug text-white">
                    Want the night to finish with club energy? From house to drum &amp; bass, we can take it there too.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionReveal>
          <HomeVideoProof />
        </SectionReveal>

        <BrandAnchorStatement />

        <SectionReveal as="section" id="why" className={`${SECTION_SHELL} ${PAGE_GUTTER_X} ${SECTION_BAND_Y}`}>
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">The local advantage</div>
            <h2 className={`${EYEBROW_TO_HEADING} text-3xl font-semibold sm:text-4xl`}>Your wedding is here. Your DJ is too.</h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Squamish weddings come with real logistics: changing weather, venue access, separate ceremony spaces, sound constraints, and tight timelines. Patrick lives here, knows the local landscape, and stays personally involved from the first conversation to the last song.
            </p>
          </div>
          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="premium-surface h-full rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{feature.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </SectionReveal>

        <SectionReveal
          as="section"
          className="border-y border-white/10 bg-neutral-950"
          aria-labelledby="home-proof-heading"
        >
          <div className={`${SECTION_SHELL} ${PAGE_GUTTER_X} ${SECTION_BAND_BORDER_Y}`}>
            <div className="mb-12 max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Proof</div>
              <h2 id="home-proof-heading" className={`${EYEBROW_TO_HEADING} text-3xl font-semibold sm:text-4xl`}>
                The kind of night guests talk about after.
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                One frame for the atmosphere: the floor, the room, or the Sea-to-Sky setting you chose. Held with intention, not volume for its own sake.
              </p>
            </div>
            <ImageSlot
              src={SITE_IMAGES.homeProof}
              alt={SITE_IMAGE_ALT.homeProof}
              aspect="16/9"
              imageClassName="object-[center_41%]"
              label="The corridor"
              reservedHint="Mountain backdrop, tent line, or full room. Sea-to-Sky weddings in one frame."
              sizes="(max-width: 1024px) 100vw, 72rem"
            />
          </div>
        </SectionReveal>

        <SectionReveal as="section" id="reviews" className="border-y border-white/10 bg-white/5" aria-labelledby="home-reviews-heading">
          <div className={`${SECTION_SHELL} ${PAGE_GUTTER_X} ${SECTION_BAND_BORDER_Y}`}>
            <div className="mb-12 max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Reviews</div>
              <h2 id="home-reviews-heading" className={`${EYEBROW_TO_HEADING} text-3xl font-semibold sm:text-4xl`}>
                In their own words.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                A few voices from real couples and real celebrations. The full set lives on{" "}
                <Link href="/reviews" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                  reviews
                </Link>
                .
              </p>
            </div>
            <StaggerGroup className="mt-10 grid gap-6 lg:grid-cols-3">
              {testimonials.map((item) => (
                <StaggerItem key={item.name}>
                  <div className="premium-surface h-full rounded-[1.75rem] border border-white/10 bg-neutral-950/70 p-6">
                    <p className="text-base leading-8 text-white/80">“{item.quote}”</p>
                    <div className="mt-6 text-sm text-white/50">
                      {item.name} • {item.venue}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </SectionReveal>

        <SectionReveal
          as="section"
          id="venues"
          className="border-t border-white/10 bg-neutral-950"
          aria-labelledby="home-venues-heading"
        >
          <div
            data-testid="home-venues-band"
            className={`${SECTION_SHELL} ${PAGE_GUTTER_X} ${SECTION_BAND_BORDER_TOP} ${SECTION_TRANSITION_OUT}`}
          >
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Venue familiarity
              </div>
              <h2 id="home-venues-heading" className={`${EYEBROW_TO_HEADING} text-3xl font-semibold sm:text-4xl`}>
                Venues we’ve worked at across Squamish & Sea-to-Sky
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                From mountaintop receptions to brewery celebrations and restored local spaces: settings where sound, pacing, and guest flow need to match the landscape, not fight it.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/50">
                <Link href="/venues" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                  Browse wedding venue guides
                </Link>{" "}
                for planning-focused context on music, flow, and Sea-to-Sky logistics. For a Squamish-first planning read, see the{" "}
                <Link href="/squamish-wedding-dj" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                  Squamish wedding DJ
                </Link>{" "}
                pillar. Then check availability when you are ready.
              </p>
            </div>
            <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {VENUES.slice(0, 6).map((venue) => (
                <StaggerItem key={venue.name}>
                  <article className="premium-surface flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                    <h3 className="text-xl font-semibold leading-snug text-white">
                      <Link
                        href={`/venues/${venue.slug}`}
                        className="rounded-md text-white transition hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                      >
                        {venue.name}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/65">{venue.description}</p>
                    <p className="mt-4 text-xs text-white/40">
                      <a
                        href={venue.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-300/80 transition hover:text-amber-200"
                      >
                        Official website<span className="sr-only"> (opens in new tab)</span> →
                      </a>
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </SectionReveal>

        <SectionReveal
          as="section"
          id="services"
          data-testid="home-services-section"
          className={`${SECTION_SHELL} ${PAGE_GUTTER_X} ${SECTION_TRANSITION_IN} ${SECTION_TRANSITION_OUT}`}
        >
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div
                data-testid="home-services-eyebrow"
                className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300"
              >
                Services
              </div>
              <h2 className={`${EYEBROW_TO_HEADING} text-3xl font-semibold sm:text-4xl`}>Support for the full wedding-day experience.</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
                From ceremony through reception, the service is designed to help the day sound right, feel smooth, and stay aligned with the vibe you want.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {services.map((service) => (
                  <div key={service} className="premium-surface rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/80">
                    {service}
                  </div>
                ))}
              </div>
            </div>
            <div className="premium-surface rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Planning process</div>
              <div className="mt-8 space-y-6">
                {[
                  ["01", "Intro call", "Connect on your wedding, your music, and what matters most."],
                  ["02", "Planning", "Work through key moments, must-plays, do-not-plays, and logistics."],
                  ["03", "Final coordination", "Confirm the timeline, venue details, and execution plan."],
                  ["04", "Wedding day", "Deliver polished audio support and a reception people remember."]
                ].map(([num, title, text]) => (
                  <div key={num} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-300 font-semibold text-neutral-950">
                      {num}
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">{title}</div>
                      <div className="mt-1 text-sm leading-7 text-white/65">{text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal as="section" id="about" className="border-y border-white/10 bg-white/5">
          <div
            data-testid="home-about-grid"
            className={`${SECTION_SHELL} grid items-center ${PAGE_GUTTER_X} ${SECTION_BAND_BORDER_FOLLOW} ${MEDIA_COPY_GRID_GAP} lg:grid-cols-2`}
          >
            <div
              data-testid="home-patrick-portrait"
              className={`hsdj-home-patrick-card atmosphere-grain rounded-[2rem] border border-white/10 bg-neutral-950/60 ${MEDIA_CARD_PAD} max-lg:[&_figure]:min-w-0 max-lg:[&_figure]:w-full max-lg:[&_figure>div]:!aspect-[3/4]`}
            >
              <ImageSlot
                src={SITE_IMAGES.aboutPatrickAction}
                alt={SITE_IMAGE_ALT.aboutPatrickAction}
                aspect="4/5"
                premiumPhotoTreatment
                imageClassName="max-lg:object-[44%_28%] lg:object-[52%_45%]"
                label="Patrick"
                reservedHint="At the decks or in planning: calm, professional, the presence couples get on the day."
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="!m-0 !space-y-0"
              />
            </div>
            <div data-testid="home-about-copy" className="flex flex-col justify-center">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">About</div>
              <h2 className={`${EYEBROW_TO_HEADING} text-3xl font-semibold sm:text-4xl`}>Meet Patrick</h2>
              <p className="mt-5 text-lg leading-8 text-white/70">
                Weddings are the focus, not cookie-cutter DJing. The approach is simple: show up prepared, read the room, and treat your wedding like it matters, because it does.
              </p>
              <p className="mt-4 text-lg leading-8 text-white/70">
                Rooted in Squamish with an ear for atmosphere and calm, professional planning support, Patrick helps you feel covered before the day and free to enjoy it when the music hits.
              </p>
              <p className="mt-8 text-sm leading-relaxed text-white/50">
                <Link
                  href="/about"
                  className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
                >
                  Full story on About
                </Link>
                <span className="mx-2 text-white/25" aria-hidden>
                  ·
                </span>
                <Link
                  href="/contact"
                  className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
                >
                  Contact when you are ready
                </Link>
              </p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal
          as="section"
          id="faq"
          data-testid="home-faq-section"
          className={`${SECTION_SHELL} ${PAGE_GUTTER_X} ${SECTION_BAND_TOP} ${SECTION_TRANSITION_OUT}`}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">FAQ</div>
              <h2 className={`${EYEBROW_TO_HEADING} text-3xl font-semibold sm:text-4xl`}>Clear answers before you ask.</h2>
            </div>
            <a href="/faq" className="motion-interactive shrink-0 text-sm font-semibold text-amber-300 hover:text-amber-200">
              Full FAQ →
            </a>
          </div>
          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="premium-surface rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-white/65">{item.a}</p>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal
          as="section"
          data-testid="home-finale-section"
          className={HOMEPAGE_FINALE_SECTION}
          aria-labelledby="home-final-decision-heading"
        >
          <div className={`${SECTION_SHELL} ${PAGE_GUTTER_X}`}>
            <div
              data-testid="home-finale-well"
              className="mx-auto w-full max-w-3xl atmosphere-grain rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12"
            >
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300/95 sm:text-xs sm:tracking-[0.2em]">
                  Ready when you are
                </p>
                <h2
                  id="home-final-decision-heading"
                  className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
                >
                  Let&apos;s talk about your wedding.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg sm:leading-8">
                  Share your date, venue, and what you want the night to feel like. I&apos;ll help you understand
                  availability, timing, and the best next step.
                </p>
                <div className="mt-8 mx-auto max-w-xl space-y-4">
                  <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
                  <p className="text-sm leading-relaxed text-white/60">
                    45 minutes &bull; No pressure &bull; Just clarity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        <HomepageExploreSection />
    </main>
  );
}
