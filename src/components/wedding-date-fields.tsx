"use client";

import type { RefObject } from "react";

const dateInputClass =
  "rounded-xl border border-white/15 bg-neutral-950 px-3 py-2.5 text-center text-white outline-none focus:border-amber-300/50 tabular-nums";

type Props = {
  yearInputId: string;
  monthInputId: string;
  dayInputId: string;
  yearStr: string;
  monthStr: string;
  dayStr: string;
  yearRef: RefObject<HTMLInputElement | null>;
  monthRef: RefObject<HTMLInputElement | null>;
  dayRef: RefObject<HTMLInputElement | null>;
  onYearChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMonthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDayChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  helper?: string;
  compact?: boolean;
};

export function WeddingDateFields({
  yearInputId,
  monthInputId,
  dayInputId,
  yearStr,
  monthStr,
  dayStr,
  yearRef,
  monthRef,
  dayRef,
  onYearChange,
  onMonthChange,
  onDayChange,
  label = "Wedding date",
  helper,
  compact = false,
}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/80" htmlFor={yearInputId}>
        {label}
      </label>
      {helper ? <p className="mt-1 text-sm text-white/45">{helper}</p> : null}
      <div
        className={`flex flex-wrap items-center gap-2 ${compact ? "mt-3" : "mt-4 sm:gap-3"}`}
        role="group"
        aria-labelledby={yearInputId}
      >
        <input
          ref={yearRef}
          id={yearInputId}
          name="weddingDateYear"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="YYYY"
          aria-label="Year (YYYY)"
          value={yearStr}
          onChange={onYearChange}
          maxLength={4}
          className={`${dateInputClass} w-[4.25rem] sm:w-[4.75rem]`}
        />
        <span className="text-white/35 select-none" aria-hidden>
          /
        </span>
        <input
          ref={monthRef}
          id={monthInputId}
          name="weddingDateMonth"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="MM"
          aria-label="Month (MM)"
          value={monthStr}
          onChange={onMonthChange}
          maxLength={2}
          className={`${dateInputClass} w-[3rem]`}
        />
        <span className="text-white/35 select-none" aria-hidden>
          /
        </span>
        <input
          ref={dayRef}
          id={dayInputId}
          name="weddingDateDay"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="DD"
          aria-label="Day (DD)"
          value={dayStr}
          onChange={onDayChange}
          maxLength={2}
          className={`${dateInputClass} w-[3rem]`}
        />
      </div>
    </div>
  );
}
