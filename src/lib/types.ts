// import type { TextDifficulty } from "./constants";

// export type HistoryEntry = {
//   id?: string;
//   date?: Date;
//   wpm?: number;
//   accuracy?: number;
//   errors?: number;
//   wordsTyped?: number;
//   duration?: number;
//   difficulty?: TextDifficulty;
//   textLength?: number;
// };

export interface HistoryEntry {
  id: string;
  date: Date;
  wpm: number;
  accuracy: number;
  duration: number;
  textLength: number;
  difficulty?: string;
}

export type ThemeOption = "default" | "minimalist" | "cyberpunk" | "vintage";
export type TextDifficulty = "easy" | "medium" | "hard" | "code";
export type KeyboardLayout = "standard" | "dvorak" | "colemak" | "workman";
