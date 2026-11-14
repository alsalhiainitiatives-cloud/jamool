import type { CSSProperties, ReactNode } from "react";
import { Character } from "@/components/brand/Character";
import { Sparkle, SpeechBubble } from "@/components/brand/Decor";
import { Button } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";
import type { CharacterId } from "@/lib/brand-assets";
import { cn } from "@/lib/cn";
import { HeroParallax } from "./HeroParallax";

/** A layer that drifts with the pointer; larger depth = closer to the viewer. */
function Layer({ depth, className, children }: { depth: number; className?: string; children: ReactNode }) {
  const style = {
    transform: `translate3d(calc(var(--px, 0) * ${-depth}px), calc(var(--py, 0) * ${-depth * 0.5}px), 0)`,
  } as CSSProperties;
  return (
    <div aria-hidden style={style} className={cn("pointer-events-none absolute transition-transform duration-500 ease-out will-change-transform", className)}>
      {children}
    </div>
  );
}

const stars = [
  [6, 10, 20, 0], [14, 26, 10, 1.1], [23, 8, 14, 2.3], [31, 20, 9, 0.6], [39, 6, 18, 1.7], [47, 15, 8, 2.9],
  [58, 5, 12, 0.3], [66, 19, 9, 2.1], [74, 9, 16, 1.4], [83, 23, 10, 0.9], [91, 7, 20, 2.6], [96, 30, 9, 1.9],
  [10, 40, 8, 0.4], [52, 30, 10, 1.2], [78, 36, 8, 2.4],
] as const;

function Palm({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 120 200" className={cn("absolute", className)} style={flip ? { transform: "scaleX(-1)" } : undefined} fill="currentColor">
      <path d="M57 200C60 150 58 110 66 62L74 64C68 112 72 150 71 200Z" />
      <path d="M68 66C50 40 26 36 4 46C28 42 48 52 62 70ZM70 64C64 34 44 14 20 10C42 20 56 40 62 66ZM70 64C74 34 92 14 116 12C96 22 82 42 78 68ZM72 66C92 44 112 44 120 56C106 50 90 56 78 72ZM68 70C46 62 26 70 14 88C30 76 50 74 66 78Z" />
    </svg>
  );
}

function Friend({ id, className, float }: { id: CharacterId; className: string; float?: boolean }) {
  return (
    <div className={cn("absolute", className)}>
      <Character id={id} priority float={float} className="h-full w-auto" sizes="(min-width: 1024px) 300px, 150px" />
    </div>
  );
}

