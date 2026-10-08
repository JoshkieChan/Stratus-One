export interface PricedItem { quantity: number; unitPrice: number }

function cents(value: number): number {
  if (!Number.isFinite(value) || value < 0 || value > Number.MAX_SAFE_INTEGER / 100) {
    throw new Error('Amounts must be finite, non-negative and within the supported range');
  }
  return Math.round((value + Number.EPSILON) * 100);
}

/** USD, line-level cent rounding; taxRate is a fraction (0.075 = 7.5%). */
export function calculateQuote(items: readonly PricedItem[], taxRate = 0) {
  if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 1) throw new Error('Tax rate must be between 0 and 1');
  const lineTotals = items.map(item => {
    cents(item.quantity);
    cents(item.unitPrice);
    return cents(item.quantity * item.unitPrice);
  });
  const subtotalCents = lineTotals.reduce((sum, amount) => sum + amount, 0);
  const taxCents = Math.round(subtotalCents * taxRate);
  if (!Number.isSafeInteger(subtotalCents + taxCents)) throw new Error('Quote total exceeds supported range');
  return { lineTotals: lineTotals.map(n => n / 100), subtotal: subtotalCents / 100, taxAmount: taxCents / 100, total: (subtotalCents + taxCents) / 100 };
}

/** Markup on cost, not gross margin on revenue. */
export function calculateMarkup(cost: number, percent: number) {
  cents(cost);
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) throw new Error('Markup must be between 0 and 100');
  const profit = cents(cost * percent / 100) / 100;
  return { profit, total: cents(cost + profit) / 100 };
}
