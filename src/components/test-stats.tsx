import { Card, CardContent } from "@/components/ui/card";
import { Keyboard, Percent, AlertCircle, FileText } from "lucide-react";

interface TestStatsProps {
  wpm: number;
  accuracy: number;
  errors: number;
  wordsTyped: number;
}

export default function TestStats({
  wpm,
  accuracy,
  errors,
  wordsTyped,
}: TestStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-md">
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
            <Keyboard className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">WPM</p>
          <p className="text-3xl font-bold">{wpm}</p>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-md">
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
            <Percent className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Accuracy</p>
          <p className="text-3xl font-bold">{accuracy}%</p>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-md">
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
            <AlertCircle className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Errors</p>
          <p className="text-3xl font-bold">{errors}</p>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-md">
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Words</p>
          <p className="text-3xl font-bold">{wordsTyped}</p>
        </CardContent>
      </Card>
    </div>
  );
}
