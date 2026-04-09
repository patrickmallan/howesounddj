"use client";

import { useCallback, useState } from "react";
import type { ContactApiResponse } from "@/types/contact-api";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-amber-300/40 focus:ring-2 focus:ring-amber-300/20";
const inputErrorClass = "border-red-400/40 focus:border-red-400/50 focus:ring-red-400/15";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const resetFieldError = useCallback((key: string) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessage(null);
    setFieldErrors({});
    setStatus("submitting");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const body = {
      name: String(fd.get("name") ?? ""),
      partnerName: String(fd.get("partnerName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      weddingDate: String(fd.get("weddingDate") ?? ""),
      venue: String(fd.get("venue") ?? ""),
      guestCount: String(fd.get("guestCount") ?? ""),
      servicesNeeded: String(fd.get("servicesNeeded") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let data: ContactApiResponse;
      try {
        data = (await res.json()) as ContactApiResponse;
      } catch {
        setStatus("error");
        setFormMessage("We could not read the response. Please try again.");
        return;
      }

      if (!res.ok || !data.success) {
        setStatus("error");
        setFormMessage(
          data.message ||
            "We could not send that just now. Please try again in a moment."
        );
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        return;
      }

      setStatus("success");
      setFormMessage(data.message || "Your note is in.");
      form.reset();
    } catch {
      setStatus("error");
      setFormMessage(
        "Something interrupted the send — your connection may have dropped. Please try again."
      );
    }
  };

  if (status === "success" && formMessage) {
    return (
      <div
        className="rounded-[2rem] border border-amber-300/25 bg-amber-300/5 p-8 lg:p-10"
        role="status"
        aria-live="polite"
      >
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
          Thank you
        </div>
        <p className="mt-4 text-lg leading-8 text-white/85">{formMessage}</p>
        <p className="mt-4 text-sm leading-7 text-white/55">
          If anything urgent shifts with your date or venue, send another note — it helps keep the
          thread accurate.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setFormMessage(null);
          }}
          className="mt-8 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:border-white/35 hover:bg-white/5"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-neutral-950/80 p-6 lg:p-8">
      {formMessage && status === "error" ? (
        <div
          className="mb-6 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white/75"
          role="alert"
        >
          {formMessage}
        </div>
      ) : null}

      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
              Your name <span className="text-amber-300/90">*</span>
            </span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Your first and last name"
              onChange={() => resetFieldError("name")}
              className={`${inputClass} ${fieldErrors.name ? inputErrorClass : ""}`}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "err-name" : undefined}
            />
            {fieldErrors.name ? (
              <span id="err-name" className="mt-1 block text-xs text-red-300/90">
                {fieldErrors.name}
              </span>
            ) : null}
          </label>
          <label className="block sm:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
              Partner name
            </span>
            <input
              name="partnerName"
              type="text"
              autoComplete="off"
              placeholder="Partner’s name"
              onChange={() => resetFieldError("partnerName")}
              className={`${inputClass} ${fieldErrors.partnerName ? inputErrorClass : ""}`}
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
            Email <span className="text-amber-300/90">*</span>
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@email.com"
            onChange={() => resetFieldError("email")}
            className={`${inputClass} ${fieldErrors.email ? inputErrorClass : ""}`}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "err-email" : undefined}
          />
          {fieldErrors.email ? (
            <span id="err-email" className="mt-1 block text-xs text-red-300/90">
              {fieldErrors.email}
            </span>
          ) : null}
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
            Phone <span className="font-normal text-white/35">(optional)</span>
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Best number for a quick follow-up"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
            Wedding date <span className="text-amber-300/90">*</span>
          </span>
          <input
            name="weddingDate"
            type="text"
            required
            placeholder="e.g. August 16, 2026 — or “summer 2027”"
            onChange={() => resetFieldError("weddingDate")}
            className={`${inputClass} ${fieldErrors.weddingDate ? inputErrorClass : ""}`}
            aria-invalid={Boolean(fieldErrors.weddingDate)}
            aria-describedby={fieldErrors.weddingDate ? "err-weddingDate" : undefined}
          />
          {fieldErrors.weddingDate ? (
            <span id="err-weddingDate" className="mt-1 block text-xs text-red-300/90">
              {fieldErrors.weddingDate}
            </span>
          ) : null}
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
              Venue / location <span className="text-amber-300/90">*</span>
            </span>
            <input
              name="venue"
              type="text"
              autoComplete="off"
              required
              placeholder="Venue name or area"
              onChange={() => resetFieldError("venue")}
              className={`${inputClass} ${fieldErrors.venue ? inputErrorClass : ""}`}
              aria-invalid={Boolean(fieldErrors.venue)}
              aria-describedby={fieldErrors.venue ? "err-venue" : undefined}
            />
            {fieldErrors.venue ? (
              <span id="err-venue" className="mt-1 block text-xs text-red-300/90">
                {fieldErrors.venue}
              </span>
            ) : null}
          </label>
          <label className="block sm:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
              Guest count
            </span>
            <input
              name="guestCount"
              type="text"
              inputMode="numeric"
              placeholder="Approximate is fine"
              className={inputClass}
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
            Services needed
          </span>
          <input
            name="servicesNeeded"
            type="text"
            placeholder="e.g. ceremony + reception, MC, uplighting"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
            Tell me about your wedding <span className="text-amber-300/90">*</span>
          </span>
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Vision, vibe, must-plays, do-not-plays — whatever helps tell your story."
            onChange={() => resetFieldError("message")}
            className={`${inputClass} resize-y leading-relaxed ${fieldErrors.message ? inputErrorClass : ""}`}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "err-message" : undefined}
          />
          {fieldErrors.message ? (
            <span id="err-message" className="mt-1 block text-xs text-red-300/90">
              {fieldErrors.message}
            </span>
          ) : null}
        </label>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-amber-300 px-6 py-3.5 text-sm font-semibold text-neutral-950 transition enabled:hover:scale-[1.01] enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Send inquiry"}
        </button>
      </form>
    </div>
  );
}
