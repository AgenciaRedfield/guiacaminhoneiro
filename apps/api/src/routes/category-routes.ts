import { Router } from "express";
import { CategoryController } from "../controllers/category-controller.js";
import { ensureAuth, ensureRole } from "../middleware/auth.js";

const categoryController = new CategoryController();
export const categoryRoutes = Router();

categoryRoutes.get("/", (request, response) => categoryController.list(request, response));
categoryRoutes.post("/", ensureAuth, ensureRole(["admin"]), (request, response) => categoryController.create(request, response));
categoryRoutes.put("/:id", ensureAuth, ensureRole(["admin"]), (request, response) => categoryController.update(request, response));
categoryRoutes.delete("/:id", ensureAuth, ensureRole(["admin"]), (request, response) => categoryController.remove(request, response));
