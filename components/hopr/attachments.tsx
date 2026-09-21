import React from 'react';

export type AttachmentType =
  | 'pin-brass'
  | 'pin-steel'
  | 'pin-dark'
  | 'pin-terracotta'
  | 'pin-forest'
  | 'tape-top'
  | 'tape-double'
  | 'tape-corner'
  | 'clip-top'
  | 'dual-pin-brass';

interface AttachmentProps {
  type?: AttachmentType;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Realistic physical attachments for studio artifacts.
 * Designed with a consistent light source from the UPPER-LEFT (10:30 angle),
 * casting tight contact shadows and subtle diffused ambient drop shadows to the LOWER-RIGHT.
 */
export function StudioPushpin({
  color = 'brass',
  className = '',
  style = {},
}: {
  color?: 'brass' | 'steel' | 'dark' | 'terracotta' | 'forest';
  className?: string;
  style?: React.CSSProperties;
}) {
  const pinThemes = {
    brass: {
      body: '#b5832a',
      highlight: '#fce38a',
      rim: '#7a5412',
      innerShadow: '#8f651c',
      needle: '#8a8a8a',
    },
    steel: {
      body: '#717882',
      highlight: '#e2e8f0',
      rim: '#475569',
      innerShadow: '#334155',
      needle: '#94a3b8',
    },
    dark: {
      body: '#2d3139',
      highlight: '#64748b',
      rim: '#181b20',
      innerShadow: '#0f1115',
      needle: '#475569',
    },
    terracotta: {
      body: '#b3473b',
      highlight: '#fca5a5',
      rim: '#7f1d1d',
      innerShadow: '#991b1b',
      needle: '#64748b',
    },
    forest: {
      body: '#2b5341',
      highlight: '#86efac',
      rim: '#143324',
      innerShadow: '#1c3d2f',
      needle: '#64748b',
    },
  };

  const theme = pinThemes[color] || pinThemes.brass;

  return (
    <div
      className={`pointer-events-none absolute z-30 select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg
        width="24"
        height="26"
        viewBox="0 0 24 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible filter drop-shadow-[1.5px_2.5px_2px_rgba(25,15,5,0.28)]"
      >
        {/* Soft contact shadow on cork/paper below */}
        <ellipse cx="14" cy="22" rx="6" ry="2.2" fill="rgba(20,12,5,0.26)" />
        <ellipse cx="13" cy="21.5" rx="3.5" ry="1.2" fill="rgba(10,5,2,0.35)" />

        {/* Needle shaft entry point */}
        <line
          x1="12"
          y1="13"
          x2="13.2"
          y2="21"
          stroke={theme.needle}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="12.6"
          y1="13.5"
          x2="13.6"
          y2="20.5"
          stroke="#2d2a26"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Pin base taper collar */}
        <ellipse cx="12" cy="13.5" rx="3.5" ry="1.4" fill={theme.rim} />
        <ellipse cx="12" cy="13" rx="3" ry="1.1" fill={theme.body} />

        {/* Pin cylindrical head */}
        <circle cx="12" cy="8.5" r="5.6" fill={theme.body} />
        {/* Subtle 3D volumetric shading: darker bottom-right */}
        <circle
          cx="12"
          cy="8.5"
          r="5.4"
          fill="none"
          stroke={theme.innerShadow}
          strokeWidth="1.2"
          opacity="0.8"
        />
        {/* Upper-left soft highlight curve */}
        <ellipse
          cx="10.2"
          cy="6.8"
          rx="2.2"
          ry="1.4"
          transform="rotate(-25 10.2 6.8)"
          fill={theme.highlight}
          opacity="0.9"
        />
        {/* Needle center pin dot */}
        <circle cx="12" cy="8.5" r="1.1" fill="rgba(255,255,255,0.4)" />
      </svg>
    </div>
  );
}

/**
 * Realistic Studio Masking Tape strip.
 * Features translucent off-white parchment look with slightly torn/feathered cut edges
 * and upper-left light contact shadow.
 */
export function StudioMaskingTape({
  className = '',
  width = 90,
  rotation = 0,
  style = {},
}: {
  className?: string;
  width?: number;
  rotation?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-30 select-none ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        ...style,
      }}
      aria-hidden="true"
    >
      <div
        className="relative"
        style={{
          width: `${width}px`,
          height: '24px',
          backgroundColor: 'rgba(244, 237, 218, 0.72)',
          boxShadow: `
            1px 2px 4px -1px rgba(50, 35, 20, 0.16),
            0 1px 1px rgba(40, 25, 10, 0.08),
            inset 0 1px 1px rgba(255, 255, 255, 0.6),
            inset 0 -1px 1px rgba(120, 100, 70, 0.15)
          `,
          backdropFilter: 'blur(0.5px)',
          clipPath:
            'polygon(0% 12%, 3% 4%, 97% 6%, 100% 16%, 98% 88%, 95% 96%, 4% 92%, 0% 84%)',
          borderLeft: '1px dashed rgba(180, 160, 130, 0.45)',
          borderRight: '1px dashed rgba(180, 160, 130, 0.45)',
        }}
      >
        {/* Internal faint fibrous grain overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(140, 115, 75, 0.15) 2px,
              rgba(140, 115, 75, 0.15) 4px
            )`,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Realistic Studio Steel Binder Clip attached at top edge.
 */
export function StudioBinderClip({
  className = '',
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-30 select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg
        width="34"
        height="32"
        viewBox="0 0 34 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible filter drop-shadow-[2px_3px_2.5px_rgba(20,15,10,0.3)]"
      >
        {/* Contact shadow */}
        <ellipse cx="17" cy="27" rx="10" ry="3" fill="rgba(20,10,5,0.22)" />

        {/* Silver wire arms folded back */}
        <path
          d="M 12 18 L 12 5 Q 12 2 17 2 Q 22 2 22 5 L 22 18"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 12.4 18 L 12.4 5.2 Q 12.4 2.6 17 2.6 Q 21.6 2.6 21.6 5.2 L 21.6 18"
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Black steel clamp body */}
        <rect
          x="7"
          y="15"
          width="20"
          height="12"
          rx="2"
          fill="#23272e"
        />
        {/* Clamp top edge highlight */}
        <line
          x1="8"
          y1="16"
          x2="26"
          y2="16"
          stroke="#64748b"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Clamp bottom lip bevel */}
        <path
          d="M 7 24 L 27 24 L 25.5 27 L 8.5 27 Z"
          fill="#17191d"
        />
      </svg>
    </div>
  );
}

/**
 * Composite Attachment Dispatcher
 */
export default function Attachment({ type = 'pin-brass', className = '', style = {} }: AttachmentProps) {
  switch (type) {
    case 'pin-brass':
      return (
        <StudioPushpin
          color="brass"
          className={`-top-3.5 left-1/2 -translate-x-1/2 ${className}`}
          style={style}
        />
      );
    case 'pin-steel':
      return (
        <StudioPushpin
          color="steel"
          className={`-top-3.5 left-1/2 -translate-x-1/2 ${className}`}
          style={style}
        />
      );
    case 'pin-dark':
      return (
        <StudioPushpin
          color="dark"
          className={`-top-3.5 left-1/2 -translate-x-1/2 ${className}`}
          style={style}
        />
      );
    case 'pin-terracotta':
      return (
        <StudioPushpin
          color="terracotta"
          className={`-top-3.5 left-1/2 -translate-x-1/2 ${className}`}
          style={style}
        />
      );
    case 'pin-forest':
      return (
        <StudioPushpin
          color="forest"
          className={`-top-3.5 left-1/2 -translate-x-1/2 ${className}`}
          style={style}
        />
      );
    case 'dual-pin-brass':
      return (
        <>
          <StudioPushpin
            color="brass"
            className={`-top-3.5 left-8 ${className}`}
            style={style}
          />
          <StudioPushpin
            color="brass"
            className={`-top-3.5 right-8 ${className}`}
            style={style}
          />
        </>
      );
    case 'tape-top':
      return (
        <StudioMaskingTape
          width={88}
          rotation={-1.5}
          className={`-top-3 left-1/2 -translate-x-1/2 ${className}`}
          style={style}
        />
      );
    case 'tape-double':
      return (
        <>
          <StudioMaskingTape
            width={64}
            rotation={-4}
            className={`-top-2.5 left-6 ${className}`}
            style={style}
          />
          <StudioMaskingTape
            width={64}
            rotation={3.5}
            className={`-top-2.5 right-6 ${className}`}
            style={style}
          />
        </>
      );
    case 'tape-corner':
      return (
        <StudioMaskingTape
          width={68}
          rotation={-35}
          className={`-top-2 -left-3 ${className}`}
          style={style}
        />
      );
    case 'clip-top':
      return (
        <StudioBinderClip
          className={`-top-4 left-1/2 -translate-x-1/2 ${className}`}
          style={style}
        />
      );
    default:
      return null;
  }
}
