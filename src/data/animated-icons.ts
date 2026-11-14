import type { SectionId } from "@/lib/brand-assets";

/**
 * Animated Lordicon icons (family "Doodle", style "Motif").
 *
 * Lordicon files can only be downloaded from a signed-in Lordicon account,
 * so they are not bundled yet. To switch the platform to them:
 *   1. Download each icon as "Lottie JSON" from lordicon.com.
 *   2. Save it in public/assets/lordicon/ and put its path in `src` below.
 * The animated set is used only once ALL eight sections have a file, so the
 * grid never mixes two icon styles. Until then the SVG set is shown.
 */
export type AnimatedIcon = {
  /** e.g. "/assets/lordicon/stories.json" */
  src: string | null;
  /** Suggested free icon on lordicon.com/icons/doodle/motif */
  suggestion: string;
  /** Recolouring, e.g. "primary:#1f2a5c,secondary:#8d6be8" */
  colors: string;
};

const INK = "#1f2a5c";

export const animatedIcons: Record<SectionId, AnimatedIcon> = {
  stories: { src: null, suggestion: "book-bookmark", colors: `primary:${INK},secondary:#8d6be8` },
  learn: { src: null, suggestion: "pencil", colors: `primary:${INK},secondary:#f5a63a` },
  surahs: { src: null, suggestion: "moon-stars", colors: `primary:${INK},secondary:#1e9e96` },
  games: { src: null, suggestion: "joystick", colors: `primary:${INK},secondary:#2f7bea` },
  art: { src: null, suggestion: "image-mountain", colors: `primary:${INK},secondary:#f0563a` },
  ai: { src: null, suggestion: "shooting-stars", colors: `primary:${INK},secondary:#18a7c9` },
  values: { src: null, suggestion: "growing-plant", colors: `primary:${INK},secondary:#5daa3a` },
  competitions: { src: null, suggestion: "medal-first-place", colors: `primary:${INK},secondary:#ffc43d` },
};

export const animatedIconsReady = Object.values(animatedIcons).every((i) => i.src !== null);
