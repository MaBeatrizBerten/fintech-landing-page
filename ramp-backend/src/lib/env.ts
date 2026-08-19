import "dotenv/config";
import { z } from "zod";
import { logger } from "./logger";

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL é obrigatória."),
  PORT: z.preprocess(
    (val) => (val !== undefined && val !== "" ? Number(val) : undefined),
    z.number({ message: "PORT deve ser um número válido." }).positive("PORT deve ser um número positivo.")
  ),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  ADMIN_API_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  NOTIFY_EMAIL_TO: z.string().optional(),
  NOTIFY_EMAIL_FROM: z.string().optional(),
  LOG_LEVEL: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const formattedErrors = parsedEnv.error.flatten().fieldErrors;
  logger.error(
    { errors: formattedErrors },
    "❌ Falha crítica na validação das variáveis de ambiente. Verifique o arquivo .env ou o ambiente de deploy."
  );
  process.exit(1);
}

export const env = parsedEnv.data;
