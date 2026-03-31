import type { Coordinates, Place } from "@guia/types";

export function formatDistance(km?: number) {
  if (km === undefined) return "N/A";
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export function averageRating(values: number[]) {
  if (!values.length) return 0;
  const total = values.reduce((acc, value) => acc + value, 0);
  return Number((total / values.length).toFixed(1));
}

export function buildMapLink({ latitude, longitude }: Coordinates) {
  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;
}

export function filterPlacesByQuery(places: Place[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return places;

  return places.filter((place) =>
    [place.name, place.description, place.city, place.state]
      .join(" ")
      .toLowerCase()
      .includes(normalized),
  );
}
