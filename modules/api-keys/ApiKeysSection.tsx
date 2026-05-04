"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Check, Plus, TriangleAlert, KeyRound, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Modal from "@/components/Modal";
import GlowButton from "@/components/GlowButton";

interface ApiKey {
  id: string;
  name: string;
  value: string;
  createdAt: Date;
  status: "active" | "inactive";
}

function generateApiKey() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const rand = Array.from({ length: 40 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `sarvam_api_${rand}`;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// --- Copy cell ---
function CopyCell({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const display = value.slice(0, 22) + "••••••••••••";

  function handleCopy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs text-zinc-500 tracking-wide">{display}</span>
      <button
        onClick={handleCopy}
        className="text-neutral-300 hover:text-zinc-500 transition-colors cursor-pointer"
        title="Copy key"
      >
        {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
      </button>
    </div>
  );
}

// --- Row actions dropdown ---
function RowActions({ onRename, onDelete }: { onRename: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleOpen() {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 4, left: rect.left });
    }
    setOpen((o) => !o);
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex justify-start">
      <button
        ref={btnRef}
        onClick={handleOpen}
        className="flex items-center justify-center w-7 h-7 rounded-md text-neutral-400 hover:text-zinc-600 hover:bg-neutral-100 transition-colors cursor-pointer"
      >
        <MoreHorizontal size={15} />
      </button>

      {open && (
        <div
          ref={menuRef}
          style={{ position: "fixed", top: pos.top, left: pos.left }}
          className="z-50 w-36 rounded-xl border border-neutral-200 bg-white shadow-lg shadow-black/5 py-1 overflow-hidden"
        >
          <button
            onClick={() => { onRename(); setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-zinc-700 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <Pencil size={13} className="text-neutral-400" />
            Rename
          </button>
          <button
            onClick={() => { onDelete(); setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

// --- Empty state ---
function EmptyState({ onNew }: { onNew: () => void }) {
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

// --- Create modal ---
function CreateKeyModal({ open, onClose, onCreate }: {
  open: boolean;
  onClose: () => void;
  onCreate: (key: ApiKey) => void;
}) {
  const [step, setStep] = useState<"form" | "created">("form");
  const [name, setName] = useState("");
  const [newKey, setNewKey] = useState("");
  const [copied, setCopied] = useState(false);

  function handleCreate() {
    const value = generateApiKey();
    setNewKey(value);
    setStep("created");
    setCopied(true);
    navigator.clipboard.writeText(value);
    onCreate({ id: `key_${Date.now()}`, name: name.trim(), value, createdAt: new Date(), status: "active" });
  }

  function handleClose() {
    onClose();
    setTimeout(() => { setStep("form"); setName(""); setNewKey(""); setCopied(false); }, 300);
  }

  function handleCopy() {
    navigator.clipboard.writeText(newKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={step === "form" ? "Create API key" : "API key created"}
      description={step === "form" ? "Give your key a name to identify where it's used." : undefined}
    >
      {step === "form" ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-700">Key name</label>
            <input
              type="text"
              placeholder="e.g. Production Backend"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && name.trim()) handleCreate(); }}
              autoFocus
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-zinc-800 outline-none focus:border-zinc-400 transition-colors bg-white placeholder:text-neutral-400"
            />
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={handleClose}
              className="flex-1 rounded-full border border-neutral-200 px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <GlowButton label="Create key" onClick={handleCreate} disabled={!name.trim()} className="flex-1" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3.5">
            <TriangleAlert size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Copy this key now for security reasons and keep it somewhere safe.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-700">Your new API key</label>
            <div className="flex items-stretch gap-2">
              <div className="flex-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 min-w-0">
                <span className="font-mono text-xs text-zinc-600 break-all">{newKey}</span>
              </div>
              <button
                onClick={handleCopy}
                className="shrink-0 flex items-center justify-center w-10 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-400 hover:text-zinc-600 transition-colors cursor-pointer"
              >
                {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
              </button>
            </div>
          </div>
          <GlowButton label="Done" onClick={handleClose} className="w-full" />
        </div>
      )}
    </Modal>
  );
}

// --- Rename modal ---
function RenameKeyModal({ open, onClose, current, onRename }: {
  open: boolean;
  onClose: () => void;
  current: string;
  onRename: (name: string) => void;
}) {
  const [name, setName] = useState(current);

  useEffect(() => { setName(current); }, [current]);

  function handleSave() {
    if (name.trim()) { onRename(name.trim()); onClose(); }
  }

  return (
    <Modal open={open} onClose={onClose} title="Rename API key" description="Update the name of your API key.">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-700">Key name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
            autoFocus
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-zinc-800 outline-none focus:border-zinc-400 transition-colors bg-white placeholder:text-neutral-400"
          />
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-neutral-200 px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <GlowButton label="Save" onClick={handleSave} disabled={!name.trim()} className="flex-1" />
        </div>
      </div>
    </Modal>
  );
}

// --- URL row ---
function UrlRow({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-5">
      <p className="text-xs text-neutral-400 leading-relaxed">
        Use this URL as the base for all REST API requests to your project.
      </p>
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 min-w-0">
          <span className="font-mono text-xs text-zinc-600 truncate">{url}</span>
        </div>
        <button
          onClick={handleCopy}
          className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-400 hover:text-zinc-600 transition-colors cursor-pointer"
        >
          {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
        </button>
      </div>
    </div>
  );
}

// --- Main ---
export default function ApiKeysSection() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<ApiKey | null>(null);

  function handleCreate(key: ApiKey) {
    setKeys((prev) => [key, ...prev]);
  }

  function handleDelete(id: string) {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  }

  function handleRename(id: string, name: string) {
    setKeys((prev) => prev.map((k) => k.id === id ? { ...k, name } : k));
  }

  return (
    <div className="px-6 py-8 flex flex-col gap-8 w-full max-w-[1400px] mx-auto">

      {/* Project URL */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-zinc-800">Project URL</p>
        <div className="border border-neutral-200 rounded-xl overflow-hidden">
          <UrlRow url="https://api.sarvam.ai/v1/projects/proj_a1b2c3d4e5f6" />
        </div>
      </div>

      {/* API Keys table */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-800">Project API keys</p>
            <p className="text-sm text-neutral-400 mt-0.5">
              Use these keys to authenticate requests from your application.
            </p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 py-2 text-xs font-medium text-zinc-700 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <Plus size={13} />
            New key
          </button>
        </div>

        <div className="border border-neutral-200 rounded-xl overflow-hidden">
          {keys.length === 0 ? (
            <EmptyState onNew={() => setCreateOpen(true)} />
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Key</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 whitespace-nowrap">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {keys.map((k) => (
                  <tr key={k.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60 transition-colors">
                    <td className="px-4 py-3.5 text-xs font-medium text-zinc-800 whitespace-nowrap">{k.name}</td>
                    <td className="px-4 py-3.5"><CopyCell value={k.value} /></td>
                    <td className="px-4 py-3.5 text-xs text-neutral-400 whitespace-nowrap">{formatDate(k.createdAt)}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                        k.status === "active"
                          ? "bg-green-50 text-green-600"
                          : "bg-neutral-100 text-neutral-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${k.status === "active" ? "bg-green-500" : "bg-neutral-300"}`} />
                        {k.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <RowActions
                        onRename={() => setRenameTarget(k)}
                        onDelete={() => handleDelete(k.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <CreateKeyModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />

      <RenameKeyModal
        open={!!renameTarget}
        onClose={() => setRenameTarget(null)}
        current={renameTarget?.name ?? ""}
        onRename={(name) => renameTarget && handleRename(renameTarget.id, name)}
      />
    </div>
  );
}
