import type { Metadata } from "next";
import "../../guides/article-liner-notes.css";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { ImageSlot } from "@/components/image-slot";
import { JsonLd } from "@/components/json-ld";
import { storyArticleBreadcrumbJsonLd, storyArticleJsonLd } from "@/lib/json-ld";
import { StoryArticleBlock as Block, StoryArticleHeader } from "../story-article-elements";

const STORY_SLUG = "what-a-sunwolf-riverside-wedding-reception-feels-like";
const STORY_TITLE = "What a Sunwolf Riverside Wedding Reception Feels Like";
const STORY_DATE = "2026-05-23";

const metaDesc =
  "Editorial reflection from Howe Sound DJ: why Sunwolf Riverside Resort receptions often feel strongest when the direction is focused, riverside ease builds into earned dance-floor energy, and the night stays one coherent arc.";

export const metadata: Metadata = {
  title: STORY_TITLE,
  description: metaDesc,
  openGraph: {
    images: ["/og-cake-party-v2.jpg"],
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
    images: ["/og-cake-party-v2.jpg"],
  },
  alternates: { canonical: `/stories/${STORY_SLUG}` },
};

export default function StorySunwolfRiversideReceptionPage() {
  return (
    <main className="hsdj-interior hsdj-editorial-page hsdj-story-detail-page hsdj-story-sunwolf min-h-screen bg-neutral-950 text-white">
      <JsonLd data={storyArticleBreadcrumbJsonLd(STORY_TITLE, STORY_SLUG)} />
      <JsonLd
        data={storyArticleJsonLd({
          slug: STORY_SLUG,
          headline: STORY_TITLE,
          description: metaDesc,
          datePublished: STORY_DATE,
        })}
      />

      <article className="hsdj-interior-flow">
        <StoryArticleHeader
          breadcrumbLabel="Sunwolf riverside"
          date={STORY_DATE}
          dateLabel="May 23, 2026"
          eyebrow="Editorial / atmosphere"
          title={STORY_TITLE}
          titleLines={["What a Sunwolf", "Riverside Wedding", "Reception Feels Like"]}
          tone="green"
          after={(
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/50">
              For planning specifics tied to the property, start with the{" "}
              <Link
                href="/venues/sunwolf"
                prefetch={false}
                className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
              >
                Sunwolf Riverside Resort venue guide
              </Link>
              .
            </p>
          )}
        >
          This is not a recap of a named wedding. It is an observational piece about a pattern that shows up often in Squamish: receptions that feel complete because the emotional arc was shaped with
          care, not because the clock was pushed as late as possible.
        </StoryArticleHeader>

        <div className="border-b border-white/10 bg-neutral-950">
          <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
            <ImageSlot
              src="/images/stories/sunwolf-riverside-resort-dj.webp"
              alt="DJ Patrick from Howe Sound DJ performing at a wedding reception inside the riverside tent at Sunwolf Riverside Resort in Squamish, BC."
              aspect="16/9"
              label="Sunwolf Riverside Resort"
              reservedHint="Wedding reception at Sunwolf Riverside Resort in Brackendale, Squamish."
              sizes="(max-width: 1024px) 100vw, 56rem"
              imageClassName="object-[center_42%]"
              premiumPhotoTreatment
            >
              <span className="block text-white/60">Wedding reception at Sunwolf Riverside Resort in Brackendale, Squamish.</span>
            </ImageSlot>
          </div>
        </div>

        <Block eyebrow="Observation" title="When the night feels earned, not extended">
          <p>
            Some of the strongest receptions in the corridor are remembered for how they moved, not how long they ran. Guests talk about the turn into dancing, the song that unlocked the room, the way the
            evening felt like one story. That memory rarely comes from sheer hours. It comes from pacing that respected where people actually were emotionally.
          </p>
          <p>
            Longer is not automatically better. Louder is not automatically better. Later is not automatically better. What matters is whether the celebration had a shape: space where the day needed it, lift
            where lift was ready, and a dance section that arrived because the room had been listening, not because a schedule insisted.
          </p>
        </Block>

        <Block eyebrow="Setting" title="What the riverside does before the first dance">
            <p>
              Sunwolf Riverside Resort sits in Brackendale with the river and lodge character already doing emotional work. Guests often arrive softer than they would at a downtown ballroom: more
              connected to daylight, more willing to stand outside, more settled into conversation before anyone asks them to perform celebration.
            </p>
            <p>
              That grounding is an asset. It also sets expectations. The reception should not fight the ease that brought people there. Music and hosting work best when they honor the transition from
              open air and river light into an evening that still feels human, not like the day was reset to “party mode” on a timer.
            </p>
        </Block>

        <Block eyebrow="Arc" title="Recognition before intensity">
          <p>
            The arc that tends to work here looks like trust built in layers: ceremony and cocktail sound that stays clear and warm, dinner and toasts that hold attention without draining the room, then a
            dance chapter that opens when your crowd is actually ready to move.
          </p>
          <p>
            That is the same discipline described in the{" "}
            <Link
              href="/guides/how-to-keep-a-wedding-dance-floor-packed"
              prefetch={false}
              className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
            >
              Roomflow Method
            </Link>
            : recognition before intensity, transitions that feel like bridges, momentum that stays human. At a riverside resort, skipping those layers often produces a floor that looks busy but feels
            thin, because guests never fully arrived emotionally.
          </p>
        </Block>

        <Block eyebrow="Focus" title="Why a concentrated celebration can feel fuller than a marathon">
            <p>
              When dancing is treated as a concentrated chapter rather than an open-ended push, energy compresses. People stay present. The peak lands while guests still have something left to give. Ending
              while the room still feels alive is different from stopping early; it is stopping at the right emotional altitude.
            </p>
            <p>
              That is not an argument against high energy. It is an argument for high energy with intention. A focused reception can still be loud, sweaty, and joyful. It simply refuses to borrow
              tomorrow’s exhaustion to pay for tonight’s volume.
            </p>
        </Block>

        <Block eyebrow="Reading" title="What good room-reading looks like in practice">
          <p>
            Room-reading is visible in the small choices: whether cocktail background supports conversation, whether the first dance and parent moments get tonal care, whether the handoff from speeches
            into dancing feels like permission, whether volume rises because the crowd invited it.
          </p>
          <p>
            Forcing the floor early is a common mistake in beautiful settings. Guests are still metabolizing the day. Waiting without intention is the other mistake: energy drifts toward coats and
            goodbyes. The skill is noticing when the collective breath has turned toward celebration, then protecting that turn with song choice and transitions that match who is actually in front of you.
          </p>
        </Block>

        <Block eyebrow="Corridor" title="Squamish rhythm and venue familiarity">
            <p>
              Brackendale sits on the same weekend map as the rest of Squamish work: corridor traffic, mixed local and travel guests, weather and light that can nudge timelines without announcing it on
              the run-of-show. A DJ who plans in this lane is not discovering those realities on your clock.
            </p>
            <p>
              The{" "}
              <Link href="/squamish-wedding-dj" prefetch={false} className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                Squamish-rooted planning lens
              </Link>{" "}
              is one way to name that posture. For contrast with ridge-line elevation and faster light changes, the companion read on{" "}
              <Link
                href="/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like"
                prefetch={false}
                className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
              >
                Sea to Sky Gondola atmosphere
              </Link>{" "}
              explores a different environmental cue set. Riverside receptions reward patience with intimacy; mountaintop receptions reward patience with awe.
            </p>
        </Block>

        <Block eyebrow="Memory" title="Coherence beats duration">
          <p>
            The receptions people carry home are often the coherent ones: one arc from arrival through last song, atmosphere and pacing doing more work than the clock. At a setting like Sunwolf Riverside
            Resort, that coherence is already half-written by the place. The rest is whether the music and hosting complete the story or interrupt it.
          </p>
          <p>
            If that shape sounds like how you want your own day to feel, the planning conversation is the same across the site: bring your rough timeline, your crowd, and how you want the turn into dancing
            to land. No perfect brief required.
          </p>
        </Block>

        <Block eyebrow="Related" title="Planning links that pair with this read">
          <p>
            <Link href="/venues/sunwolf" prefetch={false} className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              Sunwolf Riverside Resort
            </Link>
            : named-setting flow and pacing questions.{" "}
            <Link href="/guides/how-to-choose-a-wedding-dj-in-squamish" prefetch={false} className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              How to Choose a Wedding DJ in Squamish
            </Link>
            : decision support without hype.{" "}
            <Link
              href="/stories/sea-to-sky-wedding-dance-floor-energy"
              prefetch={false}
              className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
            >
              High-energy corridor dance floors
            </Link>
            : companion editorial on momentum once the room is ready.
          </p>
        </Block>

        <section className="border-t border-white/10 bg-gradient-to-b from-amber-300/10 to-transparent">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
            <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 lg:p-12">
              <div className="mx-auto w-full max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">When the details matter</div>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">If this pacing sounds like your day</h2>
                <p className="mt-4 text-lg leading-8 text-white/70">
                  Check your date first. If it is available, book a consult and bring your venue, your rough timeline, and how you want guests to feel when the river day turns into evening. No need for a perfect
                  brief.
                </p>
                <div className="mt-8 max-w-xl space-y-4">
                  <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
                  <p className="text-sm text-white/45">
                    <Link href="/stories" prefetch={false} className="font-medium text-amber-200/85 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                      Back to Stories
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
