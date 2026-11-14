import { AchievementsTeaser } from "@/components/home/AchievementsTeaser";
import { Adventures } from "@/components/home/Adventures";
import { Friends } from "@/components/home/Friends";
import { Hero } from "@/components/home/Hero";
import { SectionsWorld } from "@/components/home/SectionsWorld";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionsWorld />
      <Adventures />
      <Friends />
      <AchievementsTeaser />
    </>
  );
}
