import { SectionIcon } from "@/components/brand/SectionIcon";
import type { Badge } from "@/data/badges";
import { cn } from "@/lib/cn";

/** `preview` shows the medal in colour without claiming it was earned. */
export function BadgeMedal({ badge, earned, onDark, preview }: { badge: Badge; earned: boolean; onDark?: boolean; preview?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center" data-section={badge.section}>
      <span
        className={cn(
          "relative grid size-24 place-items-center rounded-full transition-transform duration-500",
          earned ? "bg-accent-soft ring-4 ring-saffron" : onDark ? "bg-white/8 ring-2 ring-dashed ring-white/25" : "bg-white ring-2 ring-navy/10",
        )}
      >
        <SectionIcon id={badge.section} size={60} className={earned ? undefined : onDark ? "opacity-60 grayscale" : "opacity-40 grayscale"} />
      </span>
      <span className={cn("font-display text-sm font-bold leading-tight", onDark ? "text-cream" : "text-navy")}>{badge.name}</span>
      <span className={cn("text-xs leading-snug", onDark ? "text-cream/70" : "text-ink-soft")}>{earned && !preview ? "حصلت عليها!" : badge.hint}</span>
    </div>
  );
}
