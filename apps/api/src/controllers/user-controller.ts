import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.js";
import { UserService } from "../services/user-service.js";

const userService = new UserService();

export class UserController {
  me(request: AuthRequest, response: Response) {
    return response.json(userService.me(request.user!.id));
  }

  list(_request: AuthRequest, response: Response) {
    return response.json(userService.list());
  }
}
