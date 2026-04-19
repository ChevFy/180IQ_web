export type Lang = "th" | "en";
export type TargetDigits = 2 | 3;
export type NumCount = 4 | 5 | 6;

export type Puzzle = {
  digits: number[];
  target: number;
  targetDigits: TargetDigits;
  numCount: NumCount;
};
