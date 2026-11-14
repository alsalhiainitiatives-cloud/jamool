import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SurahReader } from "@/components/features/SurahReader";
import { PageHero } from "@/components/layout/PageHero";
import { PageBody, SectionShell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";
import { Note } from "@/components/ui/States";
import { surahBySlug, surahSource, surahs, toIndic } from "@/data/surahs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return surahs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const surah = surahBySlug((await params).slug);
  return { title: surah ? `سورة ${surah.name}` : "سورة" };
}

export default async function SurahPage({ params }: Props) {
  const surah = surahBySlug((await params).slug);
  if (!surah) notFound();
  const i = surahs.indexOf(surah);
  const prev = surahs[i - 1];
  const next = surahs[i + 1];

  return (
    <SectionShell section="surahs">
      <PageHero
        section="surahs"
        title={`سورة ${surah.name}`}
        lead={`${surah.revelation} · ${toIndic(surah.ayahs.length)} آيات · ترتيبها في المصحف ${toIndic(surah.number)}`}
        back={{ href: "/surahs", label: "كل السور" }}
      />
      <PageBody className="max-w-4xl">
        <SurahReader surah={surah} />
        <nav aria-label="التنقل بين السور" className="mt-8 flex flex-wrap justify-between gap-3">
          {prev ? (
            <Button href={`/surahs/${prev.slug}`} variant="soft">
              <Glyph name="back" size={18} />
              سورة {prev.name}
            </Button>
          ) : (
            <span />
          )}
          {next ? (
            <Button href={`/surahs/${next.slug}`} variant="soft">
              سورة {next.name}
              <Glyph name="forward" size={18} />
            </Button>
          ) : null}
        </nav>
        <div className="mt-8 grid gap-3">
          <Note>
            مصدر النص: {surahSource.text} (<bdi dir="ltr">{surahSource.url}</bdi>) دون تعديل.
          </Note>
          <Note>التلاوة الصوتية ستُضاف لاحقًا من تسجيلات معتمدة.</Note>
        </div>
      </PageBody>
    </SectionShell>
  );
}
