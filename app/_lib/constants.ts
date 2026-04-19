import type { NumCount, TargetDigits } from "./types";

export const TIMER_PRESETS = [15, 30, 60, 90, 120] as const;
export const TARGET_OPTIONS: TargetDigits[] = [2, 3];
export const NUM_OPTIONS: NumCount[] = [4, 5, 6];
export const MIN_CUSTOM_SECONDS = 5;
export const MAX_CUSTOM_SECONDS = 600;
export const DEFAULT_TIMER = 30;
