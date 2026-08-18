import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { z } from "zod";
import { prisma } from "../lib/prisma";
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

const createLeadSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto"),
  email: z.string().trim().email("Email inválido"),
  company: z.string().trim().optional(),
  message: z.string().trim().min(5, "Mensagem muito curta"),
});

leadsRouter.post("/", createLeadLimiter, async (req, res) => {
  const parsed = createLeadSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Dados inválidos.",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const { name, email, company, message } = parsed.data;

  const lead = await prisma.lead.create({
    data: { name, email, company: company || null, message },
  });

  void sendNewLeadNotification(name, email, company, message).catch((err) => {
    console.error("Erro ao enviar notificação de lead em background:", err);
  });

  return res.status(201).json({ ok: true, id: lead.id });
});

leadsRouter.get("/", requireApiKey, async (_req, res) => {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(leads);
});