export function Hero() {
  return (
    <HeroParallax className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#161d4a_0%,#27307a_26%,#59409c_48%,#b9507f_68%,#f4874c_84%,#ffc43d_100%)] text-cream">
      {/* Sky */}
      <Layer depth={6} className="inset-0">
        {stars.map(([x, y, size, delay], i) => (
          <span key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
            <span className="block animate-twinkle text-[#fff3c4]" style={{ animationDelay: `${delay}s` }}>
              <Sparkle size={size} />
            </span>
          </span>
        ))}
      </Layer>
      {/* Sun on the horizon */}
      <Layer depth={14} className="bottom-[12%] left-1/2 w-[30rem] max-w-[92vw] -translate-x-1/2 lg:bottom-[14%] lg:left-[27%] lg:w-[38rem]">
        <div className="relative aspect-square animate-sun">
          <span className="absolute inset-0 rounded-full bg-[#ffd76a]/25" />
          <span className="absolute inset-[9%] rounded-full bg-[#ffd76a]/35" />
          <span className="absolute inset-[19%] rounded-full bg-[#ffe08a]" />
        </div>
      </Layer>

      {/* Far dune with fort and palms */}
      <Layer depth={18} className="inset-x-[-3%] bottom-0 h-[42%] text-[#4a2f7d] lg:h-[46%]">
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute inset-0 size-full">
          <path d="M0 400V190C150 130 300 110 470 150S760 240 960 170 1300 90 1440 140V400Z" fill="#8e3f86" />
        </svg>
        <svg viewBox="0 0 220 120" className="absolute bottom-[58%] right-[9%] w-36 lg:bottom-[52%] lg:left-[43%] lg:right-auto lg:w-52" fill="currentColor">
          <path d="M10 120V52H22V40H34V52H46V40H58V52H70V70H96V28H108V16H120V28H132V16H144V28H156V70H178V52H190V40H202V52H214V120Z" />
          <path d="M112 120V88A14 14 0 0 1 140 88V120Z" fill="#8e3f86" />
          <rect x="118" y="44" width="8" height="12" rx="4" fill="#ffc43d" />
          <rect x="188" y="74" width="7" height="10" rx="3.5" fill="#ffc43d" />
        </svg>
        <Palm className="bottom-[52%] left-[5%] h-32 lg:h-52" />
        <Palm flip className="bottom-[60%] left-[14%] hidden h-36 sm:block" />
        <Palm className="bottom-[40%] right-[2%] h-28 lg:h-44" />
      </Layer>

      {/* Middle and front dunes */}
      <Layer depth={26} className="inset-x-[-3%] bottom-0 h-[28%] lg:h-[32%]">
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="size-full">
          <path d="M0 300V120C180 40 360 30 560 90S900 190 1100 120 1360 60 1440 80V300Z" fill="#e8663c" />
          <path d="M0 300V190C220 110 420 120 640 170S1040 230 1240 170 1400 150 1440 160V300Z" fill="#f59a3a" />
        </svg>
      </Layer>

      {/* Copy */}
      <div className="container-page relative z-30 pb-4 pt-10 text-center sm:pt-14 lg:min-h-[46rem] lg:pt-20 lg:text-start">
        <div className="lg:max-w-[40rem]">
          <p className="mb-5 inline-flex animate-rise items-center gap-2 rounded-full bg-white/12 px-4 py-2 font-display text-sm font-bold text-cream ring-1 ring-white/25 backdrop-blur-sm">
            <Sparkle size={16} className="text-saffron" />
            منصة تعليمية ترفيهية للأطفال
          </p>
          <h1 className="animate-rise text-[2.9rem] leading-[1.12] font-extrabold drop-shadow-[0_4px_0_rgb(14_21_53/0.35)] [animation-delay:80ms] sm:text-6xl lg:text-7xl">
            عالم صغير…
            <span className="mt-1 block">
              لمغامرات <span className="relative inline-block text-saffron">
                كبيرة!
                <svg aria-hidden viewBox="0 0 200 18" preserveAspectRatio="none" className="absolute -bottom-2 start-0 h-3.5 w-full text-coral">
                  <path d="M4 12C40 2 80 16 114 8s58-4 82 2" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-md animate-rise text-xl font-bold text-cream/95 [animation-delay:160ms] lg:mx-0 lg:text-2xl">
            مع جمّول، كل يوم حكاية جديدة، ولعبة ممتعة، واكتشاف ينتظرك.
          </p>
          <div className="mt-8 flex animate-rise flex-wrap justify-center gap-4 [animation-delay:240ms] lg:justify-start">
            <Button href="/explore" size="lg" className="lg:min-h-16 lg:px-10 lg:text-xl">
              هيا نكتشف!
              <Glyph name="forward" size={22} />
            </Button>
            <Button href="#sections" variant="soft" size="lg" className="lg:min-h-16 lg:text-xl">
              استكشف الأقسام
            </Button>
          </div>
        </div>
      </div>

      {/* The friends */}
      <div className="relative z-20 mx-auto h-[23rem] w-full max-w-xl sm:h-[27rem] lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[56%] lg:max-w-none">
        <Layer depth={30} className="inset-0">
          <Friend id="maha" className="bottom-[17%] left-[1%] h-[47%] lg:bottom-[15%] lg:left-[3%] lg:h-[47%]" />
          <Friend id="noor" className="bottom-[30%] right-[0%] h-[27%] lg:bottom-[11%] lg:right-[2%] lg:h-[30%]" />
        </Layer>
        <Layer depth={38} className="inset-0">
          <Friend id="zizou" float className="right-[3%] top-[1%] h-[24%] lg:right-[10%] lg:top-[13%] lg:h-[22%]" />
          <Friend id="thaloob" className="bottom-[4%] right-[6%] h-[36%] lg:bottom-[5%] lg:right-[20%] lg:h-[38%]" />
        </Layer>
        <Layer depth={46} className="inset-0">
          <div className="absolute bottom-[3%] left-[19%] h-[88%] origin-bottom animate-wave lg:bottom-[3%] lg:left-[21%] lg:h-[80%]">
            <Character id="jamool" priority className="h-full w-auto" sizes="(min-width: 1024px) 420px, 230px" />
          </div>
        </Layer>
        <div className="absolute left-[2%] top-[6%] z-10 animate-pop [animation-delay:800ms] lg:left-[9%] lg:top-[15%]">
          <SpeechBubble>أهلًا يا صديقي!</SpeechBubble>
        </div>
      </div>

      {/* Nearest dune: carries the scene into the page */}
      <svg aria-hidden viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-px z-10 h-10 w-full sm:h-14 lg:h-20">
        <path d="M0 120V70C200 20 400 30 640 70S1100 110 1440 50V120Z" fill="#FFFAF0" />
      </svg>
    </HeroParallax>
  );
}
