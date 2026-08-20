import { Request, Response, NextFunction } from "express";
import { verifyToken, TokenPayload } from "../lib/jwt";
import { env } from "../lib/env";
import { logger } from "../lib/logger";

// Estende a tipagem do Request do Express para incluir o payload autenticado do usuário
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

/**
 * Middleware para proteger rotas autenticadas via JWT.
 * Valida a presença e integridade do cabeçalho "Authorization: Bearer <token>".
 */
export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({
      error: "Acesso negado. Token de autenticação não fornecido.",
    });
  }

  const payload = verifyToken(token);

  if (!payload) {
    logger.warn(
      { ip: req.ip, path: req.originalUrl },
      "Tentativa de acesso com token inválido ou expirado"
    );
    return res.status(401).json({
      error: "Sessão inválida ou expirada. Por favor, realize o login novamente.",
    });
  }

  req.user = payload;
  next();
}

/**
 * Middleware que aceita tanto um JWT válido de usuário autenticado quanto a ADMIN_API_KEY.
 * Ideal para operações administrativas e endpoints CRUD compartilhados.
 */
export function requireAuthOrApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({
      error: "Acesso negado. Forneça um token de autenticação JWT ou uma chave de API válida.",
    });
  }

  // Validação por Chave de API de Administração
  if (env.ADMIN_API_KEY && token === env.ADMIN_API_KEY) {
    req.user = {
      userId: "admin-api-key",
      email: "admin@pmar.internal",
      role: "ADMIN",
    };
    return next();
  }

  // Validação por Token JWT
  const payload = verifyToken(token);
  if (payload) {
    req.user = payload;
    return next();
  }

  logger.warn(
    { ip: req.ip, path: req.originalUrl },
    "Tentativa de acesso com credencial inválida (JWT ou API Key)"
  );
  return res.status(401).json({
    error: "Credencial inválida ou expirada. Não autorizado.",
  });
}

/**
 * Middleware para controle de acesso baseado em cargos/roles.
 */
export function requireRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      logger.warn(
        { ip: req.ip, user: req.user, requiredRoles: allowedRoles },
        "Tentativa de acesso negado por falta de permissão de cargo"
      );
      return res.status(403).json({
        error: "Acesso negado. Você não possui permissão para acessar este recurso.",
      });
    }
    next();
  };
}
