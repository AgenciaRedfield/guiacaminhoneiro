import { Router } from "express";
import { PlaceController } from "../controllers/place-controller.js";
import { ensureAuth, ensureRole } from "../middleware/auth.js";

const placeController = new PlaceController();
export const placeRoutes = Router();

placeRoutes.get("/", (request, response) => placeController.list(request, response));
placeRoutes.get("/nearby", (request, response) => placeController.nearby(request, response));
placeRoutes.get("/:id", (request, response) => placeController.findById(request, response));
placeRoutes.post("/", ensureAuth, ensureRole(["partner", "admin"]), (request, response) => placeController.create(request, response));
placeRoutes.put("/:id", ensureAuth, ensureRole(["partner", "admin"]), (request, response) => placeController.update(request, response));
placeRoutes.patch("/:id/approval", ensureAuth, ensureRole(["admin"]), (request, response) => placeController.approve(request, response));
