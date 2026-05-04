import { Plus, KeyRound } from "lucide-react";

export default function EmptyState({ onNew }: { onNew: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-10 h-10 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center mb-4">
        <KeyRound size={17} className="text-neutral-400" />
      </div>
      <p className="text-sm font-medium text-zinc-700 mb-1">No API keys</p>
      <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
        You haven&apos;t created any API keys yet. Create one to start authenticating requests.
      </p>
      <button
        onClick={onNew}
        className="mt-5 flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2 text-xs font-medium text-zinc-700 hover:bg-neutral-50 transition-colors cursor-pointer"
      >
        <Plus size={13} />
        Create your first key
      </button>
    </div>
  );
}
