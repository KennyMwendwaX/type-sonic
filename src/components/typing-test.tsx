"use client";

import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, RotateCcw, Volume2, VolumeX } from "lucide-react";
import TestStats from "@/components/test-stats";
import { useAudio } from "@/hooks/use-audio";

// Sample text for typing test
const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
  "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages.",
  "The best way to predict the future is to invent it. Computer science is no more about computers than astronomy is about telescopes.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

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
  const inputRef = useRef<HTMLInputElement>(null);

  const { playCorrectSound, playErrorSound } = useAudio();

  // Initialize with a random text
  useEffect(() => {
    setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
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
    setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);

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

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="font-mono text-xl">{timeLeft}s</span>
            </div>
            <div className="flex gap-2">
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

          <TestStats
            wpm={calculateWPM()}
            accuracy={calculateAccuracy()}
            errors={errors}
            wordsTyped={wordsTyped}
          />

          <div className="mt-6">
            <Tabs
              defaultValue={duration.toString()}
              onValueChange={(value) => changeDuration(Number.parseInt(value))}>
              <TabsList className="grid grid-cols-4 mb-4">
                {TEST_DURATIONS.map((seconds) => (
                  <TabsTrigger
                    key={seconds}
                    value={seconds.toString()}
                    disabled={testActive}>
                    {seconds}s
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-md font-mono text-lg leading-relaxed tracking-wide">
            {renderText()}
          </div>

          <div className="mt-6">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              disabled={!testActive || testComplete}
              className="w-full p-3 border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"
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
              className="px-8">
              {testComplete ? "Try Again" : "Start Test"}
            </Button>
          </div>

          {testComplete && (
            <div className="mt-6 p-4 bg-primary/10 rounded-md">
              <h3 className="text-lg font-bold mb-2">Test Results</h3>
              <div className="flex flex-wrap gap-4">
                <Badge variant="outline" className="text-sm py-1 px-3">
                  WPM: {calculateWPM()}
                </Badge>
                <Badge variant="outline" className="text-sm py-1 px-3">
                  Words: {wordsTyped}
                </Badge>
                <Badge variant="outline" className="text-sm py-1 px-3">
                  Accuracy: {calculateAccuracy()}%
                </Badge>
                <Badge variant="outline" className="text-sm py-1 px-3">
                  Errors: {errors}
                </Badge>
                <Badge variant="outline" className="text-sm py-1 px-3">
                  Time: {duration - timeLeft}s
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
