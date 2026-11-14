"use client";

import Link from "next/link";
import { useState } from "react";
import { Chips } from "@/components/ui/Chips";
import { Glyph } from "@/components/ui/Glyph";
import { categoryLabel, gameCategories, games, type GameCategory } from "@/data/games";
import { cn } from "@/lib/cn";

const shapes = ["rounded-[2.5rem_2.5rem_2.5rem_0.75rem]", "rounded-[2.5rem_0.75rem_2.5rem_2.5rem]", "rounded-[0.75rem_2.5rem_2.5rem_2.5rem]", "rounded-[2.5rem_2.5rem_0.75rem_2.5rem]"];

export function GameLibrary() {
  const [category, setCategory] = useState<GameCategory | "all">("all");
  const list = games.filter((g) => category === "all" || g.category === category);

  return (
    <>
      <Chips label="تصنيف الألعاب" value={category} onChange={setCategory} options={[{ value: "all", label: "كل الألعاب" }, ...gameCategories]} />
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {list.map((g, i) => {
          const ready = g.status === "ready";
          return (
            <li key={g.slug}>
              <Link
                href={`/games/${g.slug}`}
                className={cn(
                  "group flex h-full flex-col gap-3 p-7 transition-transform duration-300 ease-[var(--ease-bounce)] hover:-translate-y-1.5",
                  shapes[i % 4],
                  ready ? "bg-accent-deep text-white" : "bg-white text-navy ring-2 ring-dashed ring-navy/20",
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className={cn("rounded-full px-3 py-1 font-display text-sm font-bold", ready ? "bg-saffron text-navy" : "bg-cream text-ink-soft")}>{ready ? "جاهزة للعب" : "قيد الإعداد"}</span>
                  <span className={cn("font-display text-sm font-bold", ready ? "text-white/85" : "text-ink-soft")}>
                    {categoryLabel(g.category)} · {g.ages}
                  </span>
                </span>
                <span className="font-display text-3xl font-extrabold">{g.title}</span>
                <span className={ready ? "text-white/90" : "text-ink-soft"}>{g.blurb}</span>
                <span className="mt-auto flex items-center gap-2 pt-2 font-display font-bold">
                  {ready ? "العب الآن" : "تعرّف عليها"}
                  <Glyph name="forward" size={18} className="transition-transform group-hover:-translate-x-1" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
