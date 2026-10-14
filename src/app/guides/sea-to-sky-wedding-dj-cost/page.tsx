import type { Metadata } from "next";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { JsonLd } from "@/components/json-ld";
import { guideArticleBreadcrumbJsonLd, guideArticleJsonLd } from "@/lib/json-ld";
import { GuideArticleBlock as Block, GuideArticleHeader } from "../guide-article-elements";
import "../article-liner-notes.css";

// Editorial draft. Recheck third-party offers and get publication approval before deployment.
const ARTICLE_SLUG = "sea-to-sky-wedding-dj-cost";
const ARTICLE_TITLE = "What Does a Wedding DJ Cost in the Sea-to-Sky?";
const ARTICLE_DATE = "2026-10-13";
const description =
  "Compare Sea-to-Sky wedding DJ quotes without confusing dinner-and-dance coverage with ceremony-to-last-song sound. Dated public examples and the details that change a quote.";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description,
  openGraph: {
    images: ["/og-cake-party-v2.jpg"],
    title: `${ARTICLE_TITLE} | Howe Sound DJ`,
    description,
    url: `/guides/${ARTICLE_SLUG}`,
    type: "article",
    publishedTime: ARTICLE_DATE,
  },
  twitter: {
    card: "summary_large_image",
    title: `${ARTICLE_TITLE} | Howe Sound DJ`,
    description,
    images: ["/og-cake-party-v2.jpg"],
  },
  alternates: { canonical: `/guides/${ARTICLE_SLUG}` },
};

const textLink =
  "font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100";

export default function SeaToSkyWeddingDjCostPage() {
  return (
    <main className="hsdj-interior hsdj-editorial-page min-h-screen bg-neutral-950 text-white">
      <JsonLd data={guideArticleBreadcrumbJsonLd(ARTICLE_TITLE, ARTICLE_SLUG)} />
      <JsonLd
        data={guideArticleJsonLd({
          slug: ARTICLE_SLUG,
          headline: ARTICLE_TITLE,
          description,
          datePublished: ARTICLE_DATE,
        })}
      />
      <article className="hsdj-interior-flow">
        <GuideArticleHeader
          breadcrumbLabel="Wedding DJ costs"
          date={ARTICLE_DATE}
          dateLabel="October 13, 2026"
          title={ARTICLE_TITLE}
          titleLines={["What does a", "wedding DJ cost", "in the Sea-to-Sky?"]}
          tone="yellow"
        >
          There isn&apos;t one honest sticker price for every wedding up here. A six-hour dinner-and-dance booking and a day that needs ceremony sound, speeches, music in another space, and a late finish are different jobs. When you see a number, start with what it covers.
        </GuideArticleHeader>

        <Block eyebrow="The scope" title="Start with what the quote covers">
          <p>Ask where the DJ&apos;s time starts and ends. Is the ceremony included, or is it a separate sound setup? Will guests hear the vows clearly? Is there a microphone ready for speeches? Does the cocktail space need its own speaker? Does the person you meet do the work on the day?</p>
          <p>The answers matter more than comparing two headline prices.</p>
        </Block>

        <Block eyebrow="Public examples" title="Published examples, with the fine print">
          <p><strong className="text-white">These are other providers&apos; publicly advertised examples, checked October 13, 2026.</strong> They are not Howe Sound DJ prices, quotes, or a Sea-to-Sky average. Their pages show dollar amounts without a clear currency code beside each price. Confirm currency, tax, travel, availability, and full scope with each provider before treating a figure as a final cost.</p>
          <ul className="list-disc space-y-4 pl-6">
            <li><a className={textLink} href="https://www.whistlerdjs.com/packages" target="_blank" rel="noopener noreferrer">Trax DJ Services</a> advertises a promotional <strong className="text-white">$1,495</strong> six-hour dinner-and-dance wedding package. Its eight-hour package including ceremony, cocktails, dinner, and dance is shown at <strong className="text-white">$1,995</strong>. Those figures do not buy the same coverage; the sale end date was not stated on the page checked.</li>
            <li><a className={textLink} href="https://www.coastmountaindjs.com/pricing/" target="_blank" rel="noopener noreferrer">Coast Mountain DJs</a> advertises a <strong className="text-white">$1,990</strong> six-hour wedding package and lists ceremony sound separately at <strong className="text-white">$500</strong>. Cocktail music and extra DJ time are also listed separately. Check the full quote before comparing its six hours with another provider&apos;s ceremony-through-reception coverage.</li>
          </ul>
          <p>These are selected posted offers, not a representative survey. I&apos;d rather show you what sits behind a quote than pretend two examples add up to one tidy going rate.</p>
        </Block>

        <Block eyebrow="Your day" title="Why two weddings can need different sound">
          <p>A single room is one thing. A ceremony outside and reception inside can mean a second sound setup, a different microphone plan, and time to move or test gear without making guests wait. Length of coverage, load-in, venue access, travel, and the number of spaces all change the work.</p>
          <p>Your music choices matter too: ceremony cues, dinner atmosphere, the songs you love, and the ones your people will lose it to all deserve planning time.</p>
          <p>I&apos;m based in Squamish and also book weddings in Whistler and Pemberton. If you&apos;re planning a Squamish wedding from Vancouver, we can make the music decisions from home; I&apos;m already local to the celebration. Venue and travel details still belong in your individual quote.</p>
        </Block>

        <Block eyebrow="The comparison" title="What to ask before you compare quotes">
          <p>Ask each DJ to spell out the hours, ceremony and speech microphones, separate sound zones, setup and teardown, lighting, travel, taxes, extra-hour rates, and who will actually DJ. Then compare the same day, not just the first number on two different pages.</p>
        </Block>

        <Block eyebrow="Howe Sound DJ" title="How I build a quote">
          <p>At Howe Sound Wedding DJ, I put together a written quote around <em>your</em> day rather than posting a one-size-fits-all wedding rate. Tell me the date, venue, ceremony and reception plan, and how long you want the music to run. I&apos;ll help work out the sound the day needs and make the coverage clear.</p>
          <p>See <Link href="/packages" prefetch={false} className={textLink}>how my wedding coverage works</Link>, then use the date check below to start the conversation.</p>
        </Block>

        <section className="border-t border-white/10 bg-gradient-to-b from-amber-300/10 to-transparent">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
            <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 lg:p-12">
              <div className="mx-auto w-full max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Your next move</div>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Check your date. Then let&apos;s talk through the day.</h2>
                <p className="mt-4 text-lg leading-8 text-white/70">The date check answers immediately. If I&apos;m open, we can talk about the venue, the music, and the sound you actually need before you decide.</p>
                <div className="mt-8 max-w-xl"><CTADuo bookSurface="page_cta" checkSurface="page_cta" /></div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
