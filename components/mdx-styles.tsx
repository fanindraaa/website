'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import LightboxModal from '@/components/lightbox-modal';

/**
 * Centralized design tokens and class definitions for MDX content.
 * Edit these styles to update the visual appearance of all MDX case studies across the site.
 */
export const mdxStyles = {
  // Container & Document Flow
  container: 'w-full text-sand-12 font-medium leading-relaxed select-text',
  section: 'my-6',

  // Typography Headings
  h1: 'mt-10 mb-4 text-[26px] sm:text-[30px] font-extrabold text-sand-12 leading-tight tracking-tight',
  h2: 'mt-10 mb-3.5 text-[20px] sm:text-[23px] font-bold text-sand-12 leading-tight tracking-tight border-t border-sand-4/60 pt-8 first:border-0 first:pt-0',
  h3: 'mt-7 mb-2.5 text-[17px] sm:text-[18.5px] font-bold text-sand-12 leading-snug',
  h4: 'mt-5 mb-2 text-[15px] font-bold text-sand-12 uppercase tracking-wide',

  // Text Elements
  p: 'my-4 text-[15px] sm:text-[15.5px] leading-[1.7] text-sand-11',
  lead: 'my-5 text-[17px] sm:text-[18px] leading-[1.65] text-sand-12 font-medium',
  strong: 'font-bold text-sand-12',
  em: 'italic text-sand-11',

  // Links
  a: 'text-sand-12 underline decoration-sand-6 underline-offset-2 hover:decoration-sand-12 transition-colors font-medium',

  // Lists
  ul: 'my-4 space-y-2 pl-5 list-disc text-[15px] text-sand-11 marker:text-sand-9',
  ol: 'my-4 space-y-2 pl-5 list-decimal text-[15px] text-sand-11 marker:text-sand-9',
  li: 'leading-relaxed pl-1',

  // Quotes & Callouts
  blockquote: 'my-6 border-l-2 border-sand-6 pl-4 text-[15px] italic text-sand-11 leading-relaxed',
  pullQuote: {
    container: 'my-8 rounded-r-xl border-l-4 border-l-[#85FFB3] bg-sand-2/70 py-4.5 px-6 text-sand-12 shadow-sm',
    text: 'text-[17px] sm:text-[19px] italic font-medium leading-relaxed text-sand-12 m-0',
    footer: 'mt-3 text-[13px] font-semibold text-sand-10',
    role: 'font-medium text-sand-9',
  },

  callout: {
    base: 'my-6 rounded-xl border p-4.5 text-[14.5px] leading-relaxed shadow-sm',
    title: 'font-bold text-[14px] uppercase tracking-wider mb-1.5 opacity-95 flex items-center gap-2',
    info: 'border-blue-200 bg-blue-50/50 text-blue-950',
    warning: 'border-amber-200 bg-amber-50/50 text-amber-950',
    note: 'border-sand-5 bg-sand-2/80 text-sand-12',
    success: 'border-[#85FFB3] bg-[#85FFB3]/10 text-emerald-950',
  },

  // Decisions
  decision: {
    container: 'my-6 rounded-xl border border-sand-4 bg-sand-2/60 p-5 shadow-sm transition-all',
    header: 'flex flex-wrap items-center justify-between gap-2 mb-2.5',
    title: 'text-[16px] font-bold text-sand-12 m-0',
    badge: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-bold border',
    shipped: 'bg-[#85FFB3]/20 text-emerald-900 border-[#85FFB3]/60',
    accepted: 'bg-[#85FFB3]/20 text-emerald-900 border-[#85FFB3]/60',
    iterated: 'bg-amber-100 text-amber-900 border-amber-300',
    graveyard: 'bg-sand-4 text-sand-11 border-sand-6',
    reasonLabel: 'text-[13.5px] font-semibold text-sand-10 mb-2',
    reasonText: 'font-medium text-sand-11',
    body: 'text-[14.5px] text-sand-11 leading-relaxed',
  },

  // Metrics & Stats
  statGrid: {
    container: 'my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5',
    card: 'rounded-xl border border-sand-4/80 bg-sand-2 p-4.5 text-left shadow-sm',
    value: 'text-[28px] font-extrabold tracking-tight text-sand-12 leading-none mb-1.5',
    label: 'text-[13px] text-sand-10 font-medium leading-snug',
  },

  // Media (Images, Videos, Comparisons, Galleries)
  figure: 'my-8 w-full',
  figcaption: 'mt-2.5 text-center text-[13px] text-sand-10 font-medium',
  imageWrapper: 'relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-sand-4/80 bg-sand-2 shadow-sm',
  image: 'object-cover transition-transform duration-500 ease-out',
  videoWrapper: 'overflow-hidden rounded-xl border border-sand-4/80 bg-sand-2 shadow-sm',
  video: 'w-full h-auto max-h-[520px] object-cover',

  // Code & Rules
  inlineCode: 'rounded bg-sand-3 px-1.5 py-0.5 text-[13px] font-mono text-sand-12 border border-sand-4',
  hr: 'my-8 border-t border-sand-4',
} as const;

