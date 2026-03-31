import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    email: string;
  };
}

export function ensureAuth(request: AuthRequest, response: Response, next: NextFunction) {
  const header = request.headers.authorization;

  if (!header) {
    return response.status(401).json({ message: "Token nao informado." });
  }

  const [, token] = header.split(" ");

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthRequest["user"];
    request.user = decoded;
    return next();
  } catch {
    return response.status(401).json({ message: "Token invalido." });
  }
}

export function ensureRole(roles: string[]) {
  return (request: AuthRequest, response: Response, next: NextFunction) => {
    if (!request.user || !roles.includes(request.user.role)) {
      return response.status(403).json({ message: "Acesso negado." });
    }

    return next();
  };
}
