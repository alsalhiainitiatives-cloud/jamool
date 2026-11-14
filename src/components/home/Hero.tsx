import { Character } from "@/components/brand/Character";
import { Dune, Sparkle, SpeechBubble } from "@/components/brand/Decor";
import { Button } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="container-page relative z-10 grid items-center gap-2 pt-10 sm:pt-14 lg:min-h-[41rem] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-6">
        <div className="relative z-20 text-center lg:pb-40 lg:text-start">
          <p className="mb-4 inline-flex animate-rise items-center gap-2 rounded-full bg-white px-4 py-2 font-display text-sm font-bold text-navy ring-2 ring-navy/8">
            <Sparkle size={16} className="text-amber" />
            منصة تعليمية ترفيهية للأطفال
          </p>
          <h1 className="animate-rise text-[2.6rem] leading-[1.15] font-extrabold [animation-delay:80ms] sm:text-5xl lg:text-6xl">
            عالم صغير…
            <span className="relative mt-1 block w-fit max-lg:mx-auto">
              لمغامرات <span className="text-coral">كبيرة!</span>
              <svg aria-hidden viewBox="0 0 300 18" preserveAspectRatio="none" className="absolute -bottom-3 start-0 h-3.5 w-full text-saffron">
                <path d="M4 12C60 2 120 16 170 8s90-4 126 2" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-md animate-rise text-xl text-ink-soft [animation-delay:160ms] lg:mx-0">
            مع جمّول، كل يوم حكاية جديدة، ولعبة ممتعة، واكتشاف ينتظرك.
          </p>
          <div className="mt-8 flex animate-rise flex-wrap justify-center gap-4 [animation-delay:240ms] lg:justify-start">
            <Button href="/explore" size="lg">
              هيا نكتشف!
              <Glyph name="forward" size={20} />
            </Button>
            <Button href="#sections" variant="soft" size="lg">
              استكشف الأقسام
            </Button>
          </div>
        </div>

        <div className="relative mx-auto flex h-[23rem] w-full max-w-md items-end justify-center sm:h-[28rem] lg:h-[38rem] lg:max-w-none">
          <span aria-hidden className="absolute bottom-[18%] aspect-square w-[78%] max-w-[30rem] rounded-full bg-saffron" />
          <Sparkle size={30} className="absolute end-[6%] top-[14%] animate-twinkle text-navy" />
          <Sparkle size={18} className="absolute end-[20%] top-[4%] animate-twinkle text-coral [animation-delay:1.2s]" />
          <Sparkle size={22} className="absolute start-[4%] top-[30%] animate-twinkle text-teal [animation-delay:2s]" />
          <div className="absolute end-0 top-[3%] z-30 animate-pop [animation-delay:700ms] sm:end-[4%] lg:end-[2%] lg:top-[9%]">
            <SpeechBubble>أهلًا يا صديقي!</SpeechBubble>
          </div>
          <div className="relative z-20 mb-5 h-[90%] origin-bottom animate-wave sm:mb-8 lg:mb-12">
            <Character id="jamool" priority className="h-full w-auto" sizes="(min-width: 1024px) 380px, 240px" />
          </div>
        </div>
      </div>

      <Dune fill="#F9D58E" variant={2} className="absolute inset-x-0 bottom-6 h-24 sm:h-32 lg:h-40" />
      <Dune fill="#F6E2B8" variant={1} className="absolute inset-x-0 -bottom-px z-10 h-16 sm:h-24 lg:h-28" />
    </section>
  );
}
