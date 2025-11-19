interface StratusBadgeProps {
  variant: 'winnable' | 'moderate' | 'avoid' | 'info';
  children: React.ReactNode;
  className?: string;
}

export function StratusBadge({ variant, children, className = "" }: StratusBadgeProps) {
  const variantStyles = {
    winnable: "bg-[var(--color-success)] text-white",
    moderate: "bg-[var(--color-warning)] text-white",
    avoid: "bg-[var(--color-danger)] text-white",
    info: "bg-[var(--color-information)] text-white"
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm whitespace-nowrap ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
