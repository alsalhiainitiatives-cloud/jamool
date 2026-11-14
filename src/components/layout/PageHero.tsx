import Link from "next/link";
import type { ReactNode } from "react";
import { Character } from "@/components/brand/Character";
import { SpeechBubble } from "@/components/brand/Decor";
import { SectionIcon } from "@/components/brand/SectionIcon";
import { Glyph } from "@/components/ui/Glyph";
import { sectionById } from "@/data/sections";
import type { CharacterId, SectionId } from "@/lib/brand-assets";

/** Shared top of every section page: accent world, icon, guide character. */
export function PageHero({
  section,
  title,
  lead,
  guide,
  greeting,
  back,
  children,
}: {
  section: SectionId;
  title?: string;
  lead?: string;
  guide?: CharacterId;
  greeting?: string;
  back?: { href: string; label: string };
  children?: ReactNode;
}) {
  const s = sectionById[section];
  const who = guide ?? s.guide;
  return (
    <div className="relative">
      <div className="container-page relative grid items-end gap-4 pb-2 pt-8 md:grid-cols-[1fr_auto] md:pt-12">
        <div className="animate-rise pb-4">
          <div className="mb-5 flex items-end justify-between gap-3">
            <Link
              href={back?.href ?? "/#sections"}
              className="inline-flex min-h-11 items-center gap-1 self-start rounded-full bg-white pe-5 ps-3 font-display text-sm font-bold text-ink hover:bg-white"
            >
              <Glyph name="back" size={18} />
              {back?.label ?? "كل الأقسام"}
            </Link>
            <Character id={who} height={118} priority animation="talking" className="md:hidden" />
          </div>
          <div className="flex items-center gap-4">
            <SectionIcon id={section} size={84} priority className="hidden sm:inline-block" />
            <div>
              <p className="eyebrow">{s.tagline}</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl">{title ?? s.name}</h1>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">{lead ?? s.description}</p>
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
        <div className="relative z-10 hidden items-end gap-2 md:flex">
          <SpeechBubble tail="side" className="mb-28 max-w-52 animate-pop [animation-delay:400ms]">
            {greeting ?? s.greeting}
          </SpeechBubble>
          <Character id={who} height={260} priority animation="talking" float={who === "zizou"} />
        </div>
      </div>
    </div>
  );
}
