import type { ChangeEvent } from "react";

/** Shared wedding date segment helpers for availability checkers. */

export function digitsOnly(value: string, maxLen: number): string {
  return value.replace(/\D/g, "").slice(0, maxLen);
}

/** Returns YYYY-MM-DD when all segments are complete and calendar-valid; otherwise "". */
export function composedWeddingDate(yearStr: string, monthStr: string, dayStr: string): string {
  if (yearStr.length !== 4 || monthStr.length !== 2 || dayStr.length !== 2) return "";
  const yi = Number(yearStr);
  const mi = Number(monthStr);
  const di = Number(dayStr);
  if (yi < 2000 || yi > 2100) return "";
  if (mi < 1 || mi > 12) return "";
  if (di < 1 || di > 31) return "";
  const dt = new Date(yi, mi - 1, di);
  if (dt.getFullYear() !== yi || dt.getMonth() !== mi - 1 || dt.getDate() !== di) return "";
  return `${yearStr}-${monthStr}-${dayStr}`;
}

export function isForwardInput(e: ChangeEvent<HTMLInputElement>): boolean {
  const ie = e.nativeEvent as InputEvent;
  if (!ie.inputType) return true;
  return (
    ie.inputType !== "deleteContentBackward" &&
    ie.inputType !== "deleteContentForward" &&
    ie.inputType !== "deleteByCut"
  );
}
