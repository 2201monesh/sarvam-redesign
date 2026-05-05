"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { subscribeToast } from "@/lib/toast";

type ToastItem = { id: string; message: string; description?: string };

export default function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    return subscribeToast((t) => {
      setToasts((prev) => [...prev, t]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id));
      }, 4000);
    });
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3.5 shadow-lg shadow-black/5 min-w-[280px] max-w-xs"
          >
            <Check size={13} className="text-neutral-500 shrink-0 mt-px" />
            <p className="text-sm text-neutral-500">{t.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
