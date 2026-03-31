import { Router } from "express";
import { authRoutes } from "./auth-routes.js";
import { categoryRoutes } from "./category-routes.js";
import { favoriteRoutes } from "./favorite-routes.js";
import { placeRoutes } from "./place-routes.js";
import { reviewRoutes } from "./review-routes.js";
import { routeRoutes } from "./route-routes.js";
import { userRoutes } from "./user-routes.js";

export const router = Router();

router.get("/health", (_request, response) => response.json({ status: "ok" }));
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/places", placeRoutes);
router.use("/reviews", reviewRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/routes", routeRoutes);
