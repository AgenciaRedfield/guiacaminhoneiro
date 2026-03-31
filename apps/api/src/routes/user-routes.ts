import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";
import { ensureAuth, ensureRole } from "../middleware/auth.js";

const userController = new UserController();
export const userRoutes = Router();

userRoutes.get("/me", ensureAuth, (request, response) => userController.me(request, response));
userRoutes.get("/", ensureAuth, ensureRole(["admin"]), (request, response) => userController.list(request, response));
