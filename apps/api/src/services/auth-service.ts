import jwt, { type SignOptions } from "jsonwebtoken";
import type { User } from "@guia/types";
import { env } from "../config/env.js";
import { mockUsers } from "../data/mock/mock-data.js";
import { HttpError } from "../utils/http-error.js";

export class AuthService {
  register(input: { name: string; email: string; password: string; role?: User["role"] }) {
    const existing = mockUsers.find((user) => user.email === input.email);
    if (existing) {
      throw new HttpError(409, "Usuario ja cadastrado.");
    }

    const user = {
      id: `usr-${Date.now()}`,
      name: input.name,
      email: input.email,
      role: input.role ?? "driver",
      phone: "",
      password: input.password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers.push(user);

    return this.buildAuthResponse(user);
  }

  login(input: { email: string; password: string }) {
    const user = mockUsers.find((item) => item.email === input.email && item.password === input.password);
    if (!user) {
      throw new HttpError(401, "Credenciais invalidas.");
    }

    return this.buildAuthResponse(user);
  }

  private buildAuthResponse(user: typeof mockUsers[number]) {
    const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"] };
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, env.JWT_SECRET, options);

    const { password: _password, ...safeUser } = user;
    return { token, user: safeUser };
  }
}
