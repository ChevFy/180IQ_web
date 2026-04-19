import { SpeakerOffIcon, SpeakerOnIcon } from "./Icons";

export function SoundToggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      onClick={() => onChange(!on)}
      aria-label={label}
      title={label}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600"
    >
      {on ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
    </button>
  );
}
