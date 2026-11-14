"use client";

import { useState } from "react";
import { SectionIcon } from "@/components/brand/SectionIcon";
import { SectionHeading } from "@/components/layout/Shell";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Glyph } from "@/components/ui/Glyph";
import { EmptyState } from "@/components/ui/States";
import { badges, tracks } from "@/data/badges";
import { sectionById } from "@/data/sections";
import { resetProgress, useProgress } from "@/lib/progress";
import { BadgeMedal } from "./BadgeMedal";

export function AchievementsBoard() {
  const p = useProgress();
  const [confirm, setConfirm] = useState(false);
  const earned = badges.filter((b) => p.countPrefix(b.prefix) >= b.count).length;

  return (
    <>
      <dl className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "نجومي", value: p.stars, tone: "bg-[#fff0c4]", icon: "star" as const },
          { label: "نقاطي", value: p.points, tone: "bg-[#dbe9ff]", icon: "sparkle" as const },
          { label: `شاراتي من ${badges.length}`, value: earned, tone: "bg-[#e2f3d3]", icon: "check" as const },
        ].map((s, i) => (
          <div key={s.label} className={`flex items-center gap-4 p-6 ${s.tone} ${["blob-1", "blob-2", "blob-3"][i]}`}>
            <span className="grid size-14 place-items-center rounded-full bg-white text-amber">
              <Glyph name={s.icon} size={28} />
            </span>
            <div className="flex flex-col">
              <dd className="font-display text-5xl font-extrabold leading-none text-navy">{s.value}</dd>
              <dt className="font-display font-bold text-ink-soft">{s.label}</dt>
            </div>
          </div>
        ))}
      </dl>

      {p.ids.length === 0 ? (
        <div className="mt-10">
          <EmptyState title="رحلتك تبدأ الآن" action={<Button href="/explore">هيا نكتشف!</Button>}>
            اقرأ قصة أو العب لعبة، وستظهر نجومك هنا.
          </EmptyState>
        </div>
      ) : null}

      <section className="mt-16">
        <SectionHeading eyebrow="الشارات" title="شاراتي" lead="كل شارة تحكي عن شيء جميل جرّبته." />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {badges.map((b) => (
            <li key={b.id}>
              <BadgeMedal badge={b} earned={p.countPrefix(b.prefix) >= b.count} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <SectionHeading eyebrow="التقدم" title="أين وصلت؟" lead="تقدّم على مهلك. لا سباق هنا ولا ترتيب." />
        <ul className="grid gap-4 md:grid-cols-2">
          {tracks.map((t) => {
            const count = Math.min(p.countPrefix(t.prefix), t.total);
            return (
              <li key={t.section} data-section={t.section} className="flex items-center gap-4 rounded-lg bg-white p-5 ring-2 ring-navy/6">
                <SectionIcon id={t.section} size={64} />
                <div className="min-w-0 flex-1">
                  <p className="flex justify-between gap-2 font-display font-bold">
                    <span>{t.label}</span>
                    <span className="text-accent-deep">
                      {count} من {t.total}
                    </span>
                  </p>
                  <div className="mt-2 h-4 overflow-hidden rounded-full bg-accent-soft" role="progressbar" aria-label={`${t.label} في ${sectionById[t.section].name}`} aria-valuemin={0} aria-valuemax={t.total} aria-valuenow={count}>
                    <div className="h-full rounded-full bg-accent transition-[width] duration-700 ease-[var(--ease-soft)]" style={{ width: `${(count / t.total) * 100}%` }} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {p.ids.length > 0 ? (
        <div className="mt-14 text-center">
          <Button variant="ghost" size="sm" onClick={() => setConfirm(true)}>
            <Glyph name="refresh" size={18} />
            البدء من جديد
          </Button>
        </div>
      ) : null}

      <Dialog open={confirm} onClose={() => setConfirm(false)} title="البدء من جديد">
        <h2 className="pe-12 text-2xl">هل تريد مسح كل النجوم والشارات؟</h2>
        <p className="mt-2 text-ink-soft">سيُمسح التقدم المحفوظ على هذا الجهاز، ولا يمكن استرجاعه.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            variant="navy"
            onClick={() => {
              resetProgress();
              setConfirm(false);
            }}
          >
            نعم، ابدأ من جديد
          </Button>
          <Button variant="soft" onClick={() => setConfirm(false)}>
            إلغاء
          </Button>
        </div>
      </Dialog>
    </>
  );
}
