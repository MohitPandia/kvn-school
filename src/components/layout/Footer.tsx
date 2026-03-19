"use client";

import Link from "next/link";
import { school } from "@/lib/constants";
import { useLocale } from "@/contexts/LocaleContext";
import { translations } from "@/lib/translations";

export function Footer() {
  const { locale } = useLocale();
  const t = translations[locale].footer;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <section>
          <h3 className="text-lg font-semibold text-foreground">{t.headingContact}</h3>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">{t.addressLabel}:</span>{" "}
              {school.address}
            </p>
            <p>
              <span className="font-medium text-foreground">{t.phoneLabel}:</span>{" "}
              <a href={`tel:+91${school.phone}`} className="text-primary hover:underline">
                {school.phone}
              </a>
            </p>
            <p>
              <span className="font-medium text-foreground">{t.emailLabel}:</span>{" "}
              <a href={`mailto:${school.email}`} className="text-primary hover:underline">
                {school.email}
              </a>
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-foreground">{t.headingQuickLinks}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/admission-enquiry" className="hover:text-foreground transition-colors">
                {t.quickLinks.admissionEnquiry}
              </Link>
            </li>
            <li>
              <Link href="/login/student" className="hover:text-foreground transition-colors">
                {t.quickLinks.studentLogin}
              </Link>
            </li>
            <li>
              <Link href="/login/teacher" className="hover:text-foreground transition-colors">
                {t.quickLinks.teacherLogin}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-foreground transition-colors">
                {t.quickLinks.aboutUs}
              </Link>
            </li>
            <li>
              <Link href="/academics" className="hover:text-foreground transition-colors">
                {t.quickLinks.academics}
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-foreground">{t.headingSchool}</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Krishna Vidhya Niketan Secondary School
          </p>
          <p className="text-sm text-muted-foreground">Bikaner, Rajasthan 334001</p>
        </section>
      </div>

      <div className="border-t border-border/70 py-4 text-center text-sm text-muted-foreground">
        <p>
          {"\u00A9"} {year} KVN Sec School. {t.rights}
        </p>
      </div>
    </footer>
  );
}
