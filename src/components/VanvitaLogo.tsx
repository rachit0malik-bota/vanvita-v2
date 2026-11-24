import { motion } from 'motion/react';

interface VanvitaLogoProps {
  size?: number;
  inverted?: boolean;
  showWordmark?: boolean;
  className?: string;
}

/**
 * Vanvita Emblem & Signature Brand Identity:
 * Features the signature stylized V with Fibonacci nautilus shell spiral in
 * Burgundy, Rose, and Chocolate (#51372E, #752D43, #DC7188).
 */
export function VanvitaLogo({
  size = 32,
  inverted = false,
  showWordmark = false,
  className = '',
}: VanvitaLogoProps) {
  if (showWordmark) {
    return (
      <img
        src="/vanvita-logo-full.png"
        alt="VANVITA"
        style={{ height: size, width: 'auto' }}
        className={`object-contain shrink-0 ${className}`}
      />
    );
  }

  return (
    <motion.img
      src={inverted ? '/vanvita-emblem-light.png' : '/vanvita-emblem.png'}
      alt="Vanvita Emblem"
      style={{ height: size, width: 'auto' }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`object-contain shrink-0 ${className}`}
    />
  );
}
