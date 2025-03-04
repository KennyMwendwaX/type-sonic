import { textsByCategory } from "@/lib/constants";
import { TextDifficulty } from "@/lib/types";

export const getNewText = (difficulty: TextDifficulty): string => {
  const textsForDifficulty = textsByCategory[difficulty];
  return textsForDifficulty[
    Math.floor(Math.random() * textsForDifficulty.length)
  ];
};

export const updateErrorsAndWords = (
  userInput: string,
  text: string
): { errors: number; wordsTyped: number } => {
  let currentErrors = 0;
  let wordCount = 0;

  // Count errors
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] !== text[i]) {
      currentErrors++;
    }
  }

  // Count words (accounting for correct spaces)
  const words = userInput.trim().split(/\s+/);
  wordCount = words.length > 0 && userInput.trim() !== "" ? words.length : 0;

  return { errors: currentErrors, wordsTyped: wordCount };
};

export const checkTestCompletion = (
  userInput: string,
  text: string
): boolean => {
  return userInput === text;
};
