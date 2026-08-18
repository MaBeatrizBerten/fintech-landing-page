import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  avatarColor: string;
  initials: string;
}

const testimonialsData: Testimonial[] = [
  {
    quote:
      "A Pmar transformou nosso fechamento de mês. O que antes levava 12 dias com pilhas de notas fiscais agora é concluído em menos de 48 horas no piloto automático.",
    author: "Guilherme Siqueira",
    role: "CFO",
    company: "NuvemHub",
    metric: "85% menos tempo no fechamento",
    avatarColor: "from-emerald-500 to-teal-700",
    initials: "GS",
  },
  {
    quote:
      "O controle de limites por cartão e a categorização instantânea por IA acabaram com qualquer surpresa no orçamento. Economizamos mais de R$ 380 mil no primeiro ano.",
    author: "Mariana Alencar",
    role: "Diretora Financeira",
    company: "Veloce Tech",
    metric: "R$ 380k economizados/ano",
    avatarColor: "from-[#D4FF46] to-lime-600 text-black",
    initials: "MA",
  },
  {
    quote:
      "Nossa operação é global e a emissão de cartões multicurrency com taxa zero de anuidade nos deu uma agilidade que nenhum banco tradicional jamais conseguiu entregar.",
    author: "Rafael Fontes",
    role: "VP de Operações",
    company: "Nexa Global",
    metric: "12 países integrados sem atrito",
    avatarColor: "from-cyan-500 to-blue-700",
    initials: "RF",
  },
];

export function Testimonials() {
  return (
    <section
      className="w-full py-24 px-6 bg-black border-t border-white/5"
      id="clientes"
    >
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 mb-6">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#D4FF46]"></span>
            Histórias de Sucesso
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Confiado por quem decide as finanças das empresas.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Veja como equipes financeiras de alta performance usam a Pmar para
            eliminar processos manuais e acelerar o crescimento.
          </p>
        </motion.div>

        {/* Grid de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative bg-[#111111] border border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-white/25 transition-all duration-300 group"
            >
              <div>
                {/* Estrelas e Ícone de Citação */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-[#D4FF46] text-[#D4FF46]"
                      />
                    ))}
                  </div>
                  <Quote
                    size={24}
                    className="text-gray-600 group-hover:text-[#D4FF46]/40 transition-colors"
                  />
                </div>

                {/* Texto do Depoimento */}
                <p className="text-gray-300 text-base leading-relaxed mb-6 font-normal">
                  "{t.quote}"
                </p>
              </div>

              <div>
                {/* Métrica em Destaque */}
                <div className="inline-block px-3 py-1 rounded-full bg-[#D4FF46]/10 border border-[#D4FF46]/20 text-[#D4FF46] text-xs font-semibold mb-6">
                  {t.metric}
                </div>

                {/* Autor e Empresa */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center font-bold text-sm shadow-md shrink-0`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">
                      {t.author}
                    </h4>
                    <p className="text-gray-400 text-xs">
                      {t.role} • <span className="text-gray-300">{t.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
