"use client";

import { useRef } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { THEMES } from "@/lib/constants";
import { ThemeOption } from "@/lib/types";
import Confetti from "react-confetti";
import TypingTestContent from "./typing-test-content";
import TypingTestFooter from "./typing-test-footer";
import TypingTestHeader from "./typing-test-header";
import { useTypingTestStore } from "@/store/useTypingTestStore";
import { Card } from "./ui/card";

export default function TypingTest() {
  const { theme, showConfetti, setShowConfetti } = useTypingTestStore();

  const containerRef = useRef<HTMLDivElement>(null);

  // Card classes based on selected theme
  const cardClasses = `border-2 shadow-lg transition-all duration-300 ${
    THEMES[theme as ThemeOption]
  }`;

  return (
    <div className="space-y-6" ref={containerRef}>
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 500}
          height={typeof window !== "undefined" ? window.innerHeight : 500}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
          onConfettiComplete={() => {
            setTimeout(() => {
              setShowConfetti(false);
            }, 3000);
          }}
        />
      )}

      <TooltipProvider>
        <Card className={cardClasses}>
          <TypingTestHeader />

          <TypingTestContent />

          <TypingTestFooter />
        </Card>
      </TooltipProvider>
    </div>
  );
}
