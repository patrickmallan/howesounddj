"use client";

import { BookConsultTrackedLink, bookConsultPrimaryButtonClassName } from "@/components/book-consult-tracked-link";

export function ContactBookConsultSection() {
  return (
    <div
      id="book-consult"
      className="relative scroll-mt-24 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/[0.14] via-neutral-950/90 to-neutral-950 p-8 shadow-[0_0_80px_-24px_rgba(253,224,71,0.28)] lg:p-11"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(253,224,71,0.18),transparent_52%)]"
        aria-hidden
      />
      <div className="relative">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200/95">
          Start here
        </div>
        <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          Let&apos;s map out your wedding
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
          A quick consult is the easiest way to get clear on your timeline, music direction, and how the night will
          actually flow.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <BookConsultTrackedLink
            surface="contact_page_primary"
            className={`${bookConsultPrimaryButtonClassName} w-full sm:w-auto`}
          >
            Check My Date &amp; Fit (15 min)
          </BookConsultTrackedLink>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
          15 minutes &bull; No pressure &bull; No commitment
        </p>

        <ul className="mt-8 max-w-xl space-y-3 text-base leading-relaxed text-white/70">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/90" aria-hidden />
            No pressure — this is just a conversation
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/90" aria-hidden />
            No commitment — decide after the call
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/90" aria-hidden />
            No awkward sales pitch — just clarity
          </li>
        </ul>

        <div className="mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/90">
            We&apos;ll cover
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-white/70">
            <li className="flex gap-3">
              <span className="text-amber-300/80">•</span>
              Your date &amp; availability
            </li>
            <li className="flex gap-3">
              <span className="text-amber-300/80">•</span>
              Your venue + vibe
            </li>
            <li className="flex gap-3">
              <span className="text-amber-300/80">•</span>
              Whether we&apos;re a great fit
            </li>
          </ul>
        </div>

        <p className="mt-6 max-w-xl text-xs leading-relaxed text-white/40">
          Prefer not to chat yet?{" "}
          <a
            href="#send-message"
            className="font-medium text-amber-200/85 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
          >
            Send a message instead
          </a>
          , or use{" "}
          <a
            href="#availability"
            className="font-medium text-amber-200/85 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
          >
            Check Availability First
          </a>{" "}
          to confirm your date on the calendar.
        </p>
      </div>
    </div>
  );
}
