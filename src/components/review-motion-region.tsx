"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** CSS handles each frame; this only starts/stops motion as the artwork enters view. */
export function ReviewMotionRegion({ children, className, decorative = false }: { children: ReactNode; className: string; decorative?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => element.setAttribute("data-motion-active", String(visible && !document.hidden && !reduced.matches));
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.01 });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);
  return <div ref={ref} className={className} data-review-motion="" data-motion-active="false" aria-hidden={decorative || undefined}>{children}</div>;
}
