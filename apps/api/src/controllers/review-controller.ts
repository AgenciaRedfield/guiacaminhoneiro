import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.js";
import { ReviewService } from "../services/review-service.js";

const reviewService = new ReviewService();

export class ReviewController {
  create(request: AuthRequest, response: Response) {
    const review = reviewService.create({
      placeId: request.body.placeId,
      rating: request.body.rating,
      comment: request.body.comment,
      userId: request.user!.id,
    });

    return response.status(201).json(review);
  }
}
