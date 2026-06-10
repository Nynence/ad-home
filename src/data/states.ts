export type Area = {
  id: string;
  name: string;
  count: number;
  image: string;
};

export type State = {
  id: string;
  name: string;
  abbr: string;
  count: number;
  areas: Area[];
};

// Images cycle through /areas/a1.jpg – a7.jpg.
// Each state starts at a different offset so featured cards look varied.
const IMGS = [
  "/areas/a1.jpg",
  "/areas/a2.jpg",
  "/areas/a3.jpg",
  "/areas/a4.jpg",
  "/areas/a5.jpg",
  "/areas/a6.jpg",
  "/areas/a7.jpg",
];

function img(stateOffset: number, areaIndex: number) {
  return IMGS[(stateOffset + areaIndex) % IMGS.length];
}

/**
 * The most-recent search a returning user made.
 * Used by the "Recent search" exploration modes near the search bar.
 */
export const RECENT_SEARCH = {
  stateAbbr: "VIC",
  areaName: "Bayside",
  count: 33,
  href: "/search?state=vic&area=bayside",
};

export const STATES: State[] = [
  // ── Victoria ────────────────────────────────────────────────────────────
  {
    id: "vic",
    name: "Victoria",
    abbr: "VIC",
    count: 167,
    areas: [
      { id: "melbourne",             name: "Melbourne",             count: 189, image: img(0, 0) },
      { id: "inner-melbourne",       name: "Inner Melbourne",       count:  50, image: img(0, 1) },
      { id: "south-eastern-suburbs", name: "South-Eastern Suburbs", count:  49, image: img(0, 2) },
      { id: "eastern-suburbs",       name: "Eastern Suburbs",       count:  34, image: img(0, 3) },
      { id: "bayside",               name: "Bayside",               count:  33, image: img(0, 4) },
      { id: "northern-suburbs",      name: "Northern Suburbs",      count:  12, image: img(0, 5) },
      { id: "western-suburbs",       name: "Western Suburbs",       count:   9, image: img(0, 6) },
      { id: "mornington-peninsula",  name: "Mornington Peninsula",  count:   2, image: img(0, 0) },
      { id: "regional-vic",          name: "Regional VIC",          count:   2, image: img(0, 1) },
      { id: "geelong",               name: "Geelong",               count:   2, image: img(0, 2) },
    ],
  },

  // ── New South Wales ──────────────────────────────────────────────────────
  {
    id: "nsw",
    name: "New South Wales",
    abbr: "NSW",
    count: 165,
    areas: [
      { id: "sydney",                          name: "Sydney",                          count: 132, image: img(3, 0) },
      { id: "sydney-north",                    name: "Sydney North",                    count:  44, image: img(3, 1) },
      { id: "sydney-city-eastern-suburbs",     name: "Sydney City & Eastern Suburbs",   count:  27, image: img(3, 2) },
      { id: "north-west-sydney",               name: "North West Sydney",               count:  23, image: img(3, 3) },
      { id: "inner-west",                      name: "Inner West",                      count:  13, image: img(3, 4) },
      { id: "western-sydney",                  name: "Western Sydney",                  count:  12, image: img(3, 5) },
      { id: "south-sydney",                    name: "South Sydney",                    count:   7, image: img(3, 6) },
      { id: "south-west-sydney",               name: "South West Sydney",               count:   6, image: img(3, 0) },
      { id: "regional-south",                  name: "Regional (South)",                count:  21, image: img(3, 1) },
      { id: "regional-north",                  name: "Regional (North)",                count:  13, image: img(3, 2) },
    ],
  },

  // ── Queensland ───────────────────────────────────────────────────────────
  {
    id: "qld",
    name: "Queensland",
    abbr: "QLD",
    count: 128,
    areas: [
      { id: "brisbane",         name: "Brisbane",         count: 46, image: img(6, 0) },
      { id: "brisbane-inner",   name: "Brisbane Inner",   count: 23, image: img(6, 1) },
      { id: "brisbane-north",   name: "Brisbane North",   count: 13, image: img(6, 2) },
      { id: "brisbane-west",    name: "Brisbane West",    count:  4, image: img(6, 3) },
      { id: "brisbane-bayside", name: "Brisbane Bayside", count:  2, image: img(6, 4) },
      { id: "brisbane-south",   name: "Brisbane South",   count:  2, image: img(6, 5) },
      { id: "brisbane-east",    name: "Brisbane East",    count:  2, image: img(6, 6) },
      { id: "gold-coast",       name: "Gold Coast",       count: 68, image: img(6, 0) },
      { id: "north-gold-coast", name: "North Gold Coast", count: 63, image: img(6, 1) },
      { id: "south-gold-coast", name: "South Gold Coast", count:  5, image: img(6, 2) },
      { id: "sunshine-coast",   name: "Sunshine Coast",   count:  9, image: img(6, 3) },
      { id: "moreton-bay",      name: "Moreton Bay",      count:  4, image: img(6, 4) },
      { id: "regional-qld",     name: "Regional QLD",     count:  1, image: img(6, 5) },
    ],
  },

  // ── Western Australia ────────────────────────────────────────────────────
  {
    id: "wa",
    name: "Western Australia",
    abbr: "WA",
    count: 39,
    areas: [
      { id: "inner-coastal-perth", name: "Inner & Coastal Perth", count: 35, image: img(2, 0) },
      { id: "greater-perth",       name: "Greater Perth",         count:  4, image: img(2, 1) },
    ],
  },

  // ── South Australia ──────────────────────────────────────────────────────
  {
    id: "sa",
    name: "South Australia",
    abbr: "SA",
    count: 13,
    areas: [
      { id: "inner-adelaide",          name: "Inner Adelaide",          count: 9, image: img(5, 0) },
      { id: "adelaide-west-coastal",   name: "Adelaide West & Coastal", count: 4, image: img(5, 1) },
    ],
  },

  // ── Tasmania ─────────────────────────────────────────────────────────────
  {
    id: "tas",
    name: "Tasmania",
    abbr: "TAS",
    count: 2,
    areas: [
      { id: "hobart", name: "Hobart", count: 1, image: img(1, 0) },
      { id: "sorell", name: "Sorell", count: 1, image: img(1, 1) },
    ],
  },

  // ── Australian Capital Territory ─────────────────────────────────────────
  {
    id: "act",
    name: "Australian Capital Territory",
    abbr: "ACT",
    count: 15,
    areas: [
      { id: "inner-canberra", name: "Inner Canberra", count: 12, image: img(4, 0) },
      { id: "woden-valley",   name: "Woden Valley",   count:  2, image: img(4, 1) },
      { id: "gungahlin",      name: "Gungahlin",      count:  1, image: img(4, 2) },
    ],
  },
];
