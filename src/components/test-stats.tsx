import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Keyboard,
  Percent,
  AlertCircle,
  FileText,
  Clock,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TestStatsProps {
  wpm: number;
  accuracy: number;
  errors: number;
  wordsTyped: number;
  duration?: number;
  personalBest?: number | null;
  isNewRecord?: boolean;
}

export default function TestStats({
  wpm,
  accuracy,
  errors,
  wordsTyped,
  duration = 30,
  personalBest = null,
  isNewRecord = false,
}: TestStatsProps) {
  const statsItems = [
    {
      label: "WPM",
      value: wpm,
      icon: Keyboard,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    },
    {
      label: "Accuracy",
      value: `${accuracy}%`,
      icon: Percent,
      color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
    },
    {
      label: "Errors",
      value: errors,
      icon: AlertCircle,
      color: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
    },
    {
      label: "Words",
      value: wordsTyped,
      icon: FileText,
      color:
        "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
    },
    {
      label: "Time",
      value: `${duration}s`,
      icon: Clock,
      color:
        "bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {statsItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
            }}
            className={cn(
              "rounded-xl p-4 shadow-sm flex flex-col items-center justify-center space-y-2",
              item.color
            )}>
            <div className="p-2 rounded-full bg-white/50 dark:bg-black/20">
              <item.icon className="w-6 h-6" />
            </div>
            <p className="text-xs font-medium opacity-70">{item.label}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {personalBest !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}>
          <Card className="border-2 border-primary/10">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy
                    className={cn(
                      "w-5 h-5",
                      isNewRecord
                        ? "text-amber-500 animate-bounce"
                        : "text-gray-400"
                    )}
                  />
                  <p className="text-sm font-medium text-muted-foreground">
                    Personal Best
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp
                    className={cn(
                      "w-4 h-4",
                      isNewRecord
                        ? "text-green-500 animate-pulse"
                        : "text-gray-400"
                    )}
                  />
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isNewRecord ? "text-green-500" : "text-muted-foreground"
                    )}>
                    {isNewRecord
                      ? "New Record!"
                      : personalBest
                      ? `${Math.max(0, wpm - personalBest)} WPM Improvement`
                      : "First attempt"}
                  </p>
                </div>
              </div>

              <Progress
                value={(wpm / (personalBest || wpm)) * 100}
                className="h-2"
              />

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Previous Best: {personalBest || 0} WPM
                </span>
                <span className="font-bold text-primary">
                  Current: {wpm} WPM
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
