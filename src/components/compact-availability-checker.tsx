"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { WeddingDateFields } from "@/components/wedding-date-fields";
import { bookConsultPrimaryButtonClassName } from "@/components/book-consult-tracked-link";
import { useWeddingDateInput } from "@/hooks/use-wedding-date-input";
import { runAvailabilityCheck } from "@/lib/availability-check-client";
import { ANALYTICS_EVENTS, consultClickEventParams, trackEvent } from "@/lib/analytics";
import { CONSULT_CALENDLY_URL, PUBLIC_SOUND_CHECK_CTA_LABEL } from "@/lib/consult-calendly";
import { clearPostAvailabilityContext } from "@/lib/post-availability-context";

const ANALYTICS_SURFACE = "header_panel";

const AVAILABLE_NEXT =
  "Submit an inquiry to continue, or book a complimentary consult to talk through your venue and vision.";

type CheckPhase =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "available"; message: string }
  | { kind: "unavailable"; message: string }
  | { kind: "manual"; message: string };

type Props = {
  /** Called when the checker mounts so the panel can focus the year field. */
  onReady?: () => void;
  idPrefix?: string;
};

export function CompactAvailabilityChecker({ onReady, idPrefix = "header-avail" }: Props) {
  const uid = useId().replace(/:/g, "");
  const yearInputId = `${idPrefix}-year-${uid}`;
  const monthInputId = `${idPrefix}-month-${uid}`;
  const dayInputId = `${idPrefix}-day-${uid}`;

  const [phase, setPhase] = useState<CheckPhase>({ kind: "idle" });

  const date = useWeddingDateInput({
    yearInputId,
    onSegmentsChange: () => {
      setPhase({ kind: "idle" });
      clearPostAvailabilityContext();
    },
  });

  const outlineButtonClass =
    "inline-flex w-full items-center justify-center rounded-full border border-white/15 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5";

  useEffect(() => {
    date.focusYear();
    onReady?.();
    // Focus once when the panel opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCheck() {
    if (!date.weddingDate) {
      date.setDateError("Choose a wedding date first.");
      return;
    }
    date.setDateError("");
    setPhase({ kind: "loading" });
    const outcome = await runAvailabilityCheck(date.weddingDate, ANALYTICS_SURFACE);
    if (outcome.status === "available") {
      setPhase({ kind: "available", message: outcome.message });
      return;
    }
    if (outcome.status === "manual") {
      setPhase({ kind: "manual", message: outcome.message });
      return;
    }
    setPhase({ kind: "unavailable", message: outcome.message });
  }

  function trackCalendlyClick() {
    trackEvent(
      ANALYTICS_EVENTS.calendlyClick,
      consultClickEventParams({
        surface: ANALYTICS_SURFACE,
        funnel_context: "header_availability_panel",
      })
    );
    trackEvent(
      ANALYTICS_EVENTS.bookConsultClick,
      consultClickEventParams({
        surface: ANALYTICS_SURFACE,
        intent: "header_availability_panel",
        funnel_context: "header_availability_panel",
      })
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-white">Check your wedding date</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/50">
          Quickly see if your date is open before starting the conversation.
        </p>
      </div>

      <WeddingDateFields
        yearInputId={yearInputId}
        monthInputId={monthInputId}
        dayInputId={dayInputId}
        yearStr={date.yearStr}
        monthStr={date.monthStr}
        dayStr={date.dayStr}
        yearRef={date.yearRef}
        monthRef={date.monthRef}
        dayRef={date.dayRef}
        onYearChange={date.handleYearChange}
        onMonthChange={date.handleMonthChange}
        onDayChange={date.handleDayChange}
        label="Wedding date"
        compact
      />
      {date.dateError ? (
        <p className="text-sm text-rose-300/90" role="alert">
          {date.dateError}
        </p>
      ) : null}

      <button
        type="button"
        onClick={handleCheck}
        disabled={phase.kind === "loading"}
        className="inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {phase.kind === "loading" ? "Checking…" : "Check Availability"}
      </button>

      {phase.kind === "available" && (
        <div
          className="rounded-xl border border-amber-400/20 bg-amber-950/30 p-4"
          role="status"
        >
          <p className="text-sm leading-relaxed text-white/90">{phase.message}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{AVAILABLE_NEXT}</p>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href={CONSULT_CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${bookConsultPrimaryButtonClassName} w-full py-2.5 text-sm`}
              onClick={trackCalendlyClick}
            >
              {PUBLIC_SOUND_CHECK_CTA_LABEL}
            </a>
            <Link href="/contact#availability" className={outlineButtonClass}>
              Full contact page
            </Link>
          </div>
        </div>
      )}

      {phase.kind === "unavailable" && (
        <div
          className="rounded-xl border border-white/10 bg-white/5 p-4"
          role="status"
        >
          <p className="text-sm leading-relaxed text-white/80">{phase.message}</p>
          <Link href="/contact#send-message" className={`${outlineButtonClass} mt-3`}>
            Ask about alternatives
          </Link>
        </div>
      )}

      {phase.kind === "manual" && (
        <div
          className="rounded-xl border border-white/10 bg-white/5 p-4"
          role="status"
        >
          <p className="text-sm leading-relaxed text-white/80">{phase.message}</p>
          <Link href="/contact#send-message" className={`${outlineButtonClass} mt-3`}>
            Contact us directly
          </Link>
        </div>
      )}

      {phase.kind === "idle" && (
        <p className="text-center text-xs text-white/40">
          <Link href="/contact#availability" className="transition hover:text-white/55">
            Open full availability on contact
          </Link>
        </p>
      )}
    </div>
  );
}
