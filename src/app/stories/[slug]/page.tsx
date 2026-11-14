import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryCover } from "@/components/features/StoryCover";
import { PageBody, SectionShell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";
import { Note } from "@/components/ui/States";
import { characterById } from "@/data/characters";
import { ageLabel, stories, storyBySlug, topicLabel } from "@/data/stories";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = storyBySlug((await params).slug);
  return { title: story?.title ?? "قصة" };
}

export default async function StoryPage({ params }: Props) {
  const story = storyBySlug((await params).slug);
  if (!story) notFound();
  const hero = characterById[story.hero];

  return (
    <SectionShell section="stories">
      <PageBody>
        <Link href="/stories" className="mb-6 inline-flex min-h-11 items-center gap-1 rounded-full bg-accent-soft pe-5 ps-3 font-display text-sm font-bold text-ink hover:brightness-95">
          <Glyph name="back" size={18} />
          كل القصص
        </Link>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative">
            <StoryCover story={story} priority className="aspect-[4/3] w-full -rotate-1 rounded-[1rem_2.5rem_2.5rem_1rem] shadow-lift" />
          </div>
          <div className="animate-rise">
            <p className="eyebrow">قصة · {topicLabel(story.topic)}</p>
            <h1 className="mt-1 text-4xl lg:text-5xl">{story.title}</h1>
            <p className="mt-4 text-xl text-ink-soft">{story.summary}</p>
            <dl className="mt-6 flex flex-wrap gap-3">
              {[
                { k: "العمر المناسب", v: ageLabel(story.age) },
                { k: "مدة القراءة", v: `${story.minutes} دقائق` },
                { k: "عدد الصفحات", v: String(story.pages.length) },
                { k: "البطل", v: hero.name },
              ].map((m) => (
                <div key={m.k} className="rounded-md bg-accent-soft px-4 py-2.5">
                  <dt className="text-xs text-ink-soft">{m.k}</dt>
                  <dd className="font-display font-bold text-ink">{m.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={`/stories/${story.slug}/read`} size="lg">
                <Glyph name="play" size={20} />
                ابدأ القراءة
              </Button>
            </div>
            <div className="mt-8">
              <Note>لا يتوفر تسجيل صوتي لهذه القصة حاليًا. إن كان جهازك يدعم القراءة الآلية بالعربية فسيظهر زر «اقرأ لي» داخل القصة.</Note>
            </div>
          </div>
        </div>
      </PageBody>
    </SectionShell>
  );
}
