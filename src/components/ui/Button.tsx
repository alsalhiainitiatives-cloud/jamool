import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "navy" | "accent" | "soft" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-bold leading-none whitespace-nowrap select-none " +
  "transition-[transform,box-shadow,background-color] duration-150 ease-out " +
  "active:translate-y-[3px] disabled:opacity-50 disabled:active:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "bg-saffron text-navy shadow-[0_5px_0_#d9942a] hover:bg-[#ffcf5c] hover:-translate-y-0.5 hover:shadow-[0_7px_0_#d9942a] active:shadow-[0_2px_0_#d9942a]",
  navy: "bg-navy text-cream ring-2 ring-white/15 shadow-[0_5px_0_#0e1535] hover:bg-[#2a3772] hover:-translate-y-0.5 hover:shadow-[0_7px_0_#0e1535] active:shadow-[0_2px_0_#0e1535]",
  accent:
    "bg-accent-deep text-white shadow-[0_5px_0_rgb(31_42_92/0.28)] hover:-translate-y-0.5 hover:shadow-[0_7px_0_rgb(31_42_92/0.28)] active:shadow-[0_2px_0_rgb(31_42_92/0.28)] hover:brightness-110",
  soft: "bg-white text-navy shadow-[0_5px_0_rgb(31_42_92/0.14)] ring-2 ring-navy/10 hover:-translate-y-0.5 hover:shadow-[0_7px_0_rgb(31_42_92/0.14)] active:shadow-[0_2px_0_rgb(31_42_92/0.14)]",
  ghost: "text-ink hover:bg-ink/10 active:translate-y-0",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-6 text-base",
  lg: "min-h-14 px-8 text-lg",
};

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({ variant = "primary", size = "md", href, children, className, ...rest }: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
