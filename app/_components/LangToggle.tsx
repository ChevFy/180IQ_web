import type { Lang } from "../_lib/types";

export function LangToggle({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
}) {
  return (
    <div className="flex items-center rounded-full border border-zinc-200 bg-white p-0.5 text-xs font-medium dark:border-zinc-800 dark:bg-zinc-900">
      {(["th", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`rounded-full px-3 py-1 uppercase tracking-wider transition ${
            lang === l
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
