import type { Metadata } from "next";
import { ContactAvailabilityForm } from "@/components/contact-availability-form";
import { ContactBookConsultSection } from "@/components/contact-book-consult-section";
import { ContactSecondaryInquiryForm } from "@/components/contact-secondary-inquiry-form";
import {
  BookConsultTrackedLink,
  bookConsultOutlineButtonClassName,
  bookConsultPrimaryButtonClassName,
} from "@/components/book-consult-tracked-link";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";
import { SectionReveal } from "@/components/motion";

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
  title: { absolute: "Check Your Date & Fit | Howe Sound DJ" },
  description:
    "Start with a quick 15-minute, no-pressure call to confirm your wedding date, your vision, and whether Howe Sound DJ is the right fit.",
  openGraph: {
    title: "Check Your Date & Fit | Howe Sound DJ",
    description:
      "Start with a quick 15-minute, no-pressure call to confirm your wedding date, your vision, and whether Howe Sound DJ is the right fit.",
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
              Weddings · Sea-to-Sky
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Contact</div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Let&apos;s Make Sure We&apos;re the Right Fit
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              A quick 15-minute call to confirm your date, your vision, and make sure everything feels right —
              no pressure, no commitment.
            </p>

            <div className="mt-8 max-w-xl space-y-6">
              <div>
                <BookConsultTrackedLink
                  surface="contact_page_primary"
                  className={`${bookConsultPrimaryButtonClassName} w-full sm:w-auto`}
                >
                  Check My Date &amp; Fit (15 min)
                </BookConsultTrackedLink>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  15 minutes &bull; No pressure &bull; No commitment
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  Most couples start here — it&apos;s the fastest way to lock in your date and get clarity.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                  Not ready to chat yet?
                </p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <CheckAvailabilityTrackedLink
                    href="/contact#availability"
                    surface="page_cta"
                    className={bookConsultOutlineButtonClassName}
                  />
                  <a
                    href="#send-message"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                  >
                    Send a Message Instead
                  </a>
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
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">A conversation first, not a hard sell.</h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Patrick invites couples to talk through the wedding, the vision, and the kind of experience you want guests
              to remember — whether you begin with a consult or check availability first. Planning stays built around fast
              replies and clear communication, the same calm, supported feeling couples name in reviews.
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
              You can check availability first if you&apos;re still exploring options or want to confirm your date before
              booking a consult.
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
                Venue or general location in Squamish, Whistler, Vancouver, or along the corridor
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
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Not ready to chat yet?</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
            Send a quick message and I&apos;ll personally follow up.
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
                Why reach out now
              </div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Dates, fit, and planning room, not manufactured urgency.
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                Popular weekends in Squamish, Whistler, and along the Sea-to-Sky can book in advance. Checking
                availability early is practical, not hype. A consultation also gives you space to ask about ceremony
                versus reception coverage, MC support, sound in your specific venue, and how personalized playlists come
                together before the day.
              </p>
              <p className="mt-4 text-lg leading-8 text-white/70">
                If Howe Sound DJ is the right fit, the next step is the same one the site has always pointed to: connect,
                talk it through, and build a plan that matches your wedding, not a generic package grid.
              </p>
            </div>
            <div className="premium-surface rounded-[1.75rem] border border-white/10 bg-neutral-950/70 p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Squamish wedding DJ
              </div>
              <p className="mt-4 text-sm leading-7 text-white/65">
                Weddings are the expertise, with a musical range wide enough to match real crowds and a local lens on
                venues and vendors. Whether the day is intimate or a full dance floor, the through-line is personalized
                service and professional execution, what couples describe in their own words after the wedding.
              </p>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <div className="atmosphere-grain rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Ready when you are
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Consult first when you&apos;re ready to talk — or check your date first.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Pick what fits where you are in planning: book a conversation, skim packages if helpful, or run your date
              through the calendar above.
            </p>
            <div className="mt-8 max-w-xl space-y-5">
              <div>
                <BookConsultTrackedLink
                  surface="contact_page_primary"
                  className={`${bookConsultPrimaryButtonClassName} w-full sm:w-auto`}
                >
                  Check My Date &amp; Fit (15 min)
                </BookConsultTrackedLink>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  15 minutes &bull; No pressure &bull; No commitment
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                  Not ready to chat yet?
                </p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <CheckAvailabilityTrackedLink
                    href="/contact#availability"
                    surface="page_cta"
                    className={bookConsultOutlineButtonClassName}
                  />
                  <a
                    href="#send-message"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                  >
                    Send a Message Instead
                  </a>
                  <a
                    href="/packages"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-center text-sm font-medium text-white/75 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                  >
                    Wedding DJ Packages
                  </a>
                  <a
                    href="/reviews"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-center text-sm font-medium text-white/75 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                  >
                    Wedding DJ Reviews
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
