"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionIcon } from "@/components/brand/SectionIcon";
import { Chips } from "@/components/ui/Chips";
import { Glyph } from "@/components/ui/Glyph";
import { adventures } from "@/data/adventures";
import { ageBands, type AgeBand } from "@/data/stories";

const corners = ["rounded-[2.25rem_2.25rem_2.25rem_0.75rem]", "rounded-[2.25rem_0.75rem_2.25rem_2.25rem]", "rounded-[0.75rem_2.25rem_2.25rem_2.25rem]", "rounded-[2.25rem_2.25rem_0.75rem_2.25rem]"];

export function ExploreBrowser() {
  const [age, setAge] = useState<AgeBand | "all">("all");
  const list = adventures.filter((a) => age === "all" || a.ages.includes(age));

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-display font-bold">كم عمرك؟</span>
        <Chips label="تصفية حسب العمر" value={age} onChange={setAge} options={[{ value: "all", label: "كل الأعمار" }, ...ageBands]} />
      </div>
      <p className="mt-5 font-display font-bold text-ink-soft" aria-live="polite">
        {list.length} مغامرات تناسبك
      </p>
      <ul className="mt-4 grid gap-5 md:grid-cols-2">
        {list.map((a, i) => (
          <li key={a.id}>
            <Link
              href={a.href}
              data-section={a.section}
              className={`group flex h-full items-center gap-4 bg-accent-soft p-5 transition-transform duration-300 ease-[var(--ease-bounce)] hover:-translate-y-1 sm:gap-5 sm:p-6 ${corners[i % 4]}`}
            >
              <SectionIcon id={a.section} size={96} className="transition-transform duration-500 ease-[var(--ease-bounce)] group-hover:rotate-6 group-hover:scale-110" />
              <span className="min-w-0 flex-1">
                <span className="font-display text-sm font-bold text-accent-deep">{a.kind}</span>
                <span className="block font-display text-2xl font-bold leading-snug text-navy">{a.title}</span>
                <span className="block text-ink-soft">{a.blurb}</span>
                <span className="mt-2 inline-flex items-center gap-1 font-display font-bold text-accent-deep">
                  {a.cta}
                  <Glyph name="forward" size={16} className="transition-transform group-hover:-translate-x-1" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
