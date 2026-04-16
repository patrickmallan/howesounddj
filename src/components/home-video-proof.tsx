import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { CheckAvailabilityTrackedLink } from "@/components/check-availability-tracked-link";

const LOGO_SRC = "/images/logo/howe-sound-logo.webp";

const VIDEO_PUBLIC_PATH = "videos/home-proof.mp4";
/** Uses the same still as the home proof strip (`SITE_IMAGES.homeProof`); no separate poster asset shipped. */
const POSTER_PUBLIC_PATH = "images/home/home-proof.webp";

const VIDEO_SRC = `/${VIDEO_PUBLIC_PATH}`;
const POSTER_SRC = `/${POSTER_PUBLIC_PATH}`;

function assetExists(relativeToPublic: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", relativeToPublic));
  } catch {
    return false;
  }
}

export function HomeVideoProof() {
  const hasVideo = assetExists(VIDEO_PUBLIC_PATH);
  const hasPoster = assetExists(POSTER_PUBLIC_PATH);

  return (
    <section
      className="border-b border-white/10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(253,224,71,0.06),transparent_55%)]"
      aria-labelledby="home-video-proof-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">In motion</div>
          <h2 id="home-video-proof-heading" className="mt-4 text-3xl font-semibold sm:text-4xl">
            See how the night feels
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            A packed dance floor says more than another paragraph ever could. Here’s a quick look at the kind of energy,
            flow, and atmosphere Howe Sound DJ helps create.
          </p>
        </div>

        {hasVideo ? (
          <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-900 shadow-2xl shadow-black/40">
            <video
              className="relative z-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controls
              poster={hasPoster ? POSTER_SRC : undefined}
              aria-label="Illustrative dance floor and celebration atmosphere. Plays muted on a loop; use controls to pause or unmute"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
            {/* Softening layers: reduce harsh motion detail; pointer-events-none keeps video controls clickable */}
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-black/20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/25 via-transparent to-black/35"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/25 via-transparent to-transparent"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-3 sm:px-4">
              <Image
                src={LOGO_SRC}
                alt=""
                width={2000}
                height={2000}
                className="h-auto w-[78%] max-w-[600px] object-contain opacity-[0.76] md:w-[62%]"
                sizes="(max-width: 768px) 80vw, 600px"
                priority={false}
              />
            </div>
          </div>
        ) : null}

        <p className={`text-sm leading-relaxed text-white/50 ${hasVideo ? "mt-4" : "mt-10"}`}>
          The goal is always the same: connection, flow, and Sea-to-Sky celebration energy, with a floor that stays with you.
        </p>
        <div className="mt-8">
          <CheckAvailabilityTrackedLink
            surface="inline"
            className="inline-flex rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
          />
        </div>
      </div>
    </section>
  );
}
