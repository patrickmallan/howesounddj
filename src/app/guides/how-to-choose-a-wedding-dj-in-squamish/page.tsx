import type { Metadata } from "next";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { AuthorityProofStrip } from "@/components/authority-proof-strip";
import { JsonLd } from "@/components/json-ld";
import { guideArticleBreadcrumbJsonLd, guideArticleJsonLd } from "@/lib/json-ld";
import { GuideArticleBlock as Block, GuideArticleHeader } from "../guide-article-elements";
import "../article-liner-notes.css";

const ARTICLE_SLUG = "how-to-choose-a-wedding-dj-in-squamish";
const ARTICLE_TITLE = "How to Choose a Wedding DJ in Squamish";
const ARTICLE_DATE = "2026-05-08";

const metaDesc =
  "A practical guide to choosing a Squamish wedding DJ, including what to ask about ceremony sound, reception flow, room-reading, and Sea-to-Sky wedding atmosphere.";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description: metaDesc,
  openGraph: {
    images: ["/og-share.jpg"],
    title: `${ARTICLE_TITLE} | Howe Sound DJ`,
    description: metaDesc,
    url: `/guides/${ARTICLE_SLUG}`,
    type: "article",
    publishedTime: ARTICLE_DATE,
  },
  twitter: {
    card: "summary_large_image",
    title: `${ARTICLE_TITLE} | Howe Sound DJ`,
    description: metaDesc,
    images: ["/og-share.jpg"],
  },
  alternates: { canonical: `/guides/${ARTICLE_SLUG}` },
};

export default function GuideChooseWeddingDjSquamishPage() {
  return (
    <main className="hsdj-interior hsdj-editorial-page hsdj-guide-choose min-h-screen bg-neutral-950 text-white">
      <JsonLd data={guideArticleBreadcrumbJsonLd(ARTICLE_TITLE, ARTICLE_SLUG)} />
      <JsonLd
        data={guideArticleJsonLd({
          slug: ARTICLE_SLUG,
          headline: ARTICLE_TITLE,
          description: metaDesc,
          datePublished: ARTICLE_DATE,
        })}
      />

      <article className="hsdj-interior-flow">
        <GuideArticleHeader
          breadcrumbLabel="Choose a DJ in Squamish"
          date={ARTICLE_DATE}
          dateLabel="May 8, 2026"
          title={ARTICLE_TITLE}
          titleLines={["How to choose a", "wedding DJ in", "Squamish"]}
          tone="yellow"
        >
          Choosing a wedding DJ is not only about songs. It is about trust, timing, sound, guest momentum, and whether the person in front of you understands the atmosphere you want for a Squamish or
          Sea-to-Sky celebration.
        </GuideArticleHeader>

        <Block eyebrow="Place" title="Look for someone who understands the venue, not just the playlist">
          <p>
            Squamish and corridor venues carry real constraints: outdoor ceremony wind, tent lines, lodge acoustics, guest travel, and how the night actually breathes. A strong DJ should speak clearly
            about how sound supports your setting, not only about genres they like.
          </p>
          <p>
            Use the{" "}
            <Link href="/venues" prefetch={false} className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              venue guides
            </Link>{" "}
            as a conversation starter. If your shortlist DJ cannot discuss flow in plain language, keep interviewing.
          </p>
        </Block>

        <AuthorityProofStrip heading="What past clients emphasize" />

        <Block eyebrow="Flow" title="Ask how they handle ceremony, speeches, dinner, and dancing">
          <p>
            These are one emotional arc. Ask how they protect vow audio, how they transition into cocktail warmth, how dinner volume supports conversation, and how speeches stay intelligible before
            dancing opens.
          </p>
          <p>
            That mindset is the{" "}
            <strong className="text-white/90">Atmosphere Arc</strong>: ceremony sound, cocktail warmth, dinner pacing, speeches, and dance floor momentum as a single experience. It should feel
            intentional on paper before the wedding day.
          </p>
        </Block>

        <Block eyebrow="Guests" title="Ask how they read a mixed-age room">
            <p>
              Sea-to-Sky weddings often bring families, old friends, and a travel-weary crowd into the same space. Room-reading means watching how those groups respond, not only playing what charts
              suggest.
            </p>
            <p>
              For how energy builds without isolating anyone, read{" "}
              <Link
                href="/guides/how-to-keep-a-wedding-dance-floor-packed"
                prefetch={false}
                className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
              >
                How to Keep a Wedding Dance Floor Packed at a Sea-to-Sky Wedding
              </Link>{" "}
              and the Roomflow Method described there.
            </p>
        </Block>

        <Block eyebrow="Taste" title="Ask how they protect your taste without losing your guests">
          <p>
            You should hear your story in the set. Your guests should still feel invited in. The best answers describe balance: must-plays with guardrails, do-not-play lists without punishing the room,
            and transitions that keep social momentum.
          </p>
        </Block>

        <Block eyebrow="Before the day" title="Ask what happens before the wedding day">
          <p>
            Look for a clear planning rhythm: how music direction is captured, how timelines are confirmed, and how last-minute changes are handled. Vague answers here usually show up as stress later.
          </p>
          <p>
            Services and tiers are outlined on the{" "}
            <Link href="/weddings" prefetch={false} className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              weddings
            </Link>{" "}
            and{" "}
            <Link href="/packages" prefetch={false} className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              packages
            </Link>{" "}
            pages as a baseline for what “planning” can include.
          </p>
        </Block>

        <Block eyebrow="Signals" title="Red flags">
            <ul className="list-disc space-y-3 pl-6 text-white/75">
              <li>Vague planning process with no timeline touchpoints.</li>
              <li>No clear sound plan for ceremony or speeches.</li>
              <li>No wedding-specific experience (only club or generic event talk).</li>
              <li>No discussion of timing, transitions, or guest momentum.</li>
              <li>Overemphasis on gear brands instead of how the day will feel.</li>
            </ul>
        </Block>

        <Block eyebrow="Howe Sound DJ" title="How Howe Sound DJ approaches it">
          <p>
            The work is rooted in Squamish with Sea-to-Sky coverage, and the through-line is emotional atmosphere: elegant mountain settings, intentional planning, real dance floor energy, and assured
            professional presence from ceremony through last song.
          </p>
          <p>
            Practically, that means using the <strong className="text-white/90">Atmosphere Arc</strong> as a planning lens and the{" "}
            <strong className="text-white/90">Roomflow Method</strong> as a dance-floor discipline: earn the room, build from recognition, protect your taste, bridge moments with transitions, match
            the venue before changing its energy, and keep momentum human.
          </p>
          <p>
            For editorial dance-floor context beyond this checklist, see{" "}
            <Link href="/stories" prefetch={false} className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              Featured Weddings &amp; Dance Floor Stories
            </Link>
            .
          </p>
        </Block>

        <section className="border-t border-white/10 bg-gradient-to-b from-amber-300/10 to-transparent">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
            <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 lg:p-12">
              <div className="mx-auto w-full max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Next step</div>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Check your date. If it is open, book a consult.</h2>
                <p className="mt-4 text-lg leading-8 text-white/70">
                  The date check answers immediately. If Patrick is available, choose a consult time and see whether the working relationship feels right before you decide to book.
                </p>
                <div className="mt-8 max-w-xl space-y-4">
                  <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
                  <p className="text-sm text-white/45">
                    More proof in couples&apos; words:{" "}
                    <Link href="/reviews" prefetch={false} className="font-medium text-amber-200/85 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                      reviews
                    </Link>
                    .
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
