import { motion } from 'motion/react';

interface VanvitaLogoProps {
  size?: number;
  inverted?: boolean;
  className?: string;
}

/**
 * Custom Vanvita botanical emblem: two graceful morning leaves angling inward
 * and meeting at the base to form an unmistakable, refined "V".
 */
export function VanvitaLogo({
  size = 30,
  inverted = false,
  className = '',
}: VanvitaLogoProps) {
  const leftFill = inverted ? '#B7D7BD' : '#3E6F4E';
  const rightFill = inverted ? '#8FC09B' : '#73A682';
  const veinStroke = inverted ? '#18241C' : '#F7FAF6';

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      whileHover="hover"
      className={`shrink-0 ${className}`}
    >
      {/* Left leaf angled down-right to form left stroke of "V" */}
      <motion.g
        style={{ originX: '18px', originY: '30px' }}
        variants={{
          hover: { rotate: -5, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
        }}
      >
        <path
          d="M17.4 30.2C10.8 25.4 5.8 18.2 5.2 9.4C5.1 7.9 6.5 6.8 7.9 7.3C14.3 9.7 17.7 16.5 18 29.3C18 29.9 17.8 30.5 17.4 30.2Z"
          fill={leftFill}
        />
        <path
          d="M8.6 10.6C11.8 15.1 14.9 21.1 17.3 28.4"
          stroke={veinStroke}
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
      </motion.g>

      {/* Right leaf angled down-left to form right stroke of "V" */}
      <motion.g
        style={{ originX: '18px', originY: '30px' }}
        variants={{
          hover: { rotate: 5, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
        }}
      >
        <path
          d="M18.6 30.2C25.2 25.4 30.2 18.2 30.8 9.4C30.9 7.9 29.5 6.8 28.1 7.3C21.7 9.7 18.3 16.5 18 29.3C18 29.9 18.2 30.5 18.6 30.2Z"
          fill={rightFill}
        />
        <path
          d="M27.4 10.6C24.2 15.1 21.1 21.1 18.7 28.4"
          stroke={veinStroke}
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
      </motion.g>
    </motion.svg>
  );
}
