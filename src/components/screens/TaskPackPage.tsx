import { useCallback, useState, type FormEvent } from 'react';
import { TaskService } from '../../services/TaskService';
import { OpportunityService } from '../../services/OpportunityService';
import { useResource } from '../../hooks/useResource';
import { TaskPackCard } from '../TaskPackCard';
import { StratusButton } from '../StratusButton';
import { StratusInput } from '../StratusInput';
import { StratusCard } from '../StratusCard';

export function TaskPackPage({ opportunityId }: { opportunityId?: string }) {
  const load = useCallback(async () => {
    if (!opportunityId) return { opportunity: null, packs: [] };
    const [opportunity, packs] = await Promise.all([OpportunityService.getById(opportunityId), TaskService.getTaskPacks(opportunityId)]);
    return { opportunity, packs };
  }, [opportunityId]);
  const { data, loading, error, refresh } = useResource(load);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState('');
  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!opportunityId) return;
    const form = event.currentTarget;
    const name = String(new FormData(form).get('name')).trim();
    setPending(true); setNotice('');
    try { await TaskService.createTaskPack(opportunityId, name); form.reset(); refresh(); }
    catch { setNotice('Unable to create task pack. Please retry.'); }
    finally { setPending(false); }
  }
  async function score() {
    if (!opportunityId) return;
    setPending(true); setNotice('');
    try { await OpportunityService.calculateWinnability(opportunityId); refresh(); }
    catch { setNotice('Scoring failed. Confirm that calculate-winnability is deployed, then retry.'); }
    finally { setPending(false); }
  }
  if (!opportunityId) return <p>Select an opportunity in the feed to view its task packs.</p>;
  if (error) return <div><p role="alert">{error}</p><StratusButton onClick={refresh}>Retry</StratusButton></div>;
  if (loading) return <p role="status">Loading task packs…</p>;
  if (!data?.opportunity) return <p role="alert">Opportunity not found or no longer accessible.</p>;
  const tasks = data.packs.flatMap(pack => pack.tasks);
  return <div className="flex flex-col gap-6">
    <div><h1>{data.opportunity.title}</h1><p>{data.opportunity.description}</p></div>
    <StratusCard>
      <h2>Task Packs</h2>
      <p>{tasks.filter(task => task.status === 'completed').length} of {tasks.length} tasks completed</p>
      <p>Priority: {data.opportunity.winnabilityScore}/100 — a heuristic, not a win probability.</p>
      <StratusButton variant="secondary" disabled={pending} onClick={() => void score()}>Recalculate priority</StratusButton>
    </StratusCard>
    {notice && <p role="alert">{notice}</p>}
    <StratusCard><form onSubmit={create} className="flex flex-col gap-3">
      <StratusInput label="New task pack name" name="name" maxLength={500} required disabled={pending} />
      <StratusButton type="submit" disabled={pending}>{pending ? 'Saving…' : 'Create Task Pack'}</StratusButton>
    </form></StratusCard>
    {data.packs.length === 0 && <p>No task packs yet. Create one to start organizing this opportunity.</p>}
    {data.packs.map(pack => <TaskPackCard key={pack.id} pack={pack} refresh={refresh} />)}
  </div>;
}
