import type { Metadata } from "next";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { CTA_FINALE_SECTION_TOP } from "@/lib/cta-section-spacing";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Wedding DJ FAQ for Howe Sound DJ: music and playlists, planning and consultation, ceremony and reception support, travel, venues, and optional enhancements.",
  openGraph: {
    title: "FAQ | Howe Sound DJ",
    description:
      "Straight answers on personalized music, timelines, MC support, Sea-to-Sky coverage, and what makes the experience different.",
    url: "/faq",
  },
  alternates: { canonical: "/faq" },
};

type FaqItem = {
  q: string;
  a: string;
};

type FaqGroup = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: FaqItem[];
};

function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-[1.5rem] border border-white/10 bg-white/5 transition hover:border-white/15"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left text-base font-semibold leading-snug text-white outline-none marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 flex-1">{item.q}</span>
            <span
              className="mt-0.5 shrink-0 text-amber-300/90 transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>
          <div className="border-t border-white/10 px-6 pb-5 pt-1">
            <p className="text-sm leading-7 text-white/65">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export default function FaqPage() {
  const groups: FaqGroup[] = [
    {
      id: "music",
      eyebrow: "Music + Personalization",
      title: "Your taste, your crowd, not a generic wedding formula.",
      intro:
        "Customized playlists shaped around your story, not a generic wedding formula.",
      items: [
        {
          q: "Can we request songs and create a do-not-play list?",
          a: "Yes. The planning process is designed to help shape the soundtrack around your taste while protecting the energy of the room, reflecting what you love while still creating a great experience for the room as a whole."
        },
        {
          q: "Is this going to feel like every other wedding playlist?",
          a: "Patrick leads with a clear point of view: no overplayed wedding fluff, no autopilot playlists, just dancefloor-packing tracks. The work is tailored to your style and preferences: your musical tastes and the atmosphere you want, not a generic formula."
        },
        {
          q: "What kind of music can you actually cover?",
          a: "Weddings are the focus, but the range runs from Top 40 to Soca and Dancehall, Country, Latin and Global Fusion, ecstatic dance, House and EDM, and family-friendly dance floors. That breadth is part of reading different crowds, especially yours."
        }
      ]
    },
    {
      id: "planning",
      eyebrow: "Planning + Process",
      title: "Clear communication before the day, less guesswork when it counts.",
      intro:
        "Seamless planning means fast replies, clear communication, and zero guesswork, the same rhythm couples describe when they talk about calm, professional, yet personable communication that made the day stress-free.",
      items: [
        {
          q: "How does planning work before the wedding?",
          a: "Depending on your package, pre-event planning can include consultation, Zoom calls, venue walkthroughs, and a custom event timeline, so the day is mapped before you step into the venue."
        },
        {
          q: "Can you help with the flow of the evening?",
          a: "Yes. DJ support is not just about music. It also includes helping the night feel smooth, well-paced, and stress-reduced. That sits alongside reading the room, managing transitions, and building energy, not only song selection."
        },
        {
          q: "What happens in the first consultation?",
          a: "It is the entry point before locking in date and logistics: a chance to talk through the wedding, the sound plan, and how the musical experience should feel, the same “free DJ chat” or consultation Patrick invites couples to on the live site."
        }
      ]
    },
    {
      id: "ceremony",
      eyebrow: "Ceremony + Reception Support",
      title: "From the walk down the aisle to the last song.",
        intro:
        "Full-day wedding coverage is ceremony plus reception, with premium sound and lighting for each phase, and couples often mention seamless handling of ceremony, cocktail hour, and reception in reviews.",
      items: [
        {
          q: "Do you provide ceremony audio and microphones?",
          a: "Yes. Ceremony coverage can include speaker setup and microphones for the officiant, vows, and key announcements, scaled to what your day actually requires."
        },
        {
          q: "Do you cover cocktail hour and dinner, not only the dance floor?",
          a: "Full wedding coverage runs from the walk down the aisle to the last dance: ceremony, cocktail hour, dinner, and dance floor, one cohesive arc rather than a reception-only bolt-on."
        },
        {
          q: "Do you MC as well?",
          a: "MC support can be included where needed to help the evening feel smooth, clear, and professionally guided, including transitions, introductions, and announcements when your run-of-show calls for it."
        }
      ]
    },
    {
      id: "travel",
      eyebrow: "Travel + Venue + Logistics",
      title: "Sea-to-Sky roots, and familiarity where you are getting married.",
        intro:
        "Patrick describes being rooted in Squamish: knowing the venues, the vendors, and the vibe, with preferred relationships at popular regional venues and repeat experience at top Squamish wedding locations.",
      items: [
        {
          q: "Do you travel beyond Squamish?",
          a: "Yes. Weddings in Whistler, Vancouver, and across the Sea-to-Sky corridor can be accommodated depending on date and logistics."
        },
        {
          q: "Do you know our venue already?",
          a: "Couples often book for local familiarity, including pre-wedding meetings at the venue when logistics make sense. Patrick describes being rooted in Squamish: knowing the venues, the vendors, and the vibe of the corridor."
        },
        {
          q: "How is sound handled on the day?",
          a: "Equipment is chosen for clarity and dynamic range, from soft ballads to full dance tracks, with meticulous setup, speaker positioning, calibration, and level management so ceremony, speeches, and the party sound balanced and immersive."
        }
      ]
    },
    {
      id: "enhancements",
      eyebrow: "Enhancements + Add-ons",
      title: "Optional layers when you want more than the core package.",
        intro:
        "Custom services include event enhancements such as extra lighting or sound tailored to how you want guests to hear and remember the celebration.",
      items: [
        {
          q: "What add-ons or enhancements are available?",
          a: "Options include additional dance floor lighting, extra speaker setups, video edits, photo booth add-on, silent disco setup, audio messages from absent loved ones, and custom-mixed tracks for grand entrances and formal dances, discussed during planning so they align with your timeline and vendors."
        },
        {
          q: "Is lighting or extra gear always required?",
          a: "Not always. Packages already describe premium sound and lighting for weddings; enhancements are there when your venue, guest count, or creative plan calls for more coverage or atmosphere."
        }
      ]
    }
  ];

  const differentiators = [
    {
      title: "Bangers only, no autopilot",
      text: "No overplayed wedding fluff, no autopilot playlists. Just dancefloor-packing tracks."
    },
    {
      title: "Personalized, not prefab",
      text: "Tailoring every aspect of the DJ service to match the vibe of your wedding and the music you love, from elegant ceremonies to high-energy receptions."
    },
    {
      title: "Sound treated like production",
      text: "Patrick’s background includes formal audio training (Ontario Institute of Audio Recording Technology) and real-world production experience, so the job is not only song selection but managing clarity, transitions, and problems before they derail the moment."
    },
    {
      title: "More than a playlist",
      text: "Reading the room, managing transitions, building energy: blending genres and handling requests on the fly so the celebration keeps flowing."
    },
    {
      title: "Communication you can feel on the day",
      text: "Reviews consistently name calm, professional, personable communication, the kind that pairs with fast replies and clear planning before you ever step into the venue."
    }
  ];

  const faqStructuredData = groups.flatMap((g) => g.items);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <JsonLd data={faqPageJsonLd(faqStructuredData)} />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.14),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
              FAQ
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Answers before you ask
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Straight answers, so you can book with confidence.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Most hesitation comes from not knowing how the process works. These answers mirror what Patrick emphasizes in his own words: personalized music, clear planning, professional sound, and a Sea-to-Sky approach rooted in real venues and real weddings, not a generic DJ script.
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

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 lg:p-10">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Why these questions matter
            </div>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              A great wedding DJ is not only music. It is planning, communication, and execution.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              The through-line is consistent: DJ support includes helping the night feel smooth and well-paced; sound is managed from positioning speakers through the last dance; and couples book Patrick because the experience feels{" "}
              <span className="text-white/85">personalized, local, and dialed-in</span>, not like a generic playlist.
            </p>
          </div>
        </div>
      </SectionReveal>

      <div className="space-y-0">
        {groups.map((group, groupIndex) => (
          <SectionReveal
            key={group.id}
            as="section"
            id={group.id}
            className={
              groupIndex % 2 === 0
                ? "border-y border-white/10 bg-white/5"
                : "border-b border-white/10 bg-neutral-950"
            }
          >
            <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
              <div className="max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{group.eyebrow}</div>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{group.title}</h2>
                <p className="mt-4 text-lg leading-8 text-white/70">{group.intro}</p>
              </div>
              <div className="mt-10">
                <FaqAccordion items={group.items} />
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            What makes Howe Sound DJ different
          </div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Not your average wedding DJ, on purpose.
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            These themes come straight from how Patrick describes the work, tightened for scanning, not rewritten into bland filler.
          </p>
        </div>
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <StaggerItem key={item.title}>
              <div className="premium-surface h-full rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionReveal>

      <SectionReveal
        as="section"
        className={`${CTA_FINALE_SECTION_TOP} mx-auto max-w-6xl px-6 pb-20 lg:px-8`}
      >
        <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Still deciding?
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              You do not need a perfect plan to start the conversation.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Reach out with your date, your venue, and a rough sense of how you want the night to feel. The first conversation is there to turn that into a clear path, not to pressure you into a snap decision.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/55">
              If you already know your venue,{" "}
              <Link href="/venues" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                venue guides
              </Link>{" "}
              outline planning context for named Sea-to-Sky and Squamish settings, without replacing a real conversation about your day.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
              <p className="text-sm leading-relaxed text-white/60">
                15 minutes &bull; No pressure &bull; Just clarity
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
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
