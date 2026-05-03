interface FeatureCardProps {
  title: string;
  iconElement: React.ReactNode;
  gradientColor: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const FeatureCard = ({ title, iconElement, gradientColor, onMouseEnter, onMouseLeave }: FeatureCardProps) => {
  return (
    <div
      className="relative flex-1 h-36 border border-neutral-200 rounded-xl flex flex-col px-6 justify-end py-4 overflow-hidden bg-white cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(to bottom left, ${gradientColor} 0%, transparent 55%)` }}
      />
      <div className="text-neutral-500 mb-2 relative z-10">{iconElement}</div>
      <p className="text-base font-medium text-neutral-800 relative z-10">{title}</p>
    </div>
  );
};

export default FeatureCard;
