import type { QuoteLineItem } from '../types/quote';
import { calculateQuote } from '../domain/quotes';
import { formatCurrency } from '../utils/format';

export function QuotePrintView({ title, items, taxRate, notes }: { title: string; items: QuoteLineItem[]; taxRate: number; notes: string }) {
  const totals = calculateQuote(items, taxRate);
  return <article className="quote-print" aria-hidden="true">
    <h1>{title || 'Quote estimate'}</h1><p>Stratus One · USD estimate</p>
    <table><thead><tr><th>Description</th><th>Quantity</th><th>Unit price</th><th>Amount</th></tr></thead>
      <tbody>{items.map((item, index) => <tr key={item.id ?? index}><td>{item.description}</td><td>{item.quantity}</td><td>{formatCurrency(item.unitPrice)}</td><td>{formatCurrency(totals.lineTotals[index])}</td></tr>)}</tbody>
    </table>
    <p>Subtotal: {formatCurrency(totals.subtotal)}</p><p>Tax ({taxRate * 100}%): {formatCurrency(totals.taxAmount)}</p><h2>Total: {formatCurrency(totals.total)}</h2>
    {notes && <p style={{ whiteSpace: 'pre-wrap' }}>{notes}</p>}
  </article>;
}
