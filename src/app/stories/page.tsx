import type { Metadata } from "next";
import { StoryBrowser } from "@/components/features/StoryBrowser";
import { PageHero } from "@/components/layout/PageHero";
import { PageBody, SectionShell } from "@/components/layout/Shell";
import { Note } from "@/components/ui/States";

export const metadata: Metadata = { title: "القصص" };

export default function StoriesPage() {
  return (
    <SectionShell section="stories">
      <PageHero section="stories" />
      <PageBody>
        <StoryBrowser />
        <div className="mt-12 max-w-2xl">
          <Note>القصص المعروضة نماذج أولية كُتبت لتجربة المنصة، وستُستبدل بمحتوى يراجعه الفريق التربوي قبل الإطلاق.</Note>
        </div>
      </PageBody>
    </SectionShell>
  );
}
