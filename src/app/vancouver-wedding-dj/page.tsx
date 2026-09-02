import type { Metadata } from "next";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { ImageSlot } from "@/components/image-slot";
import { JsonLd } from "@/components/json-ld";
import { HOMEPAGE_FEATURED_REVIEW_IDS, getReviewById } from "@/config/reviews";
import { SITE_IMAGE_ALT, SITE_IMAGES } from "@/config/site-images";
import { vancouverWeddingDjBreadcrumbJsonLd } from "@/lib/json-ld";
import { CTA_FINALE_SECTION_TOP } from "@/lib/cta-section-spacing";

const pageTitle = "Squamish Wedding DJ for Vancouver Couples | Howe Sound DJ";
const pageDescription =
  "Live in Vancouver and getting married in Squamish? Work with a local Squamish wedding DJ for calm planning, venue-aware production, and a packed dance floor.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/vancouver-wedding-dj",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    /** Keep in sync with root `layout.tsx` (`/og-share.jpg`). */
    images: ["/og-share.jpg"],
  },
  alternates: {
    canonical: "/vancouver-wedding-dj",
  },
};

const VANCOUVER_REVIEW_CONTEXT: Record<(typeof HOMEPAGE_FEATURED_REVIEW_IDS)[number], string> = {
  "vanessa-pocock": "Squamish",
  "natasha-beaudry": "Squamish",
  "matthew-bundala": "Sea to Sky",
};

export default function VancouverWeddingDjPage() {
  const whyLocal = [
    {
      title: "Squamish venue familiarity",
      text: "Squamish weddings come with real constraints: load-in, acoustics, weather contingencies, and how the night actually flows. Working here means fewer surprises and smoother coordination with your team."
    },
    {
      title: "Less friction on travel and timing",
      text: "Squamish weekends can mean traffic and tight turnarounds. A DJ who is already local removes the “will they make it?” stress that can come when talent is routed from the city."
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
      text: "Connection matters when details stack fast: your story, your energy, your people, especially when much of the guest list is travelling to Squamish together."
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
      title: "A truly local vendor",
      text: "Your DJ is based in Squamish, so local knowledge and accountability are built into the service rather than added as a travel surcharge."
    },
    {
      title: "Close-to-home destination",
      text: "If your Squamish wedding feels like a getaway for your guests, you still deserve a soundtrack that matches the day, not a generic package named for the city you live in."
    }
  ];

  const experiencePillars = [
    {
      title: "Your taste, not a template",
      text: "Music shaped around your must-plays, do-not-plays, guests, and the room, not an autopilot wedding playlist."
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
      a: "Yes, often. Many couples live and plan in Vancouver while their wedding happens in Squamish. The process is built around your date, Squamish venue, and how you want the day to feel."
    },
    {
      q: "Is it better to hire a local Squamish wedding DJ or a Vancouver wedding DJ for a Squamish wedding?",
      a: "For a Squamish wedding, local venue knowledge, clear communication, and music built around your crowd all matter. Howe Sound DJ is based in Squamish, giving Vancouver couples a local partner with fewer logistics unknowns."
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
      q: "Which wedding locations do you serve?",
      a: "Howe Sound DJ is focused on weddings held in Squamish. You can live and plan anywhere; the service boundary is the location of the event."
    },
    {
      q: "How do we check availability and pricing?",
      a: "Packages outline what each tier includes; exact pricing is confirmed after your date, Squamish venue, and coverage are clear. Comparing quotes? Weigh travel, local venue experience, and whether the music plan is truly yours. Start with an inquiry and add a consultation when the direction feels clear."
    }
  ];

  const reviewSnippets = HOMEPAGE_FEATURED_REVIEW_IDS.map((id) => {
    const review = getReviewById(id);
    if (!review) throw new Error(`Missing Vancouver review snippet: ${id}`);
    return {
      quote: review.quote,
      name: review.reviewerName,
      context: VANCOUVER_REVIEW_CONTEXT[id],
    };
  });

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <JsonLd data={vancouverWeddingDjBreadcrumbJsonLd()} />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.16),transparent_48%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
              Planning from Vancouver
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Your wedding is in Squamish
            </div>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-[2.75rem] lg:leading-[1.12]">
              A Squamish wedding DJ for couples planning from Vancouver
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              If you live in Vancouver but you are getting married in Squamish, you are not alone. Many Squamish weddings are planned from the city. The useful question is whether your DJ understands the local venue, timing, and crowd energy before the first guest arrives.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-8 text-white/70">
              Howe Sound DJ is based in Squamish: personalized music, seamless planning, and local accountability through{" "}
              <a href="/weddings" className="text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100 hover:decoration-amber-200/60">
                Wedding DJ Services
              </a>{" "}
              built for the day you are actually having, not the search you typed before coffee on Monday. When Squamish is the anchor for your day, the{" "}
              <Link
                href="/squamish-wedding-dj"
                className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100 hover:decoration-amber-200/60"
              >
                local-first overview
              </Link>{" "}
              sits alongside this page.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="hero" checkSurface="hero" />
              <p className="text-sm leading-relaxed text-white/60">
                45 minutes &bull; No pressure &bull; Just clarity
              </p>
              <div className="flex flex-wrap items-center gap-3 gap-y-3">
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
                label="Squamish"
                reservedHint="Reception energy and local venue knowledge for the place you are marrying."
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm text-white/60">Planning from Vancouver, celebrating in Squamish</div>
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
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Why Vancouver couples choose a Squamish local</div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Planning from the city, marrying in Squamish</h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            It is normal to research vendors in Vancouver when that is where you live, but when the event is in Squamish, local familiarity is a practical advantage: fewer guesswork moments, smoother coordination, and music tailored to the real crowd in the room.
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
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">A Squamish service, not a Vancouver storefront</h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Howe Sound DJ is based in Squamish and focuses on events held here. You do not need a Vancouver storefront for a Squamish wedding. You need someone who knows how local weddings actually run, whether your guests are mostly local or travelling from across the country.
            </p>
            <p className="mt-4 text-lg leading-8 text-white/70">
              If your date is anchored in Squamish itself, the dedicated overview is the{" "}
              <Link
                href="/squamish-wedding-dj"
                className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100 hover:decoration-amber-200/60"
              >
                Squamish wedding DJ
              </Link>{" "}
              pillar; this page simply explains how planning from Vancouver works when the wedding itself is in Squamish.
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
              Vancouver couples: let’s match your music, date, and Squamish venue
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Check your date for your Squamish wedding, compare packages when you want structure, or start with a Sound Check. Either way, the goal is your story, your crowd, your night.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
              <p className="text-sm leading-relaxed text-white/60">
                45 minutes &bull; No pressure &bull; Just clarity
              </p>
              <div className="flex flex-wrap items-center gap-3 gap-y-3">
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
