"use client";

import { useEffect, useRef, useState } from "react";
import { Character } from "@/components/brand/Character";
import { Button } from "@/components/ui/Button";
import { Chips, Tabs } from "@/components/ui/Chips";
import { Glyph } from "@/components/ui/Glyph";
import { ErrorState, LoadingState } from "@/components/ui/States";
import { useToast } from "@/components/ui/Toast";
import { characters } from "@/data/characters";
import { activityIdeas, heroIntro, ideaEvents, ideaPlaces, ideaQuestions } from "@/data/zizou-ideas";
import type { CharacterId } from "@/lib/brand-assets";
import { pick } from "@/lib/random";

type Mode = "story" | "activity";
type Idea = { kind: "story"; text: string; question: string } | { kind: "activity"; title: string; steps: readonly string[]; needs: string };
type State = { status: "idle" } | { status: "loading" } | { status: "ready"; idea: Idea } | { status: "error" };

function buildIdea(mode: Mode, hero: CharacterId, placeId: string): Idea {
  if (mode === "activity") {
    const a = pick(activityIdeas);
    return { kind: "activity", title: a.title, steps: a.steps, needs: a.needs };
  }
  const place = ideaPlaces.find((p) => p.id === placeId);
  if (!place) throw new Error("unknown place");
  return { kind: "story", text: `${heroIntro[hero]} ${place.phrase}، وفجأة ${pick(ideaEvents)}…`, question: pick(ideaQuestions) };
}

export function ZizouLab() {
  const [mode, setMode] = useState<Mode>("story");
  const [hero, setHero] = useState<CharacterId>("jamool");
  const [place, setPlace] = useState<string>(ideaPlaces[0].id);
  const [state, setState] = useState<State>({ status: "idle" });
  const timer = useRef<number | undefined>(undefined);
  const toast = useToast();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function generate() {
    setState({ status: "loading" });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      try {
        setState({ status: "ready", idea: buildIdea(mode, hero, place) });
      } catch {
        setState({ status: "error" });
      }
    }, 650);
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast("نُسخت الفكرة", "info");
    } catch {
      toast("تعذّر النسخ على هذا الجهاز", "info");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-xl bg-white p-6 shadow-soft ring-2 ring-navy/6 sm:p-8">
        <Tabs
          label="نوع الفكرة"
          value={mode}
          onChange={(m) => {
            setMode(m);
            setState({ status: "idle" });
          }}
          options={[
            { value: "story", label: "بداية قصة" },
            { value: "activity", label: "نشاط ممتع" },
          ]}
        />

        {mode === "story" ? (
          <div className="mt-7 grid gap-6">
            <div>
              <p className="mb-3 font-display font-bold">من بطل قصتك؟</p>
              <Chips label="بطل القصة" value={hero} onChange={setHero} options={characters.map((c) => ({ value: c.id, label: c.name }))} />
            </div>
            <div>
              <p className="mb-3 font-display font-bold">أين تدور الأحداث؟</p>
              <Chips label="مكان القصة" value={place} onChange={setPlace} options={ideaPlaces.map((p) => ({ value: p.id, label: p.label }))} />
            </div>
          </div>
        ) : (
          <p className="mt-7 text-lg text-ink-soft">زيزو يقترح عليك نشاطًا بسيطًا تجرّبه في البيت مع أسرتك، بعيدًا عن الشاشة.</p>
        )}

        <Button variant="accent" size="lg" className="mt-8 w-full sm:w-auto" onClick={generate} disabled={state.status === "loading"}>
          <Glyph name="sparkle" size={20} />
          {state.status === "ready" ? "فكرة أخرى" : "ابتكر لي فكرة"}
        </Button>
      </div>

      <div className="relative min-h-80 rounded-xl bg-accent-soft p-6 sm:p-8" aria-live="polite">
        {state.status === "idle" ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <Character id="zizou" height={170} float decorative />
            <p className="font-display text-xl font-bold text-navy">اختر ما يعجبك، ثم اضغط الزر!</p>
          </div>
        ) : null}
        {state.status === "loading" ? <LoadingState label="زيزو يركّب الفكرة…" /> : null}
        {state.status === "error" ? (
          <ErrorState title="لم أستطع تركيب الفكرة" action={<Button onClick={generate}>حاول مرة أخرى</Button>}>
            حدث خطأ غير متوقع. جرّب مرة ثانية.
          </ErrorState>
        ) : null}
        {state.status === "ready" ? (
          <div key={state.idea.kind === "story" ? state.idea.text : state.idea.title} className="animate-rise">
            <p className="eyebrow mb-2">{state.idea.kind === "story" ? "بداية قصتك" : "نشاط اليوم"}</p>
            {state.idea.kind === "story" ? (
              <>
                <p className="font-display text-2xl font-bold leading-[1.8] text-navy sm:text-3xl sm:leading-[1.7]">{state.idea.text}</p>
                <p className="mt-5 rounded-lg bg-white px-5 py-4 text-lg">
                  <strong className="font-display text-accent-deep">سؤال زيزو: </strong>
                  {state.idea.question}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/art" variant="navy">
                    ارسم قصتك
                  </Button>
                  <Button variant="soft" onClick={() => state.idea.kind === "story" && copy(state.idea.text)}>
                    انسخ البداية
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-3xl">{state.idea.title}</h3>
                <p className="mt-1 text-ink-soft">تحتاج إلى: {state.idea.needs}</p>
                <ol className="mt-5 grid gap-3">
                  {state.idea.steps.map((s, i) => (
                    <li key={s} className="flex gap-3 rounded-lg bg-white px-4 py-3 text-lg">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-deep font-display font-bold text-white">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
