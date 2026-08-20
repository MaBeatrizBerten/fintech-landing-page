import { api, TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "./api";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from "../types/auth";

export const authService = {
  /**
   * Realiza login autenticando contra o backend Node/Prisma/Supabase.
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const data = await api.post<AuthResponse>("/api/auth/login", credentials);
    if (data.token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
    }
    return data;
  },

  /**
   * Registra um novo usuário no banco de dados via endpoint do backend.
   */
  async register(registerData: RegisterData): Promise<AuthResponse> {
    const data = await api.post<AuthResponse>("/api/auth/register", registerData);
    if (data.token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
    }
    return data;
  },

  /**
   * Consulta a sessão ativa e os dados do usuário autenticado (/api/auth/me).
   */
  async getMe(): Promise<User> {
    const response = await api.get<{ ok: boolean; user: User }>("/api/auth/me");
    if (response.user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
    }
    return response.user;
  },

  /**
   * Atualiza dados de perfil do usuário autenticado.
   */
  async updateProfile(
    profileData: Partial<RegisterData> & { currentPassword?: string; newPassword?: string }
  ): Promise<User> {
    const response = await api.put<{ ok: boolean; user: User }>(
      "/api/auth/me",
      profileData
    );
    if (response.user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
    }
    return response.user;
  },

  /**
   * Encerra a sessão localmente e notifica o backend.
   */
  async logout(): Promise<void> {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // Ignora falhas de rede no logout para assegurar limpeza local
    } finally {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  },

  /**
   * Retorna o token armazenado no localStorage se existir.
   */
  getStoredToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  /**
   * Retorna os dados do usuário em cache local se existirem.
   */
  getStoredUser(): User | null {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  },
};
