"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { ApiKey } from "./types";
import { formatDate } from "./utils";
import CopyCell from "./CopyCell";
import RowActions from "./RowActions";
import EmptyState from "./EmptyState";
import CreateKeyModal from "./CreateKeyModal";
import RenameKeyModal from "./RenameKeyModal";
import UrlRow from "./UrlRow";

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
