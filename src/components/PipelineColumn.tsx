import { StratusCard } from './StratusCard';
import type { Opportunity } from '../types/opportunity';

interface OpportunityMiniCard {
  id: string;
  title: string;
  value: string;
  status?: Opportunity['status'];
}

interface PipelineColumnProps {
  title: string;
  count: number;
  opportunities: OpportunityMiniCard[];
  color?: string;
  onStatusChange?: (id: string, status: Opportunity['status']) => void;
  pendingId?: string;
}

export function PipelineColumn({ title, count, opportunities, color = '#0057FF', onStatusChange, pendingId }: PipelineColumnProps) {
  return (
    <div className="flex flex-col gap-3 min-w-[280px]">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h3 className="text-[var(--color-fg-primary)]">{title}</h3>
        </div>
        <span className="text-sm text-[var(--color-fg-secondary)] bg-[#E8EAED] px-2 py-1 rounded-full">
          {count}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {opportunities.map((opp) => (
          <StratusCard key={opp.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-2">

              <div className="flex-1">
                <p className="text-sm mb-1">{opp.title}</p>
                <p className="text-sm text-[var(--color-fg-secondary)]">{opp.value}</p>
                {onStatusChange && <select className="mt-3 w-full bg-[var(--color-bg-primary)]" aria-label={`Stage for ${opp.title}`} value={opp.status} disabled={pendingId !== undefined} onChange={event => onStatusChange(opp.id, event.target.value as Opportunity['status'])}>
                  {(['open', 'in_progress', 'submitted', 'won', 'lost', 'closed'] as const).map(status => <option key={status} value={status}>{status.replace('_', ' ')}</option>)}
                </select>}
              </div>
            </div>
          </StratusCard>
        ))}
      </div>
    </div>
  );
}
