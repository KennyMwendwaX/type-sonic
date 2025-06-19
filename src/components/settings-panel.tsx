"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
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
import {
  Settings,
  Trash2,
  Palette,
  Keyboard,
  Bell,
  Eye,
  Zap,
} from "lucide-react";
import { ThemeOption, THEMES } from "@/lib/constants";
import type { KeyboardLayout } from "@/lib/types";
import { useTypingTestStore } from "@/store/useTypingTestStore";
import { motion } from "motion/react";

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
    toggleSound,
    setFocusMode,
    setInstantFeedback,
    setKeyboardLayout,
  } = useTypingTestStore();

  return (
    <Sheet open={showSettings} onOpenChange={setShowSettings}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden group text-foreground">
          <Settings className="h-4 w-4 transition-transform group-hover:scale-110" />
          <span className="sr-only">Open settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:w-[600px] p-0 overflow-hidden">
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="text-xl">Settings</SheetTitle>
            <SheetDescription className="text-sm mt-1">
              Customize your typing test experience
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-auto">
            <div className="p-6 space-y-6">
              <SettingsSection
                title="Appearance"
                icon={<Palette className="h-4 w-4" />}>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(THEMES) as ThemeOption[]).map((themeOption) => (
                    <Button
                      key={themeOption}
                      variant={theme === themeOption ? "default" : "outline"}
                      className={`justify-start ${THEMES[themeOption]}`}
                      onClick={() => setTheme(themeOption)}>
                      {themeOption.charAt(0).toUpperCase() +
                        themeOption.slice(1)}
                    </Button>
                  ))}
                </div>
              </SettingsSection>

              <SettingsSection
                title="Test Options"
                icon={<Zap className="h-4 w-4" />}>
                <SettingsToggle
                  id="sound"
                  label="Sound Effects"
                  checked={soundEnabled}
                  onCheckedChange={toggleSound}
                  icon={<Bell className="h-4 w-4" />}
                />
                <SettingsToggle
                  id="focus"
                  label="Focus Mode"
                  checked={focusMode}
                  onCheckedChange={setFocusMode}
                  icon={<Eye className="h-4 w-4" />}
                />
                <SettingsToggle
                  id="feedback"
                  label="Instant Feedback"
                  checked={instantFeedback}
                  onCheckedChange={setInstantFeedback}
                  icon={<Zap className="h-4 w-4" />}
                />
              </SettingsSection>

              <SettingsSection
                title="Keyboard Layout"
                icon={<Keyboard className="h-4 w-4" />}>
                <Select
                  value={keyboardLayout}
                  onValueChange={(value) =>
                    setKeyboardLayout(value as KeyboardLayout)
                  }>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">QWERTY</SelectItem>
                    <SelectItem value="dvorak">Dvorak</SelectItem>
                    <SelectItem value="colemak">Colemak</SelectItem>
                    <SelectItem value="workman">Workman</SelectItem>
                  </SelectContent>
                </Select>
              </SettingsSection>

              <SettingsSection
                title="Reset Data"
                icon={<Trash2 className="h-4 w-4" />}>
                <div className="space-y-2">
                  <Button
                    variant="destructive"
                    onClick={resetPersonalBest}
                    className="w-full justify-start">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Reset Personal Best
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={clearHistory}
                    className="w-full justify-start">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear History
                  </Button>
                </div>
              </SettingsSection>
            </div>
          </div>

          <div className="p-6 border-t">
            <Button onClick={() => setShowSettings(false)} className="w-full">
              Close Settings
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SettingsSection({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      {children}
      <Separator className="mt-4" />
    </motion.div>
  );
}

function SettingsToggle({
  id,
  label,
  checked,
  onCheckedChange,
  icon,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        {icon}
        <Label htmlFor={id} className="text-sm">
          {label}
        </Label>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
