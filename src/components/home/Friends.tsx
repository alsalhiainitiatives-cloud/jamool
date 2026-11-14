import Link from "next/link";
import type { CSSProperties } from "react";
import { Character } from "@/components/brand/Character";
import { Dune } from "@/components/brand/Decor";
import { SectionHeading } from "@/components/layout/Shell";
import { Glyph } from "@/components/ui/Glyph";
import { characters } from "@/data/characters";
import { sectionById } from "@/data/sections";

/** The five friends standing together on one dune, not boxed into cards. */
export function Friends() {
  return (
    <section className="relative mt-12 bg-cream pb-16 pt-24 sm:pt-28">
      <Dune fill="#FFF4DE" variant={3} className="absolute inset-x-0 -top-10 h-12 sm:-top-14 sm:h-16" />
      <div className="container-page">
        <SectionHeading center eyebrow="الأصدقاء" title="تعرّف على أصدقاء جمّول" lead="خمسة أصدقاء، ولكلٍّ منهم عالمه الذي يحب أن يأخذك إليه." />
      </div>

      <div className="relative">
        <span aria-hidden className="absolute inset-x-0 top-[calc(var(--stage)*0.7)] hidden h-28 [--stage:19.5rem] lg:block">
          <Dune fill="#F6E2B8" variant={2} className="h-full" />
        </span>
        <ul
          className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [--stage:15rem] [scrollbar-width:none] sm:px-7 lg:container-page lg:grid lg:grid-cols-5 lg:gap-3 lg:overflow-visible lg:[--stage:19.5rem] [&::-webkit-scrollbar]:hidden"
          aria-label="شخصيات جمّول"
        >
          {characters.map((c) => {
            const section = sectionById[c.section];
            return (
              <li key={c.id} data-section={c.section} className="w-[68vw] max-w-72 shrink-0 snap-center lg:w-auto lg:max-w-none">
                <Link href={section.href} className="group flex h-full flex-col items-center text-center">
                  <span className="flex h-[var(--stage)] items-end justify-center">
                    <span
                      style={{ "--s": c.stageScale } as CSSProperties}
                      className={`block h-[calc(var(--stage)*var(--s))] origin-bottom transition-transform duration-500 ease-[var(--ease-bounce)] group-hover:scale-105 group-hover:-rotate-2 ${c.id === "zizou" ? "mb-8" : ""}`}
                    >
                      <Character id={c.id} className="h-full w-auto" sizes="260px" />
                    </span>
                  </span>
                  <span className="mt-5 block font-display text-3xl font-extrabold text-accent-deep">{c.name}</span>
                  <span className="font-display text-sm font-bold text-ink-soft">
                    {c.kind} · {c.role}
                  </span>
                  <span className="mt-2 block max-w-56 text-ink-soft">{c.blurb}</span>
                  <span className="mt-4 inline-flex min-h-11 items-center gap-1 rounded-full bg-white px-5 font-display text-sm font-bold text-navy ring-2 ring-navy/10 transition-colors group-hover:bg-accent-soft">
                    {c.linkLabel}
                    <Glyph name="forward" size={16} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
