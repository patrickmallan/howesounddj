import "server-only";

function endpoint(): string | null {
  const explicit = process.env.HSDJ_OPERATIONS_JOURNEY_API_URL?.trim();
  const base = process.env.HSDJ_OPERATIONS_API_BASE_URL?.trim();
  return explicit?.replace(/\/$/, "") ?? (base ? `${base.replace(/\/$/, "")}/api/public/availability-journeys` : null);
}

export async function forwardAvailabilityJourney(payload: unknown): Promise<boolean> {
  const url = endpoint(); const secret = process.env.AVAILABILITY_JOURNEY_INGEST_SECRET?.trim();
  if (!url || !secret) return false;
  try {
    const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` }, body: JSON.stringify(payload), cache: "no-store" });
    return response.ok;
  } catch { return false; }
}
