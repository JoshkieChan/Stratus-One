import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { TaskService } from '../../services/TaskService';
import { TaskRow } from '../TaskRow';
import { StratusButton } from '../StratusButton';
import { StratusCard } from '../StratusCard';
import { Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { Task, TaskPack } from '../../types/task';

export function TaskPackPage({ opportunityId }: { opportunityId?: string }) {
  const { user } = useAuth();
  const [taskPacks, setTaskPacks] = useState<TaskPack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (opportunityId) {
      loadTaskPacks();
    }
  }, [opportunityId]);

  const loadTaskPacks = async () => {
    try {
      const data = await TaskService.getTaskPacks(opportunityId!);
      setTaskPacks(data);
    } catch (error) {
      console.error('Failed to load task packs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskComplete = async (taskId: string, completed: boolean) => {
    try {
      await TaskService.update(taskId, {
        status: completed ? 'completed' : 'in_progress',
        completedAt: completed ? new Date().toISOString() : undefined,
      });
      loadTaskPacks();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[var(--color-fg-secondary)]">Loading task packs...</p>
      </div>
    );
  }

  const allTasks = taskPacks.flatMap(pack => pack.tasks);
  const stats = {
    total: allTasks.length,
    completed: allTasks.filter(t => t.status === 'completed').length,
    inProgress: allTasks.filter(t => t.status === 'in_progress').length,
    pending: allTasks.filter(t => t.status === 'pending').length,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="mb-2">Task Packs</h1>
          <p className="text-[var(--color-fg-secondary)]">
            Manage your opportunity tasks
          </p>
        </div>
        <StratusButton variant="primary">
          <Plus className="w-4 h-4" />
          New Task Pack
        </StratusButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<CheckCircle className="w-5 h-5 text-[var(--color-success)]" />}
          label="Completed"
          value={stats.completed}
        />
        <StatCard
          icon={<Clock className="w-5 h-5 text-[var(--color-warning)]" />}
          label="In Progress"
          value={stats.inProgress}
        />
        <StatCard
          icon={<AlertCircle className="w-5 h-5 text-[var(--color-fg-secondary)]" />}
          label="Pending"
          value={stats.pending}
        />
        <StatCard
          icon={<CheckCircle className="w-5 h-5 text-[var(--color-accent-primary)]" />}
          label="Total Tasks"
          value={stats.total}
        />
      </div>

      {/* Task Packs */}
      {taskPacks.length === 0 ? (
        <StratusCard>
          <div className="text-center py-12">
            <p className="text-[var(--color-fg-secondary)]">No task packs yet</p>
            <StratusButton variant="primary" className="mt-4">
              Create Your First Task Pack
            </StratusButton>
          </div>
        </StratusCard>
      ) : (
        <div className="flex flex-col gap-6">
          {taskPacks.map(pack => (
            <StratusCard key={pack.id}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3>{pack.name}</h3>
                  {pack.description && (
                    <p className="text-sm text-[var(--color-fg-secondary)] mt-1">
                      {pack.description}
                    </p>
                  )}
                </div>
                <StratusButton variant="ghost">
                  <Plus className="w-4 h-4" />
                  Add Task
                </StratusButton>
              </div>

              <div className="flex flex-col gap-2">
                {pack.tasks.map(task => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onToggle={(completed) => handleTaskComplete(task.id, completed)}
                  />
                ))}
              </div>
            </StratusCard>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <StratusCard>
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm text-[var(--color-fg-secondary)]">{label}</p>
          <p className="text-2xl font-semibold text-[var(--color-fg-primary)]">{value}</p>
        </div>
      </div>
    </StratusCard>
  );
}
