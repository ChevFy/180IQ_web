import {
  MAX_CUSTOM_SECONDS,
  MIN_CUSTOM_SECONDS,
  NUM_OPTIONS,
  TARGET_OPTIONS,
  TIMER_PRESETS,
} from "../_lib/constants";
import type { Dict } from "../_lib/strings";
import type { NumCount, TargetDigits } from "../_lib/types";
import { ChipButton } from "./ChipButton";
import { Field } from "./Field";

export function SettingsScreen({
  t,
  timerDuration,
  onTimerChange,
  targetDigits,
  onTargetDigitsChange,
  numCount,
  onNumCountChange,
  onStart,
}: {
  t: Dict;
  timerDuration: number;
  onTimerChange: (v: number) => void;
  targetDigits: TargetDigits;
  onTargetDigitsChange: (v: TargetDigits) => void;
  numCount: NumCount;
  onNumCountChange: (v: NumCount) => void;
  onStart: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 lg:mx-auto lg:w-full lg:max-w-2xl lg:gap-7 lg:py-6">
      <div className="text-center">
        <p className="text-xs text-zinc-500 lg:text-sm dark:text-zinc-400">{t.tagline}</p>
      </div>

      <Field label={t.timePerRound}>
        <div className="grid grid-cols-5 gap-1.5 lg:gap-2">
          {TIMER_PRESETS.map((s) => (
            <ChipButton
              key={s}
              active={timerDuration === s}
              onClick={() => onTimerChange(s)}
            >
              {s}s
            </ChipButton>
          ))}
        </div>
        <label className="mt-2 flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm lg:mt-3 lg:py-2.5 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs text-zinc-500 lg:text-sm dark:text-zinc-400">
            {t.custom}
          </span>
          <div className="flex items-center gap-1">
            <input
              type="number"
              inputMode="numeric"
              min={MIN_CUSTOM_SECONDS}
              max={MAX_CUSTOM_SECONDS}
              value={timerDuration}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (!Number.isNaN(v))
                  onTimerChange(
                    Math.max(MIN_CUSTOM_SECONDS, Math.min(MAX_CUSTOM_SECONDS, v))
                  );
              }}
              className="w-16 bg-transparent text-right text-base font-medium tabular-nums outline-none"
            />
            <span className="text-xs text-zinc-500 lg:text-sm dark:text-zinc-400">
              {t.seconds}
            </span>
          </div>
        </label>
      </Field>

      <Field label={t.targetDigitsLabel}>
        <div className="grid grid-cols-2 gap-1.5 lg:gap-2">
          {TARGET_OPTIONS.map((d) => (
            <ChipButton
              key={d}
              active={targetDigits === d}
              onClick={() => onTargetDigitsChange(d)}
              subtitle={t.digitsRange(d)}
            >
              {t.digitsOption(d)}
            </ChipButton>
          ))}
        </div>
      </Field>

      <Field label={t.numbersCountLabel}>
        <div className="grid grid-cols-3 gap-1.5 lg:gap-2">
          {NUM_OPTIONS.map((n) => (
            <ChipButton
              key={n}
              active={numCount === n}
              onClick={() => onNumCountChange(n)}
            >
              {t.numsOption(n)}
            </ChipButton>
          ))}
        </div>
      </Field>

      <button
        onClick={onStart}
        className="mt-2 w-full rounded-full bg-zinc-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-700 active:bg-zinc-700 lg:text-base dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      >
        {t.startGame} →
      </button>
    </div>
  );
}
