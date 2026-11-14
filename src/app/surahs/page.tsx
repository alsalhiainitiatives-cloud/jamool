import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { PageBody, SectionShell } from "@/components/layout/Shell";
import { Glyph } from "@/components/ui/Glyph";
import { Note } from "@/components/ui/States";
import { surahSource, surahs, toIndic } from "@/data/surahs";

export const metadata: Metadata = { title: "قصار السور" };

export default function SurahsPage() {
  return (
    <SectionShell section="surahs">
      <PageHero section="surahs" />
      <PageBody>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {surahs.map((s) => (
            <li key={s.number}>
              <Link
                href={`/surahs/${s.slug}`}
                className="group flex items-center gap-4 rounded-lg bg-white p-4 shadow-soft ring-2 ring-navy/6 transition-all duration-300 hover:-translate-y-1 hover:bg-accent-soft hover:shadow-lift"
              >
                <span className="relative grid size-16 shrink-0 place-items-center">
                  <svg aria-hidden viewBox="0 0 64 64" className="absolute inset-0 text-accent transition-transform duration-700 group-hover:rotate-45">
                    <rect x="9" y="9" width="46" height="46" rx="6" fill="currentColor" />
                    <rect x="9" y="9" width="46" height="46" rx="6" fill="currentColor" transform="rotate(45 32 32)" />
                  </svg>
                  <span className="relative font-display text-lg font-extrabold text-white">{toIndic(s.number)}</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-2xl font-bold text-ink">سورة {s.name}</span>
                  <span className="text-sm text-ink-soft">
                    {s.revelation} · {toIndic(s.ayahs.length)} آيات
                  </span>
                </span>
                <Glyph name="forward" size={20} className="text-accent-text transition-transform group-hover:-translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid max-w-3xl gap-3">
          <Note>
            مصدر النص: {surahSource.text} (<bdi dir="ltr">{surahSource.url}</bdi>)، وقد أُدرج كما هو دون أي تعديل. يُراجَع العرض من جهة شرعية مختصة قبل الإطلاق.
          </Note>
          <Note>التلاوة الصوتية غير متاحة حاليًا، وستُضاف من تسجيلات معتمدة وموثوقة.</Note>
        </div>
      </PageBody>
    </SectionShell>
  );
}
