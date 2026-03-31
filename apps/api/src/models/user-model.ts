import type { User } from "@guia/types";
import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  email: z.string().email(),
  role: z.enum(["driver", "partner", "admin"]),
  phone: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserModel = z.infer<typeof userSchema>;
export type AuthenticatedUser = User;
