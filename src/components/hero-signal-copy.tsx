import { Children, type ReactNode } from "react";

type HeroSignalCopyProps = {
  children: ReactNode;
  className?: string;
  tone?: "cyan" | "green" | "pink" | "yellow";
};

function splitTextIntoBeats(text: string): string[] {
  const sentences = text.trim().match(/[^.!?]+(?:[.!?]+(?=\s|$)|$)/g) ?? [text];

  return sentences.flatMap((sentence) => {
    const clean = sentence.trim();
    if (clean.length < 92) return [clean];

    const candidates = [...clean.matchAll(/[,;:]\s+/g)];
    if (!candidates.length) return [clean];
    const middle = clean.length / 2;
    const split = candidates.reduce((best, match) => {
      const index = (match.index ?? 0) + match[0].length;
      return Math.abs(index - middle) < Math.abs(best - middle) ? index : best;
    }, (candidates[0].index ?? 0) + candidates[0][0].length);

    return [clean.slice(0, split).trim(), clean.slice(split).trim()];
  }).filter(Boolean);
}

/** Server-rendered editorial light lines that turn a hero promise into paced reading beats. */
export function HeroSignalCopy({
  children,
  className = "",
  tone = "cyan",
}: HeroSignalCopyProps) {
  const nodes = Children.toArray(children);
  const beats = nodes.length === 1 && typeof nodes[0] === "string"
    ? splitTextIntoBeats(nodes[0])
    : nodes;

  return (
    <div className={`hsdj-hero-signal-copy hsdj-hero-signal-copy--${tone}`}>
      <p className={className}>
        {beats.map((beat, index) => (
          <span className="hsdj-hero-signal-copy__beat" key={typeof beat === "string" ? beat : index}>
            <span className="hsdj-hero-signal-copy__ink">{beat}</span>
            {index < beats.length - 1 ? " " : null}
          </span>
        ))}
      </p>
    </div>
  );
}
