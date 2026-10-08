import { useState, type FormEvent } from 'react';
import { TaskService } from '../services/TaskService';
import type { TaskPack } from '../types/task';
import { TaskRow } from './TaskRow';
import { StratusButton } from './StratusButton';
import { StratusInput } from './StratusInput';
import { StratusCard } from './StratusCard';

export function TaskPackCard({ pack, refresh }: { pack: TaskPack; refresh: () => void }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function change(taskId: string, completed: boolean) {
    setPending(true); setError('');
    try { await TaskService.update(taskId, { status: completed ? 'completed' : 'in_progress' }); refresh(); }
    catch { setError('Could not update task. Please retry.'); }
    finally { setPending(false); }
  }
  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setPending(true); setError('');
    try {
      await TaskService.create({ opportunityId: pack.opportunityId, taskPackId: pack.id, title: String(fields.get('title')).trim(), priority: 'medium', dueDate: String(fields.get('dueDate')) || undefined });
      form.reset(); refresh();
    } catch { setError('Could not create task. Please retry.'); }
    finally { setPending(false); }
  }
  return <StratusCard>
    <h2 className="mb-4">{pack.name}</h2>
    {pack.description && <p>{pack.description}</p>}
    {error && <p role="alert">{error}</p>}
    <fieldset disabled={pending} className="flex flex-col gap-3">
      {pack.tasks.map(task => <TaskRow key={task.id} title={task.title} dueTime={task.dueDate ?? 'No due date'} status={task.status === 'in_progress' ? 'in-progress' : task.status} checked={task.status === 'completed'} onCheck={checked => void change(task.id, checked)} />)}
      <form onSubmit={create} className="flex flex-col gap-3">
        <StratusInput name="title" label={`New task for ${pack.name}`} required maxLength={500} />
        <StratusInput name="dueDate" label={`Due date for ${pack.name}`} type="date" />
        <StratusButton type="submit" variant="secondary">Add Task</StratusButton>
      </form>
    </fieldset>
  </StratusCard>;
}
