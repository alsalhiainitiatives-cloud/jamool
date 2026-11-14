import type { ReactNode } from "react";
import { Character } from "@/components/brand/Character";
import { Dune } from "@/components/brand/Decor";
import type { CharacterId } from "@/lib/brand-assets";

/** Page top for pages that are not one of the eight sections. */
export function SimpleHero({ eyebrow, title, lead, character, children }: { eyebrow?: string; title: string; lead?: string; character?: CharacterId; children?: ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-cream">
      <div className="container-page relative grid items-end gap-4 pb-16 pt-10 sm:pb-20 md:grid-cols-[1fr_auto] md:pt-14">
        <div className="animate-rise pb-4">
          {character ? <Character id={character} height={118} priority className="mb-3 md:hidden" /> : null}
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl">{title}</h1>
          {lead ? <p className="mt-4 max-w-xl text-lg text-ink-soft">{lead}</p> : null}
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
        {character ? (
          <div className="relative z-10 hidden md:block">
            <Character id={character} height={230} priority float={character === "zizou"} className="-mb-6" />
          </div>
        ) : null}
      </div>
      <Dune fill="#FFFAF0" variant={1} className="absolute inset-x-0 -bottom-px h-10 sm:h-14" />
    </div>
  );
}
