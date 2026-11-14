import type { SectionId } from "@/lib/brand-assets";
import fetched from "./lordicon-manifest.json";

/**
 * Animated Lordicon icons (family "Doodle", style "Motif").
 *
 * The Lottie files are fetched from the Lordicon API by
 * `scripts/fetch-lordicon.mjs` (needs LORDICON_API_TOKEN), which saves them in
 * public/assets/lordicon/ and lists them in lordicon-manifest.json.
 * The animated set is used only once ALL eight sections have a file, so the
 * grid never mixes two icon styles. Until then the SVG set is shown.
 */
export type AnimatedIcon = {
  src: string | null;
  /** Icon name on lordicon.com/icons/doodle/motif */
  name: string;
  /** Recolouring, e.g. "primary:#1f2a5c,secondary:#8d6be8" */
  colors: string;
};

const INK = "#1f2a5c";
const have = new Set<string>(fetched);
const src = (id: SectionId) => (have.has(id) ? `/assets/lordicon/${id}.json` : null);

export const animatedIcons: Record<SectionId, AnimatedIcon> = {
  stories: { src: src("stories"), name: "book-bookmark", colors: `primary:${INK},secondary:#8d6be8` },
  learn: { src: src("learn"), name: "pencil", colors: `primary:${INK},secondary:#f5a63a` },
  surahs: { src: src("surahs"), name: "moon-stars", colors: `primary:${INK},secondary:#1e9e96` },
  games: { src: src("games"), name: "joystick", colors: `primary:${INK},secondary:#2f7bea` },
  art: { src: src("art"), name: "image-mountain", colors: `primary:${INK},secondary:#f0563a` },
  ai: { src: src("ai"), name: "shooting-stars", colors: `primary:${INK},secondary:#18a7c9` },
  values: { src: src("values"), name: "growing-plant", colors: `primary:${INK},secondary:#5daa3a` },
  competitions: { src: src("competitions"), name: "medal-first-place", colors: `primary:${INK},secondary:#ffc43d` },
};

export const animatedIconsReady = Object.values(animatedIcons).every((i) => i.src !== null);
