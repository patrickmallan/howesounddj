import type { Metadata } from "next";
import { ContactAvailabilityForm } from "@/components/contact-availability-form";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";

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
  title: "Contact & Availability",
  description:
    "Check availability for your Squamish or Sea-to-Sky wedding: pick your date, then share your venue and vision. Book a consult or send an inquiry when the fit feels right.",
  openGraph: {
    title: "Contact & Availability | Howe Sound DJ",
    description:
      "Check availability and share your wedding details: date, venue, and how you want the day to feel.",
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
              Contact
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Check availability
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Start with your date, your venue, and how you want the day to feel.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Pick your wedding date below to check the calendar, then share what you’re planning. You can book a consult anytime, or send an inquiry when your date is open.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <CheckAvailabilityTrackedLink
                href="#availability"
                surface="page_cta"
                className="rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
              />
              <a
                href="/reviews"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Read Reviews
              </a>
              <a
                href="/packages"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                View Packages
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 lg:p-10">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              What happens next
            </div>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              A conversation first, not a hard sell.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Patrick invites couples to check availability and talk through the wedding, the vision, and the kind of experience you want guests to remember. Planning stays built around fast replies and clear communication, the same calm, supported feeling couples name in reviews.
            </p>
          </div>
        </div>
      </section>

      <section
        id="availability"
        className="scroll-mt-24 border-y border-white/10 bg-white/5"
      >
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Availability
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Share what you know today
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Start with your date, then add venue, guest count, and how you want the night to feel so the first exchange can focus on fit, sound, and flow.
            </p>
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-neutral-950/60 p-6 lg:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">
              Helpful to include in your inquiry
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-white/60">
              <li className="flex gap-2">
                <span className="text-amber-300/80">•</span>
                Wedding date (check it above first)
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

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            You do not need a perfect brief
          </div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Partial details are still a useful start.
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            The work is built around tailoring the event to the couple, not forcing you to have every timeline detail locked before you reach out. If you are early in planning, say so. If you already know your venue and rough headcount, that helps too.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5">
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
                Popular weekends in Squamish, Whistler, and along the Sea-to-Sky can book in advance. Checking availability early is practical, not hype. A consultation also gives you space to ask about ceremony versus reception coverage, MC support, sound in your specific venue, and how personalized playlists come together before the day.
              </p>
              <p className="mt-4 text-lg leading-8 text-white/70">
                If Howe Sound DJ is the right fit, the next step is the same one the site has always pointed to: connect, talk it through, and build a plan that matches your wedding, not a generic package grid.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-neutral-950/70 p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Squamish wedding DJ
              </div>
              <p className="mt-4 text-sm leading-7 text-white/65">
                Weddings are the expertise, with a musical range wide enough to match real crowds and a local lens on venues and vendors. Whether the day is intimate or a full dance floor, the through-line is personalized service and professional execution, what couples describe in their own words after the wedding.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/5 p-8 lg:p-12">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Ready when you are
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              The first step is simply checking availability.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Skim packages if helpful, then pick your date in the section above. The goal is a clear path from availability to conversation to a wedding day that sounds and feels like you.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <CheckAvailabilityTrackedLink
                href="#availability"
                surface="page_cta"
                className="rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
              />
              <a
                href="/packages"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                View Packages
              </a>
              <a
                href="/reviews"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Read Reviews
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
