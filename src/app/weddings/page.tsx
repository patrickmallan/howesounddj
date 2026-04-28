import type { Metadata } from "next";
import Link from "next/link";
import {
  BookConsultTrackedLink,
  bookConsultOutlineButtonClassName,
  bookConsultPrimaryButtonClassName,
} from "@/components/book-consult-tracked-link";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import { ImageSlot } from "@/components/image-slot";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SITE_IMAGE_ALT, SITE_IMAGES } from "@/config/site-images";

export const metadata: Metadata = {
  title: "Squamish Wedding DJ Services",
  description:
    "Personalized wedding DJ for Squamish & the corridor: musical tastes to atmosphere you want, ceremony through reception, first dance to last song. Classic romance or a full dance party.",
  openGraph: {
    title: "Squamish Wedding DJ Services | Howe Sound DJ",
    description:
      "Tailored music for your story: elegant and emotional or wild and unforgettable. Polished, high-energy nights from Howe Sound DJ.",
    url: "/weddings",
  },
  alternates: { canonical: "/weddings" },
};

export default function WeddingsPage() {
  const highlights = [
    {
      title: "Music shaped around you",
      text: "Your tastes, the atmosphere you want to create, and the crowd in front of you, not a one-size-fits-all wedding playlist."
    },
    {
      title: "From first dance to last song",
      text: "Ceremony through reception: polished support when it should feel intimate, high energy when it’s time to open the floor."
    },
    {
      title: "Calm, professional planning",
      text: "Fast replies, clear communication, and zero guesswork, the seamless planning side couples actually feel on the day."
    }
  ];

  const serviceBlocks = [
    {
      title: "Ceremony",
      items: [
        "Music tailored to the tone you want for arrival and processional moments",
        "Audio for vows, officiant, and what the setting demands",
        "Setup that respects the space: indoors, tent, or mountain backdrop"
      ]
    },
    {
      title: "Cocktail hour + dinner",
      items: [
        "Atmosphere that matches classic romance or sets up the party to come",
        "Smooth handoffs between cocktail, dinner, and speeches",
        "Volume and vibe that fit conversation, then build when you’re ready"
      ]
    },
    {
      title: "Reception + dance floor",
      items: [
        "Reading the room: right vibe for the crowd, moment to moment",
        "Energy that climbs naturally; no forced “wedding cheese”",
        "A floor your guests want to stay on. The goal is unforgettable, not filler"
      ]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Initial consultation",
      text: "Your wedding, your venue, and the experience you want guests to talk about, so the fit is real before anything is locked in."
    },
    {
      step: "02",
      title: "Planning + music direction",
      text: "Must-plays, do-not-plays, and the arc of the night, classic romance, full dance party, or both, mapped with intention."
    },
    {
      step: "03",
      title: "Final coordination",
      text: "Timeline, logistics, and sound details reviewed so you’re not guessing the week of."
    },
    {
      step: "04",
      title: "Wedding day execution",
      text: "Polished, high-energy execution: calm behind the scenes, present on the mic when it counts, locked in from first dance to last song."
    }
  ];

  const faqs = [
    {
      q: "Can we choose the music and give you a do-not-play list?",
      a: "Yes. The process is built to reflect your taste while still creating a great experience for the room as a whole."
    },
    {
      q: "Do you provide ceremony audio?",
      a: "Yes. Ceremony coverage can include speaker support and microphones for key moments depending on what your day requires."
    },
    {
      q: "Do you MC as well?",
      a: "MC support can be included where needed to help the evening feel smooth, clear, and professionally guided."
    },
    {
      q: "Do you travel outside Squamish?",
      a: "Yes. Weddings in Whistler, Vancouver, and across the Sea-to-Sky corridor can be accommodated depending on the event."
    }
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Weddings
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Wedding DJ for Squamish, Whistler and the Sea-to-Sky, tailored to you.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Not the average wedding-DJ package: personalized music and planning around your tastes, whether you want classic romance, a full-throttle dance party, or both in one night.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/50">
              Planning from Vancouver for Squamish, Whistler, or the corridor?{" "}
              <a href="/vancouver-wedding-dj" className="font-medium text-amber-300/90 transition hover:text-amber-200">
                Vancouver couples & Sea-to-Sky weddings →
              </a>
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <div>
                <BookConsultTrackedLink surface="hero" className={bookConsultPrimaryButtonClassName}>
                  Check My Date & Fit
                </BookConsultTrackedLink>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  15 minutes &bull; No pressure &bull; No commitment
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 gap-y-3">
                <CheckAvailabilityTrackedLink surface="hero" className={bookConsultOutlineButtonClassName} />
                <a
                  href="/reviews"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-center text-sm font-medium text-white/75 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                >
                  Wedding DJ Reviews
                </a>
                <a
                  href="/packages"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-center text-sm font-medium text-white/75 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                >
                  Wedding DJ Packages
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionReveal as="section" className="border-y border-white/10 bg-white/5" aria-labelledby="weddings-proof-heading">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 id="weddings-proof-heading" className="sr-only">
            Wedding celebration
          </h2>
          <ImageSlot
            src={SITE_IMAGES.weddingsCrowd}
            alt={SITE_IMAGE_ALT.weddingsCrowd}
            aspect="16/9"
            imageClassName="object-[center_44%]"
            label="Your people"
            reservedHint="Candid crowd energy: the people who travel with you and fill the floor."
            sizes="(max-width: 1024px) 100vw, 72rem"
          />
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <StaggerGroup className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <StaggerItem key={item.title}>
              <div className="premium-surface h-full rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/65">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionReveal>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 pb-12 lg:px-8">
        <p className="max-w-3xl text-sm leading-7 text-white/55">
          Planning around a specific Squamish or Sea-to-Sky venue?{" "}
          <Link
            href="/venues"
            className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100 hover:decoration-amber-200/60"
          >
            Browse wedding venue guides
          </Link>{" "}
          for planning context tied to named settings—then check your date first when you&apos;re ready.
        </p>
      </SectionReveal>

      <SectionReveal as="section" className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              What’s included
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Ceremony through reception: one cohesive sound and flow.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              The job is bigger than playlists: it’s helping the day sound right, move well, and match the atmosphere you’re after, polished when it matters, high-energy when it’s time.
            </p>
          </div>

          <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-3">
            {serviceBlocks.map((block) => (
              <StaggerItem key={block.title}>
                <div className="premium-surface h-full rounded-[1.75rem] border border-white/10 bg-neutral-950/70 p-6">
                  <h3 className="text-xl font-semibold">{block.title}</h3>
                  <div className="mt-5 space-y-3">
                    {block.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              The experience
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Your story, your energy, your people.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Whether your day leans elegant and emotional or wild and unforgettable (or both), the music is built around you, wide enough range to match the crowd, focused enough to feel personal.
            </p>
            <p className="mt-4 text-lg leading-8 text-white/70">
              That means reading the room, respecting the venue, supporting the timeline, and giving your guests a reason to stay on the floor, from first dance to last song.
            </p>
          </div>

          <div className="premium-surface rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Planning process
            </div>
            <div className="mt-8 space-y-8">
              {process.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-300 font-semibold text-neutral-950">
                    {item.step}
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{item.title}</div>
                    <p className="mt-2 text-sm leading-7 text-white/65">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                FAQ
              </div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                A few of the questions couples often ask.
              </h2>
            </div>
            <a href="/faq" className="motion-interactive shrink-0 text-sm font-semibold text-amber-300 hover:text-amber-200">
              Full FAQ →
            </a>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="premium-surface rounded-[1.5rem] border border-white/10 bg-neutral-950/70 p-6">
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Next step
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Let’s talk about your date, your venue, and the kind of night you want to create.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              If the fit feels right, most couples lock in clarity with Check My Date & Fit (15 min); you can confirm your calendar date alongside or next.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <div>
                <BookConsultTrackedLink surface="page_cta" className={bookConsultPrimaryButtonClassName}>
                  Check My Date & Fit
                </BookConsultTrackedLink>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  15 minutes &bull; No pressure &bull; No commitment
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 gap-y-3">
                <CheckAvailabilityTrackedLink surface="page_cta" className={bookConsultOutlineButtonClassName} />
                <a
                  href="/packages"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-center text-sm font-medium text-white/75 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                >
                  Wedding DJ Packages
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}