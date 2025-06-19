"use client";

import { useRef, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { type ThemeOption, THEMES } from "@/lib/constants";
import Confetti from "react-confetti";
import TypingTestContent from "./typing-test-content";
import TypingTestFooter from "./typing-test-footer";
import TypingTestHeader from "./typing-test-header";
import { useTypingTestStore } from "@/store/useTypingTestStore";
import { Card } from "./ui/card";

export default function TypingTest() {
  const { theme, showConfetti, setShowConfetti, fullscreenMode } =
    useTypingTestStore();

  const containerRef = useRef<HTMLDivElement>(null);

  // Card classes based on selected theme
  const cardClasses = `border-2 shadow-lg transition-all duration-300 ${
    THEMES[theme as ThemeOption]
  }`;

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && fullscreenMode) {
        useTypingTestStore.getState().setFullscreenMode(false);
      }
    };

    if (fullscreenMode) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when in fullscreen
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [fullscreenMode]);

  return (
    <>
      {/* Fullscreen Mode */}
      {fullscreenMode && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-7xl max-h-[95vh] overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden animate-in zoom-in-95 duration-300">
            {" "}
            <TooltipProvider>
              <Card className={`${cardClasses} shadow-2xl border-primary/20`}>
                <TypingTestHeader />
                <TypingTestContent />
                <TypingTestFooter />
              </Card>
            </TooltipProvider>
          </div>
        </div>
      )}

      {/* Normal Mode */}
      <div
        className={`${fullscreenMode ? "hidden" : "space-y-6"}`}
        ref={containerRef}>
        {showConfetti && !fullscreenMode && (
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

      {/* Fullscreen Confetti */}
      {showConfetti && fullscreenMode && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <Confetti
            width={typeof window !== "undefined" ? window.innerWidth : 500}
            height={typeof window !== "undefined" ? window.innerHeight : 500}
            recycle={false}
            numberOfPieces={300}
            gravity={0.15}
            onConfettiComplete={() => {
              setTimeout(() => {
                setShowConfetti(false);
              }, 3000);
            }}
          />
        </div>
      )}
    </>
  );
}
