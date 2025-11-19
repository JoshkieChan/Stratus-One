interface StratusLogoProps {
  variant?: 'loop' | 'layers' | 'snode' | 'lightning';
  size?: number;
}

export function StratusLogo({ variant = 'loop', size = 40 }: StratusLogoProps) {
  if (variant === 'loop') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path
          d="M20 4C11.163 4 4 11.163 4 20C4 28.837 11.163 36 20 36"
          stroke="#0057FF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M20 36C28.837 36 36 28.837 36 20C36 11.163 28.837 4 20 4"
          stroke="#35CFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (variant === 'layers') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x="8"
            y={8 + i * 4}
            width="24"
            height="3"
            rx="1.5"
            fill={i < 2 ? '#0057FF' : i < 4 ? '#35CFFF' : '#01204A'}
            opacity={1 - i * 0.1}
          />
        ))}
      </svg>
    );
  }

  if (variant === 'snode') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path
          d="M12 10C12 10 18 10 22 16C26 22 28 28 28 28M12 30C12 30 14 24 18 18C22 12 28 12 28 12"
          stroke="#0057FF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="12" cy="10" r="3" fill="#0057FF" />
        <circle cx="28" cy="12" r="3" fill="#35CFFF" />
        <circle cx="12" cy="30" r="3" fill="#35CFFF" />
        <circle cx="28" cy="28" r="3" fill="#0057FF" />
      </svg>
    );
  }

  if (variant === 'lightning') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path
          d="M12 10C12 10 16 10 20 16M20 16C24 22 28 30 28 30M20 16L24 8"
          stroke="#0057FF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return null;
}
