import type { LocationPin } from "@/shared/Map";

export type Influencer = {
  id: string;
  name: string;
  handle: string; // used in URL
  avatarUrl?: string;
  locations: LocationPin[];
};

export const influencers: Influencer[] = [
  {
    id: "1",
    name: "NYC Foodie",
    handle: "nyc_foodie",
    locations: [
      {
        id: "loc-1",
        name: "Prince Street Pizza",
        address: "27 Prince St, New York, NY",
        lat: 40.7231,
        lng: -73.9943,
        reelUrl: "https://www.instagram.com/reel/EXAMPLE1",
      },
      {
        id: "loc-2",
        name: "Katz's Delicatessen",
        address: "205 E Houston St, New York, NY",
        lat: 40.7223,
        lng: -73.9874,
        reelUrl: "https://www.instagram.com/reel/EXAMPLE2",
      },
    ],
  },
  {
    id: "2",
    name: "LA Eats",
    handle: "la_eats",
    locations: [
      {
        id: "loc-3",
        name: "Howlin' Ray's",
        address: "727 N Broadway #128, Los Angeles, CA",
        lat: 34.0619,
        lng: -118.239,
        reelUrl: "https://www.instagram.com/reel/EXAMPLE3",
      },
    ],
  },
];


