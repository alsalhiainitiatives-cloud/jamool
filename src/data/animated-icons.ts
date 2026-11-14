import type { SectionId } from "@/lib/brand-assets";

/**
 * Animated Lordicon icons (family "Doodle", style "Outline"), downloaded
 * from the project's Lordicon account as Lottie JSON. Free licence: the
 * site must credit Lordicon (see the footer).
 *
 * Sections without a file here keep their static vector tile. To add one,
 * save the Lottie JSON in public/assets/lordicon/ and list it below.
 */
export const animatedIcons: Partial<Record<SectionId, string>> = {
  stories: "/assets/lordicon/stories.json",
  learn: "/assets/lordicon/learn.json",
  competitions: "/assets/lordicon/competitions.json",
};
