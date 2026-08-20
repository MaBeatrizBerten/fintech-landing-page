export interface User {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  role: string;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  company?: string;
}

export interface AuthResponse {
  ok: boolean;
  message: string;
  token: string;
  user: User;
}

export interface AuthErrorResponse {
  error: string;
  details?: Record<string, string[]>;
}
