export const mainNav = [
  { href: "/", label: "الرئيسية" },
  { href: "/explore", label: "استكشف" },
  { href: "/#sections", label: "الأقسام" },
  { href: "/achievements", label: "إنجازاتي" },
] as const;

export const footerNav = {
  platform: [
    { href: "/explore", label: "استكشف" },
    { href: "/achievements", label: "إنجازاتي" },
    { href: "/parents", label: "ركن أولياء الأمور" },
    { href: "/design-system", label: "نظام التصميم" },
  ],
  legal: [
    { href: "/privacy", label: "الخصوصية" },
    { href: "/terms", label: "الشروط" },
    { href: "/contact", label: "تواصل معنا" },
  ],
} as const;

export const owner = {
  name: "الجمعية الأهلية الصالحية",
  place: "عنيزة، المملكة العربية السعودية",
} as const;
