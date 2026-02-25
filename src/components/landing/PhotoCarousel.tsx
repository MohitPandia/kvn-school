"use client";

import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import { carouselImages } from "@/lib/gallery";
import { cn } from "@/lib/utils";

export function PhotoCarousel() {
  const total = carouselImages.length;
  const { index, next, prev, setIndex } = useCarousel({
    total,
    intervalMs: 5000,
    loop: true,
  });

  if (total === 0) {
    return (
      <section className="bg-muted/30 py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-xl border border-dashed border-border bg-muted/20 py-16 text-center">
          <p className="text-muted-foreground">
            Add photos in <code className="rounded bg-muted px-1.5 py-0.5 text-sm">public/images/carousel/</code> and
            list them in <code className="rounded bg-muted px-1.5 py-0.5 text-sm">src/lib/gallery.ts</code>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted/30 py-12 px-4 sm:px-6" aria-label="School photos">
      <div className="mx-auto max-w-4xl">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
          {carouselImages.map((img, i) => (
            <div
              key={img.src + i}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                i === index ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
              aria-hidden={i !== index}
            >
              <Image
                src={img.src}
                alt={img.alt ?? `Slide ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority={i === 0}
              />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-2 px-4 text-sm text-white">
                  {img.caption}
                </div>
              )}
            </div>
          ))}

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                aria-label="Previous slide"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                aria-label="Next slide"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
                {carouselImages.map((img, i) => (
                  <button
                    key={`dot-${img.src}-${i}`}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === index ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/80"
                    )}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
