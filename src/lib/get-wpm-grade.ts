export function getWPMGrade(wpm: number) {
  if (wpm < 20) return "Beginner";
  if (wpm < 40) return "Basic";
  if (wpm < 60) return "Intermediate";
  if (wpm < 80) return "Advanced";
  if (wpm < 100) return "Professional";
  return "Expert";
}
