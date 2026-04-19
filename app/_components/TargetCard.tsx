export function TargetCard({ target, label }: { target: number; label: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:p-10 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="mb-1 text-center text-[10px] font-medium uppercase tracking-widest text-zinc-500 lg:mb-2 lg:text-xs dark:text-zinc-400">
        {label}
      </p>
      <p className="text-center text-6xl font-semibold tracking-tight tabular-nums lg:text-8xl">
        {target}
      </p>
    </div>
  );
}
