"use client";

import { useRef, type ReactNode } from "react";

/**
 * Feeds the pointer position to CSS (--px / --py, each -1..1) so scene
 * layers can drift at different depths. Pure enhancement: without a mouse,
 * or with reduced motion, the scene simply stays still.
 */
export function HeroParallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);

  function onMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    });
  }

  return (
    <section ref={ref} onPointerMove={onMove} className={className}>
      {children}
    </section>
  );
}
