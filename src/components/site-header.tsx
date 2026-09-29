import { House } from "lucide-react";
import { Link } from "wouter";
import { useLocale } from "../lib/i18n";
import { LanguagePicker } from "./language-picker";
import { ThemePicker } from "./theme-picker";

export function SiteHeader() {
  const { t } = useLocale();
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-4">
      <Link
        href="/"
        className="flex min-w-0 items-center gap-1.5 text-base font-bold whitespace-nowrap text-indigo-900 transition hover:opacity-80 min-[420px]:text-xl sm:gap-2 sm:text-3xl dark:text-indigo-100"
      >
        <House aria-hidden="true" className="size-5 shrink-0 min-[420px]:size-6 sm:size-8" />
        <span className="truncate">{t("appTitle")}</span>
      </Link>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <LanguagePicker />
        <ThemePicker />
      </div>
    </header>
  );
}
