export function Metrics() {
  const stats = [
    {
      value: "5%",
      label: "Economia média",
      description:
        "Nossos clientes reduzem seus gastos gerais em até 5% no primeiro ano de uso.",
    },
    {
      value: "10x",
      label: "Fechamento mais rápido",
      description:
        "Automatize a reconciliação e feche o caixa da empresa 10 vezes mais rápido.",
    },
    {
      value: "R$ 0",
      label: "Mensalidade e taxas",
      description:
        "Uma plataforma financeira de nível global sem as taxas abusivas dos bancos tradicionais.",
    },
  ];

  return (
    <section className="w-full py-24 px-6 bg-[#0a0a0a]" id="solucoes">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-16">
        {/* Lado Esquerdo: Chamada */}
        <div className="md:w-1/3">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Resultados que falam por si.
          </h2>
          <p className="text-gray-400 text-lg">
            Não acredite apenas na nossa palavra. Veja o impacto real que a Pmar
            gera nos bastidores de milhares de empresas.
          </p>
        </div>

        {/* Lado Direito: Os Números */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col border-l-2 border-[#D4FF46]/20 pl-6 hover:border-[#D4FF46] transition-colors"
            >
              <span className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-2">
                {stat.value}
              </span>
              <span className="text-[#D4FF46] font-semibold text-lg mb-2">
                {stat.label}
              </span>
              <p className="text-gray-500 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
