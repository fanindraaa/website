'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HoprCaseStudy, HoprStatus } from '@/lib/hopr';
import MDXRenderer from '@/lib/mdx';

interface CaseStudySidebarProps {
  caseStudy: HoprCaseStudy;
  allCaseStudies?: HoprCaseStudy[];
  onClose?: () => void;
}

const statusConfig: Record<
  HoprStatus,
  { label: string; bg: string; text: string; border: string; dot: string; description: string }
> = {
  shipped: {
    label: 'Shipped',
    bg: 'bg-[#85FFB3]/20',
    text: 'text-[#005224]',
    border: 'border-[#85FFB3]/70',
    dot: 'bg-[#008f3f]',
    description: 'Live in production with active users',
  },
  not_shipped: {
    label: 'Not shipped',
    bg: 'bg-amber-100/70',
    text: 'text-amber-900',
    border: 'border-amber-300',
    dot: 'bg-amber-500',
    description: 'In testing & regulatory evaluation',
  },
  graveyard: {
    label: 'Graveyard Concept',
    bg: 'bg-sand-4/90',
    text: 'text-sand-11',
    border: 'border-sand-6',
    dot: 'bg-sand-9',
    description: 'Shelved exploration & key research learning',
  },
};

export default function CaseStudySidebar({
  caseStudy,
  allCaseStudies = [],
  onClose,
}: CaseStudySidebarProps) {
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const status = statusConfig[caseStudy.status] || statusConfig.shipped;

  // Handle Close action
  const handleClose = React.useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.push('/hopr', { scroll: false });
    }
  }, [onClose, router]);

  // Keyboard navigation: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  // Lock body scroll while sidebar is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Compute next & previous case studies for editorial continuity
  const currentIndex = allCaseStudies.findIndex((item) => item.slug === caseStudy.slug);
  const prevStudy = currentIndex > 0 ? allCaseStudies[currentIndex - 1] : null;
  const nextStudy =
    currentIndex !== -1 && currentIndex < allCaseStudies.length - 1
      ? allCaseStudies[currentIndex + 1]
      : null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      {/* 25% Darkened / Translucent Backdrop over the Cork Board */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-[2.5px] transition-opacity duration-300 ease-out animate-fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* 65vw Editorial Case Study Panel */}
      <aside
        ref={sidebarRef}
        className="relative z-10 flex h-full w-full flex-col bg-[#fdfdfc] text-sand-12 shadow-2xl transition-transform duration-300 ease-out lg:w-[65vw] focus:outline-none animate-in slide-in-from-right select-text"
        tabIndex={-1}
      >
        {/* Sticky Editorial Top Header Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-sand-4/80 bg-[#fdfdfc]/95 px-6 py-4 backdrop-blur-md">
          {/* Breadcrumb / Project Identifier */}
          <div className="flex items-center gap-2 text-[13px] text-sand-10">
            <button
              type="button"
              onClick={handleClose}
              className="font-medium hover:text-sand-12 transition-colors inline-flex items-center gap-1"
            >
              <span>Hopr Studio Board</span>
            </button>
            <span>/</span>
            <span className="font-semibold text-sand-12 truncate max-w-[240px] sm:max-w-[360px]">
              {caseStudy.title}
            </span>
          </div>

          {/* Close Action Button */}
          <div className="flex items-center gap-3">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-1.5 rounded-full border border-sand-4 bg-sand-2/90 px-3.5 py-1.5 text-[13px] font-semibold text-sand-12 shadow-sm transition-all duration-150 hover:bg-sand-3 hover:border-sand-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-12"
              aria-label="Close case study panel"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="2" x2="12" y2="12" />
                <line x1="12" y1="2" x2="2" y2="12" />
              </svg>
              <span>Close</span>
              <kbd className="hidden sm:inline-block rounded bg-sand-4 px-1 py-0.2 text-[10px] text-sand-10 ml-0.5">
                Esc
              </kbd>
            </button>
          </div>
        </header>

        {/* Vertically Scrollable Editorial Document Body with 24px (p-6) padding and full width text */}
        <div className="flex-1 overflow-y-auto p-6 select-text">
          <div className="w-full select-text">
            {/* Hero Cover Image */}
            <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-sand-4/80 bg-sand-2 shadow-sm">
              <Image
                src={caseStudy.cover}
                alt={caseStudy.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 75vw"
                className={`object-cover ${
                  caseStudy.status === 'graveyard' ? 'grayscale-[15%]' : ''
                }`}
              />
            </div>

            {/* Metadata Badges & Category */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12.5px] font-bold ${status.bg} ${status.text} ${status.border}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  <span>{status.label}</span>
                </span>
                <span className="text-[13px] text-sand-10">
                  {status.description}
                </span>
              </div>

              {caseStudy.timeline && (
                <div className="rounded-full bg-sand-2 border border-sand-4 px-3 py-1 text-[12.5px] text-sand-11 font-medium">
                  {caseStudy.timeline.start === caseStudy.timeline.end
                    ? caseStudy.timeline.start
                    : `${caseStudy.timeline.start} – ${caseStudy.timeline.end}`}
                </div>
              )}
            </div>

            {/* Editorial Title */}
            <h1
              id="case-study-title"
              className="text-[28px] sm:text-[34px] md:text-[38px] font-extrabold text-sand-12 leading-tight tracking-tight mt-3 mb-4"
            >
              {caseStudy.title}
            </h1>

            {/* Executive Summary / Description */}
            <p className="text-[16px] text-sand-11 mb-8">
              {caseStudy.description}
            </p>

            {/* Metadata Attribute Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-sand-4/80 py-4 my-8 text-[14px]">
              <div>
                <span className="block text-[12px] font-bold uppercase tracking-wider text-sand-9 mb-1">
                  Product
                </span>
                <span className="font-semibold text-sand-12">Hopr Carpool</span>
              </div>
              <div>
                <span className="block text-[12px] font-bold uppercase tracking-wider text-sand-9 mb-1">
                  Focus Area
                </span>
                <span className="font-semibold text-sand-12">
                  {caseStudy.category || 'Product Design'}
                </span>
              </div>
              <div>
                <span className="block text-[12px] font-bold uppercase tracking-wider text-sand-9 mb-1">
                  Role
                </span>
                <span className="font-semibold text-sand-12">Associate Product Designer</span>
              </div>
            </div>

            {/* MDX Rich Case Study Content */}
            <section className="case-study-content my-8">
              <MDXRenderer content={caseStudy.content} />
            </section>

            {/* Impact Section */}
            {caseStudy.impact && caseStudy.impact.length > 0 && (
              <section className="my-12 rounded-2xl border border-sand-4/90 bg-sand-2/60 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#85FFB3]" />
                  <h2 className="text-[18px] sm:text-[20px] font-bold text-sand-12 m-0">
                    Impact & Outcomes
                  </h2>
                </div>
                <ul className="space-y-3 pl-5 list-disc text-[15px] text-sand-11">
                  {caseStudy.impact.map((statement, idx) => (
                    <li key={idx} className="leading-relaxed font-medium">
                      {statement}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Bottom Prev / Next Navigation Strip */}
            <nav className="border-t border-sand-4/80 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pb-12">
              {prevStudy ? (
                <button
                  type="button"
                  onClick={() => router.push(`/hopr/${prevStudy.slug}`, { scroll: false })}
                  className="group flex flex-col items-start text-left w-full sm:w-auto p-3 rounded-xl border border-sand-4 hover:border-sand-6 hover:bg-sand-2 transition-all"
                >
                  <span className="text-[12px] text-sand-9 font-semibold">← Previous Artifact</span>
                  <span className="text-[14px] font-bold text-sand-12 group-hover:text-black">
                    {prevStudy.title}
                  </span>
                </button>
              ) : (
                <div />
              )}

              {nextStudy && (
                <button
                  type="button"
                  onClick={() => router.push(`/hopr/${nextStudy.slug}`, { scroll: false })}
                  className="group flex flex-col items-end text-right w-full sm:w-auto p-3 rounded-xl border border-sand-4 hover:border-sand-6 hover:bg-sand-2 transition-all"
                >
                  <span className="text-[12px] text-sand-9 font-semibold">Next Artifact →</span>
                  <span className="text-[14px] font-bold text-sand-12 group-hover:text-black">
                    {nextStudy.title}
                  </span>
                </button>
              )}
            </nav>
          </div>
        </div>
      </aside>
    </div>
  );
}
