import { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  loading = 'lazy',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EBF3EA] via-[#E1ECE0] to-[#CFE1CF] text-[#526458] p-8 text-center ${className}`}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          aria-hidden="true"
          className="mb-3 text-[#3E6F4E] opacity-80"
        >
          <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="1.2" />
          <path d="M18 9C14 14 14 22 18 27C22 22 22 14 18 9Z" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span className="text-lg font-medium tracking-tight text-[#18241C]">
          {fallbackTitle || 'Vanvita Sanctuary'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
