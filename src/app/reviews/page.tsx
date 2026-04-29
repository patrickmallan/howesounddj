import type { Metadata } from "next";
import CTADuo from "@/components/cta-duo";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { CTA_FINALE_SECTION_TOP } from "@/lib/cta-section-spacing";

export const metadata: Metadata = {
  title: "Wedding DJ Reviews",
  description:
    "Real couple reviews for Howe Sound DJ: Squamish and Sea-to-Sky weddings, with feedback on planning, music, professionalism, and dance floor energy.",
  openGraph: {
    title: "Wedding DJ Reviews | Howe Sound DJ",
    description:
      "Proof from weddings across Squamish, Whistler, Vancouver, and the Sea-to-Sky corridor.",
    url: "/reviews",
  },
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const featuredTestimonials = [
    {
      quote:
        "We would get married all over again just so we could hangout and work with Patrick again. He's a talented DJ and a truly caring person.",
      name: "Stephen Henry"
    },
    {
      quote:
        "Patrick kept the party going all night long. If you're thinking about booking him run, don't walk! You will not regret it.",
      name: "Molly Finn"
    },
    {
      quote:
        "Seamless, stress-free, and seriously fun. Patrick's the go-to for a reason.",
      name: "Lauren Steeles"
    },
    {
      quote:
        "Couldn't be happier with the service provided by Patrick. We hired Patrick for our recent wedding and it was one of the best decisions we made from the ceremony to cocktail hour to the dance everything was perfect! All our guests can't stop talking about how great of a dance party it was and the dance floor was packed at all times! I would recommend him over and over again!",
      name: "Cassandra Wilding"
    },
    {
      quote:
        "Patrick is incredible. His calm, professional, yet personable communication made our day stress-free.",
      name: "Matthew Bundala"
    },
    {
      quote:
        "Patrick kept the dance floor packed and the energy high all night long.",
      name: "Vanessa Pocock"
    },
    {
      quote:
        "We were thrilled to have Patrick from Squamish as he was able to easily attend pre-wedding meetings at our venue.",
      name: "Natasha Beaudry"
    },
    {
      quote: "We couldn't have asked for a better DJ! Highly recommend for any event.",
      name: "Matias Fontecilla"
    },
    {
      quote:
        "Patrick was absolutely fantastic! He handled our ceremony, cocktail hour, and reception seamlessly.",
      name: "Danya Karras"
    },
    {
      quote:
        "Patrick was more than just a DJ for our wedding; he was a vital part of our team, and he really went above and beyond to ensure everything ran smoothly. We highly recommend him.",
      name: "Wedding couple"
    },
    {
      quote:
        "Patrick was great at our wedding. The song transitions were perfect, and there was never a lull in music throughout the entire night! The group was dancing, and everyone really enjoyed the music! Thanks Patrick for making our wedding unforgettable!",
      name: "Ellen Selby"
    },
    {
      quote:
        "Patrick provided fantastic entertainment for us and our guests at our wedding this past August. From prep and planning to day-of execution, Patrick was friendly, professional and talented. The music was on point and our dance floor was the place to be during our reception. I highly recommend Patrick for any and all of your DJ needs!",
      name: "Melissa Schweyer"
    }
  ];

  const valueThemes = [
    {
      title: "Communication that lowers stress",
      text:
        "Couples often point to calm, professional, yet personable communication, the kind that makes the day feel manageable, not chaotic."
    },
    {
      title: "Planning and day-of execution",
      text:
        "From prep and planning through ceremony, cocktail hour, and reception, reviews call out seamless flow, friendly execution, and a team mindset when things need to run smoothly."
    },
    {
      title: "Music that keeps the floor alive",
      text:
        "Couples describe packed dance floors, strong transitions, and energy that holds all night, the kind of dancefloor-packing approach Patrick leads with, not a generic wedding formula."
    },
    {
      title: "Local and venue-ready",
      text:
        "Squamish-based and easy to coordinate with pre-wedding meetings at your venue, the kind of practical, local familiarity that shows up in real couple feedback, alongside Patrick’s “Rooted in Squamish” positioning."
    },
    {
      title: "More than a playlist",
      text:
        "Patrick’s own framing matches what couples say: reading the room, managing transitions, building energy, not just pressing play."
    },
    {
      title: "Trust and connection",
      text:
        "Talented DJing plus someone couples genuinely want in their corner. Reviews come back to that mix of skill and care again and again."
    }
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.14),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
              Reviews
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Real couples, real parties
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Proof from weddings across Squamish, Whistler, Vancouver, and the Sea-to-Sky corridor.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              The results speak for themselves: real couples, real parties, real reviews. Fast replies, clear communication, and a Squamish-rooted approach where local venues and vendors are part of how the day comes together.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="hero" checkSurface="hero" />
              <p className="text-sm leading-relaxed text-white/60">
                15 minutes &bull; No pressure &bull; Just clarity
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

      <SectionReveal as="section" className="border-b border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
          <div className="premium-surface flex flex-col gap-6 rounded-[1.75rem] border border-white/10 bg-white/5 px-6 py-6 md:flex-row md:items-center md:justify-between md:gap-8 lg:px-8 lg:py-7">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">Proof-first</p>
              <p className="mt-2 text-base leading-relaxed text-white/75">
                This page leads with named couples and verbatim quotes, not lifestyle stock or anonymous five-star blurbs. Read the cards below, then check your date first, or start with Book a Consult if you want clarity on direction sooner.
              </p>
            </div>
            <div className="flex w-full min-w-0 shrink-0 flex-col gap-3 md:max-w-md md:items-stretch">
              <CTADuo bookSurface="inline" checkSurface="inline" className="w-full" />
              <p className="text-xs leading-relaxed text-white/50 md:text-right">
                15 minutes &bull; No pressure &bull; Just clarity
              </p>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Featured testimonials
          </div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Words from couples who booked Howe Sound DJ.
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            Real words from named couples and clients, the same language you will find on the live site, with only light spelling or grammar fixes where needed.
          </p>
        </div>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredTestimonials.map((item, index) => (
            <StaggerItem key={`${item.name}-${index}`}>
              <figure className="premium-surface flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <blockquote className="flex-1 text-base leading-8 text-white/85">“{item.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4 text-sm font-medium text-amber-300/95">
                  {item.name}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionReveal>

      <SectionReveal as="section" className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              What couples consistently value
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Themes that show up again and again in real feedback.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              These are not invented selling points. They are patterns from the testimonials above and the trust language Howe Sound DJ uses on the live site.
            </p>
          </div>
          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
            {valueThemes.map((item) => (
              <StaggerItem key={item.title}>
                <div className="premium-surface h-full rounded-[1.75rem] border border-white/10 bg-neutral-950/70 p-6">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Trust & social proof
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Rooted in Squamish. Trusted where it matters.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Howe Sound DJ is built around being authentically local: knowing the venues, the vendors, and the vibe of the Sea-to-Sky corridor. The live site describes preferred status with popular regional venues, the kind of repeat trust that comes from showing up professionally, night after night.
            </p>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Couples also describe Patrick as the go-to for a reason: seamless and stress-free, a vital part of the team, and someone who goes above and beyond so the celebration stays on track.
            </p>
          </div>
          <div className="premium-surface rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              From the brand
            </div>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-white/75">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                <span>
                  <span className="text-white/90">Serving the Sea-to-Sky corridor with passion.</span> Weddings are the focus, with a musical range that meets real crowds where they are.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                <span>
                  <span className="text-white/90">Seamless planning:</span> fast replies, clear communication, and zero guesswork.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                <span>
                  <span className="text-white/90">Client backed:</span> the results speak for themselves: real couples, real parties, real reviews.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                <span>
                  <span className="text-white/90">Venue familiarity:</span> played top Squamish venues multiple times; preferred vendor relationships across the region.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              The experience
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              What working together often feels like, in Patrick’s words.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Patrick describes wedding days as feeling effortless, even though the work behind them is professional, adaptable, and detail-driven. Clients often call him the “unsung hero” of the event: the music feels magical because it is backed by experience, not luck.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Before the day",
                text: "I take the time to get to know you, understand your musical tastes, and learn about the atmosphere you want to create, whether you are dreaming of classic romance or an energetic dance party."
              },
              {
                title: "During the celebration",
                text: "My job is not just to play music. It is to read the room, manage transitions, and build energy, from blending genres to handling special requests on the fly."
              },
              {
                title: "Why it lands",
                text: "Whether your wedding is elegant and emotional or wild and unforgettable (or both), the goal is a musical journey that is about your story, your energy, and your people, and a dance floor your guests do not want to leave."
              }
            ].map((block) => (
              <div key={block.title} className="premium-surface rounded-[1.75rem] border border-white/10 bg-neutral-950/70 p-6">
                <h3 className="text-lg font-semibold text-amber-300/95">{block.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        as="section"
        className={`${CTA_FINALE_SECTION_TOP} mx-auto max-w-6xl px-6 pb-20 lg:px-8`}
      >
        <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Next step
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Ready to see if your date is open?
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Send your date, venue, and wedding vision. The next step is a conversation about availability and planning.
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
