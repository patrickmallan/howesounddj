"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { TrustTarget } from "@/lib/post-availability-trust";
import { trackPostAvailabilityTrustClick } from "@/lib/post-availability-trust";

type Props = {
  href: string;
  trustTarget: TrustTarget;
  className?: string;
  children: ReactNode;
};

const trustLinkClass =
  "font-medium text-amber-200/80 underline decoration-white/20 underline-offset-4 transition hover:text-amber-100/95";

/** Internal trust link that emits `post_availability_trust_click` when session context is active. */
export function PostAvailabilityTrustLink({ href, trustTarget, className, children }: Props) {
  const onClick = () => trackPostAvailabilityTrustClick(trustTarget);

  const merged = [trustLinkClass, className].filter(Boolean).join(" ");

  if (href.startsWith("http")) {
    return (
      <a href={href} className={merged} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={merged} onClick={onClick}>
      {children}
    </Link>
  );
}
