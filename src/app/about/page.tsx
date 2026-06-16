import type { Metadata } from "next";
import CTADuo from "@/components/cta-duo";
import { ImageSlot } from "@/components/image-slot";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SITE_IMAGE_ALT, SITE_IMAGES } from "@/config/site-images";
import { CTA_FINALE_SECTION_TOP, MAIN_SECTION_Y } from "@/lib/cta-section-spacing";

export const metadata: Metadata = {
  title: { absolute: "About Patrick | Squamish Sea-to-Sky Wedding DJ" },
  description:
    "Squamish-rooted wedding DJ for the corridor: production-trained sound, real venue familiarity, and reception pacing built around how mountain weddings actually move from vows to dance floor.",
  openGraph: {
    title: "About Patrick | Squamish Sea-to-Sky Wedding DJ",
    description:
      "Meet Patrick: corridor-native planning, atmosphere-first receptions, and dance floors shaped by room-reading, not a generic wedding playlist.",
    url: "/about",
  },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const credibility = [
    {
      label: "Formal training",
      title: "Certified in sound",
      text:
        "I graduated from the Ontario Institute of Audio Recording Technology, a foundation that runs from recording orchestras to sound design. That background also fed into post work on productions for Netflix and Disney. For your wedding, it means the music sits in a mix that is built, not guessed."
    },
    {
      label: "Wedding-day reliability",
      title: "Audio you can trust",
      text:
        "When something goes wrong with sound, the whole celebration can stall. I troubleshoot and solve problems before they reach your guests, so vows stay clear, speeches land, and the night keeps moving."
    },
    {
      label: "Beyond the playlist",
      title: "Reading the room",
      text:
        "This is not only about picking songs. It is transitions, pacing, and building energy: blending genres, handling requests on the fly, and keeping the floor connected from first dance to last song."
    },
    {
      label: "How couples describe it",
      title: "Calm, detail-driven, present",
      text:
        "People often say the day felt effortless, that I was the steady hand behind the scenes. I take that seriously: professional, adaptable, and focused on the small things that make the music feel human instead of mechanical."
    }
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.14),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20 lg:px-8 lg:py-24">
          <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start lg:gap-x-10 lg:gap-y-0">
            <div className="min-w-0 lg:max-w-xl xl:max-w-none">
              <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
                About Howe Sound DJ
              </div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Meet Patrick</div>
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                Your wedding DJ should feel like someone you are comfortable talking with, not a name on a vendor list.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 lg:max-w-none">
                I am Patrick, Squamish-rooted and focused on Sea-to-Sky weddings. I know how corridor venues breathe, how weekend traffic shapes the day, and how a reception moves from vows to a packed
                floor when the pacing is intentional. My job is not only to play music: it is to read the room, protect the moments that matter, and keep you calm while the night unfolds.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55 lg:max-w-none">
                Most couples start with a short conversation. No pitch deck, no pressure. Just clarity on whether the fit feels right.
              </p>
            </div>
            <div className="min-w-0 w-full lg:max-w-none lg:justify-self-end">
              <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-3 shadow-2xl shadow-black/40 lg:mx-0 lg:max-w-none">
                <ImageSlot
                  src={SITE_IMAGES.aboutPatrickConversation}
                  alt={SITE_IMAGE_ALT.aboutPatrickConversation}
                  aspect="4/5"
                  imageClassName="object-cover scale-[1.1] object-[80%_40%] md:scale-[1.06] md:object-[82%_42%]"
                  subtleBottomGradient
                  label="Patrick"
                  reservedHint="At the decks: calm, professional energy couples recognize on the day."
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="space-y-3"
                >
                  <span className="block text-center text-sm text-white/55">Patrick Mallan, Howe Sound DJ</span>
                </ImageSlot>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionReveal
        as="section"
        className={`${MAIN_SECTION_Y} mx-auto max-w-6xl border-t border-white/10 px-6 lg:px-8`}
      >
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">The story</div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            From a love of music to a focus on weddings in this corridor.
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            This started with a simple love of music. Over time it became something more specific: helping couples in Squamish, Whistler, and along the Sea-to-Sky build receptions that feel intentional,
            from quiet ceremony moments to dance floors that stay alive. I have worked across that range, and it is what keeps the planning sharp.
          </p>
          <p className="mt-4 text-lg leading-8 text-white/70">
            What has not changed is the through-line: your day should sound like you, not like a template. I show up ready to listen, learn how your venue and guest list behave, and execute so you can stay in
            the moment while I handle flow behind the mixer.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="border-y border-white/10 bg-white/5">
        <div className={`mx-auto max-w-6xl px-6 lg:px-8 ${MAIN_SECTION_Y}`}>
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              The approach
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              More than a playlist: hosting, pacing, and the flow of your day.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              I take time to understand your musical world: what you love, what you cannot stand, and the atmosphere you want guests to carry home. That includes how ceremony hands off to cocktails, when
              speeches should land, and when the room is ready to dance. Whether you are leaning into classic romance or a packed floor, we shape a soundtrack that reflects your vision.
            </p>
          </div>
          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Your style, front and center",
                text: "Must-plays, do-not-plays, and the in-between, aligned so the night feels personal, not performative."
              },
              {
                title: "Energy with judgment",
                text: "I build and release tension on the floor so peaks feel earned and quieter moments still feel full."
              },
              {
                title: "Rooted in Squamish",
                text: "I live and work in this corridor. Local venues, weekend logistics, and how Sea-to-Sky weddings actually run are part of how I plan with you, not an afterthought."
              }
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="premium-surface h-full rounded-[1.75rem] border border-white/10 bg-neutral-950/70 p-6">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/65">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className={`${MAIN_SECTION_Y} mx-auto max-w-6xl px-6 lg:px-8`}>
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Credibility
          </div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Why couples trust the technical side to hold up the emotional side.
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            You book a person, not a speaker stack. Still, when vows need to be heard and the floor needs to peak at the right moment, the background matters. Here is what sits behind the calm on the day.
          </p>
        </div>
        <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-2">
          {credibility.map((item) => (
            <StaggerItem key={item.title}>
              <div className="premium-surface h-full rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">{item.label}</div>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionReveal>

      <SectionReveal as="section" className="border-y border-white/10 bg-white/5">
        <div className={`mx-auto max-w-6xl px-6 lg:px-8 ${MAIN_SECTION_Y}`}>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Experience
              </div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Wedding dance floors that feel authentic, lively, and personal.
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                I have been across intimate gatherings and big receptions in this corridor. That range matters: you get someone who can adapt when the timeline shifts, when the crowd surprises you, or when
                a speech runs long and the night needs to recover its stride.
              </p>
              <p className="mt-4 text-lg leading-8 text-white/70">
                If that sounds like the kind of partner you want for your reception, the next step is simple: a conversation about your date, your venue, and the night you want to build together.
              </p>
            </div>
            <div className="premium-surface rounded-[2rem] border border-white/10 bg-neutral-950/70 p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                At a glance
              </div>
              <ul className="mt-8 space-y-4 text-sm leading-7 text-white/75">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  <span>15+ years working in music and live events</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  <span>OIART-trained audio foundation + real-world production experience</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  <span>Weddings across the Sea-to-Sky: Squamish, Whistler, and beyond</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  <span>Familiarity with Sea-to-Sky venues and how each setting shapes the evening</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  <span>Planning-forward process: clarity before the day, calm during it</span>
                </li>
              </ul>
            </div>
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
              If it feels aligned, let&apos;s talk.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Send your date, venue, and how you want the night to feel. I will reply with availability and a clear path to a short consult. No pressure, no generic pitch. Most couples know quickly whether
              the conversation feels comfortable.
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
