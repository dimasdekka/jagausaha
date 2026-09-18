import React from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 0.05,
  className = '',
  animateBy = 'words',
  direction = 'top',
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          initial={{
            filter: 'blur(10px)',
            opacity: 0,
            y: direction === 'top' ? -18 : 18,
          }}
          animate={{
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: i * delay,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="inline-block"
        >
          {el}&nbsp;
        </motion.span>
      ))}
    </span>
  );
};
