import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useLocale } from "../lib/i18n";

export function BackHomeLink({ className = "" }: { className?: string }) {
  const { t } = useLocale();
  return (
    <Link
      href="/"
      className={[
        "inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 font-bold shadow-sm transition active:scale-95",
        "border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50",
        "dark:border-slate-600 dark:bg-slate-800 dark:text-indigo-200 dark:hover:bg-slate-700",
        className,
      ].join(" ")}
    >
      {/* Points "back" in both directions: left in LTR, right in RTL */}
      <ArrowLeft aria-hidden="true" className="size-5 rtl:-scale-x-100" />
      {t("allNumbers")}
    </Link>
  );
}
