import { StratusCard } from '../components/StratusCard';
import { StratusBadge } from '../components/StratusBadge';
import { TaskRow } from '../components/TaskRow';

export function IdentityProfileScreen() {
  return (
    <div className="max-w-4xl">
      <StratusCard>
        <div className="mb-8">
          <h2 className="text-[#01204A] mb-1">Identity Profile</h2>
          <p className="text-[#6A6D72]">Your skills, experience, and opportunity fit score</p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="relative w-48 h-48 mb-4">
            <svg className="transform -rotate-90" width="192" height="192">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#E8EAED"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#0057FF"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${88 * 2 * Math.PI * 0.87} ${88 * 2 * Math.PI}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-[#01204A]" style={{ fontSize: '48px' }}>87%</span>
              <span className="text-sm text-[#6A6D72]">Success Score</span>
            </div>
          </div>
          <p className="text-center text-[#6A6D72]">Based on your experience, skills, and market fit</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-[#1E1F22] mb-4">Core Skills</h3>
            <div className="flex flex-col gap-3">
              {[
                { skill: 'CRM Implementation', level: 95 },
                { skill: 'API Development', level: 88 },
                { skill: 'Database Design', level: 82 },
                { skill: 'Project Management', level: 90 },
                { skill: 'Client Communication', level: 93 }
              ].map((item) => (
                <div key={item.skill}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-[#1E1F22]">{item.skill}</span>
                    <span className="text-sm text-[#6A6D72] font-mono">{item.level}%</span>
                  </div>
                  <div className="h-2 bg-[#E8EAED] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0057FF] rounded-full transition-all"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#1E1F22] mb-4">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Salesforce', 'HubSpot', 'Zapier', 'PostgreSQL',
                'React', 'Node.js', 'AWS', 'Docker',
                'Git', 'Jira', 'Figma', 'Slack'
              ].map((tool) => (
                <StratusBadge key={tool} variant="info">
                  {tool}
                </StratusBadge>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-[#1E1F22] mb-4">Portfolio Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StratusCard className="bg-[#F7F9FA]">
              <p className="text-sm text-[#6A6D72] mb-1">Projects Completed</p>
              <p className="font-mono">47</p>
            </StratusCard>
            <StratusCard className="bg-[#F7F9FA]">
              <p className="text-sm text-[#6A6D72] mb-1">Client Satisfaction</p>
              <p className="font-mono">4.9/5.0</p>
            </StratusCard>
            <StratusCard className="bg-[#F7F9FA]">
              <p className="text-sm text-[#6A6D72] mb-1">Total Revenue</p>
              <p className="font-mono">$1.2M</p>
            </StratusCard>
          </div>
        </div>

        <div>
          <h3 className="text-[#1E1F22] mb-4">Next 3 Steps to Improve</h3>
          <div className="flex flex-col gap-3">
            <TaskRow title="Complete advanced Salesforce certification" dueTime="This month" status="pending" />
            <TaskRow title="Build portfolio case study for enterprise clients" dueTime="Next 2 weeks" status="in-progress" />
            <TaskRow title="Expand network in fintech industry" dueTime="Ongoing" status="pending" />
          </div>
        </div>
      </StratusCard>
    </div>
  );
}
