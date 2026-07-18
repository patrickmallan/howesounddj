import type { Metadata } from "next";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { CTA_FINALE_SECTION_TOP, MAIN_SECTION_Y } from "@/lib/cta-section-spacing";

const packagesTitle = "Wedding DJ Packages | Clear Sea-to-Sky Coverage";
const packagesDesc =
  "What couples actually receive: ceremony-through-reception DJ coverage, planning calls, custom playlists, and corridor-ready sound for Squamish and Sea-to-Sky weddings.";

export const metadata: Metadata = {
  title: packagesTitle,
  description: packagesDesc,
  openGraph: {
    title: packagesTitle,
    description:
      "Transparent wedding DJ tiers for the corridor: planning confidence, full-day coverage options, and atmosphere built around your crowd, not a feature checklist.",
    url: "/packages",
  },
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  const everyPackageIncludes = [
    {
      title: "Planning that stays ahead of the day",
      text: "Consultation calls, clear communication, and a timeline-minded approach so music and announcements line up with how your event actually runs."
    },
    {
      title: "Sound that supports every moment",
      text: "Clear audio from soft vows to full dance-floor energy, with setup and level management so guests hear what matters without strain."
    },
    {
      title: "Playlists built around you",
      text: "Custom playlist design shaped by your taste, your crowd, and the atmosphere you want, not a generic wedding formula."
    },
    {
      title: "Professional execution",
      text: "Smooth transitions, thoughtful MC support when needed, and someone behind the mixer who is paying attention to the room, not just the next track."
    }
  ];

  const tiers = [
    {
      name: "Celebration",
      tag: "Special events",
      position:
        "Milestone birthdays, anniversaries, corporate gatherings, or any celebration where you want strong music, energy, and coordination without the full wedding-day arc.",
      highlight: false,
      features: [
        "DJ coverage for your event (typically 3–5 hours)",
        "Custom playlist design tailored to your theme or preferences",
        "Professional sound system scaled to fill the space",
        "Dancefloor lighting to support the vibe",
        "MC support for announcements, toasts, or program moments",
        "Pre-event consultation so the run-of-show feels intentional"
      ]
    },
    {
      name: "Complete Wedding",
      tag: "Most couples start here",
      position:
        "From the walk down the aisle to the last song: one cohesive soundtrack for ceremony, cocktails, dinner, and the dance floor.",
      highlight: true,
      features: [
        "Full-day DJ service covering ceremony and reception",
        "Custom playlist design based on your preferences and key moments",
        "Sound and lighting suited to each phase of the day",
        "Wireless microphones for vows, officiant, and speeches",
        "MC support: introductions, transitions, and a smooth flow for guests",
        "Pre-event planning: calls, venue coordination when needed, and a shared timeline"
      ]
    },
    {
      name: "Signature",
      tag: "More customization",
      position:
        "Everything in Complete Wedding, with room to layer in enhancements when you want the night to feel even more custom: extra lighting, expanded audio, and bespoke music moments.",
      highlight: false,
      features: [
        "Everything included in Complete Wedding",
        "Enhanced dancefloor lighting and atmosphere options",
        "Additional speaker setups or zones for complex venues or layouts",
        "Custom-mixed tracks for grand entrance and formal dances",
        "Priority planning for bespoke moments (e.g. specialty entrances, staged reveals)",
        "Access to the full enhancement menu: silent disco, photo booth coordination, and more"
      ]
    }
  ];

  const addOns = [
    "Additional dancefloor or ambient lighting",
    "Extra speaker setups and multi-zone audio",
    "Video edits or visual coordination (when your vendor plan includes it)",
    "Photo booth add-on coordination",
    "Silent disco setup",
    "Audio message from an absent loved one woven into the evening",
    "Further custom edits and one-off mixes beyond formal dances"
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.14),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
              Squamish • Vancouver • Sea to Sky
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Packages
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Know what you are booking before you commit.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              These tiers describe the shape of your day and the support you receive: planning calls, ceremony-through-reception coverage when you need it, and a host who steers the room without stealing
              the spotlight. After you reach out, I reply with availability, a clear quote, and what the planning path looks like from there.
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

      <SectionReveal as="section" className={`${MAIN_SECTION_Y} mx-auto max-w-6xl px-6 lg:px-8`}>
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            How to choose
          </div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Match the package to your day, then we fill in the details together.
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            Every booking includes the same standard of communication and care. Tiers differ by scope: hours, whether ceremony is included, and how much production layering you want. Not sure which fits?
            That is normal. A short inquiry is enough to align.
          </p>
        </div>

        <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <div
                className={`premium-surface flex h-full flex-col rounded-[1.75rem] border p-6 lg:p-8 ${
                  tier.highlight
                    ? "border-amber-300/35 bg-gradient-to-b from-amber-300/10 to-white/[0.03] shadow-lg shadow-black/20"
                    : "border-white/10 bg-white/5"
                }`}
              >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-semibold">{tier.name}</h3>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">
                    {tier.tag}
                  </div>
                </div>
                {tier.highlight ? (
                  <span className="shrink-0 rounded-full bg-amber-300 px-2.5 py-1 text-xs font-semibold text-neutral-950">
                    Popular
                  </span>
                ) : null}
              </div>
              <p className="mt-4 flex-1 text-sm leading-7 text-white/65">{tier.position}</p>
              <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                {tier.features.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-7 text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/5 p-6 lg:p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            What happens after you inquire
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
            I reply personally with availability for your date, a quote based on your venue and timeline, and a suggested next step (usually a 15-minute consult). From there, planning calls, music direction,
            and a shared run-of-show build at your pace. Investment depends on date, location, hours, and any add-ons. No surprise fees hidden behind a generic online number.
          </p>
          <p className="mt-4 text-sm leading-7 text-white/55">
            <Link
              href="/faq"
              className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100 hover:decoration-amber-200/60"
            >
              See our FAQ
            </Link>{" "}
            for common questions about planning, ceremony audio, and coverage.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="border-y border-white/10 bg-white/5">
        <div className={`mx-auto max-w-6xl px-6 lg:px-8 ${MAIN_SECTION_Y}`}>
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Every package includes
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              The same care in every tier.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Scope changes; standards do not. From soft ballads to peak dance-floor moments, you get thoughtful music direction, responsive communication, and execution that matches what you planned.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/55">
              <Link
                href="/about"
                className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
              >
                Meet the person behind Howe Sound DJ
              </Link>{" "}
              if you want the approach and corridor experience before you choose a tier.
            </p>
          </div>
          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
            {everyPackageIncludes.map((item) => (
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

      <SectionReveal as="section" className={`${MAIN_SECTION_Y} mx-auto max-w-6xl px-6 lg:px-8`}>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Optional add-ons
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              When you want to push the experience further.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Many couples land on Complete Wedding and add one or two enhancements. Signature is for when you already know you want layered lighting, expanded audio, or bespoke music moments. We map it in planning instead of improvising on the day.
            </p>
          </div>
          <div className="premium-surface rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <ul className="space-y-4">
              {addOns.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-white/50">
              Not sure what you need? That is what Book a Consult is for. We match enhancements to your venue, guest count, and how you want the night to feel.
            </p>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        as="section"
        className={`${CTA_FINALE_SECTION_TOP} mx-auto max-w-6xl px-6 pb-24 lg:px-8 lg:pb-28`}
      >
        <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Next step
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Send your date and the tier that closest matches your plan.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              If something sits between tiers, we shape it together. You will hear back with availability, a clear quote, and what planning looks like from there. No spreadsheet labels, no pressure.
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
