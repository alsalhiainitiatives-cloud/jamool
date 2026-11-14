import Link from "next/link";
import { SectionIcon } from "@/components/brand/SectionIcon";
import { SectionHeading } from "@/components/layout/Shell";
import { Reveal } from "@/components/ui/Reveal";
import { sections } from "@/data/sections";

const tilts = ["-rotate-3", "rotate-2", "rotate-3", "-rotate-2"];

/** Icon-only grid: every tile is a link; the name is exposed to assistive tech and as a tooltip. */
export function SectionsWorld() {
  return (
    <section id="sections" className="container-page py-16 sm:py-24">
      <SectionHeading center eyebrow="أقسام المنصة" title="اختر عالمك وانطلق" />
      <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-8">
        {sections.map((s, i) => (
          <li key={s.id}>
            <Reveal delay={(i % 4) * 70}>
              <Link
                href={s.href}
                aria-label={s.name}
                title={s.name}
                className="group relative mx-auto block aspect-square w-full max-w-44 rounded-[1.9rem] outline-offset-4"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-[20%] -bottom-4 h-4 rounded-[50%] bg-navy/20 blur-md transition-all duration-300 group-hover:scale-75 group-hover:bg-navy/12"
                />
                <span className={`block size-full transition-transform duration-300 ease-[var(--ease-bounce)] group-hover:-translate-y-2 group-hover:rotate-0 group-active:scale-95 ${tilts[i % 4]}`}>
                  <SectionIcon id={s.id} size={176} className="size-full!" />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
