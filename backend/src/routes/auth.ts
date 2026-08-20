import { Router, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import bcrypt from "bcryptjs";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { logger } from "../lib/logger";
import { generateToken } from "../lib/jwt";
import { authenticateToken } from "../middleware/auth";

export const authRouter = Router();

// Rate limiter específico para rotas de autenticação (mitigação de ataques de força bruta e credential stuffing)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 20, // 20 tentativas a cada 15 min por IP
  message: {
    error: "Muitas tentativas de autenticação. Por favor, aguarde alguns minutos antes de tentar novamente.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Sanitiza rigorosamente texto de entrada para prevenção de XSS e injeção de scripts.
 */
function sanitizeInput(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "discard",
  }).trim();
}

// Schemas de validação Zod
const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "O nome deve ter pelo menos 2 caracteres.")),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .transform(sanitizeInput)
    .pipe(z.string().email("Endereço de e-mail inválido.")),
  password: z
    .string()
    .min(6, "A senha deve conter no mínimo 6 caracteres.")
    .max(100, "A senha não pode ultrapassar 100 caracteres."),
  company: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? sanitizeInput(val) : undefined)),
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .transform(sanitizeInput)
    .pipe(z.string().email("Endereço de e-mail inválido.")),
  password: z.string().min(1, "A senha é obrigatória."),
});

const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "O nome deve ter pelo menos 2 caracteres."))
    .optional(),
  company: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? sanitizeInput(val) : undefined)),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(6, "A nova senha deve conter no mínimo 6 caracteres.")
    .max(100, "A senha não pode ultrapassar 100 caracteres.")
    .optional(),
});

/**
 * POST /api/auth/register
 * Cadastro de novo usuário com criptografia de senha via bcrypt e persistência no Prisma (Supabase).
 */
authRouter.post("/register", authLimiter, async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    logger.warn(
      { ip: req.ip, errors: fieldErrors },
      "Falha de validação no registro de usuário"
    );
    return res.status(400).json({
      error: "Dados de cadastro inválidos.",
      details: fieldErrors,
    });
  }

  const { name, email, password, company } = parsed.data;

  try {
    // Verifica duplicidade de e-mail
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      logger.warn(
        { email, ip: req.ip },
        "Tentativa de cadastro com e-mail já existente"
      );
      return res.status(409).json({
        error: "Este e-mail já está cadastrado na plataforma. Tente fazer login.",
      });
    }

    // Criptografia da senha com bcrypt (10 rounds de salt)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Criação do usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        company: company || null,
        role: "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Emissão do token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    logger.info(
      { userId: user.id, email: user.email },
      "Novo usuário registrado com sucesso"
    );

    return res.status(201).json({
      ok: true,
      message: "Conta criada com sucesso!",
      token,
      user,
    });
  } catch (error) {
    logger.error({ err: error, email }, "Erro crítico no cadastro de usuário");
    return res.status(500).json({
      error: "Erro interno no servidor ao realizar cadastro.",
    });
  }
});

/**
 * POST /api/auth/login
 * Autenticação de credenciais com validação de hash bcrypt e emissão de token JWT.
 */
authRouter.post("/login", authLimiter, async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({
      error: "Credenciais inválidas.",
      details: fieldErrors,
    });
  }

  const { email, password } = parsed.data;

  try {
    // Busca usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      logger.warn({ email, ip: req.ip }, "Tentativa de login: usuário não encontrado");
      return res.status(401).json({
        error: "E-mail ou senha incorretos.",
      });
    }

    // Compara o hash da senha de forma segura contra timing attacks
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      logger.warn({ email, ip: req.ip }, "Tentativa de login com senha incorreta");
      return res.status(401).json({
        error: "E-mail ou senha incorretos.",
      });
    }

    // Emissão do token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    logger.info({ userId: user.id, email: user.email }, "Usuário autenticado com sucesso");

    return res.status(200).json({
      ok: true,
      message: "Login realizado com sucesso!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    logger.error({ err: error, email }, "Erro crítico no login de usuário");
    return res.status(500).json({
      error: "Erro interno no servidor ao realizar autenticação.",
    });
  }
});

/**
 * GET /api/auth/me
 * Retorna os dados do usuário autenticado a partir do token JWT.
 */
authRouter.get("/me", authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Sessão não identificada." });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.json({ ok: true, user });
  } catch (error) {
    logger.error({ err: error, userId: req.user?.userId }, "Erro ao obter perfil do usuário");
    return res.status(500).json({ error: "Erro ao consultar dados da conta." });
  }
});

/**
 * PUT /api/auth/me
 * Atualiza informações de perfil e permite troca de senha segura.
 */
authRouter.put("/me", authenticateToken, async (req: Request, res: Response) => {
  const parsed = updateProfileSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Dados de atualização inválidos.",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ error: "Sessão não identificada." });
  }

  const { name, company, currentPassword, newPassword } = parsed.data;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const updateData: { name?: string; company?: string | null; password?: string } = {};

    if (name !== undefined) updateData.name = name;
    if (company !== undefined) updateData.company = company || null;

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          error: "Para alterar a senha, informe sua senha atual.",
        });
      }

      const isCurrentValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentValid) {
        return res.status(401).json({
          error: "A senha atual informada está incorreta.",
        });
      }

      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    logger.info({ userId }, "Perfil do usuário atualizado com sucesso");

    return res.json({
      ok: true,
      message: "Perfil atualizado com sucesso!",
      user: updatedUser,
    });
  } catch (error) {
    logger.error({ err: error, userId }, "Erro ao atualizar perfil");
    return res.status(500).json({ error: "Erro interno ao atualizar perfil." });
  }
});

/**
 * POST /api/auth/logout
 * Encerramento de sessão para o cliente.
 */
authRouter.post("/logout", (_req: Request, res: Response) => {
  return res.json({ ok: true, message: "Sessão encerrada com sucesso." });
});
