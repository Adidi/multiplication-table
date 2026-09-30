import { Shuffle } from 'lucide-react';
import { cn } from '@/utils';
import { useLocale } from '@/providers/i18n';

type Props = { onClick: () => void; className?: string };

export function ShuffleButton({ onClick, className }: Props) {
	const { t } = useLocale();
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={t('shuffle')}
			title={t('shuffle')}
			className={cn(
				'group flex size-10 shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition active:scale-95 sm:size-12',
				'border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50',
				'dark:border-slate-600 dark:bg-slate-800 dark:text-indigo-200 dark:hover:bg-slate-700',
				'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-yellow-300',
				className
			)}
		>
			<Shuffle
				aria-hidden="true"
				className="size-5 transition-transform duration-300 group-hover:rotate-12 group-active:rotate-180 sm:size-6"
			/>
		</button>
	);
}
