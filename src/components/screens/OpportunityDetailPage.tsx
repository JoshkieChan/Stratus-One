import { useCallback } from 'react';
import { OpportunityService } from '../../services/OpportunityService';
import { useResource } from '../../hooks/useResource';
import { StratusCard } from '../StratusCard';
import { StratusButton } from '../StratusButton';
import { formatCurrency, formatDate } from '../../utils/format';
export function OpportunityDetailPage({ opportunityId, onTasks, onQuote }: { opportunityId?: string; onTasks: () => void; onQuote: () => void }) {
  const load = useCallback(() => opportunityId ? OpportunityService.getById(opportunityId) : Promise.resolve(null), [opportunityId]);
  const { data, loading, error, refresh } = useResource(load);
  if (!opportunityId) return <p>Select an opportunity above or create one in the feed.</p>;
  if (loading) return <p role="status">Loading opportunity…</p>;
  if (error) return <p role="alert">{error} <button onClick={refresh}>Retry</button></p>;
  if (!data) return <p role="alert">Opportunity not found or no longer accessible. Choose another opportunity above.</p>;
  return <div className="flex flex-col gap-6"><div><p className="text-sm text-[var(--color-fg-secondary)]">Opportunity detail · {data.solicitationNumber}</p><h1 className="mt-2">{data.title}</h1><p className="mt-2">{data.agency}</p></div>
    <StratusCard><h2>Scope</h2><p className="mt-3 whitespace-pre-wrap">{data.description}</p></StratusCard>
    <StratusCard><dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">{[['Estimated value',formatCurrency(data.value)],['Deadline',formatDate(data.deadline)],['Stage',data.status.replaceAll('_',' ')],['Category',data.category],['Priority score',`${data.winnabilityScore}/100`]].map(([label,value]) => <div key={label}><dt className="text-sm text-[var(--color-fg-secondary)]">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>)}</dl><p className="mt-5 text-sm">Priority is a transparent timeline/value heuristic, not a win probability or eligibility check.</p></StratusCard>
    <div className="flex flex-wrap gap-3"><StratusButton onClick={onTasks}>Open task workflow</StratusButton><StratusButton variant="secondary" onClick={onQuote}>Prepare a quote</StratusButton></div>
  </div>;
}
