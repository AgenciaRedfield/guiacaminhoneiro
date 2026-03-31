import type { Favorite } from "@guia/types";
import { mockFavorites } from "../data/mock/mock-data.js";
import { HttpError } from "../utils/http-error.js";

export class FavoriteService {
  listByUser(userId: string) {
    return mockFavorites.filter((favorite) => favorite.userId === userId);
  }

  create(userId: string, placeId: string) {
    const existing = mockFavorites.find((favorite) => favorite.userId === userId && favorite.placeId === placeId);
    if (existing) {
      throw new HttpError(409, "Favorito ja cadastrado.");
    }

    const favorite: Favorite = {
      id: `fav-${Date.now()}`,
      userId,
      placeId,
      createdAt: new Date().toISOString(),
    };

    mockFavorites.push(favorite);
    return favorite;
  }

  remove(userId: string, placeId: string) {
    const index = mockFavorites.findIndex((favorite) => favorite.userId === userId && favorite.placeId === placeId);
    if (index >= 0) {
      mockFavorites.splice(index, 1);
    }
    return { success: true };
  }
}
