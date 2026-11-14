"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toIndic, type Surah } from "@/data/surahs";
import { cn } from "@/lib/cn";

/** Verse-by-verse view with a simple memorisation aid (hide, then reveal). */
export function SurahReader({ surah }: { surah: Surah }) {
  const [practice, setPractice] = useState(false);
  const [revealed, setRevealed] = useState<number[]>([]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-ink-soft">{practice ? "اقرأ الآية من حفظك، ثم اضغط عليها لتتأكد." : "اقرأ بهدوء، آية آية."}</p>
        <Button
          variant={practice ? "navy" : "soft"}
          size="sm"
          aria-pressed={practice}
          onClick={() => {
            setPractice(!practice);
            setRevealed([]);
          }}
        >
          {practice ? "إظهار كل الآيات" : "وضع الحفظ"}
        </Button>
      </div>

      <div className="rounded-xl bg-white px-5 py-8 shadow-soft ring-2 ring-accent/25 sm:px-10 sm:py-12">
        {surah.basmala ? <p className="mb-8 text-center font-quran text-3xl leading-[2.2] text-accent-text sm:text-4xl">{surah.basmala}</p> : null}
        <ol className="grid gap-3">
          {surah.ayahs.map((a) => {
            const hidden = practice && !revealed.includes(a.number);
            const body = (
              <>
                <span className={cn("transition-[filter,opacity] duration-300", hidden && "select-none opacity-40 blur-[9px]")} aria-hidden={hidden}>
                  {a.text}
                </span>{" "}
                <span className="whitespace-nowrap text-accent-text">﴿{toIndic(a.number)}﴾</span>
              </>
            );
            return (
              <li key={a.number} lang="ar" className="font-quran text-[1.6rem] leading-[2.3] text-ink sm:text-[2.4rem]">
                {practice ? (
                  <button
                    type="button"
                    onClick={() => setRevealed((r) => (r.includes(a.number) ? r.filter((n) => n !== a.number) : [...r, a.number]))}
                    aria-label={hidden ? `أظهر الآية ${a.number}` : `أخفِ الآية ${a.number}`}
                    className="w-full rounded-md px-3 text-start hover:bg-accent-soft"
                  >
                    {body}
                  </button>
                ) : (
                  <p className="px-3">{body}</p>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
