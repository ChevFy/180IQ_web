import { stripOuterParens, type Solution } from "../_lib/solver";
import type { Dict } from "../_lib/strings";

export function SolutionCard({
  index,
  solution,
  target,
  t,
}: {
  index: number;
  solution: Solution;
  target: number;
  t: Dict;
}) {
  const isExact = solution.diff === 0;
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
            {index + 1}
          </span>
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            {t.tierLabels[solution.tier] ?? "—"}
          </span>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
            isExact
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
              : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
          }`}
        >
          {isExact ? t.exact : t.delta(solution.diff)}
        </span>
      </div>
      <p className="break-words font-mono text-[15px] leading-relaxed tabular-nums">
        {stripOuterParens(solution.expr.str)}{" "}
        <span className="text-zinc-400">=</span>{" "}
        <span className="font-semibold">{solution.expr.value}</span>
      </p>
      {!isExact && (
        <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
          {t.noExact(target)}
        </p>
      )}
    </div>
  );
}
