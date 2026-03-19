"use client";

import { useState } from "react";
import { school } from "@/lib/constants";
import { useLocale } from "@/contexts/LocaleContext";
import { translations } from "@/lib/translations";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  const [expanded, setExpanded] = useState(false);
  const { locale } = useLocale();
  const t = translations[locale].about;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="border-b border-border pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t.title}
        </h1>
      </header>

      <div className="mt-8 space-y-12 text-muted-foreground">
        <div
          className={cn(
            "relative space-y-8",
            !expanded &&
              "max-h-[520px] overflow-hidden md:max-h-none md:overflow-visible"
          )}
        >
          <section>
            <p className="text-lg leading-relaxed">{t.intro}</p>
          </section>

          <section>
            <p className="leading-relaxed">{t.leadership}</p>
          </section>

          <section>
            <p className="leading-relaxed">{t.results}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t.alumniHeading}
            </h2>
            <ul className="list-none space-y-2 pl-0">
              {t.alumni.map((text) => (
                <li key={text} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="leading-relaxed">{t.foundation}</p>
          </section>

          <section>
            <p className="leading-relaxed">{t.philosophyIntro}</p>
            <blockquote className="mt-4 border-l-4 border-primary bg-muted/50 py-2 pl-4 pr-4 italic text-foreground">
              {t.quote}
            </blockquote>
          </section>

          <section>
            <p className="leading-relaxed">{t.years}</p>
          </section>

          <footer className="pt-4">
            <p className="text-lg font-semibold text-foreground">
              {t.closing1}
            </p>
            <p className="text-lg font-semibold text-primary">
              {t.closing2}
            </p>
          </footer>

          {!expanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent md:hidden" />
          )}
        </div>

        <div className="flex justify-center md:hidden">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {expanded ? t.showLess : t.readMore}
          </button>
        </div>

        <section className="border-t border-border pt-10">
          <h2 className="text-xl font-semibold text-foreground">
            {t.findUs}
          </h2>
          <div className="mt-4 space-y-2 text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">{t.mobile}:</span>{" "}
              <a
                href={`tel:+91${school.phone}`}
                className="text-primary hover:underline"
              >
                {school.phone}
              </a>
            </p>
            <p>
              <span className="font-medium text-foreground">{t.email}:</span>{" "}
              <a
                href={`mailto:${school.email}`}
                className="text-primary hover:underline"
              >
                {school.email}
              </a>
            </p>
            <p>
              <span className="font-medium text-foreground">{t.address}:</span>{" "}
              {school.address}
            </p>
            <p className="text-sm">
              <span className="font-medium text-foreground">{t.location}:</span>{" "}
              {school.location.lat}, {school.location.lng}
            </p>
          </div>
          <div className="mt-6 overflow-hidden rounded-lg border border-border bg-muted/30">
            <iframe
              src={school.mapEmbedUrl}
              width="600"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Krishna Vidhya Niketan Sec School on Google Maps"
              className="h-[250px] w-full border-0 sm:h-[350px] md:h-[450px]"
            />
          </div>
        </section>
      </div>
    </article>
  );
}
