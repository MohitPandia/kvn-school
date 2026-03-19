"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Locale } from "@/lib/translations";

const STORAGE_KEY = "kvn-school-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getStoredLocale(): Locale {
  if (typeof globalThis.window === "undefined") return "en";
  const stored = globalThis.localStorage.getItem(STORAGE_KEY);
  if (stored === "hi" || stored === "en") return stored;
  return "en";
}

export function LocaleProvider(props: {
  readonly children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getStoredLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof globalThis.window !== "undefined") {
      globalThis.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next === "hi" ? "hi" : "en";
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.lang = locale === "hi" ? "hi" : "en";
    }
  }, [mounted, locale]);

  const value = useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>
      {props.children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
