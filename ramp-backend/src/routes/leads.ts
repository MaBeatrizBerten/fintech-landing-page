import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { logger } from "../lib/logger";
import { requireApiKey } from "../middleware/requireApiKey";
import { sendNewLeadNotification } from "../lib/email";

export const leadsRouter = Router();

const createLeadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  limit: 5, // 5 requisições por hora por IP
  message: {
    error: "Muitas requisições. Tente novamente mais tarde.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Sanitiza rigorosamente qualquer entrada de texto, removendo todas as tags HTML,
 * atributos e códigos executáveis/scripts para evitar vulnerabilidades de XSS e Stored XSS.
 */
function sanitizeInput(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "discard",
  }).trim();
}

const createLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Nome muito curto")),
  email: z
    .string()
    .trim()
    .transform(sanitizeInput)
    .pipe(z.string().email("Email inválido")),
  company: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? sanitizeInput(val) : undefined)),
  message: z
    .string()
    .trim()
    .transform(sanitizeInput)
    .pipe(z.string().min(5, "Mensagem muito curta")),
});

leadsRouter.post("/", createLeadLimiter, async (req, res) => {
  const parsed = createLeadSchema.safeParse(req.body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    logger.warn(
      { ip: req.ip, errors: fieldErrors },
      "Tentativa de cadastro de lead rejeitada na validação/sanitização"
    );
    return res.status(400).json({
      error: "Dados inválidos.",
      details: fieldErrors,
    });
  }

  const { name, email, company, message } = parsed.data;

  try {
    const lead = await prisma.lead.create({
      data: { name, email, company: company || null, message },
    });

    logger.info(
      { leadId: lead.id, email: lead.email },
      "Lead registrado com sucesso no banco de dados"
    );

    void sendNewLeadNotification(name, email, company, message).catch((err) => {
      logger.error(
        { err, leadId: lead.id },
        "Erro ao enviar notificação de lead em background"
      );
    });

    return res.status(201).json({ ok: true, id: lead.id });
  } catch (error) {
    logger.error({ err: error }, "Falha ao persistir lead no banco de dados");
    return res.status(500).json({ error: "Erro interno ao processar lead." });
  }
});

leadsRouter.get("/", requireApiKey, async (_req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    logger.info({ count: leads.length }, "Listagem de leads consultada com sucesso");
    res.json(leads);
  } catch (error) {
    logger.error({ err: error }, "Falha ao consultar leads");
    res.status(500).json({ error: "Erro interno ao consultar leads." });
  }
});
