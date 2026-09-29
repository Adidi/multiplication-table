/**
 * Decorative "chalkboard" background: hand-written exercises, symbols and small
 * doodles scattered around the page at very low opacity. Purely visual
 * (aria-hidden, no pointer events), fixed behind all content.
 *
 * Coordinates are in a 1000×1000 box that is scaled to cover the viewport, so
 * the layout is the same on every screen. Items are kept mostly near the edges
 * because the middle is usually covered by the tiles.
 */

type Item = {
  x: number;
  y: number;
  rotate?: number;
  size?: number;
  /** Animation delay, in seconds. Only items with `float` drift. */
  float?: number;
};

type TextItem = Item & { text: string };

const EXERCISES: TextItem[] = [
  { x: 60, y: 90, text: "2 × 3 = 6", rotate: -8, size: 34, float: 0 },
  { x: 840, y: 70, text: "7 × 8 = 56", rotate: 6, size: 30 },
  { x: 40, y: 330, text: "5 × 5", rotate: -12, size: 40, float: 2 },
  { x: 900, y: 300, text: "9 × 4", rotate: 10, size: 36 },
  { x: 30, y: 560, text: "6 × 7 = 42", rotate: 4, size: 28, float: 4 },
  { x: 890, y: 520, text: "3 × 9 = 27", rotate: -6, size: 30 },
  { x: 80, y: 800, text: "8 × 8 = 64", rotate: -5, size: 32 },
  { x: 850, y: 760, text: "4 × 6", rotate: 8, size: 38, float: 1 },
  { x: 460, y: 960, text: "10 × 10 = 100", rotate: -3, size: 30 },
  { x: 430, y: 40, text: "1 × 1 = 1", rotate: 2, size: 26, float: 3 },
];

const SYMBOLS: TextItem[] = [
  { x: 190, y: 200, text: "×", rotate: 15, size: 64, float: 1.5 },
  { x: 760, y: 180, text: "=", rotate: -10, size: 60 },
  { x: 140, y: 690, text: "+", rotate: 8, size: 56, float: 2.5 },
  { x: 800, y: 900, text: "×", rotate: -20, size: 70 },
  { x: 940, y: 640, text: "?", rotate: 12, size: 58, float: 0.5 },
  { x: 250, y: 930, text: "=", rotate: 6, size: 52 },
];

const STARS: Item[] = [
  { x: 300, y: 80, size: 14, rotate: 10, float: 1 },
  { x: 700, y: 400, size: 10, rotate: -15 },
  { x: 120, y: 450, size: 12, rotate: 20, float: 3.5 },
  { x: 960, y: 420, size: 9, rotate: 0 },
  { x: 620, y: 880, size: 13, rotate: 25, float: 2 },
  { x: 360, y: 700, size: 8, rotate: -5 },
];

function starPath(r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.45;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(Math.cos(a) * rad).toFixed(2)},${(Math.sin(a) * rad).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

function transform({ x, y, rotate = 0 }: Item) {
  return `translate(${x} ${y}) rotate(${rotate})`;
}

function floatStyle(item: Item) {
  return item.float === undefined ? undefined : { animationDelay: `${item.float}s` };
}

function floatClass(item: Item) {
  return item.float === undefined ? undefined : "chalk-float";
}

export function ChalkBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full text-indigo-950 opacity-[0.07] select-none dark:text-white dark:opacity-[0.09]"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      // Exercises must read "3 × 9 = 27" even when the page is RTL
      direction="ltr"
      style={{ direction: "ltr" }}
    >
      <g fill="currentColor" stroke="currentColor" fontFamily="var(--font-chalk)" fontWeight="700">
        {/* Exercises and symbols */}
        {[...EXERCISES, ...SYMBOLS].map((it, i) => (
          <text
            key={`t${i}`}
            transform={transform(it)}
            fontSize={it.size ?? 32}
            stroke="none"
            className={floatClass(it)}
            style={floatStyle(it)}
          >
            {it.text}
          </text>
        ))}

        {/* Stars */}
        {STARS.map((it, i) => (
          <path
            key={`s${i}`}
            d={starPath(it.size ?? 10)}
            transform={transform(it)}
            stroke="none"
            className={floatClass(it)}
            style={floatStyle(it)}
          />
        ))}

        {/* Ruler, bottom-left */}
        <g transform="translate(200 850) rotate(-25)" fill="none" strokeWidth="3" strokeLinecap="round">
          <rect x="0" y="0" width="150" height="26" rx="4" />
          {Array.from({ length: 15 }, (_, i) => (
            <line key={i} x1={10 + i * 10} y1="0" x2={10 + i * 10} y2={i % 5 === 0 ? 14 : 8} />
          ))}
        </g>

        {/* Pencil, top-right */}
        <g transform="translate(600 130) rotate(35)" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="0" y="0" width="110" height="20" rx="3" />
          <path d="M110 0 L135 10 L110 20 Z" />
          <path d="M126 6.5 L135 10 L126 13.5" />
          <line x1="14" y1="0" x2="14" y2="20" />
        </g>

        {/* Smiley, right side */}
        <g transform="translate(720 640)" fill="none" strokeWidth="3" strokeLinecap="round" className="chalk-float" style={{ animationDelay: "1s" }}>
          <circle r="22" />
          <circle cx="-8" cy="-6" r="2" fill="currentColor" />
          <circle cx="8" cy="-6" r="2" fill="currentColor" />
          <path d="M-10 6 Q0 16 10 6" />
        </g>

        {/* Little sun, top-left corner */}
        <g transform="translate(330 300)" fill="none" strokeWidth="3" strokeLinecap="round">
          <circle r="14" />
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="0" y1="-20" x2="0" y2="-27" transform={`rotate(${i * 45})`} />
          ))}
        </g>

        {/* Squiggle underline, bottom-right */}
        <path
          d="M 700 980 q 15 -14 30 0 t 30 0 t 30 0 t 30 0"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
