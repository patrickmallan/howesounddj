import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  PublicAvailabilityResult,
  PUBLIC_AVAILABILITY_AUTHORITY,
} from "@/lib/public-availability-contract";

const ROOT = process.cwd();

function readSource(relativePath: string): string {
  return readFileSync(join(ROOT, relativePath), "utf8");
}

function sampleResult(result: (typeof PublicAvailabilityResult)[keyof typeof PublicAvailabilityResult]) {
  return {
    requestedDate: "2027-07-31",
    result,
    publicMessage: "test",
    checkedAt: "2026-08-10T15:21:00.000Z",
    authority: PUBLIC_AVAILABILITY_AUTHORITY,
    sourceEndpoint: "https://ops.howesounddj.com/api/availability",
  };
}

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn(function MockResend() {
    return {
      emails: {
        send: sendMock,
      },
    };
  }),
}));

describe("sendAvailabilityCheckNotification", () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: "email-1" }, error: null });
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("CONTACT_TO_EMAIL", "patrick@howesounddj.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "hello@howesounddj.com");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  async function loadNotifier() {
    return import("@/lib/availability-notification");
  }

  it("sends exactly one notification for AVAILABLE", async () => {
    const { sendAvailabilityCheckNotification } = await loadNotifier();
    await sendAvailabilityCheckNotification(sampleResult(PublicAvailabilityResult.AVAILABLE));
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock.mock.calls[0][0].to).toBe("patrick@howesounddj.com");
    expect(sendMock.mock.calls[0][0].subject).toMatch(/available/i);
  });

  it("sends exactly one notification for UNAVAILABLE", async () => {
    const { sendAvailabilityCheckNotification } = await loadNotifier();
    await sendAvailabilityCheckNotification(sampleResult(PublicAvailabilityResult.UNAVAILABLE));
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock.mock.calls[0][0].subject).toMatch(/unavailable/i);
    expect(sendMock.mock.calls[0][0].text).toMatch(/Date checked: 2027-07-31/);
  });

  it("sends for MANUAL_CONFIRMATION_REQUIRED without throwing", async () => {
    const { sendAvailabilityCheckNotification } = await loadNotifier();
    await expect(
      sendAvailabilityCheckNotification(
        sampleResult(PublicAvailabilityResult.MANUAL_CONFIRMATION_REQUIRED),
      ),
    ).resolves.toBe(true);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("logs and skips when mail configuration is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { sendAvailabilityCheckNotification } = await loadNotifier();
    await sendAvailabilityCheckNotification(sampleResult(PublicAvailabilityResult.UNAVAILABLE));
    expect(sendMock).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(
      "[availability] notification_skipped",
      expect.objectContaining({ reason: "missing_resend_api_key" }),
    );
    warnSpy.mockRestore();
  });

  it("logs Resend errors without throwing", async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { name: "validation_error", statusCode: 422, message: "invalid from" },
    });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { sendAvailabilityCheckNotification } = await loadNotifier();
    await expect(
      sendAvailabilityCheckNotification(sampleResult(PublicAvailabilityResult.UNAVAILABLE)),
    ).resolves.toBe(false);
    expect(errorSpy).toHaveBeenCalledWith(
      "[availability] notification_failed",
      expect.objectContaining({ message: "invalid from" }),
    );
    errorSpy.mockRestore();
  });
});

describe("availability route notification scheduling", () => {
  it("schedules operator notification with next/server after()", () => {
    const route = readSource("src/app/api/availability/route.ts");
    expect(route).toMatch(/import \{ after(?:, NextResponse)? \} from "next\/server"|import \{ after, NextResponse \} from "next\/server"/);
    expect(route).toMatch(/after\(async \(\) =>/);
    expect(route).toMatch(/sendAvailabilityCheckNotification\(evaluated, journeyId\)/);
    expect(route).not.toMatch(/void sendAvailabilityCheckNotification/);
    expect(route).toMatch(/await sendAvailabilityCheckNotification/);
  });
});
