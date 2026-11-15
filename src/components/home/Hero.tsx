import { Sparkle } from "@/components/brand/Decor";
import { HeroVideo } from "./HeroVideo";
import { Button } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";
import { cn } from "@/lib/cn";

const stars: [number, number, number, number, string][] = [
  [4, 12, 22, 0, "text-saffron"], [12, 44, 12, 1.1, "text-cream"], [20, 8, 14, 2.3, "text-cream"],
  [29, 30, 10, 0.6, "text-saffron"], [71, 28, 10, 1.7, "text-cream"], [80, 9, 16, 2.9, "text-saffron"],
  [88, 40, 12, 0.3, "text-cream"], [95, 14, 22, 2.1, "text-cream"], [8, 70, 10, 1.4, "text-cream"], [93, 68, 12, 0.9, "text-saffron"],
];

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
        <div className="relative z-10 mt-8 flex animate-rise flex-wrap justify-center gap-4 [animation-delay:240ms]">
          <Button href="/explore" size="lg" className="lg:min-h-16 lg:px-10 lg:text-xl">
            هيا نكتشف!
            <Glyph name="forward" size={22} />
          </Button>
          <Button href="#sections" variant="soft" size="lg" className="lg:min-h-16 lg:text-xl">
            استكشف الأقسام
          </Button>
        </div>

        {/* The five friends as a short looping clip; edge to edge on small screens. */}
        <HeroVideo className="ms-[calc(50%-min(50vw,32rem))] -mt-2 w-[min(100vw,64rem)] sm:-mt-6 lg:-mt-8" />
      </div>
    </section>
  );
}
