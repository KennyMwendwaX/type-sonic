import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Keyboard,
  Percent,
  AlertCircle,
  FileText,
  Clock,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    { label: "WPM", value: wpm, icon: Keyboard, color: "text-blue-500" },
    {
      label: "Accuracy",
      value: `${accuracy}%`,
      icon: Percent,
      color: "text-green-500",
    },
    {
      label: "Errors",
      value: errors,
      icon: AlertCircle,
      color: "text-red-500",
    },
    {
      label: "Words",
      value: wordsTyped,
      icon: FileText,
      color: "text-purple-500",
    },
    {
      label: "Time",
      value: `${duration}s`,
      icon: Clock,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-x divide-y">
            {statsItems.map((item) => (
              <div
                key={item.label}
                className="p-4 flex flex-col items-center justify-center">
                <item.icon className={cn("w-6 h-6 mb-2", item.color)} />
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {personalBest !== null && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Personal Best
              </p>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                <p className="text-sm font-medium text-green-500">
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
            <div className="flex justify-between mt-2 text-sm">
              <span>{personalBest || 0} WPM</span>
              <span className="font-medium">{wpm} WPM</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
