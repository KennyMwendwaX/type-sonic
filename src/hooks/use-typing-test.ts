"use client";

import { useState, useEffect, useCallback } from "react";
import { THEMES, textsByCategory } from "@/lib/constants";
import {
  HistoryEntry,
  ThemeOption,
  TextDifficulty,
  KeyboardLayout,
} from "@/lib/types";

export function useTypingTest() {
  // State Variables
  const [text, setText] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [duration, setDuration] = useState<number>(30);
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [testActive, setTestActive] = useState<boolean>(false);
  const [testComplete, setTestComplete] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [wordsTyped, setWordsTyped] = useState<number>(0);
  const [personalBest, setPersonalBest] = useState<number | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<TextDifficulty>("medium");
  const [theme, setTheme] = useState<ThemeOption>("default");
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [focusMode, setFocusMode] = useState<boolean>(false);
  const [keyboardLayout, setKeyboardLayout] =
    useState<KeyboardLayout>("standard");
  const [instantFeedback, setInstantFeedback] = useState<boolean>(true);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);

  // Initialize with a random text and load saved data
  useEffect(() => {
    getNewText();
    loadSavedData();
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (testActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (interval) clearInterval(interval);
            endTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [testActive, timeLeft]);

  // Save settings when they change
  useEffect(() => {
    saveSettings();
  }, [theme, soundEnabled, focusMode, instantFeedback, keyboardLayout]);

  // Effect for difficulty change
  useEffect(() => {
    if (!testActive) {
      getNewText();
    }
  }, [difficulty]);

  // Calculate stats
  const calculateWPM = useCallback((): number => {
    if (!startTime) return 0;
    const currentTime = testComplete ? endTime : Date.now();
    if (!currentTime) return 0;
    const timeElapsed = (currentTime - startTime) / 1000 / 60; // in minutes
    if (timeElapsed === 0) return 0;
    return Math.round(wordsTyped / timeElapsed) || 0;
  }, [startTime, endTime, wordsTyped, testComplete]);

  const calculateAccuracy = useCallback((): number => {
    if (userInput.length === 0) return 100;
    return Math.round(((userInput.length - errors) / userInput.length) * 100);
  }, [userInput.length, errors]);

  const calculateCPM = useCallback((): number => {
    if (!startTime) return 0;
    const currentTime = testComplete ? endTime : Date.now();
    if (!currentTime) return 0;
    const timeElapsed = (currentTime - startTime) / 1000 / 60; // in minutes
    if (timeElapsed === 0) return 0;
    return Math.round(userInput.length / timeElapsed) || 0;
  }, [startTime, endTime, userInput.length, testComplete]);

  // Get new text based on difficulty
  const getNewText = useCallback((): void => {
    const textsForDifficulty = textsByCategory[difficulty];
    const randomText =
      textsForDifficulty[Math.floor(Math.random() * textsForDifficulty.length)];
    setText(randomText);
  }, [difficulty]);

  // Start the test
  const startTest = (): void => {
    // Reset test state
    setUserInput("");
    setCurrentIndex(0);
    setErrors(0);
    setWordsTyped(0);
    setStartTime(Date.now());
    setEndTime(null);
    setTimeLeft(duration);
    setTestActive(true);
    setTestComplete(false);
    setShowConfetti(false);
    setIsNewRecord(false);
    getNewText();
  };

  // End the test
  const endTest = (): void => {
    if (!testActive) return;
    setEndTime(Date.now());
    setTestActive(false);
    setTestComplete(true);
    const finalWPM = calculateWPM();
    const finalAccuracy = calculateAccuracy();
    updatePersonalBest(finalWPM);
    addToHistory(finalWPM, finalAccuracy);
  };

  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!testActive || testComplete) return;
    const value = e.target.value;
    setUserInput(value);
    setCurrentIndex(value.length);
    updateErrorsAndWords(value);
    checkTestCompletion(value);
  };

  const changeDuration = (newDuration: number): void => {
    setDuration(newDuration);
    setTimeLeft(newDuration);
  };

  const toggleSound = (): void => {
    setSoundEnabled((prev) => !prev);
  };

  const changeDifficulty = (newDifficulty: TextDifficulty): void => {
    setDifficulty(newDifficulty);
  };

  const deleteHistoryItem = (id: string): void => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
    saveHistory();
  };

  const clearHistory = (): void => {
    setHistory([]);
    localStorage.removeItem("typingHistory");
  };

  const resetPersonalBest = (): void => {
    setPersonalBest(null);
    localStorage.removeItem("personalBest");
  };

  const getAverageWPM = (): number => {
    if (history.length === 0) return 0;
    const totalWPM = history.reduce((sum, entry) => sum + entry.wpm, 0);
    return Math.round(totalWPM / history.length);
  };

  const getImprovementPercentage = (): number => {
    if (!personalBest || history.length < 2) return 0;
    const latestWPM = history[history.length - 1].wpm;
    return Math.round(((latestWPM - personalBest) / personalBest) * 100);
  };

  // Helper functions
  const updateErrorsAndWords = (value: string): void => {
    let currentErrors = 0;
    let wordCount = 0;

    // Count errors
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) {
        currentErrors++;
      }
    }

    // Count words (accounting for correct spaces)
    const words = value.trim().split(/\s+/);
    wordCount = words.length > 0 && value.trim() !== "" ? words.length : 0;

    setErrors(currentErrors);
    setWordsTyped(wordCount);
  };

  const checkTestCompletion = (value: string): void => {
    if (value === text) {
      endTest();
      setShowConfetti(true);
    }
  };

  const updatePersonalBest = (wpm: number): void => {
    setPersonalBest((prevBest) => {
      if (!prevBest || wpm > prevBest) {
        setStreak((prevStreak) => prevStreak + 1);
        setIsNewRecord(true);
        localStorage.setItem("personalBest", wpm.toString());
        return wpm;
      } else {
        setStreak(0);
        setIsNewRecord(false);
        return prevBest;
      }
    });
  };

  const addToHistory = (wpm: number, accuracy: number): void => {
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      date: new Date(),
      wpm,
      accuracy,
      duration,
      textLength: text.length,
      difficulty,
    };
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, newEntry];
      localStorage.setItem("typingHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  const saveHistory = (): void => {
    try {
      localStorage.setItem("typingHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  };

  const loadSavedData = (): void => {
    try {
      // Load theme and settings
      const savedTheme = localStorage.getItem("theme") as ThemeOption | null;
      const savedSoundEnabled = localStorage.getItem("soundEnabled");
      const savedFocusMode = localStorage.getItem("focusMode");
      const savedInstantFeedback = localStorage.getItem("instantFeedback");
      const savedKeyboardLayout = localStorage.getItem(
        "keyboardLayout"
      ) as KeyboardLayout | null;
      const savedPersonalBest = localStorage.getItem("personalBest");
      const savedHistory = localStorage.getItem("typingHistory");

      if (savedTheme && Object.keys(THEMES).includes(savedTheme)) {
        setTheme(savedTheme);
      }

      setSoundEnabled(savedSoundEnabled === "true");
      setFocusMode(savedFocusMode === "true");
      setInstantFeedback(savedInstantFeedback !== "false");

      if (savedKeyboardLayout) {
        setKeyboardLayout(savedKeyboardLayout as KeyboardLayout);
      }

      if (savedPersonalBest) {
        setPersonalBest(parseInt(savedPersonalBest));
      }

      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Failed to load saved settings:", error);
    }
  };

  const saveSettings = (): void => {
    try {
      localStorage.setItem("theme", theme);
      localStorage.setItem("soundEnabled", String(soundEnabled));
      localStorage.setItem("focusMode", String(focusMode));
      localStorage.setItem("instantFeedback", String(instantFeedback));
      localStorage.setItem("keyboardLayout", keyboardLayout);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  return {
    text,
    userInput,
    startTime,
    endTime,
    currentIndex,
    errors,
    duration,
    timeLeft,
    testActive,
    testComplete,
    soundEnabled,
    wordsTyped,
    personalBest,
    streak,
    showConfetti,
    difficulty,
    theme,
    showHistory,
    showSettings,
    history,
    focusMode,
    keyboardLayout,
    instantFeedback,
    isNewRecord,
    calculateWPM,
    calculateAccuracy,
    calculateCPM,
    startTest,
    endTest,
    handleInputChange,
    changeDuration,
    toggleSound,
    changeDifficulty,
    deleteHistoryItem,
    clearHistory,
    resetPersonalBest,
    getAverageWPM,
    getImprovementPercentage,
    setTheme,
    setShowHistory,
    setShowSettings,
    setShowConfetti,
    setSoundEnabled,
    setFocusMode,
    setInstantFeedback,
    setKeyboardLayout,
  };
}
