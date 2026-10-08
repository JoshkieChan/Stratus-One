import { StratusCard } from './StratusCard';
import { StratusBadge } from './StratusBadge';
import { StratusButton } from './StratusButton';
import { Calendar, DollarSign } from 'lucide-react';

interface OpportunityCardProps {
  onClick?: () => void;
  title: string;
  score: number;
  deadline: string;
  value: string;
  reasoning: string;
  scoreVariant?: 'winnable' | 'moderate' | 'avoid';
}

export function OpportunityCard({
  title,
  score,
  deadline,
  value,
  reasoning,
  scoreVariant = 'winnable',
  onClick
}: OpportunityCardProps) {
  return (
    <StratusCard className="flex flex-col gap-4 max-w-[380px]">
      <div className="flex items-start justify-between">
        <h3 className="flex-1 pr-2">{title}</h3>
        <StratusBadge variant={scoreVariant}>
          {score}/100
        </StratusBadge>
      </div>

      <div className="flex items-center gap-4 text-[var(--color-fg-secondary)]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{deadline}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          <span className="text-sm">{value}</span>
        </div>
      </div>

      <div className="bg-[var(--color-bg-secondary)] rounded-lg p-4">
        <p className="text-sm text-[var(--color-fg-primary)] mb-1">Priority assessment</p>
        <p className="text-sm text-[var(--color-fg-secondary)]">{reasoning}</p>
      </div>

      <StratusButton variant="primary" fullWidth onClick={onClick} disabled={!onClick}>
        Open opportunity
      </StratusButton>
    </StratusCard>
  );
}
