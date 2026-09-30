import { MixTile } from '@/components/mix-tile';
import { NumberTile } from '@/components/number-tile';
import { NUMBERS } from '@/lib/tile-colors';

export function Home() {
	return (
		<section className="mx-auto w-full max-w-3xl px-4 py-4">
			{/* Numbers always read left-to-right, even when the page is RTL. */}
			<ul className="grid-ltr grid grid-cols-3 gap-4 sm:gap-6">
				{NUMBERS.map((n, i) => (
					<li key={n}>
						<NumberTile num={n} index={i} />
					</li>
				))}
				{/* Fills the last row: 10 numbers + one double-width mix tile = 4 full rows */}
				<li className="col-span-2">
					<MixTile index={NUMBERS.length} />
				</li>
			</ul>
		</section>
	);
}
