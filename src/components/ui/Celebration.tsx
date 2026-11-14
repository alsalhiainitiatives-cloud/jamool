import type { CSSProperties } from "react";

const colors = ["#FFC43D", "#F0563A", "#1E9E96", "#2F7BEA", "#8D6BE8", "#F5A63A"];

/** A single, short burst of confetti. Purely decorative; hidden from AT. */
export function Celebration() {
  return (
    <span aria-hidden className="pointer-events-none absolute start-1/2 top-1/2 z-10 motion-reduce:hidden">
      {Array.from({ length: 18 }, (_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const dist = 90 + (i % 3) * 38;
        const style = {
          "--dx": `${Math.cos(angle) * dist}px`,
          "--dy": `${Math.sin(angle) * dist - 30}px`,
          "--rot": `${(i % 2 ? 1 : -1) * (120 + i * 14)}deg`,
          background: colors[i % colors.length],
          animationDelay: `${(i % 4) * 40}ms`,
        } as CSSProperties;
        return <span key={i} style={style} className={`absolute block animate-confetti ${i % 3 === 0 ? "size-3 rounded-full" : "h-2 w-4 rounded-sm"}`} />;
      })}
    </span>
  );
}
