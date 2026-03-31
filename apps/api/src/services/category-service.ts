import type { Category, PlaceCategorySlug } from "@guia/types";
import { mockCategories } from "../data/mock/mock-data.js";
import { HttpError } from "../utils/http-error.js";

export class CategoryService {
  list() {
    return mockCategories;
  }

  create(input: { name: string; slug: PlaceCategorySlug; icon: string; description?: string }) {
    const exists = mockCategories.find((category) => category.slug === input.slug);
    if (exists) {
      throw new HttpError(409, "Categoria ja cadastrada.");
    }

    const category: Category = { id: `cat-${Date.now()}`, ...input };
    mockCategories.push(category);
    return category;
  }

  update(id: string, input: Partial<{ name: string; slug: PlaceCategorySlug; icon: string; description?: string }>) {
    const category = mockCategories.find((item) => item.id === id);
    if (!category) {
      throw new HttpError(404, "Categoria nao encontrada.");
    }

    Object.assign(category, input);
    return category;
  }

  remove(id: string) {
    const index = mockCategories.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new HttpError(404, "Categoria nao encontrada.");
    }

    mockCategories.splice(index, 1);
    return { success: true };
  }
}
