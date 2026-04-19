import type { NumCount, Puzzle, TargetDigits } from "./types";

export function generatePuzzle(
  numCount: NumCount,
  targetDigits: TargetDigits
): Puzzle {
  const digits = Array.from({ length: numCount }, () =>
    Math.floor(Math.random() * 10)
  );
  const min = Math.pow(10, targetDigits - 1);
  const max = Math.pow(10, targetDigits) - 1;
  const target = min + Math.floor(Math.random() * (max - min + 1));
  return { digits, target, targetDigits, numCount };
}
