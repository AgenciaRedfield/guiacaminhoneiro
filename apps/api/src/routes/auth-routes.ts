import { Router } from "express";
import { AuthController } from "../controllers/auth-controller.js";

const authController = new AuthController();
export const authRoutes = Router();

authRoutes.post("/register", (request, response) => authController.register(request, response));
authRoutes.post("/login", (request, response) => authController.login(request, response));
