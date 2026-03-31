import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.js";
import { FavoriteService } from "../services/favorite-service.js";

const favoriteService = new FavoriteService();

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export class FavoriteController {
  list(request: AuthRequest, response: Response) {
    return response.json(favoriteService.listByUser(request.user!.id));
  }

  create(request: AuthRequest, response: Response) {
    const favorite = favoriteService.create(request.user!.id, request.body.placeId);
    return response.status(201).json(favorite);
  }

  remove(request: AuthRequest, response: Response) {
    return response.json(favoriteService.remove(request.user!.id, getParam(request.params.placeId) ?? ""));
  }
}
