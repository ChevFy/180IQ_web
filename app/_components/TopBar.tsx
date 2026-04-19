import { LangToggle } from "./LangToggle";
import { SoundToggle } from "./SoundToggle";
import type { Lang } from "../_lib/types";

export function TopBar({
  lang,
  onLangChange,
  soundOn,
  onSoundChange,
  soundLabel,
}: {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  soundOn: boolean;
  onSoundChange: (v: boolean) => void;
  soundLabel: string;
}) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200/70 bg-zinc-50/80 px-4 py-3 backdrop-blur lg:px-8 lg:py-4 dark:border-zinc-800/70 dark:bg-zinc-950/80">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-[10px] font-bold tracking-tight text-white dark:bg-zinc-100 dark:text-zinc-900">
          IQ
        </span>
        <span className="text-sm font-semibold tracking-tight lg:text-base">180 IQ</span>
      </div>
      <div className="flex items-center gap-2">
        <SoundToggle on={soundOn} onChange={onSoundChange} label={soundLabel} />
        <LangToggle lang={lang} onChange={onLangChange} />
      </div>
    </div>
  );
}
