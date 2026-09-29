import type { ReactNode } from "react";

type Props = {
  /** Colored square shown before the title (a number, an icon…). */
  badge: ReactNode;
  /** Extra classes for the badge, typically its background color. */
  badgeClassName?: string;
  title: string;
  hint?: string;
  /** Optional action button shown at the end of the row. */
  action?: ReactNode;
};

/** Heading row of a content page: badge, title + hint, optional action. Compact on phones. */
export function PageHeader({ badge, badgeClassName = "", title, hint, action }: Props) {
  return (
    <header className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
      <span
        aria-hidden="true"
        className={[
          "flex size-12 shrink-0 items-center justify-center rounded-xl border-4 border-white text-2xl font-bold text-white shadow-md",
          "sm:size-16 sm:rounded-2xl sm:text-3xl",
          "dark:border-slate-800 dark:shadow-black/40",
          badgeClassName,
        ].join(" ")}
      >
        {badge}
      </span>

      <div className="min-w-0 flex-1 text-start">
        <h1 className="truncate text-xl sm:text-3xl">{title}</h1>
        {hint && (
          <p className="text-sm leading-snug text-slate-500 sm:text-base dark:text-slate-400">
            {hint}
          </p>
        )}
      </div>

      {action}
    </header>
  );
}
