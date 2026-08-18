import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Building, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface LeadFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function LeadForm({ onSuccess, className = "" }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Oculta mensagem de sucesso ou erro quando o usuário volta a digitar
    if (isSuccess) {
      setIsSuccess(false);
    }
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch("http://localhost:3333/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || undefined,
          message: formData.message.trim(),
        }),
      });

      if (response.status === 201) {
        // Sucesso: limpa os campos e exibe mensagem
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
        });
        setIsSuccess(true);
        onSuccess?.();
      } else if (response.status === 429) {
        // Rate limit atingido
        setErrorMessage(
          "Muitas tentativas. Por favor, tente novamente em alguns minutos."
        );
      } else if (response.status === 400) {
        // Erro de validação
        try {
          const data = await response.json();
          setErrorMessage(
            data?.error || "Dados inválidos. Por favor, verifique os campos preenchidos."
          );
        } catch {
          setErrorMessage("Dados inválidos. Por favor, verifique os campos preenchidos.");
        }
      } else {
        // Outros status de erro
        setErrorMessage("Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.");
      }
    } catch (err) {
      console.error("Erro ao enviar lead:", err);
      setErrorMessage("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mensagem de Sucesso */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-[#D4FF46]/10 border border-[#D4FF46]/30 flex items-start gap-3 text-left"
            >
              <CheckCircle2 className="text-[#D4FF46] shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-white font-semibold text-sm">
                  Mensagem enviada com sucesso!
                </h4>
                <p className="text-gray-300 text-xs mt-0.5 leading-relaxed">
                  Obrigado pelo contato. Nossa equipe de especialistas entrará em contato em breve.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mensagem de Erro */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-left"
            >
              <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-red-300 font-semibold text-sm">Atenção</h4>
                <p className="text-red-200/80 text-xs mt-0.5 leading-relaxed">
                  {errorMessage}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Campo: Nome */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-semibold text-gray-300 mb-1.5 text-left"
          >
            Nome completo <span className="text-[#D4FF46]">*</span>
          </label>
          <div className="relative">
            <User
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              id="name"
              name="name"
              type="text"
              required
              disabled={isLoading}
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: Beatriz Silveira"
              className="w-full bg-[#181818] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF46] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Campo: Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-gray-300 mb-1.5 text-left"
          >
            E-mail corporativo <span className="text-[#D4FF46]">*</span>
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={isLoading}
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu.nome@empresa.com"
              className="w-full bg-[#181818] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF46] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Campo: Empresa (opcional) */}
        <div>
          <label
            htmlFor="company"
            className="block text-xs font-semibold text-gray-300 mb-1.5 text-left"
          >
            Nome da empresa <span className="text-gray-500 text-[10px]">(opcional)</span>
          </label>
          <div className="relative">
            <Building
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              id="company"
              name="company"
              type="text"
              disabled={isLoading}
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Ex: NuvemTech Soluções"
              className="w-full bg-[#181818] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF46] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Campo: Mensagem */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold text-gray-300 mb-1.5 text-left"
          >
            Mensagem <span className="text-[#D4FF46]">*</span>
          </label>
          <div className="relative">
            <MessageSquare
              size={18}
              className="absolute left-3.5 top-3.5 text-gray-500"
            />
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              disabled={isLoading}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Conte-nos sobre o que sua empresa precisa..."
              className="w-full bg-[#181818] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF46] transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#D4FF46] text-black font-bold py-3.5 px-6 rounded-xl text-sm hover:bg-[#bce63b] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <span>Enviar mensagem</span>
              <Send size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
