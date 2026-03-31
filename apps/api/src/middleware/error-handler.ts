import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http-error.js";

export function errorHandler(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (error instanceof HttpError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({ message: "Erro interno do servidor." });
}
