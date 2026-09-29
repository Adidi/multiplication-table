import { createContext, useContext } from "react";
import type { Dir, Lang, StringKey } from "./langs";

export type TranslateParams = Record<string, string | number>;

export type LocaleContextValue = {
  lang: Lang;
  dir: Dir;
  t: (key: StringKey, params?: TranslateParams) => string;
  setLang: (lang: Lang) => void;
};

export const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
