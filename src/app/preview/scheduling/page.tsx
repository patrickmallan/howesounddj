import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isIsolatedPreview } from "@/lib/is-isolated-preview";

export const metadata: Metadata = {
  title: "Consultation handoff paused in preview",
  robots: { index: false, follow: false },
};

export default function PreviewSchedulingPage() {
  if (!isIsolatedPreview()) notFound();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-6 py-16 text-white">
      <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Protected preview</p>
      <h1 className="text-4xl font-black uppercase leading-tight sm:text-6xl">No booking is made here.</h1>
      <p className="max-w-2xl text-lg leading-relaxed text-slate-200">
        This is a test version of the website. Consultation links are paused so no one can book a real Sound Check while this candidate is being reviewed.
      </p>
      <Link className="w-fit rounded-full bg-amber-300 px-6 py-3 font-bold text-black focus-visible:outline-4 focus-visible:outline-cyan-300" href="/contact">
        Back to contact
      </Link>
    </main>
  );
}
