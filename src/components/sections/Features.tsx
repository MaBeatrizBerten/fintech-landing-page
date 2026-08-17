import { FeatureCard } from "../ui/FeatureCard";
import { CreditCard, LineChart, Receipt } from "lucide-react";
import { motion } from "framer-motion";

const featuresData = [
  {
    title: "Cartões Corporativos",
    description:
      "Emita cartões físicos e virtuais ilimitados com limites de gastos personalizados em segundos.",
    icon: <CreditCard size={24} />,
  },
  {
    title: "Gestão de Despesas",
    description:
      "Aprovações automáticas e categorização inteligente alimentada por IA para fechar o mês rápido.",
    icon: <Receipt size={24} />,
  },
  {
    title: "Relatórios em Tempo Real",
    description:
      "Tenha visibilidade total do fluxo de caixa da empresa com painéis financeiros detalhados.",
    icon: <LineChart size={24} />,
  },
];

export function Features() {
  return (
    <section
      className="w-full py-24 px-6 bg-black border-t border-white/5"
      id="produtos"
    >
      {/* Cabeçalho da Seção Animado */}
      {/* Cabeçalho da Seção Animado */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Controle total sobre cada centavo.
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Tudo o que sua equipe precisa para gastar de forma inteligente e
          escalar com segurança, em um só lugar.
        </p>
      </motion.div>

      {/* Grid de Cards com Animação em Cascata */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuresData.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            /* O delay multiplicado pelo index é o que faz os cards entrarem um após o outro! */
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <FeatureCard
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
