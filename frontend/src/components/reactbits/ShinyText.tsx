import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 3,
  className = '',
}) => {
  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-neutral-600 via-neutral-950 to-neutral-600 animate-shine ${className}`}
      style={{
        backgroundSize: '200% 100%',
        animation: `shine ${speed}s linear infinite`,
      }}
    >
      {text}
    </span>
  );
};
