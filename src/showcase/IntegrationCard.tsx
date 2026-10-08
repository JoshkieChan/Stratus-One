import { StratusButton } from '../components/StratusButton';
import { StratusCard } from '../components/StratusCard';

export function IntegrationCard({ name, status, icon }: { name: string; status: string; icon: string }) {
  const isConnected = status === 'Connected';
  
  return (
    <StratusCard className={isConnected ? 'border-2 border-[#27AE60]' : ''}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="mb-1">{name}</p>
            <p className="text-sm text-[#6A6D72]">{status}</p>
          </div>
        </div>
        <StratusButton variant={isConnected ? 'ghost' : 'secondary'}>
          {isConnected ? 'Disconnect' : 'Connect'}
        </StratusButton>
      </div>
    </StratusCard>
  );
}
