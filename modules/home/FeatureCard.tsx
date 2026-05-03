import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  icon: LucideIcon;
}

const FeatureCard = ({ title, icon: Icon }: FeatureCardProps) => {
  return (
    <div className="flex-1 h-36 border border-neutral-300 rounded-xl flex flex-col px-6 justify-end py-4">
      <Icon size={18} className="text-neutral-500 mb-2" />
      <p className="text-sm font-medium text-neutral-800">{title}</p>
    </div>
  );
};

export default FeatureCard;
