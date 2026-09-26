"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";

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
  const [videoFailed, setVideoFailed] = useState(false);

  if (reducedMotion || videoFailed) {
    return (
      <Image
        className="about-hero-groove-media"
        src="/images/about/patrick-groove-poster-v1.png"
        alt="Patrick DJing at a wedding, seen from the side"
        width={800}
        height={1080}
        sizes="(max-width: 760px) 82vw, 50vw"
        priority
      />
    );
  }

  return (
    <video
      className="about-hero-groove-media"
      aria-label="Patrick DJing at a wedding, gently moving to the music"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster="/images/about/patrick-groove-poster-v1.png"
      onError={() => setVideoFailed(true)}
    >
      <source src="/videos/about/patrick-groove-cutout-v1.webm" type="video/webm" />
    </video>
  );
}
