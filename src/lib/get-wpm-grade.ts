export function getWPMGrade(wpm: number): string {
  if (wpm < 20) return "Beginner";
  if (wpm < 40) return "Average";
  if (wpm < 60) return "Intermediate";
  if (wpm < 80) return "Pro";
  if (wpm < 100) return "Expert";
  if (wpm < 120) return "Master";
  return "Legend";
}
