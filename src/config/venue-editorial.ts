/** Venue facts are drawn from the linked venue-operated pages, checked October 2026.
 * The DJ notes are planning recommendations, not claims that Patrick has performed at every venue.
 */
export type VenueEditorial = {
  tone: "cyan" | "pink" | "amber" | "green";
  layout: "split" | "panorama" | "framed";
  portrait: string;
  storyArt: string;
  headline: string;
  intro: string;
  facts: readonly { label: string; detail: string }[];
  djHeadline: string;
  djNotes: readonly { cue: string; detail: string }[];
  sources: readonly { label: string; url: string }[];
  bookingNote?: string;
};

export const VENUE_EDITORIAL: Record<string, VenueEditorial> = {
  "sea-to-sky-gondola": {
    tone: "cyan", layout: "panorama", portrait: "/images/venues/sea-to-sky-gondola-portrait-v1.webp", storyArt: "/images/venues/sea-to-sky-gondola-story-art-v1.webp",
    headline: "The ride up is part of the entrance.",
    intro: "Guests arrive by gondola, then choose a lookout, covered deck or the Summit Lodge for the next chapter. That movement is the story here; the music should follow it.",
    facts: [
      { label: "Ceremony choices", detail: "The venue lists Spirit Trail Lookout and the covered Diamond Head Deck, plus small elopement lookouts." },
      { label: "One wedding's route", detail: "In a wedding shared by the venue, guests moved from Spirit Trail to Diamond Head Deck for cocktails, then into Diamond Head Room for dinner and dancing." },
      { label: "Reception room", detail: "The Diamond Head Room sits inside Summit Lodge, with tall windows, Douglas fir beams and its own deck." },
    ],
    djHeadline: "Give every move its own cue.",
    djNotes: [
      { cue: "At the lookout", detail: "Confirm the exact ceremony site and power first; a wind-exposed vow needs a different mic plan from an indoor one." },
      { cue: "Back to the lodge", detail: "Leave time for the bridge, photos and guest movement before the first announcement in the reception room." },
      { cue: "When it turns into a party", detail: "Make the Diamond Head Room feel like your room, not background music for a view." },
    ],
    sources: [{ label: "Ceremony and reception locations", url: "https://www.seatoskygondola.com/groups-weddings/weddings/venue/" }, { label: "A real Gondola wedding", url: "https://www.seatoskygondola.com/blog/a-ms-wedding-at-sea-to-sky-gondola/" }],
  },
  "cheekye-ranch": {
    tone: "amber", layout: "split", portrait: "/images/venues/cheekye-ranch-portrait-v1.webp", storyArt: "/images/venues/cheekye-ranch-story-art-v1.webp",
    headline: "A ranch weekend, not a ballroom shift.",
    intro: "Cheekye's wedding package stretches across two nights beside the Cheakamus River. Guests can settle into the yurts and grounds before the wedding day asks them to gather under the tent.",
    facts: [
      { label: "Room to roam", detail: "The wedding area is three private acres within a larger ranch property, with river and mountain views." },
      { label: "Ceremony to tent", detail: "The venue lists a ceremony garden with arbor and a 40-by-80-foot frame tent with lighting." },
      { label: "Power is a real question", detail: "The package lists generators for event power; exact DJ, lighting and vendor loads need to be coordinated." },
    ],
    djHeadline: "Let the weekend become a night.",
    djNotes: [
      { cue: "Ceremony", detail: "Place speech sound for the garden, not just for the front row; confirm where the arbor and guests will actually sit." },
      { cue: "Dinner", detail: "Keep the tent warm and conversational while a weekend crowd reconnects over dinner." },
      { cue: "Dance", detail: "Plan speaker and power positions with the venue team before the tent fills; the dancing should feel effortless once it starts." },
    ],
    sources: [{ label: "Cheekye Ranch weddings", url: "https://www.cheekyeranch.com/weddings" }],
  },
  "sitka-farms": {
    tone: "pink", layout: "framed", portrait: "/images/venues/sitka-farms-portrait-v1.webp", storyArt: "/images/venues/sitka-farms-story-art-v1.webp",
    headline: "Small by choice, not short on feeling.",
    intro: "Sitka describes itself as rustic, romantic and laid-back. Its current site is taking inquiries for elopements and micro weddings only, so this page is about making a smaller gathering sound intimate and intentional.",
    facts: [
      { label: "Current booking format", detail: "Sitka says it is accepting elopement and micro-wedding submissions, not more full-size weddings for 2026 or 2027." },
      { label: "Its own character", detail: "The venue's words are 'rustic, romantic, laid-back.' A useful cue for the opening music." },
      { label: "Ask about the plan", detail: "Confirm guest count, available spaces and amplified-music permissions directly before building a DJ package." },
    ],
    djHeadline: "Make a few voices feel close.",
    djNotes: [
      { cue: "Vows", detail: "A small ceremony should still be heard clearly without sounding overproduced." },
      { cue: "Toasts", detail: "Use just enough reinforcement for the people present, with music that gives each story breathing room." },
      { cue: "Afterward", detail: "If dancing is part of the approved format, build it around the actual group rather than a full-size reception script." },
    ],
    sources: [{ label: "Sitka Farms booking notice", url: "https://www.sitkafarms.ca/" }],
    bookingNote: "Sitka currently says full-size weddings are not being booked for 2026–27. Confirm your format with the venue before planning reception sound.",
  },
  sunwolf: {
    tone: "green", layout: "panorama", portrait: "/images/venues/sunwolf-portrait-v1.webp", storyArt: "/images/venues/sunwolf-story-art-v1.webp",
    headline: "Forest air first. A proper party later.",
    intro: "Sunwolf is an outdoor riverside wedding site with cabins and Fergie's catering. Its two-night format gives guests time to settle in before the tent becomes the centre of the evening.",
    facts: [
      { label: "Outdoor by design", detail: "Sunwolf calls itself a 100% outdoor wedding venue and requires a tent rental for the temperate-rainforest setting." },
      { label: "Stay together", detail: "A full wedding rental includes the property and its cabins; the venue also describes camping options for guests." },
      { label: "The food has a home", detail: "Wedding catering and bar service are handled by the on-site Fergie's team." },
    ],
    djHeadline: "Follow the river into the tent.",
    djNotes: [
      { cue: "Outside", detail: "Work out vow pickup and weather protection around the actual ceremony location." },
      { cue: "The handoff", detail: "Coordinate with the professional day-of lead Sunwolf requires so guests never wonder where the next moment is." },
      { cue: "Under canvas", detail: "Set speech coverage and dance-floor focus for the tent footprint, then let the pace rise naturally." },
    ],
    sources: [{ label: "Sunwolf weddings and FAQ", url: "https://sunwolf.net/weddings/" }],
  },
  "squamish-valley-golf-club": {
    tone: "cyan", layout: "split", portrait: "/images/venues/squamish-valley-golf-club-portrait-v1.webp", storyArt: "/images/venues/squamish-valley-golf-club-story-art-v1.webp",
    headline: "The late ceremony changes the tempo.",
    intro: "The golf club's clubhouse, water and mountain views give this wedding a polished frame. In peak season, ceremonies are listed for after 4 p.m., so the move into dinner deserves a deliberate pace.",
    facts: [
      { label: "Event size", detail: "The club advertises indoor and outdoor wedding options for up to 140 guests." },
      { label: "Peak-season timing", detail: "Ceremonies are available after 4 p.m. during peak golf season." },
      { label: "Built-in infrastructure", detail: "The wedding page lists a microphone and sound system, DJ/band setup and stage, plus outdoor power access." },
    ],
    djHeadline: "Don't rush the turn after 'I do'.",
    djNotes: [
      { cue: "Ceremony", detail: "Confirm the approved ceremony time and audio handoff with the club's coordinator." },
      { cue: "Toasts", detail: "Check the in-house mic and speaker coverage against the chosen room and guest layout." },
      { cue: "Dance", detail: "Use the stage and floor layout to make the first dance visible, then open the room without forcing the pace." },
    ],
    sources: [{ label: "Squamish Valley Golf Club weddings", url: "https://squamishvalleygolf.com/weddings-events/" }],
  },
  "cheakamus-centre": {
    tone: "green", layout: "framed", portrait: "/images/venues/cheakamus-centre-portrait-v1.webp", storyArt: "/images/venues/cheakamus-centre-story-art-v1.webp",
    headline: "A forest campus with more than one scene.",
    intro: "Cheakamus Centre sits in a 165-hectare ecological preserve in Paradise Valley. Its wedding offering includes indoor and outdoor settings, local seasonal food and on-site accommodation options.",
    facts: [
      { label: "A real forest venue", detail: "The venue describes both modern indoor rooms and outdoor spaces beneath the forest canopy." },
      { label: "A destination weekend", detail: "On-site accommodation is offered for couples who want guests to stay together." },
      { label: "Travel needs planning", detail: "The venue's wedding information recommends arranging guest transport; it does not operate its own shuttle." },
    ],
    djHeadline: "Connect the spaces, not just the songs.",
    djNotes: [
      { cue: "Ceremony", detail: "Map the chosen ceremony location and a weather alternative before specifying sound." },
      { cue: "Guest movement", detail: "Build a handoff plan for announcements as people move between forest, dining and reception spaces." },
      { cue: "Reception", detail: "Confirm which room is booked and its event boundaries; this is a learning campus as well as a wedding venue." },
    ],
    sources: [{ label: "Cheakamus Centre weddings", url: "https://cheakamuscentre.ca/rentals/weddings" }, { label: "2027 wedding information", url: "https://cheakamuscentre.ca/assets/docs/2027-Wedding-Package---Cheakamus-Centre.pdf" }],
  },
  "glacier-valley-farm": {
    tone: "amber", layout: "panorama", portrait: "/images/venues/glacier-valley-farm-portrait-v1.webp", storyArt: "/images/venues/glacier-valley-farm-story-art-v1.webp",
    headline: "Choose your backdrop: forest or glacier.",
    intro: "Glacier Valley Farm's current wedding page offers a forest ceremony area or an open field facing the Tantalus range and glacier, with lodge, barn and accommodation options across its packages.",
    facts: [
      { label: "Two ceremony moods", detail: "The venue lists a sheltered-feeling forest area and an open field with mountain and glacier views." },
      { label: "A barn option", detail: "Its larger wedding packages include an upstairs barn venue as well as the greenspace." },
      { label: "Weekend stays", detail: "Packages include two-night accommodation; options can extend to a carriage house, yurts and camping." },
    ],
    djHeadline: "Pick the space before the speaker.",
    djNotes: [
      { cue: "Vows", detail: "The forest and the field will behave differently for wind and audience coverage; decide which is booked first." },
      { cue: "Dinner", detail: "Map the move from greenspace to barn or other reception area so the music carries the transition." },
      { cue: "Dance", detail: "Confirm power and the approved late-night location with the venue before shaping the floor." },
    ],
    sources: [{ label: "Glacier Valley Farm weddings", url: "https://www.eaglevalleyretreat.com/special-occasions/" }],
  },
  "howe-sound-brewing": {
    tone: "pink", layout: "framed", portrait: "/images/venues/howe-sound-brewing-portrait-v1.webp", storyArt: "/images/venues/howe-sound-brewing-story-art-v1.webp",
    headline: "The Chief outside. Your people inside.",
    intro: "At Squamish's original craft brewery, the Firebread event room has its own bar, natural light and an uninterrupted view of the Chief and Mamquam Mountain. It is a very different reception from a remote ranch weekend.",
    facts: [
      { label: "Firebread room", detail: "The brewery lists Firebread for weddings and private events, with a 115-person capacity." },
      { label: "Another room", detail: "The Garibaldi meeting room is listed for 60 people; confirm which room your booking actually includes." },
      { label: "A defined finish", detail: "The venue currently lists a midnight event cutoff for Firebread and Garibaldi." },
    ],
    djHeadline: "Make the pub feel like your party.",
    djNotes: [
      { cue: "Room choice", detail: "Set the sound plan for Firebread or Garibaldi, not for an imagined generic brewery floor." },
      { cue: "Speeches", detail: "Bring voices above the natural conversation of a busy social room without simply turning everything louder." },
      { cue: "Last song", detail: "Build the ending around the venue's confirmed event cutoff, not an open-ended encore." },
    ],
    sources: [{ label: "Howe Sound Brewing weddings and events", url: "https://www.howesound.com/squamish-weddings-private-events" }],
  },
  "house-of-lager-brewing-company": {
    tone: "cyan", layout: "panorama", portrait: "/images/venues/house-of-lager-brewing-company-portrait-v1.webp", storyArt: "/images/venues/house-of-lager-brewing-company-story-art-v1.webp",
    headline: "A waterfront wedding with a local pulse.",
    intro: "House of Lager describes a Squamish oceanfront wedding with Howe Sound as the backdrop, locally inspired food, crafted drinks and flexible space for either a small gathering or a lively reception.",
    facts: [
      { label: "The view", detail: "The venue's wedding page places the celebration beside Howe Sound on Squamish's oceanfront." },
      { label: "Flexible format", detail: "It explicitly welcomes both intimate gatherings and livelier receptions rather than presenting one fixed room plan." },
      { label: "Food and drink", detail: "Locally inspired food and house-crafted drinks are part of the venue's wedding pitch." },
    ],
    djHeadline: "Let the water set the opening.",
    djNotes: [
      { cue: "Outside", detail: "If vows face the water, confirm wind, power and where guests will stand before designing ceremony sound." },
      { cue: "Inside", detail: "Ask for the final room plan; flexible space means speaker coverage depends on the actual setup." },
      { cue: "Later", detail: "Move from laid-back brewery conversation to dancing when this particular crowd is ready." },
    ],
    sources: [{ label: "House of Lager weddings", url: "https://www.houseoflagerbrewing.com/weddings" }],
  },
  "evans-lake": {
    tone: "green", layout: "split", portrait: "/images/venues/evans-lake-portrait-v1.webp", storyArt: "/images/venues/evans-lake-story-art-v1.webp",
    headline: "A whole weekend around a lake.",
    intro: "Evans Lake is a forest camp wedding, not a one-room event. Guests can move from the canopy to the swim dock, lakeside field and recreation hall across an exclusive-use weekend.",
    facts: [
      { label: "Several ceremony settings", detail: "The venue describes forest vows, lake-dock photographs, an outdoor feast and a hall fallback for poor weather." },
      { label: "A group stay", detail: "Its wedding rental includes cabins and meals; the site lists a maximum wedding group of 120." },
      { label: "Seasonal length", detail: "The venue lists two-night bookings from May to October, with one- or two-night options in the colder season." },
    ],
    djHeadline: "Give camp a closing-night soundtrack.",
    djNotes: [
      { cue: "Across the site", detail: "Decide which locations actually need amplified sound; lake, forest and hall are not one acoustic space." },
      { cue: "Rain plan", detail: "Make the move to the recreation and dining hall feel planned rather than improvised." },
      { cue: "The reception", detail: "Build the dance chapter after a day of swimming, meals and time together, not as if guests just arrived at a hotel." },
    ],
    sources: [{ label: "Evans Lake weddings", url: "https://evanslake.com/venue-booking/weddings/" }],
  },
  "brackendale-art-gallery": {
    tone: "pink", layout: "framed", portrait: "/images/venues/brackendale-art-gallery-portrait-v1.webp", storyArt: "/images/venues/brackendale-art-gallery-story-art-v1.webp",
    headline: "The art is already in the room.",
    intro: "The BAG is a handmade Brackendale arts venue with a Main Stage, gallery, rooftop patio and gardens. The reception can feel like a live show without losing the closeness of a wedding.",
    facts: [
      { label: "Main Stage", detail: "The main room has an adjustable stage, bar and flexible dining or open-floor layouts." },
      { label: "Other chapters", detail: "The venue lists a second-floor gallery and rooftop patio, gardens and smaller rooms within its wedding offering." },
      { label: "A real wedding setup", detail: "The wedding page describes private use, in-house dining choices and a getting-ready space." },
    ],
    djHeadline: "Treat the floor like the headline act.",
    djNotes: [
      { cue: "Cocktails", detail: "If guests use the gallery or patio, agree on how they will hear the cue to move downstairs." },
      { cue: "Main room", detail: "Use the stage and final table plan to aim speech sound at people, not just at the walls." },
      { cue: "Dance", detail: "Turn that performance-room energy into a party built around your guests, not a generic concert set." },
    ],
    sources: [{ label: "Weddings at the BAG", url: "https://brackendaleartgallery.com/weddings-the-bag/" }, { label: "The Main Stage", url: "https://brackendaleartgallery.com/the-main-stage/" }],
  },
  "railway-museum-of-british-columbia": {
    tone: "amber", layout: "split", portrait: "/images/venues/railway-museum-of-british-columbia-portrait-v1.webp", storyArt: "/images/venues/railway-museum-of-british-columbia-story-art-v1.webp",
    headline: "A roundhouse with a headliner built in.",
    intro: "The CN Roundhouse is a large, character-filled event space where the Royal Hudson 2860 locomotive is part of the backdrop. Indoor and outdoor ceremony options give the day more than one scale.",
    facts: [
      { label: "The centrepiece", detail: "The historic Royal Hudson 2860 sits inside the Roundhouse during events." },
      { label: "Big-room flexibility", detail: "The museum advertises 18,000 square feet of event space and scenic indoor and outdoor ceremony locations." },
      { label: "A blank canvas", detail: "Blacksheep Event Rentals is the museum's exclusive rental provider; the room can be arranged in very different ways." },
    ],
    djHeadline: "Make a huge room feel personal.",
    djNotes: [
      { cue: "Layout", detail: "Get the actual ceremony, dinner and dance-floor plan before deciding speaker locations." },
      { cue: "Voices", detail: "In a large hard-surfaced hall, intelligible toasts matter more than simply adding volume." },
      { cue: "Floor", detail: "Build a defined centre of energy so the party does not disappear into the scale of the building." },
    ],
    sources: [{ label: "Railway Museum facility rental", url: "https://www.wcra.org/facility-rental/" }],
  },
  "capilano-university-squamish-campus": {
    tone: "cyan", layout: "framed", portrait: "/images/venues/capilano-university-squamish-campus-portrait-v1.webp", storyArt: "/images/venues/capilano-university-squamish-campus-story-art-v1.webp",
    headline: "First, confirm the room can host your day.",
    intro: "CapU advertises external event-space bookings at its Squamish campus, but does not present it as a dedicated wedding venue. This is a planning possibility, not a confirmed wedding package.",
    facts: [
      { label: "External requests", detail: "CapU invites outside groups to inquire about events, conferences, meetings and retreats via its Squamish booking team." },
      { label: "Different scales", detail: "The campus lists a multi-purpose room and library event areas as well as smaller meeting spaces." },
      { label: "Approval first", detail: "A campus representative reviews each inquiry; wedding use, timing and amplification need direct confirmation." },
    ],
    djHeadline: "Build around the approved format.",
    djNotes: [
      { cue: "Permission", detail: "Do not assume a ceremony, bar, dance floor or late-night event is permitted until CapU confirms it." },
      { cue: "Room", detail: "Once a space is approved, map entrances, seating and speech positions to the actual floor plan." },
      { cue: "Sound", detail: "Agree on power, equipment and operating hours with the campus before quoting or installing a setup." },
    ],
    sources: [{ label: "CapU Squamish booking process", url: "https://www.capilanou.ca/about-capu/get-to-know-us/our-locations/room-booking--facilities-rental/room-booking-request-forms/capu-squamish-campus-room-booking/" }, { label: "CapU Squamish room list", url: "https://www.capilanou.ca/about-capu/get-to-know-us/our-locations/room-booking--facilities-rental/room-rates/" }],
    bookingNote: "CapU does not currently advertise a wedding package for this campus. Confirm permission and the exact room before treating it as a booked wedding venue.",
  },
};
