import { useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useResource } from '../hooks/useResource';
import { OpportunityService } from '../services/OpportunityService';
export function OpportunityPicker({ selectedId, onSelect }: { selectedId?: string; onSelect: (id: string) => void }) {
  const { user } = useAuth();
  const load = useCallback(() => OpportunityService.getAll(user!.id), [user]);
  const resource = useResource(load);
  return <div className="mb-6 flex flex-col gap-2">
    <label htmlFor="workspace-opportunity" className="text-sm font-medium">Selected opportunity</label>
    <select id="workspace-opportunity" className="w-full min-w-0 max-w-[640px] p-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-default)]" value={selectedId ?? ''} disabled={resource.loading || Boolean(resource.error)} onChange={event => onSelect(event.target.value)}>
      <option value="" disabled>{resource.loading ? 'Loading opportunities…' : 'Select an opportunity'}</option>
      {selectedId && !resource.data?.some(item => item.id === selectedId) && <option value={selectedId}>Opportunity unavailable</option>}
      {resource.data?.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
    </select>
    {resource.error && <p role="alert">{resource.error} <button className="underline" onClick={resource.refresh}>Retry</button></p>}
    {!resource.loading && resource.data?.length === 0 && <p>No opportunities yet. Create one in the Opportunity Feed.</p>}
  </div>;
}