/* -------------------------------------------------------------
 * Custom MDX Component Wrappers using MDX Styles
 * ----------------------------------------------------------- */

export interface GalleryProps {
  images: string[];
  caption?: string;
}

export function MDXGallery({ images, caption }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <figure className={mdxStyles.figure}>
      <div
        className={`grid gap-3 sm:gap-4 ${
          images.length === 1
            ? 'grid-cols-1'
            : images.length === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-sand-4/80 bg-sand-2 shadow-sm transition-all duration-300 hover:border-sand-7 hover:shadow-md"
            onClick={() => setLightboxIndex(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLightboxIndex(idx);
              }
            }}
          >
            <div className={mdxStyles.imageWrapper}>
              <Image
                src={img}
                alt={caption || `Gallery image ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`${mdxStyles.image} group-hover:scale-[1.03]`}
              />
            </div>
          </div>
        ))}
      </div>
      {caption && <figcaption className={mdxStyles.figcaption}>{caption}</figcaption>}

      {lightboxIndex !== null && (
        <LightboxModal
          isOpen={lightboxIndex !== null}
          items={images}
          currentIndex={lightboxIndex}
          title={caption || 'Gallery view'}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => setLightboxIndex(i)}
        />
      )}
    </figure>
  );
}

export interface VideoProps {
  src: string;
  caption?: string;
  poster?: string;
}

export function MDXVideo({ src, caption, poster }: VideoProps) {
  return (
    <figure className={mdxStyles.figure}>
      <div className={mdxStyles.videoWrapper}>
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          className={mdxStyles.video}
        />
      </div>
      {caption && <figcaption className={mdxStyles.figcaption}>{caption}</figcaption>}
    </figure>
  );
}

export interface QuoteProps {
  text: string;
  author?: string;
  role?: string;
}

export function MDXPullQuote({ text, author, role }: QuoteProps) {
  return (
    <blockquote className={mdxStyles.pullQuote.container}>
      <p className={mdxStyles.pullQuote.text}>&ldquo;{text}&rdquo;</p>
      {(author || role) && (
        <footer className={mdxStyles.pullQuote.footer}>
          — {author}
          {role && <span className={mdxStyles.pullQuote.role}>, {role}</span>}
        </footer>
      )}
    </blockquote>
  );
}

export interface CalloutProps {
  title?: string;
  type?: 'info' | 'warning' | 'note' | 'success';
  children: React.ReactNode;
}

export function MDXCallout({ title, type = 'note', children }: CalloutProps) {
  const typeClass = mdxStyles.callout[type] || mdxStyles.callout.note;

  return (
    <aside className={`${mdxStyles.callout.base} ${typeClass}`}>
      {title && <h4 className={mdxStyles.callout.title}>{title}</h4>}
      <div className="space-y-2">{children}</div>
    </aside>
  );
}

