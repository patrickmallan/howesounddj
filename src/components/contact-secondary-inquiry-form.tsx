"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
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

export function ContactSecondaryInquiryForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const turnstileSiteKeyResolved = useMemo(() => {
    const fromServer = turnstileSiteKey.trim();
    if (fromServer) return fromServer;
    return (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "").trim();
  }, [turnstileSiteKey]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [weddingDateOptional, setWeddingDateOptional] = useState("");
  const [venueOptional, setVenueOptional] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const weddingDateInputRef = useRef<HTMLInputElement>(null);
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

  useLayoutEffect(() => {
    if (!turnstileSiteKeyResolved || !turnstileReady || !turnstileContainerRef.current) return;
    const el = turnstileContainerRef.current;
    const api = window.turnstile;
    if (!api?.render) return;
    if (turnstileWidgetIdRef.current) return;
    const id = api.render(el, {
      sitekey: turnstileSiteKeyResolved,
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
    });
    turnstileWidgetIdRef.current = id;
    return () => {
      if (id && window.turnstile?.remove) window.turnstile.remove(id);
      turnstileWidgetIdRef.current = null;
    };
  }, [turnstileSiteKeyResolved, turnstileReady]);

  const openWeddingDatePicker = useCallback(() => {
    const el = weddingDateInputRef.current;
    if (!el) return;
    if (typeof el.showPicker === "function") {
      try {
        el.showPicker();
      } catch {
        el.focus();
      }
    } else {
      el.focus();
    }
  }, []);

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
          partnerName: "",
          phone: "",
          weddingDate: weddingDateOptional.trim(),
          venue: venueOptional.trim(),
          guestCount: "",
          servicesNeeded: "",
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

  return (
    <div className="mt-8">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => setTurnstileReady(true)}
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
            <label className="text-sm text-white/60" htmlFor="secondary-inquiry-date">
              Wedding date <span className="text-white/35">(optional)</span>
            </label>
            <div className="relative mt-2">
              <input
                ref={weddingDateInputRef}
                id="secondary-inquiry-date"
                type="date"
                value={weddingDateOptional}
                onChange={(e) => setWeddingDateOptional(e.target.value)}
                className={`${inputClassBase} pr-12`}
              />
              <button
                type="button"
                onClick={openWeddingDatePicker}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-lg p-1.5 text-amber-300/75 outline-none transition hover:bg-white/10 hover:text-amber-200/90 focus-visible:ring-2 focus-visible:ring-amber-400/45"
                aria-label="Open calendar to choose wedding date"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </button>
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
          <div ref={turnstileContainerRef} className="min-h-[65px]" />
        ) : (
          <p className="text-sm text-white/45">
            Spam protection is not configured. Use the availability section above or Book a Consult.
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
          disabled={
            formStatus === "submitting" ||
            !turnstileSiteKeyResolved ||
            (turnstileSiteKeyResolved ? !turnstileToken : false)
          }
          className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:border-white/35 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {formStatus === "submitting" ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
