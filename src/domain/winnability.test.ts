import { expect, it } from 'vitest';
import { calculateWinnability } from './winnability';
const now = Date.parse('2026-01-01T00:00:00Z');
it.each([[7, 65], [8, 70], [14, 70], [15, 75], [30, 75], [31, 80]])('scores the %s-day timeline boundary', (days, score) => {
  expect(calculateWinnability({ deadline: new Date(now + days * 86400000).toISOString(), value: 5000 }, now)).toBe(score);
});
it('gives expired opportunities zero priority', () => {
  expect(calculateWinnability({ deadline: '2025-12-31', value: 5000 }, now)).toBe(0);
});
it('does not invent a skills or set-aside eligibility bonus', () => {
  expect(calculateWinnability({ deadline: '2026-01-01', value: 100000, setAside: 'Unverified' }, now)).toBe(60);
  expect(calculateWinnability({ deadline: '2026-01-01', value: 1000001 }, now)).toBe(50);
});
it('rejects invalid dates and values', () => {
  expect(() => calculateWinnability({ deadline: 'bad', value: 5 }, now)).toThrow();
  expect(() => calculateWinnability({ deadline: '2026-01-01', value: -1 }, now)).toThrow();
});
