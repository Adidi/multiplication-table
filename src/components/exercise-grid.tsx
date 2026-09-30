import type { Exercise } from '@/utils';
import { ExerciseTile } from '@/components/exercise-tile';

type Props = {
	exercises: Exercise[];
	/** Bump this to re-deal: every card flips back to its question and the entrance animation replays. */
	round?: number;
};

export function ExerciseGrid({ exercises, round = 0 }: Props) {
	return (
		/* Exercises always read left-to-right, even when the page is RTL. */
		<ul key={round} className="grid-ltr grid grid-cols-3 gap-4 sm:gap-6">
			{exercises.map((ex, i) => (
				<li key={`${ex.num1}x${ex.num2}`}>
					<ExerciseTile num1={ex.num1} num2={ex.num2} index={i} />
				</li>
			))}
		</ul>
	);
}
