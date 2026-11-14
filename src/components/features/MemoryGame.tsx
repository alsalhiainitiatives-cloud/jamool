"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Sparkle } from "@/components/brand/Decor";
import { Character } from "@/components/brand/Character";
import { Button } from "@/components/ui/Button";
import { Celebration } from "@/components/ui/Celebration";
import { Chips } from "@/components/ui/Chips";
import { Glyph } from "@/components/ui/Glyph";
import { useToast } from "@/components/ui/Toast";
import { characters } from "@/data/characters";
import { sections } from "@/data/sections";
import { characterImages, sectionIcons, type Asset } from "@/lib/brand-assets";
import { cn } from "@/lib/cn";
import { completeActivity } from "@/lib/progress";
import { sample, shuffle } from "@/lib/random";

type Face = { id: string; label: string; img: Asset };
type Card = { key: number; face: Face };
type LevelId = "easy" | "medium" | "hard";

const faces: Face[] = [
  ...characters.map((c) => ({ id: c.id, label: c.name, img: characterImages[c.id] })),
  ...sections.filter((s) => s.id !== "ai").map((s) => ({ id: `icon-${s.id}`, label: s.name, img: sectionIcons[s.id] })),
];

const levels: Record<LevelId, { pairs: number; grid: string; label: string }> = {
  easy: { pairs: 3, grid: "grid-cols-3", label: "سهل · ٦ بطاقات" },
  medium: { pairs: 6, grid: "grid-cols-3 sm:grid-cols-4", label: "متوسط · ١٢ بطاقة" },
  hard: { pairs: 8, grid: "grid-cols-4", label: "متقدم · ١٦ بطاقة" },
};

const deal = (level: LevelId): Card[] => shuffle(sample(faces, levels[level].pairs).flatMap((face) => [face, face])).map((face, key) => ({ key, face }));

export function MemoryGame() {
  const [level, setLevel] = useState<LevelId>("easy");
  const [cards, setCards] = useState<Card[] | null>(null);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const toast = useToast();

  const start = (l: LevelId = level) => {
    window.clearTimeout(timer.current);
    setLevel(l);
    setCards(deal(l));
    setOpen([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const won = cards !== null && matched.length === levels[level].pairs;

  function flip(i: number) {
    if (!cards || open.length === 2 || open.includes(i) || matched.includes(cards[i].face.id)) return;
    const now = [...open, i];
    setOpen(now);
    if (now.length < 2) return;
    setMoves((m) => m + 1);
    const [a, b] = now.map((n) => cards[n].face.id);
    if (a === b) {
      const next = [...matched, a];
      setMatched(next);
      setOpen([]);
      if (next.length === levels[level].pairs) {
        const stars = level === "easy" ? 1 : level === "medium" ? 2 : 3;
        if (completeActivity(`game:memory-${level}`, stars)) toast(`فزت بالجولة! نجوم جديدة: ${stars}`);
      }
    } else {
      timer.current = window.setTimeout(() => setOpen([]), 950);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Chips label="مستوى اللعبة" value={level} onChange={(l) => (cards ? start(l) : setLevel(l))} options={(Object.keys(levels) as LevelId[]).map((l) => ({ value: l, label: levels[l].label }))} />
        {cards ? (
          <p className="font-display text-lg font-bold text-navy" aria-live="polite">
            المحاولات: {moves} · المطابقات: {matched.length} من {levels[level].pairs}
          </p>
        ) : null}
      </div>

      {!cards ? (
        <div className="flex flex-col items-center gap-5 rounded-xl bg-accent-soft px-6 py-12 text-center">
          <Character id="thaloob" height={200} decorative />
          <h3 className="text-2xl">هل تتذكّر أين اختبأ الأصدقاء؟</h3>
          <Button size="lg" onClick={() => start()}>
            <Glyph name="play" size={20} />
            ابدأ اللعب
          </Button>
        </div>
      ) : won ? (
        <div className="relative flex flex-col items-center gap-4 rounded-xl bg-accent-soft px-6 py-12 text-center" role="status">
          <Celebration />
          <Character id="thaloob" height={200} decorative />
          <h3 className="text-3xl">أحسنت! طابقت كل البطاقات</h3>
          <p className="text-lg text-ink-soft">أنهيت الجولة في {moves} محاولة.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => start()}>
              <Glyph name="refresh" size={20} />
              جولة جديدة
            </Button>
            {level !== "hard" ? (
              <Button variant="navy" onClick={() => start(level === "easy" ? "medium" : "hard")}>
                مستوى أعلى
              </Button>
            ) : null}
          </div>
        </div>
      ) : (
        <ul className={cn("mx-auto grid max-w-2xl gap-3 sm:gap-4", levels[level].grid)}>
          {cards.map((card, i) => {
            const isMatched = matched.includes(card.face.id);
            const faceUp = isMatched || open.includes(i);
            return (
              <li key={card.key} className="[perspective:900px]">
                <button
                  type="button"
                  onClick={() => flip(i)}
                  aria-label={faceUp ? card.face.label : `بطاقة مقلوبة رقم ${i + 1}`}
                  aria-disabled={isMatched}
                  className={cn(
                    "relative block aspect-[4/5] w-full rounded-lg transition-transform duration-500 ease-[var(--ease-soft)] [transform-style:preserve-3d] motion-reduce:transition-none",
                    faceUp && "[transform:rotateY(180deg)]",
                  )}
                >
                  <span className="absolute inset-0 grid place-items-center rounded-lg bg-accent-deep shadow-[0_5px_0_rgb(31_42_92/0.25)] [backface-visibility:hidden]">
                    <span className="absolute inset-2 rounded-md border-2 border-dashed border-white/35" />
                    <Sparkle size={34} className="text-saffron" />
                  </span>
                  <span
                    className={cn(
                      "absolute inset-0 grid place-items-center rounded-lg bg-white p-2 shadow-[0_5px_0_rgb(31_42_92/0.12)] ring-4 [backface-visibility:hidden] [transform:rotateY(180deg)]",
                      isMatched ? "ring-leaf" : "ring-accent-soft",
                    )}
                  >
                    <span className="relative block size-full">
                      <Image src={card.face.img.src} alt="" fill sizes="160px" className="object-contain" />
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {cards && !won ? (
        <div className="mt-6 text-center">
          <Button variant="ghost" onClick={() => start()}>
            <Glyph name="refresh" size={18} />
            ابدأ من جديد
          </Button>
        </div>
      ) : null}
    </div>
  );
}
