import type { Metadata } from "next";
import { AchievementsBoard } from "@/components/features/AchievementsBoard";
import { SimpleHero } from "@/components/layout/SimpleHero";
import { PageBody } from "@/components/layout/Shell";
import { Note } from "@/components/ui/States";

export const metadata: Metadata = { title: "إنجازاتي" };

export default function AchievementsPage() {
  return (
    <>
      <SimpleHero eyebrow="إنجازاتي" title="كل نجمة تحكي عن مغامرة" lead="هنا تجد النجوم والشارات التي جمعتها وأنت تقرأ وتلعب وتتعلّم." character="thaloob" />
      <PageBody>
        <AchievementsBoard />
        <div className="mx-auto mt-12 max-w-2xl">
          <Note>إنجازاتك محفوظة على هذا الجهاز فقط. لا نقارن بين الأطفال ولا نعرض قوائم ترتيب.</Note>
        </div>
      </PageBody>
    </>
  );
}
