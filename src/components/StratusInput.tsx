import { useId } from 'react';

interface StratusInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  label?: string;
}

export function StratusInput({
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
  label,
  id,
  ...props
}: StratusInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm text-[var(--color-fg-primary)]">{label}</label>
      )}
      <input
        {...props}
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-[var(--input-height)] w-full px-4 rounded-[var(--radius-m)] border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] text-[var(--color-fg-primary)] placeholder:text-[var(--color-fg-tertiary)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-2 focus:ring-[var(--color-accent-primary)]/20 transition-all"
      />
    </div>
  );
}
