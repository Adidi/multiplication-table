import { Popover } from '@base-ui/react/popover';
import { Check } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type PopoverMenuOption<T extends string> = {
	value: T;
	label: string;
	icon?: ReactNode;
};

type Props<T extends string> = {
	/** Accessible name and hover hint for the trigger, e.g. "Language". */
	label: string;
	/** Icon shown on the trigger. */
	icon: ReactNode;
	options: PopoverMenuOption<T>[];
	value: T;
	onChange: (value: T) => void;
};

/**
 * A labelled trigger that opens a small popover with a list of options.
 * The selected option is marked with a check. Picking an option closes the popover.
 */
export function PopoverMenu<T extends string>({ label, icon, options, value, onChange }: Props<T>) {
	const [open, setOpen] = useState(false);

	return (
		<Popover.Root open={open} onOpenChange={setOpen}>
			{/* Icon-only trigger; the label is exposed to assistive tech and as a hover hint */}
			<Popover.Trigger
				aria-label={label}
				title={label}
				className={cn(
					'flex size-9 items-center justify-center rounded-full border-2 sm:size-10',
					'border-indigo-200 bg-white text-indigo-700 shadow-sm',
					'transition hover:bg-indigo-50 active:scale-95',
					'data-popup-open:bg-indigo-100',
					'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-yellow-300',
					'dark:border-slate-600 dark:bg-slate-800 dark:text-indigo-200 dark:hover:bg-slate-700',
					'dark:data-popup-open:bg-slate-600'
				)}
			>
				<span className="[&>svg]:size-5" aria-hidden="true">
					{icon}
				</span>
			</Popover.Trigger>

			<Popover.Portal>
				<Popover.Positioner side="bottom" align="end" sideOffset={8} className="z-50">
					<Popover.Popup
						className={cn(
							'min-w-40 rounded-2xl border-2 p-1.5 shadow-xl outline-none',
							'border-indigo-100 bg-white dark:border-slate-700 dark:bg-slate-800',
							'origin-(--transform-origin) transition-[transform,opacity] duration-150',
							'data-starting-style:scale-90 data-starting-style:opacity-0',
							'data-ending-style:scale-90 data-ending-style:opacity-0'
						)}
					>
						<ul role="listbox" aria-label={label} className="flex flex-col gap-0.5">
							{options.map(opt => {
								const selected = opt.value === value;
								return (
									<li key={opt.value}>
										<button
											type="button"
											role="option"
											aria-selected={selected}
											onClick={() => {
												onChange(opt.value);
												setOpen(false);
											}}
											className={cn(
												'flex w-full items-center gap-2 rounded-xl px-3 py-2 text-start text-sm font-bold',
												'transition-colors',
												selected
													? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-500/25 dark:text-indigo-100'
													: 'text-slate-700 hover:bg-indigo-50 dark:text-slate-200 dark:hover:bg-slate-700',
												'focus-visible:outline-2 focus-visible:outline-yellow-300'
											)}
										>
											{opt.icon && (
												<span className="[&>svg]:size-4" aria-hidden="true">
													{opt.icon}
												</span>
											)}
											<span className="flex-1">{opt.label}</span>
											<Check
												aria-hidden="true"
												className={cn('size-4', selected ? 'opacity-100' : 'opacity-0')}
											/>
										</button>
									</li>
								);
							})}
						</ul>
					</Popover.Popup>
				</Popover.Positioner>
			</Popover.Portal>
		</Popover.Root>
	);
}
