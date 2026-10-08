import { useCallback, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { OpportunityService } from '../../services/OpportunityService';
import { OpportunityCard } from '../OpportunityCard';
import { OpportunityForm } from '../OpportunityForm';
import { StratusButton } from '../StratusButton';
import { Plus, Search } from 'lucide-react';
import { useResource } from '../../hooks/useResource';

export function OpportunityFeedPage({ onSelect }: { onSelect: (id: string) => void }) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [creating, setCreating] = useState(false);

  const [page, setPage] = useState(0);
  const load = useCallback(() => OpportunityService.getPage(user!.id, page, searchQuery, filterStatus), [user, page, searchQuery, filterStatus]);
  const resource = useResource(load);
  const filteredOpportunities = resource.data?.items ?? [];
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="mb-2">Opportunity Feed</h1>
          <p className="text-[var(--color-fg-secondary)]">
            {resource.data?.total ?? 0} opportunities found
          </p>
        </div>
        <StratusButton variant="primary" onClick={() => setCreating(true)}>
          <Plus className="w-4 h-4" />
          New Opportunity
        </StratusButton>
      </div>

      {creating && user && <OpportunityForm userId={user.id} onCancel={() => setCreating(false)} onCreated={() => { setPage(0); resource.refresh(); setCreating(false); }} />}
      {/* Search and Filter Bar */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-fg-tertiary)]" />
            <input
              type="text"
              placeholder="Search opportunities..."
              aria-label="Search opportunities"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
              className="w-full h-[var(--input-height)] pl-10 pr-4 rounded-[var(--radius-m)] border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] text-[var(--color-fg-primary)] placeholder:text-[var(--color-fg-tertiary)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-2 focus:ring-[var(--color-accent-primary)]/20 transition-all"
            />
          </div>
        </div>

        <select
          aria-label="Filter by status"
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setPage(0); }}
          className="h-[var(--input-height)] px-4 rounded-[var(--radius-m)] border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] text-[var(--color-fg-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-2 focus:ring-[var(--color-accent-primary)]/20 transition-all"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="submitted">Submitted</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <nav aria-label="Opportunity pages" className="flex items-center gap-4">
        <StratusButton disabled={page === 0 || resource.loading} onClick={() => setPage(value => value - 1)}>Previous</StratusButton>
        <span>Page {page + 1}</span>
        <StratusButton disabled={resource.loading || !resource.data || (page + 1) * resource.data.pageSize >= resource.data.total} onClick={() => setPage(value => value + 1)}>Next</StratusButton>
      </nav>
      {/* Opportunities Grid */}
      {resource.loading ? <p role="status">Loading opportunities…</p> : resource.error ? <p role="alert">{resource.error} <button onClick={resource.refresh}>Retry</button></p> : filteredOpportunities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[var(--color-fg-secondary)]">No opportunities found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map(opportunity => (
            <OpportunityCard
              key={opportunity.id}
              title={opportunity.title}
              score={opportunity.winnabilityScore}
              deadline={opportunity.deadline}
              value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(opportunity.value)}
              reasoning={opportunity.description}
              scoreVariant={opportunity.winnabilityScore >= 70 ? 'winnable' : opportunity.winnabilityScore >= 40 ? 'moderate' : 'avoid'}
              onClick={() => onSelect(opportunity.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
