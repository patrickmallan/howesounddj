"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type AmbientDanceMontageProps = {
  fingerprintClassName: string;
  logoClassName: string;
  posterSrc?: string;
  videoSrc?: string;
};

export function AmbientDanceMontage({
  fingerprintClassName,
  logoClassName,
  posterSrc = "/images/home/hsdj-hero-montage-poster-v1.jpg",
  videoSrc = "/videos/hsdj-hero-montage-web-v1.mp4",
}: AmbientDanceMontageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const source = video.querySelector("source");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.poster = posterSrc;
      return;
    }

    const isVisible = () => {
      const bounds = video.getBoundingClientRect();
      return bounds.bottom > 0 && bounds.top < window.innerHeight && !document.hidden;
    };
    const playIfVisible = () => {
      if (source?.getAttribute("src") && isVisible()) void video.play().catch(() => undefined);
    };
    const prepare = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        video.poster = posterSrc;
        if (source) {
          source.src = videoSrc;
          video.load();
          playIfVisible();
        }
        prepare.disconnect();
      },
      { rootMargin: "300px 0px" },
    );
    prepare.observe(video);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && source?.src) {
          playIfVisible();
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    video.addEventListener("canplay", playIfVisible);
    document.addEventListener("visibilitychange", playIfVisible);
    return () => {
      prepare.disconnect();
      observer.disconnect();
      video.removeEventListener("canplay", playIfVisible);
      document.removeEventListener("visibilitychange", playIfVisible);
    };
  }, [posterSrc, videoSrc]);

  return (
    <>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source type="video/mp4" />
      </video>
      <div className={logoClassName} aria-hidden="true">
        <span data-video-overlay-mountains>
          <Image src="/images/logo/elements/hsdj-mountain-backdrop-v5.svg" alt="" fill sizes="(max-width: 700px) 100vw, 1240px" />
        </span>
        <span data-video-overlay-sasquatch>
          <Image src="/images/logo/characters/hsdj-sasquatch-patrick-pose-v1-transparent.png" alt="" fill sizes="(max-width: 700px) 70vw, 850px" />
        </span>
        <span data-video-overlay-title><b>Howe Sound</b><i>Wedding DJ</i></span>
        <span className={fingerprintClassName}>
          <Image
            src="/images/logo/elements/hsdj-fingerprint-disc-v1.png"
            alt=""
            fill
            sizes="14vw"
          />
        </span>
      </div>
    </>
  );
}
