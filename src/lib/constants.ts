export const TEST_DURATIONS = [15, 30, 60, 120];

export const THEMES = {
  default:
    "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-800 shadow-sm",

  ultraViolet:
    "bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500 text-gray-900 border-violet-400 shadow-lg",

  cosmicBlue:
    "bg-gradient-to-br from-blue-600 via-indigo-500 to-violet-500 text-gray-900 border-blue-400 shadow-lg border-2",

  electricLime:
    "bg-gradient-to-br from-lime-500 via-green-500 to-emerald-600 text-gray-900 border-lime-300 shadow-lg",

  sunriseFire:
    "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 text-gray-900 border-yellow-300 shadow-lg",

  tropicalPunch:
    "bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 text-gray-900 border-pink-400 shadow-lg",

  vaporwave:
    "bg-gradient-to-br from-fuchsia-500 via-sky-400 to-cyan-300 text-fuchsia-900 border-fuchsia-300 shadow-lg",

  oceanBreeze:
    "bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 text-gray-900 border-cyan-300 shadow-lg border-2",

  hotPink:
    "bg-gradient-to-br from-pink-600 via-pink-500 to-rose-500 text-gray-900 border-pink-300 shadow-xl shadow-pink-200",

  auroraGlow:
    "bg-gradient-to-br from-teal-400 via-emerald-500 to-green-500 text-gray-900 border-teal-300 shadow-xl shadow-green-200/50",

  magmaFlow:
    "bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 text-gray-900 border-red-400 shadow-xl shadow-red-200/50",

  glacierMint:
    "bg-gradient-to-br from-blue-400 via-cyan-300 to-emerald-400 text-blue-900 border-cyan-300 shadow-lg shadow-cyan-200/50 border-2",
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
