import { useState, type FormEvent } from 'react';
import { OpportunityService } from '../services/OpportunityService';
import { StratusCard } from './StratusCard';
import { StratusInput } from './StratusInput';
import { StratusButton } from './StratusButton';
import type { Opportunity } from '../types/opportunity';

export function OpportunityForm({ userId, onCreated, onCancel }: { userId: string; onCreated: (opportunity: Opportunity) => void; onCancel: () => void }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const text = (key: string) => String(fields.get(key) ?? '').trim();
    setPending(true);
    setError('');
    try {
      const opportunity = await OpportunityService.create(userId, {
        title: text('title'), description: text('description'), agency: text('agency'),
        solicitationNumber: text('solicitation'), category: text('category'),
        value: Number(fields.get('value')), deadline: `${text('deadline')}T23:59:59Z`,
      });
      onCreated(opportunity);
    } catch { setError('Could not create the opportunity. Check the fields and backend setup, then retry.'); }
    finally { setPending(false); }
  }
  return <StratusCard>
    <h2 className="mb-4">New Opportunity</h2>
    <form onSubmit={submit}>
      <fieldset disabled={pending} className="flex flex-col gap-4">
        <StratusInput name="title" label="Opportunity title" required maxLength={500} />
        <StratusInput name="agency" label="Agency or client" required maxLength={500} />
        <StratusInput name="solicitation" label="Solicitation number" required maxLength={500} />
        <StratusInput name="category" label="Category" required maxLength={500} />
        <StratusInput name="description" label="Description" required maxLength={5000} />
        <StratusInput name="value" label="Estimated value (USD)" type="number" min={0} max={1000000000000} step="0.01" required />
        <StratusInput name="deadline" label="Deadline (end of day UTC)" type="date" required />
        {error && <p role="alert">{error}</p>}
        <div className="flex gap-3">
          <StratusButton type="submit">{pending ? 'Creating…' : 'Create Opportunity'}</StratusButton>
          <StratusButton type="button" variant="ghost" onClick={onCancel}>Cancel</StratusButton>
        </div>
      </fieldset>
    </form>
  </StratusCard>;
}
