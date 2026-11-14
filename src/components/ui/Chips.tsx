"use client";

import { cn } from "@/lib/cn";

export type ChipOption<T extends string> = { value: T; label: string };

/** Single-choice filter chips (radio semantics, arrow-key friendly). */
export function Chips<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: ChipOption<T>[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "min-h-11 rounded-full px-5 font-display text-sm font-bold transition-colors duration-150",
              active
                ? "bg-navy text-cream shadow-[0_4px_0_#0e1535]"
                : "bg-white text-navy ring-2 ring-navy/10 hover:bg-accent-soft",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Large tabs used to switch between two or three modes of a page. */
export function Tabs<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: ChipOption<T>[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="tablist" aria-label={label} className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-white p-1.5 ring-2 ring-navy/10">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "min-h-12 shrink-0 rounded-full px-6 font-display text-base font-bold transition-colors duration-150",
              active ? "bg-accent-deep text-white" : "text-navy hover:bg-accent-soft",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
