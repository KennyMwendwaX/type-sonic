import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings, Trash2 } from "lucide-react";
import { THEMES } from "@/lib/constants";
import { ThemeOption, KeyboardLayout } from "@/lib/types";
import { useTypingTest } from "@/hooks/use-typing-test";

export default function SettingsPanel() {
  const {
    soundEnabled,
    theme,
    showSettings,
    focusMode,
    keyboardLayout,
    instantFeedback,
    clearHistory,
    resetPersonalBest,
    setTheme,
    setShowSettings,
    setSoundEnabled,
    setFocusMode,
    setInstantFeedback,
    setKeyboardLayout,
  } = useTypingTest();
  return (
    <Sheet open={showSettings} onOpenChange={setShowSettings}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Customize your typing test experience
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Appearance</h3>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(THEMES) as ThemeOption[]).map((themeOption) => (
                <Button
                  key={themeOption}
                  variant={theme === themeOption ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setTheme(themeOption)}>
                  {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Test Options</h3>

            <div className="flex items-center justify-between">
              <Label htmlFor="sound">Sound Effects</Label>
              <Switch
                id="sound"
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="focus">Focus Mode</Label>
              <Switch
                id="focus"
                checked={focusMode}
                onCheckedChange={setFocusMode}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="feedback">Instant Feedback</Label>
              <Switch
                id="feedback"
                checked={instantFeedback}
                onCheckedChange={setInstantFeedback}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Keyboard Layout</h3>
            <Select
              value={keyboardLayout}
              onValueChange={(value) =>
                setKeyboardLayout(value as KeyboardLayout)
              }>
              <SelectTrigger>
                <SelectValue placeholder="Select layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">QWERTY</SelectItem>
                <SelectItem value="dvorak">Dvorak</SelectItem>
                <SelectItem value="colemak">Colemak</SelectItem>
                <SelectItem value="workman">Workman</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Reset Data</h3>
            <div className="flex flex-col gap-2">
              <Button
                variant="destructive"
                onClick={resetPersonalBest}
                className="justify-start">
                <Trash2 className="h-4 w-4 mr-2" />
                Reset Personal Best
              </Button>
              <Button
                variant="destructive"
                onClick={clearHistory}
                className="justify-start">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear History
              </Button>
            </div>
          </div>
        </div>
        <SheetClose asChild>
          <Button className="mt-4">Close Settings</Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
