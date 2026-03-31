import type { Request, Response } from "express";
import { CategoryService } from "../services/category-service.js";

const categoryService = new CategoryService();

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export class CategoryController {
  list(_request: Request, response: Response) {
    return response.json(categoryService.list());
  }

  create(request: Request, response: Response) {
    return response.status(201).json(categoryService.create(request.body));
  }

  update(request: Request, response: Response) {
    return response.json(categoryService.update(getParam(request.params.id) ?? "", request.body));
  }

  remove(request: Request, response: Response) {
    return response.json(categoryService.remove(getParam(request.params.id) ?? ""));
  }
}
