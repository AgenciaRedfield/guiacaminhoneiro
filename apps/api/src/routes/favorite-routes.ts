import { Router } from "express";
import { FavoriteController } from "../controllers/favorite-controller.js";
import { ensureAuth } from "../middleware/auth.js";

const favoriteController = new FavoriteController();
export const favoriteRoutes = Router();

favoriteRoutes.get("/", ensureAuth, (request, response) => favoriteController.list(request, response));
favoriteRoutes.post("/", ensureAuth, (request, response) => favoriteController.create(request, response));
favoriteRoutes.delete("/:placeId", ensureAuth, (request, response) => favoriteController.remove(request, response));
