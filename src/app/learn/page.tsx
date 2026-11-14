import type { Metadata } from "next";
import { LearnStudio } from "@/components/features/LearnStudio";
import { PageHero } from "@/components/layout/PageHero";
import { PageBody, SectionShell } from "@/components/layout/Shell";

export const metadata: Metadata = { title: "الحروف والأرقام" };

export default async function LearnPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab } = await searchParams;
  return (
    <SectionShell section="learn">
      <PageHero section="learn" />
      <PageBody>
        <LearnStudio initialTab={tab === "numbers" ? "numbers" : "letters"} />
      </PageBody>
    </SectionShell>
  );
}
