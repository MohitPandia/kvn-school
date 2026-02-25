"use client";

import { useState } from "react";
import { schoolFullName, school } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="border-b border-border pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About Us
        </h1>
      </header>

      <div className="mt-8 space-y-12 text-muted-foreground">
        {/* Story block with mobile \"Read more\" */}
        <div
          className={cn(
            "relative space-y-8",
            !expanded && "max-h-[520px] overflow-hidden md:max-h-none md:overflow-visible"
          )}
        >
          <section>
            <p className="text-lg leading-relaxed">
              Established in May 1, 1997, {schoolFullName}, Bikaner was founded
              with a dream — a dream to build not just a school, but a nurturing
              space where children are guided, valued, and empowered to shape
              their own futures.
            </p>
          </section>

          <section>
            <p className="leading-relaxed">
              Under the visionary leadership of Director &amp; Principal{" "}
              <span className="font-medium text-foreground">
                Shri Ghanshyam Pandia,
              </span>{" "}
              the institution was built on the belief that education is not
              merely about textbooks and examinations, but about character,
              discipline, confidence, and compassion.
            </p>
          </section>

          <section>
            <p className="leading-relaxed">
              For more than two decades, the school has proudly delivered
              exceptional board examination results. Yet, our true success is
              not measured only by marks — it is reflected in the journeys of
              our students.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Our alumni today stand across the world:
            </h2>
            <ul className="list-none space-y-2 pl-0">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Working in global technology companies such as Google</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Building careers abroad</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Serving the nation in respected Government roles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Leading their own successful businesses and ventures</span>
              </li>
            </ul>
          </section>

          <section>
            <p className="leading-relaxed">
              Each success story carries a part of the foundation laid here — the
              guidance, personal attention, and unwavering belief that every
              child matters.
            </p>
          </section>

          <section>
            <p className="leading-relaxed">
              At {schoolFullName}, students are not just roll numbers — they are
              dreams entrusted to us by families. Shri Ghanshyam Pandia&apos;s
              philosophy has always been simple yet powerful:
            </p>
            <blockquote className="mt-4 border-l-4 border-primary bg-muted/50 py-2 pl-4 pr-4 italic text-foreground">
              Give every child the right direction, and they will find their own
              destiny.
            </blockquote>
          </section>

          <section>
            <p className="leading-relaxed">
              For 25+ years, this institution has stood as a symbol of
              dedication, discipline, and heartfelt mentorship in Bikaner.
            </p>
          </section>

          <footer className="pt-4">
            <p className="text-lg font-semibold text-foreground">
              We are not just shaping careers.
            </p>
            <p className="text-lg font-semibold text-primary">
              We are shaping lives.
            </p>
          </footer>

          {/* Soft fade at bottom when collapsed on mobile */}
          {!expanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent md:hidden" />
          )}
        </div>

        {/* Mobile-only toggle button */}
        <div className="flex justify-center md:hidden">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {expanded ? "Show less" : "Read full story"}
          </button>
        </div>

        {/* Contact & location (always visible) */}
        <section className="border-t border-border pt-10">
          <h2 className="text-xl font-semibold text-foreground">Find us</h2>
          <div className="mt-4 space-y-2 text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Mobile:</span>{" "}
              <a
                href={`tel:+91${school.phone}`}
                className="text-primary hover:underline"
              >
                {school.phone}
              </a>
            </p>
            <p>
              <span className="font-medium text-foreground">Email:</span>{" "}
              <a
                href={`mailto:${school.email}`}
                className="text-primary hover:underline"
              >
                {school.email}
              </a>
            </p>
            <p>
              <span className="font-medium text-foreground">Address:</span>{" "}
              {school.address}
            </p>
            <p className="text-sm">
              <span className="font-medium text-foreground">Location:</span>{" "}
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
