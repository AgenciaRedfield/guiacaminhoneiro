import type { Review } from "@guia/types";
import { averageRating } from "@guia/utils";
import { mockPlaces, mockReviews } from "../data/mock/mock-data.js";

export class ReviewService {
  create(input: Omit<Review, "id" | "approved" | "createdAt">) {
    const review: Review = {
      id: `rev-${Date.now()}`,
      approved: true,
      createdAt: new Date().toISOString(),
      ...input,
    };

    mockReviews.push(review);

    const related = mockReviews.filter((item) => item.placeId === input.placeId && item.approved);
    const place = mockPlaces.find((item) => item.id === input.placeId);
    if (place) {
      place.rating = averageRating(related.map((item) => item.rating));
      place.reviewsCount = related.length;
      place.updatedAt = new Date().toISOString();
    }

    return review;
  }

  listByPlace(placeId: string) {
    return mockReviews.filter((review) => review.placeId === placeId && review.approved);
  }
}
