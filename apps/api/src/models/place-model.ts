import type { Category, Place } from "@guia/types";
import { z } from "zod";

export const placeSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  categoryId: z.string(),
  name: z.string().min(3),
  description: z.string().min(10),
  approved: z.boolean(),
  featured: z.boolean(),
  acceptsLargeTruck: z.boolean(),
  acceptsTrailer: z.boolean(),
  acceptsBitrem: z.boolean(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  rating: z.number(),
  reviewsCount: z.number(),
  services: z.array(z.object({ id: z.string(), placeId: z.string(), name: z.string(), description: z.string().optional() })),
  photos: z.array(z.object({ id: z.string(), placeId: z.string(), url: z.string(), isCover: z.boolean() })),
  openingHours: z.array(z.string()),
  distanceFromRouteKm: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type PlaceModel = z.infer<typeof placeSchema>;
export type PlaceCategoryModel = Category;
export type PlaceView = Place;
