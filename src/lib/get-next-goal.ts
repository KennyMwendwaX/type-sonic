export function getNextGoal(personalBest: number | null) {
  if (!personalBest) return 40;
  const nextTier = Math.ceil(personalBest / 20) * 20;
  return nextTier;
}
