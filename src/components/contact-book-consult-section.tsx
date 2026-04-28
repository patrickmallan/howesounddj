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

        <ul className="mt-8 max-w-xl space-y-3 text-base leading-relaxed text-white/70">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/90" aria-hidden />
            Get clear on your timeline and flow
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/90" aria-hidden />
            Talk through your vision for the dance floor
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/90" aria-hidden />
            Ask anything — no pressure, no commitment
          </li>
        </ul>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/55">
          No pressure — just a quick conversation to see if it&apos;s a fit.
        </p>

        <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <BookConsultTrackedLink
            surface="contact_page_primary"
            className={`${bookConsultPrimaryButtonClassName} w-full sm:w-auto`}
          >
            Book a Consult
          </BookConsultTrackedLink>
        </div>
        <p className="mt-5 max-w-xl text-xs leading-relaxed text-white/40">
          Prefer to confirm your date on the calendar first? Use{" "}
          <a
            href="#availability"
            className="font-medium text-amber-200/85 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100"
          >
            Check Availability
          </a>{" "}
          below — consult and availability check cover different jobs, and you can do either order.
        </p>
      </div>
    </div>
  );
}
