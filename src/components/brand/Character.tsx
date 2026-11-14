import Image from "next/image";
import { characterImages, type CharacterId } from "@/lib/brand-assets";
import { characterById } from "@/data/characters";
import { cn } from "@/lib/cn";

/**
 * Renders an official character cut-out at a given height, always keeping
 * the artwork's own aspect ratio (never cropped or stretched).
 */
export function Character({
  id,
  height,
  className,
  priority,
  decorative,
  float,
  flip,
  sizes,
}: {
  id: CharacterId;
  /** Rendered height in CSS pixels (width follows the artwork's ratio). */
  height?: number;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
  float?: boolean;
  /** Mirror horizontally so the character faces the content. */
  flip?: boolean;
  sizes?: string;
}) {
  const img = characterImages[id];
  const ratio = img.width / img.height;
  return (
    <Image
      src={img.src}
      alt={decorative ? "" : characterById[id].alt}
      width={img.width}
      height={img.height}
      priority={priority}
      draggable={false}
      sizes={sizes ?? (height ? `${Math.round(height * ratio)}px` : "(min-width: 1024px) 420px, 60vw")}
      style={height ? { height, width: "auto" } : undefined}
      className={cn("max-w-none select-none drop-shadow-[0_14px_14px_rgb(31_42_92/0.16)]", float && "animate-float", flip && "-scale-x-100", className)}
    />
  );
}
