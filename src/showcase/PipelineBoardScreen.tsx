import { StratusCard } from '../components/StratusCard';
import { PipelineColumn } from '../components/PipelineColumn';

export function PipelineBoardScreen() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[#01204A] mb-1">Pipeline Board</h2>
        <p className="text-[#6A6D72]">Drag and drop opportunities between stages</p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        <PipelineColumn
          title="Qualified"
          count={8}
          color="#0057FF"
          opportunities={[
            { id: '1', title: 'E-commerce Platform Build', value: '$25,000' },
            { id: '2', title: 'Mobile App Development', value: '$40,000' },
            { id: '3', title: 'API Integration Project', value: '$15,000' },
            { id: '4', title: 'Website Redesign', value: '$12,000' }
          ]}
        />
        <PipelineColumn
          title="Proposal Sent"
          count={5}
          color="#35CFFF"
          opportunities={[
            { id: '5', title: 'CRM Customization', value: '$18,000' },
            { id: '6', title: 'Marketing Automation', value: '$22,000' },
            { id: '7', title: 'Data Migration', value: '$14,000' }
          ]}
        />
        <PipelineColumn
          title="Negotiation"
          count={2}
          color="#E2B93B"
          opportunities={[
            { id: '8', title: 'Enterprise Integration', value: '$55,000' },
            { id: '9', title: 'Custom Dashboard', value: '$28,000' }
          ]}
        />
        <PipelineColumn
          title="Closing"
          count={3}
          color="#27AE60"
          opportunities={[
            { id: '10', title: 'SaaS Platform Build', value: '$75,000' },
            { id: '11', title: 'Legacy System Upgrade', value: '$32,000' }
          ]}
        />
        <PipelineColumn
          title="Won"
          count={12}
          color="#27AE60"
          opportunities={[
            { id: '12', title: 'E-learning Portal', value: '$38,000' }
          ]}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StratusCard className="bg-[#0057FF]/5 border-2 border-[#0057FF]">
          <p className="text-sm text-[#6A6D72] mb-1">Total Opportunities</p>
          <p className="font-mono">30</p>
        </StratusCard>
        <StratusCard className="bg-[#35CFFF]/5 border-2 border-[#35CFFF]">
          <p className="text-sm text-[#6A6D72] mb-1">Pipeline Value</p>
          <p className="font-mono">$340,000</p>
        </StratusCard>
        <StratusCard className="bg-[#27AE60]/5 border-2 border-[#27AE60]">
          <p className="text-sm text-[#6A6D72] mb-1">Win Rate</p>
          <p className="font-mono">78%</p>
        </StratusCard>
        <StratusCard className="bg-[#E2B93B]/5 border-2 border-[#E2B93B]">
          <p className="text-sm text-[#6A6D72] mb-1">Avg. Deal Size</p>
          <p className="font-mono">$28,500</p>
        </StratusCard>
      </div>
    </div>
  );
}
