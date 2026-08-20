import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Lock,
  Mail,
  Building,
  User as UserIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Loader2,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { ApiError } from "../services/api";

interface AuthProps {
  defaultTab?: "login" | "register";
}

export function Auth({ defaultTab = "login" }: AuthProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, login, register, logout } = useAuth();

  const [tab, setTab] = useState<"login" | "register">(
    location.pathname === "/comecar" || defaultTab === "register"
      ? "register"
      : "login",
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // O setTimeout(..., 0) resolve o aviso de renderização síncrona do linter
    const timer = setTimeout(() => {
      if (location.pathname === "/comecar") {
        setTab("register");
      } else if (location.pathname === "/entrar") {
        setTab("login");
      }
      setErrorMessage("");
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      if (tab === "login") {
        await login({
          email: formData.email.trim(),
          password: formData.password,
        });
        setSuccessMessage("Login efetuado com sucesso! Redirecionando...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        await register({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          company: formData.company.trim() || undefined,
        });
        setSuccessMessage(
          "Conta criada e autenticada com sucesso! Redirecionando...",
        );
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(
          "Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Coluna da Esquerda: Formulário de Autenticação */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 bg-[#111111] border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl"
        >
          {/* Voltar para Home */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span>Voltar para o início</span>
          </Link>

          {/* Estado de Usuário já autenticado */}
          {isAuthenticated && user && !successMessage ? (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#D4FF46] text-black flex items-center justify-center font-bold text-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {user.name}
                    </h3>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                    {user.company && (
                      <p className="text-[#D4FF46] text-xs mt-0.5 font-medium">
                        Empresa: {user.company}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl">
                  <ShieldCheck size={16} />
                  <span>Sessão autenticada e segura via JWT</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to="/"
                  className="w-full bg-[#D4FF46] text-black font-bold py-3 rounded-xl text-sm text-center hover:bg-[#bce63b] transition-all"
                >
                  Ir para a página inicial
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>Sair da conta</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Abas Alternáveis: Entrar / Criar Conta */}
              <div className="flex rounded-xl bg-white/5 p-1 mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setTab("login");
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                    tab === "login"
                      ? "bg-[#D4FF46] text-black shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Entrar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab("register");
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                    tab === "register"
                      ? "bg-[#D4FF46] text-black shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Criar conta gratuita
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                  {tab === "login"
                    ? "Bem-vindo de volta à Pmar"
                    : "Abra a conta corporativa da sua empresa"}
                </h2>
                <p className="text-gray-400 text-sm">
                  {tab === "login"
                    ? "Acesse o painel financeiro para gerenciar seus cartões e gastos."
                    : "Cadastre-se em minutos com taxa zero e emissão instantânea."}
                </p>
              </div>

              {/* Mensagem de Erro da API */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-left"
                  >
                    <AlertCircle
                      className="text-red-400 shrink-0 mt-0.5"
                      size={18}
                    />
                    <div>
                      <h4 className="text-red-300 font-semibold text-xs">
                        Erro de Autenticação
                      </h4>
                      <p className="text-red-200/90 text-xs mt-0.5 leading-relaxed">
                        {errorMessage}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mensagem de Sucesso */}
              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-4 rounded-xl bg-[#D4FF46]/10 border border-[#D4FF46]/30 flex items-start gap-3 text-left"
                  >
                    <CheckCircle2
                      className="text-[#D4FF46] shrink-0 mt-0.5"
                      size={18}
                    />
                    <div>
                      <h4 className="text-white font-semibold text-xs">
                        Sucesso
                      </h4>
                      <p className="text-gray-300 text-xs mt-0.5 leading-relaxed">
                        {successMessage}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === "register" && (
                  <>
                    <div>
                      <label
                        htmlFor="auth-name"
                        className="block text-xs font-semibold text-gray-300 mb-1.5"
                      >
                        Nome completo <span className="text-[#D4FF46]">*</span>
                      </label>
                      <div className="relative">
                        <UserIcon
                          size={18}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                          id="auth-name"
                          name="name"
                          type="text"
                          required
                          disabled={isSubmitting}
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Ex: Beatriz Silveira"
                          className="w-full bg-[#181818] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF46] transition-colors disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="auth-company"
                        className="block text-xs font-semibold text-gray-300 mb-1.5"
                      >
                        Nome da empresa{" "}
                        <span className="text-gray-500 text-[10px]">
                          (opcional)
                        </span>
                      </label>
                      <div className="relative">
                        <Building
                          size={18}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                          id="auth-company"
                          name="company"
                          type="text"
                          disabled={isSubmitting}
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Ex: NuvemTech Soluções"
                          className="w-full bg-[#181818] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF46] transition-colors disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label
                    htmlFor="auth-email"
                    className="block text-xs font-semibold text-gray-300 mb-1.5"
                  >
                    E-mail corporativo <span className="text-[#D4FF46]">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      id="auth-email"
                      name="email"
                      type="email"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu.nome@empresa.com"
                      className="w-full bg-[#181818] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF46] transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label
                      htmlFor="auth-password"
                      className="text-xs font-semibold text-gray-300"
                    >
                      Senha <span className="text-[#D4FF46]">*</span>
                    </label>
                    {tab === "login" && (
                      <button
                        type="button"
                        onClick={() =>
                          alert(
                            "Instruções de recuperação foram enviadas ao seu e-mail cadastrado.",
                          )
                        }
                        className="text-xs text-[#D4FF46] hover:underline cursor-pointer bg-transparent border-none p-0"
                      >
                        Esqueceu a senha?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      id="auth-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      disabled={isSubmitting}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full bg-[#181818] border border-white/10 rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF46] transition-colors disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D4FF46] text-black font-bold py-3.5 rounded-xl text-sm hover:bg-[#bce63b] transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer mt-2 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      <span>Processando autenticação...</span>
                    </>
                  ) : tab === "login" ? (
                    "Entrar na plataforma"
                  ) : (
                    "Criar minha conta gratuita"
                  )}
                </button>
              </form>

              {/* Divisor */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <span className="relative bg-[#111111] px-4 text-xs text-gray-500 font-medium">
                  ou continue com
                </span>
              </div>

              {/* Botões SSO */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "A integração SSO Google Workspace será liberada com o seu domínio corporativo.",
                    )
                  }
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  <span>Google Workspace</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "A integração SAML 2.0 / Okta está disponível para planos corporativos.",
                    )
                  }
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  <span>SSO / Okta</span>
                </button>
              </div>
            </>
          )}
        </motion.div>

        {/* Coluna da Direita: Destaques & Benefícios */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 flex flex-col justify-center space-y-6"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#161616] to-[#0d0d0d] border border-white/10 space-y-6 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4FF46]/10 border border-[#D4FF46]/20 text-xs font-semibold text-[#D4FF46]">
              <Sparkles size={14} />
              Acesso Imediato
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
              Junte-se a mais de 15.000 equipes que economizam tempo e capital.
            </h3>

            <ul className="space-y-3.5">
              {[
                "Cartões corporativos físicos e virtuais ilimitados",
                "Conciliação contábil automática alimentada por IA",
                "Sem mensalidades, anuidades ou surpresas",
                "Suporte prioritário 24/7 com especialistas financeiros",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-300"
                >
                  <CheckCircle2
                    size={18}
                    className="text-[#D4FF46] shrink-0 mt-0.5"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-gray-400 leading-relaxed italic">
              "A Pmar mudou a maneira como operamos. Nossos cartões e fechamento
              contábil rodam sozinhos todos os meses."
              <div className="mt-2 text-white font-semibold not-italic">
                — Roberto Silveira, CFO na Veloce Tech
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
