"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  History,
  Trash2,
  Award,
  X,
  Target,
  BarChart2,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { getWPMGrade } from "@/lib/get-wpm-grade";
import { useTypingTestStore } from "@/store/useTypingTestStore";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export default function HistoryPanel() {
  const {
    showHistory,
    history,
    deleteHistoryItem,
    clearHistory,
    setShowHistory,
  } = useTypingTestStore();

  const getWPMColor = (wpm: number) => {
    if (wpm < 30) return "text-red-500";
    if (wpm < 50) return "text-orange-500";
    if (wpm < 70) return "text-yellow-500";
    if (wpm < 90) return "text-green-500";
    return "text-blue-600";
  };

  const getGradientClass = (wpm: number) => {
    if (wpm < 30) return "from-red-500/10 to-red-500/5";
    if (wpm < 50) return "from-orange-500/10 to-orange-500/5";
    if (wpm < 70) return "from-yellow-500/10 to-yellow-500/5";
    if (wpm < 90) return "from-green-500/10 to-green-500/5";
    return "from-blue-500/10 to-blue-500/5";
  };

  return (
    <Sheet open={showHistory} onOpenChange={setShowHistory}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden group text-foreground">
          <History className="h-4 w-4 transition-transform group-hover:scale-110" />
          <span className="sr-only">View typing history</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:w-[600px] p-0 overflow-hidden">
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6 border-b bg-gradient-to-r from-background to-muted/20">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Typing History
                </SheetTitle>
                <SheetDescription className="text-sm mt-1">
                  Track your progress and improvements over time
                </SheetDescription>
              </div>
              {history.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={clearHistory}
                  className="flex items-center gap-1.5 h-8 px-3">
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear All</span>
                </Button>
              )}
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-hidden">
            {history.length > 0 ? (
              <ScrollArea className="h-full py-6">
                <div className="px-6 space-y-4 pb-6">
                  <AnimatePresence initial={false}>
                    {history.map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          delay: index * 0.05,
                        }}>
                        <Card
                          className={cn(
                            "overflow-hidden hover:shadow-lg transition-all duration-300 group relative border-0 shadow-sm",
                            "bg-gradient-to-br",
                            getGradientClass(entry.wpm)
                          )}>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-3 right-3 h-7 w-7 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => deleteHistoryItem(entry.id)}>
                            <X className="h-3.5 w-3.5" />
                            <span className="sr-only">Delete entry</span>
                          </Button>

                          <CardContent className="p-5">
                            {/* Header with date and grade */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-background/50 backdrop-blur-sm">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">
                                    {format(
                                      new Date(entry.date),
                                      "MMM d, yyyy"
                                    )}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {format(new Date(entry.date), "h:mm a")}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="px-3 py-1 rounded-full bg-background/60 backdrop-blur-sm border border-border/50">
                                  <span className="text-xs font-semibold text-foreground">
                                    {getWPMGrade(entry.wpm)}
                                  </span>
                                </div>
                                {entry.wpm >= 90 && (
                                  <div className="p-1.5 rounded-full bg-amber-500/20 backdrop-blur-sm">
                                    <Award className="h-3.5 w-3.5 text-amber-600" />
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Main metrics */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <MetricCard
                                icon={<BarChart2 className="h-4 w-4" />}
                                label="Words per minute"
                                value={entry.wpm}
                                unit="WPM"
                                valueClass={getWPMColor(entry.wpm)}
                                progress={Math.min(
                                  (entry.wpm / 120) * 100,
                                  100
                                )}
                                progressColor={getWPMColorValue(entry.wpm)}
                              />

                              <MetricCard
                                icon={<Target className="h-4 w-4" />}
                                label="Accuracy"
                                value={entry.accuracy}
                                unit="%"
                                valueClass={getAccuracyColor(entry.accuracy)}
                                progress={entry.accuracy}
                                progressColor={getAccuracyColorValue(
                                  entry.accuracy
                                )}
                              />
                            </div>

                            {/* Performance indicator */}
                            <div className="flex items-center justify-between pt-3 border-t border-border/30">
                              <div className="flex items-center gap-2">
                                <div
                                  className={cn(
                                    "w-2 h-2 rounded-full",
                                    entry.wpm >= 70
                                      ? "bg-green-500"
                                      : entry.wpm >= 50
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  )}
                                />
                                <span className="text-xs text-muted-foreground">
                                  {entry.wpm >= 70
                                    ? "Excellent"
                                    : entry.wpm >= 50
                                    ? "Good"
                                    : "Needs improvement"}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Test #{history.length - index}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MetricCard({
  icon,
  label,
  value,
  unit,
  valueClass,
  progress,
  progressColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
  valueClass: string;
  progress: number;
  progressColor: string;
}) {
  return (
    <div className="bg-background/40 backdrop-blur-sm rounded-xl p-4 border border-border/30">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-muted-foreground">{icon}</div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline gap-1">
          <span className={cn("text-2xl font-bold", valueClass)}>{value}</span>
          <span className="text-xs text-muted-foreground font-medium">
            {unit}
          </span>
        </div>

        <div className="relative">
          <div className="w-full bg-muted/30 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: progressColor }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex flex-col items-center justify-center h-[60vh] px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 border border-border/30">
        <History className="h-10 w-10 text-primary/70" />
      </div>
      <h3 className="text-xl font-semibold mb-3">No typing history yet</h3>
      <p className="text-sm text-muted-foreground max-w-[320px] mb-8 leading-relaxed">
        Complete your first typing test to start tracking your progress and see
        your improvements over time
      </p>
      <Button variant="default" onClick={() => {}} className="gap-2 px-6">
        <Target className="h-4 w-4" />
        <span>Start a typing test</span>
      </Button>
    </motion.div>
  );
}

// Helper functions for color values
function getWPMColorValue(wpm: number): string {
  if (wpm < 30) return "#ef4444";
  if (wpm < 50) return "#f97316";
  if (wpm < 70) return "#eab308";
  if (wpm < 90) return "#22c55e";
  return "#2563eb";
}

function getAccuracyColor(accuracy: number): string {
  if (accuracy < 80) return "text-red-500";
  if (accuracy < 95) return "text-yellow-600";
  return "text-green-600";
}

function getAccuracyColorValue(accuracy: number): string {
  if (accuracy < 80) return "#ef4444";
  if (accuracy < 95) return "#ca8a04";
  return "#16a34a";
}
