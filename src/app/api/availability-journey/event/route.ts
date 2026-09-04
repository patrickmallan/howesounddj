import { NextResponse } from "next/server";
import { forwardAvailabilityJourney } from "@/lib/availability-journey-server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(request: Request) {
  let event: unknown;
  try { event = await request.json(); } catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }
  const ok = await forwardAvailabilityJourney({ kind: "event", event });
  return NextResponse.json({ ok }, { status: ok ? 200 : 503 });
}
