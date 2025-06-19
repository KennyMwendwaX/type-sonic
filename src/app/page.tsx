import TypingTest from "@/components/typing-test";
import {
  Keyboard,
  Trophy,
  Star,
  Activity,
  Github,
  Heart,
  Zap,
  Target,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
              <Keyboard className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">TypeSonic</h1>
              <p className="text-xs text-muted-foreground">
                Ultimate Typing Test
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="hidden sm:flex bg-secondary text-secondary-foreground">
              🚀 v2.0
            </Badge>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-16 space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">
                The Ultimate Typing Experience
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground">
              Master Your{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Typing Speed
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Test and improve your typing speed and accuracy with our
              interactive challenges. Track your progress, beat your personal
              best, and become a typing master with real-time feedback.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card text-card-foreground border border-border rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
              <Trophy className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
              <span className="text-sm font-medium">Track Progress</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card text-card-foreground border border-border rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
              <Star className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              <span className="text-sm font-medium">Beat Personal Best</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card text-card-foreground border border-border rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
              <Activity className="h-4 w-4 text-green-500 dark:text-green-400" />
              <span className="text-sm font-medium">Improve Skills</span>
            </div>
          </div>
        </section>

        {/* Main Typing Test */}
        <section className="mb-20">
          <TypingTest />
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to become a faster, more accurate typist
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-card text-card-foreground border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/20">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">4</div>
                <div className="text-card-foreground font-medium">
                  Difficulty Levels
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Easy to Code challenges
                </div>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-card text-card-foreground border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/20">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">12</div>
                <div className="text-card-foreground font-medium">
                  Beautiful Themes
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Customize your experience
                </div>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-card text-card-foreground border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/20">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">∞</div>
                <div className="text-card-foreground font-medium">
                  Practice Texts
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Endless variety
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose TypeSonic?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Advanced features designed to accelerate your typing improvement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card text-card-foreground border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:scale-105 hover:border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                </div>
                <CardTitle className="text-card-foreground">
                  Real-time Feedback
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Get instant feedback on your typing with live WPM and accuracy
                  tracking as you type
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card text-card-foreground border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:scale-105 hover:border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-green-500/10 dark:bg-green-400/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-500 dark:text-green-400" />
                </div>
                <CardTitle className="text-card-foreground">
                  Progress Tracking
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Monitor your improvement over time with detailed statistics,
                  history, and performance analytics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card text-card-foreground border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:scale-105 hover:border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-400/10 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                </div>
                <CardTitle className="text-card-foreground">
                  Multiple Themes
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Choose from 12 beautiful themes including cosmic gradients and
                  aurora effects
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card text-card-foreground border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:scale-105 hover:border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-amber-500 dark:text-amber-400" />
                </div>
                <CardTitle className="text-card-foreground">
                  Achievement System
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Celebrate your progress with streaks, personal bests, and
                  achievement badges
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card text-card-foreground border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:scale-105 hover:border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 dark:bg-red-400/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-red-500 dark:text-red-400" />
                </div>
                <CardTitle className="text-card-foreground">
                  Focus Mode
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Distraction-free typing environment with customizable settings
                  and audio feedback
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card text-card-foreground border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:scale-105 hover:border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 dark:bg-cyan-400/10 flex items-center justify-center mb-4">
                  <Keyboard className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
                </div>
                <CardTitle className="text-card-foreground">
                  Multiple Layouts
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Support for QWERTY, Dvorak, Colemak, and Workman keyboard
                  layouts
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16">
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
            <CardContent className="pt-12 pb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Improve Your Typing?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of users who have improved their typing speed and
                accuracy with TypeSonic
              </p>
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <Zap className="h-5 w-5 mr-2" />
                Start Typing Test
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                <Keyboard className="h-4 w-4" />
              </div>
              <div>
                <span className="font-bold text-foreground">TypeSonic</span>
                <p className="text-sm text-muted-foreground">
                  Master Your Typing Speed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground hover:bg-accent">
                About
              </Button>
              <Separator orientation="vertical" className="h-4 bg-border" />
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground hover:bg-accent">
                Leaderboard
              </Button>
              <Separator orientation="vertical" className="h-4 bg-border" />
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground hover:bg-accent">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </div>
          </div>

          <Separator className="my-8 bg-border" />

          <div className="text-center">
            <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              Made with{" "}
              <Heart className="h-4 w-4 text-red-500 dark:text-red-400" /> for
              typing enthusiasts worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
