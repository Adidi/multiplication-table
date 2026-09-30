import { useState } from 'react';
import { useParams } from 'wouter';
import { BackHomeLink } from '@/components/back-home-link';
import { ExerciseGrid } from '@/components/exercise-grid';
import { NumberNav } from '@/components/number-nav';
import { PageHeader } from '@/components/page-header';
import { ShuffleButton } from '@/components/shuffle-button';
import { useLocale } from '@/lib/i18n';
import { exercisesOf, shuffle } from '@/lib/shuffle';
import { NUMBERS, tileColor } from '@/lib/tile-colors';

export function NumberPage() {
	const { n } = useParams<{ n: string }>();
	const { t } = useLocale();
	const num = Number(n);

	// Page is remounted per number (keyed route), so this state is per number.
	const [round, setRound] = useState(0);
	const [exercises, setExercises] = useState(() => exercisesOf(num));

	function reshuffle() {
		setExercises(prev => shuffle(prev));
		setRound(r => r + 1);
	}

	if (!NUMBERS.includes(num)) {
		return (
			<section className="mx-auto w-full max-w-3xl px-4 py-8 text-center">
				<h1 className="text-4xl">{t('unknownNumber')}</h1>
				<BackHomeLink className="mt-8" />
			</section>
		);
	}

	return (
		<section className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pt-4 sm:pb-4">
			<PageHeader
				badge={num}
				badgeClassName={tileColor(num)}
				title={t('numberTitle', { n: num })}
				hint={t('numberHint')}
				action={<ShuffleButton onClick={reshuffle} />}
			/>

			<div className="pb-6">
				<ExerciseGrid exercises={exercises} round={round} />
			</div>

			<NumberNav current={num} />
		</section>
	);
}
