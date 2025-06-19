import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
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
        <div className="text-2xl">Speed Typing Test</div>
        <div className="text-md">Test your typing speed and accuracy</div>
      </div>
      <div className="flex gap-2">
        <SettingsPanel />
        <HistoryPanel />

        <Button
          variant="outline"
          size="icon"
          onClick={toggleSound}
          className="text-foreground"
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
