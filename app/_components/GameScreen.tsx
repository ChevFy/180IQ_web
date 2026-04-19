import type { Solution } from "../_lib/solver";
import type { Dict } from "../_lib/strings";
import type { Puzzle } from "../_lib/types";
import { ActionButtons } from "./ActionButtons";
import { DigitsGrid } from "./DigitsGrid";
import { SolutionsPanel } from "./SolutionsPanel";
import { TargetCard } from "./TargetCard";
import { TimerCard } from "./TimerCard";

export function GameScreen({
  t,
  puzzle,
  remaining,
  timerDuration,
  solutions,
  solving,
  timeUp,
  paused,
  onBack,
  onReroll,
  onShowSolution,
}: {
  t: Dict;
  puzzle: Puzzle;
  remaining: number;
  timerDuration: number;
  solutions: Solution[] | null;
  solving: boolean;
  timeUp: boolean;
  paused: boolean;
  onBack: () => void;
  onReroll: () => void;
  onShowSolution: () => void;
}) {
  const pct = remaining / Math.max(1, timerDuration);

  return (
    <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-10">
      <div className="flex min-w-0 flex-col gap-5 lg:gap-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="-ml-1 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-zinc-500 transition hover:text-zinc-900 active:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:active:bg-zinc-800"
          >
            <span>←</span>
            <span>{t.back}</span>
          </button>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {t.modeInfo(puzzle.numCount, puzzle.targetDigits, timerDuration)}
          </span>
        </div>

        <TimerCard t={t} remaining={remaining} pct={pct} timeUp={timeUp} paused={paused} />
        <TargetCard target={puzzle.target} label={t.target} />
        <DigitsGrid digits={puzzle.digits} numCount={puzzle.numCount} label={t.numbers} />

        <div className="hidden gap-2 lg:flex">
          <ActionButtons
            t={t}
            solving={solving}
            solutionsShown={solutions !== null}
            onReroll={onReroll}
            onShowSolution={onShowSolution}
          />
        </div>
      </div>

      <SolutionsPanel t={t} solutions={solutions} target={puzzle.target} />
    </div>
  );
}
