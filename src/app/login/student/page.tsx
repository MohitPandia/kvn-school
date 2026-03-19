"use client";

import { useLocale } from "@/contexts/LocaleContext";
import { translations } from "@/lib/translations";

export default function StudentLoginPage() {
  const { locale } = useLocale();
  const t = translations[locale].login;

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-foreground">{t.studentTitle}</h1>
      <p className="mt-4 text-muted-foreground">{t.comingSoon}</p>
    </div>
  );
}
