import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HistoryEntry, TextDifficulty, KeyboardLayout } from "@/lib/types";
import {
  getNewText,
  checkTestCompletion,
  updateErrorsAndWords,
} from "@/lib/text-helpers";
import {
  calculateAccuracy,
  calculateCPM,
  calculateWPM,
  getAverageWPM,
  getImprovementPercentage,
} from "@/lib/calculations";
import {
  loadLocalStorageItem,
  saveLocalStorageItem,
  clearLocalStorageItem,
} from "@/lib/local-storage";
import type { ThemeOption } from "@/lib/constants";

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
  fullscreenMode: boolean;
};

type TypingTestActions = {
  startTest: () => void;
  endTest: () => void;
  handleInputChange: (value: string) => void;
  calculateWPM: () => number;
  calculateAccuracy: () => number;
  calculateCPM: () => number;
  changeDuration: (newDuration: number) => void;
  toggleSound: () => void;
  changeDifficulty: (newDifficulty: TextDifficulty) => void;
  deleteHistoryItem: (id: string) => void;
  clearHistory: () => void;
  resetPersonalBest: () => void;
  setTheme: (theme: ThemeOption) => void;
  setShowHistory: (show: boolean) => void;
  setShowSettings: (show: boolean) => void;
  setShowConfetti: (show: boolean) => void;
  setFocusMode: (focusMode: boolean) => void;
  setKeyboardLayout: (layout: KeyboardLayout) => void;
  setInstantFeedback: (feedback: boolean) => void;
  getAverageWPM: () => number;
  getImprovementPercentage: () => number;
  addToHistory: (wpm: number, accuracy: number) => void;
  getHistory: () => HistoryEntry[];
  setFullscreenMode: (fullscreen: boolean) => void;
  toggleFullscreenMode: () => void;
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
      fullscreenMode: false,

      startTest: () => {
        const newText = getNewText(get().difficulty);
        set({
          text: newText,
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

        // Start the timer
        const timer = setInterval(() => {
          const currentTimeLeft = get().timeLeft;
          if (currentTimeLeft > 0 && get().testActive) {
            set({ timeLeft: currentTimeLeft - 1 });
          } else {
            clearInterval(timer);
            get().endTest();
          }
        }, 1000);
      },

      endTest: () => {
        if (!get().testActive) return;

        const finalWPM = get().calculateWPM();
        const finalAccuracy = get().calculateAccuracy();

        set((state) => {
          // Update personal best
          const newPersonalBest =
            !state.personalBest || finalWPM > state.personalBest
              ? finalWPM
              : state.personalBest;

          const newStreak =
            newPersonalBest > (state.personalBest || 0) ? state.streak + 1 : 0;

          // Save personal best to local storage if improved
          if (newPersonalBest > (state.personalBest || 0)) {
            saveLocalStorageItem("personal-best", newPersonalBest);
          }

          return {
            endTime: Date.now(),
            testActive: false,
            testComplete: true,
            personalBest: newPersonalBest,
            streak: newStreak,
            isNewRecord: newPersonalBest > (state.personalBest || 0),
            showConfetti: finalWPM > (state.personalBest || 0),
          };
        });

        // Add test result to history
        get().addToHistory(finalWPM, finalAccuracy);
      },

      addToHistory: (wpm: number, accuracy: number) => {
        const newEntry: HistoryEntry = {
          id: Date.now().toString(),
          date: new Date(),
          wpm,
          accuracy,
          duration: get().duration,
          textLength: get().text.length,
          difficulty: get().difficulty,
        };

        set((state) => {
          const updatedHistory = [...state.history, newEntry];
          saveLocalStorageItem("typing-history", updatedHistory);
          return { history: updatedHistory };
        });
      },

      getHistory: () => {
        const savedHistory = loadLocalStorageItem<HistoryEntry[]>(
          "typing-history",
          []
        );
        set({ history: savedHistory });
        return savedHistory;
      },
      deleteHistoryItem: (id) =>
        set((state) => {
          const updatedHistory = state.history.filter((item) => item.id !== id);
          saveLocalStorageItem("typing-history", updatedHistory);
          return { history: updatedHistory };
        }),

      clearHistory: () => {
        set({ history: [] });
        clearLocalStorageItem("typing-history");
      },

      handleInputChange: (value) => {
        if (!get().testActive || get().testComplete) return;

        const { errors, wordsTyped } = updateErrorsAndWords(value, get().text);
        const isComplete = checkTestCompletion(value, get().text);

        set({
          userInput: value,
          currentIndex: value.length,
          errors,
          wordsTyped,
          ...(isComplete && {
            testActive: false,
            testComplete: true,
            showConfetti: true,
          }),
        });
      },

      calculateWPM: () =>
        calculateWPM(
          get().startTime,
          get().endTime,
          get().wordsTyped,
          get().testComplete
        ),

      calculateAccuracy: () => calculateAccuracy(get().userInput, get().errors),

      calculateCPM: () =>
        calculateCPM(
          get().startTime,
          get().endTime,
          get().userInput.length,
          get().testComplete
        ),

      changeDuration: (newDuration) =>
        set({ duration: newDuration, timeLeft: newDuration }),

      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),

      changeDifficulty: (newDifficulty) => set({ difficulty: newDifficulty }),

      resetPersonalBest: () => {
        set({ personalBest: null });
        clearLocalStorageItem("personal-best");
      },

      getAverageWPM: () => getAverageWPM(get().history),

      getImprovementPercentage: () =>
        getImprovementPercentage(get().personalBest, get().history),

      setTheme: (theme) => {
        set({ theme });
        saveLocalStorageItem("theme", theme);
      },

      setShowHistory: (show) => set({ showHistory: show }),

      setShowSettings: (show) => set({ showSettings: show }),

      setShowConfetti: (show: boolean) => set({ showConfetti: show }),

      setFocusMode: (focusMode) => {
        set({ focusMode });
        saveLocalStorageItem("focus-mode", focusMode);
      },

      setKeyboardLayout: (layout) => {
        set({ keyboardLayout: layout });
        saveLocalStorageItem("keyboard-layout", layout);
      },

      setInstantFeedback: (feedback) => {
        set({ instantFeedback: feedback });
        saveLocalStorageItem("instant-feedback", feedback);
      },

      setFullscreenMode: (fullscreen) => {
        set({ fullscreenMode: fullscreen });
        saveLocalStorageItem("fullscreen-mode", fullscreen);
      },

      toggleFullscreenMode: () => {
        const newFullscreenMode = !get().fullscreenMode;
        set({ fullscreenMode: newFullscreenMode });
        saveLocalStorageItem("fullscreen-mode", newFullscreenMode);
      },
    }),
    {
      name: "typing-test-store",
      version: 0,
    }
  )
);
