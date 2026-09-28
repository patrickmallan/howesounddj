"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function prefersReducedMotion() {
  return window.matchMedia(motionQuery).matches;
}

export function AboutHeroGroove() {
  const reducedMotion = useSyncExternalStore(subscribeToMotionPreference, prefersReducedMotion, () => true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    let visible = false;
    const updatePlayback = () => {
      const shouldPlay = visible && !document.hidden;
      video.closest(".about-hero-portrait")?.toggleAttribute("data-motion-active", shouldPlay);
      if (shouldPlay) void video.play().catch(() => undefined);
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    }, { rootMargin: "100px", threshold: 0.05 });
    observer.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      video.closest(".about-hero-portrait")?.removeAttribute("data-motion-active");
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <Image
        className="about-hero-groove-media"
        src="/images/about/patrick-groove-poster-v1.webp"
        alt="Patrick DJing at a wedding, seen from the side"
        width={800}
        height={1080}
        sizes="(max-width: 760px) 82vw, 50vw"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="about-hero-groove-media"
      aria-label="Patrick DJing at a wedding, gently moving to the music"
      loop
      muted
      playsInline
      preload="metadata"
      poster="/images/about/patrick-groove-poster-v1.webp"
    >
      <source media="(max-width: 760px)" src="/videos/about/patrick-groove-cutout-v1-480.webm" type="video/webm" />
      <source src="/videos/about/patrick-groove-cutout-v1.webm" type="video/webm" />
    </video>
  );
}
