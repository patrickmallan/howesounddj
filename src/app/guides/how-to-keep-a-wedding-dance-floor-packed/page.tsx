import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { ImageSlot } from "@/components/image-slot";
import { SectionReveal } from "@/components/motion";
import { CTA_FINALE_SECTION_TOP } from "@/lib/cta-section-spacing";
import { SITE_IMAGE_ALT, SITE_IMAGES } from "@/config/site-images";
import { JsonLd } from "@/components/json-ld";
import { guideArticleBreadcrumbJsonLd, guideArticleJsonLd } from "@/lib/json-ld";

const ARTICLE_SLUG = "how-to-keep-a-wedding-dance-floor-packed";
const ARTICLE_TITLE = "How to Keep a Wedding Dance Floor Packed at a Sea-to-Sky Wedding";
const ARTICLE_DATE = "2026-05-08";

const metaDesc =
  "Sea-to-Sky and mountain wedding DJ perspective on packed dance floors: emotional pacing, guest trust, the Roomflow Method, and atmosphere-first planning from ceremony through last song.";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description: metaDesc,
  openGraph: {
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

function ProseBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-14 lg:px-8">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{eyebrow}</div>
      <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">{title}</h2>
      <div className="mt-6 space-y-4 text-lg leading-8 text-white/70">{children}</div>
    </section>
  );
}

export default function GuideDanceFloorPackedPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <JsonLd data={guideArticleBreadcrumbJsonLd(ARTICLE_TITLE, ARTICLE_SLUG)} />
      <JsonLd
        data={guideArticleJsonLd({
          slug: ARTICLE_SLUG,
          headline: ARTICLE_TITLE,
          description: metaDesc,
          datePublished: ARTICLE_DATE,
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
              <Link href="/guides" className="transition hover:text-white/70">
                Planning guides
              </Link>
              <span className="mx-2 text-white/25" aria-hidden>
                /
              </span>
              <span className="text-white/65">Dance floor energy</span>
            </nav>
            <p className="mt-8 text-sm text-white/45">
              <time dateTime={ARTICLE_DATE}>May 8, 2026</time>
              <span className="mx-2 text-white/25" aria-hidden>
                ·
              </span>
              Howe Sound DJ
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">{ARTICLE_TITLE}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              A packed dance floor is not luck and it is not only volume. In Sea-to-Sky weddings, the setting already does emotional work: mountains, forest, farm fields, or a lodge at elevation. Your
              reception music has to earn the room in that context, with pacing that respects the day you actually planned.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
              <p className="text-sm leading-relaxed text-white/60">
                15 minutes &bull; No pressure &bull; Just clarity
              </p>
            </div>
          </div>
        </header>

        <ProseBlock eyebrow="Foundation" title="Packed dance floors start before dancing begins">
          <p>
            Guest momentum is built during welcome energy, cocktail pacing, dinner tone, and how speeches land. If those chapters feel rushed, chaotic, or sonically harsh, people arrive at the dance
            floor tired, self-conscious, or scattered. If they feel cared for, oriented, and emotionally connected, they bring that same trust onto the floor.
          </p>
          <p>
            This is why Howe Sound DJ treats{" "}
            <Link href="/weddings" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              ceremony through reception
            </Link>{" "}
            as one arc. The dance section is the payoff, not a reset button.
          </p>
        </ProseBlock>

        <SectionReveal as="div" className="border-y border-white/10 bg-white/[0.03]">
          <ProseBlock eyebrow="Place" title="Why Sea-to-Sky weddings require atmosphere-first music planning">
            <p>
              Mountain and corridor weddings often include travel, weather, elevation, and a crowd that knows each other well. The room may be intimate, or visually stunning, or both. Sound that fights
              the setting feels cheap. Sound that supports it feels inevitable.
            </p>
            <p>
              Atmosphere-first planning means asking what the venue is already saying to guests before the first beat drops. A{" "}
              <Link href="/venues/sea-to-sky-gondola" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                dramatic viewpoint
              </Link>{" "}
              carries different energy than a{" "}
              <Link href="/venues/sunwolf" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                Brackendale riverside resort
              </Link>{" "}
              or a forest sanctuary. At a riverside setting, the floor often peaks when the arc is concentrated: trust through dinner, lift when the room is ready, and resist dragging the energy past its natural end. The playlist still has to be yours, but the pacing should match how guests actually move through that place.
            </p>
            <p>
              For venue-specific planning questions, the{" "}
              <Link href="/venues" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                wedding venue guides
              </Link>{" "}
              are a practical companion to this article.
            </p>
            <p>
              Whistler receptions add destination-weekend flow; the{" "}
              <Link href="/whistler-wedding-dj" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                Whistler wedding DJ
              </Link>{" "}
              pillar ties that arc to mountain planning language. For editorial proof alongside guides, see{" "}
              <Link href="/stories" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                Featured Weddings &amp; Dance Floor Stories
              </Link>
              .
            </p>
          </ProseBlock>
        </SectionReveal>

        <section className="border-y border-white/10 bg-neutral-950">
          <div className="mx-auto max-w-3xl px-6 pt-14 lg:px-8">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Framework</div>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">The Roomflow Method</h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              The Roomflow Method is Howe Sound DJ&apos;s approach to building a dance floor through emotional pacing, guest trust, familiarity, transitions, timing, and reading the specific room in
              front of you. It is not a formula printed on a spreadsheet. It is a way of listening to your people and protecting the night&apos;s emotional truth.
            </p>
          </div>
          <div className="mx-auto max-w-4xl px-6 py-10 lg:px-8">
            <ImageSlot
              src={SITE_IMAGES.brandEditorialPackedDanceFloor}
              alt={SITE_IMAGE_ALT.brandEditorialPackedDanceFloor}
              aspect="16/9"
              label="Editorial atmosphere"
              reservedHint="Brand atmosphere imagery for planning context."
              sizes="(max-width: 1024px) 100vw, 56rem"
              imageClassName="object-[center_42%]"
              premiumPhotoTreatment
            >
              <span className="block text-white/60">
                A packed dance floor is built through pacing, trust, timing, and momentum.
              </span>
              <span className="mt-2 block text-xs text-white/40">
                Editorial brand atmosphere, not a recount of a single client wedding.
              </span>
            </ImageSlot>
          </div>
          <div className="mx-auto max-w-3xl space-y-4 px-6 pb-14 text-lg leading-8 lg:px-8">
            <ol className="list-decimal space-y-4 pl-6 text-white/75">
              <li>
                <strong className="text-white/90">Earn the room before asking it to move.</strong> Warmth and clarity early create permission to celebrate later.
              </li>
              <li>
                <strong className="text-white/90">Build from recognition before intensity.</strong> Shared memories in music lower the social barrier to dancing.
              </li>
              <li>
                <strong className="text-white/90">Protect the couple&apos;s taste without isolating guests.</strong> Your wedding should sound like you, and still invite your favorite people in.
              </li>
              <li>
                <strong className="text-white/90">Use transitions as emotional bridges.</strong> The blend between songs is where trust is won or lost.
              </li>
              <li>
                <strong className="text-white/90">Match the venue&apos;s atmosphere before changing its energy.</strong> Honor the setting, then open the next chapter when the room is ready.
              </li>
              <li>
                <strong className="text-white/90">Keep momentum human, not mechanical.</strong> The goal is connection, not a metronome stuck on &quot;high.&quot;
              </li>
            </ol>
          </div>
        </section>

        <SectionReveal as="div" className="border-y border-white/10 bg-white/[0.03]">
          <ProseBlock eyebrow="Arc" title="Ceremony, cocktails, dinner, speeches, and dance floor are one emotional arc">
            <p>
              When couples split the day into disconnected vendors and disconnected vibes, guests feel the seams. A cohesive arc means dinner music supports conversation, speeches are heard cleanly, and
              the shift into dancing feels like a natural next page, not a hard cut into a different event.
            </p>
            <p>
              Practically, that means timeline conversations matter as much as &quot;banger&quot; lists. If you want help shaping that arc,{" "}
              <Link href="/packages" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                wedding DJ packages
              </Link>{" "}
              spell out how planning and day-of support fit together.
            </p>
          </ProseBlock>
        </SectionReveal>

        <ProseBlock eyebrow="Myth" title="Why &quot;bangers only&quot; still needs timing">
          <p>
            High-energy reception language is honest for couples who want a real party. The nuance is that energy lands best when the room is ready to receive it. The same track at the wrong moment
            can clear a floor; the right track after the right emotional runway can keep guests there for hours.
          </p>
          <p>
            This is room-reading in action: not performing for Instagram, but watching how your actual friends and family respond in real time.
          </p>
        </ProseBlock>

        <SectionReveal as="div" className="border-y border-white/10 bg-white/[0.03]">
          <ProseBlock eyebrow="Partnership" title="How couples can help create the right conditions">
            <p>
              Share the honest age mix, the songs that matter to your history, and the moments you are willing to protect, even if they are not &quot;cool.&quot; Name the emotional temperature you
              want: elegant, wild, tender, rowdy, or a believable blend.
            </p>
            <p>
              If you are early in planning, say so. If you already know your venue, bring it. Couples who communicate clearly get a soundtrack that feels personal without feeling random.
            </p>
          </ProseBlock>
        </SectionReveal>

        <ProseBlock eyebrow="Hiring" title="What to ask your DJ before booking">
          <ul className="list-disc space-y-3 pl-6 text-white/75">
            <li>How do you build energy when guests are shy or fragmented?</li>
            <li>How do you handle outdoor ceremony or speech audio in mountain weather?</li>
            <li>How do you balance must-plays with reading the room?</li>
            <li>What does your planning process look like the month before the wedding?</li>
            <li>How do you protect the couple&apos;s taste without losing the crowd?</li>
          </ul>
          <p className="mt-6">
            If the answers feel template-driven, keep looking. If they feel like calm expertise grounded in real weddings, you are closer to the right fit.{" "}
            <Link href="/reviews" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              Wedding DJ reviews
            </Link>{" "}
            are one place to see how that shows up after the fact.
          </p>
        </ProseBlock>

        <SectionReveal
          as="section"
          className={`${CTA_FINALE_SECTION_TOP} border-t border-white/10 bg-gradient-to-b from-amber-300/10 to-transparent`}
        >
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
            <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 lg:p-12">
              <div className="mx-auto w-full max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Your wedding</div>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Book a consult or check availability</h2>
                <p className="mt-4 text-lg leading-8 text-white/70">
                  If this framework matches how you want your Sea-to-Sky wedding to feel, the next step is simple: talk through your date, your venue, and your crowd, then build the arc together.
                </p>
                <div className="mt-8 max-w-xl space-y-4">
                  <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
                  <p className="text-sm leading-relaxed text-white/60">
                    15 minutes &bull; No pressure &bull; Just clarity
                  </p>
                  <p className="text-sm text-white/45">
                    Prefer to message first? Use{" "}
                    <Link href="/contact" className="font-medium text-amber-200/85 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                      contact
                    </Link>
                    .
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
