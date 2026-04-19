import type { Dict } from "../_lib/strings";

export function ActionButtons({
  t,
  solving,
  solutionsShown,
  onReroll,
  onShowSolution,
}: {
  t: Dict;
  solving: boolean;
  solutionsShown: boolean;
  onReroll: () => void;
  onShowSolution: () => void;
}) {
  return (
    <>
      <button
        onClick={onReroll}
        className="flex-1 rounded-full bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 active:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:active:bg-white"
      >
        {t.newPuzzle}
      </button>
      <button
        onClick={onShowSolution}
        disabled={solving || solutionsShown}
        className="flex-1 rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition hover:border-zinc-900 active:bg-zinc-100 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-100 dark:active:bg-zinc-800"
      >
        {solving ? t.solving : t.showSolution}
      </button>
    </>
  );
}
