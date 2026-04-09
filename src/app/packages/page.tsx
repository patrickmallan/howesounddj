import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages & Enhancements",
  description:
    "Wedding DJ packages and optional enhancements for Squamish and Sea-to-Sky weddings — celebration through full-day coverage, plus lighting, audio zones, and custom mixes.",
  openGraph: {
    title: "Packages & Enhancements | Howe Sound DJ",
    description:
      "Clear package tiers, what every booking includes, and add-ons when you want more — pricing confirmed after your date and venue.",
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
      title: "Sound chosen for clarity",
      text: "Equipment selected for clean, balanced audio — from soft moments to full dance-floor energy — with careful setup and level management throughout."
    },
    {
      title: "Playlists built around you",
      text: "Custom playlist design shaped by your taste, your crowd, and the atmosphere you want — not a generic wedding formula."
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
        "Premium sound system scaled to fill the space",
        "Dancefloor lighting to support the vibe",
        "MC support for announcements, toasts, or program moments",
        "Pre-event consultation so the run-of-show feels intentional"
      ]
    },
    {
      name: "Complete Wedding",
      tag: "Most couples start here",
      position:
        "From the walk down the aisle to the last song — one cohesive soundtrack for ceremony, cocktails, dinner, and the dance floor.",
      highlight: true,
      features: [
        "Full-day DJ service covering ceremony and reception",
        "Custom playlist design based on your preferences and key moments",
        "Premium sound and lighting package for each phase of the day",
        "Wireless microphones for vows, officiant, and speeches",
        "MC support: introductions, transitions, and a smooth flow for guests",
        "Pre-event planning — calls, venue coordination when needed, and a shared timeline"
      ]
    },
    {
      name: "Signature",
      tag: "Elevated production",
      position:
        "Everything in Complete Wedding, with room to layer in enhancements when you want the night to feel even more custom — extra lighting, expanded audio, and bespoke music moments.",
      highlight: false,
      features: [
        "Everything included in Complete Wedding",
        "Enhanced dancefloor lighting and atmosphere options",
        "Additional speaker setups or zones for complex venues or layouts",
        "Custom-mixed tracks for grand entrance and formal dances",
        "Priority planning for bespoke moments (e.g. specialty entrances, staged reveals)",
        "Access to the full enhancement menu — silent disco, photo booth coordination, and more"
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
              Clear options. One standard of care.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Howe Sound DJ is built around customized service — not cookie-cutter blocks of time. Whether you are planning a focused celebration or a full wedding day, these packages describe what you are booking: professional sound, thoughtful music direction, and a host who can steer the room without stealing the spotlight.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/contact"
                className="rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
              >
                Check Availability
              </a>
              <a
                href="/reviews"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Read Reviews
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            How to read this page
          </div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Start with the shape of your day — then we align details.
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            Every booking includes the same commitment to clarity and sound quality. The tiers differ by scope: hours, whether ceremony is in the mix, and how much production layering you want on top of a strong musical foundation.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-[1.75rem] border p-6 lg:p-8 ${
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
          ))}
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/5 p-6 lg:p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Pricing & availability
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
            Investment depends on date, location, hours, and any add-ons. Exact pricing is confirmed after a conversation about your venue and timeline — no surprise fees baked into a generic online number. Reach out with your date and vision; I will respond with availability and a clear quote.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Every package includes
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              The baseline you should expect from Howe Sound DJ.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Tiers change scope — not standards. From soft ballads to peak dance-floor moments, the gear and the approach are built so your event sounds balanced, immersive, and true to what you planned.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {everyPackageIncludes.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-neutral-950/70 p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Optional add-ons
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              When you want to push the experience further.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Many couples land on Complete Wedding and add one or two enhancements. Signature is for when you already know you want layered lighting, expanded audio, or bespoke music moments — we map it in planning instead of improvising on the day.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <ul className="space-y-4">
              {addOns.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-white/50">
              Not sure what you need? That is what the consultation is for — we match enhancements to your venue, guest count, and how you want the night to feel.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Next step
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Send your date, venue, and the package that closest matches your plan.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              If something sits between tiers, we can shape it — the goal is a quote that reflects your real day, not a label on a spreadsheet.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/contact"
                className="rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
              >
                Check Availability
              </a>
              <a
                href="/reviews"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Read Reviews
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
