import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Dune, SaduBand } from "@/components/brand/Decor";
import { footerNav, owner } from "@/data/navigation";
import { sections } from "@/data/sections";
import { illustrations } from "@/lib/brand-assets";

function FooterList({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="mb-3 text-lg text-saffron">{title}</h2>
      <ul className="grid gap-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex min-h-10 items-center text-cream/85 underline-offset-4 hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const lineup = illustrations.friendsLineup;
  return (
    <footer className="relative mt-20">
      <div className="container-page relative z-10 -mb-[5.5%] flex justify-center">
        <Image
          src={lineup.src}
          alt="جمّول وأصدقاؤه: ثعلوب وزيزو ونور ومها"
          width={lineup.width}
          height={lineup.height}
          sizes="(min-width: 1024px) 720px, 92vw"
          className="h-auto w-full max-w-[45rem]"
        />
      </div>
      <Dune fill="#1F2A5C" variant={2} className="-mb-px h-16 sm:h-24" />
      <div className="bg-navy text-cream">
        <div className="container-page grid gap-10 pb-10 pt-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo height={96} />
            <p className="mt-4 max-w-xs text-cream/85">عالم صغير لمغامرات كبيرة. منصة تعليمية ترفيهية آمنة للأطفال.</p>
          </div>
          <FooterList title="الأقسام" links={sections.map((s) => ({ href: s.href, label: s.name }))} />
          <FooterList title="المنصة" links={footerNav.platform} />
          <div>
            <FooterList title="معلومات" links={footerNav.legal} />
          </div>
        </div>
        <SaduBand height={20} />
        <div className="container-page flex flex-col gap-1 py-5 text-sm text-cream/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            منصة تابعة لـ{owner.name}، {owner.place}.
          </p>
          <p>© {new Date().getFullYear()} جمّول. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
