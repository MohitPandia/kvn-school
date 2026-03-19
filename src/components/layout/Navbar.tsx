"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { schoolName, navItems } from "@/lib/constants";
import { useLocale } from "@/contexts/LocaleContext";
import { translations } from "@/lib/translations";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const t = translations[locale].nav;

  const switchLanguage = () => {
    setLocale(locale === "en" ? "hi" : "en");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-foreground hover:text-primary transition-colors"
        >
          <Image src="/logo.png" alt="" width={80} height={28} className="h-7 w-auto" />
          <span className="hidden sm:inline">{schoolName}</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t[item.labelKey]}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={switchLanguage}
              className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
            >
              {locale === "en" ? t.hindi : t.english}
            </button>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden hover:bg-accent"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border bg-background md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <ul className="flex flex-col gap-0 px-4 py-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t[item.labelKey]}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={switchLanguage}
              className="block w-full py-3 text-left text-sm font-medium text-primary hover:text-primary/90 transition-colors"
            >
              {locale === "en" ? t.hindi : t.english}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
