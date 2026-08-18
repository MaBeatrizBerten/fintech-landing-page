import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center text-center px-6">
      {/* Badge de novidade */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 cursor-pointer hover:bg-white/10 transition-colors"
      >
        <span className="flex h-2 w-2 rounded-full bg-[#D4FF46]"></span>
        Conheça a nova inteligência artificial da Pmar
      </motion.div>

      {/* Título Principal */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white max-w-4xl mb-6"
      >
        A plataforma financeira <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
          definitiva.
        </span>
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
      >
        Economize tempo e dinheiro com o único software de gestão de despesas e
        cartões corporativos que fecha o seu caixa no piloto automático.
      </motion.p>

      {/* Botões de Ação */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
      >
        <Link
          to="/comecar"
          className="w-full sm:w-auto bg-[#D4FF46] text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-[#bce63b] transition-transform hover:scale-105 active:scale-95 text-center"
        >
          Começar agora
        </Link>
        <Link
          to="/solucoes"
          className="w-full sm:w-auto bg-transparent text-white px-8 py-4 rounded-full text-base font-semibold border border-white/20 hover:bg-white/5 transition-colors text-center"
        >
          Falar com vendas
        </Link>
      </motion.div>
    </section>
  );
}
