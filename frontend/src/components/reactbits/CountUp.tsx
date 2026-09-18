import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 1.2,
  separator = '.',
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const [current, setCurrent] = useState(from);
  const startTimeRef = useRef<number | null>(null);
  const startValRef = useRef(from);
  const endValRef = useRef(to);

  useEffect(() => {
    startValRef.current = current;
    endValRef.current = to;
    startTimeRef.current = null;

    let rafId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / (duration * 1000), 1);
      const eased = easeOutExpo(progress);

      const nextVal = startValRef.current + (endValRef.current - startValRef.current) * eased;
      setCurrent(nextVal);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCurrent(endValRef.current);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [to, duration]);

  const formatNumber = (val: number) => {
    const fixed = val.toFixed(decimals);
    const [intPart, decPart] = fixed.split('.');
    const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return decPart ? `${withSep},${decPart}` : withSep;
  };

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      {formatNumber(current)}
      {suffix}
    </span>
  );
};
