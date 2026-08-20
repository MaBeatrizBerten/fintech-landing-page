import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Lock,
  Mail,
  Building,
  User,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

interface AuthProps {
  defaultTab?: "login" | "register";
}

export function Auth({ defaultTab = "login" }: AuthProps) {
  const location = useLocation();
  const [tab, setTab] = useState<"login" | "register">(
    location.pathname === "/comecar" || defaultTab === "register"
      ? "register"
      : "login"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (location.pathname === "/comecar") {
      setTab("register");
    } else if (location.pathname === "/entrar") {
      setTab("login");
    }
  }, [location.pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
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

          {/* Abas Alternáveis: Entrar / Criar Conta */}
          <div className="flex rounded-xl bg-white/5 p-1 mb-8">
            <button
              type="button"
              onClick={() => setTab("login")}
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
              onClick={() => setTab("register")}
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

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-[#D4FF46]/10 border border-[#D4FF46]/30 text-center space-y-2"
            >
              <div className="w-12 h-12 rounded-full bg-[#D4FF46] text-black flex items-center justify-center mx-auto mb-2 font-bold text-xl">
                ✓
              </div>
              <h3 className="text-white font-bold text-lg">
                {tab === "login"
                  ? "Login simulado com sucesso!"
                  : "Cadastro recebido com sucesso!"}
              </h3>
              <p className="text-gray-300 text-xs">
                Esta é uma demonstração da interface da Pmar. Bem-vindo!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === "register" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Nome completo
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Ex: Beatriz Silveira"
                        className="w-full bg-[#181818] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF46] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Nome da empresa
                    </label>
                    <div className="relative">
                      <Building
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Ex: NuvemTech Soluções"
                        className="w-full bg-[#181818] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF46] transition-colors"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  E-mail corporativo
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="seu.nome@empresa.com"
                    className="w-full bg-[#181818] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF46] transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-gray-300">
                    Senha
                  </label>
                  {tab === "login" && (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Link de recuperação enviado.");
                      }}
                      className="text-xs text-[#D4FF46] hover:underline"
                    >
                      Esqueceu a senha?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#181818] border border-white/10 rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF46] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4FF46] text-black font-bold py-3.5 rounded-xl text-sm hover:bg-[#bce63b] transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer mt-2"
              >
                {tab === "login" ? "Entrar na plataforma" : "Criar minha conta gratuita"}
              </button>
            </form>
          )}

          {/* Divisor */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <span className="relative bg-[#111111] px-4 text-xs text-gray-500 font-medium">
              ou continue com
            </span>
          </div>

          {/* Botões SSO / Google */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => alert("Autenticação Google")}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors"
            >
              <span>Google Workspace</span>
            </button>
            <button
              type="button"
              onClick={() => alert("Autenticação SSO Corporativo")}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors"
            >
              <span>SSO / Okta</span>
            </button>
          </div>
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
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle2 size={18} className="text-[#D4FF46] shrink-0 mt-0.5" />
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
