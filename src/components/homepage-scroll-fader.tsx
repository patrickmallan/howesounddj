"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/homepage-redesign.module.css";

export function HomepageScrollFader() {
  const faderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = faderRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || reducedMotion.matches) return;
    if (CSS.supports("animation-timeline: scroll()")) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
      element.style.setProperty("--page-progress", String(Math.min(1, Math.max(0, progress))));
    };
    const queueUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={faderRef} className={styles.pageFader} aria-hidden="true">
      <div className={styles.pageFaderLabel}>SET / PROGRESS</div>
      <div className={styles.pageFaderRail} />
      <div className={styles.pageFaderCap}><i /><i /><i /><i /><i /></div>
    </div>
  );
}
