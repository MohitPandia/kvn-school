"use client";

import { useState, useCallback, useEffect } from "react";

export interface UseCarouselOptions {
  /** Total number of slides */
  total: number;
  /** Auto-advance interval in ms; 0 = off */
  intervalMs?: number;
  /** Whether to loop after last slide */
  loop?: boolean;
}

export function useCarousel({ total, intervalMs = 5000, loop = true }: UseCarouselOptions) {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (i: number) => {
      if (total <= 0) return;
      setIndex(loop ? ((i % total) + total) % total : Math.max(0, Math.min(i, total - 1)));
    },
    [total, loop]
  );

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    if (total <= 0 || intervalMs <= 0) return;
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [total, intervalMs, index, next]);

  return { index, setIndex: goTo, next, prev };
}
