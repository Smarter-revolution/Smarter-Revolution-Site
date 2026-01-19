'use client';

import { useId } from 'react';

interface GridPatternProps {
  className?: string;
  width?: number;
  height?: number;
  strokeDasharray?: string;
  squares?: [number, number][];
}

export default function GridPattern({
  className = '',
  width = 40,
  height = 40,
  strokeDasharray = '0',
  squares = [],
}: GridPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full fill-red-600/5 stroke-white/5 ${className}`}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      {squares.length > 0 && (
        <svg className="overflow-visible">
          {squares.map(([x, y], index) => (
            <rect
              key={`${x}-${y}-${index}`}
              width={width - 1}
              height={height - 1}
              x={x * width + 1}
              y={y * height + 1}
              className="fill-red-600/10"
              strokeWidth="0"
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
