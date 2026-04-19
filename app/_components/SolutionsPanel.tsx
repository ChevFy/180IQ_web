import type { Solution } from "../_lib/solver";
import type { Dict } from "../_lib/strings";
import { SolutionCard } from "./SolutionCard";

export function SolutionsPanel({
  t,
  solutions,
  target,
}: {
  t: Dict;
  solutions: Solution[] | null;
  target: number;
}) {
  const hasSolutions = solutions !== null && solutions.length > 0;
  return (
    <aside className="flex flex-col gap-2.5 lg:sticky lg:top-[84px] lg:max-h-[calc(100dvh-120px)] lg:overflow-y-auto lg:pr-1">
      <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 lg:text-xs dark:text-zinc-400">
        {t.solutionHeading}
        {hasSolutions && (
          <>
            {" · "}
            {solutions[0].diff === 0 ? t.topSimplest(solutions.length) : t.closestMatch}
          </>
        )}
      </p>
      {hasSolutions ? (
        solutions.map((s, i) => (
          <SolutionCard key={i} index={i} solution={s} target={target} t={t} />
        ))
      ) : (
        <div className="hidden items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white/50 p-8 text-center text-xs text-zinc-400 lg:flex dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-500">
          {t.solutionsPlaceholder}
        </div>
      )}
    </aside>
  );
}
