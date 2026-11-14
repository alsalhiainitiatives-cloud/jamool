import Link from "next/link";
import { SectionIcon } from "@/components/brand/SectionIcon";
import { SectionHeading } from "@/components/layout/Shell";
import { Reveal } from "@/components/ui/Reveal";
import { sections } from "@/data/sections";

const blobs = ["blob-1", "blob-2", "blob-3", "blob-4"];
const tilts = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"];

export function SectionsWorld() {
  return (
    <section id="sections" className="container-page py-16 sm:py-24">
      <SectionHeading center eyebrow="أقسام المنصة" title="ثمانية عوالم… من أين نبدأ؟" lead="اختر العالم الذي يعجبك، وجمّول وأصدقاؤه بانتظارك هناك." />
      <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 lg:grid-cols-4 lg:gap-y-16 lg:pb-10">
        {sections.map((s, i) => (
          <li key={s.id} className={i % 2 ? "lg:translate-y-10" : undefined}>
            <Reveal delay={(i % 4) * 70}>
              <Link href={s.href} data-section={s.id} className="group relative block px-3 pb-7 pt-4 text-center">
                <span
                  aria-hidden
                  className={`absolute inset-x-0 bottom-0 top-16 bg-accent-soft transition-transform duration-500 ease-[var(--ease-bounce)] group-hover:scale-[1.04] group-hover:rotate-0 sm:top-20 ${blobs[i % 4]} ${tilts[i % 4]}`}
                />
                <span className="relative block">
                  <SectionIcon
                    id={s.id}
                    size={150}
                    className="!size-28 transition-transform duration-500 ease-[var(--ease-bounce)] group-hover:-translate-y-2 group-hover:-rotate-3 group-active:scale-95 sm:!size-36 lg:!size-[9.5rem]"
                  />
                  <span className="mt-2 block font-display text-xl font-bold leading-tight text-navy sm:text-2xl">{s.name}</span>
                  <span className="mt-1 block text-sm font-bold text-accent-deep sm:text-base">{s.tagline}</span>
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
