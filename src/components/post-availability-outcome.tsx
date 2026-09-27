"use client";

import {
  POST_AVAILABILITY_MANUAL_COPY,
  POST_AVAILABILITY_UNAVAILABLE_COPY,
  POST_AVAILABILITY_SR_STATUS,
} from "@/config/post-availability-copy";
import { formatWeddingDateLong } from "@/lib/format-wedding-date";

type UnavailableProps = {
  kind: "unavailable";
  weddingDate: string;
  canonicalStatusMessage: string;
  onTryAnotherDate: () => void;
  sendMessageHref?: string;
  className?: string;
};

type ManualProps = {
  kind: "manual";
  weddingDate: string;
  canonicalStatusMessage: string;
  onTryAnotherDate: () => void;
  contactHref?: string;
  className?: string;
};

type Props = UnavailableProps | ManualProps;

export function PostAvailabilityOutcome(props: Props) {
  const formattedDate = formatWeddingDateLong(props.weddingDate);
  const copy =
    props.kind === "unavailable"
      ? POST_AVAILABILITY_UNAVAILABLE_COPY
      : POST_AVAILABILITY_MANUAL_COPY;

  const srStatus =
    props.kind === "unavailable"
      ? POST_AVAILABILITY_SR_STATUS.unavailable(formattedDate)
      : POST_AVAILABILITY_SR_STATUS.manual(formattedDate);

  const consultButtonClass =
    "hsdj-result-secondary inline-flex min-h-12 items-center justify-center border border-white/30 px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:border-cyan-300 hover:text-cyan-200";

  const primaryButtonClass =
    "hsdj-result-primary inline-flex min-h-12 items-center justify-center bg-yellow-300 px-6 py-3 text-center text-sm font-black uppercase tracking-wide text-neutral-950 transition hover:bg-cyan-300";

  return (
    <div
      className={`border-l-4 border-cyan-300 bg-black/75 p-6 lg:p-8 ${props.className ?? ""}`.trim()}
      data-result-kind={props.kind}
      role="status"
      aria-live="polite"
    >
      <p className="sr-only">{srStatus}</p>
      <p className="sr-only">{props.canonicalStatusMessage}</p>
      <p className="hsdj-result-signal"><span aria-hidden="true" /> Date signal received</p>
      <h3 className="hsdj-result-headline text-lg font-semibold text-white/90">{copy.headline}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/70">{copy.body}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button type="button" onClick={props.onTryAnotherDate} className={primaryButtonClass}>
          {copy.tryAnotherDateLabel}
        </button>
        {props.kind === "unavailable" ? (
          <a href={props.sendMessageHref ?? "/contact#send-message"} className={consultButtonClass}>
            {POST_AVAILABILITY_UNAVAILABLE_COPY.sendMessageLabel}
          </a>
        ) : (
          <a href={props.contactHref ?? "/contact#send-message"} className={consultButtonClass}>
            {POST_AVAILABILITY_MANUAL_COPY.contactLabel}
          </a>
        )}
      </div>
    </div>
  );
}
