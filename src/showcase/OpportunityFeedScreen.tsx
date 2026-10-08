import { useState } from 'react';
import { OpportunityCard } from '../components/OpportunityCard';

export function OpportunityFeedScreen() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-[#01204A] mb-1">Opportunity Feed</h2>
          <p className="text-[#6A6D72]">24 opportunities matched to your profile</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-[#0057FF] text-white' : 'bg-white text-[#6A6D72] border border-[#E8EAED]'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('winnable')}
            className={`px-4 py-2 rounded-lg transition-colors ${filter === 'winnable' ? 'bg-[#27AE60] text-white' : 'bg-white text-[#6A6D72] border border-[#E8EAED]'}`}
          >
            Winnable
          </button>
          <button
            onClick={() => setFilter('moderate')}
            className={`px-4 py-2 rounded-lg transition-colors ${filter === 'moderate' ? 'bg-[#E2B93B] text-white' : 'bg-white text-[#6A6D72] border border-[#E8EAED]'}`}
          >
            Moderate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => {
          const variants = ['winnable', 'moderate', 'avoid'] as const;
          const titles = [
            'Enterprise CRM Implementation',
            'Website Redesign Project',
            'Mobile App Development',
            'Marketing Automation',
            'E-commerce Platform',
            'Custom Dashboard',
            'API Integration',
            'Database Migration',
            'Cloud Infrastructure'
          ];
          const variant = variants[i % 3];
          const scores = [92, 68, 34];

          return (
            <OpportunityCard
              key={i}
              title={titles[i]}
              score={scores[i % 3]}
              deadline={`Dec ${15 + i}, 2025`}
              value={`$${(15 + i * 5)},000`}
              reasoning={variant === 'winnable' ? 'Strong match with your experience.' : variant === 'moderate' ? 'Moderate fit for your skills.' : 'Outside core expertise area.'}
              scoreVariant={variant}
            />
          );
        })}
      </div>

      <div className="flex justify-center gap-2 pt-4">
        <button className="px-4 py-2 bg-white border border-[#E8EAED] rounded-lg hover:bg-[#F7F9FA]">Previous</button>
        <button className="px-4 py-2 bg-[#0057FF] text-white rounded-lg">1</button>
        <button className="px-4 py-2 bg-white border border-[#E8EAED] rounded-lg hover:bg-[#F7F9FA]">2</button>
        <button className="px-4 py-2 bg-white border border-[#E8EAED] rounded-lg hover:bg-[#F7F9FA]">3</button>
        <button className="px-4 py-2 bg-white border border-[#E8EAED] rounded-lg hover:bg-[#F7F9FA]">Next</button>
      </div>
    </div>
  );
}
