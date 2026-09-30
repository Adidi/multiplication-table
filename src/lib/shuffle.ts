import { NUMBERS } from '@/lib/tile-colors';

export type Exercise = { num1: number; num2: number };

/** Fisher–Yates shuffle. Returns a new array; the input is left untouched. */
export function shuffle<T>(items: readonly T[]): T[] {
	const out = [...items];
	for (let i = out.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[out[i], out[j]] = [out[j], out[i]];
	}
	return out;
}

/** The ten exercises of one number, in order. */
export function exercisesOf(num: number): Exercise[] {
	return NUMBERS.map(m => ({ num1: num, num2: m }));
}

/** Random, non-repeating exercises drawn from every table. Both "3 × 7" and "7 × 3" can appear. */
export function randomExercises(count: number): Exercise[] {
	const all = NUMBERS.flatMap(num1 => NUMBERS.map(num2 => ({ num1, num2 })));
	return shuffle(all).slice(0, count);
}
