import "server-only";

const FORWARD_TIMEOUT_MS = 1_500;
const MAX_ATTEMPTS = 2;

function endpoint(): string | null {
  const explicit = process.env.HSDJ_OPERATIONS_JOURNEY_API_URL?.trim();
  const base = process.env.HSDJ_OPERATIONS_API_BASE_URL?.trim();
  return explicit?.replace(/\/$/, "") ?? (base ? `${base.replace(/\/$/, "")}/api/public/availability-journeys` : null);
}

export async function forwardAvailabilityJourney(payload: unknown): Promise<boolean> {
  const url = endpoint();
  const secret = process.env.AVAILABILITY_JOURNEY_INGEST_SECRET?.trim();
  if (!url || !secret) return false;

  let status: number | "network_error" = "network_error";
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
      });
      if (response.ok) return true;
      status = response.status;
      // A rejected payload or credential cannot be repaired by repeating it.
      if (response.status !== 429 && response.status < 500) break;
    } catch {
      status = "network_error";
    }
  }

  // Do not log journey IDs, wedding dates, or credentials.
  console.warn("[availability-journey] forward_failed", {
    kind: typeof payload === "object" && payload !== null && "kind" in payload
      ? String(payload.kind)
      : "unknown",
    status,
  });
  return false;
}
