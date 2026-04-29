"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { headlineVariantPayload } from "@/lib/experiment";
import type { ContactApiResponse } from "@/types/contact-api";

const SECONDARY_ANALYTICS = {
  surface: "contact_page_secondary",
  form_type: "inquiry_secondary",
} as const;

function clientPagePath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname;
}

function digitsOnly(value: string, maxLen: number): string {
  return value.replace(/\D/g, "").slice(0, maxLen);
}

/** Returns YYYY-MM-DD when all segments are complete and calendar-valid; otherwise "". */
function composedWeddingDate(yearStr: string, monthStr: string, dayStr: string): string {
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

function isForwardInput(e: React.ChangeEvent<HTMLInputElement>): boolean {
  const ie = e.nativeEvent as InputEvent;
  if (!ie.inputType) return true;
  return (
    ie.inputType !== "deleteContentBackward" &&
    ie.inputType !== "deleteContentForward" &&
    ie.inputType !== "deleteByCut"
  );
}

export function ContactSecondaryInquiryForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const turnstileSiteKeyResolved = useMemo(() => {
    const fromServer = turnstileSiteKey.trim();
    if (fromServer) return fromServer;
    return (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "").trim();
  }, [turnstileSiteKey]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [partner, setPartner] = useState("");
  const [phone, setPhone] = useState("");
  const [yearStr, setYearStr] = useState("");
  const [monthStr, setMonthStr] = useState("");
  const [dayStr, setDayStr] = useState("");
  const weddingDatePayload = useMemo(
    () => composedWeddingDate(yearStr, monthStr, dayStr),
    [yearStr, monthStr, dayStr]
  );
  const [venueOptional, setVenueOptional] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  /** True when `window.turnstile.render` is available (Script onLoad or deduped load from another form). */
  const [turnstileApiReady, setTurnstileApiReady] = useState(false);
  const [turnstileScriptTimedOut, setTurnstileScriptTimedOut] = useState(false);
  const [turnstileWidgetMountFailed, setTurnstileWidgetMountFailed] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const yearRef = useRef<HTMLInputElement | null>(null);
  const monthRef = useRef<HTMLInputElement | null>(null);
  const dayRef = useRef<HTMLInputElement | null>(null);
  const startedRef = useRef(false);

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const resetTurnstile = useCallback(() => {
    const id = turnstileWidgetIdRef.current;
    if (typeof window !== "undefined" && window.turnstile?.reset) {
      window.turnstile.reset(id ?? undefined);
    }
    setTurnstileToken("");
  }, []);

  const markTurnstileApiReady = useCallback(() => {
    if (typeof window !== "undefined" && window.turnstile?.render) {
      setTurnstileApiReady(true);
      setTurnstileScriptTimedOut(false);
      return true;
    }
    return false;
  }, []);

  /**
   * Next.js may dedupe multiple `<Script src="…api.js">`; the second instance’s `onLoad` may never run.
   * Poll for `window.turnstile` so this form still mounts the widget after the availability form loads the script.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    const markIfReady = () => {
      if (cancelled) return;
      if (window.turnstile?.render) {
        setTurnstileApiReady(true);
        setTurnstileScriptTimedOut(false);
        window.clearInterval(intervalId);
      }
    };
    const t0 = window.setTimeout(markIfReady, 0);
    const intervalId = window.setInterval(markIfReady, 100);
    const timeout = window.setTimeout(() => {
      if (cancelled || window.turnstile?.render) return;
      setTurnstileScriptTimedOut(true);
    }, 15_000);
    return () => {
      cancelled = true;
      window.clearTimeout(t0);
      window.clearInterval(intervalId);
      window.clearTimeout(timeout);
    };
  }, []);

  useLayoutEffect(() => {
    if (!turnstileSiteKeyResolved || !turnstileApiReady || turnstileWidgetMountFailed) return;
    const el = turnstileContainerRef.current;
    const api = window.turnstile;
    if (!el || !api?.render) return;
    if (turnstileWidgetIdRef.current) return;

    let widgetId: string;
    try {
      widgetId = api.render(el, {
        sitekey: turnstileSiteKeyResolved,
        theme: "dark",
        callback: (token: string) => {
          setTurnstileWidgetMountFailed(false);
          setTurnstileToken(token);
        },
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => {
          setTurnstileToken("");
          setTurnstileWidgetMountFailed(true);
          const id = turnstileWidgetIdRef.current;
          if (id && typeof window !== "undefined" && window.turnstile?.remove) {
            window.turnstile.remove(id);
          }
          turnstileWidgetIdRef.current = null;
        },
      });
    } catch {
      window.queueMicrotask(() => setTurnstileWidgetMountFailed(true));
      return;
    }
    turnstileWidgetIdRef.current = widgetId;
    return () => {
      if (widgetId && window.turnstile?.remove) window.turnstile.remove(widgetId);
      turnstileWidgetIdRef.current = null;
    };
  }, [turnstileSiteKeyResolved, turnstileApiReady, turnstileWidgetMountFailed]);

  function handleYearChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = digitsOnly(e.target.value, 4);
    setYearStr(v);
    if (v.length !== 4 || !isForwardInput(e)) return;
    const yn = Number(v);
    if (yn >= 2000 && yn <= 2100) {
      requestAnimationFrame(() => monthRef.current?.focus());
    }
  }

  function handleMonthChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = digitsOnly(e.target.value, 2);
    setMonthStr(v);
    if (v.length !== 2 || !isForwardInput(e)) return;
    const mn = Number(v);
    if (mn >= 1 && mn <= 12) {
      requestAnimationFrame(() => dayRef.current?.focus());
    }
  }

  function handleDayChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = digitsOnly(e.target.value, 2);
    setDayStr(v);
  }

  function handleMonthKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Backspace" || monthStr !== "") return;
    e.preventDefault();
    yearRef.current?.focus();
  }

  function handleDayKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Backspace" || dayStr !== "") return;
    e.preventDefault();
    monthRef.current?.focus();
  }

  function handleFocusCapture(e: React.FocusEvent<HTMLFormElement>) {
    if (startedRef.current) return;
    const t = e.target;
    if (!(t instanceof HTMLInputElement) && !(t instanceof HTMLTextAreaElement)) return;
    if (t.id === "secondary-inquiry-company") return;
    startedRef.current = true;
    trackEvent(ANALYTICS_EVENTS.contactFormStart, {
      ...SECONDARY_ANALYTICS,
      status: "start",
      page_path: clientPagePath(),
      ...headlineVariantPayload(),
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    trackEvent(ANALYTICS_EVENTS.contactFormSubmitAttempt, {
      ...SECONDARY_ANALYTICS,
      status: "attempt",
      ...headlineVariantPayload(),
    });
    if (!turnstileSiteKeyResolved || !turnstileToken) {
      trackEvent(ANALYTICS_EVENTS.contactFormSubmitError, {
        ...SECONDARY_ANALYTICS,
        status: "error",
        reason: "turnstile_pending",
        ...headlineVariantPayload(),
      });
      setFormMessage("Please complete the security check below.");
      setFormStatus("error");
      return;
    }
    setFormStatus("submitting");
    setFormMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "secondary_inquiry",
          name,
          email,
          partner: partner.trim(),
          phone: phone.trim(),
          weddingDate: weddingDatePayload,
          venue: venueOptional.trim(),
          message,
          turnstileToken,
          company: honeypot,
        }),
      });
      let data: ContactApiResponse;
      try {
        data = (await res.json()) as ContactApiResponse;
      } catch {
        trackEvent(ANALYTICS_EVENTS.contactFormSubmitError, {
          ...SECONDARY_ANALYTICS,
          status: "error",
          reason: "invalid_response",
          ...headlineVariantPayload(),
        });
        setFormStatus("error");
        setFormMessage("Something went wrong. Please refresh and try again.");
        return;
      }
      if (!data.success) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        trackEvent(ANALYTICS_EVENTS.contactFormSubmitError, {
          ...SECONDARY_ANALYTICS,
          status: "error",
          reason: "validation_or_server",
          ...headlineVariantPayload(),
        });
        setFormStatus("error");
        setFormMessage(data.message);
        resetTurnstile();
        return;
      }
      trackEvent(ANALYTICS_EVENTS.contactFormSubmitSuccess, {
        ...SECONDARY_ANALYTICS,
        status: "success",
        ...headlineVariantPayload(),
      });
      setFormStatus("success");
      setFormMessage(data.message);
    } catch {
      trackEvent(ANALYTICS_EVENTS.contactFormSubmitError, {
        ...SECONDARY_ANALYTICS,
        status: "error",
        reason: "network",
        ...headlineVariantPayload(),
      });
      setFormStatus("error");
      setFormMessage("Network error. Please check your connection and try again.");
      resetTurnstile();
    }
  }

  const inputClassBase =
    "w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/50";
  const inputClass = `mt-2 ${inputClassBase}`;
  const dateSegmentClass =
    "rounded-xl border border-white/15 bg-neutral-950 px-3 py-3 text-center text-sm text-white outline-none focus:border-amber-300/50 tabular-nums";

  const emailOk = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()), [email]);
  const requiredFieldsComplete = useMemo(
    () => Boolean(name.trim() && emailOk && message.trim()),
    [name, emailOk, message]
  );

  const submitDisabledReason = useMemo((): "submitting" | "fields" | "turnstile" | null => {
    if (formStatus === "submitting") return "submitting";
    if (!requiredFieldsComplete) return "fields";
    if (!turnstileSiteKeyResolved) return "turnstile";
    if (turnstileScriptTimedOut || turnstileWidgetMountFailed) return "turnstile";
    if (!turnstileToken) return "turnstile";
    return null;
  }, [
    formStatus,
    requiredFieldsComplete,
    turnstileSiteKeyResolved,
    turnstileScriptTimedOut,
    turnstileWidgetMountFailed,
    turnstileToken,
  ]);

  const submitButtonLabel =
    formStatus === "submitting"
      ? "Sending…"
      : turnstileScriptTimedOut || turnstileWidgetMountFailed
        ? "Send message"
        : submitDisabledReason === "fields"
          ? "Send message"
          : submitDisabledReason === "turnstile" && turnstileSiteKeyResolved
            ? "Complete security check"
            : "Send message";

  const showTurnstileLoading =
    turnstileSiteKeyResolved && !turnstileApiReady && !turnstileScriptTimedOut;
  const showTurnstileError =
    turnstileSiteKeyResolved && ((turnstileScriptTimedOut && !turnstileApiReady) || turnstileWidgetMountFailed);

  return (
    <div className="mt-8">
      <p className="mb-6 text-sm leading-relaxed text-white/55">
        Prefer not to chat yet? Send a quick message. Not ready yet? Send a note and I&apos;ll personally follow
        up, no pressure for a phone call unless you prefer one later.
      </p>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={markTurnstileApiReady}
      />
      <form
        onSubmit={onSubmit}
        onFocusCapture={handleFocusCapture}
        className="relative space-y-4 rounded-2xl border border-white/10 bg-neutral-950/50 p-6 lg:p-7"
        noValidate
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-white/60" htmlFor="secondary-inquiry-name">
              Your name
            </label>
            <input
              id="secondary-inquiry-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              autoComplete="name"
            />
            {fieldErrors.name ? <p className="mt-1 text-sm text-rose-300/90">{fieldErrors.name}</p> : null}
          </div>
          <div>
            <label className="text-sm text-white/60" htmlFor="secondary-inquiry-email">
              Email
            </label>
            <input
              id="secondary-inquiry-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              autoComplete="email"
            />
            {fieldErrors.email ? <p className="mt-1 text-sm text-rose-300/90">{fieldErrors.email}</p> : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-white/60" htmlFor="secondary-inquiry-partner">
              Partner / second contact <span className="text-white/35">(optional)</span>
            </label>
            <input
              id="secondary-inquiry-partner"
              name="partner"
              value={partner}
              onChange={(e) => setPartner(e.target.value)}
              autoComplete="name"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-white/60" htmlFor="secondary-inquiry-phone">
              Phone <span className="text-white/35">(optional)</span>
            </label>
            <input
              id="secondary-inquiry-phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-white/60" htmlFor="secondary-inquiry-date-year">
              Wedding date <span className="text-white/35">(optional)</span>
            </label>
            <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3">
              <input
                ref={yearRef}
                id="secondary-inquiry-date-year"
                name="secondaryInquiryWeddingDateYear"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="YYYY"
                aria-label="Wedding date year (YYYY), optional"
                value={yearStr}
                onChange={handleYearChange}
                maxLength={4}
                className={`${dateSegmentClass} w-[4.75rem] sm:w-[5.25rem]`}
              />
              <span className="text-white/35 select-none" aria-hidden>
                /
              </span>
              <input
                ref={monthRef}
                id="secondary-inquiry-date-month"
                name="secondaryInquiryWeddingDateMonth"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="MM"
                aria-label="Wedding date month (MM), optional"
                value={monthStr}
                onChange={handleMonthChange}
                onKeyDown={handleMonthKeyDown}
                maxLength={2}
                className={`${dateSegmentClass} w-[3.25rem]`}
              />
              <span className="text-white/35 select-none" aria-hidden>
                /
              </span>
              <input
                ref={dayRef}
                id="secondary-inquiry-date-day"
                name="secondaryInquiryWeddingDateDay"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="DD"
                aria-label="Wedding date day (DD), optional"
                value={dayStr}
                onChange={handleDayChange}
                onKeyDown={handleDayKeyDown}
                maxLength={2}
                className={`${dateSegmentClass} w-[3.25rem]`}
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-white/60" htmlFor="secondary-inquiry-venue">
              Venue <span className="text-white/35">(optional)</span>
            </label>
            <input
              id="secondary-inquiry-venue"
              value={venueOptional}
              onChange={(e) => setVenueOptional(e.target.value)}
              placeholder="e.g. Whistler, Squamish, TBD"
              className={`${inputClass} placeholder:text-white/25`}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-white/60" htmlFor="secondary-inquiry-message">
            Message or question
          </label>
          <textarea
            id="secondary-inquiry-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Ask anything that would help you decide your next step."
            className={`${inputClass} resize-y placeholder:text-white/25`}
          />
          {fieldErrors.message ? <p className="mt-1 text-sm text-rose-300/90">{fieldErrors.message}</p> : null}
        </div>

        <div className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden>
          <label htmlFor="secondary-inquiry-company">Company</label>
          <input
            id="secondary-inquiry-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {turnstileSiteKeyResolved ? (
          <div className="space-y-2">
            {showTurnstileLoading ? (
              <p className="text-sm text-white/55" aria-live="polite">
                Security check loading…
              </p>
            ) : null}
            {showTurnstileError ? (
              <p className="text-sm text-rose-300/90" role="alert">
                Security check could not load. Please refresh and try again.
              </p>
            ) : null}
            <div ref={turnstileContainerRef} className="w-full max-w-full overflow-x-auto" />
          </div>
        ) : (
          <p className="text-sm text-white/45">
            Spam protection is not configured. Use the availability section above or book a consult
            from the consult section higher on this page.
          </p>
        )}

        {formStatus === "error" && formMessage ? (
          <p className="text-sm text-rose-300/90" role="alert">
            {formMessage}
          </p>
        ) : null}
        {formStatus === "success" ? (
          <p className="text-sm text-amber-200/95" role="status">
            {formMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitDisabledReason !== null}
          aria-busy={formStatus === "submitting"}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-center text-sm font-semibold text-white/90 transition hover:border-white/35 hover:bg-white/10 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.03] disabled:text-white/40 disabled:hover:border-white/10 disabled:hover:bg-white/[0.03]"
        >
          {submitButtonLabel}
        </button>
      </form>
    </div>
  );
}
