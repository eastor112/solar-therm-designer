export interface IPlace {
  id: number;
  place: string;
  lat: number;
  lng: number;
  altitude: number;
}

export const defaultPlaces: IPlace[] = [
  {
    id: 1,
    place: "Piura",
    lat: -5.19449,
    lng: -80.63282,
    altitude: 55
  },
  {
    id: 2,
    place: "Trujillo",
    lat: -8.11599,
    lng: -79.02998,
    altitude: 34
  },
  {
    id: 3,
    place: "Cajamarca",
    lat: -7.16378,
    lng: -78.50027,
    altitude: 2750
  },
  {
    id: 4,
    place: "Lima",
    lat: -12.04318,
    lng: -77.02824,
    altitude: 1
  }
];
