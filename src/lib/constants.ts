export const TEST_DURATIONS = [15, 30, 60, 120];

export const THEMES = {
  default: "",

  ultraViolet:
    "bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500 text-white font-semibold leading-relaxed drop-shadow-md border-violet-400 shadow-lg",

  cosmicBlue:
    "bg-gradient-to-br from-blue-600 via-indigo-500 to-violet-500 text-white font-semibold leading-relaxed drop-shadow-md border-blue-400 shadow-lg border-2",

  electricLime:
    "bg-gradient-to-br from-lime-500 via-green-500 to-emerald-600 text-gray-900 font-bold leading-relaxed drop-shadow-sm border-lime-300 shadow-lg",

  sunriseFire:
    "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 text-gray-900 font-bold leading-relaxed drop-shadow-sm border-yellow-300 shadow-lg",

  tropicalPunch:
    "bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 text-white font-semibold leading-relaxed drop-shadow-md border-pink-400 shadow-lg",

  vaporwave:
    "bg-gradient-to-br from-fuchsia-500 via-sky-400 to-cyan-300 text-gray-900 font-bold leading-relaxed drop-shadow-sm border-fuchsia-300 shadow-lg",

  oceanBreeze:
    "bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 text-white font-semibold leading-relaxed drop-shadow-md border-cyan-300 shadow-lg border-2",

  hotPink:
    "bg-gradient-to-br from-pink-600 via-pink-500 to-rose-500 text-white font-semibold leading-relaxed drop-shadow-md border-pink-300 shadow-xl shadow-pink-200",

  auroraGlow:
    "bg-gradient-to-br from-teal-400 via-emerald-500 to-green-500 text-gray-900 font-bold leading-relaxed drop-shadow-sm border-teal-300 shadow-xl shadow-green-200/50",

  magmaFlow:
    "bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 text-white font-semibold leading-relaxed drop-shadow-md border-red-400 shadow-xl shadow-red-200/50",

  glacierMint:
    "bg-gradient-to-br from-blue-400 via-cyan-300 to-emerald-400 text-gray-900 font-bold leading-relaxed drop-shadow-sm border-cyan-300 shadow-lg shadow-cyan-200/50 border-2",
};

export type ThemeOption = keyof typeof THEMES;

export type TextDifficulty = "easy" | "medium" | "hard" | "code";

