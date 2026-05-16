import React from 'react';
import { motion } from 'framer-motion';

interface TypingEffectProps {
  text: string;
  className?: string;
  prefix?: string;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({ text, className, prefix }) => {
  const characters = text.split("");

  return (
    <div className={className} style={{ fontFamily: 'monospace', letterSpacing: '0.1em' }}>
      {prefix && <span style={{ opacity: 0.6 }}>{prefix}</span>}
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.05,
            delay: index * 0.05,
            ease: "easeInOut",
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{
          display: 'inline-block',
          width: '8px',
          height: '1em',
          background: 'currentColor',
          marginLeft: '4px',
          verticalAlign: 'middle'
        }}
      />
    </div>
  );
};
