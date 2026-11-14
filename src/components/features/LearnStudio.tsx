"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/layout/Shell";
import { Button } from "@/components/ui/Button";
import { Chips, Tabs } from "@/components/ui/Chips";
import { Dialog } from "@/components/ui/Dialog";
import { Glyph } from "@/components/ui/Glyph";
import { useToast } from "@/components/ui/Toast";
import { letterForms, letters, levels, numbers, type Letter, type Level, type NumberCard } from "@/data/letters";
import { cn } from "@/lib/cn";
import { completeActivity } from "@/lib/progress";
import { sample, shuffle } from "@/lib/random";
import { useArabicSpeech } from "@/lib/speech";
import { Quiz, type QuizQuestion } from "./Quiz";

type Tab = "letters" | "numbers";
const tileColors = ["bg-[#ffe7bd]", "bg-[#dbe9ff]", "bg-[#ece4ff]", "bg-[#d5f0ea]", "bg-[#ffe0d6]", "bg-[#e2f3d3]"];

function StarRow({ count }: { count: number }) {
  return (
    <span className="flex max-w-xs flex-wrap justify-center gap-2" role="img" aria-label="نجوم للعدّ">
      {Array.from({ length: count }, (_, i) => (
        <Glyph key={i} name="star" size={42} className="text-saffron drop-shadow-[0_3px_0_#d9942a]" />
      ))}
    </span>
  );
}

function buildLetterQuiz(level: Level): QuizQuestion[] {
  const optionCount = level === "easy" ? 3 : 4;
  return sample(letters, 6).map((target) => {
    const others = sample(letters.filter((l) => l.char !== target.char), optionCount - 1);
    const options = shuffle([target, ...others]);
    return {
      prompt: `أين حرف «ال${target.name}»؟`,
      options: options.map((o) => o.char),
      answer: options.indexOf(target),
      explain: `${target.char} مثل «${target.word}».`,
    };
  });
}

function buildCountQuiz(level: Level): QuizQuestion[] {
  const max = level === "easy" ? 5 : 10;
  const optionCount = level === "easy" ? 3 : 4;
  const pool = numbers.filter((n) => n.value <= max);
  return sample(pool, Math.min(6, pool.length)).map((target) => {
    const options = shuffle([target, ...sample(pool.filter((n) => n.value !== target.value), optionCount - 1)]);
    return {
      prompt: "كم نجمة ترى؟",
      visual: <StarRow count={target.value} />,
      options: options.map((o) => o.indic),
      answer: options.indexOf(target),
      explain: `العدد ${target.indic} يُقرأ «${target.name}».`,
    };
  });
}

