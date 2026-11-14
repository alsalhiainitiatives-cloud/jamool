import type { CSSProperties } from "react";
import { Character } from "@/components/brand/Character";
import { Sparkle } from "@/components/brand/Decor";
import { Button } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";
import type { CharacterId } from "@/lib/brand-assets";
import { cn } from "@/lib/cn";

const stars: [number, number, number, number, string][] = [
  [4, 12, 22, 0, "text-saffron"], [12, 44, 12, 1.1, "text-cream"], [20, 8, 14, 2.3, "text-cream"],
  [29, 30, 10, 0.6, "text-saffron"], [71, 28, 10, 1.7, "text-cream"], [80, 9, 16, 2.9, "text-saffron"],
  [88, 40, 12, 0.3, "text-cream"], [95, 14, 22, 2.1, "text-cream"], [8, 70, 10, 1.4, "text-cream"], [93, 68, 12, 0.9, "text-saffron"],
];

/** One friend standing in the line-up, with a soft ground shadow. */
function Friend({ id, className, delay, float }: { id: CharacterId; className: string; delay: number; float?: boolean }) {
  return (
    <div className={cn("absolute bottom-0 flex flex-col items-center", className)}>
      <div className={cn("h-full", id === "jamool" ? null : float ? "animate-float" : "origin-bottom animate-wave")} style={{ animationDelay: `${delay}s` } as CSSProperties}>
        <Character id={id} priority animation="greeting" className="h-full w-auto" sizes="(min-width: 1024px) 340px, 170px" />
      </div>
      <span aria-hidden className="-mt-2 h-3 w-3/5 rounded-[50%] bg-navy-deep/45 blur-[6px]" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {stars.map(([x, y, size, delay, tone], i) => (
          <span key={i} className={cn("absolute animate-twinkle", tone)} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s` }}>
            <Sparkle size={size} />
          </span>
        ))}
      </div>

      <div className="container-page relative pt-10 text-center sm:pt-14 lg:pt-16">
        <p className="mb-5 inline-flex animate-rise items-center gap-2 rounded-full bg-white/12 px-4 py-2 font-display text-sm font-bold ring-1 ring-white/25">
          <Sparkle size={16} className="text-saffron" />
          مبادرة وطنية برعاية الجمعية الأهلية الصالحية بعنيزة
        </p>
        <h1 className="animate-rise text-[2.75rem] leading-[1.15] font-extrabold [animation-delay:80ms] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
          عالم صغير…{" "}
          <span className="whitespace-nowrap">
            لمغامرات{" "}
            <span className="relative inline-block text-saffron">
              كبيرة!
              <svg aria-hidden viewBox="0 0 200 18" preserveAspectRatio="none" className="absolute -bottom-2 start-0 h-3.5 w-full text-coral">
                <path d="M4 12C40 2 80 16 114 8s58-4 82 2" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl animate-rise text-xl font-bold text-ink-soft [animation-delay:160ms] lg:text-2xl">
          حكايات وألعاب واكتشافات تنتظرك.
        </p>
        <div className="mt-8 flex animate-rise flex-wrap justify-center gap-4 [animation-delay:240ms]">
          <Button href="/explore" size="lg" className="lg:min-h-16 lg:px-10 lg:text-xl">
            هيا نكتشف!
            <Glyph name="forward" size={22} />
          </Button>
          <Button href="#sections" variant="soft" size="lg" className="lg:min-h-16 lg:text-xl">
            استكشف الأقسام
          </Button>
        </div>

        {/* The five friends, poster style */}
        <div className="relative mx-auto mt-8 h-[21rem] max-w-[26rem] sm:h-[26rem] sm:max-w-2xl lg:mt-10 lg:h-[31rem] lg:max-w-5xl">
          <span aria-hidden className="absolute bottom-[6%] left-1/2 aspect-square h-[92%] -translate-x-1/2 rounded-full bg-saffron" />
          <span aria-hidden className="absolute bottom-[6%] left-1/2 aspect-square h-[92%] -translate-x-1/2 scale-[1.16] rounded-full ring-2 ring-dashed ring-saffron/45" />
          <Friend id="maha" delay={0.4} className="left-[-3%] h-[58%] sm:left-[2%] sm:h-[68%] lg:left-[0%] lg:h-[72%]" />
          <Friend id="thaloob" delay={1.2} className="left-[12%] z-30 h-[35%] sm:left-[19%] sm:h-[44%] lg:left-[17%] lg:z-10 lg:h-[58%]" />
          <Friend id="noor" delay={0.8} className="right-[9%] z-30 h-[29%] sm:right-[16%] sm:h-[38%] lg:right-[14%] lg:z-10 lg:h-[50%]" />
          <Friend id="zizou" float delay={0} className="bottom-[42%]! right-[-2%] h-[28%] sm:right-[3%] sm:h-[34%] lg:bottom-[34%]! lg:right-[0%] lg:h-[38%]" />
          <Friend id="jamool" delay={0} className="left-1/2 z-20 h-full -translate-x-1/2" />
        </div>
      </div>
    </section>
  );
}
