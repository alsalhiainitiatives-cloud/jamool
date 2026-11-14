"use client";

import { useState, type ReactNode } from "react";
import { Character } from "@/components/brand/Character";
import { Button } from "@/components/ui/Button";
import { Celebration } from "@/components/ui/Celebration";
import { Glyph } from "@/components/ui/Glyph";
import type { CharacterId } from "@/lib/brand-assets";
import { cn } from "@/lib/cn";

export type QuizQuestion = {
  prompt: string;
  /** Optional large visual above the options (letters, stars to count…). */
  visual?: ReactNode;
  options: string[];
  answer: number;
  /** Shown after the right answer; a short fact or encouragement. */
  explain?: string;
};

const praises = ["أحسنت!", "رائع!", "ممتاز!", "إجابة موفّقة!", "يا لك من نبيه!"];

/**
 * Gentle quiz: a wrong pick never ends the round or shows a score penalty;
 * the child simply tries again. Stars reflect effort, 1 to 3.
 */
export function Quiz({
  questions,
  guide = "thaloob",
  bigOptions,
  onFinish,
  onRestart,
  finishTitle = "أكملت النشاط!",
}: {
  questions: QuizQuestion[];
  guide?: CharacterId;
  bigOptions?: boolean;
  onFinish?: (stars: number) => void;
  onRestart?: () => void;
  finishTitle?: string;
}) {
  const [index, setIndex] = useState(0);
  const [wrong, setWrong] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [firstTry, setFirstTry] = useState(0);
  const [finished, setFinished] = useState<number | null>(null);

  const q = questions[index];

  function choose(i: number) {
    if (solved) return;
    if (i === q.answer) {
      setSolved(true);
      if (wrong.length === 0) setFirstTry((n) => n + 1);
    } else if (!wrong.includes(i)) {
      setWrong((w) => [...w, i]);
    }
  }

  function next() {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setWrong([]);
      setSolved(false);
      return;
    }
    const ratio = firstTry / questions.length;
    const stars = ratio === 1 ? 3 : ratio >= 0.5 ? 2 : 1;
    setFinished(stars);
    onFinish?.(stars);
  }

  function restart() {
    setIndex(0);
    setWrong([]);
    setSolved(false);
    setFirstTry(0);
    setFinished(null);
    onRestart?.();
  }

  if (finished !== null) {
    return (
      <div className="relative flex flex-col items-center gap-4 rounded-xl bg-accent-soft px-6 py-10 text-center" role="status">
        <Celebration />
        <Character id={guide} height={170} decorative />
        <h3 className="text-3xl">{finishTitle}</h3>
        <p className="flex gap-1" aria-label={`حصلت على ${finished} من 3 نجوم`}>
          {[1, 2, 3].map((n) => (
            <Glyph key={n} name="star" size={44} className={cn("animate-pop", n <= finished ? "text-saffron drop-shadow-[0_3px_0_#d9942a]" : "text-navy/15")} style={{ animationDelay: `${n * 150}ms` }} />
          ))}
        </p>
        <p className="max-w-sm text-lg text-ink-soft">{finished === 3 ? "كل الإجابات من أول محاولة. مذهل!" : "أكملت كل الأسئلة. المحاولة هي أجمل ما في التعلّم."}</p>
        <Button variant="navy" onClick={restart}>
          <Glyph name="refresh" size={20} />
          العب مرة أخرى
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-soft ring-2 ring-navy/6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex flex-1 gap-1.5" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={index} aria-label="التقدم في الأسئلة">
          {questions.map((_, i) => (
            <span key={i} className={cn("h-2.5 flex-1 rounded-full transition-colors", i < index || (i === index && solved) ? "bg-accent" : i === index ? "bg-accent/40" : "bg-navy/10")} />
          ))}
        </div>
        <span className="font-display text-sm font-bold text-ink-soft">
          السؤال {index + 1} من {questions.length}
        </span>
      </div>

      <h3 className="text-center text-2xl sm:text-3xl">{q.prompt}</h3>
      {q.visual ? <div className="mt-5 flex justify-center">{q.visual}</div> : null}

      <div className={cn("mt-7 grid gap-3", bigOptions ? (q.options.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4") : "sm:grid-cols-2")}>
        {q.options.map((opt, i) => {
          const isRight = solved && i === q.answer;
          const isWrong = wrong.includes(i);
          return (
            <button
              key={`${index}-${i}`}
              type="button"
              onClick={() => choose(i)}
              disabled={isWrong || (solved && !isRight)}
              aria-label={isRight ? `${opt}، إجابة صحيحة` : isWrong ? `${opt}، حاول خيارًا آخر` : opt}
              className={cn(
                "relative flex items-center justify-center gap-2 rounded-lg px-4 font-display font-bold transition-all duration-200",
                bigOptions ? "min-h-28 text-5xl" : "min-h-16 text-xl",
                isRight
                  ? "bg-leaf text-white shadow-[0_5px_0_#3f7a24] scale-[1.03]"
                  : isWrong
                    ? "bg-navy/5 text-navy/35"
                    : solved
                      ? "bg-navy/5 text-navy/40"
                      : "bg-accent-soft text-navy shadow-[0_5px_0_rgb(31_42_92/0.12)] hover:-translate-y-0.5 active:translate-y-[3px] active:shadow-none",
              )}
            >
              {opt}
              {isRight ? <Glyph name="check" size={bigOptions ? 30 : 24} /> : null}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-6 min-h-[4.5rem]">
        {solved ? (
          <div className="flex animate-rise flex-wrap items-center justify-between gap-4 rounded-lg bg-[#e7f5dc] px-5 py-3">
            <p className="font-display text-lg font-bold text-[#2f6418]">
              {praises[index % praises.length]} {q.explain ? <span className="font-sans text-base font-medium text-ink">{q.explain}</span> : null}
            </p>
            <Button variant="navy" onClick={next} autoFocus>
              {index + 1 < questions.length ? "التالي" : "إنهاء"}
              <Glyph name="forward" size={18} />
            </Button>
          </div>
        ) : wrong.length > 0 ? (
          <p className="animate-rise rounded-lg bg-cream px-5 py-4 text-center font-display text-lg font-bold text-navy">قريب جدًا! جرّب خيارًا آخر.</p>
        ) : null}
      </div>
    </div>
  );
}
