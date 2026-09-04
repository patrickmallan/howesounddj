import { afterEach, describe, expect, it, vi } from "vitest";
import { getGoogleRatingSummary } from "@/lib/google-rating";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("Google rating summary", () => {
  it("uses the current checked-in count when the optional integration is not configured", async () => {
    vi.stubEnv("GOOGLE_PLACES_API_KEY", "");
    vi.stubEnv("GOOGLE_PLACE_ID", "");

    await expect(getGoogleRatingSummary()).resolves.toMatchObject({
      rating: 5,
      reviewCount: 51,
    });
  });

  it("uses valid Google Places data and requests a 24-hour server cache", async () => {
    vi.stubEnv("GOOGLE_PLACES_API_KEY", "test-api-key");
    vi.stubEnv("GOOGLE_PLACE_ID", "test-place-id");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        rating: 4.9,
        userRatingCount: 52,
        googleMapsUri: "https://maps.google.com/example",
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(getGoogleRatingSummary()).resolves.toEqual({
      rating: 4.9,
      reviewCount: 52,
      googleMapsUri: "https://maps.google.com/example",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://places.googleapis.com/v1/places/test-place-id",
      expect.objectContaining({
        cache: "force-cache",
        next: { revalidate: 86_400 },
      }),
    );
  });

  it("falls back safely when Google returns unusable data", async () => {
    vi.stubEnv("GOOGLE_PLACES_API_KEY", "test-api-key");
    vi.stubEnv("GOOGLE_PLACE_ID", "test-place-id");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ rating: 5 }) }),
    );

    await expect(getGoogleRatingSummary()).resolves.toMatchObject({
      rating: 5,
      reviewCount: 51,
    });
  });
});
