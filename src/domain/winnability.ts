/** Transparent prioritization heuristic, never a calibrated probability of winning. */
export function calculateWinnability(input: { deadline: string; value: number; setAside?: string }, now = Date.now()): number {
  const deadline = Date.parse(input.deadline);
  if (!Number.isFinite(deadline) || !Number.isFinite(now) || !Number.isFinite(input.value) || input.value < 0) throw new Error('Invalid scoring inputs');
  const days = Math.floor((deadline - now) / 86_400_000);
  if (days < 0) return 0;
  const timeline = days > 30 ? 15 : days > 14 ? 10 : days > 7 ? 5 : 0;
  const value = input.value < 100_000 ? 15 : input.value <= 1_000_000 ? 10 : 0;
  // Eligibility for set-asides is not verified, so no eligibility bonus is awarded.
  return 50 + timeline + value;
}
