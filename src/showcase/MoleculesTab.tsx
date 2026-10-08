import { useState } from 'react';
import { OpportunityCard } from '../components/OpportunityCard';
import { TaskRow } from '../components/TaskRow';
import { PipelineColumn } from '../components/PipelineColumn';

export function MoleculesTab() {
  const [taskChecked, setTaskChecked] = useState(false);

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="text-[#01204A] mb-2">Opportunity Card</h2>
        <p className="text-[#6A6D72] mb-6">Complex card component for displaying opportunities</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <OpportunityCard
            title="Enterprise CRM Implementation"
            score={92}
            deadline="Dec 15, 2025"
            value="$45,000"
            reasoning="You've completed 3 similar projects with 100% success rate. Client is in your network and values your expertise."
            scoreVariant="winnable"
          />
          <OpportunityCard
            title="Small Business Website Redesign"
            score={68}
            deadline="Jan 10, 2026"
            value="$8,500"
            reasoning="Moderate fit. You have the skills but limited experience in this exact industry vertical."
            scoreVariant="moderate"
          />
          <OpportunityCard
            title="Complex Blockchain Integration"
            score={34}
            deadline="Dec 1, 2025"
            value="$65,000"
            reasoning="High technical requirements outside your core expertise. Timeline is tight and budget expectations may be unrealistic."
            scoreVariant="avoid"
          />
        </div>
      </section>

      <section>
        <h2 className="text-[#01204A] mb-2">Task Row</h2>
        <p className="text-[#6A6D72] mb-6">Interactive task list item with checkbox and status</p>

        <div className="flex flex-col gap-3 max-w-4xl">
          <TaskRow
            title="Complete initial discovery call"
            dueTime="2:00 PM"
            status="in-progress"
            checked={taskChecked}
            onCheck={setTaskChecked}
          />
          <TaskRow
            title="Send proposal document"
            dueTime="5:00 PM"
            status="pending"
          />
          <TaskRow
            title="Follow up with client"
            dueTime="10:00 AM"
            status="completed"
            checked={true}
          />
        </div>
      </section>

      <section>
        <h2 className="text-[#01204A] mb-2">Pipeline Column</h2>
        <p className="text-[#6A6D72] mb-6">Kanban-style column for pipeline management</p>

        <div className="flex gap-6 overflow-x-auto pb-4">
          <PipelineColumn
            title="Qualified"
            count={3}
            color="#0057FF"
            opportunities={[
              { id: '1', title: 'E-commerce Platform Build', value: '$25,000' },
              { id: '2', title: 'Mobile App Development', value: '$40,000' },
              { id: '3', title: 'API Integration Project', value: '$15,000' }
            ]}
          />
          <PipelineColumn
            title="Proposal Sent"
            count={2}
            color="#35CFFF"
            opportunities={[
              { id: '4', title: 'Website Redesign', value: '$12,000' },
              { id: '5', title: 'CRM Customization', value: '$18,000' }
            ]}
          />
          <PipelineColumn
            title="Negotiation"
            count={1}
            color="#27AE60"
            opportunities={[
              { id: '6', title: 'Enterprise Integration', value: '$55,000' }
            ]}
          />
        </div>
      </section>
    </div>
  );
}
