interface StratusButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export function StratusButton({ 
  variant = 'primary', 
  children, 
  onClick,
  className = '',
  fullWidth = false,
  disabled = false,
  type
}: StratusButtonProps) {
  const baseStyles = "px-6 h-[var(--button-height)] rounded-[var(--radius-m)] transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "bg-[var(--color-accent-primary)] text-[var(--color-fg-inverse)] hover:bg-[var(--color-accent-primary-hover)] active:scale-[0.98]",
    secondary: "border-2 border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] bg-[var(--color-bg-primary)] hover:bg-[var(--color-bg-secondary)] active:scale-[0.98]",
    ghost: "text-[var(--color-accent-primary)] bg-transparent hover:bg-[var(--color-bg-secondary)] active:scale-[0.98]"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
    >
      {children}
    </button>
  );
}
