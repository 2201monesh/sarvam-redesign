interface FeatureCardProps {
  title: string;
  modelName: string;
  description: string;
  iconElement: React.ReactNode;
  imageUrl: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const FeatureCard = ({ title, modelName, description, iconElement, imageUrl, onMouseEnter, onMouseLeave }: FeatureCardProps) => {
  return (
    <div
      className="flex flex-col cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Visual card */}
      <div
        className="w-full h-32 rounded-xl flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative flex items-center gap-4">
          <div className="text-white">{iconElement}</div>
          <div className="w-px h-7 bg-white shrink-0" />
          <p className="text-base font-medium text-white tracking-wide">{title}</p>
        </div>
      </div>

      {/* Text below */}
      <div className="mt-3 px-0.5">
        <p className="text font-medium text-zinc-900">{modelName}</p>
        <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