export const textsByCategory: Record<TextDifficulty, string[]> = {
  easy: [
    "The quick brown fox jumps over the lazy dog. The bright sun shone down on the open meadow as the fox stretched its legs, preparing for a leap. With a swift motion, it soared gracefully over the sleeping dog, landing softly on the other side. Birds chirped in the trees, and a gentle breeze rustled the leaves. The dog, too comfortable in its nap, barely lifted an ear in response.",
    "Pack my box with five dozen liquor jugs. The movers worked quickly, stacking each jug carefully to prevent any from breaking. The warehouse smelled of aged oak and rich spices, a reminder of the craftsmanship behind every bottle. A small black cat weaved between the stacks, watching curiously as the workers finished their task. Outside, the sun dipped below the horizon, casting long shadows across the cobblestone street.",
    "How vexingly quick daft zebras jump! In the vast African savanna, a herd of zebras galloped across the golden grasslands. Their striped coats blended into the shimmering heat waves, making them difficult to spot from a distance. A sudden rustle in the bushes sent them leaping into the air, their hooves barely touching the ground before they dashed away. The nearby giraffes continued chewing on leaves, unfazed by the commotion.",
    "The five boxing wizards jump quickly. A hush fell over the crowd as the wizards prepared for their magical duel. With a flick of their wands, they leaped into the air, dodging and countering each other’s spells. Sparks and flashes of light filled the arena, illuminating the determined expressions on their faces. The final blow sent one wizard tumbling backward, landing with a laugh as the duel ended in friendly competition.",
    "Sphinx of black quartz, judge my vow. The ancient guardian watched in silence as the traveler approached its towering form. Its stone eyes, carved with precision, seemed to peer directly into the traveler’s soul. A gust of wind stirred the sand around them, whispering secrets of the past. With a deep breath, the traveler spoke their vow, hoping the sphinx would grant them safe passage.",
    "Crazy Fredrick bought many very exquisite opal jewels. The jewelry shop shimmered under the golden lights, displaying an array of dazzling gems. Fredrick, known for his eccentric tastes, examined each opal carefully before making his selection. The colors danced within the stones, shifting between shades of blue, green, and fiery orange. With a satisfied nod, he placed them in a velvet pouch, eager to add them to his collection.",
    "We promptly judged antique ivory buckles for the next prize. The annual antique fair was bustling with collectors and historians, each eager to uncover hidden treasures. Among the artifacts lay a set of ivory buckles, their surfaces worn smooth from years of use. The judges examined them closely, discussing their origins and craftsmanship. After much deliberation, they placed them on a silk cushion, ready to be awarded to the highest bidder.",
    "A mad boxer shot a quick, gloved jab to the jaw of his dizzy opponent. The ring echoed with the sounds of gloves smacking against flesh as the fighters exchanged blows. Sweat dripped down their faces, their breaths heavy from exhaustion. With a sudden burst of energy, the boxer feinted left before delivering a powerful jab. The crowd roared in excitement as his opponent staggered, struggling to maintain balance.",
    "Jaded zombies acted quaintly but kept driving their oxen forward. The eerie procession moved through the misty village, their slow, rhythmic steps blending with the creak of wooden wheels. Though their faces bore no emotion, their movements were oddly precise, as if following an ancient routine. Townsfolk peered from behind their shutters, whispering about the strange sight. Despite their eerie presence, the zombies paid them no mind and continued their journey.",
    "The job requires extra pluck and zeal from every young wage earner. The factory floor hummed with the sound of machinery, each worker focused on their task. Young apprentices moved swiftly, eager to prove their worth. Their hands were quick, their minds sharp, as they adapted to the demanding pace. The supervisor nodded in approval, knowing that with time and dedication, these workers would become masters of their craft.",
  ],
  medium: [
    "Technology is best when it brings people together. From the early days of the telephone to the rise of social media, every major technological advancement has aimed to bridge the gap between individuals. Families separated by great distances can now share moments in real-time, while friends from different continents can collaborate as if they were in the same room. Despite the criticisms of digital distractions, technology’s core purpose remains the same—connection.",
    "The advance of technology is based on making it fit in so that you don't really even notice it. The most successful innovations are those that blend seamlessly into daily life. Consider the way smart assistants respond to our commands or how facial recognition unlocks our devices without a second thought. We rarely stop to admire the complexity of these systems, yet they shape how we interact with the world. The best technology is the kind that feels invisible.",
    "The best way to predict the future is to invent it. Many of the world’s greatest inventors didn’t wait for progress to happen—they created it. Whether it was Thomas Edison’s light bulb, the Wright brothers’ airplane, or the internet itself, groundbreaking ideas came from those who dared to challenge the present. Every great leap in technology comes from those who envision a future that doesn’t yet exist and work tirelessly to bring it to life.",
    "Computer science is no more about computers than astronomy is about telescopes. At its core, computer science isn’t just about machines—it’s about problem-solving, logic, and creativity. Just as astronomers use telescopes to explore the universe, programmers use computers as tools to solve complex challenges. Understanding algorithms, patterns, and structures is what defines the field, not simply knowing how to operate a computer.",
    "We can only see a short distance ahead, but we can see plenty there that needs to be done. Progress in science and technology is rarely predictable. While we may not know what the next decade holds, we can identify the pressing problems of today—climate change, cybersecurity, artificial intelligence ethics—and work toward solutions. Each step forward reveals new challenges, but also new opportunities for growth and discovery.",
    "Computing is not about computers anymore. It is about living. Computers have transcended their original purpose as calculation machines. They now assist in everything from communication and healthcare to art and entertainment. Our lives are intertwined with digital systems, shaping the way we work, learn, and interact. The modern world is built on code, and understanding computing means understanding the foundation of our daily experiences.",
    "The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge. In an age of information overload, it’s easy to mistake access to knowledge for true understanding. A quick internet search may provide answers, but deep expertise requires critical thinking and experience. False confidence in incomplete knowledge can be dangerous, leading to misconceptions and poor decisions. True wisdom comes from questioning, learning, and adapting.",
    "The important thing is not to stop questioning. Every major scientific breakthrough, every revolutionary invention, and every paradigm shift began with a question. What if we could fly? How do we harness electricity? Can machines think like humans? Curiosity drives innovation, and those who keep asking “why” and “how” will continue to shape the future.",
    "Innovation distinguishes between a leader and a follower. The companies and individuals that push boundaries and take risks are the ones who define industries. Apple revolutionized smartphones, Tesla reimagined electric vehicles, and SpaceX changed space travel. Following trends may lead to success, but true leaders are those who create trends. Innovation requires vision, boldness, and the willingness to fail before achieving success.",
    "Privacy is not something that I'm merely entitled to, it's an absolute prerequisite for functioning in a free society. As technology advances, personal data has become one of the most valuable commodities. Companies track our habits, governments monitor communications, and cyber threats loom at every corner. Protecting privacy is not just about avoiding targeted ads—it’s about preserving freedom, security, and autonomy in an increasingly digital world.",
  ],
  hard: [
    "Debugging is twice as hard as writing the code in the first place. Writing code may seem like the biggest challenge, but debugging is where true skill is tested. A well-structured program should be easy to read and maintain, but even the best developers introduce bugs that can be difficult to track down. When code is written with excessive cleverness, it often obscures logic, making it harder to identify where things go wrong. Writing clear, maintainable code is not just a best practice—it’s a necessity for effective debugging.",
    "If you write the code as cleverly as possible, you are, by definition, not smart enough to debug it. Overly complex solutions often create unnecessary problems. While it may be tempting to write code that feels elegant or compact, clarity should always be prioritized. A developer who tries to outsmart the system by writing dense, hard-to-read code will eventually struggle when revisiting their own work. The true measure of intelligence in programming is not cleverness but simplicity and maintainability.",
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task. While this definition is technically correct, programming is much more than just writing instructions. It involves problem-solving, optimizing performance, and designing software that is scalable and efficient. Different programming languages and paradigms offer various approaches to solving problems, but at its core, programming is about breaking complex tasks into smaller, manageable components that can be executed systematically.",
    "Good code is its own best documentation. While comments can be useful, they should never replace clear, well-structured code. If you feel the need to explain what a block of code does, it may indicate that the logic needs to be rewritten for better readability. Self-explanatory variable names, modular design, and proper indentation contribute more to code clarity than excessive commenting. Code should be written as if the next person maintaining it is a complete stranger—even if that stranger is your future self.",
    "The function of good software is to make the complex appear to be simple. A user should never struggle to understand how a program works. Whether it's a sleek UI or an efficient API, software should abstract away the complexities behind the scenes. The best software solutions take intricate operations and present them in a way that feels intuitive to the end user. This principle applies not just to user-facing applications but also to code itself—clean, well-organized software makes development and maintenance significantly easier.",
    "The purpose of software engineering is to control complexity, not to create it. Many beginner developers fall into the trap of over-engineering solutions, introducing unnecessary abstractions and layers of complexity. A well-designed system should be simple yet powerful, focusing on solving the problem at hand rather than introducing features for the sake of sophistication. The best engineers recognize when to keep things straightforward and when to introduce complexity only when absolutely necessary.",
    "The difference between theory and practice is that in theory, there is no difference between theory and practice. While software development is often guided by theoretical principles, real-world implementation rarely goes as planned. Edge cases, hardware limitations, and unpredictable user behavior introduce challenges that theoretical models don’t always account for. Practical experience is just as crucial as understanding theoretical concepts, as the ability to adapt and troubleshoot in real scenarios separates an average programmer from an excellent one.",
    "Sometimes, the elegant implementation is a function. Not a method. Not a class. Not a framework. Just a function. Software development often trends toward excessive abstraction, but sometimes the simplest solution is the best one. Overuse of design patterns, complex object hierarchies, or unnecessary dependencies can make software bloated and hard to maintain. A well-crafted function can often achieve the same goal with greater clarity and efficiency. Recognizing when simplicity is the right choice is a hallmark of an experienced developer.",
    "The most effective debugging tool is still careful thought, coupled with judiciously placed print statements. Debugging tools, profilers, and logging frameworks are powerful, but nothing replaces the ability to think through a problem logically. A well-placed console.log or print statement can sometimes reveal the exact issue faster than stepping through code with a debugger. Developing an intuitive sense of where bugs might occur and systematically eliminating possibilities is what makes debugging an art as much as a science.",
    "The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times. Premature optimization is often counterproductive. While efficiency is important, optimizing before fully understanding the problem can lead to wasted effort and convoluted code. Most performance bottlenecks occur in a small portion of a program, and identifying those areas through profiling is far more effective than guessing where optimizations are needed. Clarity and correctness should always come first—efficiency should be a secondary concern until proven necessary.",
  ],
  code: [
    `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    `const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this, args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};`,
    `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let sortedArr = [];
  while (left.length && right.length) {
    sortedArr.push(left[0] < right[0] ? left.shift() : right.shift());
  }
  return [...sortedArr, ...left, ...right];
}`,
    `class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    return this.items.pop();
  }
  
  peek() {
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}`,
    `function bubbleSort(arr) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  } while (swapped);
  return arr;
}`,
    `class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element);
  }
  
  dequeue() {
    return this.items.shift();
  }
  
  front() {
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}`,
    `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
    `const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      cache[key] = fn(...args);
    }
    return cache[key];
  };
};`,
    `function isPalindrome(str) {
  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return cleanStr === cleanStr.split('').reverse().join('');
}`,
    `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}`,
  ],
};
