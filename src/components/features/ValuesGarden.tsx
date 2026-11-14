"use client";

import { useState } from "react";
import { Dune } from "@/components/brand/Decor";
import { Button } from "@/components/ui/Button";
import { Celebration } from "@/components/ui/Celebration";
import { Dialog } from "@/components/ui/Dialog";
import { Glyph } from "@/components/ui/Glyph";
import { useToast } from "@/components/ui/Toast";
import { valueLessons, type ValueLesson } from "@/data/values";
import { cn } from "@/lib/cn";
import { completeActivity, useProgress } from "@/lib/progress";

/** A seed that becomes a flower once the value's activity is completed. */
function Plant({ color, grown }: { color: string; grown: boolean }) {
  return (
    <svg viewBox="0 0 120 170" className="h-36 w-auto sm:h-44" aria-hidden>
      {grown ? (
        <g className="origin-bottom animate-pop [transform-box:fill-box]">
          <path d="M60 165V78" stroke="#3F8A2B" strokeWidth="7" strokeLinecap="round" />
          <path d="M60 128c-20-2-30-14-32-28 18 0 30 10 32 28zM60 112c18-2 28-12 30-26-17 0-28 9-30 26z" fill="#5DAA3A" />
          {[0, 60, 120, 180, 240, 300].map((r) => (
            <ellipse key={r} cx="60" cy="24" rx="15" ry="22" fill={color} transform={`rotate(${r} 60 52)`} />
          ))}
          <circle cx="60" cy="52" r="15" fill="#FFC43D" />
        </g>
      ) : (
        <g>
          <path d="M60 165v-20" stroke="#3F8A2B" strokeWidth="6" strokeLinecap="round" />
          <path d="M60 148c-12-1-18-8-19-17 11 0 18 6 19 17zM60 146c11-1 16-7 17-15-10 0-16 5-17 15z" fill="#8FCB6B" />
        </g>
      )}
      <ellipse cx="60" cy="165" rx="34" ry="5" fill="#8A4B22" opacity="0.35" />
    </svg>
  );
}

function Lesson({ lesson, onDone }: { lesson: ValueLesson; onDone: () => void }) {
  const [wrong, setWrong] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);

  return (
    <div className="relative">
      <p className="eyebrow">قيمة {lesson.name}</p>
      <h2 className="pe-12 text-2xl">ماذا يفعل؟</h2>
      <p className="mt-3 text-lg leading-[1.9]">{lesson.situation}</p>
      <div className="mt-5 grid gap-3">
        {lesson.choices.map((c, i) => {
          const right = solved && i === lesson.best;
          const off = wrong.includes(i) || (solved && !right);
          return (
            <button
              key={c}
              type="button"
              disabled={off}
              onClick={() => {
                if (i === lesson.best) {
                  setSolved(true);
                  onDone();
                } else setWrong((w) => [...w, i]);
              }}
              className={cn(
                "flex min-h-14 items-center justify-between gap-3 rounded-lg px-5 py-3 text-start font-display text-lg font-bold transition-all",
                right ? "bg-leaf text-white" : off ? "bg-navy/5 text-navy/40" : "bg-accent-soft text-ink shadow-[0_4px_0_rgb(31_42_92/0.1)] hover:-translate-y-0.5 active:translate-y-0.5",
              )}
            >
              {c}
              {right ? <Glyph name="check" /> : null}
            </button>
          );
        })}
      </div>
      <div aria-live="polite" className="mt-5 min-h-16">
        {solved ? (
          <div className="relative animate-rise rounded-lg bg-[#e7f5dc] px-5 py-4">
            <Celebration />
            <p className="font-display text-lg font-bold text-[#2f6418]">أزهرت البذرة! {lesson.feedback}</p>
            <p className="mt-1 text-ink">{lesson.dailyStep}</p>
          </div>
        ) : wrong.length ? (
          <p className="animate-rise rounded-lg bg-cream px-5 py-4 font-display font-bold">فكّر مرة أخرى: أي تصرّف يجعل الجميع أسعد؟</p>
        ) : null}
      </div>
    </div>
  );
}

export function ValuesGarden() {
  const progress = useProgress();
  const [active, setActive] = useState<ValueLesson | null>(null);
  const toast = useToast();
  const grownCount = valueLessons.filter((v) => progress.has(`value:${v.id}`)).length;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-display text-xl font-bold" aria-live="polite">
          {grownCount === valueLessons.length ? "حديقتك مزهرة كلها. ما أجملها!" : `أزهرت ${grownCount} من ${valueLessons.length} بذور`}
        </p>
        <div className="flex gap-2" aria-hidden>
          {valueLessons.map((v) => (
            <span key={v.id} className="size-4 rounded-full ring-2 ring-white transition-colors" style={{ background: progress.has(`value:${v.id}`) ? v.petal : "rgb(31 42 92 / 0.12)" }} />
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-[#d9f0f7] pt-10">
        <span aria-hidden className="absolute end-[8%] top-6 size-16 rounded-full bg-saffron sm:size-20" />
        <Dune fill="#8FCB6B" variant={2} className="absolute inset-x-0 bottom-0 h-40" />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-16 bg-[#8FCB6B]" />
        <ul className="relative grid grid-cols-2 gap-y-8 px-2 pb-6 lg:grid-cols-4">
          {valueLessons.map((v) => {
            const grown = progress.has(`value:${v.id}`);
            return (
              <li key={v.id} className="flex flex-col items-center text-center">
                <Plant color={v.petal} grown={grown} />
                <button
                  type="button"
                  onClick={() => setActive(v)}
                  className="mt-2 flex min-h-14 flex-col items-center justify-center rounded-lg bg-white px-5 py-2 shadow-[0_5px_0_rgb(31_42_92/0.14)] transition-transform hover:-translate-y-1 active:translate-y-0.5"
                >
                  <span className="font-display text-xl font-extrabold text-ink">{v.name}</span>
                  <span className="text-sm font-bold text-accent-text">{grown ? "أزهرت · أعد النشاط" : "ازرع البذرة"}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {valueLessons.map((v) => (
          <li key={v.id} className="flex gap-4 rounded-lg bg-white p-5 ring-2 ring-navy/6">
            <span aria-hidden className="mt-1 size-5 shrink-0 rounded-full" style={{ background: v.petal }} />
            <span>
              <strong className="block font-display text-xl">{v.name}</strong>
              <span className="text-ink-soft">{v.meaning}</span>
            </span>
          </li>
        ))}
      </ul>

      <Dialog open={active !== null} onClose={() => setActive(null)} title={active ? `نشاط ${active.name}` : "نشاط"}>
        {active ? (
          <>
            <Lesson
              key={active.id}
              lesson={active}
              onDone={() => {
                if (completeActivity(`value:${active.id}`, 1)) toast(`أزهرت بذرة ${active.name}! نجمة جديدة`);
              }}
            />
            <div className="mt-4 text-end">
              <Button variant="soft" onClick={() => setActive(null)}>
                العودة إلى الحديقة
              </Button>
            </div>
          </>
        ) : null}
      </Dialog>
    </>
  );
}
