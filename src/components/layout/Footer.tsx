import { Link } from "react-router-dom";

export function Footer() {
  const footerLinks = [
    {
      title: "Produto",
      links: [
        { label: "Cartões Corporativos", href: "/produtos" },
        { label: "Gestão de Despesas", href: "/produtos" },
        { label: "Automação Contábil", href: "/solucoes" },
        { label: "Relatórios em Tempo Real", href: "/produtos" },
        { label: "Inteligência Artificial", href: "/produtos" },
      ],
    },
    {
      title: "Soluções",
      links: [
        { label: "Para Startups", href: "/solucoes" },
        { label: "Médias e Grandes Empresas", href: "/solucoes" },
        { label: "Controladoria & CFOs", href: "/solucoes" },
        { label: "Clientes & Casos Reais", href: "/#clientes" },
        { label: "Começar Gratuitamente", href: "/comecar" },
      ],
    },
    {
      title: "Acesso & Suporte",
      links: [
        { label: "Entrar na Plataforma", href: "/entrar" },
        { label: "Criar Conta Corporativa", href: "/comecar" },
        { label: "Perguntas Frequentes", href: "/#faq" },
        { label: "Segurança & Conformidade", href: "/solucoes" },
        { label: "Privacidade e Termos", href: "/solucoes" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-black py-16 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Grid Principal: 1 coluna no mobile, 4 colunas em telas médias/grandes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Primeira Coluna: Logo e Descrição */}
          <div className="flex flex-col">
            <Link
              to="/"
              className="text-white font-bold text-3xl tracking-tighter cursor-pointer mb-4"
            >
              pmar<span className="text-[#D4FF46]">.</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              A plataforma definitiva de automação e gestão financeira para
              equipes e empresas modernas que buscam acelerar seu crescimento.
            </p>
          </div>

          {/* Próximas 3 Colunas: Listas de Links Úteis */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-white font-semibold text-base mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Linha Divisória e Direitos Autorais */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Pmar. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
