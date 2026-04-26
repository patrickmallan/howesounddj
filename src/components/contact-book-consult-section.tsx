"use client";

import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CONSULT_CALENDLY_URL } from "@/lib/consult-calendly";

const consultCtaClass =
  "inline-flex min-h-[44px] items-center justify-center rounded-full border border-amber-300/50 bg-amber-300/10 px-6 py-3 text-center text-sm font-semibold text-amber-200 transition hover:border-amber-300 hover:bg-amber-300/15";

export function ContactBookConsultSection() {
  function handleConsultClick() {
    trackEvent(ANALYTICS_EVENTS.bookConsultClick, {
      surface: "contact_page",
      intent: "direct_consult",
    });
  }

  return (
    <div
      id="book-consult"
      className="scroll-mt-24 rounded-[1.5rem] border border-white/10 bg-neutral-950/50 p-6 lg:p-8"
    >
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300/90">Consult</div>
      <h2 className="mt-4 text-xl font-semibold text-white/90 sm:text-2xl">Book a consult</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
        Already reached out, know your date is available, or need to book your final planning call? You can schedule a
        consult directly here without checking availability again.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
        If your wedding is already booked, use this option for your final planning call.
      </p>
      <div className="mt-6">
        <a
          href={CONSULT_CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={consultCtaClass}
          onClick={handleConsultClick}
        >
          Book a Consult
        </a>
      </div>
    </div>
  );
}
