import type { ReactNode } from "react";

export function ChipButton({
  active,
  onClick,
  children,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  subtitle?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center rounded-lg border py-2 text-sm font-medium tabular-nums transition lg:py-2.5 lg:text-base ${
        active
          ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 active:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:active:bg-zinc-800"
      }`}
    >
      <span>{children}</span>
      {subtitle && (
        <span
          className={`mt-0.5 text-[10px] font-normal ${
            active
              ? "text-zinc-300 dark:text-zinc-600"
              : "text-zinc-400 dark:text-zinc-500"
          }`}
        >
          {subtitle}
        </span>
      )}
    </button>
  );
}
