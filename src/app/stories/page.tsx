import type { Metadata } from "next";
import Link from "next/link";
import CTADuo from "@/components/cta-duo";
import { AuthorityProofStrip } from "@/components/authority-proof-strip";
import { ImageSlot } from "@/components/image-slot";
import { SITE_IMAGE_ALT, SITE_IMAGES } from "@/config/site-images";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { CTA_FINALE_SECTION_TOP } from "@/lib/cta-section-spacing";
import { JsonLd } from "@/components/json-ld";
import { storiesHubBreadcrumbJsonLd } from "@/lib/json-ld";

const hubDesc =
  "A growing home for real wedding moments, dance floor stories, and Sea-to-Sky celebration notes as more licensed photography and couple permissions become available.";

export const metadata: Metadata = {
  title: "Featured Weddings & Dance Floor Stories",
  description: hubDesc,
  openGraph: {
    title: "Featured Weddings & Dance Floor Stories | Howe Sound DJ",
    description: hubDesc,
    url: "/stories",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Featured Weddings & Dance Floor Stories | Howe Sound DJ",
    description: hubDesc,
    images: ["/og-share.jpg"],
  },
  alternates: { canonical: "/stories" },
};

const stories = [
  {
    slug: "what-a-sea-to-sky-gondola-dance-floor-feels-like",
    title: "What a Sea to Sky Gondola Dance Floor Feels Like",
    summary:
      "Editorial observation: elevation, light, and Howe Sound atmosphere. How guests arrive, how the night turns toward dancing, and why mountain pacing rewards local intelligence.",
  },
  {
    slug: "sea-to-sky-wedding-dance-floor-energy",
    title: "What a High-Energy Sea-to-Sky Wedding Dance Floor Feels Like",
    summary:
      "Editorial proof: the emotional shape of a mountain corridor reception, how guest trust shows up on the floor, and how this connects to the Roomflow Method.",
  },
] as const;

export default function StoriesHubPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <JsonLd data={storiesHubBreadcrumbJsonLd()} />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.14),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
              Stories
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Sea-to-Sky weddings</div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Featured Weddings &amp; Dance Floor Stories</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{hubDesc}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
              This section will not invent couples, venues, or dates. As real recaps join the site, they will live here alongside planning guides and reviews so couples can feel the atmosphere before they
              book.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
              <p className="text-sm leading-relaxed text-white/60">
                15 minutes &bull; No pressure &bull; Just clarity
              </p>
            </div>
          </div>
        </div>
      </section>

      <AuthorityProofStrip />

      <section className="border-y border-white/10 bg-neutral-950">
        <div className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
          <ImageSlot
            src={SITE_IMAGES.brandEditorialDocumentaryDanceFloor}
            alt={SITE_IMAGE_ALT.brandEditorialDocumentaryDanceFloor}
            aspect="16/9"
            label="Editorial atmosphere"
            reservedHint="Brand atmosphere imagery."
            sizes="(max-width: 1024px) 100vw, 56rem"
            imageClassName="object-[center_40%]"
            premiumPhotoTreatment
          >
            <span className="block text-white/60">The goal is human momentum, not forced hype.</span>
            <span className="mt-2 block text-xs text-white/40">
              Editorial brand atmosphere, not a recount of a specific client wedding.
            </span>
          </ImageSlot>
        </div>
      </section>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Read</div>
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Available now</h2>
        </div>
        <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-2">
          {stories.map((s) => (
            <StaggerItem key={s.slug}>
              <article className="premium-surface flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold leading-snug text-white">
                  <Link
                    href={`/stories/${s.slug}`}
                    className="rounded-md transition hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  >
                    {s.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-white/65">{s.summary}</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <Link
                    href={`/stories/${s.slug}`}
                    className="text-sm font-semibold text-amber-300 transition hover:text-amber-200"
                  >
                    Read →
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionReveal>

      <SectionReveal as="section" className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <p className="max-w-3xl text-sm leading-7 text-white/55">
            Planning context lives in the{" "}
            <Link href="/guides" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              Wedding Planning Guides
            </Link>
            . Named settings and flow questions map cleanly to{" "}
            <Link href="/venues" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              wedding venue guides
            </Link>
            . Squamish-first context sits in the{" "}
            <Link href="/squamish-wedding-dj" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              Squamish wedding DJ
            </Link>{" "}
            pillar, and Whistler-wide pacing sits in the{" "}
            <Link href="/whistler-wedding-dj" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              Whistler wedding DJ
            </Link>{" "}
            pillar. Couple voices in their own words stay on{" "}
            <Link href="/reviews" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
              reviews
            </Link>
            .
          </p>
        </div>
      </SectionReveal>

      <SectionReveal
        as="section"
        className={`${CTA_FINALE_SECTION_TOP} border-t border-white/10 bg-gradient-to-b from-amber-300/10 to-transparent`}
      >
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 lg:p-12">
            <div className="mx-auto w-full max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Next step</div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Talk about your day</h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                Whether or not a full story is live yet, you can still explore services, read guides, and reach out when the timing feels right.
              </p>
              <div className="mt-8 max-w-xl space-y-4">
                <CTADuo bookSurface="page_cta" checkSurface="page_cta" />
                <p className="text-sm leading-relaxed text-white/60">
                  15 minutes &bull; No pressure &bull; Just clarity
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
