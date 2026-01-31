'use client';

interface PlaceholderImageProps {
  alt: string;
  width?: string;
  height?: string;
}

export default function PlaceholderImage({ alt, width = '100%', height = '100%' }: PlaceholderImageProps) {
  return (
    <div
      style={{
        width,
        height,
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 30%, rgba(229, 57, 53, 0.15), transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Icon */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ color: 'rgba(229, 57, 53, 0.3)', position: 'relative', zIndex: 1 }}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>

      {/* Alt text */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px',
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: '0.75rem',
          textAlign: 'center',
          zIndex: 1
        }}
      >
        {alt}
      </div>
    </div>
  );
}
