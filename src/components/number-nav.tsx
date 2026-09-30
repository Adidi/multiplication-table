import { ChevronLeft, ChevronRight, LayoutGrid, Shuffle } from 'lucide-react';
import { Link } from 'wouter';
import { cn } from '@/lib/cn';
import { useLocale } from '@/lib/i18n';
import { NUMBERS, tileColor } from '@/lib/tile-colors';

type Props = {
	/** The number shown on the page. Omit (e.g. on the mix page) to hide prev/next. */
	current?: number;
	/** Hide the mix button (used on the mix page itself). */
	showMix?: boolean;
};

/**
 * Footer navigation for a number page: previous number, all numbers, next number.
 * Prev/next are hidden (but keep their space) at the ends of the list.
 */
export function NumberNav({ current, showMix = true }: Props) {
	const { t } = useLocale();
	const i = current === undefined ? -1 : NUMBERS.indexOf(current);
	const prev = i > 0 ? NUMBERS[i - 1] : null;
	const next = i >= 0 && i < NUMBERS.length - 1 ? NUMBERS[i + 1] : null;

	return (
		<nav
			aria-label={t('appTitle')}
			className={cn(
				'flex items-center justify-center gap-4 sm:mt-10',
				// Phones only: pinned to the bottom of the screen (or the page, when it is short), on a frosted bar
				'max-sm:sticky max-sm:bottom-0 max-sm:-mx-4 max-sm:mt-auto max-sm:px-4 max-sm:pt-3',
				'max-sm:pb-[max(0.75rem,env(safe-area-inset-bottom))]',
				'max-sm:bg-white/75 max-sm:backdrop-blur-md dark:max-sm:bg-slate-900/75'
			)}
		>
			<NumberLink num={prev} label={t('prevNumber')}>
				<ChevronLeft aria-hidden="true" className="size-6 rtl:-scale-x-100" />
				{prev}
			</NumberLink>

			<Link
				href="/"
				aria-label={t('allNumbers')}
				title={t('allNumbers')}
				className={cn(
					'flex size-12 items-center justify-center rounded-full border-2 shadow-sm transition active:scale-95',
					'border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50',
					'dark:border-slate-600 dark:bg-slate-800 dark:text-indigo-200 dark:hover:bg-slate-700'
				)}
			>
				<LayoutGrid aria-hidden="true" className="size-6" />
			</Link>

			{showMix && (
				<Link
					href="/mix"
					aria-label={t('mix')}
					title={t('mix')}
					className={cn(
						'flex size-12 items-center justify-center rounded-full border-4 border-white text-white shadow-md transition',
						'bg-linear-to-br from-rose-400 via-amber-400 to-sky-500',
						'hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
						'dark:border-slate-800 dark:shadow-black/40'
					)}
				>
					<Shuffle aria-hidden="true" className="size-6 drop-shadow-sm" />
				</Link>
			)}

			<NumberLink num={next} label={t('nextNumber')}>
				{next}
				<ChevronRight aria-hidden="true" className="size-6 rtl:-scale-x-100" />
			</NumberLink>
		</nav>
	);
}

function NumberLink({ num, label, children }: { num: number | null; label: string; children: React.ReactNode }) {
	const base =
		'flex h-12 w-20 items-center justify-center gap-0.5 rounded-full border-4 border-white text-xl font-bold text-white shadow-md transition dark:border-slate-800 dark:shadow-black/40';

	if (num === null) {
		// Keep the layout centered when there is no prev/next.
		return <span aria-hidden="true" className={cn(base, 'invisible')} />;
	}

	return (
		<Link
			href={`/number/${num}`}
			aria-label={`${label}: ${num}`}
			className={cn(base, 'hover:-translate-y-0.5 active:translate-y-0 active:scale-95', tileColor(num))}
		>
			{children}
		</Link>
	);
}
