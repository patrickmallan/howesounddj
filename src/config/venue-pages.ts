/**
 * Venue landing-page dataset for /venues/[slug].
 * Copy stays general and planning-oriented: no undocumented “preferred vendor” or exclusivity claims.
 * External URLs match the curated list used for homepage trust (verify periodically).
 */

export type VenueArea = "squamish" | "whistler" | "sea-to-sky" | "corridor";

export type VenuePage = {
  slug: string;
  name: string;
  /** Public website for “official site” links, same sources as the legacy homepage list. */
  officialUrl: string;
  locationLabel: string;
  area: VenueArea;
  venueType: string;
  /** Short line for cards on / and /venues */
  cardDescription: string;
  /** Hero supporting line + meta helper */
  shortSummary: string;
  /** Standalone meta description (unique per venue) */
  metaDescription: string;
  /** Why this setting matters for music, flow, and planning, unique paragraphs */
  whyFit: readonly string[];
  /** Ceremony-to-reception, sound, pacing, venue-flavoured but not operational claims */
  planningFocus: readonly string[];
  /** Squamish / Sea-to-Sky / corridor tie-in */
  localExpertise: readonly string[];
};

export const VENUE_PAGES: readonly VenuePage[] = [
  {
    slug: "sea-to-sky-gondola",
    name: "Sea to Sky Gondola",
    officialUrl: "https://www.seatoskygondola.com/",
    locationLabel: "Squamish, BC",
    area: "sea-to-sky",
    venueType: "Mountain viewpoint & event venue",
    cardDescription: "Iconic mountain setting with unforgettable reception views.",
    shortSummary:
      "A dramatic Sea-to-Sky setting where elevation, weather, and views shape how the night feels from ceremony to dance floor.",
    metaDescription:
      "Planning a wedding with Sea to Sky Gondola energy? Howe Sound DJ brings Sea-to-Sky wedding DJ experience, thoughtful sound planning, and music shaped to your crowd, rooted in Squamish.",
    whyFit: [
      "Mountain venues reward DJs who think in arcs: guest arrival energy, speeches against a backdrop that already feels cinematic, then a dance floor that still has to feel like yours, not a generic playlist with a nice view.",
      "When the setting is this open and memorable, the music still has to earn the room: transitions, pacing, and reading how your people actually move after dinner.",
    ],
    planningFocus: [
      "Outdoor-adjacent and high-elevation settings often mean practical audio questions: where speeches land, how sound carries, and how the night shifts from golden-hour warmth to a real party.",
      "The goal is smooth handoffs between moments, cocktail, dinner, dance, without the day feeling rushed or the energy feeling disconnected from the landscape you chose.",
    ],
    localExpertise: [
      "Howe Sound DJ is Squamish-rooted with Sea-to-Sky corridor experience, the same local planning posture couples describe in reviews, applied to high-impact venues along the highway.",
      "If your date and logistics line up, the next step is the same as the rest of the site: check availability and talk through coverage, pacing, and how you want the night to feel.",
    ],
  },
  {
    slug: "cheekye-ranch",
    name: "Cheekye Ranch",
    officialUrl: "https://www.cheekyeranch.com/",
    locationLabel: "Brackendale / Squamish area, BC",
    area: "squamish",
    venueType: "Ranch & celebration property",
    cardDescription: "Rustic character and big celebration energy.",
    shortSummary:
      "Rustic Squamish-area character with room for a celebration that can swing intimate, rowdy, or both, often in the same night.",
    metaDescription:
      "Cheekye Ranch wedding DJ support in the Squamish area: personalized music, calm planning communication, and reception pacing rooted in Sea-to-Sky weddings, with Howe Sound DJ.",
    whyFit: [
      "Ranch settings often pair wide-open beauty with a crowd that travels together. That can mean a dance floor that ignites fast, or one that needs patience while guests settle into the night.",
      "The right approach is not forcing a “standard wedding arc.” It is building transitions that match your people and the property’s natural flow.",
    ],
    planningFocus: [
      "From ceremony placement to where speeches land, outdoor-adjacent properties benefit from a DJ who can think in timelines and contingencies without turning your wedding into a tech rehearsal.",
      "Music should support the atmosphere you want, romantic early evening, then high-energy when you are ready to open the floor.",
    ],
    localExpertise: [
      "Squamish-area weddings are core to the work: corridor logistics, realistic timing, and communication that stays ahead of the day.",
      "If Cheekye Ranch is your venue, start with availability and a conversation about coverage, guest count, and the vibe you want the dance floor to earn.",
    ],
  },
  {
    slug: "sitka-farms",
    name: "Sitka Farms",
    officialUrl: "https://www.sitkafarms.ca/",
    locationLabel: "Near Squamish, BC",
    area: "squamish",
    venueType: "Farm & pastoral venue",
    cardDescription: "Intimate farm venue near Squamish with pastoral space and a calm, country celebration feel.",
    shortSummary:
      "Pastoral space near Squamish where a calm daytime feel can turn into a full reception without losing the relaxed farm character.",
    metaDescription:
      "Sitka Farms wedding DJ: Sea-to-Sky sound planning and personalized reception music near Squamish. Howe Sound DJ focuses on flow, pacing, and a dance floor that matches your guests.",
    whyFit: [
      "Farm venues often blend intimacy with a bigger guest list: the setting feels gentle, but the party still needs a real plan for speeches, dinner energy, and when to open dancing.",
      "The best nights match the setting’s warmth without treating the music like an afterthought.",
    ],
    planningFocus: [
      "Outdoor and barn-adjacent spaces reward clear audio thinking for ceremony and speeches, then a reception approach that can scale up when the moment is right.",
      "Pacing matters: you may want a softer soundtrack early, then a dance floor that still feels intentional, not accidental.",
    ],
    localExpertise: [
      "Local familiarity across Squamish and the corridor means planning conversations can stay grounded in realistic timing and what mountain-adjacent weekends actually feel like.",
      "Check availability to see if your date lines up, then build the plan around your timeline and how you want guests to experience the property.",
    ],
  },
  {
    slug: "sunwolf",
    name: "Sunwolf",
    officialUrl: "https://sunwolf.net/",
    locationLabel: "Brackendale, BC",
    area: "sea-to-sky",
    venueType: "Riverside lodge & event space",
    cardDescription: "Riverside atmosphere with a relaxed Sea-to-Sky feel.",
    shortSummary:
      "Riverside Sea-to-Sky atmosphere where relaxed daytime energy can transition into a reception that still needs a confident musical plan.",
    metaDescription:
      "Sunwolf wedding DJ services: relaxed Sea-to-Sky riverside character with professional reception support. Howe Sound DJ, Squamish-rooted, with personalized music and clear planning.",
    whyFit: [
      "Water-adjacent venues bring a natural calm that can be magical, then the evening still has to arrive with intention: speeches, special moments, and a dance floor that matches your crowd.",
      "The setting does part of the work; the soundtrack should do the rest without fighting the room.",
    ],
    planningFocus: [
      "Think about how guests move from arrival through dinner: where sound should feel soft, where it should lift, and when you want the night to pivot into celebration.",
      "A strong plan reduces day-of improvisation on things that should be decided once, calmly, ahead of time.",
    ],
    localExpertise: [
      "Brackendale and Sea-to-Sky weddings are familiar territory: corridor weekends, guest travel, and the practical side of hosting a real party in a natural setting.",
      "Start with availability and a planning conversation, then map music and timeline to the day you are actually planning.",
    ],
  },
  {
    slug: "squamish-valley-golf-club",
    name: "Squamish Valley Golf Club",
    officialUrl: "https://squamishvalleygolf.com/",
    locationLabel: "Squamish Valley, BC",
    area: "squamish",
    venueType: "Golf club & banquet venue",
    cardDescription: "Clubhouse and fairways with a classic corridor backdrop.",
    shortSummary:
      "Classic clubhouse energy with corridor views, often a smooth blend of formal moments and a reception that opens into dancing.",
    metaDescription:
      "Squamish Valley Golf Club wedding DJ: polished reception music and MC support with Sea-to-Sky planning experience. Howe Sound DJ helps you shape flow from dinner to dance floor.",
    whyFit: [
      "Clubhouse settings often have a natural structure: guests arrive with expectations of a well-run evening, which makes pacing and sound clarity even more visible.",
      "The goal is a night that feels elegant without feeling stiff, then alive when it is time to dance.",
    ],
    planningFocus: [
      "Speech sections, dinner playlists, and dance-floor openings all benefit from one cohesive plan so transitions do not feel like separate events stitched together.",
      "Audio needs can vary by room layout; planning ahead keeps special moments from competing with background noise or awkward mic moments.",
    ],
    localExpertise: [
      "Squamish-area venues are a core part of the local map, corridor timing, guest expectations, and the same calm communication style couples reference in reviews.",
      "If this is your venue, check availability and talk through your timeline and how you want the evening to build.",
    ],
  },
  {
    slug: "cheakamus-centre",
    name: "Cheakamus Centre",
    officialUrl: "https://cheakamuscentre.ca/",
    locationLabel: "Paradise Valley, BC",
    area: "sea-to-sky",
    venueType: "Forest campus & gathering spaces",
    cardDescription: "Forest and river campus with natural, purpose-built gathering spaces.",
    shortSummary:
      "Forest-campus atmosphere with purpose-built gathering spaces, ideal when you want nature-forward flow and a thoughtful evening arc.",
    metaDescription:
      "Cheakamus Centre wedding DJ support in the Sea-to-Sky: nature-forward celebrations with professional audio thinking and personalized dance-floor energy. Howe Sound DJ.",
    whyFit: [
      "Campus-style venues can spread moments across multiple spaces. That can be beautiful, and it rewards clear coordination so music and announcements support the flow instead of interrupting it.",
      "The experience should feel connected even when guests move from one chapter of the day to the next.",
    ],
    planningFocus: [
      "Consider ceremony-to-reception transitions: where guests regroup, how speeches are heard, and when the energy should step up.",
      "A DJ who plans in chapters helps prevent the night from feeling like isolated episodes.",
    ],
    localExpertise: [
      "Sea-to-Sky corridor work means respecting mountain-adjacent logistics and the realities of guests traveling together for a full weekend.",
      "Start with availability, then build a music plan that matches your schedule and the spaces you are using.",
    ],
  },
  {
    slug: "glacier-valley-farm",
    name: "Glacier Valley Farm",
    /** Public presence; verify periodically, Facebook is the active page for this venue today. */
    officialUrl: "https://www.facebook.com/glaciervalleyfarm/",
    locationLabel: "Squamish Valley, BC",
    area: "squamish",
    venueType: "Farm & outdoor-friendly venue",
    cardDescription:
      "Squamish Valley working farm and event space, open-air country charm with room to build a full wedding arc.",
    shortSummary:
      "A Squamish Valley farm setting where open-air daytime energy can turn into an evening reception, music and pacing should match your guest list, the season, and how guests move across the property.",
    metaDescription:
      "Glacier Valley Farm wedding DJ in the Squamish Valley: open-air farm character, personalized reception music, and clear planning support. Howe Sound DJ, Sea-to-Sky weddings with a Squamish-rooted posture.",
    whyFit: [
      "Farm and pasture-adjacent celebrations often pair wide skies with a crowd that knows each other, great for connection, and still worth a deliberate plan for speeches, dinner energy, and when to open the floor.",
      "The setting does part of the storytelling; the soundtrack should carry the rest without fighting the landscape or the way your guests actually behave after sunset.",
    ],
    planningFocus: [
      "Outdoor-first timelines can shift with weather and light; a flexible-but-clear plan for key moments reduces day-of stress without turning the wedding into a rigid production.",
      "Ceremony and speech audio are usually where planning pays off first, then dancing is the payoff when the room is ready.",
    ],
    localExpertise: [
      "Squamish Valley sits on the same corridor map as the rest of the work: realistic weekend timing, guest travel, and communication that stays ahead of the day, what couples describe in reviews.",
      "Check availability, then walk through your rough timeline, guest count, and how you want the night to feel.",
    ],
  },
  {
    slug: "roundhouse-lodge",
    name: "Roundhouse Lodge",
    officialUrl:
      "https://www.whistlerblackcomb.com/explore-the-resort/the-village/dining/roundhouse-lodge.aspx",
    locationLabel: "Whistler, BC",
    area: "whistler",
    venueType: "Mountaintop lodge venue",
    cardDescription: "Mountaintop Whistler setting with dramatic views and memorable celebration energy.",
    shortSummary:
      "Whistler mountaintop atmosphere, dramatic, memorable, and dependent on smart pacing because guests are sharing a high-impact experience.",
    metaDescription:
      "Roundhouse Lodge Whistler wedding DJ: mountaintop reception energy with Sea-to-Sky planning experience. Howe Sound DJ, personalized music and professional execution.",
    whyFit: [
      "Whistler mountaintop settings create a built-in “wow” before the first song. The music still has to carry the second half of the story: connection, emotion, and a dance floor that belongs to your people.",
      "High-impact venues can shorten the runway from dinner to dancing, or stretch it. The plan should match your crowd, not a default template.",
    ],
    planningFocus: [
      "Mountain venues often mean travel timing, guest grouping, and a reception that may start later than a city wedding. Pacing should reflect that reality.",
      "Speeches and special dances still deserve clarity and warmth, then the night can open into celebration when you are ready.",
    ],
    localExpertise: [
      "Whistler and Sea-to-Sky coverage are part of the same corridor map: logistics, communication, and music shaped for real crowds, not a generic destination package.",
      "Start with availability for your date, then talk through coverage and how you want the night to feel at elevation.",
    ],
  },
  {
    slug: "nita-lake-lodge",
    name: "Nita Lake Lodge",
    officialUrl: "https://www.nitalakelodge.com/weddings",
    locationLabel: "Whistler, BC",
    area: "whistler",
    venueType: "Boutique hotel & lakeside wedding venue",
    cardDescription: "Creekside Whistler boutique hotel with lake-adjacent character and a relaxed mountain-luxe reception feel.",
    shortSummary:
      "A lakeside Creekside setting where the day can move from intimate ceremony energy to a reception that still needs a confident musical arc, without treating Whistler like a generic resort template.",
    metaDescription:
      "Nita Lake Lodge Whistler wedding DJ: lakeside Creekside atmosphere with personalized reception music and Sea-to-Sky planning support. Howe Sound DJ, corridor-rooted, wedding-first.",
    whyFit: [
      "Lake-adjacent properties often blend softness with celebration: guests arrive ready for a weekend, and the evening still needs a clear plan for speeches, dinner pacing, and when the dance floor should earn the room.",
      "The right approach matches the lodge’s intimate-luxe tone, warm early, intentional later, so the night feels cohesive rather than like separate “modes” stitched together.",
    ],
    planningFocus: [
      "Think about how guests move from outdoor-adjacent moments into dinner and dancing: transitions matter when the setting is this photogenic, music should support the flow, not compete with it.",
      "Audio clarity for vows and speeches remains the foundation; then the set can open into celebration when you are ready.",
    ],
    localExpertise: [
      "Whistler sits on the same Sea-to-Sky corridor map as the Squamish-rooted work: destination weekends, guest travel, and realistic timing, without reframing the brand as a Vancouver-first service.",
      "Check availability, then align music and pacing to your weekend structure and how you want guests to feel from arrival to last song.",
    ],
  },
  {
    slug: "fairmont-chateau-whistler",
    name: "Fairmont Chateau Whistler",
    officialUrl: "https://www.chateau-whistler.com/gather/weddings/",
    locationLabel: "Whistler, BC",
    area: "whistler",
    venueType: "Luxury resort & ballroom venue",
    cardDescription: "Upper Village resort scale, grand rooms, polished service expectations, and a reception that benefits from deliberate pacing.",
    shortSummary:
      "Classic luxury resort energy in Whistler: high expectations for flow, clarity, and a dance floor that still feels personal, not a stock playlist with a fancy ceiling.",
    metaDescription:
      "Fairmont Chateau Whistler wedding DJ: polished reception pacing, speech-forward clarity, and personalized dance-floor energy. Howe Sound DJ, Sea-to-Sky wedding support with corridor experience.",
    whyFit: [
      "Ballroom-scale weddings amplify everything guests notice: transitions, mic moments, and whether the music matches the formality you want early, then lifts when it is time to celebrate.",
      "The goal is elegance without stiffness: a night that feels well-run because the plan is coherent, not because the energy is restrained all evening.",
    ],
    planningFocus: [
      "Large guest lists reward a simple run-of-show for what must be heard clearly versus what can breathe: speeches, special dances, and the moment you want the room to turn a corner.",
      "Playlist direction should match your crowd’s age mix and travel energy, destination weekends often start later and still deserve a real peak.",
    ],
    localExpertise: [
      "Whistler resort weekends are part of the same professional lane as corridor weddings: communication, timing, and music shaped for real crowds planning from Vancouver or flying in from elsewhere.",
      "Start with availability and map the evening to your priorities, then build the set around your story, not a default resort arc.",
    ],
  },
  {
    slug: "squamish-lilwat-cultural-centre",
    name: "Squamish Lil'wat Cultural Centre",
    officialUrl: "https://slcc.ca/weddings/",
    locationLabel: "Whistler, BC",
    area: "whistler",
    venueType: "Cultural centre & gathering venue",
    cardDescription: "Distinctive Whistler cultural venue, spaces and atmosphere that reward respectful, intentional celebration design.",
    shortSummary:
      "A culturally significant Whistler gathering place where the setting asks for thoughtful pacing: ceremony and reception flow should feel considered, warm, and guest-forward.",
    metaDescription:
      "Squamish Lil'wat Cultural Centre wedding DJ support in Whistler: thoughtful sound planning and reception music for culturally rooted celebrations. Howe Sound DJ, Sea-to-Sky corridor experience.",
    whyFit: [
      "Spaces with strong identity reward a DJ who protects key moments: clear audio for what matters, transitions that feel calm, and a dance section that still reflects your crowd, without turning the night into a generic party template.",
      "The through-line is respect for the arc you are building: guests should feel guided, not rushed from milestone to milestone.",
    ],
    planningFocus: [
      "Clarity on ceremony-to-reception movement, speech order, and where you want emotional peaks helps the evening feel intentional in multi-space venues.",
      "Music should support the tone you want in each chapter, then earn the celebration when you open the floor.",
    ],
    localExpertise: [
      "Whistler cultural and resort-adjacent work still maps to Sea-to-Sky realities: weekend timing, guest travel, and the same wedding-first communication posture as the rest of the site.",
      "Check availability and walk through your rough schedule, guest count, and priorities for the evening’s emotional beats.",
    ],
  },
  {
    slug: "audain-art-museum",
    name: "Audain Art Museum",
    officialUrl: "https://audainartmuseum.com/rentalspack/",
    locationLabel: "Whistler, BC",
    area: "whistler",
    venueType: "Art museum & private event venue",
    cardDescription: "Architectural Whistler museum setting, modern, gallery-forward energy for couples who want a design-led celebration backdrop.",
    shortSummary:
      "A contemporary museum backdrop where visual discipline meets wedding celebration: pacing and sound choices should match a refined room without feeling cold or overly restrained.",
    metaDescription:
      "Audain Art Museum Whistler wedding DJ: museum event atmosphere with tailored reception music and professional planning support. Howe Sound DJ, Sea-to-Sky weddings with corridor expertise.",
    whyFit: [
      "Gallery-forward venues often pair clean aesthetics with guests who love details, great for intentional moments, and still deserving of a dance plan that matches your people when the time is right.",
      "The music should complement the architecture: warm where it should be, celebratory when you choose to turn the corner, without fighting the room’s natural tone.",
    ],
    planningFocus: [
      "Event layouts in museum settings reward coordination between cocktail, seated moments, and dancing, so announcements and transitions feel calm rather than abrupt.",
      "Speech clarity and special-dance tone matter in refined spaces; then the set can open with confidence when you are ready.",
    ],
    localExpertise: [
      "Whistler museum and resort-adjacent celebrations sit alongside the broader Sea-to-Sky map: destination weekends, guest expectations, and music built for real crowds, not a generic “big city vendor” posture.",
      "Start with availability, then align the plan to your timeline and how you want the night to feel in the space.",
    ],
  },
  {
    slug: "howe-sound-brewing",
    name: "Howe Sound Brewing",
    officialUrl: "https://howesound.com/",
    locationLabel: "Squamish, BC",
    area: "squamish",
    venueType: "Brewery & private event space",
    cardDescription: "Local favourite with a strong Squamish identity.",
    shortSummary:
      "A Squamish institution with social energy, great when you want a reception that feels local, lively, and connected to the town’s character.",
    metaDescription:
      "Howe Sound Brewing private event wedding DJ in Squamish: lively reception pacing, personalized playlists, and professional sound support. Howe Sound DJ.",
    whyFit: [
      "Brewery receptions often carry a built-in social buzz: guests mingle easily, conversation runs high, and the dance floor may start later, or explode quickly once it opens.",
      "The music plan should match that social chemistry instead of fighting it with the wrong early-evening energy.",
    ],
    planningFocus: [
      "Speech clarity still matters in lively rooms; balancing background level, announcements, and special moments keeps the night feeling intentional.",
      "When dancing starts, the set should match a crowd that already knows how to celebrate together.",
    ],
    localExpertise: [
      "Squamish is home base, local venues and downtown energy are part of the same map as mountain weddings and corridor weekends.",
      "Check availability and talk through your event space, guest count, and how late you want the party to run.",
    ],
  },
  {
    slug: "house-of-lager-brewing-company",
    name: "House of Lager Brewing Company",
    officialUrl: "https://www.houseoflagerbrewing.com/",
    locationLabel: "Squamish, BC",
    area: "squamish",
    venueType: "Brewery & taproom events",
    cardDescription: "Squamish brewery and taproom with private-event space and a contemporary craft feel.",
    shortSummary:
      "Contemporary craft atmosphere in Squamish, ideal for couples who want a modern, social reception with a clear local identity.",
    metaDescription:
      "House of Lager Brewing Company wedding DJ in Squamish: craft-beer reception energy with tailored music and professional planning. Howe Sound DJ, Sea-to-Sky rooted.",
    whyFit: [
      "Taproom-style spaces reward a DJ who understands social volume: when to keep the room humming, when to spotlight a moment, and when to turn the corner into dancing.",
      "The vibe can be modern and fun without feeling chaotic, if pacing is intentional.",
    ],
    planningFocus: [
      "Private-event layouts vary; a quick clarity pass on ceremony audio (if onsite), speech order, and dance-floor timing prevents avoidable stress.",
      "Playlists should reflect your taste while still reading the real crowd in front of you.",
    ],
    localExpertise: [
      "Downtown Squamish celebrations sit alongside the broader Sea-to-Sky work, same communication standards, same wedding-first focus.",
      "Start with availability and map the plan to your space and timeline.",
    ],
  },
  {
    slug: "match-eatery-squamish",
    name: "Match Eatery & Public House (Squamish)",
    officialUrl: "https://matchpub.com/locations/squamish/",
    locationLabel: "Squamish, BC",
    area: "squamish",
    venueType: "Restaurant & event dining",
    cardDescription: "Lively dining room and social energy in the heart of Squamish.",
    shortSummary:
      "Central Squamish dining-room energy, great for receptions that lean social, speech-forward, and celebration-ready.",
    metaDescription:
      "Match Eatery Squamish wedding DJ: lively reception music and pacing in the heart of town. Howe Sound DJ, personalized playlists and professional Sea-to-Sky support.",
    whyFit: [
      "Restaurant-style receptions can move quickly from dinner to party because the room already feels like a night out. The DJ’s job is to protect special moments while still building momentum.",
      "Speech-heavy sections need clarity; dance-heavy sections need a set that matches your crowd’s age mix and energy.",
    ],
    planningFocus: [
      "Timeline coordination matters when service, speeches, and dancing share one space, small planning wins prevent awkward gaps.",
      "Music should support conversation when it should, then step forward when you open the floor.",
    ],
    localExpertise: [
      "Squamish central venues are part of the same local wedding map as larger mountain properties, different scale, same standards.",
      "Check availability and talk through your evening structure and must-play priorities.",
    ],
  },
  {
    slug: "the-broken-seal",
    name: "The Broken Seal",
    officialUrl: "https://www.thebrokenseal.ca/",
    locationLabel: "Squamish, BC",
    area: "squamish",
    venueType: "Taproom & kitchen events",
    cardDescription: "Squamish taproom and kitchen with group-event options and a laid-back craft-beer atmosphere.",
    shortSummary:
      "Laid-back Squamish taproom energy, when you want a reception that feels approachable, social, and easy for guests to enjoy.",
    metaDescription:
      "The Broken Seal Squamish wedding DJ: laid-back craft atmosphere with tailored reception music and clear communication. Howe Sound DJ for Sea-to-Sky weddings.",
    whyFit: [
      "Casual venues can produce some of the most honest dance floors, because guests already feel comfortable. The music still needs structure: special moments first, then celebration.",
      "The tone can be fun without feeling sloppy when transitions are handled cleanly.",
    ],
    planningFocus: [
      "Group-event layouts reward a simple, clear run-of-show: what matters most, what can flex, and when you want the night to peak.",
      "Audio for speeches in lively rooms is a planning point worth deciding early.",
    ],
    localExpertise: [
      "Squamish taproom culture is part of the town’s texture, local context still matters for timing, noise realities, and guest expectations.",
      "Availability first, then build the soundtrack around your story and your crowd.",
    ],
  },
  {
    slug: "tricksters-hideout",
    name: "Trickster's Hideout",
    officialUrl: "https://trickstershideout.ca/",
    locationLabel: "Squamish, BC",
    area: "squamish",
    venueType: "Restaurant & gathering space",
    cardDescription: "Squamish gathering spot with a casual, party-ready vibe.",
    shortSummary:
      "Casual Squamish gathering energy, when you want the reception to feel like a great night out with your people.",
    metaDescription:
      "Trickster’s Hideout Squamish wedding DJ: casual reception energy with personalized music and professional support. Howe Sound DJ, Squamish wedding DJ services.",
    whyFit: [
      "Party-ready venues can accelerate the social curve, guests may be ready to dance earlier, or they may need a warm, well-paced dinner section first.",
      "Reading the room matters more than any playlist title.",
    ],
    planningFocus: [
      "A clear plan for speeches, games (if any), and special dances keeps a casual venue from feeling chaotic.",
      "Then the set can lean into celebration with confidence.",
    ],
    localExpertise: [
      "Local Squamish nights are part of the same professional lane as larger weddings. Planning and communication come first.",
      "Check availability and talk through your guest count and how you want the night to peak.",
    ],
  },
  {
    slug: "brackendale-art-gallery",
    name: "Brackendale Art Gallery",
    officialUrl: "https://brackendaleartgallery.com/",
    locationLabel: "Brackendale, BC",
    area: "squamish",
    venueType: "Arts & community venue",
    cardDescription: "Intimate arts and culture space with a warm, community feel.",
    shortSummary:
      "Intimate Brackendale arts setting, ideal when you want warmth, personality, and a reception scaled to a smaller guest list.",
    metaDescription:
      "Brackendale Art Gallery wedding DJ: intimate Sea-to-Sky celebrations with thoughtful sound and personalized music. Howe Sound DJ, ceremony through reception support.",
    whyFit: [
      "Smaller venues often mean fewer places to hide sloppy transitions, guests feel everything. That is an advantage: the night can feel personal when pacing is tight and music matches the room.",
      "The goal is warmth without timidity: intimate can still be celebratory.",
    ],
    planningFocus: [
      "Speech and first-dance moments carry more weight in intimate rooms; audio clarity and musical tone should match the emotional temperature you want.",
      "Dancing may be compact, but it should still feel real, curated for your people.",
    ],
    localExpertise: [
      "Brackendale sits in the Squamish orbit with the same corridor realities: guests traveling together, local vendors, and timelines that deserve calm communication.",
      "Start with availability and map the evening to your priorities.",
    ],
  },
  {
    slug: "railway-museum-of-british-columbia",
    name: "Railway Museum of British Columbia",
    officialUrl: "https://www.wcra.org/",
    locationLabel: "Squamish, BC",
    area: "squamish",
    venueType: "Heritage museum & event campus",
    cardDescription: "Heritage rail campus in Squamish with characterful indoor and outdoor spaces for events.",
    shortSummary:
      "Heritage Squamish campus with characterful indoor/outdoor options, great when you want a wedding that feels storied and distinct.",
    metaDescription:
      "Railway Museum of BC wedding DJ in Squamish: heritage venue character with professional reception support and Sea-to-Sky planning. Howe Sound DJ.",
    whyFit: [
      "Heritage spaces bring personality, guests explore, photos run long, and the evening can sprawl across zones. Music and announcements work best when they guide the night without fighting the venue’s natural curiosity.",
      "The reception still needs a single emotional thread: your story, your crowd, your pace.",
    ],
    planningFocus: [
      "Multi-zone timelines reward coordination: where guests should be for key moments, how speeches are heard, and when dancing should anchor the night.",
      "A cohesive plan keeps a distinctive venue from feeling disjointed.",
    ],
    localExpertise: [
      "Squamish heritage venues sit alongside outdoor and mountain work as part of the same local map, same planning standards, same wedding-first posture.",
      "Check availability and walk through your rough timeline and must-haves.",
    ],
  },
  {
    slug: "capilano-university-squamish-campus",
    name: "Capilano University, Squamish campus",
    officialUrl: "https://www.capilanou.ca/about-capu/get-to-know-us/our-locations/capu-squamish-campus/",
    locationLabel: "Downtown Squamish, BC",
    area: "squamish",
    venueType: "Campus & flexible event rooms",
    cardDescription: "Downtown Squamish campus with bright, flexible rooms for receptions and community gatherings.",
    shortSummary:
      "Downtown Squamish campus flexibility, useful when you want bright rooms and a practical, contemporary setting for celebrations and gatherings.",
    metaDescription:
      "Capilano University Squamish campus event DJ support: flexible downtown Squamish spaces with professional sound and personalized music. Howe Sound DJ.",
    whyFit: [
      "Flexible rooms can shift layouts and guest flow; music works best when it matches the format, seated dinner vs. mingling vs. dance-forward.",
      "The venue may read contemporary and practical; the celebration can still feel deeply personal with the right pacing.",
    ],
    planningFocus: [
      "Clarity on room setup, speech locations, and dance-floor placement prevents last-minute scrambling, especially in flexible spaces.",
      "Playlist direction should match the formality you want: modern, warm, high-energy, or blended.",
    ],
    localExpertise: [
      "Downtown Squamish sits at the heart of the corridor conversation, local timing, guest travel, and the same Sea-to-Sky wedding standards.",
      "Start with availability and align music to your schedule and space.",
    ],
  },
];

export function getVenueBySlug(slug: string): VenuePage | undefined {
  return VENUE_PAGES.find((v) => v.slug === slug);
}

export function getAllVenueSlugs(): string[] {
  return VENUE_PAGES.map((v) => v.slug);
}
