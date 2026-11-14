"use client";

import { Character } from "@/components/brand/Character";
import { Sparkle } from "@/components/brand/Decor";
import { BadgeMedal } from "@/components/features/BadgeMedal";
import { Button } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";
import { badges } from "@/data/badges";
import { useProgress } from "@/lib/progress";

export function AchievementsTeaser() {
  const p = useProgress();
  const earned = badges.filter((b) => p.countPrefix(b.prefix) >= b.count).length;
  const fresh = p.ids.length === 0;

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-2xl bg-navy ring-2 ring-white/10 px-6 py-10 text-cream sm:px-10 lg:px-14 lg:py-14">
        <Sparkle size={26} className="absolute end-[8%] top-8 animate-twinkle text-saffron" />
        <Sparkle size={14} className="absolute end-[30%] top-14 animate-twinkle text-cream/60 [animation-delay:1.4s]" />
        <Sparkle size={18} className="absolute start-[42%] top-6 animate-twinkle text-cream/50 [animation-delay:2.2s]" />

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="mb-1 font-display text-sm font-bold text-saffron">إنجازاتي</p>
            <h2 className="text-3xl sm:text-4xl">{fresh ? "نجومك الأولى بانتظارك" : "أحسنت! رحلتك تكبر"}</h2>
            <p className="mt-3 max-w-md text-lg text-cream/85">
              كل قصة تقرؤها ونشاط تكمله يضيء نجمة جديدة. تقدّم على مهلك، فالمهم أن تستمتع.
            </p>

            <dl className="mt-7 flex flex-wrap gap-3" suppressHydrationWarning>
              {[
                { label: "نجمة", value: p.stars, icon: "star" as const },
                { label: "نقطة", value: p.points, icon: "sparkle" as const },
                { label: `شارة من ${badges.length}`, value: earned, icon: "check" as const },
              ].map((s) => (
                <div key={s.label} className="flex min-w-28 flex-1 flex-col rounded-lg bg-white/10 px-5 py-4 sm:flex-none">
                  <dt className="order-2 flex items-center gap-1.5 text-sm text-cream/80">
                    <Glyph name={s.icon} size={16} className="text-saffron" />
                    {s.label}
                  </dt>
                  <dd className="font-display text-4xl font-extrabold text-saffron" suppressHydrationWarning>
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/achievements">شاهد إنجازاتي</Button>
            </div>
          </div>

          <div className="relative">
            <ul className="grid grid-cols-3 gap-x-3 gap-y-6 lg:pe-44">
              {badges.map((b) => (
                <li key={b.id}>
                  <BadgeMedal badge={b} earned={p.countPrefix(b.prefix) >= b.count} onDark />
                </li>
              ))}
            </ul>
            <div className="absolute -bottom-20 -end-6 hidden lg:block">
              <Character id="thaloob" height={220} decorative />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
