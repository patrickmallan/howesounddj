"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ContactSecondaryInquiryForm = dynamic(() =>
  import("@/components/contact-secondary-inquiry-form").then(
    (module) => module.ContactSecondaryInquiryForm,
  ),
);

export function ContactMessageDrawer({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#send-message") setOpen(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section id="send-message" className="scroll-mt-24 border-t border-white/10 bg-[#070909]">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="border-l-4 border-cyan-300 pl-5 sm:flex sm:items-center sm:justify-between sm:gap-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">No date yet?</p>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-[#f8f1e8] sm:text-3xl">
              Send me what you know.
            </h2>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-white/65">
              A rough month, a venue idea, or a plain question is enough.
            </p>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="contact-message-form"
            onClick={() => setOpen((value) => !value)}
            className="mt-6 inline-flex min-h-12 items-center justify-center border-2 border-cyan-300 bg-cyan-300 px-6 py-3 text-sm font-black uppercase tracking-[0.08em] !text-[#070909] transition hover:bg-transparent hover:!text-cyan-200 sm:mt-0"
          >
            {open ? "Close message" : "Write a message"}
          </button>
        </div>

        {open ? (
          <div id="contact-message-form" className="mt-10 border-t border-white/15 pt-8">
            <ContactSecondaryInquiryForm turnstileSiteKey={turnstileSiteKey} />
          </div>
        ) : null}

        <p className="mt-8 text-sm text-white/45">
          Planner, venue, or vendor? Email{" "}
          <a
            href="mailto:patrick@howesounddj.com"
            className="font-semibold text-white/75 underline decoration-cyan-300/60 underline-offset-4 hover:text-cyan-200"
          >
            patrick@howesounddj.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
