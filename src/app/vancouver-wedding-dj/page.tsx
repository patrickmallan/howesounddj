import type { Metadata } from "next";
import {
  BookConsultTrackedLink,
  bookConsultOutlineButtonClassName,
  bookConsultPrimaryButtonClassName,
} from "@/components/book-consult-tracked-link";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import { ImageSlot } from "@/components/image-slot";
import { JsonLd } from "@/components/json-ld";
import { SITE_IMAGE_ALT, SITE_IMAGES } from "@/config/site-images";
import { vancouverWeddingDjBreadcrumbJsonLd } from "@/lib/json-ld";
import { CTA_FINALE_SECTION_TOP } from "@/lib/cta-section-spacing";

const ogDesc =
  "For Vancouver couples marrying in Squamish, Whistler, or the Sea-to-Sky: rooted in Squamish, corridor-savvy logistics, personalized music, and planning that stays ahead of the day.";

export const metadata: Metadata = {
  title: "Vancouver Wedding DJ for Squamish & Sea-to-Sky Weddings",
  description:
    "Planning from Vancouver? Howe Sound DJ is Squamish-rooted: Sea-to-Sky and Whistler wedding DJ coverage with personalized music, local familiarity, and seamless planning (no autopilot playlists).",
  openGraph: {
    title: "Vancouver Wedding DJ for Squamish & Sea-to-Sky Weddings | Howe Sound DJ",
    description: ogDesc,
    url: "/vancouver-wedding-dj",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vancouver Wedding DJ for Squamish & Sea-to-Sky Weddings | Howe Sound DJ",
    description: ogDesc,
    /** Keep in sync with root `layout.tsx` (`/og-share.jpg`). */
    images: ["/og-share.jpg"],
  },
  alternates: {
    canonical: "/vancouver-wedding-dj",
  },
};

