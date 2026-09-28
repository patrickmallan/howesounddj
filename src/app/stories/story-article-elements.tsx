import Link from "next/link";
import type { ReactNode } from "react";
import { HeroSignalCopy } from "@/components/hero-signal-copy";

type StoryArticleHeaderProps = {
  after?: ReactNode;
  breadcrumbLabel: string;
  children: ReactNode;
  date: string;
  dateLabel: string;
  eyebrow: string;
  title: string;
  titleLines: readonly string[];
  tone: "cyan" | "green" | "pink" | "yellow";
};

export function StoryArticleHeader({
  after,
  breadcrumbLabel,
  children,
  date,
  dateLabel,
  eyebrow,
  title,
  titleLines,
  tone,
}: StoryArticleHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.12),transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <nav className="text-sm text-white/45" aria-label="Breadcrumb">
          <Link href="/" prefetch={false} className="transition hover:text-white/70">
            Home
          </Link>
          <span className="mx-2 text-white/25" aria-hidden>
            /
          </span>
          <Link href="/stories" prefetch={false} className="transition hover:text-white/70">
            Stories
          </Link>
          <span className="mx-2 text-white/25" aria-hidden>
            /
          </span>
          <span className="text-white/65">{breadcrumbLabel}</span>
        </nav>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">{eyebrow}</p>
        <p className="mt-3 text-sm text-white/45">
          <time dateTime={date}>{dateLabel}</time>
          <span className="mx-2 text-white/25" aria-hidden>
            ·
          </span>
          Howe Sound DJ
        </p>
        <h1 className="hsdj-story-article-title mt-4 max-w-4xl" aria-label={title}>
          {titleLines.map((line) => <span key={line}>{line}</span>)}
        </h1>
        <HeroSignalCopy className="mt-6 max-w-3xl text-lg leading-8 text-white/70" tone={tone}>
          {children}
        </HeroSignalCopy>
        {after}
      </div>
    </header>
  );
}

type StoryArticleBlockProps = {
  children: ReactNode;
  eyebrow: string;
  title: string;
};

export function StoryArticleBlock({ eyebrow, title, children }: StoryArticleBlockProps) {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-14 lg:px-8">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{eyebrow}</div>
        <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">{title}</h2>
        <div className="mt-6 space-y-4 text-lg leading-8 text-white/70">{children}</div>
      </div>
    </section>
  );
}
