import { Router, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { logger } from "../lib/logger";
import { requireAuthOrApiKey } from "../middleware/auth";
import { sendNewLeadNotification } from "../lib/email";

export const leadsRouter = Router();

const createLeadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  limit: 10, // 10 requisições por hora por IP
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
    .toLowerCase()
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

const updateLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Nome muito curto"))
    .optional(),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .transform(sanitizeInput)
    .pipe(z.string().email("Email inválido"))
    .optional(),
  company: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? sanitizeInput(val) : undefined)),
  message: z
    .string()
    .trim()
    .transform(sanitizeInput)
    .pipe(z.string().min(5, "Mensagem muito curta"))
    .optional(),
});

/**
 * CREATE: POST /api/leads
 * Cria um novo Lead comercial a partir do formulário da landing page.
 */
leadsRouter.post("/", createLeadLimiter, async (req: Request, res: Response) => {
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

    return res.status(201).json({ ok: true, lead });
  } catch (error) {
    logger.error({ err: error }, "Falha ao persistir lead no banco de dados");
    return res.status(500).json({ error: "Erro interno ao processar lead." });
  }
});

/**
 * READ ALL: GET /api/leads
 * Lista todos os leads cadastrados em ordem cronológica reversa (requer autenticação JWT ou API Key).
 */
leadsRouter.get("/", requireAuthOrApiKey, async (_req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    logger.info({ count: leads.length }, "Listagem de leads consultada com sucesso");
    return res.json({ ok: true, leads });
  } catch (error) {
    logger.error({ err: error }, "Falha ao consultar leads");
    return res.status(500).json({ error: "Erro interno ao consultar leads." });
  }
});

/**
 * READ ONE: GET /api/leads/:id
 * Retorna os detalhes de um lead específico.
 */
leadsRouter.get("/:id", requireAuthOrApiKey, async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return res.status(404).json({ error: "Lead não encontrado." });
    }

    return res.json({ ok: true, lead });
  } catch (error) {
    logger.error({ err: error, id }, "Falha ao consultar lead por id");
    return res.status(500).json({ error: "Erro interno ao buscar lead." });
  }
});

/**
 * UPDATE: PUT /api/leads/:id
 * Atualiza os dados de um lead existente.
 */
leadsRouter.put("/:id", requireAuthOrApiKey, async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) {
    return res.status(400).json({ error: "ID inválido." });
  }

  const parsed = updateLeadSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Dados de atualização inválidos.",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const existing = await prisma.lead.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Lead não encontrado." });
    }

    const { name, email, company, message } = parsed.data;
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(company !== undefined && { company: company || null }),
        ...(message !== undefined && { message }),
      },
    });

    logger.info({ leadId: id }, "Lead atualizado com sucesso");
    return res.json({ ok: true, lead: updatedLead });
  } catch (error) {
    logger.error({ err: error, id }, "Falha ao atualizar lead");
    return res.status(500).json({ error: "Erro interno ao atualizar lead." });
  }
});

/**
 * DELETE: DELETE /api/leads/:id
 * Remove um lead do banco de dados.
 */
leadsRouter.delete("/:id", requireAuthOrApiKey, async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const existing = await prisma.lead.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Lead não encontrado." });
    }

    await prisma.lead.delete({ where: { id } });
    logger.info({ leadId: id }, "Lead excluído com sucesso");

    return res.json({ ok: true, message: "Lead removido com sucesso." });
  } catch (error) {
    logger.error({ err: error, id }, "Falha ao deletar lead");
    return res.status(500).json({ error: "Erro interno ao remover lead." });
  }
});
