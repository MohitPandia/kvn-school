"use client";

import { topBanner } from "@/lib/banner";

export function TopBanner() {
  const messageEn = topBanner.en;
  const messageHi = topBanner.hi;

  return (
    <div
      className="border-b border-primary/30 bg-primary text-primary-foreground"
      role="status"
      aria-live="polite"
      aria-label="Admission notice"
    >
      <div className="overflow-hidden whitespace-nowrap py-2">
        <div className="inline-block min-w-full animate-marquee px-4 text-center text-sm font-semibold tracking-wide hover:[animation-play-state:paused] focus-visible:[animation-play-state:paused]">
          {messageEn} {" | "} {messageHi}
        </div>
      </div>
    </div>
  );
}
