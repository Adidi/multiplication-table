import { useEffect, useState, type ReactNode } from "react";
import { LocaleContext, type TranslateParams } from "./context";
import { DEFAULT_LANG, LANGS, isLang, type Lang, type StringKey } from "./langs";

const STORAGE_KEY = "mt-lang";

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
function interpolate(text: string, params?: TranslateParams): string {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (_, key: string) => String(params[key] ?? `{${key}}`));
}

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

  function t(key: StringKey, params?: TranslateParams) {
    return interpolate(strings[key], params);
  }

  return <LocaleContext value={{ lang, dir, t, setLang }}>{children}</LocaleContext>;
}
