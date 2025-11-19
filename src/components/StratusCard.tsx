interface StratusCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function StratusCard({ children, className = "", onClick }: StratusCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-[var(--color-bg-card)] rounded-[var(--radius-l)] p-5 border border-[var(--color-border-default)] transition-all duration-200 ${className} ${
        onClick 
          ? 'cursor-pointer hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-accent-primary)]' 
          : 'shadow-[var(--shadow-card)]'
      }`}
      style={{
        boxShadow: onClick ? undefined : 'var(--shadow-card)'
      }}
    >
      {children}
    </div>
  );
}