export function LearnStudio({ initialTab }: { initialTab: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [level, setLevel] = useState<Level>("easy");
  const [letter, setLetter] = useState<Letter | null>(null);
  const [number, setNumber] = useState<NumberCard | null>(null);
  const [quiz, setQuiz] = useState<{ key: number; questions: QuizQuestion[] } | null>(null);
  const speech = useArabicSpeech();
  const toast = useToast();

  const startQuiz = (t: Tab = tab, l: Level = level) =>
    setQuiz({ key: Date.now(), questions: t === "letters" ? buildLetterQuiz(l) : buildCountQuiz(l) });

  function switchTab(t: Tab) {
    setTab(t);
    setQuiz(null);
  }

  return (
    <>
      <div className="flex justify-center">
        <Tabs
          label="اختر ما تتعلمه"
          value={tab}
          onChange={switchTab}
          options={[
            { value: "letters", label: "الحروف" },
            { value: "numbers", label: "الأرقام" },
          ]}
        />
      </div>

      <section className="mt-10" aria-labelledby="cards-title">
        <SectionHeading eyebrow="البطاقات" title={tab === "letters" ? "حروفنا الثمانية والعشرون" : "الأرقام من ١ إلى ١٠"} lead="اضغط على أي بطاقة لتراها كبيرة." />
        {tab === "letters" ? (
          <ul className="grid grid-cols-4 gap-3 sm:grid-cols-7 sm:gap-4">
            {letters.map((l, i) => (
              <li key={l.char}>
                <button
                  type="button"
                  onClick={() => setLetter(l)}
                  aria-label={`حرف ال${l.name}`}
                  className={cn(
                    "grid aspect-square w-full place-items-center rounded-lg font-display text-4xl font-extrabold text-navy shadow-[0_5px_0_rgb(31_42_92/0.1)] transition-transform duration-200 ease-[var(--ease-bounce)] hover:-translate-y-1 hover:rotate-2 active:translate-y-1 sm:text-5xl",
                    tileColors[i % tileColors.length],
                  )}
                >
                  {l.char}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {numbers.map((n, i) => (
              <li key={n.value}>
                <button
                  type="button"
                  onClick={() => setNumber(n)}
                  aria-label={`الرقم ${n.name}`}
                  className={cn(
                    "flex w-full flex-col items-center rounded-lg px-3 py-5 text-navy shadow-[0_5px_0_rgb(31_42_92/0.1)] transition-transform duration-200 ease-[var(--ease-bounce)] hover:-translate-y-1 active:translate-y-1",
                    tileColors[i % tileColors.length],
                  )}
                >
                  <span className="font-display text-6xl font-extrabold leading-none">{n.indic}</span>
                  <span className="mt-2 font-display text-lg font-bold">{n.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-16" aria-label="نشاط تفاعلي">
        <SectionHeading eyebrow="نشاط" title={tab === "letters" ? "أين الحرف؟" : "عدّ النجوم"} lead="اختر المستوى المناسب لك ثم ابدأ. لا يوجد وقت ولا خسارة، جرّب كما تشاء." />
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <Chips
            label="المستوى"
            value={level}
            onChange={(l) => {
              setLevel(l);
              if (quiz) startQuiz(tab, l);
            }}
            options={levels}
          />
          {!quiz ? (
            <Button variant="accent" size="lg" onClick={() => startQuiz()}>
              <Glyph name="play" size={20} />
              ابدأ النشاط
            </Button>
          ) : null}
        </div>
        {quiz ? (
          <Quiz
            key={quiz.key}
            questions={quiz.questions}
            guide="jamool"
            bigOptions
            onRestart={() => startQuiz()}
            onFinish={(stars) => {
              if (completeActivity(`learn:${tab}`, stars)) toast(`نجوم جديدة: ${stars}`);
            }}
          />
        ) : null}
      </section>

      <Dialog open={letter !== null} onClose={() => setLetter(null)} title={letter ? `حرف ال${letter.name}` : "حرف"}>
        {letter ? (
          <div className="text-center">
            <p className="eyebrow">حرف ال{letter.name}</p>
            <p className="font-display text-[9rem] font-extrabold leading-[1.2] text-accent-deep">{letter.char}</p>
            <p className="font-display text-4xl font-bold">
              <span className="text-coral">{letter.word.charAt(0)}</span>
              {letter.word.slice(1)}
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {letterForms(letter).map((f) => (
                <li key={f.label} className="min-w-20 rounded-md bg-accent-soft px-3 py-2">
                  <span className="block font-display text-4xl font-bold leading-[1.5]">{f.text}</span>
                  <span className="text-xs text-ink-soft">{f.label}</span>
                </li>
              ))}
            </ul>
            {speech.available ? (
              <Button variant="soft" className="mt-6" onClick={() => speech.speak(`${letter.name}. ${letter.word}`)}>
                <Glyph name="volume" size={20} />
                استمع
              </Button>
            ) : null}
          </div>
        ) : null}
      </Dialog>

      <Dialog open={number !== null} onClose={() => setNumber(null)} title={number ? `الرقم ${number.name}` : "رقم"}>
        {number ? (
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow">{number.name}</p>
            <p className="font-display text-[9rem] font-extrabold leading-[1.1] text-accent-deep">{number.indic}</p>
            <p className="mb-5 font-display text-2xl font-bold text-ink-soft" dir="ltr">
              {number.value}
            </p>
            <StarRow count={number.value} />
            {speech.available ? (
              <Button variant="soft" className="mt-6" onClick={() => speech.speak(number.name)}>
                <Glyph name="volume" size={20} />
                استمع
              </Button>
            ) : null}
          </div>
        ) : null}
      </Dialog>
    </>
  );
}
