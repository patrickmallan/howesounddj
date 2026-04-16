import type { Metadata } from "next";
import Link from "next/link";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import { HomepageHeroHeadline } from "@/components/homepage-hero-headline";
import { HomeVideoProof } from "@/components/home-video-proof";
import { ImageSlot } from "@/components/image-slot";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SITE_IMAGE_ALT, SITE_IMAGES } from "@/config/site-images";
import { VENUES } from "@/config/venues";

/** Homepage H1 A/B/C — all include “Squamish wedding DJ” + “Sea to Sky”. Server HTML uses A; client may swap after resolve. */
export const HEADLINE_VARIANTS = {
  A: "Squamish wedding DJ for the Sea to Sky, packed dance floors every time.",
  B: "Squamish wedding DJ for the Sea to Sky, high energy dance floors.",
  C: "Squamish wedding DJ for the Sea to Sky, the right music at the right moment.",
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
      text: "No overplayed wedding fluff, no autopilot playlists, just dancefloor-packing tracks."
    },
    {
      title: "Rooted in Squamish",
      text: "Local life: I know the venues, the vendors, and the vibe across the Sea-to-Sky corridor."
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
      a: "Yes. Weddings in Whistler, Vancouver, and across the Sea-to-Sky corridor can be accommodated depending on date and logistics."
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
          <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div className="relative z-10">
              <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
                Squamish Wedding DJ · Sea-to-Sky
              </div>
              <HomepageHeroHeadline headlines={HEADLINE_VARIANTS} />
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
                Serving Squamish, Whistler, Vancouver, and the corridor with passion: polished sound, seamless planning, and nights that feel elegant, emotional, or wild (often all three).
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <CheckAvailabilityTrackedLink
                  surface="hero"
                  className="rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
                />
                <a
                  href="/reviews"
                  className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  Read Reviews
                </a>
                <a
                  href="/packages"
                  className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  View Packages
                </a>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/45">
                <a href="/weddings" className="text-white/55 transition hover:text-amber-200/90">
                  Wedding DJ services
                </a>
                <span className="mx-2.5 text-white/20" aria-hidden="true">
                  ·
                </span>
                <a href="/about" className="text-white/55 transition hover:text-amber-200/90">
                  About Patrick
                </a>
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/45">
                <span className="text-white/35">Live in Vancouver but marrying in Squamish or along the Sea-to-Sky?</span>{" "}
                <a href="/vancouver-wedding-dj" className="text-white/55 transition hover:text-amber-200/90">
                  Read how local fit works for your wedding →
                </a>
              </p>
              <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 text-sm text-white/70 sm:mt-9 sm:grid-cols-3 sm:gap-4">
                <div className="premium-surface rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xl font-semibold text-white">Bangers Only</div>
                  <div className="mt-1">No fluff, no autopilot, packed floors</div>
                </div>
                <div className="premium-surface rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xl font-semibold text-white">Rooted here</div>
                  <div className="mt-1">Squamish: venues, vendors, vibe</div>
                </div>
                <div className="premium-surface rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xl font-semibold text-white">Real connection</div>
                  <div className="mt-1">You’re not just another booking</div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30">
                <ImageSlot
                  src={SITE_IMAGES.homeHero}
                  alt={SITE_IMAGE_ALT.homeHero}
                  aspect="4/5"
                  imageClassName="object-[center_34%]"
                  label="Reception"
                  reservedHint="Dance floor energy, your venue, or the room ready for the party. The first impression of the night you are planning."
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm text-white/60">A True Experience</div>
                  <div className="mt-2 text-lg font-medium text-white">
                    Your story, your crowd, a reason to stay on the floor.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionReveal>
          <HomeVideoProof />
        </SectionReveal>

        <SectionReveal as="section" id="why" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Why Howe Sound DJ</div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Sea-to-Sky passion: connection, craft, and packed floors.</h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              It’s not generic wedding filler. It’s deliberate music, local know-how, and a night that moves with your people, from ceremony through the last song.
            </p>
          </div>
          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <div className="mb-10 max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Proof</div>
              <h2 id="home-proof-heading" className="mt-4 text-3xl font-semibold sm:text-4xl">
                The kind of night guests talk about after.
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                A wide shot that shows the energy Howe Sound DJ builds: the floor, the room, or the Sea-to-Sky setting around you.
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

        <SectionReveal as="section" id="reviews" className="border-y border-white/10 bg-white/5">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Reviews</div>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Client backed: real couples, real parties.</h2>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a href="/reviews" className="motion-interactive text-sm font-semibold text-amber-300 hover:text-amber-200">
                  All reviews →
                </a>
                <CheckAvailabilityTrackedLink
                  surface="inline"
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                />
              </div>
            </div>
            <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-3">
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
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Venue familiarity
              </div>
              <h2 id="home-venues-heading" className="mt-4 text-3xl font-semibold sm:text-4xl">
                Venues we’ve worked at across Squamish & Sea-to-Sky
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                From mountaintop receptions to brewery celebrations and restored local spaces, these are some of the
                venues and businesses where Howe Sound DJ has helped shape wedding days and packed dance floors.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/50">
                <Link href="/venues" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                  Browse wedding venue guides
                </Link>{" "}
                for planning-focused context on music, flow, and Sea-to-Sky logistics—then check availability when you are ready.
              </p>
            </div>
            <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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

        <SectionReveal as="section" id="services" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
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
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">
            <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-neutral-950/60 p-6">
              <ImageSlot
                src={SITE_IMAGES.homeAboutPreview}
                alt={SITE_IMAGE_ALT.homeAboutPreview}
                aspect="4/5"
                imageClassName="object-[center_30%]"
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
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <CheckAvailabilityTrackedLink
                  surface="page_cta"
                  className="rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
                />
                <a
                  href="/about"
                  className="motion-interactive rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  Learn More About Patrick
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal as="section" id="faq" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
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

        <SectionReveal as="section" id="contact" className="border-t border-white/10 bg-gradient-to-b from-amber-300/10 to-transparent">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
            <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 lg:p-12">
              <div className="mx-auto w-full max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Contact</div>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Let’s talk about your wedding.</h2>
                <p className="mt-4 max-w-xl text-lg leading-8 text-white/70">
                  Reach out with your date, venue, and wedding vision. The goal is to make the process feel simple, clear, and straightforward from the start, starting with a consultation when the fit makes sense.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
                  The contact page is where you check availability and share your wedding details: date, venue, and how you want the night to feel.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <CheckAvailabilityTrackedLink
                    href="/contact#availability"
                    surface="page_cta"
                    className="inline-flex rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
                  />
                  <a
                    href="/weddings"
                    className="motion-interactive inline-flex rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                  >
                    Wedding services
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
    </main>
  );
}
