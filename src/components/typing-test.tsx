"use client";

import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  RotateCcw,
  Volume2,
  VolumeX,
  Keyboard,
  RefreshCw,
  Trophy,
} from "lucide-react";
import TestStats from "@/components/test-stats";
import { useAudio } from "@/hooks/use-audio";
// import { motion } from "motion/react";

// Sample text for typing test
const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
  "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages.",
  "The best way to predict the future is to invent it. Computer science is no more about computers than astronomy is about telescopes.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

// Additional texts for variety
const additionalTexts = [
  "The five boxing wizards jump quickly. How razorback-jumping frogs can level six piqued gymnasts!",
  "Technology is best when it brings people together. The advance of technology is based on making it fit in so that you don't really even notice it.",
  "Good code is its own best documentation. As you're about to add a comment, ask yourself, 'How can I improve the code so that this comment isn't needed?'",
];

// Combine all texts
const allTexts = [...sampleTexts, ...additionalTexts];

// Test durations in seconds
const TEST_DURATIONS = [15, 30, 60, 120];

export default function TypingTest() {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [duration, setDuration] = useState(30); // Default 30 seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [testActive, setTestActive] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [personalBest, setPersonalBest] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { playCorrectSound, playErrorSound } = useAudio();

  // Initialize with a random text
  useEffect(() => {
    setText(allTexts[Math.floor(Math.random() * allTexts.length)]);

    // Load personal best from localStorage if available
    const savedBest = localStorage.getItem("typeSonic_personalBest");
    if (savedBest) {
      setPersonalBest(parseInt(savedBest));
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (testActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval as NodeJS.Timeout);
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

  // Calculate stats
  const calculateWPM = useCallback(() => {
    if (!startTime) return 0;

    const currentTime = testComplete ? endTime : Date.now();
    if (!currentTime) return 0;

    const timeElapsed = (currentTime - startTime) / 1000 / 60; // in minutes
    if (timeElapsed === 0) return 0;

    return Math.round(wordsTyped / timeElapsed) || 0;
  }, [startTime, endTime, wordsTyped, testComplete]);

  const calculateAccuracy = useCallback(() => {
    if (userInput.length === 0) return 100;
    return Math.round(((userInput.length - errors) / userInput.length) * 100);
  }, [userInput.length, errors]);

  // Start the test
  const startTest = () => {
    setUserInput("");
    setCurrentIndex(0);
    setErrors(0);
    setWordsTyped(0);
    setStartTime(Date.now());
    setEndTime(null);
    setTimeLeft(duration);
    setTestActive(true);
    setTestComplete(false);
    setText(allTexts[Math.floor(Math.random() * allTexts.length)]);
    setShowConfetti(false);

    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // End the test
  const endTest = () => {
    setEndTime(Date.now());
    setTestActive(false);
    setTestComplete(true);

    const finalWPM = calculateWPM();

    // Check for personal best
    if (personalBest === null || finalWPM > personalBest) {
      setPersonalBest(finalWPM);
      localStorage.setItem("typeSonic_personalBest", finalWPM.toString());
      setStreak(streak + 1);
      setShowConfetti(true);
    }
  };

  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!testActive || testComplete) return;

    const value = e.target.value;
    const lastChar = value[value.length - 1];

    // Check if the typed character is correct
    if (value.length > 0 && text[value.length - 1] === lastChar) {
      if (soundEnabled) playCorrectSound();
    } else {
      if (soundEnabled) playErrorSound();
      setErrors((prev) => prev + 1);
    }

    setUserInput(value);
    setCurrentIndex(value.length);

    // Update words typed
    const words = value.trim().split(/\s+/);
    setWordsTyped(words.length);

    // If user completes all words before time runs out
    const totalWords = text.trim().split(/\s+/).length;
    if (words.length >= totalWords) {
      endTest();
    }
  };

  // Change test duration
  const changeDuration = (newDuration: number) => {
    setDuration(newDuration);
    setTimeLeft(newDuration);
    if (testActive) {
      endTest();
      setTestActive(false);
    }
  };

  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  // Get a new text
  const getNewText = () => {
    if (!testActive) {
      setText(allTexts[Math.floor(Math.random() * allTexts.length)]);
    }
  };

  // Render the text with highlighting for typed characters
  const renderText = () => {
    return text.split("").map((char, index) => {
      let className = "text-gray-400"; // Untyped text

      if (index < userInput.length) {
        // Correct character
        if (char === userInput[index]) {
          className = "text-primary font-medium";
        }
        // Incorrect character
        else {
          className = "text-red-500 font-medium bg-red-100 dark:bg-red-900/30";
        }
      }

      // Current position
      if (index === currentIndex) {
        className += " border-b-2 border-primary animate-pulse";
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  // Calculate time fraction for progress
  const timeFraction = timeLeft / duration;

  return (
    <div className="space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Keyboard className="h-6 w-6 text-primary" />
                TypeSonic
              </CardTitle>
              <CardDescription>
                Challenge your typing speed and accuracy
              </CardDescription>
            </div>

            {personalBest && (
              <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-md">
                <Trophy className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Personal Best</p>
                  <p className="font-bold text-amber-600 dark:text-amber-400">
                    {personalBest} WPM
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-2">
          <div className="mb-6 relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000 ease-linear"
              style={{ width: `${timeFraction * 100}%` }}
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-mono text-xl font-bold">{timeLeft}s</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={getNewText}
                disabled={testActive}
                title="New text">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSound}
                title={soundEnabled ? "Disable sound" : "Enable sound"}>
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={startTest}
                disabled={testActive}
                title="Reset test">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <TestStats
              wpm={calculateWPM()}
              accuracy={calculateAccuracy()}
              errors={errors}
              wordsTyped={wordsTyped}
            />
          </div>

          <div className="mb-6">
            <Tabs
              defaultValue={duration.toString()}
              onValueChange={(value) => changeDuration(Number.parseInt(value))}>
              <TabsList className="grid grid-cols-4 w-full">
                {TEST_DURATIONS.map((seconds) => (
                  <TabsTrigger
                    key={seconds}
                    value={seconds.toString()}
                    disabled={testActive}
                    className="text-sm">
                    {seconds}s
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg font-mono text-lg leading-relaxed tracking-wide border border-gray-200 dark:border-gray-700 shadow-inner">
            {renderText()}
          </div>

          <div className="mt-6">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              disabled={!testActive || testComplete}
              className="w-full p-4 border-2 rounded-lg font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder={
                testActive
                  ? "Start typing..."
                  : "Press the button below to start the test"
              }
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              onClick={startTest}
              disabled={testActive}
              className="px-10 py-6 text-lg font-medium transition-all hover:scale-105 bg-gradient-to-r from-primary to-primary/80">
              {testComplete ? "Try Again" : "Start Test"}
            </Button>
          </div>

          {testComplete && (
            <div className="mt-6 p-6 bg-primary/10 rounded-lg border border-primary/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Test Results
              </h3>
              <div className="flex flex-wrap gap-4">
                <Badge variant="outline" className="text-md py-2 px-4 border-2">
                  WPM: {calculateWPM()}
                </Badge>
                <Badge variant="outline" className="text-md py-2 px-4 border-2">
                  Words: {wordsTyped}
                </Badge>
                <Badge variant="outline" className="text-md py-2 px-4 border-2">
                  Accuracy: {calculateAccuracy()}%
                </Badge>
                <Badge variant="outline" className="text-md py-2 px-4 border-2">
                  Errors: {errors}
                </Badge>
                <Badge variant="outline" className="text-md py-2 px-4 border-2">
                  Time: {duration - timeLeft}s
                </Badge>
              </div>

              {showConfetti && (
                <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-md border border-amber-200 dark:border-amber-800">
                  <p className="text-center text-amber-800 dark:text-amber-300 font-medium">
                    🎉 New Personal Best! {calculateWPM()} WPM 🎉
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
