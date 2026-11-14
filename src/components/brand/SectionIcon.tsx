import Image from "next/image";
import { sectionIcons, type SectionId } from "@/lib/brand-assets";
import { cn } from "@/lib/cn";

/** A section's painted icon inside a square box, contained, never cropped. */
export function SectionIcon({ id, size = 96, className, priority }: { id: SectionId; size?: number; className?: string; priority?: boolean }) {
  const img = sectionIcons[id];
  return (
    <span className={cn("relative inline-block shrink-0", className)} style={{ width: size, height: size }}>
      <Image
        src={img.src}
        alt=""
        fill
        priority={priority}
        sizes={`${size}px`}
        draggable={false}
        className="select-none object-contain drop-shadow-[0_8px_8px_rgb(31_42_92/0.14)]"
      />
    </span>
  );
}
