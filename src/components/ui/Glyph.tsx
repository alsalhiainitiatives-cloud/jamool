import type { SVGProps } from "react";

const paths = {
  /** Points toward the reading direction's "forward" in RTL (left). */
  forward: "M14.5 5.5 8 12l6.5 6.5",
  back: "M9.5 5.5 16 12l-6.5 6.5",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  check: "M5 12.5 10 17.5 19 7",
  play: "M8 5.5v13l11-6.5z",
  undo: "M9 7 4.5 11.5 9 16M5 11.5h9a5.5 5.5 0 0 1 0 11h-2",
  redo: "M15 7l4.5 4.5L15 16M19 11.5h-9a5.5 5.5 0 0 0 0 11h2",
  trash: "M5 7h14M10 7V4.5h4V7M7 7l1 12.5h8L17 7M10.5 11v5M13.5 11v5",
  download: "M12 4v11M7.5 11 12 15.5 16.5 11M5 19.5h14",
  brush: "M19.5 4.5c-4 1.5-8 5.5-9.5 8.5l2.5 2.5c3-1.500 7-5.5 8.500-9.500zM9 14c-2.500 0-3.500 1.500-3.500 3.500 0 1-.5 1.500-1.500 2 3 .5 6.500-.5 6.500-3.500",
  eraser: "M15 4.500 20.500 10 11 19.500H6.500L3.500 16.500zM9 9l6 6M11 19.500h9",
  refresh: "M19 12a7 7 0 1 1-2.050-4.950M19 4.500V8h-3.500",
  volume: "M4.500 9.500v5h3l4.500 3.500V6L7.500 9.500zM15.500 9a4 4 0 0 1 0 6M18 6.500a7.500 7.500 0 0 1 0 11",
  stop: "M7 7h10v10H7z",
  lock: "M7 11V8.500a5 5 0 0 1 10 0V11M5.500 11h13v9h-13z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  search: "M10.500 17a6.500 6.500 0 1 0 0-13 6.500 6.500 0 0 0 0 13zM15.500 15.500 20 20",
  save: "M5 4.500h11l3.500 3.500V19.500H5zM8 4.500v5h7v-5M8 19.500v-6h8v6",
} as const;

export type GlyphName = keyof typeof paths | "star" | "sparkle";

export function Glyph({ name, size = 22, ...rest }: { name: GlyphName; size?: number } & SVGProps<SVGSVGElement>) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true, ...rest } as const;
  if (name === "star") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M12 2.600c.5 0 .9.300 1.100.700l2.300 4.700 5.200.800c1 .100 1.400 1.400.700 2.100l-3.800 3.700.9 5.200c.200 1-.900 1.800-1.800 1.300L12 18.600l-4.600 2.500c-.9.500-2-.300-1.800-1.300l.9-5.200-3.800-3.700c-.700-.700-.300-2 .700-2.100l5.200-.800 2.300-4.700c.200-.400.600-.700 1.100-.700z" />
      </svg>
    );
  }
  if (name === "sparkle") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M12 2c.6 5.400 2.600 7.400 10 10-7.400 2.600-9.400 4.600-10 10-.6-5.400-2.600-7.400-10-10 7.400-2.600 9.400-4.600 10-10z" />
      </svg>
    );
  }
  const filled = name === "play" || name === "stop";
  return (
    <svg
      {...common}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 1.5 : 2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
