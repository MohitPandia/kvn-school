"use client";

import Image from "next/image";
import Link from "next/link";
import { schoolName, navItems } from "@/lib/constants";
import { useLocale } from "@/contexts/LocaleContext";
import { translations } from "@/lib/translations";

export function Hero() {
  const { locale } = useLocale();
  const home = translations[locale].home;
  const nav = translations[locale].nav;

  return (
    <section className="relative bg-gradient-to-b from-primary/5 via-background to-background py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt={schoolName}
            width={140}
            height={48}
            priority
            className="h-12 w-auto"
          />
        </div>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
          {home.schoolName}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{home.fullName}</p>
        <p className="mt-2 text-sm text-muted-foreground">{home.address}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {nav[item.labelKey]}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
