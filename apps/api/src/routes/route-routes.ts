import { Router } from "express";
import { RouteController } from "../controllers/route-controller.js";
import { ensureAuth } from "../middleware/auth.js";

const routeController = new RouteController();
export const routeRoutes = Router();

routeRoutes.post("/calculate", ensureAuth, (request, response) => routeController.calculate(request, response));
