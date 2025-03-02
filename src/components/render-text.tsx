// export function renderText(
//   text: string,
//   userInput: string,
//   currentIndex: number
// ) {
//   return text.split("").map((char, index) => {
//     let className = "text-gray-400 transition-colors duration-150"; // Untyped text

//     if (index < userInput.length) {
//       // Correct character
//       if (char === userInput[index]) {
//         className = "text-primary font-medium";
//       }
//       // Incorrect character
//       else {
//         className = "text-red-500 font-medium bg-red-100 dark:bg-red-900/30";
//       }
//     }

//     // Current position
//     if (index === currentIndex) {
//       className += " border-b-2 border-primary animate-pulse";
//     }

//     // Add extra space for newlines in code
//     if (char === "\n") {
//       return (
//         <span key={index} className={className}>
//           {"\n"}
//           <br />
//         </span>
//       );
//     }

//     return (
//       <span key={index} className={className}>
//         {char}
//       </span>
//     );
//   });
// }
export function renderText(
  text: string,
  userInput: string,
  currentIndex: number
) {
  return text.split("").map((char, index) => {
    let className = "text-gray-400 transition-colors duration-150"; // Untyped text

    if (index < userInput.length) {
      // Correct character
      if (char === userInput[index]) {
        className = "text-primary font-medium";
      }
      // Incorrect character
      else {
        className = "text-red-500 font-medium bg-red-100 dark:bg-red-900/30";
      }
    }

    // Current position
    if (index === currentIndex) {
      className += " border-b-2 border-primary animate-pulse";
    }

    // Add extra space for newlines in code
    if (char === "\n") {
      return (
        <span key={index} className={className}>
          {"\n"}
          <br />
        </span>
      );
    }

    return (
      <span key={index} className={className}>
        {char}
      </span>
    );
  });
}
