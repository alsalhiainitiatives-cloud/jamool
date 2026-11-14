import Image from "next/image";
import { brand } from "@/lib/brand-assets";

export function Logo({ height = 56, priority }: { height?: number; priority?: boolean }) {
  return (
    <Image
      src={brand.logo.src}
      alt="جمّول"
      width={brand.logo.width}
      height={brand.logo.height}
      priority={priority}
      sizes={`${Math.round((height * brand.logo.width) / brand.logo.height)}px`}
      style={{ height, width: "auto" }}
    />
  );
}
