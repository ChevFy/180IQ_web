"use client";

import { useEffect, useRef, useState } from "react";
import { ActionButtons } from "./_components/ActionButtons";
import { GameScreen } from "./_components/GameScreen";
import { SettingsScreen } from "./_components/SettingsScreen";
import { TopBar } from "./_components/TopBar";
import { playAlarm } from "./_lib/alarm";
import { DEFAULT_TIMER } from "./_lib/constants";
import { generatePuzzle } from "./_lib/puzzle";
import { solveTop, type Solution } from "./_lib/solver";
import { STRINGS } from "./_lib/strings";
import type { Lang, NumCount, Puzzle, TargetDigits } from "./_lib/types";

export default function Home() {
  const [lang, setLang] = useState<Lang>("th");
  const [soundOn, setSoundOn] = useState(true);
  const [targetDigits, setTargetDigits] = useState<TargetDigits>(2);
  const [numCount, setNumCount] = useState<NumCount>(4);
  const [timerDuration, setTimerDuration] = useState(DEFAULT_TIMER);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [remaining, setRemaining] = useState(DEFAULT_TIMER);
  const [solutions, setSolutions] = useState<Solution[] | null>(null);
  const [solving, setSolving] = useState(false);
  const alarmPlayedRef = useRef(false);

  const t = STRINGS[lang];

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("iq180-lang", lang);
  }, [lang]);

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("iq180-sound", soundOn ? "1" : "0");
  }, [soundOn]);

  const startGame = () => {
    setPuzzle(generatePuzzle(numCount, targetDigits));
    setRemaining(timerDuration);
    setSolutions(null);
    alarmPlayedRef.current = false;
  };

  const reroll = () => {
    setPuzzle(generatePuzzle(numCount, targetDigits));
    setRemaining(timerDuration);
    setSolutions(null);
    alarmPlayedRef.current = false;
  };

  const showSolution = () => {
    if (!puzzle) return;
    setSolving(true);
    setTimeout(() => {
      const res = solveTop(puzzle.digits, puzzle.target, 5);
      setSolutions(res);
      setSolving(false);
    }, 10);
  };

  const backToSettings = () => {
    setPuzzle(null);
    setSolutions(null);
  };

  // Countdown — pauses while puzzle is absent, time hit 0, or solution revealed
  useEffect(() => {
    if (!puzzle) return;
    if (remaining <= 0) return;
    if (solutions) return;
    const id = setTimeout(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearTimeout(id);
  }, [puzzle, remaining, solutions]);

  // Alarm on time-up (fires once per puzzle)
  useEffect(() => {
    if (!puzzle) return;
    if (remaining !== 0) return;
    if (solutions) return;
    if (alarmPlayedRef.current) return;
    alarmPlayedRef.current = true;
    if (soundOn) playAlarm();
  }, [remaining, puzzle, soundOn, solutions]);

  const timeUp = puzzle !== null && remaining === 0 && !solutions;
  const paused = puzzle !== null && solutions !== null && remaining > 0;

  return (
    <div className="min-h-[100dvh] w-full bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col lg:max-w-6xl">
        <TopBar
          lang={lang}
          onLangChange={setLang}
          soundOn={soundOn}
          onSoundChange={setSoundOn}
          soundLabel={soundOn ? t.soundOn : t.soundOff}
        />

        <main className="flex flex-1 flex-col gap-5 px-4 pb-24 pt-5 lg:gap-8 lg:px-8 lg:pb-10 lg:pt-10">
          {puzzle === null ? (
            <SettingsScreen
              t={t}
              timerDuration={timerDuration}
              onTimerChange={setTimerDuration}
              targetDigits={targetDigits}
              onTargetDigitsChange={setTargetDigits}
              numCount={numCount}
              onNumCountChange={setNumCount}
              onStart={startGame}
            />
          ) : (
            <GameScreen
              t={t}
              puzzle={puzzle}
              remaining={remaining}
              timerDuration={timerDuration}
              solutions={solutions}
              solving={solving}
              timeUp={timeUp}
              paused={paused}
              onBack={backToSettings}
              onReroll={reroll}
              onShowSolution={showSolution}
            />
          )}
        </main>

        {puzzle !== null && (
          <div className="sticky bottom-0 z-10 border-t border-zinc-200/70 bg-zinc-50/90 px-4 py-3 backdrop-blur lg:hidden dark:border-zinc-800/70 dark:bg-zinc-950/90">
            <div className="flex gap-2">
              <ActionButtons
                t={t}
                solving={solving}
                solutionsShown={solutions !== null}
                onReroll={reroll}
                onShowSolution={showSolution}
              />
            </div>
          </div>
        )}

        {puzzle === null && (
          <footer className="px-4 py-4 text-center text-[10px] text-zinc-400 lg:text-xs dark:text-zinc-600">
            {t.footer} · + − × ÷ ^ √ n! Σ
          </footer>
        )}
      </div>
    </div>
  );
}
