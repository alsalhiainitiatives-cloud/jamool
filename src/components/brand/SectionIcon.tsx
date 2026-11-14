import type { ReactNode } from "react";
import type { SectionId } from "@/lib/brand-assets";
import { cn } from "@/lib/cn";

/**
 * Vector icon set for the eight sections: one geometric language
 * (rounded tile, navy outline, cream body, two accent colours), each tile
 * coloured from the platform characters' palette.
 */
const INK = "#1F2A5C";
const CREAM = "#FFF9EC";

const palette: Record<SectionId, { main: string; deep: string }> = {
  stories: { main: "#8D6BE8", deep: "#6A47C9" },
  learn: { main: "#F5A63A", deep: "#C7771B" },
  surahs: { main: "#1E9E96", deep: "#12756F" },
  games: { main: "#2F7BEA", deep: "#1F58B8" },
  art: { main: "#F0563A", deep: "#C23A22" },
  ai: { main: "#18A7C9", deep: "#0F7C98" },
  values: { main: "#5DAA3A", deep: "#3F8228" },
  competitions: { main: "#FFC43D", deep: "#D99A0B" },
};

function star(cx: number, cy: number, R: number, r = R * 0.45) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (-90 + i * 36) * (Math.PI / 180);
    const rad = i % 2 ? r : R;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)} ${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

const line = { stroke: INK, strokeWidth: 3.2, strokeLinejoin: "round", strokeLinecap: "round" } as const;

function Book({ y = 0, deep, ribbon }: { y?: number; deep: string; ribbon?: boolean }) {
  return (
    <g transform={`translate(0 ${y})`}>
      <path d="M14 28V66C26 62 38 63 48 71C58 63 70 62 82 66V28Z" fill={INK} />
      <path d="M47 30C40 24 29 23 20 26V62C29 59 40 60 47 66Z" fill={CREAM} {...line} />
      <path d="M49 30C56 24 67 23 76 26V62C67 59 56 60 49 66Z" fill={CREAM} {...line} />
      {ribbon ? <path d="M42 66V80L46.5 76L51 80V67Z" fill="#F0563A" {...line} /> : null}
      <g stroke={deep} strokeWidth="3" strokeLinecap="round">
        <path d="M26 36H40M26 43H40M26 50H38" />
      </g>
    </g>
  );
}

const glyphs: Record<SectionId, (c: { main: string; deep: string }) => ReactNode> = {
  stories: ({ deep }) => (
    <>
      <Book deep={deep} ribbon />
      <path d={star(63, 44, 10.5)} fill="#FFC43D" {...line} />
    </>
  ),
  learn: () => (
    <g style={{ fontFamily: "var(--font-display)" }} fontWeight="800" fontSize="25" textAnchor="middle">
      <g transform="rotate(-7 30 62)">
        <rect x="14" y="46" width="32" height="32" rx="9" fill={CREAM} {...line} />
        <text x="30" y="71" fill={INK}>ب</text>
      </g>
      <g transform="rotate(7 66 62)">
        <rect x="50" y="46" width="32" height="32" rx="9" fill="#2F7BEA" {...line} />
        <text x="66" y="71" fill={CREAM}>1</text>
      </g>
      <g transform="rotate(-4 48 32)">
        <rect x="32" y="16" width="32" height="32" rx="9" fill="#8D6BE8" {...line} />
        <text x="48" y="41" fill={CREAM}>أ</text>
      </g>
    </g>
  ),
  surahs: ({ deep }) => (
    <>
      <path d="M22 82L52 58M74 82L44 58" stroke={INK} strokeWidth="11" strokeLinecap="round" />
      <path d="M22 82L52 58M74 82L44 58" stroke="#FFC43D" strokeWidth="5" strokeLinecap="round" />
      <path d="M14 24V56C26 52 38 53 48 59C58 53 70 52 82 56V24Z" fill={INK} />
      <path d="M47 26C40 20 29 19 20 22V52C29 49 40 50 47 56Z" fill={CREAM} {...line} />
      <path d="M49 26C56 20 67 19 76 22V52C67 49 56 50 49 56Z" fill={CREAM} {...line} />
      <g stroke={deep} strokeWidth="3" strokeLinecap="round">
        <path d="M26 30H40M26 37H40M26 44H38" />
      </g>
      <path d="M67 28A9 9 0 1 0 67 46A7.2 7.2 0 1 1 67 28Z" fill="#FFC43D" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      <path d={star(70, 32, 4.2)} fill="#FFC43D" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
    </>
  ),
  games: ({ main }) => (
    <>
      <path d="M22 36C22 29 28 26 35 26H61C68 26 74 29 74 36L80 61C82 70 73 75 67 70L59 62H37L29 70C23 75 14 70 16 61Z" fill={CREAM} {...line} />
      <rect x="27" y="40" width="17" height="6.5" rx="2.5" fill={INK} />
      <rect x="32.2" y="34.8" width="6.5" height="17" rx="2.5" fill={INK} />
      <circle cx="64" cy="37.5" r="4.6" fill="#F0563A" {...line} strokeWidth="2.4" />
      <circle cx="72" cy="45" r="4.6" fill="#FFC43D" {...line} strokeWidth="2.4" />
      <circle cx="56" cy="45" r="4.6" fill="#1E9E96" {...line} strokeWidth="2.4" />
      <circle cx="64" cy="52.5" r="4.6" fill="#8D6BE8" {...line} strokeWidth="2.4" />
      <path d="M42 53H54" stroke={main} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  art: ({ main }) => (
    <>
      <path d="M22 34C26 20 48 16 64 23C80 30 84 48 76 60C70 70 60 65 54 69C46 75 30 72 23 61C17 52 18 42 22 34Z" fill={CREAM} {...line} />
      <circle cx="58" cy="60" r="5" fill={main} {...line} />
      <circle cx="33" cy="42" r="5.2" fill="#FFC43D" {...line} strokeWidth="2.4" />
      <circle cx="43" cy="31" r="5.2" fill="#2F7BEA" {...line} strokeWidth="2.4" />
      <circle cx="31" cy="55" r="5.2" fill="#1E9E96" {...line} strokeWidth="2.4" />
      <circle cx="46" cy="60" r="5.2" fill="#8D6BE8" {...line} strokeWidth="2.4" />
      <path d="M80 14L60 40" stroke={INK} strokeWidth="11" strokeLinecap="round" />
      <path d="M80 14L60 40" stroke="#FFC43D" strokeWidth="5" strokeLinecap="round" />
      <path d="M60 40L56 45" stroke={INK} strokeWidth="11" strokeLinecap="round" />
      <path d="M60 40L56 45" stroke="#DDE3EE" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M56 45L48 56" stroke={INK} strokeWidth="11" strokeLinecap="round" />
      <path d="M56 45L48 56" stroke="#8D6BE8" strokeWidth="5.5" strokeLinecap="round" />
    </>
  ),
  ai: () => (
    <>
      <path d="M48 24V16" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
      <path d={star(48, 13, 7.5)} fill="#FFC43D" {...line} strokeWidth="2.6" />
      <rect x="15" y="38" width="8" height="15" rx="4" fill="#FFC43D" {...line} />
      <rect x="73" y="38" width="8" height="15" rx="4" fill="#FFC43D" {...line} />
      <rect x="21" y="24" width="54" height="42" rx="17" fill={CREAM} {...line} />
      <rect x="27" y="30" width="42" height="30" rx="12" fill={INK} />
      <path d="M35 44Q39 37 43 44M53 44Q57 37 61 44M42 51Q48 56 54 51" fill="none" stroke="#6EE7EE" strokeWidth="3.6" strokeLinecap="round" />
      <rect x="30" y="68" width="36" height="14" rx="7" fill={CREAM} {...line} />
      <path d="M48 78C43 75 42 72 44.2 71C46 70.2 48 71.4 48 72.6C48 71.4 50 70.2 51.8 71C54 72 53 75 48 78Z" fill="#F0563A" />
    </>
  ),
  values: () => (
    <>
      <path d="M48 74V46" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <path d="M48 74V46" stroke="#3F8228" strokeWidth="4" strokeLinecap="round" />
      <path d="M48 62C36 64 27 58 25 47C37 45 46 51 48 62Z" fill="#A5DC7A" {...line} />
      <path d="M48 56C60 58 69 52 71 41C59 39 50 45 48 56Z" fill="#A5DC7A" {...line} />
      <path d="M16 82C26 70 70 70 80 82Z" fill="#8A4B22" {...line} />
      <path d="M48 44C34 35 33 22 41 19.5C45 18.2 48 21 48 23.5C48 21 51 18.2 55 19.5C63 22 62 35 48 44Z" fill="#F0563A" {...line} />
    </>
  ),
  competitions: () => (
    <>
      <path d="M30 26H21C19 42 26 49 35 49" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 26H21C19 42 26 49 35 49" fill="none" stroke={CREAM} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M66 26H75C77 42 70 49 61 49" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M66 26H75C77 42 70 49 61 49" fill="none" stroke={CREAM} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 16H67V36C67 50 58 58 48 58C38 58 29 50 29 36Z" fill={CREAM} {...line} />
      <path d={star(48, 36, 11.5)} fill="#FFC43D" {...line} strokeWidth="2.8" />
      <rect x="43" y="58" width="10" height="10" fill={CREAM} {...line} />
      <rect x="31" y="68" width="34" height="12" rx="4" fill={INK} />
      <path d="M38 74H58" stroke="#FFC43D" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
};

/** A section's icon as an inline vector tile (always crisp, never cropped). */
export function SectionIcon({ id, size = 96, className }: { id: SectionId; size?: number; className?: string; priority?: boolean }) {
  const c = palette[id];
  return (
    <span className={cn("inline-block shrink-0", className)} style={{ width: size, height: size }}>
      <svg viewBox="0 0 96 96" width="100%" height="100%" aria-hidden focusable="false" className="block overflow-visible">
        <rect x="6" y="12" width="84" height="80" rx="27" fill={c.deep} />
        <rect x="6" y="6" width="84" height="80" rx="27" fill={c.main} />
        <path d="M15 31C17 19 26 13 38 12" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="4.5" strokeLinecap="round" />
        {glyphs[id](c)}
      </svg>
    </span>
  );
}
