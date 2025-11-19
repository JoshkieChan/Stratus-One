import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { QuoteService } from '../../services/QuoteService';
import { StratusButton } from '../StratusButton';
import { StratusCard } from '../StratusCard';
import { StratusInput } from '../StratusInput';
import { QuoteGenerator } from '../QuoteGenerator';
import { Plus, Download, Send } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import type { QuoteLineItem } from '../../types/quote';

export function QuoteGeneratorPage({ opportunityId }: { opportunityId?: string }) {
  const { user } = useAuth();
  const [lineItems, setLineItems] = useState<QuoteLineItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0, total: 0 },
  ]);
  const [quoteTitle, setQuoteTitle] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: Date.now().toString(),
        description: '',
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ]);
  };

  const handleUpdateLineItem = (id: string, field: keyof QuoteLineItem, value: any) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.total = updated.quantity * updated.unitPrice;
        }
        return updated;
      }
      return item;
    }));
  };

  const handleRemoveLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  const handleSaveQuote = async () => {
    if (!opportunityId || !user) return;

    setLoading(true);
    try {
      await QuoteService.create(user.id, {
        opportunityId,
        title: quoteTitle,
        lineItems: lineItems.map(({ id, ...item }) => item),
        taxRate: taxRate / 100,
        notes,
      });
      alert('Quote saved successfully!');
    } catch (error) {
      console.error('Failed to save quote:', error);
      alert('Failed to save quote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="mb-2">Quote Generator</h1>
          <p className="text-[var(--color-fg-secondary)]">
            Create professional quotes for your opportunities
          </p>
        </div>
        <div className="flex gap-3">
          <StratusButton variant="secondary">
            <Download className="w-4 h-4" />
            Export PDF
          </StratusButton>
          <StratusButton variant="primary" onClick={handleSaveQuote} disabled={loading}>
            <Send className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Quote'}
          </StratusButton>
        </div>
      </div>

      {/* Quote Details */}
      <StratusCard>
        <h3 className="mb-4">Quote Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StratusInput
            label="Quote Title"
            placeholder="Q1 2025 Professional Services"
            value={quoteTitle}
            onChange={(e) => setQuoteTitle(e.target.value)}
          />
          <StratusInput
            label="Tax Rate (%)"
            type="number"
            placeholder="0"
            value={taxRate.toString()}
            onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
          />
        </div>
      </StratusCard>

      {/* Line Items */}
      <StratusCard>
        <div className="flex items-center justify-between mb-4">
          <h3>Line Items</h3>
          <StratusButton variant="ghost" onClick={handleAddLineItem}>
            <Plus className="w-4 h-4" />
            Add Item
          </StratusButton>
        </div>

        <div className="flex flex-col gap-4">
          {lineItems.map((item, index) => (
            <div key={item.id} className="flex gap-3 items-start flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <StratusInput
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleUpdateLineItem(item.id, 'description', e.target.value)}
                />
              </div>
              <div className="w-24">
                <StratusInput
                  type="number"
                  placeholder="Qty"
                  value={item.quantity.toString()}
                  onChange={(e) => handleUpdateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="w-32">
                <StratusInput
                  type="number"
                  placeholder="Unit Price"
                  value={item.unitPrice.toString()}
                  onChange={(e) => handleUpdateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="w-32 flex items-center h-[var(--input-height)]">
                <p className="font-medium">{formatCurrency(item.total)}</p>
              </div>
              <button
                onClick={() => handleRemoveLineItem(item.id)}
                className="h-[var(--input-height)] px-3 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 rounded-lg transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </StratusCard>

      {/* Summary */}
      <StratusCard className="bg-[var(--color-bg-secondary)]">
        <h3 className="mb-4">Quote Summary</h3>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-[var(--color-fg-secondary)]">Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-fg-secondary)]">Tax ({taxRate}%)</span>
            <span className="font-medium">{formatCurrency(taxAmount)}</span>
          </div>
          <div className="h-px bg-[var(--color-border-default)] my-2" />
          <div className="flex justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold text-[var(--color-accent-primary)]">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </StratusCard>

      {/* Notes */}
      <StratusCard>
        <h3 className="mb-4">Additional Notes</h3>
        <textarea
          placeholder="Add any additional terms, conditions, or notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-[var(--radius-m)] border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] text-[var(--color-fg-primary)] placeholder:text-[var(--color-fg-tertiary)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-2 focus:ring-[var(--color-accent-primary)]/20 transition-all resize-none"
        />
      </StratusCard>
    </div>
  );
}
