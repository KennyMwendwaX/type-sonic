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
  Clock,
  Target,
  BarChart2,
} from "lucide-react";
import { format } from "date-fns";
import { getWPMGrade } from "@/lib/get-wpm-grade";
import { useTypingTestStore } from "@/store/useTypingTestStore";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

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
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-xl">Typing History</SheetTitle>
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
              <ScrollArea className="h-full py-4">
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
                        <Card className="overflow-hidden border-l-4 hover:shadow-md transition-shadow duration-200 group relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => deleteHistoryItem(entry.id)}>
                            <X className="h-3.5 w-3.5" />
                            <span className="sr-only">Delete entry</span>
                          </Button>

                          <CardContent className="p-3 sm:p-4">
                            <div className="relative">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm">
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

                                <div className="flex-1 flex justify-end">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-muted">
                                      {getWPMGrade(entry.wpm)}
                                    </span>
                                    {entry.wpm >= 90 && (
                                      <Award className="h-4 w-4 text-amber-500" />
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                <MetricCard
                                  icon={<BarChart2 className="h-3.5 w-3.5" />}
                                  label="WPM"
                                  value={entry.wpm}
                                  valueClass={getWPMColor(entry.wpm)}
                                  progress={Math.min(
                                    (entry.wpm / 120) * 100,
                                    100
                                  )}
                                  progressColor={getWPMColorValue(entry.wpm)}
                                />

                                <MetricCard
                                  icon={<Target className="h-3.5 w-3.5" />}
                                  label="Accuracy"
                                  value={`${entry.accuracy}%`}
                                  valueClass={getAccuracyColor(entry.accuracy)}
                                  progress={entry.accuracy}
                                  progressColor={getAccuracyColorValue(
                                    entry.accuracy
                                  )}
                                />
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
  valueClass,
  progress,
  progressColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  valueClass: string;
  progress: number;
  progressColor: string;
}) {
  return (
    <div className="bg-muted/40 rounded-lg p-2">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <div className="text-muted-foreground">{icon}</div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
        </div>
        <p className={cn("text-sm font-bold", valueClass)}>{value}</p>
      </div>
      <Progress
        value={progress}
        className="h-1 bg-muted"
        style={{ backgroundColor: progressColor }}
      />
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
      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
        <History className="h-8 w-8 text-muted-foreground opacity-70" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No typing history yet</h3>
      <p className="text-sm text-muted-foreground max-w-[280px] mb-6">
        Complete your first typing test to start tracking your progress and see
        your improvements over time
      </p>
      <Button variant="outline" onClick={() => {}} className="gap-2">
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
