import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Rocket,
  Building2,
  LineChart,
  Globe2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  FileCheck,
} from "lucide-react";

// Componente do Gráfico Animado para a aba do CFO
const CFOChart = () => {
  const data = [
    { label: "Q1", value: 100, display: "R$ 12k" },
    { label: "Q2", value: 65, display: "R$ 8k" },
    { label: "Q3", value: 25, display: "R$ 3k" },
    { label: "Q4", value: 0, display: "R$ 0" },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Container das Barras */}
      <div className="flex items-end justify-between gap-2 sm:gap-4 w-full max-w-[240px] h-28 mb-4">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 group w-full"
          >
            {/* Tooltip que aparece ao passar o mouse */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-[#D4FF46] bg-[#D4FF46]/10 border border-[#D4FF46]/20 px-1.5 py-0.5 rounded">
              {item.display}
            </div>

            {/* Fundo da Barra */}
            <div className="w-full max-w-[32px] md:max-w-[40px] h-16 bg-white/5 rounded-t-md relative overflow-hidden flex items-end justify-center">
              {/* Barra Verde Animada */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${item.value}%` }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                className="w-full bg-gradient-to-t from-[#D4FF46]/20 to-[#D4FF46] rounded-t-md"
              />
              {/* Linha indicadora quando o valor for zero */}
              {item.value === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="w-full h-[2px] bg-[#D4FF46] rounded-t-md absolute bottom-0"
                />
              )}
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* O texto original que fica abaixo do gráfico */}
      <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
        R$ 0 em multas
      </div>
    </div>
  );
};

export function Solutions() {
  const [activeTab, setActiveTab] = useState<
    "startup" | "enterprise" | "cfo" | "global"
  >("startup");

  const tabs = [
    {
      id: "startup" as const,
      label: "Startups & Scale-ups",
      icon: <Rocket size={18} />,
    },
    {
      id: "enterprise" as const,
      label: "Médias & Grandes Empresas",
      icon: <Building2 size={18} />,
    },
    {
      id: "cfo" as const,
      label: "CFOs & Controladoria",
      icon: <LineChart size={18} />,
    },
    {
      id: "global" as const,
      label: "Operações Globais",
      icon: <Globe2 size={18} />,
    },
  ];

  const solutionContent = {
    startup: {
      title: "Cresça rápido sem perder o controle do seu runway.",
      subtitle:
        "Equipes dinâmicas precisam de autonomia sem burocracia bancária. Emita cartões para novos colaboradores em segundos e acompanhe cada centavo em tempo real.",
      benefits: [
        "Abertura de conta 100% digital em menos de 10 minutos",
        "Cartões virtuais ilimitados para ferramentas SaaS e anúncios digitais",
        "Alertas no Slack/WhatsApp de despesas fora do padrão",
        "Cashback inteligente em todos os gastos corporativos",
      ],
      tag: "Ideal para times de 5 a 100 pessoas",
      stat: "80% de economia de tempo operacional",
    },
    enterprise: {
      title: "Governança corporativa, auditoria e controle em escala.",
      subtitle:
        "Controles rigorosos e automação contábil para organizações com múltiplas filiais, centros de custo e centenas de cartões em operação simultânea.",
      benefits: [
        "Alçadas de aprovação multinível por hierarquia e departamento",
        "Integração direta e contínua com SAP, Totvs, Oracle e NetSuite",
        "Políticas de compliance parametrizáveis por tipo de despesa",
        "Gerente de contas dedicado e SLA garantido de atendimento",
      ],
      tag: "Para empresas com mais de 100 colaboradores",
      stat: "Fechamento contábil 10x mais ágil",
    },
    cfo: {
      title: "Visibilidade 360° e conciliação em tempo real.",
      subtitle:
        "Diga adeus a semanas perdidas cobrando recibos e batendo notas fiscais. A Pmar automatiza a classificação contábil e gera relatórios precisos instantaneamente.",
      benefits: [
        "Extração OCR automática de todas as notas fiscais recebidas",
        "Exportação contábil pronta para seu plano de contas padrão",
        "Previsibilidade orçamentária com inteligência preditiva de fluxo de caixa",
        "Relatórios executivos de despesas por projeto e departamento",
      ],
      tag: "Projetado para times contábeis e fiscais",
      // Renderizamos o componente visual em vez da string estática
      stat: <CFOChart />,
    },
    global: {
      title: "Expansão internacional sem barreiras bancárias.",
      subtitle:
        "Conecte sua empresa ao mundo com emissão em múltiplas moedas e pagamentos transfronteiriços sem os spreads predatórios dos bancos tradicionais.",
      benefits: [
        "Contas e cartões nativos em USD, EUR, GBP e BRL",
        "Pagamentos a prestadores de serviços internacionais sem intermediários",
        "Proteção contra oscilação cambial com saldo em moeda forte",
        "Centralização de IOF e tributos aduaneiros em um só extrato",
      ],
      tag: "Para negócios transfronteiriços e remotos",
      stat: "Até 4% de economia em taxas de câmbio",
    },
  };

  const current = solutionContent[activeTab];

  return (
    <div className="pt-28 pb-20 px-6">
      {/* Header */}
      <section className="max-w-7xl mx-auto text-center pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 mb-6"
        >
          <ShieldCheck size={14} className="text-[#D4FF46]" />
          Soluções Estratégicas
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto mb-6"
        >
          Feito sob medida para o seu estágio de crescimento.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Conheça as soluções desenvolvidas especificamente para as necessidades
          do seu modelo de negócio.
        </motion.p>
      </section>

      {/* Tabs Interativas de Soluções */}
      <section className="max-w-6xl mx-auto mb-24">
        {/* Barra de Navegação das Abas */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-[#111111] border border-white/10 mb-12">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#D4FF46] text-black shadow-lg shadow-[#D4FF46]/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Conteúdo da Aba Ativa */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-8 md:p-12 rounded-3xl bg-[#0f0f0f] border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center"
          >
            <div className="md:col-span-7">
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 mb-4">
                {current.tag}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
                {current.title}
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                {current.subtitle}
              </p>

              <ul className="space-y-3 mb-8">
                {current.benefits.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-[#D4FF46] shrink-0 mt-0.5"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/comecar"
                  className="w-full sm:w-auto bg-[#D4FF46] text-black font-bold px-7 py-3.5 rounded-full text-sm hover:bg-[#bce63b] transition-transform hover:scale-105 active:scale-95 text-center"
                >
                  Começar com esta solução
                </Link>
                <Link
                  to="/produtos"
                  className="w-full sm:w-auto text-gray-300 hover:text-white font-medium text-sm flex items-center justify-center gap-1.5"
                >
                  <span>Ver todas as funcionalidades</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-center items-center">
              <div className="w-full rounded-2xl bg-gradient-to-b from-[#1c1c1c] to-[#121212] border border-white/10 p-8 text-center space-y-4 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-[#D4FF46]/10 border border-[#D4FF46]/20 flex items-center justify-center text-[#D4FF46] mx-auto">
                  <LineChart size={28} />
                </div>

                {/* Lógica condicional: Se for string, renderiza como texto normal. Se for componente, renderiza o gráfico */}
                {typeof current.stat === "string" ? (
                  <div className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight">
                    {current.stat}
                  </div>
                ) : (
                  current.stat
                )}

                <p className="text-xs text-gray-400 leading-relaxed pt-2">
                  Média comprovada nos primeiros 6 meses de implantação da Pmar.
                </p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-gray-300 font-semibold">
                  <CheckCircle2 size={14} className="text-[#D4FF46]" />
                  <span>Sem taxa de adesão ou fidelidade</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Seção de Segurança e Conformidade */}
      <section className="max-w-7xl mx-auto py-16 border-t border-white/5">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Segurança de nível bancário global
          </h3>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Seus fundos e dados corporativos protegidos pelos protocolos mais
            avançados do mercado financeiro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Lock className="text-[#D4FF46]" size={24} />,
              title: "Criptografia AES-256",
              description:
                "Proteção militar de dados em trânsito e em repouso com tokens individuais por transação.",
            },
            {
              icon: <FileCheck className="text-[#D4FF46]" size={24} />,
              title: "Certificação SOC 2 Type II",
              description:
                "Auditoria independente contínua de controles de segurança, disponibilidade e privacidade.",
            },
            {
              icon: <ShieldCheck className="text-[#D4FF46]" size={24} />,
              title: "Conformidade LGPD & BACEN",
              description:
                "Alinhamento estrito a todas as diretrizes regulatórias de proteção de dados e bancárias.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-[#111111] border border-white/10 flex flex-col items-start text-left"
            >
              <div className="p-3 rounded-xl bg-white/5 mb-6 border border-white/10">
                {card.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                {card.title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
