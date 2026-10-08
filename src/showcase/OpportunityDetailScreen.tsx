import { StratusButton } from '../components/StratusButton';
import { StratusCard } from '../components/StratusCard';
import { StratusBadge } from '../components/StratusBadge';
import { TaskRow } from '../components/TaskRow';

export function OpportunityDetailScreen() {
  return (
    <div className="max-w-4xl">
      <StratusCard>
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-[#01204A] mb-2">Enterprise CRM Implementation</h1>
            <p className="text-[#6A6D72]">Acme Corporation • Posted 2 days ago</p>
          </div>
          <StratusBadge variant="winnable">92% Match</StratusBadge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StratusCard className="bg-[#F7F9FA]">
            <p className="text-[#6A6D72] text-sm mb-1">Value</p>
            <p className="font-mono">$45,000</p>
          </StratusCard>
          <StratusCard className="bg-[#F7F9FA]">
            <p className="text-[#6A6D72] text-sm mb-1">Deadline</p>
            <p className="font-mono">Dec 15, 2025</p>
          </StratusCard>
          <StratusCard className="bg-[#F7F9FA]">
            <p className="text-[#6A6D72] text-sm mb-1">Timeline</p>
            <p className="font-mono">8-10 weeks</p>
          </StratusCard>
        </div>

        <div className="mb-8">
          <div className="bg-[#27AE60]/10 border-2 border-[#27AE60] rounded-xl p-6">
            <h3 className="text-[#27AE60] mb-3">Why You Can Win</h3>
            <ul className="flex flex-col gap-2 text-[#1E1F22]">
              <li className="flex items-start gap-2">
                <span className="text-[#27AE60] mt-1">✓</span>
                <span>You've completed 3 similar CRM projects with 100% success rate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#27AE60] mt-1">✓</span>
                <span>Client is in your professional network (2nd degree connection)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#27AE60] mt-1">✓</span>
                <span>Timeline aligns perfectly with your current schedule</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#27AE60] mt-1">✓</span>
                <span>Budget matches your standard pricing (±5%)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-[#1E1F22] mb-4">Requirements</h3>
          <StratusCard className="bg-[#F7F9FA]">
            <ul className="flex flex-col gap-2 text-[#1E1F22]">
              <li>• Salesforce experience (you have: Expert level)</li>
              <li>• API integration capabilities (you have: Advanced)</li>
              <li>• Data migration expertise (you have: Intermediate)</li>
              <li>• Team collaboration tools (you have: Expert level)</li>
            </ul>
          </StratusCard>
        </div>

        <div className="mb-8">
          <h3 className="text-[#1E1F22] mb-4">Suggested Next Steps</h3>
          <div className="flex flex-col gap-3">
            <TaskRow title="Review full project requirements document" dueTime="Next 30 min" status="pending" />
            <TaskRow title="Prepare customized proposal using template #3" dueTime="Today 3:00 PM" status="pending" />
            <TaskRow title="Schedule intro call with decision maker" dueTime="Tomorrow" status="pending" />
          </div>
        </div>

        <StratusButton variant="primary" fullWidth>
          Start Pursuing This Opportunity
        </StratusButton>
      </StratusCard>
    </div>
  );
}
