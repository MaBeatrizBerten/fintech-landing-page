import { useAuth } from "../hooks/useAuth";

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 bg-black flex justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-2">
          Bem-vindo(a), <span className="text-[#D4FF46]">{user?.name}</span>!
        </h1>
        <p className="text-gray-400 mb-8">
          Esta é a sua área exclusiva da Pmar.
        </p>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">
            Seus Dados de Perfil
          </h2>
          <div className="space-y-5 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-500 font-semibold mb-1">
                Nome completo
              </span>
              <span className="text-white">{user?.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 font-semibold mb-1">
                E-mail de acesso
              </span>
              <span className="text-white">{user?.email}</span>
            </div>
            {user?.company && (
              <div className="flex flex-col">
                <span className="text-gray-500 font-semibold mb-1">
                  Empresa cadastrada
                </span>
                <span className="text-white">{user?.company}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
