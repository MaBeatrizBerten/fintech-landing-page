import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  CreditCard,
  Receipt,
  Globe as GlobeIcon,
  TrendingUp,
  Rocket,
  Building2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Zap,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";


interface SubItem {
  title: string;
  description: string;
  icon: ReactNode;
  badge?: string;
  href: string;
}

interface NavSection {
  label: string;
  href: string;
  items?: SubItem[];
  featured?: {
    title: string;
    description: string;
    cta: string;
    href: string;
  };
}

const navSections: NavSection[] = [
  {
    label: "Produtos",
    href: "/produtos",
    items: [
      {
        title: "Cartões Corporativos",
        description:
          "Cartões físicos e virtuais ilimitados com limites customizados.",
        icon: <CreditCard size={20} className="text-[#D4FF46]" />,
        badge: "Mais Usado",
        href: "/produtos",
      },
      {
        title: "Gestão de Despesas",
        description:
          "Aprovações instantâneas e categorização inteligente com IA.",
        icon: <Receipt size={20} className="text-[#D4FF46]" />,
        badge: "IA",
        href: "/produtos",
      },
      {
        title: "Gastos Globais",
        description:
          "Emissão em múltiplas moedas sem taxas de conversão abusivas.",
        icon: <GlobeIcon size={20} className="text-[#D4FF46]" />,
        href: "/produtos",
      },
      {
        title: "Relatórios em Tempo Real",
        description:
          "Visibilidade financeira total e fechamento de caixa acelerado.",
        icon: <TrendingUp size={20} className="text-[#D4FF46]" />,
        href: "/produtos",
      },
    ],
    featured: {
      title: "Automação com IA Pmar",
      description:
        "Reduza até 5% dos custos operacionais no primeiro ano de uso.",
      cta: "Ver demonstração",
      href: "/produtos",
    },
  },
  {
    label: "Soluções",
    href: "/solucoes",
    items: [
      {
        title: "Startups & Scale-ups",
        description:
          "Controle de runway e emissão ágil para equipes em crescimento.",
        icon: <Rocket size={20} className="text-[#D4FF46]" />,
        href: "/solucoes",
      },
      {
        title: "Empresas em Escala",
        description:
          "Governança avançada, alçadas de aprovação e conciliação ERP.",
        icon: <Building2 size={20} className="text-[#D4FF46]" />,
        href: "/solucoes",
      },
      {
        title: "Segurança & Conformidade",
        description:
          "Proteção de nível institucional com criptografia de ponta a ponta.",
        icon: <ShieldCheck size={20} className="text-[#D4FF46]" />,
        href: "/solucoes",
      },
    ],
  },
  {
    label: "Clientes",
    href: "/#clientes",
    items: [
      {
        title: "Histórias de Sucesso",
        description:
          "Descubra como empresas líderes economizam tempo e capital.",
        icon: <Sparkles size={20} className="text-[#D4FF46]" />,
        href: "/#clientes",
      },
      {
        title: "Calculadora de Economia",
        description:
          "Simule quanto sua equipe pode economizar trocando de banco.",
        icon: <TrendingUp size={20} className="text-[#D4FF46]" />,
        href: "/#clientes",
      },
    ],
  },
  {
    label: "Preços",
    href: "/produtos",
    items: [
      {
        title: "Pmar Free",
        description:
          "R$ 0/mês. Cartões corporativos ilimitados e gestão de despesas com IA.",
        icon: <Zap size={20} className="text-[#D4FF46]" />,
        badge: "R$ 0",
        href: "/comecar",
      },
      {
        title: "Pmar Plus",
        description:
          "Automação contábil avançada, alçadas multinível e relatórios customizados.",
        icon: <Sparkles size={20} className="text-[#D4FF46]" />,
        badge: "Popular",
        href: "/comecar",
      },
      {
        title: "Pmar Enterprise",
        description:
          "Controles corporativos sob medida, limites globais e gerente de conta dedicado.",
        icon: <Building2 size={20} className="text-[#D4FF46]" />,
        href: "/comecar",
      },
    ],
  },
];

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={navContainerRef}
      className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/10"
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-white font-bold text-3xl tracking-tighter cursor-pointer select-none"
        >
          pmar<span className="text-[#D4FF46]">.</span>
        </Link>

        {/* Links de Navegação Desktop com Setas e Pré-Visualização */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
          {navSections.map((section) => {
            const hasDropdown = Boolean(section.items?.length);
            const isOpen = activeMenu === section.label;

            return (
              <div
                key={section.label}
                className="relative"
                onMouseEnter={() =>
                  hasDropdown
                    ? handleMouseEnter(section.label)
                    : setActiveMenu(null)
                }
              >
                <Link
                  to={section.href}
                  onClick={() => setActiveMenu(null)}
                  className={`group inline-flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                    isOpen
                      ? "text-white bg-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{section.label}</span>
                  {hasDropdown && (
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-300 ease-out ${
                        isOpen
                          ? "rotate-180 text-[#D4FF46]"
                          : "text-gray-500 group-hover:text-white"
                      }`}
                    />
                  )}
                </Link>

                {/* Popover / Menu de Pré-visualização Dropdown */}
                <AnimatePresence>
                  {hasDropdown && isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 rounded-2xl bg-[#111111]/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-6 z-50 ${
                        section.featured ? "w-[640px]" : "w-[460px]"
                      }`}
                    >
                      <div
                        className={
                          section.featured
                            ? "grid grid-cols-12 gap-6"
                            : "space-y-2"
                        }
                      >
                        {/* Lista de Itens com Ícones e Descrições */}
                        <div
                          className={
                            section.featured
                              ? "col-span-7 space-y-2"
                              : "space-y-2"
                          }
                        >
                          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider px-3 pb-1">
                            {section.label}
                          </div>
                          {section.items?.map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.href}
                              onClick={() => setActiveMenu(null)}
                              className="group/item flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/5 transition-all duration-200"
                            >
                              <div className="p-2.5 rounded-lg bg-[#1A1A1A] border border-white/5 group-hover/item:border-[#D4FF46]/40 transition-colors shrink-0">
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-white text-sm font-semibold group-hover/item:text-[#D4FF46] transition-colors">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4FF46]/10 text-[#D4FF46] border border-[#D4FF46]/20">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-400 text-xs mt-0.5 leading-relaxed line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Card em Destaque Lateral (se houver) */}
                        {section.featured && (
                          <div className="col-span-5 rounded-xl bg-gradient-to-b from-[#1A1A1A] to-[#141414] border border-white/10 p-5 flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#D4FF46] text-black">
                                Destaque
                              </span>
                              <h4 className="text-white font-bold text-base mt-4 mb-2">
                                {section.featured.title}
                              </h4>
                              <p className="text-gray-400 text-xs leading-relaxed">
                                {section.featured.description}
                              </p>
                            </div>
                            <Link
                              to={section.featured.href}
                              onClick={() => setActiveMenu(null)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4FF46] hover:text-[#bce63b] transition-colors mt-4 pt-3 border-t border-white/5"
                            >
                              <span>{section.featured.cta}</span>
                              <ArrowRight size={14} />
                            </Link>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Ações (Botões à Direita) */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/entrar"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#D4FF46]/40 transition-colors text-xs font-semibold text-white"
              >
                <div className="w-6 h-6 rounded-full bg-[#D4FF46] text-black font-bold flex items-center justify-center text-[10px]">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="max-w-[120px] truncate">{user.name.split(" ")[0]}</span>
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                title="Sair da conta"
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/entrar"
                className="text-white text-sm font-medium hover:text-gray-300 transition-colors hidden sm:block"
              >
                Entrar
              </Link>
              <Link
                to="/comecar"
                className="bg-[#D4FF46] text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#bce63b] transition-transform hover:scale-105 active:scale-95"
              >
                Começar agora
              </Link>
            </>
          )}

          {/* Botão Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Retrátil com Acordeão */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0c0c0c] border-b border-white/10 px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navSections.map((section) => {
                const hasDropdown = Boolean(section.items?.length);
                const isExpanded = mobileExpanded === section.label;

                return (
                  <div
                    key={section.label}
                    className="border-b border-white/5 pb-2"
                  >
                    <div className="flex items-center justify-between py-2">
                      <Link
                        to={section.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-left text-base font-semibold text-white hover:text-[#D4FF46]"
                      >
                        {section.label}
                      </Link>
                      {hasDropdown && (
                        <button
                          onClick={() =>
                            setMobileExpanded(isExpanded ? null : section.label)
                          }
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${
                              isExpanded ? "rotate-180 text-[#D4FF46]" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Subitens Mobile */}
                    {hasDropdown && isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pl-2 pt-2 space-y-2.5"
                      >
                        {section.items?.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 py-1.5 text-sm text-gray-400 hover:text-white"
                          >
                            <span className="shrink-0">{item.icon}</span>
                            <span>{item.title}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 flex flex-col gap-3">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-8 h-8 rounded-full bg-[#D4FF46] text-black font-bold flex items-center justify-center text-xs shrink-0">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-white text-sm font-semibold truncate">{user.name}</div>
                        <div className="text-gray-400 text-xs truncate">{user.email}</div>
                      </div>
                    </div>
                    <Link
                      to="/entrar"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/5 text-center"
                    >
                      Minha Conta
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 font-semibold text-sm hover:bg-red-500/20 text-center flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogOut size={16} />
                      <span>Sair da conta</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/entrar"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/5 text-center"
                    >
                      Entrar
                    </Link>
                    <Link
                      to="/comecar"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 rounded-full bg-[#D4FF46] text-black font-bold text-sm hover:bg-[#bce63b] text-center"
                    >
                      Começar agora
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
