import { Hero } from "../components/sections/Hero";
import { Features } from "../components/sections/Features";
import { GlobalSpend } from "../components/sections/GlobalSpend";
import { Metrics } from "../components/sections/Metrics";
import { Testimonials } from "../components/sections/Testimonials";
import { FAQ } from "../components/sections/FAQ";
import { LeadForm } from "../components/sections/LeadForm";
// A importação do CTA foi removida daqui!

export function Home() {
  return (
    <>
      <Hero />
      <Features />
      <GlobalSpend />
      <Metrics />
      <Testimonials />
      <FAQ />

      {/* O formulário virou o CTA principal da sua página */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para otimizar sua empresa?
          </h2>
          <p className="text-gray-400 mb-10">
            Preencha os dados abaixo e nossa equipe especializada entrará em
            contato.
          </p>

          <LeadForm />
        </div>
      </section>
    </>
  );
}
