"use client";

import type { RefObject } from "react";

const dateInputBase =
  "rounded-xl border border-white/15 bg-neutral-950 text-center text-sm text-white outline-none focus:border-amber-300/50 tabular-nums";

const dateSlashClass = "hidden shrink-0 text-white/35 select-none sm:inline";

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
        className={`flex max-w-full flex-col gap-2.5 sm:flex-row sm:flex-nowrap sm:items-center ${compact ? "mt-3 sm:gap-2.5" : "mt-4 sm:gap-3"}`}
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
          className={`${dateInputBase} min-h-[44px] w-full px-3 py-2.5 sm:w-auto sm:min-w-[4.5rem] sm:flex-none sm:px-2.5 md:min-w-[4.75rem]`}
        />
        <span className={dateSlashClass} aria-hidden>
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
          className={`${dateInputBase} min-h-[44px] w-full px-3 py-2.5 sm:w-auto sm:min-w-[3.5rem] sm:flex-none sm:px-2.5`}
        />
        <span className={dateSlashClass} aria-hidden>
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
          className={`${dateInputBase} min-h-[44px] w-full px-3 py-2.5 sm:w-auto sm:min-w-[3.5rem] sm:flex-none sm:px-2.5`}
        />
      </div>
    </div>
  );
}
