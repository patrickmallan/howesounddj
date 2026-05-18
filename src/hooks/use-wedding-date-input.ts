"use client";

import { useMemo, useRef, useState } from "react";
import {
  composedWeddingDate,
  digitsOnly,
  isForwardInput,
} from "@/lib/wedding-date-input";

type Options = {
  /** Called when any date segment changes (e.g. reset availability result). */
  onSegmentsChange?: () => void;
  yearInputId?: string;
};

export function useWeddingDateInput(options: Options = {}) {
  const { onSegmentsChange, yearInputId = "wedding-date-year" } = options;
  const [yearStr, setYearStr] = useState("");
  const [monthStr, setMonthStr] = useState("");
  const [dayStr, setDayStr] = useState("");
  const [dateError, setDateError] = useState("");

  const weddingDate = useMemo(
    () => composedWeddingDate(yearStr, monthStr, dayStr),
    [yearStr, monthStr, dayStr]
  );

  const yearRef = useRef<HTMLInputElement | null>(null);
  const monthRef = useRef<HTMLInputElement | null>(null);
  const dayRef = useRef<HTMLInputElement | null>(null);

  function resetSegments() {
    setYearStr("");
    setMonthStr("");
    setDayStr("");
    setDateError("");
    onSegmentsChange?.();
  }

  function notifyChange() {
    setDateError("");
    onSegmentsChange?.();
  }

  function handleYearChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = digitsOnly(e.target.value, 4);
    setYearStr(v);
    notifyChange();
    if (v.length !== 4 || !isForwardInput(e)) return;
    const yn = Number(v);
    if (yn >= 2000 && yn <= 2100) {
      requestAnimationFrame(() => monthRef.current?.focus());
    }
  }

  function handleMonthChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = digitsOnly(e.target.value, 2);
    setMonthStr(v);
    notifyChange();
    if (v.length !== 2 || !isForwardInput(e)) return;
    const mn = Number(v);
    if (mn >= 1 && mn <= 12) {
      requestAnimationFrame(() => dayRef.current?.focus());
    }
  }

  function handleDayChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = digitsOnly(e.target.value, 2);
    setDayStr(v);
    notifyChange();
  }

  function focusYear() {
    requestAnimationFrame(() => {
      const el = yearRef.current ?? document.getElementById(yearInputId);
      el?.focus();
    });
  }

  return {
    yearStr,
    monthStr,
    dayStr,
    weddingDate,
    dateError,
    setDateError,
    yearRef,
    monthRef,
    dayRef,
    yearInputId,
    handleYearChange,
    handleMonthChange,
    handleDayChange,
    resetSegments,
    focusYear,
  };
}
