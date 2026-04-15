import Link from "next/link";

const navLinks = [
  { href: "/weddings", label: "Weddings" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="min-w-0 text-left transition hover:opacity-90"
          aria-label="Howe Sound DJ home"
        >
          <div className="text-lg font-semibold tracking-[0.2em] uppercase text-amber-300">Howe Sound DJ</div>
          <div className="text-xs text-white/60">Squamish Wedding DJ</div>
        </Link>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <nav
            className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-white/80 md:flex"
            aria-label="Primary"
          >
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <details className="relative md:hidden">
            <summary className="flex min-h-[44px] min-w-[44px] cursor-pointer list-none items-center justify-center rounded-full border border-white/15 px-3 text-sm text-white/85 outline-none transition hover:border-white/25 [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <nav
              className="absolute right-0 z-50 mt-2 flex w-52 flex-col divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-neutral-950/95 shadow-xl shadow-black/40 backdrop-blur"
              aria-label="Mobile primary"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-sm text-white/85 transition hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-amber-300 px-4 text-sm font-semibold text-neutral-950 transition hover:scale-[1.02] sm:min-h-0 sm:px-5 sm:py-2.5"
          >
            Check Availability
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 text-sm text-white/45 lg:px-8">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-base font-semibold text-white/90">Howe Sound DJ</div>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-white/50">
              Personalized music and professional planning for Sea-to-Sky weddings, from ceremony through reception.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 self-start rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/30 hover:bg-white/5 md:self-auto"
          >
            Check Availability
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white/70">
              {item.label}
            </Link>
          ))}
        </div>
        <p className="text-sm text-white/40">
          <Link href="/vancouver-wedding-dj" className="transition hover:text-white/65">
            Vancouver couples · Sea-to-Sky and Squamish weddings
          </Link>
        </p>
        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="text-white/40">© {year} Howe Sound DJ. Squamish Wedding DJ.</div>
          <div className="text-white/40">Serving Squamish, Whistler, Vancouver, and the Sea-to-Sky corridor.</div>
        </div>
      </div>
    </footer>
  );
}
