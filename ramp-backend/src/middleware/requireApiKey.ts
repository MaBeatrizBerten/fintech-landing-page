import { NextFunction, Request, Response } from "express";
import { env } from "../lib/env";
import { logger } from "../lib/logger";

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token || !env.ADMIN_API_KEY || token !== env.ADMIN_API_KEY) {
    logger.warn(
      { ip: req.ip, path: req.originalUrl },
      "Tentativa de acesso não autorizado bloqueada"
    );
    return res.status(401).json({ error: "Não autorizado." });
  }

  next();
}
