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
import { X, History } from "lucide-react";
import { format } from "date-fns";
import { getWPMGrade } from "@/lib/get-wpm-grade";
import { useTypingTestStore } from "@/store/useTypingTestStore";

export default function HistoryPanel() {
  const { showHistory, history, deleteHistoryItem, setShowHistory } =
    useTypingTestStore();
  return (
    <Sheet open={showHistory} onOpenChange={setShowHistory}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <History className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Test History</SheetTitle>
          <SheetDescription>
            View your previous typing test results
          </SheetDescription>
        </SheetHeader>

        {history.length > 0 ? (
          <ScrollArea className="h-[70vh] pr-4 my-4">
            <div className="space-y-4">
              {history.map((entry) => (
                <Card key={entry.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => deleteHistoryItem(entry.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">
                          {format(new Date(entry.date), "MMM d, yyyy")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">
                          {format(new Date(entry.date), "h:mm a")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">WPM</p>
                        <p className="font-medium text-lg">{entry.wpm}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Level</p>
                        <p className="font-medium">{getWPMGrade(entry.wpm)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Accuracy
                        </p>
                        <p className="font-medium">{entry.accuracy}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Duration
                        </p>
                        <p className="font-medium">{entry.duration}s</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-40">
            <History className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No history yet</p>
            <p className="text-sm text-muted-foreground">
              Complete your first test to see results here
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
