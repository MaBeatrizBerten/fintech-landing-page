import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    question: "Como a Pmar consegue ser 100% gratuita para as empresas?",
    answer:
      "A Pmar é monetizada através da taxa de intercâmbio paga pelos estabelecimentos e bandeiras quando seus colaboradores utilizam o cartão. Isso nos permite oferecer a melhor plataforma de software e cartões ilimitados sem cobrar mensalidades, anuidades ou taxas escondidas.",
  },
  {
    question: "Quanto tempo leva para emitir os cartões e começar a usar?",
    answer:
      "A emissão de cartões virtuais é instantânea após a aprovação da conta (que geralmente ocorre em poucos minutos). Os cartões físicos corporativos são enviados com frete expresso gratuito e chegam em média de 3 a 5 dias úteis no endereço da sua empresa.",
  },
  {
    question: "A Pmar se integra com os principais sistemas contábeis e ERPs?",
    answer:
      "Sim! Oferecemos integrações nativas em tempo real com Totvs, SAP, ContaAzul, Omie, QuickBooks, NetSuite e Xero. Cada recibo e transação é categorizado por IA e sincronizado diretamente com seu plano de contas.",
  },
  {
    question: "Como funciona o controle de limites e bloqueio de gastos?",
    answer:
      "Você tem controle granular total: pode definir limites por colaborador, departamento ou categoria de gasto (como viagens, alimentação ou SaaS). Despesas fora da política definida são bloqueadas instantaneamente pelo próprio cartão antes de serem concluídas.",
  },
  {
    question: "É possível utilizar os cartões para compras internacionais e viagens?",
    answer:
      "Sim, os cartões corporativos Pmar são aceitos em mais de 150 países e operam em múltiplas moedas com as menores taxas de conversão do mercado, sem taxas abusivas de spread bancário.",
  },
  {
    question: "Qual o nível de segurança e conformidade da plataforma?",
    answer:
      "A Pmar adota os mais rigorosos padrões da indústria financeira: criptografia de ponta a ponta AES-256 de nível militar, certificação SOC 2 Type II, total conformidade com a LGPD e padrões regulatórios do Banco Central.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 px-6 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 mb-6">
            <HelpCircle size={14} className="text-[#D4FF46]" />
            Tire suas Dúvidas
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Perguntas Frequentes.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Respostas diretas para as dúvidas mais comuns sobre planos, emissão
            de cartões, integrações e segurança.
          </p>
        </motion.div>

        {/* Lista de Acordeão Interativo */}
        <div className="space-y-4">
          {faqList.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#141414] border-white/20 shadow-xl"
                    : "bg-[#111111] border-white/5 hover:border-white/15"
                }`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base md:text-lg font-semibold transition-colors ${
                      isOpen ? "text-white" : "text-gray-200 hover:text-white"
                    }`}
                  >
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#D4FF46] text-black rotate-180"
                        : "bg-white/5 text-gray-400 group-hover:bg-white/10"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-gray-400 text-sm md:text-base leading-relaxed border-t border-white/5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
