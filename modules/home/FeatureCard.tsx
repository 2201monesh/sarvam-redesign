import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  icon: LucideIcon;
  gradientColor: string;
}

const FeatureCard = ({ title, icon: Icon, gradientColor }: FeatureCardProps) => {
  return (
    <div className="relative flex-1 h-36 border border-neutral-200 rounded-xl flex flex-col px-6 justify-end py-4 overflow-hidden bg-white">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom left, ${gradientColor} 0%, transparent 55%)`,
        }}
      />
      <Icon size={20} className="text-neutral-500 mb-2 relative z-10" />
      <p className="text-base font-medium text-neutral-800 relative z-10">{title}</p>
    </div>
  );
};

export default FeatureCard;
