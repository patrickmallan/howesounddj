import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { ImageSlot } from "@/components/image-slot";
import { SectionReveal } from "@/components/motion";
import { SITE_IMAGE_ALT, SITE_IMAGES } from "@/config/site-images";
import { CTA_FINALE_SECTION_TOP } from "@/lib/cta-section-spacing";
import { JsonLd } from "@/components/json-ld";
import { storyArticleBreadcrumbJsonLd, storyArticleJsonLd } from "@/lib/json-ld";

const STORY_SLUG = "what-a-sea-to-sky-gondola-dance-floor-feels-like";
const STORY_TITLE = "What a Sea to Sky Gondola Dance Floor Feels Like";
const STORY_DATE = "2026-05-10";

const metaDesc =
  "Editorial observation from Howe Sound DJ: how elevation, light, and Sea-to-Sky atmosphere shape reception pacing, guest trust, and the arc from ceremony to dancing, without recounting a specific wedding.";

export const metadata: Metadata = {
  title: STORY_TITLE,
  description: metaDesc,
  openGraph: {
    title: `${STORY_TITLE} | Howe Sound DJ`,
    description: metaDesc,
    url: `/stories/${STORY_SLUG}`,
    type: "article",
    publishedTime: STORY_DATE,
  },
  twitter: {
    card: "summary_large_image",
    title: `${STORY_TITLE} | Howe Sound DJ`,
    description: metaDesc,
    images: ["/og-share.jpg"],
  },
  alternates: { canonical: `/stories/${STORY_SLUG}` },
};

function Block({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{eyebrow}</div>
      <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">{title}</h2>
      <div className="mt-6 space-y-4 text-lg leading-8 text-white/70">{children}</div>
    </section>
  );
}

