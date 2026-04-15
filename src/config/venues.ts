/**
 * Curated venues and businesses where Howe Sound DJ has worked — used for homepage trust.
 * URLs should be verified periodically; Glacier Valley Farm’s primary web presence is a WordPress site.
 *
 * Order: strongest wedding/reception signal first, then Sea-to-Sky / Whistler familiarity, then supportive local proof.
 */
export type VenueEntry = {
  name: string;
  description: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
};

export const VENUES: readonly VenueEntry[] = [
  {
    name: "Sea to Sky Gondola",
    description: "Iconic mountain setting with unforgettable reception views.",
    href: "https://www.seatoskygondola.com/"
  },
  {
    name: "Cheekye Ranch",
    description: "Rustic character and big celebration energy.",
    href: "https://www.cheekyeranch.com/"
  },
  {
    name: "Sitka Farms",
    description: "Intimate farm venue near Squamish with pastoral space and a calm, country celebration feel.",
    href: "https://www.sitkafarms.ca/"
  },
  {
    name: "Sunwolf",
    description: "Riverside atmosphere with a relaxed Sea-to-Sky feel.",
    href: "https://sunwolf.net/"
  },
  {
    name: "Squamish Valley Golf Club",
    description: "Clubhouse and fairways with a classic corridor backdrop.",
    href: "https://squamishvalleygolf.com/"
  },
  {
    name: "Cheakamus Centre",
    description: "Forest and river campus with natural, purpose-built gathering spaces.",
    href: "https://cheakamuscentre.ca/"
  },
  {
    name: "Glacier Valley Farm",
    description: "Valley farm setting with open-air country charm.",
    href: "https://glaciervalleyfarm.wordpress.com/"
  },
  {
    name: "Roundhouse Lodge",
    description: "Mountaintop Whistler setting with dramatic views and memorable celebration energy.",
    href: "https://www.whistlerblackcomb.com/explore-the-resort/the-village/dining/roundhouse-lodge.aspx"
  },
  {
    name: "Howe Sound Brewing",
    description: "Local favourite with a strong Squamish identity.",
    href: "https://howesound.com/"
  },
  {
    name: "House of Lager Brewing Company",
    description: "Squamish brewery and taproom with private-event space and a contemporary craft feel.",
    href: "https://www.houseoflagerbrewing.com/"
  },
  {
    name: "Match Eatery & Public House",
    description: "Lively dining room and social energy in the heart of Squamish.",
    href: "https://matchpub.com/locations/squamish/"
  },
  {
    name: "The Broken Seal",
    description: "Squamish taproom and kitchen with group-event options and a laid-back craft-beer atmosphere.",
    href: "https://www.thebrokenseal.ca/"
  },
  {
    name: "Trickster's Hideout",
    description: "Squamish gathering spot with a casual, party-ready vibe.",
    href: "https://trickstershideout.ca/"
  },
  {
    name: "Brackendale Art Gallery",
    description: "Intimate arts and culture space with a warm, community feel.",
    href: "https://brackendaleartgallery.com/"
  },
  {
    name: "Railway Museum of British Columbia",
    description: "Heritage rail campus in Squamish with characterful indoor and outdoor spaces for events.",
    href: "https://www.wcra.org/"
  },
  {
    name: "Capilano University — Squamish campus",
    description: "Downtown Squamish campus with bright, flexible rooms for receptions and community gatherings.",
    href: "https://www.capilanou.ca/about-capu/get-to-know-us/our-locations/capu-squamish-campus/"
  }
];
