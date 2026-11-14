"use client";

import Link from "next/link";
import { useState } from "react";
import { Chips } from "@/components/ui/Chips";
import { Button } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";
import { EmptyState } from "@/components/ui/States";
import { ageBands, ageLabel, stories, storyTopics, topicLabel, type AgeBand, type StoryTopic } from "@/data/stories";
import { useProgress } from "@/lib/progress";
import { StoryCover } from "./StoryCover";

const tilt = ["-rotate-1", "rotate-1", "rotate-0"];

export function StoryBrowser() {
  const [age, setAge] = useState<AgeBand | "all">("all");
  const [topic, setTopic] = useState<StoryTopic | "all">("all");
  const progress = useProgress();
  const list = stories.filter((s) => (age === "all" || s.age === age) && (topic === "all" || s.topic === topic));

  return (
    <>
      <div className="grid gap-4 rounded-xl bg-accent-soft p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-16 font-display font-bold text-accent-text">العمر</span>
          <Chips label="تصفية حسب العمر" value={age} onChange={setAge} options={[{ value: "all", label: "الكل" }, ...ageBands]} />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-16 font-display font-bold text-accent-text">الموضوع</span>
          <Chips label="تصفية حسب الموضوع" value={topic} onChange={setTopic} options={[{ value: "all", label: "الكل" }, ...storyTopics]} />
        </div>
      </div>

      <p className="mt-6 font-display font-bold text-ink-soft" aria-live="polite">
        {list.length ? `${list.length} من ${stories.length} قصص` : ""}
      </p>

      {list.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="لا توجد قصة بهذه الاختيارات بعد"
            action={
              <Button
                variant="navy"
                onClick={() => {
                  setAge("all");
                  setTopic("all");
                }}
              >
                اعرض كل القصص
              </Button>
            }
          >
            جرّب عمرًا أو موضوعًا آخر.
          </EmptyState>
        </div>
      ) : (
        <ul className="mt-4 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <li key={s.slug}>
              <Link href={`/stories/${s.slug}`} className="group block">
                <span className={`relative block overflow-hidden rounded-[1rem_2rem_2rem_1rem] shadow-soft transition-all duration-500 ease-[var(--ease-bounce)] group-hover:-translate-y-2 group-hover:rotate-0 group-hover:shadow-lift ${tilt[i % 3]}`}>
                  <StoryCover story={s} className="aspect-[4/3] w-full" priority={i < 3} />
                  {/* book spine */}
                  <span aria-hidden className="absolute inset-y-0 start-0 w-3 bg-navy/20" />
                  {progress.has(`story:${s.slug}`) ? (
                    <span className="absolute end-3 top-3 flex items-center gap-1 rounded-full bg-white px-3 py-1 font-display text-sm font-bold text-[#2f6418]">
                      <Glyph name="check" size={16} />
                      قرأتها
                    </span>
                  ) : null}
                </span>
                <span className="mt-4 block font-display text-2xl font-bold leading-snug text-ink">{s.title}</span>
                <span className="mt-1 flex flex-wrap gap-x-3 font-display text-sm font-bold text-accent-text">
                  <span>{ageLabel(s.age)}</span>
                  <span>{topicLabel(s.topic)}</span>
                  <span>{s.minutes} دقائق</span>
                </span>
                <span className="mt-2 block text-ink-soft">{s.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
