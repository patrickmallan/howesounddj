"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** CSS handles each frame; this only starts/stops motion as the artwork enters view. */
export function ReviewMotionRegion({ children, className, decorative = false }: { children: ReactNode; className: string; decorative?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 720px)");
    let visible = false;
    // The record and waveforms are part of the mobile page's content, not an optional reveal.
    // Use a slower CSS cadence on reduced-motion phones, but keep them moving while visible.
    const sync = () => element.setAttribute("data-motion-active", String(visible && !document.hidden && (!reduced.matches || mobile.matches)));
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.01 });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    mobile.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      mobile.removeEventListener("change", sync);
    };
  }, []);
  return <div ref={ref} className={className} data-review-motion="" data-motion-active="false" aria-hidden={decorative || undefined}>{children}</div>;
}
