import { calculateMarkup } from '../domain/quotes';
import { useState } from 'react';
import { StratusCard } from './StratusCard';
import { StratusInput } from './StratusInput';
import { StratusButton } from './StratusButton';
import { FileDown } from 'lucide-react';

export function QuoteGenerator() {
  const [baseCost, setBaseCost] = useState('5000');
  const [markup, setMarkup] = useState(30);

  let quote = { total: 0, profit: 0 };
  let error = '';
  try { quote = calculateMarkup(Number(baseCost), markup); }
  catch (cause) { error = cause instanceof Error ? cause.message : 'Invalid cost'; }

  return (
    <StratusCard className="max-w-4xl">
      <h2 className="mb-6">Quote Generator</h2>
      {error && <p role="alert">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <StratusInput
            label="Base Cost"
            type="number"
            value={baseCost}
            onChange={(e) => setBaseCost(e.target.value)}
            placeholder="Enter base cost"
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="quote-markup" className="text-sm text-[var(--color-fg-primary)]">Markup (%)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                id="quote-markup"
                min="0"
                max="100"
                value={markup}
                onChange={(e) => setMarkup(parseInt(e.target.value))}
                className="flex-1 h-2 bg-[#E8EAED] rounded-lg appearance-none cursor-pointer accent-[#0057FF]"
              />
              <span className="text-sm font-mono min-w-[50px] text-right">{markup}%</span>
            </div>
          </div>

          <StratusButton disabled variant="primary" className="mt-4">
            <div className="flex items-center gap-2">
              <FileDown className="w-4 h-4" />
              PDF export (not available)
            </div>
          </StratusButton>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6 border-2 border-[var(--color-border-default)]">
            <h3 className="mb-4">Summary</h3>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[var(--color-fg-secondary)]">Base Cost</span>
                <span className="font-mono">${baseCost}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[var(--color-fg-secondary)]">Markup</span>
                <span className="font-mono">{markup}%</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[var(--color-fg-secondary)]">Profit</span>
                <span className="font-mono text-[#27AE60]">${quote.profit.toFixed(2)}</span>
              </div>

              <div className="h-px bg-[#E8EAED] my-2" />

              <div className="flex justify-between items-center">
                <span>Total Quote</span>
                <span className="font-mono text-[#0057FF]">${quote.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StratusCard>
  );
}
