"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Glyph } from "./Glyph";

/** Modal built on the native <dialog>: focus trap, Esc and backdrop for free. */
export function Dialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto w-[min(92vw,34rem)] max-h-[90dvh] overflow-visible rounded-xl bg-transparent p-0 text-ink backdrop:bg-navy-deep/55 open:animate-pop"
    >
      <div className="relative max-h-[90dvh] overflow-y-auto rounded-xl bg-paper p-6 shadow-lift sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute end-3 top-3 grid size-11 place-items-center rounded-full bg-white text-ink ring-2 ring-navy/10 hover:bg-accent-soft"
        >
          <Glyph name="close" />
        </button>
        {open ? children : null}
      </div>
    </dialog>
  );
}
