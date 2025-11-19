import { StratusCard } from './StratusCard';
import { GripVertical } from 'lucide-react';

interface OpportunityMiniCard {
  id: string;
  title: string;
  value: string;
}

interface PipelineColumnProps {
  title: string;
  count: number;
  opportunities: OpportunityMiniCard[];
  color?: string;
}

export function PipelineColumn({ title, count, opportunities, color = '#0057FF' }: PipelineColumnProps) {
  return (
    <div className="flex flex-col gap-3 min-w-[280px]">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: color }}
          />
          <h3 className="text-[#1E1F22]">{title}</h3>
        </div>
        <span className="text-sm text-[#6A6D72] bg-[#E8EAED] px-2 py-1 rounded-full">
          {count}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {opportunities.map((opp) => (
          <StratusCard key={opp.id} className="cursor-move hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-2">
              <GripVertical className="w-4 h-4 text-[#6A6D72] mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm mb-1">{opp.title}</p>
                <p className="text-sm text-[#6A6D72]">{opp.value}</p>
              </div>
            </div>
          </StratusCard>
        ))}
      </div>
    </div>
  );
}
