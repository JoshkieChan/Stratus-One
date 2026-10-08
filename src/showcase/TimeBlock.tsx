import { StratusCard } from '../components/StratusCard';
import { StratusBadge } from '../components/StratusBadge';

export function TimeBlock({ period, time, tasks }: { period: string; time: string; tasks: Array<{ title: string; time: string; status: string }> }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-[#1E1F22]">{period}</h3>
        <span className="text-sm text-[#6A6D72]">{time}</span>
      </div>
      <div className="flex flex-col gap-2 pl-4 border-l-2 border-[#E8EAED]">
        {tasks.map((task, i) => (
          <StratusCard key={i} className={
            task.status === 'completed' ? 'bg-[#27AE60]/5 border border-[#27AE60]' :
            task.status === 'in-progress' ? 'bg-[#0057FF]/5 border border-[#0057FF]' :
            'bg-white'
          }>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={task.status === 'completed' ? 'line-through text-[#6A6D72]' : 'text-[#1E1F22]'}>
                  {task.title}
                </p>
                <p className="text-sm text-[#6A6D72] font-mono">{task.time}</p>
              </div>
              <StratusBadge
                variant={
                  task.status === 'completed' ? 'winnable' :
                  task.status === 'in-progress' ? 'info' :
                  'moderate'
                }
              >
                {task.status === 'completed' ? 'Done' : task.status === 'in-progress' ? 'In Progress' : 'Pending'}
              </StratusBadge>
            </div>
          </StratusCard>
        ))}
      </div>
    </div>
  );
}
