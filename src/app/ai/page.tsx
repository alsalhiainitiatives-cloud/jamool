import type { Metadata } from "next";
import { ZizouLab } from "@/components/features/ZizouLab";
import { PageHero } from "@/components/layout/PageHero";
import { PageBody, SectionHeading, SectionShell } from "@/components/layout/Shell";
import { Glyph } from "@/components/ui/Glyph";

export const metadata: Metadata = { title: "عالم زيزو الذكي" };

const safety = [
  { title: "أفكار مُراجَعة", text: "كل ما يقترحه زيزو الآن مكتوب ومُراجَع مسبقًا، ويُركَّب على جهازك." },
  { title: "بلا بيانات شخصية", text: "لا نطلب اسمًا ولا صورة ولا أي معلومة عن الطفل." },
  { title: "ولي الأمر أولًا", text: "المحادثة الذكية لن تُفعَّل إلا بموافقة ولي الأمر وضوابط واضحة." },
];

export default function AiPage() {
  return (
    <SectionShell section="ai">
      <PageHero section="ai" lead="مختبر أفكار صغير: اختر بطلًا ومكانًا، وزيزو يركّب لك بداية قصة أو نشاطًا تجرّبه." />
      <PageBody>
        <ZizouLab />

        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-xl bg-white p-6 ring-2 ring-dashed ring-navy/20 sm:p-8">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-1.5 font-display text-sm font-bold text-ink-soft">
              <Glyph name="lock" size={16} />
              غير متاح بعد
            </p>
            <h2 className="text-2xl">المحادثة مع زيزو</h2>
            <p className="mt-2 text-ink-soft">
              المساعد الذكي الحقيقي لم يُربط بالمنصة حتى الآن. ما تراه في الأعلى مولّد أفكار بسيط يعمل دون اتصال، وليس ذكاءً اصطناعيًا.
            </p>
            <label className="mt-5 block">
              <span className="sr-only">اسأل زيزو</span>
              <input disabled placeholder="اسأل زيزو… (قريبًا)" className="min-h-14 w-full rounded-full bg-cream px-6 text-lg text-ink-soft placeholder:text-ink-soft/70 disabled:cursor-not-allowed" />
            </label>
          </div>
          <div>
            <SectionHeading eyebrow="الأمان" title="كيف نحافظ على سلامة طفلك؟" />
            <ul className="grid gap-3">
              {safety.map((s) => (
                <li key={s.title} className="flex gap-4 rounded-lg bg-accent-soft px-5 py-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-deep text-white">
                    <Glyph name="check" size={20} />
                  </span>
                  <span>
                    <strong className="block font-display text-lg">{s.title}</strong>
                    <span className="text-ink-soft">{s.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </PageBody>
    </SectionShell>
  );
}
