export const TEST_DURATIONS = [15, 30, 60, 120];

export const THEMES = {
  default: "bg-card border-border",
  minimalist: "bg-white border-gray-200 dark:bg-black dark:border-gray-800",
  cyberpunk:
    "bg-gradient-to-br from-purple-900 to-blue-900 border-purple-600 text-cyan-400",
  vintage:
    "bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800 font-serif",
};

export type ThemeOption = keyof typeof THEMES;

export type TextDifficulty = "easy" | "medium" | "hard" | "code";

export const textsByCategory: Record<TextDifficulty, string[]> = {
  easy: [
    "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
    "The five boxing wizards jump quickly. How razorback-jumping frogs can level six piqued gymnasts!",
    "Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs.",
  ],
  medium: [
    "Technology is best when it brings people together. The advance of technology is based on making it fit in so that you don't really even notice it.",
    "The best way to predict the future is to invent it. Computer science is no more about computers than astronomy is about telescopes.",
    "We can only see a short distance ahead, but we can see plenty there that needs to be done. Computing is not about computers any more. It is about living.",
  ],
  hard: [
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages.",
    "Good code is its own best documentation. As you're about to add a comment, ask yourself, 'How can I improve the code so that this comment isn't needed?'",
  ],
  code: [
    "function factorial(n) {\n  if (n === 0 || n === 1) {\n    return 1;\n  }\n  return n * factorial(n - 1);\n}",
    "const debounce = (func, delay) => {\n  let timeoutId;\n  return (...args) => {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => func(...args), delay);\n  };\n};",
    "import React, { useState, useEffect } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]);\n\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicked {count} times\n    </button>\n  );\n}",
  ],
};
