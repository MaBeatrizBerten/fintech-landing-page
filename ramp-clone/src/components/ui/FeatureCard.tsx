import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-[#111111] border border-white/10 p-8 rounded-2xl hover:border-white/30 transition-colors flex flex-col items-start text-left cursor-default">
      <div className="bg-[#1A1A1A] p-3 rounded-lg mb-6 text-[#D4FF46]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
