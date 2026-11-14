"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";
import { mainNav } from "@/data/navigation";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { stars } = useProgress();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-paper/95 shadow-[0_2px_0_rgb(31_42_92/0.06)] backdrop-blur-sm">
      <div className="container-page flex h-[4.5rem] items-center gap-3 lg:h-20">
        <Link href="/" aria-label="جمّول، الصفحة الرئيسية" className="-my-2 shrink-0 transition-transform duration-200 hover:scale-105">
          <Logo height={64} priority />
        </Link>

        <nav aria-label="التنقل الرئيسي" className="ms-4 hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-5 py-2.5 font-display text-base font-bold transition-colors",
                isActive(item.href) ? "bg-navy text-cream" : "text-navy hover:bg-cream",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/achievements"
            aria-label={`نجومي: ${stars}`}
            className="flex min-h-11 items-center gap-1.5 rounded-full bg-cream px-4 font-display font-bold text-navy transition-colors hover:bg-sand"
          >
            <Glyph name="star" size={20} className="text-amber" />
            <span suppressHydrationWarning>{stars}</span>
          </Link>
          <Button href="/parents" variant="primary" size="sm" className="hidden sm:inline-flex">
            دخول
          </Button>
          <button
            type="button"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full bg-navy text-cream lg:hidden"
          >
            <Glyph name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-menu" aria-label="القائمة" className="container-page animate-rise pb-5 lg:hidden">
          <ul className="grid gap-2 rounded-lg bg-cream p-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 items-center justify-between rounded-md px-5 font-display text-lg font-bold",
                    isActive(item.href) ? "bg-navy text-cream" : "bg-white text-navy",
                  )}
                >
                  {item.label}
                  <Glyph name="forward" size={20} />
                </Link>
              </li>
            ))}
            <li className="sm:hidden">
              <Button href="/parents" className="w-full" size="lg">
                دخول
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
