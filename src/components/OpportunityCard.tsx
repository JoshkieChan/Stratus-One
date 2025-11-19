import { StratusCard } from './StratusCard';
import { StratusBadge } from './StratusBadge';
import { StratusButton } from './StratusButton';
import { Calendar, DollarSign } from 'lucide-react';

interface OpportunityCardProps {
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
  scoreVariant = 'winnable'
}: OpportunityCardProps) {
  return (
    <StratusCard className="flex flex-col gap-4 max-w-[380px]">
      <div className="flex items-start justify-between">
        <h3 className="flex-1 pr-2">{title}</h3>
        <StratusBadge variant={scoreVariant}>
          {score}%
        </StratusBadge>
      </div>
      
      <div className="flex items-center gap-4 text-[#6A6D72]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{deadline}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          <span className="text-sm">{value}</span>
        </div>
      </div>

      <div className="bg-[#F7F9FA] rounded-lg p-4">
        <p className="text-sm text-[#1E1F22] mb-1">Why You Can Win</p>
        <p className="text-sm text-[#6A6D72]">{reasoning}</p>
      </div>

      <StratusButton variant="primary" fullWidth>
        Start Now
      </StratusButton>
    </StratusCard>
  );
}
