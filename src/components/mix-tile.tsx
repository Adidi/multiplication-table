import { Shuffle } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/cn';
import { useLocale } from '@/lib/i18n';
import { TileGloss } from '@/components/number-tile';

type Props = { index?: number };

/** Home-page tile that opens the mix page: random exercises from all the tables. */
export function MixTile({ index = 0 }: Props) {
	const { t } = useLocale();
	return (
		<div className="tile-enter @container h-full" style={{ '--i': index } as CSSProperties}>
			<Link
				href="/mix"
				className={cn(
					'relative flex h-full w-full items-center justify-center gap-3',
					'rounded-3xl border-4 border-white shadow-xl dark:border-slate-800 dark:shadow-black/40',
					'bg-linear-to-br from-rose-400 via-amber-400 to-sky-500 shadow-fuchsia-300',
					'text-white select-none',
					'transition-transform duration-200 ease-out',
					'hover:-translate-y-1 hover:scale-105 hover:shadow-2xl',
					'active:translate-y-0 active:scale-95',
					'focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-yellow-300'
				)}
			>
				{/* Mix tile is 2 columns wide, so cqw values are roughly half of the square tiles' */}
				<Shuffle aria-hidden="true" className="size-[16cqw] drop-shadow-md" />
				<span className="text-[14cqw] leading-none font-bold drop-shadow-md">{t('mix')}</span>
				<TileGloss />
			</Link>
		</div>
	);
}
