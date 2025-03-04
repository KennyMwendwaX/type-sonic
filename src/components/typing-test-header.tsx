import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Volume2, VolumeX } from "lucide-react";
import SettingsPanel from "./settings-panel";
import HistoryPanel from "./history-panel";
import { useTypingTestStore } from "@/store/useTypingTestStore";

export default function TypingTestHeader() {
  const { testActive, soundEnabled, focusMode, toggleSound } =
    useTypingTestStore();

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
  );
}
