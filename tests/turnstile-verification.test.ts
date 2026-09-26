import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstileToken } from "@/lib/turnstile";

afterEach(() => vi.unstubAllGlobals());

describe("Turnstile verification", () => {
  it("does not call the provider without a token", async () => {
    const request = vi.fn();
    vi.stubGlobal("fetch", request);
    expect(await verifyTurnstileToken("secret", " ")).toBe(false);
    expect(request).not.toHaveBeenCalled();
  });

  it("uses a bounded request and accepts only a successful verification", async () => {
    const request = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    vi.stubGlobal("fetch", request);
    expect(await verifyTurnstileToken("secret", "token")).toBe(true);
    expect(request.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
  });

  it("fails closed when the provider throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("provider unavailable")));
    expect(await verifyTurnstileToken("secret", "token")).toBe(false);
  });
});
