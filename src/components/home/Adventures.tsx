import Link from "next/link";
import { SectionIcon } from "@/components/brand/SectionIcon";
import { StoryCover } from "@/components/features/StoryCover";
import { SectionHeading } from "@/components/layout/Shell";
import { Glyph } from "@/components/ui/Glyph";
import { Reveal } from "@/components/ui/Reveal";
import { adventures, featuredIds } from "@/data/adventures";
import { ageLabel, storyBySlug } from "@/data/stories";

const corners = ["rounded-[2.25rem_2.25rem_2.25rem_0.75rem]", "rounded-[2.25rem_0.75rem_2.25rem_2.25rem]", "rounded-[0.75rem_2.25rem_2.25rem_2.25rem]"];

export function Adventures() {
  const picks = featuredIds.map((id) => adventures.find((a) => a.id === id)!);
  const [featured, ...rest] = picks;
  const story = storyBySlug(featured.href.split("/").pop()!)!;

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="مغامرات مقترحة" title="ماذا نكتشف اليوم؟" />
        <Link href="/explore" className="mb-8 inline-flex min-h-11 items-center gap-1 font-display font-bold text-ink underline-offset-4 hover:underline">
          كل المغامرات
          <Glyph name="forward" size={18} />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <Link href={featured.href} data-section={featured.section} className="group relative block h-full overflow-hidden rounded-xl bg-navy shadow-soft transition-shadow hover:shadow-lift">
            <StoryCover story={story} className="aspect-[16/10] w-full transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03]" />
            <div className="relative flex flex-wrap items-center gap-x-6 gap-y-3 p-6 text-cream sm:p-7">
              <div className="min-w-0 flex-1 basis-64">
                <p className="mb-1 flex flex-wrap items-center gap-2 font-display text-sm font-bold text-saffron">
                  <span className="rounded-full bg-saffron px-3 py-0.5 text-ink">{featured.kind}</span>
                  {ageLabel(story.age)} · {story.minutes} دقائق
                </p>
                <h3 className="text-2xl sm:text-3xl">{featured.title}</h3>
                <p className="mt-1 text-cream/85">{featured.blurb}</p>
              </div>
              <span className="inline-flex min-h-12 items-center gap-2 rounded-full bg-saffron px-6 font-display font-bold text-ink transition-transform group-hover:-translate-x-1">
                {featured.cta}
                <Glyph name="forward" size={18} />
              </span>
            </div>
          </Link>
        </Reveal>

        <ul className="grid gap-5">
          {rest.map((a, i) => (
            <li key={a.id}>
              <Reveal delay={i * 90} className="h-full">
                <Link
                  href={a.href}
                  data-section={a.section}
                  className={`group flex h-full items-center gap-4 bg-accent-soft p-4 transition-transform duration-300 ease-[var(--ease-bounce)] hover:-translate-y-1 sm:gap-5 sm:p-5 ${corners[i % 3]}`}
                >
                  <SectionIcon id={a.section} size={92} className="transition-transform duration-500 ease-[var(--ease-bounce)] group-hover:rotate-6 group-hover:scale-110" />
                  <span className="min-w-0 flex-1">
                    <span className="font-display text-sm font-bold text-accent-text">{a.kind}</span>
                    <span className="block font-display text-xl font-bold leading-snug text-ink sm:text-2xl">{a.title}</span>
                    <span className="block text-ink-soft">{a.blurb}</span>
                  </span>
                  <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform group-hover:-translate-x-1">
                    <Glyph name="forward" size={20} />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
