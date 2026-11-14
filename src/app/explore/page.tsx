import type { Metadata } from "next";
import { ExploreBrowser } from "@/components/features/ExploreBrowser";
import { SimpleHero } from "@/components/layout/SimpleHero";
import { PageBody } from "@/components/layout/Shell";

export const metadata: Metadata = { title: "استكشف" };

export default function ExplorePage() {
  return (
    <>
      <SimpleHero eyebrow="استكشف" title="كل المغامرات في مكان واحد" lead="قصص وألعاب وأنشطة جاهزة الآن. اختر عمرك وابدأ بما يعجبك." character="jamool" />
      <PageBody>
        <ExploreBrowser />
      </PageBody>
    </>
  );
}
