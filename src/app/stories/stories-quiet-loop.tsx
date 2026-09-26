"use client";

import { useEffect, useRef } from "react";

export function StoriesQuietLoop() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const syncPlayback = () => {
      if (visible && !reducedMotion.matches && !document.hidden) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.3 },
    );

    observer.observe(video);
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <figure className="contact-sheet-reel">
      <video
        ref={videoRef}
        controls
        loop
        muted
        playsInline
        preload="none"
        poster="/images/stories/patrick-live-booth-closeup-poster-v1.webp"
        aria-label="Silent real footage of Patrick DJing and the wedding room, fading between two moments"
      >
        <source src="/videos/stories/patrick-behind-the-booth-loop-v1.mp4" type="video/mp4" />
        Your browser does not support video playback.
      </video>
      <figcaption>Real footage from a wedding night. Silent edit.</figcaption>
    </figure>
  );
}
