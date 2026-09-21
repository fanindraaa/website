'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HoprCaseStudy, HoprStatus } from '@/lib/hopr';
import Attachment, { AttachmentType } from './attachments';

export type PaperElevation = 'low' | 'medium' | 'lifted' | 'overlapping';
export type PaperTone = 'ivory' | 'warm-white' | 'newsprint' | 'parchment';

interface PaperCardProps {
  caseStudy: HoprCaseStudy;
  onClick?: (slug: string, e?: React.MouseEvent) => void;
  isSelected?: boolean;
  rotation?: number;
  scale?: number;
  elevation?: PaperElevation;
  paperTone?: PaperTone;
  attachment?: AttachmentType;
  stamp?: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

// Subtle off-white tactile paper tones
const paperToneStyles: Record<PaperTone, { bg: string; border: string; insetEdge: string }> = {
  'ivory': {
    bg: 'bg-[#faf8f4]',
    border: 'border-[#dfd8cc]/80',
    insetEdge: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 0 0 1px rgba(0,0,0,0.035)',
  },
  'warm-white': {
    bg: 'bg-[#fcfaf6]',
    border: 'border-[#ded7cb]/85',
    insetEdge: 'inset 0 1px 0 rgba(255,255,255,0.9), inset 0 0 0 1px rgba(0,0,0,0.04)',
  },
  'newsprint': {
    bg: 'bg-[#f5f2eb]',
    border: 'border-[#d4cbbe]/90',
    insetEdge: 'inset 0 1px 0 rgba(255,255,255,0.65), inset 0 0 0 1px rgba(0,0,0,0.05)',
  },
  'parchment': {
    bg: 'bg-[#f7f3ea]',
    border: 'border-[#d9cfbf]/85',
    insetEdge: 'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 0 0 1px rgba(0,0,0,0.045)',
  },
};

// Subtle, layered physical depth shadows (consistent upper-left illumination falling lower-right)
const elevationShadows: Record<PaperElevation, string> = {
  low: `
    1px 2px 3px rgba(35, 25, 15, 0.12),
    3px 6px 12px -2px rgba(35, 25, 15, 0.14),
    8px 14px 22px -6px rgba(35, 25, 15, 0.09)
  `,
  medium: `
    1px 2px 3px rgba(35, 25, 15, 0.14),
    4px 8px 16px -2px rgba(35, 25, 15, 0.18),
    12px 20px 30px -8px rgba(35, 25, 15, 0.12)
  `,
  lifted: `
    2px 3px 4px rgba(35, 25, 15, 0.16),
    6px 12px 22px -3px rgba(35, 25, 15, 0.22),
    16px 28px 40px -8px rgba(35, 25, 15, 0.15)
  `,
  overlapping: `
    2px 3px 4px rgba(35, 25, 15, 0.18),
    6px 12px 24px -2px rgba(35, 25, 15, 0.24),
    16px 30px 42px -6px rgba(35, 25, 15, 0.16)
  `,
};

// Hover shadow (picking up the paper)
const hoverShadow = `
  2px 4px 6px rgba(35, 25, 15, 0.18),
  8px 18px 32px -4px rgba(35, 25, 15, 0.26),
  22px 38px 52px -10px rgba(35, 25, 15, 0.18)
`;

export default function PaperCard({
  caseStudy,
  onClick,
  isSelected = false,
  rotation = 0,
  scale = 1,
  elevation = 'medium',
  paperTone = 'ivory',
  attachment = 'pin-brass',
  stamp,
  className = '',
  style = {},
  priority = false,
}: PaperCardProps) {
  const tone = paperToneStyles[paperTone] || paperToneStyles.ivory;
  const initialShadow = elevationShadows[elevation] || elevationShadows.medium;

  return (
    <Link
      href={`/hopr/${caseStudy.slug}`}
      scroll={false}
      onClick={(e) => {
        if (onClick) {
          onClick(caseStudy.slug, e);
        }
      }}
      style={{
        ...style,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        boxShadow: initialShadow,
      }}
      className={`group relative flex flex-col w-full cursor-pointer rounded-[4px] border ${tone.border} ${tone.bg} p-4 sm:p-5 text-left text-sand-12 no-underline transition-all duration-300 ease-out hover:-translate-y-2 hover:rotate-0 hover:scale-[1.015] hover:z-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-12 select-none ${
        isSelected ? 'ring-2 ring-sand-12 z-30' : ''
      } ${className}`}
      aria-label={`Inspect design artifact: ${caseStudy.title} (${caseStudy.status})`}
    >
      {/* Paper micro-texture & crisp physical trim edge */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[3px]"
        style={{
          boxShadow: tone.insetEdge,
        }}
      />

      {/* Physical Attachment (pushpin, masking tape, binder clip) */}
      <Attachment type={attachment} />

      {/* Printed Plate Cover Image */}
      <div className="relative mb-3.5 aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-[#ebe6dc] border border-black/[0.07]">
        <Image
          src={caseStudy.cover}
          alt={caseStudy.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
          priority={priority}
          className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] ${
            caseStudy.status === 'graveyard' ? 'grayscale-[25%] contrast-[92%]' : ''
          }`}
        />

        {/* Studio Red Stamp for Graveyard / Shelved Artifacts */}
        {(stamp || caseStudy.status === 'graveyard') && (
          <div
            className="pointer-events-none absolute bottom-2.5 right-2.5 select-none rounded-[2px] border-[1.5px] border-[#992222]/85 bg-[#992222]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#8b1e1e] backdrop-blur-[0.5px]"
            style={{
              transform: 'rotate(-4deg)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            {stamp || 'ARCHIVED STUDY'}
          </div>
        )}
      </div>

      {/* Editorial Header Strip (Understated, non-SaaS) */}
      <div className="flex items-baseline justify-between gap-2 mb-1.5 border-b border-black/[0.06] pb-1.5">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              caseStudy.status === 'shipped'
                ? 'bg-[#15803d]'
                : caseStudy.status === 'not_shipped'
                ? 'bg-[#b45309]'
                : 'bg-[#52525b]'
            }`}
          />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-sand-10">
            {caseStudy.status === 'shipped'
              ? 'Production'
              : caseStudy.status === 'not_shipped'
              ? 'Pilot Evaluation'
              : 'Graveyard Concept'}
          </span>
        </div>

        {caseStudy.timeline && (
          <span className="text-[11px] font-medium text-sand-9 font-mono tracking-tight">
            {caseStudy.timeline.start === caseStudy.timeline.end
              ? caseStudy.timeline.start
              : `${caseStudy.timeline.start}–${caseStudy.timeline.end}`}
          </span>
        )}
      </div>

      {/* Artifact Title */}
      <h3 className="font-bold text-[16px] sm:text-[17px] text-sand-12 leading-snug tracking-tight mb-1.5 group-hover:text-black">
        {caseStudy.title}
      </h3>

      {/* Description / Summary */}
      <p className="text-[13px] leading-relaxed text-sand-11 line-clamp-3 mb-3.5 flex-1 font-normal">
        {caseStudy.description}
      </p>

      {/* Paper Footnote / Metadata */}
      <div className="mt-auto pt-2 border-t border-black/[0.05] flex items-center justify-between text-[11.5px] text-sand-10">
        <span className="truncate max-w-[210px] font-medium text-sand-9">
          {caseStudy.category || 'Product Architecture'}
        </span>
        <span className="font-semibold text-sand-11 opacity-75 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5">
          Inspect →
        </span>
      </div>
    </Link>
  );
}
