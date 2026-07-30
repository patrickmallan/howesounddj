"use client";

import { useEffect, useId, useState } from "react";
import { WeddingDateFields } from "@/components/wedding-date-fields";
import {
  AvailabilityCheckingState,
  availabilityCheckingButtonLabel,
} from "@/components/availability-checking-state";
import { PostAvailabilityOutcome } from "@/components/post-availability-outcome";
import { PostAvailabilitySuccess } from "@/components/post-availability-success";
import { useWeddingDateInput } from "@/hooks/use-wedding-date-input";
import { runAvailabilityCheck } from "@/lib/availability-check-client";
import { clearPostAvailabilityContext } from "@/lib/post-availability-context";

const ANALYTICS_SURFACE = "header_panel";

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
    if (outcome.status === "manual" || outcome.status === "error") {
      setPhase({ kind: "manual", message: outcome.message });
      return;
    }
    setPhase({ kind: "unavailable", message: outcome.message });
  }

  function resetChecker() {
    setPhase({ kind: "idle" });
    clearPostAvailabilityContext();
    date.resetSegments();
  }

  function handleEditDate() {
    setPhase({ kind: "idle" });
    clearPostAvailabilityContext();
    requestAnimationFrame(() => date.focusYear());
  }

  if (phase.kind === "available" && date.weddingDate) {
    return (
      <PostAvailabilitySuccess
        variant="compact"
        weddingDate={date.weddingDate}
        surface={ANALYTICS_SURFACE}
        canonicalStatusMessage={phase.message}
        onEditDate={handleEditDate}
        className="min-h-0 flex-1"
      />
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
        {phase.kind === "loading" ? availabilityCheckingButtonLabel() : "Check Availability"}
      </button>

      {phase.kind === "loading" ? <AvailabilityCheckingState className="!p-4 !rounded-xl" /> : null}

      {phase.kind === "unavailable" && date.weddingDate ? (
        <PostAvailabilityOutcome
          kind="unavailable"
          weddingDate={date.weddingDate}
          canonicalStatusMessage={phase.message}
          onTryAnotherDate={resetChecker}
          className="!rounded-xl !p-4"
        />
      ) : null}

      {phase.kind === "manual" && date.weddingDate ? (
        <PostAvailabilityOutcome
          kind="manual"
          weddingDate={date.weddingDate}
          canonicalStatusMessage={phase.message}
          onTryAnotherDate={resetChecker}
          className="!rounded-xl !p-4"
        />
      ) : null}
    </div>
  );
}
