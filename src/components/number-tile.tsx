import type { CSSProperties } from "react";
import { Link } from "wouter";
import { tileColor } from "../lib/tile-colors";

type Props = {
  num: number;
  /** Position in the grid, used to stagger the entrance animation. */
  index?: number;
};

/** Home-page tile: a big colored number that links to its number page. */
export function NumberTile({ num, index = 0 }: Props) {
  return (
    <div className="tile-enter @container aspect-square" style={{ "--i": index } as CSSProperties}>
      <Link
        href={`/number/${num}`}
        aria-label={`Number ${num}`}
        className={[
          "relative flex h-full w-full items-center justify-center",
          "rounded-3xl border-4 border-white shadow-xl dark:border-slate-800 dark:shadow-black/40",
          "text-white select-none",
          "transition-transform duration-200 ease-out",
          "hover:-translate-y-1 hover:scale-105 hover:shadow-2xl",
          "active:translate-y-0 active:scale-95",
          "focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-yellow-300",
          tileColor(num),
        ].join(" ")}
      >
        <span className="text-[38cqw] leading-none font-bold drop-shadow-md">{num}</span>
        <TileGloss />
      </Link>
    </div>
  );
}

/** Soft highlight for a rounded, "candy" feel. */
export function TileGloss() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-4 top-3 h-1/4 rounded-full bg-white/20 blur-md"
    />
  );
}
