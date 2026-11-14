import Image from "next/image";
import { Character } from "@/components/brand/Character";
import { Dune } from "@/components/brand/Decor";
import type { Story } from "@/data/stories";
import { illustrations } from "@/lib/brand-assets";
import { cn } from "@/lib/cn";

/** Book-cover composition built from brand colours and the story's hero. */
export function StoryCover({ story, className, priority }: { story: Story; className?: string; priority?: boolean }) {
  if (story.cover.scene === "oasis") {
    const img = illustrations.oasisScene;
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={img.src} alt="جمّول وأصدقاؤه في واحة صحراوية" fill priority={priority} sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: story.cover.sky }}>
      <span aria-hidden className="absolute start-[12%] top-[12%] aspect-square w-[34%] rounded-full" style={{ background: story.cover.orb }} />
      <Dune fill={story.cover.ground} variant={1} className="absolute inset-x-0 bottom-0 h-[34%]" />
      <div className="absolute inset-x-0 bottom-[6%] top-[10%] flex items-end justify-center">
        <Character id={story.hero} decorative priority={priority} className="h-full w-auto" sizes="320px" />
      </div>
    </div>
  );
}
