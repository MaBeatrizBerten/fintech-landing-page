import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Receipt,
  Globe2,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Zap,
  Sparkles,
} from "lucide-react";

export function Products() {
  const products = [
    {
      id: "cartoes",
      badge: "Mais Utilizado",
      title: "Cartões Corporativos Físicos & Virtuais",
      subtitle:
        "Emita cartões ilimitados com limites dinâmicos personalizados para cada membro do seu time em segundos.",
      icon: <CreditCard className="text-[#D4FF46]" size={28} />,
      highlights: [
        "Emissão instantânea de cartões virtuais para compras online e SaaS",
        "Cartões físicos metálicos com tecnologia contactless para viagens e eventos",
        "Definição de regras de gastos por categoria, horário ou estabelecimento",
        "Bloqueio e desbloqueio com 1 clique no aplicativo",
      ],
      previewContent: (
        <div className="relative w-full max-w-md aspect-[1.58/1] rounded-2xl bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#0d0d0d] p-6 border border-white/15 shadow-2xl flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4FF46]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex justify-between items-start">
            <span className="text-2xl font-bold tracking-tighter text-white">
              pmar<span className="text-[#D4FF46]">.</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-gray-300 uppercase tracking-wider">
              Corporate Platinum
            </span>
          </div>
          <div className="w-10 h-8 rounded bg-gradient-to-r from-amber-200 to-yellow-500 opacity-80" />
          <div>
            <div className="text-xs text-gray-400 mb-1">
              •••• •••• •••• 8842
            </div>
            <div className="flex justify-between text-xs text-white font-medium">
              <span>TECH CORP BRASIL</span>
              <span>12/30</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "despesas",
      badge: "Inteligência Artificial",
      title: "Gestão Automatizada de Despesas",
      subtitle:
        "Diga adeus à coleta manual de comprovantes. Nossa IA lê notas fiscais, concilia transações e fecha o caixa sem planilhas.",
      icon: <Receipt className="text-[#D4FF46]" size={28} />,
      highlights: [
        "Extração OCR inteligente de recibos via WhatsApp, e-mail e app móvel",
        "Conciliação automática em tempo real com seu plano de contas contábil",
        "Fluxos de aprovação multinível personalizados por departamento",
        "Auditoria em tempo real de notas fiscais com detecção de duplicidades",
      ],
      previewContent: (
        <div className="w-full max-w-md rounded-2xl bg-[#141414] p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5 text-xs text-gray-400">
            <span>Últimas Despesas Processadas</span>
            <span className="text-[#D4FF46] flex items-center gap-1 font-semibold">
              <Sparkles size={12} /> IA Ativa
            </span>
          </div>
          {[
            {
              name: "AWS Cloud Services",
              cat: "Infraestrutura",
              val: "R$ 4.250,00",
              status: "Aprovado",
            },
            {
              name: "Google Workspace",
              cat: "Software",
              val: "R$ 890,00",
              status: "Aprovado",
            },
            {
              name: "Passagens Aéreas Latam",
              cat: "Viagens",
              val: "R$ 1.640,00",
              status: "Em análise",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs"
            >
              <div>
                <div className="text-white font-medium">{item.name}</div>
                <div className="text-gray-400 text-[10px]">{item.cat}</div>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold font-mono">
                  {item.val}
                </div>
                <div
                  className={`text-[10px] font-medium ${item.status === "Aprovado" ? "text-[#D4FF46]" : "text-amber-400"}`}
                >
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "global",
      badge: "Multicurrency",
      title: "Operações e Pagamentos Globais",
      subtitle:
        "Transacione em mais de 150 países com as menores taxas do mercado e consolide despesas internacionais com total clareza.",
      icon: <Globe2 className="text-[#D4FF46]" size={28} />,
      highlights: [
        "Emissão de cartões internacionais em USD, EUR, GBP e BRL",
        "Zero taxa de spread abusivo de bancos tradicionais em conversões",
        "Pagamentos a fornecedores no exterior via SWIFT e transferências locais",
        "Visualização centralizada de impostos e IOF",
      ],
      previewContent: (
        <div className="w-full max-w-md rounded-2xl bg-[#141414] p-6 border border-white/10 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#D4FF46]/10 border border-[#D4FF46]/30 flex items-center justify-center text-2xl mb-4">
            🌎
          </div>
          <h4 className="text-white font-bold text-base mb-1">
            Contas Globais Nativas
          </h4>
          <p className="text-gray-400 text-xs mb-4">
            Pague fornecedores e equipes remotas em moeda local sem atrito.
          </p>
          <div className="grid grid-cols-3 gap-2 w-full">
            <div className="p-2 rounded-lg bg-white/5 text-center">
              <div className="text-xs text-gray-400">USD</div>
              <div className="text-sm font-bold text-white font-mono">
                $48,250
              </div>
            </div>
            <div className="p-2 rounded-lg bg-white/5 text-center">
              <div className="text-xs text-gray-400">EUR</div>
              <div className="text-sm font-bold text-white font-mono">
                €24,100
              </div>
            </div>
            <div className="p-2 rounded-lg bg-white/5 text-center">
              <div className="text-xs text-gray-400">BRL</div>
              <div className="text-sm font-bold text-[#D4FF46] font-mono">
                R$ 180k
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const comparison = [
    {
      feature: "Anuidade e mensalidade de cartões",
      pmar: "R$ 0 (Gratuito)",
      banks: "Até R$ 1.500/cartão",
    },
    {
      feature: "Emissão de cartões virtuais ilimitados",
      pmar: "Instantâneo e ilimitado",
      banks: "Limitado ou indisponível",
    },
    {
      feature: "Conciliação contábil e OCR com IA",
      pmar: "Automático em tempo real",
      banks: "Processo manual",
    },
    {
      feature: "Integração nativa com ERPs (SAP, Totvs, Omie)",
      pmar: "Inclusa em 2 vias",
      banks: "Necessita arquivos remessa",
    },
    {
      feature: "Controle de limites por colaborador/categoria",
      pmar: "Granular e instantâneo",
      banks: "Burocrático via gerente",
    },
  ];

  return (
    <div className="pt-28 pb-20 px-6">
      {/* Header Principal da Página */}
      <section className="max-w-7xl mx-auto text-center pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 mb-6"
        >
          <Cpu size={14} className="text-[#D4FF46]" />
          Ecossistema Completo Pmar
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto mb-6"
        >
          Controle financeiro moderno em uma única plataforma.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Tudo o que sua equipe precisa para emitir cartões corporativos,
          gerenciar despesas com inteligência artificial e acelerar o fechamento
          de caixa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/comecar"
            className="w-full sm:w-auto bg-[#D4FF46] text-black font-bold px-8 py-4 rounded-full text-base hover:bg-[#bce63b] transition-transform hover:scale-105 active:scale-95 text-center"
          >
            Começar agora gratuitamente
          </Link>
          <Link
            to="/solucoes"
            className="w-full sm:w-auto bg-transparent text-white font-semibold px-8 py-4 rounded-full text-base border border-white/20 hover:bg-white/10 transition-colors text-center"
          >
            Explorar soluções por porte
          </Link>
        </motion.div>
      </section>

      {/* Lista Detalhada de Produtos */}
      <section className="max-w-7xl mx-auto py-12 space-y-24">
        {products.map((p, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } items-center justify-between gap-12 p-8 md:p-12 rounded-3xl bg-[#0f0f0f] border border-white/10`}
            >
              {/* Coluna Texto */}
              <div className="w-full md:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4FF46]/10 border border-[#D4FF46]/20 text-xs font-semibold text-[#D4FF46] mb-4">
                  {p.badge}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {p.icon}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {p.title}
                  </h2>
                </div>
                <p className="text-gray-400 text-base leading-relaxed mb-6">
                  {p.subtitle}
                </p>

                <ul className="space-y-3 mb-8">
                  {p.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-[#D4FF46] shrink-0 mt-0.5"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/comecar"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#D4FF46] hover:text-[#bce63b] transition-colors"
                >
                  <span>Experimente este recurso</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Coluna Visual/Mockup */}
              <div className="w-full md:w-1/2 flex items-center justify-center">
                {p.previewContent}
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Tabela Comparativa */}
      <section className="max-w-7xl mx-auto py-16 border-t border-white/5">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Pmar vs Bancos Tradicionais
          </h3>
          <p className="text-gray-400 text-base">
            Veja por que milhares de empresas modernas substituíram os processos
            burocráticos.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="py-4 px-6 font-semibold">Funcionalidade</th>
                <th className="py-4 px-6 font-bold text-[#D4FF46]">
                  Plataforma Pmar
                </th>
                <th className="py-4 px-6 font-semibold text-gray-400">
                  Bancos Tradicionais
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {comparison.map((c, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 text-white font-medium">
                    {c.feature}
                  </td>
                  <td className="py-4 px-6 text-[#D4FF46] font-semibold flex items-center gap-2">
                    <Zap size={16} /> {c.pmar}
                  </td>
                  <td className="py-4 px-6 text-gray-400">{c.banks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Inferior */}
      <section className="max-w-5xl mx-auto mt-12 text-center p-12 rounded-3xl bg-gradient-to-b from-[#161616] to-[#0e0e0e] border border-white/10">
        <h3 className="text-3xl font-bold text-white mb-4">
          Pronto para experimentar o futuro da gestão corporativa?
        </h3>
        <p className="text-gray-400 text-base mb-8 max-w-xl mx-auto">
          Abra sua conta em menos de 10 minutos sem burocracia ou taxas de
          abertura.
        </p>
        <Link
          to="/comecar"
          className="inline-flex items-center gap-2 bg-[#D4FF46] text-black font-bold px-8 py-4 rounded-full text-base hover:bg-[#bce63b] transition-transform hover:scale-105 active:scale-95"
        >
          <span>Criar conta gratuita</span>
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
