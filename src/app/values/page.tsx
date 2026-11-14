import type { Metadata } from "next";
import { ValuesGarden } from "@/components/features/ValuesGarden";
import { PageHero } from "@/components/layout/PageHero";
import { PageBody, SectionShell } from "@/components/layout/Shell";

export const metadata: Metadata = { title: "حديقة القيم" };

export default function ValuesPage() {
  return (
    <SectionShell section="values">
      <PageHero section="values" lead="أربع بذور تنتظرك: الصدق، والتعاون، والاحترام، والكرم. اختر التصرّف الأجمل لتزهر كل بذرة." />
      <PageBody>
        <ValuesGarden />
      </PageBody>
    </SectionShell>
  );
}
