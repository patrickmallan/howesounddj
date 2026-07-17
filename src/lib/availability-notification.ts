import { Resend } from "resend";
import {
  availabilityEmailSubject,
  availabilityResultLabel,
} from "@/lib/check-public-availability";
import type { NormalizedPublicAvailability } from "@/lib/public-availability-contract";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

function getMailConfig(): { to: string; from: string } | null {
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!to || !from) return null;
  return { to, from };
}

/**
 * Operator notification from the same governed result shown to the visitor.
 * Fail-soft: logs on error; never throws; does not alter availability evaluation.
 */
export async function sendAvailabilityCheckNotification(
  result: NormalizedPublicAvailability,
): Promise<void> {
  const resend = getResend();
  const mail = getMailConfig();
  if (!resend || !mail) return;

  const resultLabel = availabilityResultLabel(result.result);
  const textBody = [
    `Date checked: ${result.requestedDate}`,
    `Result: ${resultLabel}`,
    `Timestamp (UTC): ${result.checkedAt}`,
    "Source: Check Availability form",
    `Authority: ${result.authority}`,
    "",
    "Note: No contact info collected at this step.",
  ].join("\n");

  try {
    const sendResult = await resend.emails.send({
      from: mail.from,
      to: mail.to,
      subject: availabilityEmailSubject(result),
      text: textBody,
    });

    if (sendResult.error) {
      console.error("[availability] notification_failed", {
        name: sendResult.error.name,
        statusCode: sendResult.error.statusCode,
        message: sendResult.error.message,
      });
    }
  } catch (err) {
    console.error("[availability] notification_failed", {
      message: err instanceof Error ? err.message : "unknown",
    });
  }
}
