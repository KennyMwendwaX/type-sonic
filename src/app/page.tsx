import TypingTest from "@/components/typing-test";
import { Keyboard, Trophy, Star, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Keyboard className="h-10 w-10 text-primary" />
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              TypeSonic
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Test and improve your typing speed and accuracy with our interactive
            typing challenges
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span>Track your progress</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
              <Star className="h-5 w-5 text-blue-500" />
              <span>Beat your personal best</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
              <Activity className="h-5 w-5 text-green-500" />
              <span>Improve your skills</span>
            </div>
          </div>
        </header>

        <TypingTest />

        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p className="mb-2">Improve your typing speed daily with TypeSonic</p>
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="ghost" size="sm">
              About
            </Button>
            <Button variant="ghost" size="sm">
              Leaderboard
            </Button>
            <Button variant="ghost" size="sm">
              Support
            </Button>
          </div>
        </footer>
      </div>
    </main>
  );
}
