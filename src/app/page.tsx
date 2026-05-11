import type { Metadata } from "next";
import Link from "next/link";
import { BrandAnchorStatement } from "@/components/brand-anchor-statement";
import CTADuo from "@/components/cta-duo";
import { HomepageExploreSection } from "@/components/explore-site-links";
import { HeroSoundIdentity } from "@/components/hero-sound-identity";
import { HomepageHeroHeadline } from "@/components/homepage-hero-headline";
import { HomeVideoProof } from "@/components/home-video-proof";
import { ImageSlot } from "@/components/image-slot";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SITE_IMAGE_ALT, SITE_IMAGES } from "@/config/site-images";
import { VENUES } from "@/config/venues";

/**
 * Homepage H1 unified line (premium / Sea-to-Sky aligned).
 * The A/B/C keys remain so the legacy experiment + analytics pipeline keeps working,
 * but every key now resolves to the same canonical headline so no client/mobile variant
 * can fall back to the older party-DJ framing (e.g. "earns the room", "packed every time").
 */
const HOMEPAGE_HEADLINE =
  "Squamish wedding DJ for the Sea-to-Sky, elegant when it matters, wild when it should.";

export const HEADLINE_VARIANTS = {
  A: HOMEPAGE_HEADLINE,
  B: HOMEPAGE_HEADLINE,
  C: HOMEPAGE_HEADLINE,
} as const;

export const metadata: Metadata = {
  title: { absolute: "Howe Sound DJ | Squamish Wedding DJ" },
  description:
    "Squamish wedding DJ for the Sea-to-Sky corridor and beyond: unforgettable experiences, Bangers Only (no autopilot playlists), seamless planning, and real connection. Whistler & Vancouver.",
  openGraph: {
    title: "Howe Sound DJ | Squamish Wedding DJ",
    description:
      "Creating unforgettable wedding experiences in Squamish, Whistler, and the Sea-to-Sky: rooted locally, trusted at top venues, dancefloor-packing tracks.",
    url: "https://www.howesounddj.com",
  },
  alternates: {
    canonical: "https://www.howesounddj.com",
  },
};

export default function HoweSoundDJHomepage() {
  const testimonials = [
    {
      quote:
        "Patrick kept the dance floor packed and the energy high all night long.",
      name: "Vanessa Pocock",
      venue: "Squamish"
    },
    {
      quote:
        "Patrick is incredible. His calm, professional, yet personable communication made our day stress-free.",
      name: "Matthew Bundala",
      venue: "Sea to Sky"
    },
    {
      quote:
        "We would get married all over again just so we could hangout and work with Patrick again. He’s a talented DJ and a truly caring person.",
      name: "Stephen Henry",
      venue: "Whistler"
    }
  ];

  const features = [
    {
      title: "Bangers Only",
      text: "No overplayed wedding fluff, no autopilot playlists: music shaped for your crowd and the room you are actually in."
    },
    {
      title: "Rooted in Squamish",
      text: "Home base in Squamish: the work maps the Sea-to-Sky corridor. Venues, vendors, and how weekends actually move from town to valley to mountain."
    },
    {
      title: "Seamless planning",
      text: "Fast replies, clear communication, and zero guesswork from first message to last song."
    },
    {
      title: "Trusted by local venues",
      text: "Preferred status with many of the region’s most popular venues. The craft earns its place."
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
      q: "Do you travel beyond Squamish?",
      a: "Yes. Sea-to-Sky corridor, Whistler, and Vancouver-area celebrations are part of the same planning map, depending on date and logistics."
    },
    {
      q: "Can you help with the flow of the evening?",
      a: "Yes. DJ support is not just about music. It also includes helping the night feel smooth, well-paced, and stress-reduced."
    }
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.18),transparent_45%)]" />
          <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-20 lg:flex-row lg:items-start lg:gap-16 lg:px-8 lg:py-28">
            <div className="relative z-10 flex min-w-0 flex-col lg:basis-0 lg:flex-1">
              <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
                Squamish Wedding DJ · Sea-to-Sky
              </div>
              <HomepageHeroHeadline headlines={HEADLINE_VARIANTS} />
              <HeroSoundIdentity variant="groove" />
              <div className="mt-6 max-w-xl space-y-4">
                <CTADuo bookSurface="hero" checkSurface="hero" />
                <p className="text-sm leading-relaxed text-white/60">
                  15 minutes &bull; No pressure &bull; Just clarity
                </p>
                <p className="text-sm leading-relaxed text-white/55">
                  If a short call would help, it stays low-key: alignment first, on your timeline.
                </p>
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
                  Squamish-rooted, corridor-wide: polished sound, calm planning, and nights that feel elegant, emotional, or celebratory (often all three, in the order that fits your people).
                </p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300/90">
                    Atmosphere First
                  </div>
                  <div className="mt-2 text-lg font-medium leading-snug text-white">
                    Music with intention. Built around your people.
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

        <SectionReveal as="section" id="why" className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Why Howe Sound DJ</div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Sea-to-Sky passion: connection, craft, and a night that stays with your guests.</h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              It’s not generic wedding filler. It’s deliberate music, local know-how, and flow that respects your setting, from ceremony through the last song.
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
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 lg:px-8 lg:py-24">
            <div className="mb-12 max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Proof</div>
              <h2 id="home-proof-heading" className="mt-4 text-3xl font-semibold sm:text-4xl">
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
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-8">
            <div className="mb-12 max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Reviews</div>
              <h2 id="home-reviews-heading" className="mt-4 text-3xl font-semibold sm:text-4xl">
                In their own words.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                A few voices from Squamish, the corridor, and Whistler. The full set lives on{" "}
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
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-8">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Venue familiarity
              </div>
              <h2 id="home-venues-heading" className="mt-4 text-3xl font-semibold sm:text-4xl">
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
              {VENUES.map((venue) => (
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

        <SectionReveal as="section" id="services" className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Services</div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Support for the full wedding-day experience.</h2>
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
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:px-8">
            <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-neutral-950/60 p-4 sm:p-6 max-lg:[&_figure]:min-w-0 max-lg:[&_figure]:w-full max-lg:[&_figure>div]:!aspect-[2/3]">
              <ImageSlot
                src={SITE_IMAGES.aboutPatrickAction}
                alt={SITE_IMAGE_ALT.aboutPatrickAction}
                aspect="4/5"
                premiumPhotoTreatment
                imageClassName="max-lg:scale-[1.08] max-lg:object-[50%_30%] lg:object-[52%_45%]"
                label="Patrick"
                reservedHint="At the decks or in planning: calm, professional, the presence couples get on the day."
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">About</div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Meet Patrick</h2>
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

        <SectionReveal as="section" id="faq" className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">FAQ</div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Clear answers before you ask.</h2>
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
          className="border-t border-white/10 bg-neutral-950 pb-6 pt-16 md:pb-8 md:pt-24"
          aria-labelledby="home-final-decision-heading"
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mx-auto w-full max-w-3xl atmosphere-grain rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
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
                    15 minutes &bull; No pressure &bull; Just clarity
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
