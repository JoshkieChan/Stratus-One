import { useState } from 'react';
import { StratusCard } from './StratusCard';
import { StratusInput } from './StratusInput';
import { StratusButton } from './StratusButton';
import { FileDown } from 'lucide-react';

export function QuoteGenerator() {
  const [baseCost, setBaseCost] = useState('5000');
  const [margin, setMargin] = useState(30);

  const calculateTotal = () => {
    const cost = parseFloat(baseCost) || 0;
    const total = cost + (cost * margin / 100);
    return total.toFixed(2);
  };

  const calculateProfit = () => {
    const cost = parseFloat(baseCost) || 0;
    const profit = cost * margin / 100;
    return profit.toFixed(2);
  };

  return (
    <StratusCard className="max-w-4xl">
      <h2 className="mb-6">Quote Generator</h2>
      
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
            <label className="text-sm text-[#1E1F22]">Margin (%)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={margin}
                onChange={(e) => setMargin(parseInt(e.target.value))}
                className="flex-1 h-2 bg-[#E8EAED] rounded-lg appearance-none cursor-pointer accent-[#0057FF]"
              />
              <span className="text-sm font-mono min-w-[50px] text-right">{margin}%</span>
            </div>
          </div>

          <StratusButton variant="primary" className="mt-4">
            <div className="flex items-center gap-2">
              <FileDown className="w-4 h-4" />
              Export PDF
            </div>
          </StratusButton>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-[#F7F9FA] rounded-lg p-6 border-2 border-[#E8EAED]">
            <h3 className="mb-4">Summary</h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[#6A6D72]">Base Cost</span>
                <span className="font-mono">${baseCost}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[#6A6D72]">Margin</span>
                <span className="font-mono">{margin}%</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#6A6D72]">Profit</span>
                <span className="font-mono text-[#27AE60]">${calculateProfit()}</span>
              </div>

              <div className="h-px bg-[#E8EAED] my-2" />

              <div className="flex justify-between items-center">
                <span>Total Quote</span>
                <span className="font-mono text-[#0057FF]">${calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StratusCard>
  );
}
