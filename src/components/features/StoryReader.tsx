"use client";

import { useEffect, useState } from "react";
import { Character } from "@/components/brand/Character";
import { Button } from "@/components/ui/Button";
import { Celebration } from "@/components/ui/Celebration";
import { Glyph } from "@/components/ui/Glyph";
import { useToast } from "@/components/ui/Toast";
import type { Story } from "@/data/stories";
import { cn } from "@/lib/cn";
import { completeActivity } from "@/lib/progress";
import { useArabicSpeech } from "@/lib/speech";

const sizes = ["text-2xl leading-[2]", "text-3xl leading-[1.9]", "text-4xl leading-[1.8]"];

export function StoryReader({ story }: { story: Story }) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(1);
  const speech = useArabicSpeech();
  const toast = useToast();
  const total = story.pages.length;
  const ended = page === total;
  const { stop } = speech;

  function go(to: number) {
    stop();
    setPage(to);
    if (to === total && completeActivity(`story:${story.slug}`, 2)) toast("أنهيت القصة! نجمتان جديدتان");
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setPage((p) => (p < total - 1 ? p + 1 : p));
      if (e.key === "ArrowRight") setPage((p) => (p > 0 && p < total ? p - 1 : p));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Button href={`/stories/${story.slug}`} variant="ghost" size="sm">
          <Glyph name="back" size={18} />
          {story.title}
        </Button>
        <div className="flex items-center gap-2">
          {speech.available && !ended ? (
            <Button variant="soft" size="sm" onClick={() => (speech.speaking ? speech.stop() : speech.speak(story.pages[page]))} aria-pressed={speech.speaking}>
              <Glyph name={speech.speaking ? "stop" : "volume"} size={18} />
              {speech.speaking ? "إيقاف" : "اقرأ لي"}
            </Button>
          ) : null}
          <div className="flex items-center rounded-full bg-white ring-2 ring-navy/10" role="group" aria-label="حجم الخط">
            <button type="button" aria-label="تصغير الخط" disabled={size === 0} onClick={() => setSize(size - 1)} className="grid size-11 place-items-center rounded-full text-navy hover:bg-accent-soft disabled:opacity-30">
              <Glyph name="minus" size={18} />
            </button>
            <span aria-hidden className="px-1 font-display text-lg font-bold">
              أ
            </span>
            <button type="button" aria-label="تكبير الخط" disabled={size === sizes.length - 1} onClick={() => setSize(size + 1)} className="grid size-11 place-items-center rounded-full text-navy hover:bg-accent-soft disabled:opacity-30">
              <Glyph name="plus" size={18} />
            </button>
          </div>
        </div>
      </div>

      <article className="relative overflow-hidden rounded-[1rem_2.5rem_2.5rem_1rem] bg-white shadow-lift ring-2 ring-navy/6">
        <span aria-hidden className="absolute inset-y-0 start-0 w-4 bg-accent-soft" />
        {ended ? (
          <div className="relative flex min-h-[26rem] flex-col items-center justify-center gap-4 px-8 py-12 text-center" role="status">
            <Celebration />
            <Character id={story.hero} height={190} decorative />
            <h2 className="text-3xl">انتهت الحكاية!</h2>
            <p className="max-w-md rounded-lg bg-accent-soft px-6 py-4 font-display text-xl font-bold text-accent-deep">{story.lesson}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Button href="/stories">قصة أخرى</Button>
              <Button variant="soft" onClick={() => go(0)}>
                <Glyph name="refresh" size={18} />
                اقرأها من جديد
              </Button>
            </div>
          </div>
        ) : (
          <div key={page} className="flex min-h-[26rem] animate-rise flex-col justify-center px-8 py-12 ps-12 sm:px-14 sm:ps-16">
            <p className="mb-4 font-display text-sm font-bold text-accent-deep">
              صفحة {page + 1} من {total}
            </p>
            <p className={cn("font-medium text-navy", sizes[size])} aria-live="polite">
              {story.pages[page]}
            </p>
          </div>
        )}
      </article>

      {!ended ? (
        <div className="mt-6 flex items-center justify-between gap-4">
          <Button variant="soft" onClick={() => go(page - 1)} disabled={page === 0}>
            <Glyph name="back" size={18} />
            السابق
          </Button>
          <div className="hidden gap-2 sm:flex" aria-hidden>
            {story.pages.map((_, i) => (
              <span key={i} className={cn("size-3 rounded-full transition-colors", i === page ? "bg-accent-deep" : i < page ? "bg-accent" : "bg-navy/12")} />
            ))}
          </div>
          <Button variant={page === total - 1 ? "primary" : "navy"} onClick={() => go(page + 1)}>
            {page === total - 1 ? "النهاية" : "التالي"}
            <Glyph name="forward" size={18} />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
