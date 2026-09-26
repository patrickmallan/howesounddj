"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type AmbientDanceMontageProps = {
  fingerprintClassName: string;
  logoClassName: string;
};

export function AmbientDanceMontage({ fingerprintClassName, logoClassName }: AmbientDanceMontageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const source = video.querySelector("source");
    const prepare = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        video.poster = "/images/home/hsdj-hero-montage-poster-v1.jpg";
        if (!reducedMotion.matches && source) {
          source.src = "/videos/hsdj-hero-montage-web-v1.mp4";
          video.load();
        }
        prepare.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    prepare.observe(video);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reducedMotion.matches && source?.src) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    return () => {
      prepare.disconnect();
      observer.disconnect();
    };
  }, []);

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
        <Image
          src="/images/logo/lockups/hsdj-sasquatch-video-overlay-v14.webp"
          alt=""
          width={1600}
          height={900}
          sizes="(max-width: 700px) 100vw, 1240px"
        />
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
