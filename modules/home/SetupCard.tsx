interface SetupCardProps {
  title: string;
  description: string;
}

export default function SetupCard({ title, description }: SetupCardProps) {
  return (
    <div className="w-80 shrink-0">
      <div className="w-full h-36 border border-neutral-200 rounded-xl flex items-center justify-center px-4 text-center">
        <p className="capitalize font-semibold font-season-mix">{title}</p>
      </div>
      <p className="text-sm mt-4 text-neutral-600">{description}</p>
    </div>
  );
}
