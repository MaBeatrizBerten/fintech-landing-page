import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="w-full py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#111111] border border-white/10 px-6 py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Pronto para modernizar as finanças da sua empresa?
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
              Junte-se a milhares de equipes que economizam tempo e dinheiro todos os dias com a Pmar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                to="/comecar"
                className="w-full sm:w-auto bg-[#D4FF46] text-black font-bold px-8 py-4 rounded-full text-base hover:bg-[#bce63b] transition-transform hover:scale-105 active:scale-95 text-center"
              >
                Começar agora
              </Link>
              <Link
                to="/solucoes"
                className="w-full sm:w-auto bg-transparent text-white font-semibold px-8 py-4 rounded-full text-base border border-white/20 hover:bg-white/5 transition-colors text-center"
              >
                Agendar demonstração
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
