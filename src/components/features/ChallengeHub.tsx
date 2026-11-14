"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";
import { useToast } from "@/components/ui/Toast";
import { challenges, type Challenge } from "@/data/challenges";
import { completeActivity, useProgress } from "@/lib/progress";
import { Quiz } from "./Quiz";

export function ChallengeHub() {
  const [active, setActive] = useState<Challenge | null>(null);
  const progress = useProgress();
  const toast = useToast();
  const panel = useRef<HTMLDivElement>(null);

  function open(c: Challenge) {
    setActive(c);
    requestAnimationFrame(() => panel.current?.scrollIntoView({ block: "start", behavior: "smooth" }));
  }

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2">
        {challenges.map((c, i) => {
          const done = progress.has(`challenge:${c.id}`);
          return (
            <li key={c.id} className={`flex flex-col gap-3 bg-accent-soft p-7 ${i % 2 ? "rounded-[2.5rem_0.75rem_2.5rem_2.5rem]" : "rounded-[0.75rem_2.5rem_2.5rem_2.5rem]"}`}>
              <span className="flex flex-wrap items-center gap-2 font-display text-sm font-bold text-accent-text">
                <span className="rounded-full bg-white px-3 py-1">تحدٍّ تدريبي</span>
                <span>{c.ages}</span>
                <span>{c.questions.length} أسئلة</span>
              </span>
              <h3 className="text-3xl">{c.title}</h3>
              <p className="text-ink-soft">{c.blurb}</p>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                <Button variant="navy" onClick={() => open(c)}>
                  <Glyph name="play" size={18} />
                  {done ? "العب مرة أخرى" : "ابدأ التحدي"}
                </Button>
                {done ? (
                  <span className="flex items-center gap-1 font-display font-bold text-[#2f6418]">
                    <Glyph name="check" size={18} />
                    أكملته
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      <div ref={panel} className="scroll-mt-28">
        {active ? (
          <div className="mt-10">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl">{active.title}</h3>
              <Button variant="ghost" size="sm" onClick={() => setActive(null)}>
                <Glyph name="close" size={18} />
                إغلاق التحدي
              </Button>
            </div>
            <Quiz
              key={active.id}
              questions={active.questions}
              guide="thaloob"
              finishTitle="أكملت التحدي!"
              onFinish={(stars) => {
                if (completeActivity(`challenge:${active.id}`, stars)) toast(`تحدٍّ مكتمل! نجوم جديدة: ${stars}`);
              }}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
