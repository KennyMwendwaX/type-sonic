"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  HistoryEntry,
  ThemeOption,
  TextDifficulty,
  KeyboardLayout,
} from "@/lib/types";

type TypingTestState = {
  text: string;
  userInput: string;
  startTime: number | null;
  endTime: number | null;
  currentIndex: number;
  errors: number;
  duration: number;
  timeLeft: number;
  testActive: boolean;
  testComplete: boolean;
  soundEnabled: boolean;
  wordsTyped: number;
  personalBest: number | null;
  streak: number;
  showConfetti: boolean;
  difficulty: TextDifficulty;
  theme: ThemeOption;
  showHistory: boolean;
  showSettings: boolean;
  history: HistoryEntry[];
  focusMode: boolean;
  keyboardLayout: KeyboardLayout;
  instantFeedback: boolean;
  isNewRecord: boolean;
};

type TypingTestActions = {
  startTest: () => void;
  endTest: () => void;
  handleInputChange: (value: string) => void;
  changeDuration: (newDuration: number) => void;
  toggleSound: () => void;
  changeDifficulty: (newDifficulty: TextDifficulty) => void;
  deleteHistoryItem: (id: string) => void;
  clearHistory: () => void;
  resetPersonalBest: () => void;
  setTheme: (theme: ThemeOption) => void;
  setShowHistory: (show: boolean) => void;
  setShowSettings: (show: boolean) => void;
  setFocusMode: (focusMode: boolean) => void;
  setKeyboardLayout: (layout: KeyboardLayout) => void;
  setInstantFeedback: (feedback: boolean) => void;
};

export const useTypingTestStore = create<TypingTestState & TypingTestActions>()(
  persist(
    (set, get) => ({
      text: "",
      userInput: "",
      startTime: null,
      endTime: null,
      currentIndex: 0,
      errors: 0,
      duration: 30,
      timeLeft: 30,
      testActive: false,
      testComplete: false,
      soundEnabled: true,
      wordsTyped: 0,
      personalBest: null,
      streak: 0,
      showConfetti: false,
      difficulty: "medium",
      theme: "default",
      showHistory: false,
      showSettings: false,
      history: [],
      focusMode: false,
      keyboardLayout: "standard",
      instantFeedback: true,
      isNewRecord: false,

      startTest: () => {
        set({
          userInput: "",
          currentIndex: 0,
          errors: 0,
          wordsTyped: 0,
          startTime: Date.now(),
          endTime: null,
          timeLeft: get().duration,
          testActive: true,
          testComplete: false,
          showConfetti: false,
          isNewRecord: false,
        });
      },

      endTest: () => {
        if (!get().testActive) return;
        set({
          endTime: Date.now(),
          testActive: false,
          testComplete: true,
        });
      },

      handleInputChange: (value) => {
        if (!get().testActive || get().testComplete) return;
        set({ userInput: value, currentIndex: value.length });
      },

      changeDuration: (newDuration) =>
        set({ duration: newDuration, timeLeft: newDuration }),
      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),
      changeDifficulty: (newDifficulty) => set({ difficulty: newDifficulty }),
      deleteHistoryItem: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),
      clearHistory: () => set({ history: [] }),
      resetPersonalBest: () => set({ personalBest: null }),
      setTheme: (theme) => set({ theme }),
      setShowHistory: (show) => set({ showHistory: show }),
      setShowSettings: (show) => set({ showSettings: show }),
      setFocusMode: (focusMode) => set({ focusMode }),
      setKeyboardLayout: (layout) => set({ keyboardLayout: layout }),
      setInstantFeedback: (feedback) => set({ instantFeedback: feedback }),
    }),
    {
      name: "typing-test-store",
      version: 0,
    }
  )
);
