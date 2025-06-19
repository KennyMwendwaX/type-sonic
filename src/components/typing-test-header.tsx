"use client";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import SettingsPanel from "./settings-panel";
import HistoryPanel from "./history-panel";
import { useTypingTestStore } from "@/store/useTypingTestStore";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function TypingTestHeader() {
  const {
    testActive,
    soundEnabled,
    focusMode,
    fullscreenMode,
    toggleSound,
    toggleFullscreenMode,
  } = useTypingTestStore();

  return (
    <CardHeader
      className={`pb-2 flex flex-row items-center justify-between ${
        focusMode && testActive ? "sr-only" : ""
      }`}>
      <div>
        <CardTitle>Speed Typing Test</CardTitle>
        <CardDescription>Test your typing speed and accuracy</CardDescription>
      </div>
      <div className="flex gap-2">
        <SettingsPanel />
        <HistoryPanel />

        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              size="icon"
              className="text-foreground"
              onClick={toggleSound}
              aria-label={soundEnabled ? "Disable sound" : "Enable sound"}>
              {soundEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{soundEnabled ? "Mute" : "Unmute"}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreenMode}
              aria-label={
                fullscreenMode ? "Exit fullscreen" : "Enter fullscreen"
              }
              className="text-foreground transition-all duration-200 hover:scale-105">
              {fullscreenMode ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {fullscreenMode ? "Minimize" : "Maximize"}
          </TooltipContent>
        </Tooltip>
      </div>
    </CardHeader>
  );
}
