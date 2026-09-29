import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import en from "./en.json";
import he from "./he.json";

// To add a language: drop a <code>.json next to en.json, then register it here.
export const LANGS = {
  he: { name: "עברית", dir: "rtl", strings: he },
  en: { name: "English", dir: "ltr", strings: en },
} as const satisfies Record<string, { name: string; dir: Dir; strings: Strings }>;

export type Lang = keyof typeof LANGS;
export type Dir = "ltr" | "rtl";
export type Strings = typeof en;
export type StringKey = keyof Strings;

const STORAGE_KEY = "mt-lang";
const DEFAULT_LANG: Lang = "he";

function isLang(v: unknown): v is Lang {
  return typeof v === "string" && v in LANGS;
}

function readStoredLang(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (isLang(v)) return v;
  } catch {
    // storage unavailable (private mode etc.)
  }
  return DEFAULT_LANG;
}

/** Replaces {name} placeholders: t("numberTitle", { n: 3 }). */
function interpolate(text: string, params?: Record<string, string | number>): string {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (_, key: string) => String(params[key] ?? `{${key}}`));
}

type LocaleContextValue = {
  lang: Lang;
  dir: Dir;
  t: (key: StringKey, params?: Record<string, string | number>) => string;
  setLang: (lang: Lang) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);
  const { dir, strings } = LANGS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  function setLang(next: Lang) {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }

  function t(key: StringKey, params?: Record<string, string | number>) {
    return interpolate(strings[key], params);
  }

  return <LocaleContext value={{ lang, dir, t, setLang }}>{children}</LocaleContext>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
