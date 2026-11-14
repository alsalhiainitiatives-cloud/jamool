import type { SectionId } from "@/lib/brand-assets";
import { animatedIcons } from "@/data/animated-icons";
import { cn } from "@/lib/cn";
import { LordIcon } from "./LordIcon";

const INK = "#1F2A5C";
const CREAM = "#FFF9EC";

/** Tile colours, taken from the platform characters' palette. */
const palette: Record<SectionId, { main: string; deep: string; line: string }> = {
  stories: { main: "#8D6BE8", deep: "#6A47C9", line: CREAM },
  learn: { main: "#F5A63A", deep: "#C7771B", line: CREAM },
  surahs: { main: "#1E9E96", deep: "#12756F", line: CREAM },
  games: { main: "#2F7BEA", deep: "#1F58B8", line: CREAM },
  art: { main: "#F0563A", deep: "#C23A22", line: CREAM },
  ai: { main: "#18A7C9", deep: "#0F7C98", line: CREAM },
  values: { main: "#5DAA3A", deep: "#3F8228", line: CREAM },
  competitions: { main: "#FFC43D", deep: "#D99A0B", line: INK },
};

/** A section's icon: the animated Lordicon icon, recoloured, on the section's tile. */
export function SectionIcon({ id, size = 96, className }: { id: SectionId; size?: number; className?: string; priority?: boolean }) {
  const c = palette[id];
  return (
    <span className={cn("relative inline-block shrink-0", className)} style={{ width: size, height: size }}>
      <svg viewBox="0 0 96 96" width="100%" height="100%" aria-hidden focusable="false" className="block overflow-visible">
        <rect x="6" y="12" width="84" height="80" rx="27" fill={c.deep} />
        <rect x="6" y="6" width="84" height="80" rx="27" fill={c.main} />
        <path d="M15 31C17 19 26 13 38 12" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
      <span className="absolute inset-x-[11%] top-[8%] aspect-square">
        <LordIcon src={animatedIcons[id]} color={c.line} size="100%" />
      </span>
    </span>
  );
}
