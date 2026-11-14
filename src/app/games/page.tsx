import type { Metadata } from "next";
import { GameLibrary } from "@/components/features/GameLibrary";
import { PageHero } from "@/components/layout/PageHero";
import { PageBody, SectionShell } from "@/components/layout/Shell";

export const metadata: Metadata = { title: "الألعاب" };

export default function GamesPage() {
  return (
    <SectionShell section="games">
      <PageHero section="games" />
      <PageBody>
        <GameLibrary />
      </PageBody>
    </SectionShell>
  );
}
