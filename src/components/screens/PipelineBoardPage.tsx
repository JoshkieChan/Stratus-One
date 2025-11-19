import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { OpportunityService } from '../../services/OpportunityService';
import { PipelineColumn } from '../PipelineColumn';
import type { Opportunity } from '../../types/opportunity';

export function PipelineBoardPage() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

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

  const columns = [
    { id: 'open', title: 'Open', status: 'open' as const },
    { id: 'in_progress', title: 'In Progress', status: 'in_progress' as const },
    { id: 'submitted', title: 'Submitted', status: 'submitted' as const },
    { id: 'won', title: 'Won', status: 'won' as const },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[var(--color-fg-secondary)]">Loading pipeline...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="mb-2">Pipeline Board</h1>
        <p className="text-[var(--color-fg-secondary)]">
          Visualize your opportunity pipeline
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto">
        {columns.map(column => (
          <PipelineColumn
            key={column.id}
            title={column.title}
            opportunities={opportunities.filter(opp => opp.status === column.status)}
          />
        ))}
      </div>
    </div>
  );
}
