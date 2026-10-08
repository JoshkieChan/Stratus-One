import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { OpportunityService } from '../../services/OpportunityService';
import { PipelineColumn } from '../PipelineColumn';
import { formatCurrency } from '../../utils/format';
import type { Opportunity } from '../../types/opportunity';

export function PipelineBoardPage() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingId, setPendingId] = useState<string>();
  const [saveError, setSaveError] = useState('');

  async function changeStage(id: string, status: Opportunity['status']) {
    setPendingId(id); setSaveError('');
    try {
      const updated = await OpportunityService.update(id, { status });
      setOpportunities(previous => previous.map(item => item.id === id ? updated : item));
    } catch { setSaveError('Stage could not be saved. Your opportunity remains in its previous stage.'); }
    finally { setPendingId(undefined); }
  }

  useEffect(() => {
    if (user) {
      loadOpportunities();
    }
  }, [user]);

  const loadOpportunities = async () => {
    setError(null);
    try {
      const data = await OpportunityService.getAll(user!.id);
      setOpportunities(data);
    } catch {
      setError('Unable to load or save data. Check your connection and backend configuration, then reload.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { id: 'open', title: 'Open', status: 'open' as const },
    { id: 'in_progress', title: 'In Progress', status: 'in_progress' as const },
    { id: 'submitted', title: 'Submitted', status: 'submitted' as const },
    { id: 'won', title: 'Won', status: 'won' as const },
    { id: 'lost', title: 'Lost', status: 'lost' as const },
    { id: 'closed', title: 'Closed', status: 'closed' as const },
  ];

  if (error) return <p role="alert">{error}</p>;

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
          Move opportunities between stages using the stage selector on each card.
        </p>
      </div>

      {saveError && <p role="alert">{saveError}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto">
        {columns.map(column => (
          <PipelineColumn
            key={column.id}
            title={column.title}
            onStatusChange={(id, status) => void changeStage(id, status)}
            pendingId={pendingId}
            count={opportunities.filter(opp => opp.status === column.status).length}
            opportunities={opportunities.filter(opp => opp.status === column.status).map(opp => ({ ...opp, value: formatCurrency(opp.value) }))}
          />
        ))}
      </div>
    </div>
  );
}
