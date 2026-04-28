import type { Metadata } from "next";
import {
  BookConsultTrackedLink,
  bookConsultOutlineButtonClassName,
  bookConsultPrimaryButtonClassName,
} from "@/components/book-consult-tracked-link";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import { ImageSlot } from "@/components/image-slot";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SITE_IMAGE_ALT, SITE_IMAGES } from "@/config/site-images";
import { CTA_FINALE_SECTION_TOP, MAIN_SECTION_Y } from "@/lib/cta-section-spacing";

export const metadata: Metadata = {
  title: { absolute: "About Howe Sound DJ | Squamish Wedding DJ" },
  description:
    "Meet Patrick of Howe Sound DJ: Squamish wedding DJ with 15+ years in music, OIART-trained audio background, and a planning-forward approach for Sea-to-Sky weddings.",
  openGraph: {
    title: "About Howe Sound DJ | Squamish Wedding DJ",
    description:
      "Story, approach, and credibility: production-minded sound, local venue familiarity, and wedding dance floors built with intention.",
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
        "People often say the day felt effortless, that I was the steady hand behind the scenes. I take that seriously: professional, adaptable, and focused on the small things that make the music feel magical instead of mechanical."
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
                Music is how I connect. Weddings are where that connection matters most.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 lg:max-w-none">
                I am Patrick, the person behind Howe Sound DJ. More than fifteen years in music have taught me that the
                best nights are not loud for the sake of loud. They are honest to the couple, true to the room, and
                built with care long before the first guest arrives.
              </p>
            </div>
            <div className="min-w-0 w-full lg:max-w-none lg:justify-self-end">
              <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-3 shadow-2xl shadow-black/40 lg:mx-0 lg:max-w-none">
                <ImageSlot
                  src={SITE_IMAGES.aboutPatrickConversation}
                  alt={SITE_IMAGE_ALT.aboutPatrickConversation}
                  aspect="4/5"
                  imageClassName="object-[62%_45%] md:object-[68%_45%]"
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
            From a love of music to a focus on weddings.
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            This started with a simple love of music. Over time it became something more specific: crafting high-energy,
            personal experiences where every celebration feels intentional. I have worked with countless couples, each
            with their own story, from quiet ceremonies to full-scale receptions, and that range is what keeps the work
            sharp.
          </p>
          <p className="mt-4 text-lg leading-8 text-white/70">
            What has not changed is the through-line: your day should sound like you, not like a template. I show up ready
            to listen, plan with you, and execute so you can stay in the moment while I handle the flow behind the
            mixer.
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
              Tailored to your taste, and to the room.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              I take time to understand your musical world: what you love, what you cannot stand, and the atmosphere you want guests to carry home. Whether you are leaning into classic romance or a packed dance floor, we shape a soundtrack that reflects your vision and keeps people engaged from the first moment to the last.
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
                text: "I live and work in this corridor. Local venues and Sea-to-Sky logistics are part of how I plan, not an afterthought."
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
            Production background. Wedding-day instincts.
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            Couples book me for how the night feels, but the feel holds up because the technical side is solid. Here is what that looks like in practice.
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
                Specializing in wedding dance floors that feel authentic, lively, and personal.
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                I have been across intimate gatherings and big receptions. That range matters: you get someone who can adapt when the timeline shifts, when the crowd surprises you, or when a speech runs long and the night needs to recover its stride.
              </p>
              <p className="mt-4 text-lg leading-8 text-white/70">
                My job is to make the celebration feel extraordinary in a way that still sounds and feels like you. If that resonates, the next step is a conversation about your date, your venue, and the kind of night you want to build together.
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
              If it feels aligned, let&apos;s talk about your wedding.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Send your date, venue, and how you want the night to feel. I will follow up with availability and a clear path to a consultation, no pressure, no generic pitch.
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
                <CheckAvailabilityTrackedLink
                  surface="page_cta"
                  className={bookConsultOutlineButtonClassName}
                />
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
      </SectionReveal>
    </main>
  );
}
