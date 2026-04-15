import Image from "next/image";
import type { ReactNode } from "react";

type AspectKey = "4/5" | "16/9" | "3/2";

const aspectClass: Record<AspectKey, string> = {
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
  "3/2": "aspect-[3/2]",
};

type ImageSlotProps = {
  src: string | null;
  /** Required for real images: describe the subject for accessibility when `src` is set. */
  alt: string;
  aspect: AspectKey;
  /** Short eyebrow when empty, visitor-facing (e.g. “Reception”, “The corridor”). */
  label: string;
  /** Empty-state copy: mood and intent, not file instructions (operators use `public/images/README.md`). */
  reservedHint: string;
  priority?: boolean;
  sizes?: string;
  /** Merged with `object-cover` for fine-tuning focal point (e.g. landscape in a portrait frame). */
  imageClassName?: string;
  /** Optional caption below the image (or below the empty state). */
  children?: ReactNode;
  className?: string;
};

export function ImageSlot({
  src,
  alt,
  aspect,
  label,
  reservedHint,
  priority,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  imageClassName,
  children,
  className = "",
}: ImageSlotProps) {
  const frame = `relative w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-900 ${aspectClass[aspect]}`;

  if (src) {
    const isSvg = src.endsWith(".svg");
    return (
      <figure className={`space-y-4 ${className}`}>
        <div className={frame}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={imageClassName ? `object-cover ${imageClassName}` : "object-cover"}
            unoptimized={isSvg}
          />
        </div>
        {children ? <figcaption className="text-sm text-white/55">{children}</figcaption> : null}
      </figure>
    );
  }

  return (
    <figure className={`space-y-4 ${className}`}>
      <div
        className={`relative flex flex-col justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-neutral-900/95 to-neutral-950 p-8 shadow-inner shadow-black/30 ${aspectClass[aspect]}`}
        role="presentation"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(251,191,36,0.06),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.28] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:22px_22px]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-sm text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300/75">{label}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/55">{reservedHint}</p>
        </div>
      </div>
      {children ? <figcaption className="text-sm text-white/55">{children}</figcaption> : null}
    </figure>
  );
}
