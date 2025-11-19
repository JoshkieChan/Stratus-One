import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { OpportunityService } from '../../services/OpportunityService';
import { TaskService } from '../../services/TaskService';
import { StratusCard } from '../StratusCard';
import { StratusBadge } from '../StratusBadge';
import { StratusButton } from '../StratusButton';
import { TrendingUp, Target, CheckCircle, Clock, DollarSign } from 'lucide-react';
import type { Opportunity } from '../../types/opportunity';
import type { Task } from '../../types/task';
import { formatCurrency, formatDate } from '../../utils/format';

export function DashboardPage() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const opps = await OpportunityService.getAll(user!.id);
      setOpportunities(opps);
      
      // Get tasks for all opportunities
      const allTasks = await Promise.all(
        opps.map(opp => TaskService.getByOpportunity(opp.id))
      );
      setTasks(allTasks.flat());
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalOpportunities: opportunities.length,
    totalValue: opportunities.reduce((sum, opp) => sum + opp.value, 0),
    activeTasks: tasks.filter(t => t.status !== 'completed').length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
  };

  const upcomingDeadlines = opportunities
    .filter(opp => opp.status === 'open' || opp.status === 'in_progress')
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[var(--color-fg-secondary)]">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="mb-2">Daily Dashboard</h1>
        <p className="text-[var(--color-fg-secondary)]">
          Your opportunity pipeline at a glance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Target className="w-5 h-5" />}
          label="Active Opportunities"
          value={stats.totalOpportunities}
          color="primary"
        />
        <StatCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Total Pipeline Value"
          value={formatCurrency(stats.totalValue)}
          color="success"
        />
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          label="Active Tasks"
          value={stats.activeTasks}
          color="warning"
        />
        <StatCard
          icon={<CheckCircle className="w-5 h-5" />}
          label="Completed Tasks"
          value={stats.completedTasks}
          color="success"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Deadlines */}
        <div className="lg:col-span-2">
          <StratusCard>
            <h3 className="mb-4">Upcoming Deadlines</h3>
            {upcomingDeadlines.length === 0 ? (
              <p className="text-[var(--color-fg-secondary)]">No upcoming deadlines</p>
            ) : (
              <div className="flex flex-col gap-3">
                {upcomingDeadlines.map(opp => (
                  <div
                    key={opp.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)]"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-[var(--color-fg-primary)]">{opp.title}</p>
                      <p className="text-sm text-[var(--color-fg-secondary)]">{opp.agency}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[var(--color-fg-primary)]">
                        {formatDate(opp.deadline)}
                      </p>
                      <StratusBadge variant={getWinnabilityVariant(opp.winnabilityScore)}>
                        {opp.winnabilityScore}% Win
                      </StratusBadge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </StratusCard>
        </div>

        {/* Quick Actions */}
        <div>
          <StratusCard>
            <h3 className="mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <StratusButton variant="primary" fullWidth>
                <TrendingUp className="w-4 h-4" />
                New Opportunity
              </StratusButton>
              <StratusButton variant="secondary" fullWidth>
                Create Task Pack
              </StratusButton>
              <StratusButton variant="secondary" fullWidth>
                Generate Quote
              </StratusButton>
              <StratusButton variant="ghost" fullWidth>
                View All Tasks
              </StratusButton>
            </div>
          </StratusCard>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: 'primary' | 'success' | 'warning';
}) {
  const colorClasses = {
    primary: 'text-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10',
    success: 'text-[var(--color-success)] bg-[var(--color-success)]/10',
    warning: 'text-[var(--color-warning)] bg-[var(--color-warning)]/10',
  };

  return (
    <StratusCard>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-[var(--color-fg-secondary)]">{label}</p>
          <p className="text-2xl font-semibold text-[var(--color-fg-primary)] mt-1">{value}</p>
        </div>
      </div>
    </StratusCard>
  );
}

function getWinnabilityVariant(score: number): 'winnable' | 'moderate' | 'avoid' {
  if (score >= 70) return 'winnable';
  if (score >= 40) return 'moderate';
  return 'avoid';
}
