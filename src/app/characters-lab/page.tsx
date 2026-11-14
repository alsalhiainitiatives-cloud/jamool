import type { Metadata } from "next";
import { PuppetLab } from "@/components/animation/PuppetLab";
import { SimpleHero } from "@/components/layout/SimpleHero";
import { PageBody } from "@/components/layout/Shell";

export const metadata: Metadata = { title: "معمل تحريك الشخصيات", robots: { index: false } };

export default function CharactersLabPage() {
  return (
    <>
      <SimpleHero title="معمل تحريك الشخصيات" lead="معاينة دمية جمّول المتحركة: اختر الحركة والسرعة والحجم." />
      <PageBody>
        <PuppetLab />
      </PageBody>
    </>
  );
}
