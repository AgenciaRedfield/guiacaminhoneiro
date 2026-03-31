export type UserRole = "driver" | "partner" | "admin";

export type PlaceCategorySlug =
  | "posto"
  | "oficina"
  | "borracharia"
  | "restaurante"
  | "hotel"
  | "patio"
  | "ponto-de-apoio"
  | "guincho"
  | "balanca"
  | "loja-de-pecas";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: PlaceCategorySlug;
  icon: string;
  description?: string;
}

export interface PlaceService {
  id: string;
  placeId: string;
  name: string;
  description?: string;
}

export interface PlacePhoto {
  id: string;
  placeId: string;
  url: string;
  isCover: boolean;
}

export interface Place {
  id: string;
  ownerId: string;
  categoryId: string;
  name: string;
  description: string;
  approved: boolean;
  featured: boolean;
  acceptsLargeTruck: boolean;
  acceptsTrailer: boolean;
  acceptsBitrem: boolean;
  phone?: string;
  whatsapp?: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewsCount: number;
  services: PlaceService[];
  photos: PlacePhoto[];
  openingHours: string[];
  distanceFromRouteKm?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  placeId: string;
  userId: string;
  rating: number;
  comment?: string;
  approved: boolean;
  createdAt: string;
}

export interface Favorite {
  id: string;
  placeId: string;
  userId: string;
  createdAt: string;
}

export interface RouteStop {
  place: Place;
  distanceFromRouteKm: number;
}

export interface RouteSummary {
  distanceKm: number;
  durationMinutes: number;
  geometry: [number, number][];
  stopsAlongRoute: RouteStop[];
}

export interface DashboardMetric {
  label: string;
  value: number | string;
  helper?: string;
}
