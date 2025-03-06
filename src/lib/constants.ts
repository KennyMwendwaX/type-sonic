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
    "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
    "How vexingly quick daft zebras jump! The five boxing wizards jump quickly.",
    "Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz.",
    "Crazy Fredrick bought many very exquisite opal jewels. We promptly judged antique ivory buckles for the next prize.",
    "A mad boxer shot a quick, gloved jab to the jaw of his dizzy opponent. Jaded zombies acted quaintly but kept driving their oxen forward.",
    "My grandfather picks up quartz and valuable onyx jewels. Both fickle dwarves jinx my pajamas.",
    "The job requires extra pluck and zeal from every young wage earner. Quizzical twins proved my hijack-bug fix.",
    "Waxy and quivering, jocks fumble the pizza. Five or six big jet planes zoomed quickly by the tower.",
    "The exploration team slept under the stars, watching the night sky. Early morning birds sang songs of joy.",
    "Fresh bread makes a delicious breakfast when paired with jam. The children played games in the park all afternoon.",
  ],
  medium: [
    "Technology is best when it brings people together. The advance of technology is based on making it fit in so that you don't really even notice it.",
    "The best way to predict the future is to invent it. Computer science is no more about computers than astronomy is about telescopes.",
    "We can only see a short distance ahead, but we can see plenty there that needs to be done. Computing is not about computers any more. It is about living.",
    "The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge. The important thing is not to stop questioning.",
    "Innovation distinguishes between a leader and a follower. Design is not just what it looks like and feels like. Design is how it works.",
    "The digital revolution is far more significant than the invention of writing or even of printing. It is the greatest single innovation in history.",
    "The most profound technologies are those that disappear. They weave themselves into the fabric of everyday life until they are indistinguishable from it.",
    "The real danger is not that computers will begin to think like humans, but that humans will begin to think like computers.",
    "Privacy is not something that I'm merely entitled to, it's an absolute prerequisite for functioning in a free society.",
    "The Internet is the first thing that humanity has built that humanity doesn't understand, the largest experiment in anarchy that we have ever had.",
  ],
  hard: [
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages.",
    "Good code is its own best documentation. As you're about to add a comment, ask yourself, 'How can I improve the code so that this comment isn't needed?'",
    "The function of good software is to make the complex appear to be simple. Simple things should be simple, complex things should be possible.",
    "The purpose of software engineering is to control complexity, not to create it. The difference between theory and practice is that in theory, there is no difference between theory and practice.",
    "A primary cause of complexity is that software vendors uncritically adopt almost any feature that users want. Complexity has significant, negative consequences for software quality.",
    "Sometimes, the elegant implementation is a function. Not a method. Not a class. Not a framework. Just a function. There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies.",
    "The most effective debugging tool is still careful thought, coupled with judiciously placed print statements. Low-level programming is good for the programmer's soul.",
    "The most important single aspect of software development is to be clear about what you are trying to build. The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times.",
    "The problem with using C++ is that there's already a strong tendency in the language to require you to know everything before you can do anything. Testing leads to failure, and failure leads to understanding.",
  ],
  code: [
    // Expanded with more code samples...
    `function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}`,
    `const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};`,
    `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
    `class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    const newNode = new Node(value);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    function insertNode(node, newNode) {
      if (newNode.value < node.value) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    }
    
    insertNode(this.root, newNode);
  }
}`,
    `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];
  
  for (let val of arr) {
    if (val < pivot) {
      left.push(val);
    } else if (val > pivot) {
      right.push(val);
    } else {
      equal.push(val);
    }
  }
  
  return [
    ...quickSort(left),
    ...equal,
    ...quickSort(right)
  ];
}`,
  ],
};
