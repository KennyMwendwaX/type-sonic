"use client";

import { useRef, useEffect } from "react";

export function useAudio() {
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const errorSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      correctSoundRef.current = new Audio("/click.wav");
      errorSoundRef.current = new Audio("/buzz.flac");

      // Preload sounds
      correctSoundRef.current.load();
      errorSoundRef.current.load();
    }

    return () => {
      if (correctSoundRef.current) {
        correctSoundRef.current = null;
      }
      if (errorSoundRef.current) {
        errorSoundRef.current = null;
      }
    };
  }, []);

  const playCorrectSound = () => {
    if (correctSoundRef.current) {
      // Clone the audio to allow for rapid successive plays
      const sound = correctSoundRef.current.cloneNode() as HTMLAudioElement;
      sound.volume = 0.3;
      sound.play().catch((err) => console.error("Error playing sound:", err));
    }
  };

  const playErrorSound = () => {
    if (errorSoundRef.current) {
      // Clone the audio to allow for rapid successive plays
      const sound = errorSoundRef.current.cloneNode() as HTMLAudioElement;
      sound.volume = 0.3;
      sound.play().catch((err) => console.error("Error playing sound:", err));
    }
  };

  return { playCorrectSound, playErrorSound };
}
