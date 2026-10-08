import { StratusCard } from '../components/StratusCard';
import { OpportunityCard } from '../components/OpportunityCard';
import { TaskRow } from '../components/TaskRow';

export function DashboardScreen() {
  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 sm:p-8 bg-gradient-to-br from-[#0057FF] to-[#01204A] rounded-xl">
        <h1 className="text-white mb-2">Good Morning, Joshkie.</h1>
        <p className="text-[#35CFFF]">You have 12 active opportunities worth $340,000</p>
      </div>

      <div>
        <h2 className="text-[#01204A] mb-4">Top 3 Opportunities Today</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <OpportunityCard
            title="Enterprise CRM Implementation"
            score={92}
            deadline="Dec 15, 2025"
            value="$45,000"
            reasoning="Perfect fit. You've done this 3 times before with 100% success."
            scoreVariant="winnable"
          />
          <OpportunityCard
            title="Marketing Automation Setup"
            score={87}
            deadline="Dec 20, 2025"
            value="$28,000"
            reasoning="Strong match. Client is warm lead from your network."
            scoreVariant="winnable"
          />
          <OpportunityCard
            title="Custom Dashboard Build"
            score={74}
            deadline="Jan 5, 2026"
            value="$15,000"
            reasoning="Good opportunity. Requires some new skills but achievable."
            scoreVariant="moderate"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-[#1E1F22] mb-4">Quick Wins Today</h3>
          <div className="flex flex-col gap-3">
            <TaskRow title="Send follow-up to Acme Corp" dueTime="10:00 AM" status="pending" />
            <TaskRow title="Finalize proposal for Tech Startup" dueTime="2:00 PM" status="in-progress" />
            <TaskRow title="Schedule demo call" dueTime="4:00 PM" status="pending" />
          </div>
        </div>

        <div>
          <h3 className="text-[#1E1F22] mb-4">Pipeline Summary</h3>
          <StratusCard className="bg-[#F7F9FA]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[#6A6D72]">Qualified</span>
                <span className="font-mono">8 ($180K)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6A6D72]">Proposal Sent</span>
                <span className="font-mono">5 ($95K)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6A6D72]">Negotiation</span>
                <span className="font-mono">2 ($65K)</span>
              </div>
              <div className="h-px bg-[#E8EAED] my-2" />
              <div className="flex justify-between items-center">
                <span>Total Pipeline</span>
                <span className="font-mono text-[#0057FF]">15 ($340K)</span>
              </div>
            </div>
          </StratusCard>
        </div>
      </div>
    </div>
  );
}
