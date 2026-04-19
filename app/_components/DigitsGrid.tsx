import type { NumCount } from "../_lib/types";

const GRID_CLASSES: Record<NumCount, string> = {
  4: "grid-cols-4 max-w-xs lg:max-w-md",
  5: "grid-cols-5 max-w-sm lg:max-w-lg",
  6: "grid-cols-3 max-w-xs lg:grid-cols-6 lg:max-w-2xl",
};

export function DigitsGrid({
  digits,
  numCount,
  label,
}: {
  digits: number[];
  numCount: NumCount;
  label: string;
}) {
  return (
    <div>
      <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-widest text-zinc-500 lg:mb-3 lg:text-xs dark:text-zinc-400">
        {label}
      </p>
      <div className={`mx-auto grid gap-2 lg:gap-3 ${GRID_CLASSES[numCount]}`}>
        {digits.map((d, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-xl border border-zinc-200 bg-white text-3xl font-semibold tabular-nums shadow-sm lg:rounded-2xl lg:text-5xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
