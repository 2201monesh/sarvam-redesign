interface GlowButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function GlowButton({ label, onClick, disabled, className = "" }: GlowButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden bg-black text-white rounded-full px-5 text-sm py-3 font-season-mix cursor-pointer focus:outline-none outline-none border-none disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      style={{
        boxShadow:
          "inset 0 0 0 1.5px rgba(255,255,255,0.75), inset 0 0 12px rgba(255,255,255,0.55), inset 0 0 30px rgba(255,255,255,0.25)",
      }}
    >
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 55%)" }}
      />
      <span className="relative z-10">{label}</span>
    </button>
  );
}
