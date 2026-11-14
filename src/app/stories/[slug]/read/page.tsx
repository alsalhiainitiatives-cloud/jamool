import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryReader } from "@/components/features/StoryReader";
import { PageBody, SectionShell } from "@/components/layout/Shell";
import { stories, storyBySlug } from "@/data/stories";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = storyBySlug((await params).slug);
  return { title: story ? `قراءة: ${story.title}` : "قراءة" };
}

export default async function ReadPage({ params }: Props) {
  const story = storyBySlug((await params).slug);
  if (!story) notFound();
  return (
    <SectionShell section="stories">
      <PageBody>
        <StoryReader story={story} />
      </PageBody>
    </SectionShell>
  );
}
