import { StratusBadge } from './StratusBadge';
import { Clock } from 'lucide-react';

interface TaskRowProps {
  title: string;
  dueTime: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  checked?: boolean;
  onCheck?: (checked: boolean) => void;
}

export function TaskRow({ title, dueTime, status, checked = false, onCheck }: TaskRowProps) {
  const statusColors = {
    'blocked': 'avoid' as const,
    'pending': 'moderate' as const,
    'in-progress': 'info' as const,
    'completed': 'winnable' as const
  };

  const statusLabels = {
    'blocked': 'Blocked',
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-border-default)] hover:border-[#0057FF]/30 transition-colors">
      <input
        type="checkbox"
        aria-label={`Complete ${title}`}
        checked={checked}
        onChange={(e) => onCheck?.(e.target.checked)}
        className="w-5 h-5 rounded border-2 border-[#D9DCE1] checked:bg-[#0057FF] checked:border-[#0057FF] cursor-pointer"
      />

      <div className="flex-1">
        <p className={`${checked ? 'line-through text-[var(--color-fg-secondary)]' : 'text-[var(--color-fg-primary)]'}`}>
          {title}
        </p>
      </div>

      <div className="flex items-center gap-2 text-[var(--color-fg-secondary)]">
        <Clock className="w-4 h-4" />
        <span className="text-sm">{dueTime}</span>
      </div>

      <StratusBadge variant={statusColors[status]}>
        {statusLabels[status]}
      </StratusBadge>
    </div>
  );
}
