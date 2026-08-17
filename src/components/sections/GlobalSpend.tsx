import { Globe, type GlobeMarker } from "../ui/Globe";
import { motion } from "framer-motion";

const markers: GlobeMarker[] = [
  {
    location: [-23.5505, -46.6333],
    size: 0.1,
    color: [0.83, 1, 0.27],
    label: {
      flag: "🇧🇷",
      name: "São Paulo (HQ)",
      value: "R$ 150.000",
      highlight: true,
    },
  },
  {
    location: [51.5074, -0.1278],
    size: 0.05,
    color: [0.83, 1, 0.27],
    label: {
      flag: "🇬🇧",
      name: "London",
      value: "£ 40.000",
    },
  },
  {
    location: [35.6762, 139.6503],
    size: 0.05,
    color: [0.83, 1, 0.27],
    label: {
      flag: "🇯🇵",
      name: "Tokyo",
      value: "¥ 6.200.000",
    },
  },
];

export function GlobalSpend() {
  return (
    <section
      className="w-full py-24 px-6 bg-black border-t border-white/5 overflow-hidden"
      id="global"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Lado Esquerdo: Globo WebGL 3D */}
        <div className="md:w-1/2 w-full flex justify-center order-2 md:order-1 relative">
          <Globe markers={markers} />
        </div>

        {/* Lado Direito: Textos */}
        <div className="md:w-1/2 order-1 md:order-2">
          <motion.h2
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Uma plataforma para todos os seus gastos globais.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mb-8 leading-relaxed"
          >
            Emita cartões em múltiplas moedas e consolide suas operações
            internacionais sem taxas abusivas de conversão. Conecte sua operação
            direto do Brasil para o mundo em tempo real.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
