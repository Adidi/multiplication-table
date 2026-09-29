// One color per number, shared by the home tiles and every exercise tile
// of that number. Full class strings so Tailwind can pick them up.
export const TILE_COLORS: Record<number, string> = {
  1: "bg-rose-400 shadow-rose-300 hover:bg-rose-500",
  2: "bg-orange-400 shadow-orange-300 hover:bg-orange-500",
  3: "bg-amber-400 shadow-amber-300 hover:bg-amber-500",
  4: "bg-lime-500 shadow-lime-300 hover:bg-lime-600",
  5: "bg-emerald-500 shadow-emerald-300 hover:bg-emerald-600",
  6: "bg-teal-400 shadow-teal-300 hover:bg-teal-500",
  7: "bg-sky-500 shadow-sky-300 hover:bg-sky-600",
  8: "bg-violet-500 shadow-violet-300 hover:bg-violet-600",
  9: "bg-fuchsia-500 shadow-fuchsia-300 hover:bg-fuchsia-600",
  10: "bg-pink-500 shadow-pink-300 hover:bg-pink-600",
};

const FALLBACK = "bg-slate-400 shadow-slate-300 hover:bg-slate-500";

export function tileColor(n: number): string {
  return TILE_COLORS[n] ?? FALLBACK;
}

export const NUMBERS = Object.keys(TILE_COLORS).map(Number);
