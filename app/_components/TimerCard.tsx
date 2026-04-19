import { formatTime } from "../_lib/format";
import type { Dict } from "../_lib/strings";

export function TimerCard({
  t,
  remaining,
  pct,
  timeUp,
  paused,
}: {
  t: Dict;
  remaining: number;
  pct: number;
  timeUp: boolean;
  paused: boolean;
}) {
  const label = timeUp ? t.timeUp : paused ? t.paused : t.timeLeft;
  const container = timeUp
    ? "border-rose-300 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/40"
    : paused
      ? "border-zinc-300 bg-zinc-100/60 dark:border-zinc-700 dark:bg-zinc-900/60"
      : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900";
  const timeColor = timeUp
    ? "text-rose-600 dark:text-rose-400"
    : paused
      ? "text-zinc-500 dark:text-zinc-500"
      : "";
  const barColor = timeUp
    ? "bg-rose-500"
    : paused
      ? "bg-zinc-400 dark:bg-zinc-600"
      : pct < 0.25
        ? "bg-amber-500"
        : "bg-zinc-900 dark:bg-zinc-100";

  return (
    <div className={`rounded-xl border p-3 transition-colors lg:p-4 ${container}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 lg:text-xs dark:text-zinc-400">
          {label}
        </span>
        <span className={`text-2xl font-semibold tabular-nums lg:text-3xl ${timeColor}`}>
          {formatTime(remaining)}
        </span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-100 lg:mt-3 lg:h-1.5 dark:bg-zinc-800">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${barColor}`}
          style={{ width: `${Math.max(0, Math.min(1, pct)) * 100}%` }}
        />
      </div>
    </div>
  );
}
