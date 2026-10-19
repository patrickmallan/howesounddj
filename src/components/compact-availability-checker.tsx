"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
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
  | { kind: "available"; message: string; date: string }
  | { kind: "unavailable"; message: string; date: string }
  | { kind: "manual"; message: string; date: string };

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
  const activeRequest = useRef<AbortController | null>(null);

  const invalidateRequest = () => {
    activeRequest.current?.abort();
    activeRequest.current = null;
  };

  const date = useWeddingDateInput({
    yearInputId,
    onSegmentsChange: () => {
      invalidateRequest();
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

  useEffect(() => () => activeRequest.current?.abort(), []);

  useLayoutEffect(() => {
    if (phase.kind === "idle" || phase.kind === "loading") return;
    const dialog = document.querySelector<HTMLElement>(
      '[role="dialog"][aria-label="Check wedding date availability"]',
    );
    if (dialog) dialog.scrollTop = 0;
  }, [phase.kind]);

  async function handleCheck() {
    if (!date.weddingDate) {
      date.setDateError("Choose a wedding date first.");
      return;
    }
    const selectedDate = date.weddingDate;
    invalidateRequest();
    const request = new AbortController();
    activeRequest.current = request;
    date.setDateError("");
    setPhase({ kind: "loading" });
    const outcome = await runAvailabilityCheck(selectedDate, ANALYTICS_SURFACE, request.signal);
    if (!outcome || request.signal.aborted || activeRequest.current !== request) return;
    activeRequest.current = null;
    if (outcome.status === "available") {
      setPhase({ kind: "available", message: outcome.message, date: selectedDate });
      return;
    }
    if (outcome.status === "manual" || outcome.status === "error") {
      setPhase({ kind: "manual", message: outcome.message, date: selectedDate });
      return;
    }
    setPhase({ kind: "unavailable", message: outcome.message, date: selectedDate });
  }

  function resetChecker() {
    invalidateRequest();
    setPhase({ kind: "idle" });
    clearPostAvailabilityContext();
    date.resetSegments();
  }

  function handleEditDate() {
    invalidateRequest();
    setPhase({ kind: "idle" });
    clearPostAvailabilityContext();
    requestAnimationFrame(() => date.focusYear());
  }

  if (phase.kind === "available") {
    return (
      <PostAvailabilitySuccess
        variant="compact"
        weddingDate={phase.date}
        surface={ANALYTICS_SURFACE}
        canonicalStatusMessage={phase.message}
        onEditDate={handleEditDate}
        className="hsdj-availability-result hsdj-availability-result--success min-h-0 flex-1"
      />
    );
  }

  if (phase.kind === "unavailable" || phase.kind === "manual") {
    return (
      <PostAvailabilityOutcome
        kind={phase.kind}
        weddingDate={phase.date}
        canonicalStatusMessage={phase.message}
        onTryAnotherDate={resetChecker}
        className={`hsdj-availability-result hsdj-availability-result--${phase.kind} !rounded-xl !p-5`}
      />
    );
  }

  return (
    <div className="hsdj-availability-checker space-y-4" data-phase={phase.kind}>
      <div className="hsdj-availability-intro">
        <h3 className="hsdj-availability-title">Check your wedding date</h3>
        <p className="hsdj-availability-subtitle mt-1.5 text-sm leading-relaxed text-white/50">
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
        className="hsdj-availability-cue"
      >
        {phase.kind === "loading" ? availabilityCheckingButtonLabel() : "Check Availability"}
      </button>

      {phase.kind === "loading" ? <AvailabilityCheckingState className="!p-4 !rounded-xl" /> : null}

    </div>
  );
}
