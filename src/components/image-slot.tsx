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
  alt: string;
  aspect: AspectKey;
  /** Short label for the reserved zone (e.g. “Hero image”). */
  label: string;
  /** One line describing what belongs here when `src` is null. */
  reservedHint: string;
  priority?: boolean;
  sizes?: string;
  /** Optional caption or callout below or inside the slot. */
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
            className="object-cover"
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
        className={`flex flex-col justify-between rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-neutral-900/90 to-neutral-950 p-6 ${aspectClass[aspect]}`}
        role="presentation"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/85">{label}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">{reservedHint}</p>
        </div>
        <p className="mt-auto max-w-xs text-xs leading-relaxed text-white/40">
          Reserved for photography — ready when your assets are.
        </p>
      </div>
      {children ? <figcaption className="text-sm text-white/55">{children}</figcaption> : null}
    </figure>
  );
}