export interface DecisionProps {
  title: string;
  verdict: 'shipped' | 'iterated' | 'graveyard' | 'accepted';
  reason?: string;
  children: React.ReactNode;
}

export function MDXDecision({ title, verdict, reason, children }: DecisionProps) {
  const badgeClass = mdxStyles.decision[verdict] || mdxStyles.decision.shipped;
  const labelMap = {
    shipped: 'Shipped',
    accepted: 'Adopted',
    iterated: 'Iterated',
    graveyard: 'Graveyard',
  };

  return (
    <div className={mdxStyles.decision.container}>
      <div className={mdxStyles.decision.header}>
        <h4 className={mdxStyles.decision.title}>{title}</h4>
        <span className={`${mdxStyles.decision.badge} ${badgeClass}`}>
          {labelMap[verdict] || 'Shipped'}
        </span>
      </div>
      {reason && (
        <p className={mdxStyles.decision.reasonLabel}>
          Rationale: <span className={mdxStyles.decision.reasonText}>{reason}</span>
        </p>
      )}
      <div className={mdxStyles.decision.body}>{children}</div>
    </div>
  );
}

export interface StatGridProps {
  items: Array<{ value: string; label: string; change?: string }>;
}

export function MDXStatGrid({ items }: StatGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={mdxStyles.statGrid.container}>
      {items.map((item, idx) => (
        <div key={idx} className={mdxStyles.statGrid.card}>
          <div className={mdxStyles.statGrid.value}>{item.value}</div>
          <div className={mdxStyles.statGrid.label}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}

export interface ComparisonProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}

export function MDXComparison({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
  caption,
}: ComparisonProps) {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <figure className={mdxStyles.figure}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className="group relative cursor-pointer overflow-hidden rounded-xl border border-sand-4/80 bg-sand-2 shadow-sm"
          onClick={() => setLightboxImg(before)}
        >
          <div className="absolute top-3 left-3 z-10 rounded-md bg-sand-12/80 px-2 py-0.5 text-[11px] font-bold text-sand-1 uppercase tracking-wider backdrop-blur-sm">
            {beforeLabel}
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={before}
              alt={beforeLabel}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        <div
          className="group relative cursor-pointer overflow-hidden rounded-xl border border-sand-4/80 bg-sand-2 shadow-sm"
          onClick={() => setLightboxImg(after)}
        >
          <div className="absolute top-3 left-3 z-10 rounded-md bg-[#00662d] px-2 py-0.5 text-[11px] font-bold text-[#85FFB3] uppercase tracking-wider backdrop-blur-sm">
            {afterLabel}
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={after}
              alt={afterLabel}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
      {caption && <figcaption className={mdxStyles.figcaption}>{caption}</figcaption>}

      {lightboxImg && (
        <LightboxModal
          isOpen={true}
          items={[lightboxImg]}
          currentIndex={0}
          title={caption || 'Comparison'}
          onClose={() => setLightboxImg(null)}
          onNavigate={() => {}}
        />
      )}
    </figure>
  );
}

export interface PrototypeProps {
  title?: string;
  url?: string;
  caption?: string;
}

export function MDXPrototype({ title, url, caption }: PrototypeProps) {
  return (
    <div className="my-8 rounded-xl border border-sand-4 bg-sand-2/80 p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h4 className="text-[15px] font-bold text-sand-12 m-0 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#85FFB3] animate-pulse" />
          {title || 'Interactive Prototype'}
        </h4>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-sand-12 hover:underline"
          >
            <span>Open standalone</span>
            <span>↗</span>
          </a>
        )}
      </div>
      <p className="text-[13.5px] text-sand-10 mb-0">
        {caption || 'Prototype preview demonstrated during usability testing sessions.'}
      </p>
    </div>
  );
}

/**
 * Root wrapper component that applies all base MDX styling
 */
export function MDXStylesWrapper({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${mdxStyles.container} ${className}`}>
      {children}
    </div>
  );
}

export default mdxStyles;
