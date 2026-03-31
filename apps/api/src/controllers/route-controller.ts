import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.js";
import { RouteService } from "../services/route-service.js";

const routeService = new RouteService();

export class RouteController {
  async calculate(request: AuthRequest, response: Response) {
    const route = await routeService.calculate(request.body);
    return response.json(route);
  }
}
