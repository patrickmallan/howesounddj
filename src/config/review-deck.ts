import type { CanonicalReview } from "@/config/reviews";

export type DeckReview = {
  id: string;
  reviewerName: string;
  quote: string;
  venue?: string;
  sourceHref?: string;
};

const googleProfile =
  "https://www.google.com/maps?place_id=ChIJr8lF5-phK4gR6w3uKDKLgMw&q=place_id%3AChIJr8lF5-phK4gR6w3uKDKLgMw";

/** Verbatim excerpts checked against Howe Sound Wedding DJ's Google Business Profile. */
export const GOOGLE_DECK_REVIEWS: readonly DeckReview[] = [
  {
    id: "danielle-lafontaine-google",
    reviewerName: "Danielle Lafontaine",
    quote: "At the same time, he knew how to read the crowd and chose the perfect songs to keep everyone singing, dancing, and having a great time late into the night.",
    venue: "Easter Seals Camp Squamish",
    sourceHref: googleProfile,
  },
  {
    id: "sergey-cheremisinov-google",
    reviewerName: "Sergey Cheremisinov",
    quote: "We gave Patrick songs in four different languages, and he mixed them seamlessly like a true professional.",
    venue: "Aberthau Mansion",
    sourceHref: googleProfile,
  },
  {
    id: "karly-and-alex-google",
    reviewerName: "Karly and Alex",
    quote: "He was super helpful leading up to our day, he edited our first dance song for us, gave us some timeline tips for the reception, and went through everything in detail with us to make sure transitions and timing flowed smoothly.",
    venue: "Cheakamus Centre",
    sourceHref: googleProfile,
  },
  {
    id: "sarah-peebles-google",
    reviewerName: "Sarah Peebles",
    quote: "I had a very specific vision for my wedding music and he went above and beyond to make sure I got exactly what I wanted.",
    sourceHref: googleProfile,
  },
  {
    id: "hannah-haughn-google",
    reviewerName: "Hannah Haughn",
    quote: "Everyone, including my parents (whom I've not ever seen dance), were dancing the night away.",
    venue: "Sunwolf Resort",
    sourceHref: googleProfile,
  },
  {
    id: "laura-cox-google",
    reviewerName: "Laura Cox",
    quote: "He was very accommodating to us and did a great job mixing songs from different languages and backgrounds while still keeping it cohesive and flowing.",
    venue: "Sunwolf Resort",
    sourceHref: googleProfile,
  },
  {
    id: "charlie-anne-cotter-google",
    reviewerName: "Charlie-Anne Cotter",
    quote: "We had a packed dance floor the entire night, and the energy never dropped a bit.",
    sourceHref: googleProfile,
  },
];

export function makeFeaturedDeckReviews(lead: CanonicalReview): readonly DeckReview[] {
  return [
    {
      id: lead.id,
      reviewerName: lead.reviewerName,
      quote: lead.quote,
      venue: lead.venue,
    },
    ...GOOGLE_DECK_REVIEWS,
  ];
}
