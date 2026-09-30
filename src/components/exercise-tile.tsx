import { useState, type CSSProperties } from 'react';
import { cn } from '@/utils';
import { tileColor } from '@/data';
import { TileGloss } from '@/components/number-tile';

type Props = {
	num1: number;
	num2: number;
	/** Position in the grid, used to stagger the entrance animation. */
	index?: number;
};

/**
 * A flip card. Front shows the exercise ("3 × 4"); tapping flips it
 * horizontally to reveal the answer, with the exercise repeated small in the
 * top inline-start corner. Color is always taken from num1 so every tile of a
 * number matches that number's home tile.
 */
export function ExerciseTile({ num1, num2, index = 0 }: Props) {
	const [flipped, setFlipped] = useState(false);
	const exercise = `${num1} × ${num2}`;
	const answer = num1 * num2;

	const face = cn(
		'absolute inset-0 flex items-center justify-center backface-hidden',
		'rounded-3xl border-4 border-white shadow-xl dark:border-slate-800 dark:shadow-black/40',
		'text-white',
		tileColor(num1)
	);

	return (
		/* @container: text inside is sized in cqw, so it scales with the tile on small screens */
		<div className="tile-enter @container aspect-square" style={{ '--i': index } as CSSProperties}>
			<button
				type="button"
				onClick={() => setFlipped(f => !f)}
				aria-pressed={flipped}
				aria-label={flipped ? `${exercise} = ${answer}` : exercise}
				className={cn(
					'group relative h-full w-full cursor-pointer select-none perspective-distant',
					'rounded-3xl transition-transform duration-200 ease-out',
					'hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-95',
					'focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-yellow-300'
				)}
			>
				{/* Inner card: this is what actually rotates.
            pointer-events-none: only the flat outer button is hit-tested. Chrome's hit-testing of
            3D-rotated, backface-hidden faces is unreliable while the hover transform transitions,
            which made the hover state flicker after a flip. */}
				<span
					className={cn(
						'pointer-events-none absolute inset-0 block transform-3d transition-transform duration-700',
						'ease-[cubic-bezier(0.34,1.35,0.64,1)]',
						flipped ? 'rotate-y-180' : 'rotate-y-0'
					)}
				>
					{/* Front: the exercise */}
					<span className={face}>
						<span dir="ltr" className="text-[24cqw] leading-none font-bold drop-shadow-md">
							{exercise}
						</span>
						<TileGloss />
					</span>

					{/* Back: the answer, with the exercise small in the start corner */}
					<span className={cn(face, 'rotate-y-180')}>
						{/* Nudged down so it never collides with the pill */}
						<span className="pt-[18cqw] text-[34cqw] leading-none font-bold drop-shadow-md">{answer}</span>
						<span className="absolute start-[9cqw] top-[7cqw] rounded-full bg-white/25 px-[5cqw] py-[2cqw] text-[15cqw] leading-tight font-bold">
							{/* bdi keeps "7 × 1" in reading order while the pill itself follows the page direction */}
							<bdi dir="ltr">{exercise}</bdi>
						</span>
						<TileGloss />
					</span>
				</span>
			</button>
		</div>
	);
}
