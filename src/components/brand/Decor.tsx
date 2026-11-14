import { useId } from "react";
import { cn } from "@/lib/cn";

/** Woven band inspired by Sadu weaving: triangles and diamonds in brand colours. */
export function SaduBand({ className, height = 28 }: { className?: string; height?: number }) {
  const id = useId();
  return (
    <svg aria-hidden className={cn("block w-full", className)} height={height} preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="56" height="28" patternUnits="userSpaceOnUse">
          <rect width="56" height="28" fill="#F0563A" />
          <path d="M0 28 14 4l14 24z" fill="#1F2A5C" />
          <path d="M28 28 42 4l14 24z" fill="#FFF4DE" />
          <path d="M14 18l4 6h-8z" fill="#FFC43D" />
          <path d="M42 18l4 6h-8z" fill="#1E9E96" />
          <rect width="56" height="3" fill="#1F2A5C" />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}

/** Soft dune silhouette used as a section edge. Colour comes from `fill`. */
export function Dune({ className, fill = "#F6E2B8", variant = 1 }: { className?: string; fill?: string; variant?: 1 | 2 | 3 }) {
  const d = {
    1: "M0 120V70C180 20 330 10 520 48s330 62 520 30 300-58 400-40v82z",
    2: "M0 120V40c160 40 300 62 470 46S800 14 1000 22s330 56 440 44v54z",
    3: "M0 120V84C240 30 420 34 700 66s520 14 740-40v94z",
  }[variant];
  return (
    <svg aria-hidden viewBox="0 0 1440 120" preserveAspectRatio="none" className={cn("block w-full", className)}>
      <path d={d} fill={fill} />
    </svg>
  );
}

/** Four-point star, echoing the night sky in the Jamool logo. */
export function Sparkle({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 1c.7 6.200 2.800 8.300 11 11-8.200 2.700-10.300 4.800-11 11-.7-6.200-2.800-8.300-11-11 8.200-2.700 10.300-4.800 11-11z" />
    </svg>
  );
}

export function SpeechBubble({ children, className, tail = "bottom" }: { children: React.ReactNode; className?: string; tail?: "bottom" | "side" }) {
  return (
    <span
      className={cn(
        "relative inline-block rounded-[1.6rem] bg-white px-5 py-3 font-display text-base font-bold leading-snug text-ink shadow-soft ring-2 ring-navy/8",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute size-4 rotate-45 bg-white",
          tail === "bottom" ? "-bottom-2 start-8 border-b-2 border-e-2 border-navy/8" : "-start-2 top-1/2 -translate-y-1/2 border-b-2 border-s-2 border-navy/8",
        )}
      />
    </span>
  );
}
