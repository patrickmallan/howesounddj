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

const STORY_SLUG = "sea-to-sky-wedding-dance-floor-energy";
const STORY_TITLE = "What a High-Energy Sea-to-Sky Wedding Dance Floor Feels Like";
const STORY_DATE = "2026-05-08";

const metaDesc =
  "Editorial proof from Howe Sound DJ: what high-energy Sea-to-Sky wedding dance floors feel like, how guest trust builds, and how the Roomflow Method shows up in real celebration arcs.";

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

export default function StorySeaToSkyDanceFloorEnergyPage() {
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
              <span className="text-white/65">Dance floor energy</span>
            </nav>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">Editorial / proof</p>
            <p className="mt-3 text-sm text-white/45">
              <time dateTime={STORY_DATE}>May 8, 2026</time>
              <span className="mx-2 text-white/25" aria-hidden>
                ·
              </span>
              Howe Sound DJ
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">{STORY_TITLE}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              This is not a recap of one specific wedding. It is a proof-style editorial about the kind of high-energy Sea-to-Sky reception Howe Sound DJ builds when the arc is right: guest trust, sound
              that supports the setting, and a floor that feels alive because the room was read honestly.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
              <p className="text-sm leading-relaxed text-white/60">
                15 minutes &bull; No pressure &bull; Just clarity
              </p>
            </div>
          </div>
        </header>

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
              priority
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
            A strong Sea-to-Sky dance floor rarely feels like a switch flipped at 9 p.m. It feels like the night has been leading there: vows heard clearly, cocktail conversation that breathes, dinner
            that does not drag, speeches that land, then music that invites people in instead of shouting at them.
          </p>
          <p>
            High energy in this context is social, not chaotic. It is the moment guests stop scanning the exits and start leaning in because the soundtrack finally matches who they are together.
          </p>
        </Block>

        <SectionReveal as="div" className="border-y border-white/10 bg-white/[0.03]">
          <Block eyebrow="Bridge" title="How this connects to reviews and imagery">
            <p>
              Named couple feedback on the{" "}
              <Link href="/reviews" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                reviews page
              </Link>{" "}
              describes packed floors, calm communication, and seamless ceremony-through-reception flow. Those lines are real voices, not marketing adjectives.
            </p>
            <p>
              Site photography shows celebration energy in a general, respectful way. As more licensed, couple-approved imagery becomes available, this stories hub will host specific moments without
              fabricating names or venues.
            </p>
          </Block>
        </SectionReveal>

        <Block eyebrow="Method" title="Roomflow Method, in plain language">
          <p>
            The{" "}
            <Link
              href="/guides/how-to-keep-a-wedding-dance-floor-packed"
              className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
            >
              Roomflow Method
            </Link>{" "}
            is how Howe Sound DJ thinks about earning a floor: emotional pacing, recognition before intensity, transitions as bridges, and momentum that stays human. That philosophy is what this
            editorial is trying to describe in feeling, not in gear lists.
          </p>
        </Block>

        <SectionReveal as="div" className="border-y border-white/10 bg-white/[0.03]">
          <Block eyebrow="Arc" title="The Atmosphere Arc on the floor">
            <p>
              The{" "}
              <strong className="text-white/90">Atmosphere Arc</strong> treats ceremony, cocktails, dinner, speeches, and dancing as one experience. When the arc is coherent, the dance section does not
              need tricks. It needs continuity: guests recognize the night as theirs, so they stay.
            </p>
          </Block>
        </SectionReveal>

        <Block eyebrow="Services" title="Where services fit">
          <p>
            If you want the full scope of ceremony-through-reception support, start with{" "}
            <Link href="/weddings" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              wedding DJ services
            </Link>{" "}
            and then reach out when you are ready to talk dates and venues.
          </p>
          <p>
            Named Sea-to-Sky settings live in the{" "}
            <Link href="/venues" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              venue guides
            </Link>
            . For an editorial read on how elevation and light shape reception pacing at the{" "}
            <Link
              href="/stories/what-a-sea-to-sky-gondola-dance-floor-feels-like"
              className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
            >
              Sea to Sky Gondola
            </Link>
            , see the companion story. Squamish-first commercial context sits in the{" "}
            <Link href="/squamish-wedding-dj" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              Squamish wedding DJ
            </Link>{" "}
            pillar. Whistler destination weekends layer in the{" "}
            <Link href="/whistler-wedding-dj" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              Whistler wedding DJ
            </Link>{" "}
            pillar. More Sea-to-Sky wedding stories live in the{" "}
            <Link href="/stories" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              stories hub
            </Link>
            .
          </p>
        </Block>

        <SectionReveal
          as="section"
          className={`${CTA_FINALE_SECTION_TOP} border-t border-white/10 bg-gradient-to-b from-amber-300/10 to-transparent`}
        >
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
            <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 lg:p-12">
              <div className="mx-auto w-full max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Next step</div>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">See if your day fits this shape</h2>
                <p className="mt-4 text-lg leading-8 text-white/70">
                  When you want this kind of atmosphere for your own wedding, the contact flow is the same across the site: consult, availability check, or both.
                </p>
                <div className="mt-8 max-w-xl space-y-4">
                  <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
                  <p className="text-sm leading-relaxed text-white/60">
                    15 minutes &bull; No pressure &bull; Just clarity
                  </p>
                  <p className="text-sm text-white/45">
                    <Link href="/contact" className="font-medium text-amber-200/85 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                      Contact
                    </Link>{" "}
                    for details-first questions.
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
