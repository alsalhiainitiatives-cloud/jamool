import type { Metadata } from "next";
import { Character } from "@/components/brand/Character";
import { SaduBand, SpeechBubble } from "@/components/brand/Decor";
import { SectionIcon } from "@/components/brand/SectionIcon";
import { SimpleHero } from "@/components/layout/SimpleHero";
import { PageBody, SectionHeading } from "@/components/layout/Shell";
import { Button } from "@/components/ui/Button";
import { EmptyState, ErrorState, LoadingState, Note } from "@/components/ui/States";
import { characters } from "@/data/characters";
import { sections } from "@/data/sections";

export const metadata: Metadata = { title: "نظام التصميم" };

const colors = [
  { name: "كحلي", token: "navy", hex: "#1F2A5C", dark: true },
  { name: "كريمي", token: "cream", hex: "#FFF4DE" },
  { name: "ورقي", token: "paper", hex: "#FFFAF0" },
  { name: "رملي", token: "sand", hex: "#F6E2B8" },
  { name: "زعفراني", token: "saffron", hex: "#FFC43D" },
  { name: "كهرماني", token: "amber", hex: "#F5A63A" },
  { name: "مرجاني", token: "coral", hex: "#F0563A", dark: true },
  { name: "فيروزي", token: "teal", hex: "#1E9E96", dark: true },
  { name: "أزرق", token: "blue", hex: "#2F7BEA", dark: true },
  { name: "بنفسجي", token: "violet", hex: "#8D6BE8", dark: true },
  { name: "أخضر", token: "leaf", hex: "#5DAA3A", dark: true },
  { name: "سماوي", token: "sky", hex: "#18A7C9", dark: true },
];

const type = [
  { label: "عنوان رئيسي · 6xl", cls: "font-display text-5xl font-extrabold sm:text-6xl", sample: "عالم صغير" },
  { label: "عنوان قسم · 4xl", cls: "font-display text-4xl font-bold", sample: "ماذا نكتشف اليوم؟" },
  { label: "عنوان بطاقة · 2xl", cls: "font-display text-2xl font-bold", sample: "ثعلوب وكنز الواحة" },
  { label: "نص تمهيدي · lg", cls: "text-lg text-ink-soft", sample: "مع جمّول، كل يوم حكاية جديدة، ولعبة ممتعة." },
  { label: "نص أساسي · base", cls: "text-base", sample: "نص القراءة الأساسي بخط «تجوّل» وارتفاع سطر مريح." },
  { label: "نص قرآني · Amiri", cls: "font-quran text-3xl leading-[2.2]", sample: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ" },
];

function Block({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <section className="mt-16 first:mt-0">
      <SectionHeading eyebrow={eyebrow} title={title} />
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <SimpleHero eyebrow="نظام التصميم" title="لغة جمّول البصرية" lead="الألوان والخطوط والمكوّنات التي تُبنى منها كل صفحات المنصة. مرجع للمصممين والمطورين." />
      <PageBody>
        <Block eyebrow="01" title="الألوان">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {colors.map((c) => (
              <li key={c.token} className="overflow-hidden rounded-lg ring-2 ring-navy/8">
                <span className={`flex h-24 items-end p-3 font-display font-bold ${c.dark ? "text-white" : "text-ink"}`} style={{ background: c.hex }}>
                  {c.name}
                </span>
                <span className="block bg-white px-3 py-2 text-xs" dir="ltr">
                  {c.token} · {c.hex}
                </span>
              </li>
            ))}
          </ul>
          <h3 className="mb-3 mt-8 text-xl">عوالم الأقسام</h3>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {sections.map((s) => (
              <li key={s.id} data-section={s.id} className="flex items-center gap-3 rounded-lg bg-accent-soft p-3">
                <SectionIcon id={s.id} size={56} />
                <span>
                  <span className="block font-display font-bold">{s.name}</span>
                  <span className="mt-1 flex gap-1.5">
                    <span className="size-5 rounded-full bg-accent" />
                    <span className="size-5 rounded-full bg-accent-deep" />
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <Block eyebrow="02" title="الخطوط">
          <ul className="grid gap-4">
            {type.map((t) => (
              <li key={t.label} className="grid gap-1 rounded-lg bg-white p-5 ring-2 ring-navy/6 sm:grid-cols-[14rem_1fr] sm:items-center">
                <span className="text-sm text-ink-soft">{t.label}</span>
                <span className={t.cls}>{t.sample}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block eyebrow="03" title="الأزرار">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg">رئيسي كبير</Button>
            <Button>رئيسي</Button>
            <Button variant="navy">كحلي</Button>
            <Button variant="accent">لون القسم</Button>
            <Button variant="soft">ثانوي</Button>
            <Button variant="ghost">نصّي</Button>
            <Button disabled>معطّل</Button>
          </div>
          <p className="mt-4 text-sm text-ink-soft">أقل ارتفاع للمس ٤٤ بكسل، ويستجيب الزر عند الضغط بحركة نزول قصيرة.</p>
        </Block>

        <Block eyebrow="04" title="الانحناءات والظلال">
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl"].map((r) => (
              <li key={r} className={`grid h-24 place-items-center bg-white text-sm shadow-soft ring-2 ring-navy/6 ${r}`} dir="ltr">
                {r}
              </li>
            ))}
            {["blob-1", "blob-2", "blob-3", "blob-4"].map((b) => (
              <li key={b} className={`grid h-28 place-items-center bg-sand text-sm ${b}`} dir="ltr">
                {b}
              </li>
            ))}
          </ul>
        </Block>

        <Block eyebrow="05" title="الشخصيات">
          <ul className="flex flex-wrap items-end justify-around gap-6 rounded-xl bg-cream p-6">
            {characters.map((c) => (
              <li key={c.id} className="flex flex-col items-center gap-2 text-center">
                <Character id={c.id} height={170} />
                <span className="font-display text-lg font-bold">{c.name}</span>
                <span className="text-sm text-ink-soft">{c.role}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <SpeechBubble>فقاعة حوار</SpeechBubble>
            <span className="text-sm text-ink-soft">تُعرض الشخصيات بنسبها الأصلية دائمًا، دون قص أو تمديد.</span>
          </div>
        </Block>

        <Block eyebrow="06" title="الزخارف">
          <SaduBand />
          <p className="mt-3 text-sm text-ink-soft">شريط مستوحى من نقوش السدو، يُستخدم فاصلًا بين المناطق الرئيسية فقط.</p>
        </Block>

        <Block eyebrow="07" title="الحالات">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl bg-white ring-2 ring-navy/6">
              <LoadingState />
            </div>
            <EmptyState title="حالة فارغة">لا يوجد محتوى هنا بعد.</EmptyState>
            <ErrorState title="حالة خطأ">حدث خطأ، حاول مرة أخرى.</ErrorState>
          </div>
          <div className="mt-6 max-w-xl">
            <Note>ملاحظة صادقة تُستخدم لتمييز المحتوى التجريبي أو غير المتاح.</Note>
          </div>
        </Block>
      </PageBody>
    </>
  );
}
