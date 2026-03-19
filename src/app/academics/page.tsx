"use client";

import { useLocale } from "@/contexts/LocaleContext";
import { translations } from "@/lib/translations";

export default function AcademicsPage() {
  const { locale } = useLocale();
  const t = translations[locale].academics;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
      <p className="mt-4 text-muted-foreground">{t.comingSoon}</p>
    </div>
  );
}
