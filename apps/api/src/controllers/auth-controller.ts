import type { Request, Response } from "express";
import { AuthService } from "../services/auth-service.js";

const authService = new AuthService();

export class AuthController {
  register(request: Request, response: Response) {
    const result = authService.register(request.body);
    return response.status(201).json(result);
  }

  login(request: Request, response: Response) {
    const result = authService.login(request.body);
    return response.json(result);
  }
}
