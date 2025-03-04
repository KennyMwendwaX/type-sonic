import { HistoryEntry } from "@/lib/types";

export const calculateWPM = (
  startTime: number | null,
  endTime: number | null,
  wordsTyped: number,
  testComplete: boolean
): number => {
  if (!startTime) return 0;
  const currentTime = testComplete && endTime ? endTime : Date.now();
  const timeElapsed = (currentTime - startTime) / 1000 / 60; // in minutes
  return timeElapsed === 0 ? 0 : Math.round(wordsTyped / timeElapsed) || 0;
};

export const calculateAccuracy = (
  userInput: string,
  errors: number
): number => {
  if (userInput.length === 0) return 0;
  return Math.round(((userInput.length - errors) / userInput.length) * 100);
};

export const calculateCPM = (
  startTime: number | null,
  endTime: number | null,
  userInputLength: number,
  testComplete: boolean
): number => {
  if (!startTime) return 0;
  const currentTime = testComplete && endTime ? endTime : Date.now();
  const timeElapsed = (currentTime - startTime) / 1000 / 60; // in minutes
  return timeElapsed === 0 ? 0 : Math.round(userInputLength / timeElapsed) || 0;
};

export const getAverageWPM = (history: HistoryEntry[]): number => {
  if (history.length === 0) return 0;
  const totalWPM = history.reduce((sum, entry) => sum + entry.wpm, 0);
  return Math.round(totalWPM / history.length);
};

export const getImprovementPercentage = (
  personalBest: number | null,
  history: HistoryEntry[]
): number => {
  if (!personalBest || history.length < 2) return 0;
  const latestWPM = history[history.length - 1].wpm;
  return Math.round(((latestWPM - personalBest) / personalBest) * 100);
};
