import { describe, expect, it } from 'vitest';
import { calculateMarkup, calculateQuote } from './quotes';

describe('quote calculations', () => {
  it('rounds each line and tax to cents', () => {
    expect(calculateQuote([{ quantity: 3, unitPrice: 0.1 }, { quantity: 1, unitPrice: 1.005 }], 0.075)).toEqual({ lineTotals: [0.3, 1.01], subtotal: 1.31, taxAmount: 0.1, total: 1.41 });
  });
  it('supports empty and zero-value previews', () => {
    expect(calculateQuote([]).total).toBe(0);
    expect(calculateQuote([{ quantity: 0, unitPrice: 50 }]).total).toBe(0);
  });
  it.each([-1, NaN, Infinity, Number.MAX_VALUE])('rejects invalid money %s', value => {
    expect(() => calculateQuote([{ quantity: 1, unitPrice: value }])).toThrow();
  });
  it.each([-0.01, 1.01, NaN, Infinity])('rejects invalid tax %s', tax => {
    expect(() => calculateQuote([], tax)).toThrow();
  });
  it('rejects negative quantities and overflowing aggregates', () => {
    expect(() => calculateQuote([{ quantity: -2, unitPrice: 10 }])).toThrow();
    expect(() => calculateQuote(Array(10).fill({ quantity: 1, unitPrice: 9e13 }))).toThrow();
  });
  it('uses markup on cost, not margin on revenue', () => {
    expect(calculateMarkup(5000, 30)).toEqual({ profit: 1500, total: 6500 });
    expect(() => calculateMarkup(5, 101)).toThrow();
  });
});
