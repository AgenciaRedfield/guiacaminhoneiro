import { mockPlaces } from "../data/mock/mock-data.js";

export class PlaceRepository {
  async listApproved() {
    return mockPlaces.filter((place) => place.approved);
  }
}
