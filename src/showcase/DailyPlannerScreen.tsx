import { StratusCard } from '../components/StratusCard';

import { TimeBlock } from './TimeBlock';
export function DailyPlannerScreen() {
  return (
    <div className="max-w-4xl">
      <StratusCard>
        <div className="mb-8">
          <h2 className="text-[#01204A] mb-1">Daily Planner</h2>
          <p className="text-[#6A6D72]">Tuesday, November 18, 2025</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#1E1F22]">Today's Progress</h3>
            <span className="text-sm font-mono text-[#6A6D72]">65% Complete</span>
          </div>
          <div className="h-3 bg-[#E8EAED] rounded-full overflow-hidden">
            <div className="h-full bg-[#0057FF] rounded-full transition-all" style={{ width: '65%' }} />
          </div>
        </div>

        <div className="space-y-6">
          <TimeBlock
            period="Morning"
            time="8:00 AM - 12:00 PM"
            tasks={[
              { title: 'Review new opportunities', time: '8:00 - 9:00', status: 'completed' },
              { title: 'Client call - Acme Corp', time: '9:30 - 10:30', status: 'completed' },
              { title: 'Draft proposal outline', time: '11:00 - 12:00', status: 'in-progress' }
            ]}
          />

          <TimeBlock
            period="Afternoon"
            time="1:00 PM - 5:00 PM"
            tasks={[
              { title: 'Finish proposal document', time: '1:00 - 3:00', status: 'pending' },
              { title: 'Send follow-up emails', time: '3:00 - 4:00', status: 'pending' },
              { title: 'Update pipeline board', time: '4:00 - 5:00', status: 'pending' }
            ]}
          />

          <TimeBlock
            period="Evening"
            time="6:00 PM - 8:00 PM"
            tasks={[
              { title: 'Review daily metrics', time: '6:00 - 6:30', status: 'pending' },
              { title: 'Plan tomorrow\'s priorities', time: '6:30 - 7:00', status: 'pending' }
            ]}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StratusCard className="bg-[#F7F9FA]">
            <p className="text-sm text-[#6A6D72] mb-1">Tasks Completed</p>
            <p className="font-mono">2 / 8</p>
          </StratusCard>
          <StratusCard className="bg-[#F7F9FA]">
            <p className="text-sm text-[#6A6D72] mb-1">Time Logged</p>
            <p className="font-mono">3h 30m</p>
          </StratusCard>
          <StratusCard className="bg-[#F7F9FA]">
            <p className="text-sm text-[#6A6D72] mb-1">Focus Score</p>
            <p className="font-mono">8.5/10</p>
          </StratusCard>
        </div>
      </StratusCard>
    </div>
  );
}
