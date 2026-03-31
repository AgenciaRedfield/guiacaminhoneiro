import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.js";
import { PlaceService } from "../services/place-service.js";
import { ReviewService } from "../services/review-service.js";

const placeService = new PlaceService();
const reviewService = new ReviewService();

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export class PlaceController {
  list(request: AuthRequest, response: Response) {
    const places = placeService.list({
      categoryId: request.query.categoryId as string | undefined,
      search: request.query.search as string | undefined,
      approvedOnly: !request.user || request.user.role === "driver",
    });

    return response.json(places);
  }

  nearby(_request: AuthRequest, response: Response) {
    return response.json(placeService.nearby());
  }

  findById(request: AuthRequest, response: Response) {
    const place = placeService.findById(getParam(request.params.id) ?? "");
    return response.json({ ...place, reviews: reviewService.listByPlace(place.id) });
  }

  create(request: AuthRequest, response: Response) {
    const place = placeService.create({ ...request.body, ownerId: request.user!.id });
    return response.status(201).json(place);
  }

  update(request: AuthRequest, response: Response) {
    const place = placeService.update(getParam(request.params.id) ?? "", request.user!.id, request.user!.role, request.body);
    return response.json(place);
  }

  approve(request: AuthRequest, response: Response) {
    const place = placeService.approve(getParam(request.params.id) ?? "", request.body.approved, request.body.featured);
    return response.json(place);
  }
}
