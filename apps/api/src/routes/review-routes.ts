import { Router } from "express";
import { ReviewController } from "../controllers/review-controller.js";
import { ensureAuth } from "../middleware/auth.js";

const reviewController = new ReviewController();
export const reviewRoutes = Router();

reviewRoutes.post("/", ensureAuth, (request, response) => reviewController.create(request, response));
