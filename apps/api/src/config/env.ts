import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().default("7d"),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  OPENROUTESERVICE_API_KEY: z.string().optional(),
  USE_MOCK_DATA: z
    .string()
    .transform((value) => value === "true")
    .default("true"),
});

export const env = envSchema.parse(process.env);
