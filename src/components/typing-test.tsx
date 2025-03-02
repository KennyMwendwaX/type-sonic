"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, RotateCcw, Volume2, VolumeX, Award } from "lucide-react";
import TestStats from "@/components/test-stats";
import { useAudio } from "@/hooks/use-audio";
import { useTypingTest } from "@/hooks/use-typing-test";
import { renderText } from "@/components/render-text";
import { TEST_DURATIONS, THEMES } from "@/lib/constants";
import { TextDifficulty, ThemeOption } from "@/lib/types";
import Confetti from "react-confetti";
import SettingsPanel from "./settings-panel";
import HistoryPanel from "./history-panel";

export default function TypingTest() {
  const {
    text,
    userInput,
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
    focusMode,
    isNewRecord,
    calculateWPM,
    calculateAccuracy,
    startTest,
    endTest,
    handleInputChange,
    changeDuration,
    toggleSound,
    changeDifficulty,

    setShowConfetti,
  } = useTypingTest();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playCorrectSound, playErrorSound } = useAudio();

  // Focus input when test starts
  useEffect(() => {
    if (testActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [testActive]);

  // Play sounds on keypress if enabled
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!testActive || !soundEnabled) return;

      const currentChar = text[currentIndex];
      if (e.key === currentChar) {
        playCorrectSound();
      } else if (e.key !== "Shift" && e.key !== "Control" && e.key !== "Alt") {
        playErrorSound();
      }
    };

    if (soundEnabled && testActive) {
      window.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    testActive,
    soundEnabled,
    text,
    currentIndex,
    playCorrectSound,
    playErrorSound,
  ]);

  // Calculate time fraction for progress
  const timeFraction = timeLeft / duration;

  // Card classes based on selected theme
  const cardClasses = `border-2 shadow-lg transition-all duration-300 ${
    THEMES[theme as ThemeOption]
  }`;

  return (
    <div className="space-y-6" ref={containerRef}>
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 500}
          height={typeof window !== "undefined" ? window.innerHeight : 500}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
          onConfettiComplete={() => {
            setTimeout(() => {
              setShowConfetti(false);
            }, 3000);
          }}
        />
      )}

      <TooltipProvider>
        <Card className={cardClasses}>
          <CardHeader
            className={`pb-2 flex flex-row items-center justify-between ${
              focusMode && testActive ? "sr-only" : ""
            }`}>
            <div>
              <CardTitle>Speed Typing Test</CardTitle>
              <CardDescription>
                Test your typing speed and accuracy
              </CardDescription>
            </div>

            <div className="flex gap-2">
              <SettingsPanel />

              <HistoryPanel />

              <Button
                variant="outline"
                size="icon"
                onClick={toggleSound}
                aria-label={soundEnabled ? "Disable sound" : "Enable sound"}>
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Duration selector */}
            <div className={`${focusMode && testActive ? "sr-only" : ""}`}>
              <Tabs
                defaultValue={duration.toString()}
                onValueChange={(value) => changeDuration(parseInt(value))}
                className="w-full">
                <TabsList className="w-full">
                  {TEST_DURATIONS.map((seconds) => (
                    <TabsTrigger
                      key={seconds}
                      value={seconds.toString()}
                      disabled={testActive}
                      className="flex-1">
                      <Clock className="h-4 w-4 mr-2" />
                      {seconds}s
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Difficulty selector */}
            <div className={`${focusMode && testActive ? "sr-only" : ""}`}>
              <Select
                value={difficulty}
                onValueChange={(value) =>
                  changeDifficulty(value as TextDifficulty)
                }
                disabled={testActive}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                  <SelectItem value="code">Code</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Timer progress */}
            {testActive && (
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000"
                  style={{ width: `${timeFraction * 100}%` }}
                />
              </div>
            )}

            {/* Text display area */}
            <div
              className={`p-4 rounded-md bg-gray-50 dark:bg-gray-900 min-h-[150px] font-mono text-lg leading-relaxed relative ${
                !testActive && !testComplete ? "cursor-pointer" : ""
              }`}
              onClick={() => {
                if (!testActive && !testComplete && inputRef.current) {
                  inputRef.current.focus();
                }
              }}>
              {/* Text rendering */}
              <div className="overflow-auto max-h-[400px]">
                {renderText(text, userInput, currentIndex)}
              </div>

              {/* Overlay for inactive state */}
              {!testActive && !testComplete && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-md">
                  <Button onClick={startTest} className="text-lg px-8 py-6">
                    Start Typing Test
                  </Button>
                </div>
              )}
            </div>

            {/* Hidden input field for capturing typing */}
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="sr-only"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              aria-label="Typing input"
              disabled={!testActive || testComplete}
            />

            {/* Results display */}
            {testComplete && (
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Results</h3>
                  {isNewRecord && (
                    <div className="flex items-center bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-sm font-medium">
                      <Award className="h-4 w-4 mr-1" />
                      New Record!
                    </div>
                  )}
                </div>

                <TestStats
                  wpm={calculateWPM()}
                  accuracy={calculateAccuracy()}
                  errors={errors}
                  wordsTyped={wordsTyped}
                  duration={duration}
                  personalBest={personalBest}
                  isNewRecord={isNewRecord}
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {testComplete ? (
              <Button onClick={startTest} className="flex items-center">
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart Test
              </Button>
            ) : testActive ? (
              <Button variant="destructive" onClick={endTest}>
                End Test
              </Button>
            ) : (
              <div></div>
            )}

            {streak > 0 && (
              <div className="text-sm flex items-center text-orange-600 dark:text-orange-400">
                <Award className="h-4 w-4 mr-1" />
                Streak: {streak}
              </div>
            )}
          </CardFooter>
        </Card>
      </TooltipProvider>
    </div>
  );
}
