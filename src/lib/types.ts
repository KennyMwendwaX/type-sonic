export interface HistoryEntry {
  id: string;
  date: Date;
  wpm: number;
  accuracy: number;
  duration: number;
  textLength: number;
  difficulty?: string;
}

export type TextDifficulty = "easy" | "medium" | "hard" | "code";
export type KeyboardLayout = "standard" | "dvorak" | "colemak" | "workman";
