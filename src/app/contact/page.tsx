import type { Metadata } from "next";
import Link from "next/link";
import { ContactAvailabilityForm } from "@/components/contact-availability-form";
import { ContactBookConsultSection } from "@/components/contact-book-consult-section";
import { ContactSecondaryInquiryForm } from "@/components/contact-secondary-inquiry-form";
import { ContactPageCtaTrio } from "@/components/contact-page-cta-trio";
import { SectionReveal } from "@/components/motion";
import { CTA_FINALE_SECTION_TOP } from "@/lib/cta-section-spacing";

/** Read Turnstile site key at request time (avoids empty props if env was missing at build / prefers runtime env on Vercel). */
function turnstileSiteKey(): string {
  return (
    process.env.TURNSTILE_SITE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ||
    ""
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Contact | Howe Sound DJ" },
  description:
    "Book a consult — a complimentary 45-minute wedding DJ consultation to talk through your date, vision, and whether Howe Sound DJ is the right fit. Or check availability first.",
  openGraph: {
    title: "Contact | Howe Sound DJ",
    description:
      "Book a consult — a complimentary 45-minute wedding DJ consultation to talk through your date, vision, and whether Howe Sound DJ is the right fit. Or check availability first.",
    url: "/contact",
  },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.14),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
              Squamish · Sea-to-Sky · Weddings
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Contact</div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Reach out when you are ready. The process is straightforward.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Share your date, venue, and how you want the reception to feel. I reply personally with availability and a clear next step, usually a short consult to align on timeline and fit. No pressure, no
              commitment required to start the conversation.
            </p>
          </div>
        </div>
      </section>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-16">
        <ContactBookConsultSection />
      </SectionReveal>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
        <div className="premium-surface rounded-[2rem] border border-white/10 bg-white/5 p-8 lg:p-10">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              What happens next
            </div>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">What happens after you submit</h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              You hear back from Patrick directly, not an autoresponder loop. A typical path looks like this:
            </p>
            <ol className="mt-6 list-none space-y-4 text-base leading-8 text-white/70">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-300/35 bg-amber-300/10 text-sm font-semibold text-amber-200">
                  1
                </span>
                <span>You send your date, venue, and whatever you know about the day so far.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-300/35 bg-amber-300/10 text-sm font-semibold text-amber-200">
                  2
                </span>
                <span>Patrick replies with availability and a clear quote or next question if something needs clarifying.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-300/35 bg-amber-300/10 text-sm font-semibold text-amber-200">
                  3
                </span>
                <span>If the fit feels right, you book a consult to align on music, flow, and coverage.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-300/35 bg-amber-300/10 text-sm font-semibold text-amber-200">
                  4
                </span>
                <span>Planning calls and a shared timeline build from there at your pace.</span>
              </li>
            </ol>
            <p className="mt-6 text-sm leading-7 text-white/55">
              Fast replies and calm communication are part of the same experience couples describe in reviews.{" "}
              <Link
                href="/about"
                className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
              >
                Read about Patrick&apos;s approach
              </Link>{" "}
              if you want that human context before you write—a conversation first, not a hard sell.
            </p>
          </div>
        </div>
      </SectionReveal>

      <section
        id="availability"
        className="scroll-mt-24 border-y border-white/10 bg-white/5"
      >
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Check availability
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Already have a date in mind?</h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Submit the form below and Patrick will reply with availability for your date. Include what you can; partial details are fine. You will know within a normal reply window what the next step is.
            </p>
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-neutral-950/60 p-6 lg:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">
              Helpful to include in your inquiry
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-white/60">
              <li className="flex gap-2">
                <span className="text-amber-300/80">•</span>
                Wedding date (check it below first)
              </li>
              <li className="flex gap-2">
                <span className="text-amber-300/80">•</span>
                Venue or town: Squamish, corridor, Whistler, or Metro Vancouver (whatever matches your invitation)
              </li>
              <li className="flex gap-2">
                <span className="text-amber-300/80">•</span>
                Rough guest count and which parts of the day you need covered
              </li>
              <li className="flex gap-2">
                <span className="text-amber-300/80">•</span>
                How you want the night to feel, and any must-plays or hard nos
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <ContactAvailabilityForm turnstileSiteKey={turnstileSiteKey()} />
          </div>
        </div>
      </section>

      <section id="send-message" className="scroll-mt-24 border-b border-white/10 bg-neutral-950">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            Tertiary path
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Prefer email first?</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
            Send a quick message and Patrick will follow up personally with availability and a clear next step.
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/55">
            Planner, venue, or vendor inquiry? You can email directly at{" "}
            <a
              href="mailto:patrick@howesounddj.com"
              className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
            >
              patrick@howesounddj.com
            </a>
            .
          </p>
          <ContactSecondaryInquiryForm turnstileSiteKey={turnstileSiteKey()} />
        </div>
      </section>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            You do not need a perfect brief
          </div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Partial details are still a useful start.</h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            The work is built around tailoring the event to the couple, not forcing you to have every timeline detail
            locked before you reach out. If you are early in planning, say so. If you already know your venue and rough
            headcount, that helps too.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Why couples reach out early
              </div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                A clear path beats guessing in the final weeks.
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                An early conversation helps you understand coverage, MC support, sound in your specific venue, and how playlists come together before the day. There is no obligation to book after you reach
                out. The goal is clarity.
              </p>
              <p className="mt-4 text-lg leading-8 text-white/70">
                If Howe Sound DJ feels like the right direction, the next step is the same one the site has always pointed to: connect, talk it through, and build a plan that matches your wedding.
              </p>
            </div>
            <div className="premium-surface rounded-[1.75rem] border border-white/10 bg-neutral-950/70 p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Local to the corridor
              </div>
              <p className="mt-4 text-sm leading-7 text-white/65">
                Howe Sound DJ is Squamish-based: wedding-first work with a range that matches real crowds and planning that already speaks the language of Sea-to-Sky venues and weekends. Whether the day
                is intimate or dance-forward, the through-line is personalized execution: what couples describe in their own words after the wedding. For Squamish-anchored context, see the{" "}
                <Link href="/squamish-wedding-dj" className="font-medium text-amber-200/90 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100">
                  Squamish overview
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        as="section"
        className={`${CTA_FINALE_SECTION_TOP} mx-auto max-w-6xl px-6 pb-24 lg:px-8`}
      >
        <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Ready when you are
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Book a Consult when you&apos;re ready to talk, or check your date first.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Pick what matches where you are in planning: schedule your complimentary consultation, skim packages if
              helpful, or run your date through the calendar above.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <ContactPageCtaTrio />
              <p className="text-sm leading-relaxed text-white/60">
                45 minutes &bull; No pressure &bull; Just clarity
              </p>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
