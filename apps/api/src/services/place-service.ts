import type { Place } from "@guia/types";
import { mockPlaces } from "../data/mock/mock-data.js";
import { HttpError } from "../utils/http-error.js";

export class PlaceService {
  list(filters?: { categoryId?: string; search?: string; approvedOnly?: boolean }) {
    return mockPlaces.filter((place) => {
      if (filters?.approvedOnly && !place.approved) return false;
      if (filters?.categoryId && place.categoryId !== filters.categoryId) return false;
      if (filters?.search) {
        const query = filters.search.toLowerCase();
        const haystack = `${place.name} ${place.description} ${place.city} ${place.state}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }

  nearby() {
    return mockPlaces.filter((place) => place.approved);
  }

  findById(id: string) {
    const place = mockPlaces.find((item) => item.id === id);
    if (!place) {
      throw new HttpError(404, "Estabelecimento nao encontrado.");
    }
    return place;
  }

  create(input: Partial<Place> & { ownerId: string }) {
    const place: Place = {
      id: `plc-${Date.now()}`,
      ownerId: input.ownerId,
      categoryId: input.categoryId ?? "cat-1",
      name: input.name ?? "Novo estabelecimento",
      description: input.description ?? "Descricao pendente",
      approved: false,
      featured: false,
      acceptsLargeTruck: input.acceptsLargeTruck ?? true,
      acceptsTrailer: input.acceptsTrailer ?? false,
      acceptsBitrem: input.acceptsBitrem ?? false,
      phone: input.phone,
      whatsapp: input.whatsapp,
      address: input.address ?? "Endereco pendente",
      city: input.city ?? "Cidade",
      state: input.state ?? "UF",
      latitude: input.latitude ?? -23.55,
      longitude: input.longitude ?? -46.63,
      rating: 0,
      reviewsCount: 0,
      services: input.services ?? [],
      photos: input.photos ?? [],
      openingHours: input.openingHours ?? ["Seg-Sex 08:00-18:00"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockPlaces.push(place);
    return place;
  }

  update(id: string, userId: string, role: string, input: Partial<Place>) {
    const place = this.findById(id);
    if (role !== "admin" && place.ownerId !== userId) {
      throw new HttpError(403, "Voce so pode editar seus proprios estabelecimentos.");
    }

    Object.assign(place, input, { updatedAt: new Date().toISOString() });
    return place;
  }

  approve(id: string, approved: boolean, featured?: boolean) {
    const place = this.findById(id);
    place.approved = approved;
    if (featured !== undefined) {
      place.featured = featured;
    }
    place.updatedAt = new Date().toISOString();
    return place;
  }
}
