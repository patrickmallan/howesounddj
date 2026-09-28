import type { Metadata } from "next";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { ImageSlot } from "@/components/image-slot";
import { SITE_IMAGE_ALT, SITE_IMAGES } from "@/config/site-images";
import { JsonLd } from "@/components/json-ld";
import { storyArticleBreadcrumbJsonLd, storyArticleJsonLd } from "@/lib/json-ld";
import { StoryArticleBlock as Block, StoryArticleHeader } from "../story-article-elements";
import "../../guides/article-liner-notes.css";

const STORY_SLUG = "sea-to-sky-wedding-dance-floor-energy";
const STORY_TITLE = "What a Packed Sea-to-Sky Wedding Dance Floor Feels Like";
const STORY_DATE = "2026-05-08";

const metaDesc =
  "Observational editorial on how Sea-to-Sky wedding dance floors get packed: guest trust, dinner-to-dance pacing, and mountain reception momentum from Howe Sound DJ.";

export const metadata: Metadata = {
  title: STORY_TITLE,
  description: metaDesc,
  openGraph: {
    images: ["/og-share.jpg"],
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

export default function StorySeaToSkyDanceFloorEnergyPage() {
  return (
    <main className="hsdj-interior hsdj-editorial-page hsdj-story-detail-page hsdj-story-floor min-h-screen bg-neutral-950 text-white">
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
          breadcrumbLabel="Dance floor energy"
          date={STORY_DATE}
          dateLabel="May 8, 2026"
          eyebrow="Editorial / proof"
          title={STORY_TITLE}
          titleLines={["What a Packed", "Sea-to-Sky Wedding", "Dance Floor Feels Like"]}
          tone="pink"
        >
          This is not a recap of one specific wedding. It is an observational editorial about how Patrick opens a Sea-to-Sky dance floor: he invites the whole room into the final formal dance,
          so the party begins together rather than waiting for one brave guest to step out first.
        </StoryArticleHeader>

        <div className="border-b border-white/10 bg-neutral-950">
          <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
            <ImageSlot
              src={SITE_IMAGES.brandEditorialPremiumDjCrowd}
              alt={SITE_IMAGE_ALT.brandEditorialPremiumDjCrowd}
              aspect="16/9"
              label="Editorial atmosphere"
              reservedHint="Brand atmosphere imagery."
              sizes="(max-width: 1024px) 100vw, 56rem"
              imageClassName="object-[center_45%]"
              premiumPhotoTreatment
            >
              <span className="block text-white/60">Atmosphere-first reception energy, designed to feel elegant before it feels loud.</span>
              <span className="mt-2 block text-xs text-white/40">
                Editorial brand atmosphere, not documentary proof of a specific wedding.
              </span>
            </ImageSlot>
          </div>
        </div>

        <Block eyebrow="Sensation" title="What guests actually experience">
          <p>
            A strong Sea-to-Sky dance floor does not begin with Patrick waiting for someone to be brave. During the last formal dance, often the mother-son dance, he invites every guest to join the couple.
            When the first party track lands, the floor is already full.
          </p>
          <p>
            High energy in this context is social, not chaotic. It is the moment guests stop scanning the exits and start leaning in because the soundtrack finally matches who they are together.
          </p>
        </Block>

        <Block eyebrow="Bridge" title="How this connects to reviews and imagery">
            <p>
              Named couple feedback on the{" "}
              <Link href="/reviews" prefetch={false} className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                reviews page
              </Link>{" "}
              describes packed floors, clear communication, and seamless ceremony-through-reception flow. Those lines are real voices, not marketing adjectives.
            </p>
            <p>
              Site photography shows celebration energy in a general, respectful way. As more licensed, couple-approved imagery becomes available, this stories hub will host specific moments without
              fabricating names or venues.
            </p>
        </Block>

        <Block eyebrow="Method" title="Roomflow Method, in plain language">
          <p>
            The{" "}
            <Link
              href="/guides/how-to-keep-a-wedding-dance-floor-packed"
              prefetch={false}
              className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
            >
              Roomflow Method
            </Link>{" "}
            is how Howe Sound DJ thinks about keeping that full floor moving: emotional pacing, recognition before intensity, transitions as bridges, and momentum that stays human. That philosophy is what this
            editorial is trying to describe in feeling, not in gear lists.
          </p>
        </Block>

        <Block eyebrow="Arc" title="The Atmosphere Arc on the floor">
            <p>
              The{" "}
              <strong className="text-white/90">Atmosphere Arc</strong> treats ceremony, cocktails, dinner, speeches, and dancing as one experience. When the arc is coherent, the dance section does not
              need tricks. It needs continuity: guests recognize the night as theirs, so they stay.
            </p>
        </Block>

        <Block eyebrow="Services" title="How the services connect">
          <p>
            If you want the full scope of ceremony-through-reception support, start with{" "}
            <Link href="/weddings" prefetch={false} className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              wedding DJ services
            </Link>{" "}
            and then reach out when you are ready to talk dates and venues.
          </p>
          <p>
            Named Sea-to-Sky settings live in the{" "}
            <Link href="/venues" prefetch={false} className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              venue guides
            </Link>
            .             For an editorial read on how elevation and light shape reception pacing at the{" "}
            <Link
              href="/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like"
              prefetch={false}
              className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
            >
              Sea to Sky Gondola
            </Link>
            , see the companion story. For focused riverside pacing at{" "}
            <Link
              href="/stories/what-a-sunwolf-riverside-wedding-reception-feels-like"
              prefetch={false}
              className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
            >
              Sunwolf Riverside Resort
            </Link>
            , see the Brackendale editorial. Squamish-first commercial context sits in the{" "}
            <Link href="/squamish-wedding-dj" prefetch={false} className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              Squamish wedding DJ
            </Link>{" "}
            pillar. More Squamish wedding stories live in the{" "}
            <Link href="/stories" prefetch={false} className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              stories hub
            </Link>
            .
          </p>
        </Block>

        <section className="border-t border-white/10 bg-gradient-to-b from-amber-300/10 to-transparent">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
            <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 lg:p-12">
              <div className="mx-auto w-full max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Next step</div>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">See if your day fits this shape</h2>
                <p className="mt-4 text-lg leading-8 text-white/70">
                  When you want this kind of atmosphere for your own wedding, check your date first. If it is available, book a consult and see whether working together feels right.
                </p>
                <div className="mt-8 max-w-xl space-y-4">
                  <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
                  <p className="text-sm text-white/45">
                    <Link href="/contact" prefetch={false} className="font-medium text-amber-200/85 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                      Contact
                    </Link>{" "}
                    for details-first questions.
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
