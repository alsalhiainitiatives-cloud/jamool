import type { Metadata, Viewport } from "next";
import "@fontsource/baloo-bhaijaan-2/arabic-500.css";
import "@fontsource/baloo-bhaijaan-2/arabic-700.css";
import "@fontsource/baloo-bhaijaan-2/arabic-800.css";
import "@fontsource/baloo-bhaijaan-2/latin-700.css";
import "@fontsource/tajawal/arabic-400.css";
import "@fontsource/tajawal/arabic-500.css";
import "@fontsource/tajawal/arabic-700.css";
import "@fontsource/tajawal/latin-500.css";
import "@fontsource/amiri/arabic-400.css";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: { default: "جمّول | عالم صغير لمغامرات كبيرة", template: "%s | جمّول" },
  description: "منصة جمّول التعليمية الترفيهية للأطفال: قصص، ألعاب، حروف وأرقام، رسم وتلوين، وقيم جميلة.",
};

export const viewport: Viewport = { themeColor: "#FFF4DE" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-cream"
        >
          انتقل إلى المحتوى
        </a>
        <ToastProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </ToastProvider>
      </body>
    </html>
  );
}
