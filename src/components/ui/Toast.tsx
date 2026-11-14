"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { Glyph } from "./Glyph";

type Toast = { id: number; message: string; tone: "success" | "info" };
const Ctx = createContext<(message: string, tone?: Toast["tone"]) => void>(() => {});

export function useToast() {
  return useContext(Ctx);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const push = useCallback((message: string, tone: Toast["tone"] = "success") => {
    const id = nextId.current++;
    setToasts((t) => [...t.slice(-2), { id, message, tone }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
  }, []);

  return (
    <Ctx.Provider value={push}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex max-w-md animate-pop items-center gap-3 rounded-full bg-navy py-3 ps-4 pe-6 font-display font-bold text-cream shadow-lift"
          >
            <span className={`grid size-9 shrink-0 place-items-center rounded-full ${t.tone === "success" ? "bg-saffron text-ink" : "bg-white/15 text-cream"}`}>
              <Glyph name={t.tone === "success" ? "star" : "sparkle"} size={20} />
            </span>
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
