import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const WELLNESS_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
}

export function RevealOnScroll({
  children,
  delay = 0,
  distance = 20,
  className = '',
}: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: prefersReducedMotion ? 0.3 : 0.95,
        delay: prefersReducedMotion ? 0 : delay,
        ease: WELLNESS_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SectionEntranceProps {
  id?: string;
  children: ReactNode;
  className?: string;
  immediate?: boolean;
  delay?: number;
}

/**
 * Subtle, slow fade-in and slide-up entrance wrapper for primary page sections.
 */
export function SectionEntrance({
  id,
  children,
  className = '',
  immediate = false,
  delay = 0,
}: SectionEntranceProps) {
  const prefersReducedMotion = useReducedMotion();
  const initialState = { opacity: 0, y: prefersReducedMotion ? 0 : 24 };
  const visibleState = { opacity: 1, y: 0 };
  const transition = {
    duration: prefersReducedMotion ? 0.3 : 1.05,
    delay: prefersReducedMotion ? 0 : delay,
    ease: WELLNESS_EASE,
  };

  if (immediate) {
    return (
      <motion.section
        id={id}
        initial={initialState}
        animate={visibleState}
        transition={transition}
        className={className}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      id={id}
      initial={initialState}
      whileInView={visibleState}
      viewport={{ once: true, amount: 0.06 }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.section>
  );
}