export default function VancouverWeddingDjPage() {
  const whyLocal = [
    {
      title: "Venue and corridor familiarity",
      text: "Mountain weddings come with real constraints: load-in, acoustics, weather contingencies, and how the night actually flows. Working here week in and week out means fewer surprises and smoother coordination with your team."
    },
    {
      title: "Less friction on travel and timing",
      text: "Sea-to-Sky weekends have traffic and tight turnarounds. A DJ who already plans in this lane reduces the “will they make it?” stress that can come when talent is routed from the city without corridor experience."
    },
    {
      title: "Planning that matches the day",
      text: "Fast replies, clear communication, and zero guesswork, the same seamless planning couples name in reviews, applied when you plan from the Lower Mainland but the event lives up the highway."
    },
    {
      title: "Music for the crowd in front of you",
      text: "The set is built around your story and the people in the room, not a stock playlist that ignores who actually showed up."
    },
    {
      title: "Connection, not just another booking",
      text: "Connection matters when details stack fast: your story, your energy, your people, especially for mountain weddings where the guest list often travels together."
    },
    {
      title: "One cohesive arc",
      text: "Ceremony through reception: elegant and emotional or wild and unforgettable (often both), first dance to last song, with calm, professional execution behind the scenes."
    }
  ];

  const geographyPoints = [
    {
      title: "Squamish weddings",
      text: "Many couples live in Metro Vancouver but host their day in Squamish. A DJ who already knows the local landscape is not discovering load-in and layout on your wedding day."
    },
    {
      title: "Whistler & the Sea-to-Sky",
      text: "From corridor celebrations to Whistler receptions: sound and pacing tuned to mountain venues and guests who made the drive together."
    },
    {
      title: "Close-to-home destination",
      text: "If your wedding reads like a getaway but the Sea-to-Sky is the real location, you still deserve a soundtrack that matches the day, not a generic package named for a city you are not marrying in."
    }
  ];

  const experiencePillars = [
    {
      title: "Bangers Only",
      text: "Dancefloor-packing tracks, no overplayed wedding fluff, no autopilot playlists."
    },
    {
      title: "Your story, your energy, your people",
      text: "Music shaped around you, wide enough range to match the room, focused enough to feel personal."
    },
    {
      title: "Elegant and emotional or wild and unforgettable",
      text: "The tone is yours. The job is to support it from ceremony through the last song."
    },
    {
      title: "Calm behind the scenes",
      text: "Professional planning and day-of execution so you are not managing the sound. You are living the night."
    }
  ];

  const faqs = [
    {
      q: "Do you work with Vancouver couples getting married in Squamish?",
      a: "Yes, often. Many couples live and plan in Vancouver while the wedding happens in Squamish, Whistler, or elsewhere along the Sea-to-Sky. The process is built around your date, venue, and how you want the day to feel, whether your inbox says Vancouver or Squamish."
    },
    {
      q: "Is it better to hire a local Squamish wedding DJ or a Vancouver wedding DJ for a Squamish wedding?",
      a: "It depends on experience and communication style, not the address on a business card. What matters is whether your DJ knows mountain venues, communicates clearly, and builds music around your crowd. Howe Sound DJ is rooted in Squamish with corridor-wide experience, which is why couples planning Sea-to-Sky weddings often lead with local familiarity and fewer logistics unknowns."
    },
    {
      q: "Do you provide ceremony and reception DJ services?",
      a: "Yes. Coverage can span ceremony, cocktail, dinner, and reception, with audio support and pacing that match each phase. See the full breakdown on the weddings page."
    },
    {
      q: "Can you help with planning and flow?",
      a: "Yes. DJ support includes helping the evening feel smooth and well-paced, not only choosing songs, but aligning with your timeline and the room so transitions feel intentional."
    },
    {
      q: "Do you travel to Whistler and across the Sea-to-Sky?",
      a: "Yes. Whistler, Squamish, and corridor weddings are core to the work. Availability depends on your date and logistics, which is why most couples start with an inquiry."
    },
    {
      q: "How do we check availability and pricing?",
      a: "Packages outline what each tier includes; exact pricing is confirmed after your date, venue, and coverage are clear, the same transparent path as any Sea-to-Sky booking. Comparing quotes? Weigh travel, experience in your venue type, and whether the music plan is truly yours. Start with an inquiry and add a consultation when the direction feels clear."
    }
  ];

  const reviewSnippets = [
    {
      quote:
        "Patrick kept the dance floor packed and the energy high all night long.",
      name: "Vanessa Pocock",
      context: "Squamish"
    },
    {
      quote:
        "Patrick is incredible. His calm, professional, yet personable communication made our day stress-free.",
      name: "Matthew Bundala",
      context: "Sea to Sky"
    },
    {
      quote:
        "We would get married all over again just so we could hangout and work with Patrick again. He's a talented DJ and a truly caring person.",
      name: "Stephen Henry",
      context: "Whistler"
    }
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <JsonLd data={vancouverWeddingDjBreadcrumbJsonLd()} />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.16),transparent_48%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
              Vancouver Wedding DJ
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Sea-to-Sky · Squamish · Whistler
            </div>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-[2.75rem] lg:leading-[1.12]">
              Vancouver wedding DJ for Squamish, Whistler & Sea-to-Sky weddings
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              If you live in Vancouver but you are getting married in Squamish, Whistler, or along the corridor, you are not imagining it. A lot of these weddings are planned from the city. The question is whether your DJ understands mountain venues, timing, and crowd energy before the first guest arrives, or is treating your day like another generic club date with a longer drive.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-8 text-white/70">
              Howe Sound DJ is rooted in Squamish with real corridor experience: personalized music, seamless planning, and connection through{" "}
              <a href="/weddings" className="text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100 hover:decoration-amber-200/60">
                Wedding DJ Services
              </a>{" "}
              built for the day you are actually having, not the search you typed before coffee on Monday.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <div>
                <BookConsultTrackedLink surface="hero" className={bookConsultPrimaryButtonClassName}>
                  Check My Date
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
              </div>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/45">
              <a href="/packages" className="text-white/55 transition hover:text-amber-200/90">
                Wedding DJ Packages
              </a>
              <span className="mx-2 text-white/25" aria-hidden="true">
                ·
              </span>
              <a href="/faq" className="text-white/55 transition hover:text-amber-200/90">
                FAQ
              </a>
            </p>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30">
              <ImageSlot
                src={SITE_IMAGES.weddingsSupport}
                alt={SITE_IMAGE_ALT.weddingsSupport}
                aspect="4/5"
                imageClassName="object-[center_36%]"
                label="Sea-to-Sky"
                reservedHint="Reception energy or mountain backdrop: the corridor you are marrying in."
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm text-white/60">Planning from Vancouver, party in the mountains</div>
                <div className="mt-2 text-lg font-medium text-white">
                  Local familiarity beats showing up cold for sound, pacing, and peace of mind.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Why Vancouver couples choose a Sea-to-Sky specialist</div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Planning from the city, marrying in the mountains</h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            It is normal to research vendors in Vancouver when that is where you live, but your wedding might be a Squamish wedding, a Whistler wedding, or a Sea-to-Sky wedding in every practical sense. When that is true, corridor familiarity and mountain experience are practical advantages: fewer guesswork moments, smoother coordination, and music tailored to the real crowd in the room.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {whyLocal.map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Where this lands</div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Squamish, Whistler, and the Sea-to-Sky, not a Vancouver storefront</h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Howe Sound DJ is based in Squamish and works across the corridor. You do not need a fake Vancouver address to feel like you hired the right corridor specialist. You need someone who knows how these weddings actually run. That is the through-line whether your guests are mostly local or flying in from across the country.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {geographyPoints.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-neutral-950/70 p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">What the experience feels like</div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Not geography alone: a stronger wedding music experience</h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              The differentiator is not only where Patrick is based. It is how the night is built: deliberate music, real connection (you are not just another booking), and a dance floor that moves with your people from first dance to last song.
            </p>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Explore the full story on the{" "}
              <a href="/weddings" className="text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                Wedding DJ Services
              </a>{" "}
              page. The same service, framed here for couples who find us while planning from Vancouver.
            </p>
          </div>
          <div className="space-y-4">
            {experiencePillars.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-amber-200/95">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Decision support</div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">FAQ for couples planning from Vancouver</h2>
            </div>
            <a href="/faq" className="shrink-0 text-sm font-semibold text-amber-300 hover:text-amber-200">
              Full FAQ →
            </a>
          </div>
          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-[1.5rem] border border-white/10 bg-neutral-950/70 p-6">
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Social proof</div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Real couples, same voice you will see on reviews</h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Short snippets from published reviews. The full set lives on the reviews page.
            </p>
          </div>
          <a href="/reviews" className="shrink-0 text-sm font-semibold text-amber-300 hover:text-amber-200">
            Wedding DJ Reviews →
          </a>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reviewSnippets.map((item) => (
            <div key={item.name} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-base leading-8 text-white/80">“{item.quote}”</p>
              <div className="mt-6 text-sm text-white/50">
                {item.name} · {item.context}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${CTA_FINALE_SECTION_TOP} mx-auto max-w-6xl px-6 pb-20 lg:px-8`}>
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Lock in the plan</div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Vancouver couples: let’s match music, date, and Sea-to-Sky logistics
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Check your date first for your Squamish, Whistler, or corridor wedding, layer in packages when you want structure, or lead with Check My Date. Either way, the goal is your story, your crowd, your night.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <div>
                <BookConsultTrackedLink surface="page_cta" className={bookConsultPrimaryButtonClassName}>
                  Check My Date
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
      </section>
    </main>
  );
}
