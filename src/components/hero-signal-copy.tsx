import type { ReactNode } from "react";

type HeroSignalCopyProps = {
  children: ReactNode;
  className?: string;
  tone?: "cyan" | "green" | "pink" | "yellow";
};

/** A lightweight, server-rendered signal plate for the short promise beneath page heroes. */
export function HeroSignalCopy({
  children,
  className = "",
  tone = "cyan",
}: HeroSignalCopyProps) {
  return (
    <div className={`hsdj-hero-signal-copy hsdj-hero-signal-copy--${tone}`}>
      <span className="hsdj-hero-signal-copy__meter" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </span>
      <p className={className}>{children}</p>
    </div>
  );
}
