import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { TextDifficulty } from "@/lib/types";
import { renderText } from "@/components/render-text";
import TestStats from "@/components/test-stats";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TEST_DURATIONS } from "@/lib/constants";
import { Award, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAudio } from "@/hooks/use-audio";
import { useTypingTestStore } from "@/store/useTypingTestStore";

export default function TypingTestContent() {
  const {
    text,
    userInput,
    currentIndex,
    errors,
    duration,
    testActive,
    timeLeft,
    testComplete,
    wordsTyped,
    personalBest,
    difficulty,
    focusMode,
    isNewRecord,
    soundEnabled,
    calculateWPM,
    calculateAccuracy,
    startTest,
    handleInputChange,
    changeDuration,
    changeDifficulty,
  } = useTypingTestStore();

  const inputRef = useRef<HTMLInputElement>(null);
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

  return (
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
          onValueChange={(value) => changeDifficulty(value as TextDifficulty)}
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
        onChange={(e) => handleInputChange(e.target.value)}
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
  );
}
