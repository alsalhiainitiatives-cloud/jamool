"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Chips } from "@/components/ui/Chips";
import { puppetAnimationLabels, puppetAnimations, type PuppetAnimation } from "@/lib/animation/rig-types";
import { PuppetCharacter } from "./PuppetCharacter";

const speeds = [
  { value: "0.5", label: "بطيء" },
  { value: "1", label: "عادي" },
  { value: "1.5", label: "سريع" },
] as const;
const sizes = [
  { value: "200", label: "صغير" },
  { value: "360", label: "متوسط" },
  { value: "520", label: "كبير" },
] as const;

/** Preview bench for the puppet: pick a state, speed and size, play or pause. */
export function PuppetLab() {
  const [animation, setAnimation] = useState<PuppetAnimation>("idle");
  const [speed, setSpeed] = useState<(typeof speeds)[number]["value"]>("1");
  const [size, setSize] = useState<(typeof sizes)[number]["value"]>("360");
  const [paused, setPaused] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  // CSS animations have no speed property: set the playback rate on each one.
  useEffect(() => {
    const rate = Number(speed);
    const id = requestAnimationFrame(() => {
      for (const a of stage.current?.getAnimations({ subtree: true }) ?? []) a.playbackRate = rate;
    });
    return () => cancelAnimationFrame(id);
  }, [speed, animation, size]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
      <div ref={stage} className="flex min-h-[34rem] items-end justify-center rounded-[2rem] bg-white/8 p-6 ring-1 ring-white/15">
        <PuppetCharacter character="jamool" animation={animation} size={Number(size)} paused={paused} />
      </div>
      <div className="space-y-6">
        <div>
          <h2 className="mb-3 font-display text-lg font-bold">الحركة</h2>
          <Chips label="الحركة" value={animation} onChange={setAnimation} options={puppetAnimations.map((a) => ({ value: a, label: puppetAnimationLabels[a] }))} />
        </div>
        <div>
          <h2 className="mb-3 font-display text-lg font-bold">السرعة</h2>
          <Chips label="السرعة" value={speed} onChange={setSpeed} options={[...speeds]} />
        </div>
        <div>
          <h2 className="mb-3 font-display text-lg font-bold">الحجم</h2>
          <Chips label="الحجم" value={size} onChange={setSize} options={[...sizes]} />
        </div>
        <Button type="button" variant="soft" onClick={() => setPaused((p) => !p)}>
          {paused ? "تشغيل" : "إيقاف مؤقت"}
        </Button>
      </div>
    </div>
  );
}