export default function StorySeaToSkyGondolaDanceFloorPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <JsonLd data={storyArticleBreadcrumbJsonLd(STORY_TITLE, STORY_SLUG)} />
      <JsonLd
        data={storyArticleJsonLd({
          slug: STORY_SLUG,
          headline: STORY_TITLE,
          description: metaDesc,
          datePublished: STORY_DATE,
        })}
      />

      <article>
        <header className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.12),transparent_55%)]" />
          <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
            <nav className="text-sm text-white/45" aria-label="Breadcrumb">
              <Link href="/" className="transition hover:text-white/70">
                Home
              </Link>
              <span className="mx-2 text-white/25" aria-hidden>
                /
              </span>
              <Link href="/stories" className="transition hover:text-white/70">
                Stories
              </Link>
              <span className="mx-2 text-white/25" aria-hidden>
                /
              </span>
              <span className="text-white/65">Gondola atmosphere</span>
            </nav>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">Editorial / atmosphere</p>
            <p className="mt-3 text-sm text-white/45">
              <time dateTime={STORY_DATE}>May 10, 2026</time>
              <span className="mx-2 text-white/25" aria-hidden>
                ·
              </span>
              Howe Sound DJ
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">{STORY_TITLE}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              This is not a recap of a named wedding. It is an observational piece about what changes when you celebrate on a ridge above Howe Sound: how guests arrive emotionally, how the landscape
              does part of the storytelling, and why the path into dancing often looks different here than in a ground-level ballroom.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/50">
              For planning specifics tied to the property, start with the{" "}
              <Link
                href="/venues/sea-to-sky-gondola"
                className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
              >
                Sea to Sky Gondola venue guide
              </Link>
              .
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
              <p className="text-sm leading-relaxed text-white/60">
                45 minutes &bull; No pressure &bull; Just clarity
              </p>
            </div>
          </div>
        </header>

        <div className="border-b border-white/10 bg-neutral-950">
          <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
            <ImageSlot
              src={SITE_IMAGES.brandEditorialDocumentaryDanceFloor}
              alt={SITE_IMAGE_ALT.brandEditorialDocumentaryDanceFloor}
              aspect="16/9"
              label="Editorial atmosphere"
              reservedHint="Mountain-corridor reception mood, not a documentary frame from a private event."
              sizes="(max-width: 1024px) 100vw, 56rem"
              imageClassName="object-[center_40%]"
              premiumPhotoTreatment
              priority
            >
              <span className="block text-white/60">Elevation changes light, sound, and how quickly the room loosens.</span>
              <span className="mt-2 block text-xs text-white/40">
                Editorial brand atmosphere, not proof of a specific couple or date.
              </span>
            </ImageSlot>
          </div>
        </div>

        <Block eyebrow="Arrival" title="The emotional setup guests carry in">
          <p>
            People do not arrive at a ridge-line reception the way they arrive at a downtown hotel. They have often ridden up together, felt wind and height, taken photos against a horizon that already
            feels like a milestone. The day carries a little more awe before anyone has touched a dance floor. Awe is not the same as readiness to move.
          </p>
          <p>
            That is the first emotional truth: the setting front-loads significance. Music and hosting work best when they respect that guests may need a slower arc from spectacle to intimacy to
            release, not a compressed timeline that treats the view as background noise.
          </p>
        </Block>

        <SectionReveal as="div" className="border-y border-white/10 bg-white/[0.03]">
          <Block eyebrow="Altitude" title="Why mountain receptions feel different after sundown">
            <p>
              Light falls faster in the trees and on the rock. Temperature shifts. Jackets appear. The same schedule on paper can feel shorter or longer depending on how the air moves and how speeches
              sit against the darkening sky. A reception here is not only a party; it is a sequence of small environmental cues that tell everyone the day is turning a corner.
            </p>
            <p>
              After dark, the corridor feels quieter in the distance and louder in the room. That contrast can make dancing arrive as relief: as warmth shared in one place while the mountains sit
              outside as a calm witness. The floor does not need to shout if the night has already earned attention.
            </p>
          </Block>
        </SectionReveal>

        <Block eyebrow="Threshold" title="The transition into dancing">
          <p>
            In settings like this, dancing often begins as permission rather than command. Guests loosen when they trust the person steering sound, when transitions feel human, when volume respects
            conversation, and when the first tracks recognize who is actually in the room rather than a generic wedding arc.
          </p>
          <p>
            The bridge from dinner or speeches into movement is where many mountain weddings succeed or stall. Rush it, and the room feels performative. Wait too long without intention, and energy
            dissipates into coats and goodbyes. The skill is reading when the collective breath has turned toward celebration.
          </p>
        </Block>

        <SectionReveal as="div" className="border-y border-white/10 bg-white/[0.03]">
          <Block eyebrow="Trust" title="Guest trust and the Roomflow Method">
            <p>
              The{" "}
              <Link
                href="/guides/how-to-keep-a-wedding-dance-floor-packed"
                className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
              >
                Roomflow Method
              </Link>{" "}
              is a language for that permission: recognition before intensity, transitions that feel like bridges, momentum that stays human. At elevation, trust is even more visible. There is nowhere to
              hide a clumsy handoff. When the arc is coherent, guests feel invited, not instructed.
            </p>
          </Block>
        </SectionReveal>

        <Block eyebrow="Arc" title="The Atmosphere Arc in one continuous evening">
          <p>
            Ceremony clarity, cocktail warmth, dinner pacing, and the celebration chapter are one story. When a Sea-to-Sky day is treated as separate “segments” stitched together, guests feel the
            seams. When it is treated as a single arc, the dance section feels like the natural next page, not a bolt-on finale.
          </p>
        </Block>

        <SectionReveal as="div" className="border-y border-white/10 bg-white/[0.03]">
          <Block eyebrow="Place" title="Why local familiarity matters on this corridor">
            <p>
              The highway, the weather windows, load-in reality, and how Squamish weekends actually breathe. All of that shapes what is reasonable to expect from a timeline. Someone who plans in this lane
              is not discovering those constraints on your clock. For couples marrying in Squamish and nearby mountain settings, that calm operational literacy is part of the emotional safety guests pick
              up on without knowing the vocabulary.
            </p>
            <p>
              The{" "}
              <Link href="/squamish-wedding-dj" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                Squamish-rooted planning lens
              </Link>{" "}
              is one way to name that posture; destination weekends further up the highway layer in the{" "}
              <Link href="/whistler-wedding-dj" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                Whistler wedding DJ
              </Link>{" "}
              framing when the guest list behaves like a full mountain weekend.
            </p>
          </Block>
        </SectionReveal>

        <Block eyebrow="Related" title="Planning links that pair with this read">
          <p>
            <Link href="/venues/sea-to-sky-gondola" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              Sea to Sky Gondola
            </Link>
            : named-setting flow and sound-thinking questions.{" "}
            <Link href="/guides/how-to-choose-a-wedding-dj-in-squamish" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              How to Choose a Wedding DJ in Squamish
            </Link>
            : decision support without hype.{" "}
            <Link
              href="/stories/sea-to-sky-wedding-dance-floor-energy"
              className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
            >
              High-energy corridor dance floors
            </Link>
            : companion editorial on how Sea-to-Sky momentum can feel on the floor.
          </p>
        </Block>

        <SectionReveal
          as="section"
          className={`${CTA_FINALE_SECTION_TOP} border-t border-white/10 bg-gradient-to-b from-amber-300/10 to-transparent`}
        >
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
            <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 lg:p-12">
              <div className="mx-auto w-full max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">When the fit matters</div>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">If this atmosphere sounds like your day</h2>
                <p className="mt-4 text-lg leading-8 text-white/70">
                  The same consult and availability paths apply across the site. Bring your venue, your rough timeline, and how you want guests to feel when the light changes. No need for a perfect
                  brief.
                </p>
                <div className="mt-8 max-w-xl space-y-4">
                  <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
                  <p className="text-sm leading-relaxed text-white/60">
                    45 minutes &bull; No pressure &bull; Just clarity
                  </p>
                  <p className="text-sm text-white/45">
                    <Link href="/stories" className="font-medium text-amber-200/85 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                      Back to Stories
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </article>
    </main>
  );
}
