import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { OpportunityService } from '../../services/OpportunityService';
import { OpportunityCard } from '../OpportunityCard';
import { StratusButton } from '../StratusButton';
import { StratusInput } from '../StratusInput';
import { Filter, Plus, Search } from 'lucide-react';
import type { Opportunity } from '../../types/opportunity';

export function OpportunityFeedPage() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (user) {
      loadOpportunities();
    }
  }, [user]);

  const loadOpportunities = async () => {
    try {
      const data = await OpportunityService.getAll(user!.id);
      setOpportunities(data);
    } catch (error) {
      console.error('Failed to load opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.agency.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || opp.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[var(--color-fg-secondary)]">Loading opportunities...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="mb-2">Opportunity Feed</h1>
          <p className="text-[var(--color-fg-secondary)]">
            {filteredOpportunities.length} opportunities found
          </p>
        </div>
        <StratusButton variant="primary">
          <Plus className="w-4 h-4" />
          New Opportunity
        </StratusButton>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-fg-tertiary)]" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[var(--input-height)] pl-10 pr-4 rounded-[var(--radius-m)] border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] text-[var(--color-fg-primary)] placeholder:text-[var(--color-fg-tertiary)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-2 focus:ring-[var(--color-accent-primary)]/20 transition-all"
            />
          </div>
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="h-[var(--input-height)] px-4 rounded-[var(--radius-m)] border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] text-[var(--color-fg-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-2 focus:ring-[var(--color-accent-primary)]/20 transition-all"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="submitted">Submitted</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {/* Opportunities Grid */}
      {filteredOpportunities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[var(--color-fg-secondary)]">No opportunities found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map(opportunity => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              onClick={() => console.log('View opportunity:', opportunity.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
