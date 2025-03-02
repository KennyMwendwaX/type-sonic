import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useTypingTest } from "@/hooks/use-typing-test";
import { RotateCcw, Award } from "lucide-react";

export default function TypingTestFooter() {
  const { testActive, testComplete, streak, startTest, endTest } =
    useTypingTest();

  return (
    <CardFooter className="flex justify-between">
      {testComplete ? (
        <Button onClick={startTest} className="flex items-center">
          <RotateCcw className="h-4 w-4 mr-2" />
          Restart Test
        </Button>
      ) : testActive ? (
        <Button variant="destructive" onClick={endTest}>
          End Test
        </Button>
      ) : (
        <div></div>
      )}

      {streak > 0 && (
        <div className="text-sm flex items-center text-orange-600 dark:text-orange-400">
          <Award className="h-4 w-4 mr-1" />
          Streak: {streak}
        </div>
      )}
    </CardFooter>
  );
}
