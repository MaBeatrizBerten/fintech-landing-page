import jwt from "jsonwebtoken";
import { env } from "./env";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Gera um token JWT assinado contendo os dados essenciais do usuário autenticado.
 */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

/**
 * Valida e decodifica um token JWT.
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
}
