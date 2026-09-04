const FALLBACK_GOOGLE_RATING = {
  rating: 5,
  reviewCount: 51,
  googleMapsUri:
    "https://www.google.com/maps/search/?api=1&query=Howe%20Sound%20Event%20DJ%20Squamish",
} as const;

const GOOGLE_RATING_REVALIDATE_SECONDS = 24 * 60 * 60;

type GooglePlaceDetails = {
  rating?: unknown;
  userRatingCount?: unknown;
  googleMapsUri?: unknown;
};

export type GoogleRatingSummary = {
  rating: number;
  reviewCount: number;
  googleMapsUri: string;
};

/**
 * Reads the public Google rating on the server and keeps it in Next's data cache
 * for 24 hours. The checked-in fallback keeps the homepage fast and truthful if
 * the optional Places integration is unavailable during a build or revalidation.
 */
export async function getGoogleRatingSummary(): Promise<GoogleRatingSummary> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();

  if (!apiKey || !placeId) return FALLBACK_GOOGLE_RATING;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          Accept: "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri",
        },
        cache: "force-cache",
        next: { revalidate: GOOGLE_RATING_REVALIDATE_SECONDS },
      },
    );

    if (!response.ok) return FALLBACK_GOOGLE_RATING;

    const place = (await response.json()) as GooglePlaceDetails;
    if (
      typeof place.rating !== "number" ||
      place.rating < 1 ||
      place.rating > 5 ||
      typeof place.userRatingCount !== "number" ||
      !Number.isInteger(place.userRatingCount) ||
      place.userRatingCount < 0
    ) {
      return FALLBACK_GOOGLE_RATING;
    }

    return {
      rating: place.rating,
      reviewCount: place.userRatingCount,
      googleMapsUri:
        typeof place.googleMapsUri === "string" && place.googleMapsUri.startsWith("https://")
          ? place.googleMapsUri
          : FALLBACK_GOOGLE_RATING.googleMapsUri,
    };
  } catch {
    return FALLBACK_GOOGLE_RATING;
  }
}
