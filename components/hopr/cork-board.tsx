'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { HoprCaseStudy } from '@/lib/hopr';
import PaperCard from './paper-card';
import HoprLikeButton from './like-button';

interface CorkBoardProps {
  caseStudies: HoprCaseStudy[];
  activeSlug?: string | null;
}

const CANVAS_WIDTH = 3200;
const CANVAS_HEIGHT = 2200;
const CENTER_X = 1600;
const CENTER_Y = 1100;

export default function CorkBoard({ caseStudies, activeSlug: propActiveSlug }: CorkBoardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasCentered, setHasCentered] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isPointerDownRef = useRef(false);
  const startPointerRef = useRef({ x: 0, y: 0 });
  const startPanRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  const activeSlug =
    propActiveSlug ||
    (pathname?.startsWith('/hopr/') ? pathname.replace('/hopr/', '').split('/')[0] : null);

  // Center view on header card on mount and on resize
  const centerView = useCallback(() => {
    if (typeof window === 'undefined') return;
    const targetX = window.innerWidth / 2 - CENTER_X;
    const targetY = window.innerHeight / 2 - CENTER_Y;
    setPan({ x: targetX, y: targetY });
  }, []);

  useEffect(() => {
    // Center view immediately without transition on initial load
    centerView();

    const mediaQuery = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;

    let centerTimer: NodeJS.Timeout | undefined;
    let animTimer: NodeJS.Timeout | undefined;
    let completeTimer: NodeJS.Timeout | undefined;

    if (mediaQuery?.matches) {
      setHasCentered(true);
      setIsAnimated(true);
      setAnimationComplete(true);
    } else {
      // Enable board pan transition after initial center placement
      centerTimer = setTimeout(() => {
        setHasCentered(true);
      }, 50);

      // Trigger entrance animation starting at the center
      animTimer = setTimeout(() => {
        setIsAnimated(true);
      }, 60);

      // Clean up transforms once settled
      completeTimer = setTimeout(() => {
        setAnimationComplete(true);
      }, 1100);
    }

    const handleResize = () => {
      centerView();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      if (centerTimer) clearTimeout(centerTimer);
      if (animTimer) clearTimeout(animTimer);
      if (completeTimer) clearTimeout(completeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [centerView]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;

    // Clear any active browser text selection
    if (typeof window !== 'undefined' && window.getSelection) {
      window.getSelection()?.removeAllRanges();
    }

    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    startPointerRef.current = { x: e.clientX, y: e.clientY };
    startPanRef.current = { ...pan };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;

    const dx = e.clientX - startPointerRef.current.x;
    const dy = e.clientY - startPointerRef.current.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 8) {
      hasDraggedRef.current = true;
      setIsDragging(true);

      // Deselect text immediately if drag threshold is crossed
      if (typeof window !== 'undefined' && window.getSelection) {
        window.getSelection()?.removeAllRanges();
      }

      if (containerRef.current && !containerRef.current.hasPointerCapture(e.pointerId)) {
        try {
          containerRef.current.setPointerCapture(e.pointerId);
        } catch {
          // Ignore
        }
      }

      setPan({
        x: startPanRef.current.x + dx,
        y: startPanRef.current.y + dy,
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isPointerDownRef.current = false;
    setIsDragging(false);

    if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
      try {
        containerRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }

    // Reset hasDraggedRef shortly after pointer release to allow click handler to read it
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 60);
  };

  // Two-finger / trackpad wheel panning
  const handleWheel = (e: React.WheelEvent) => {
    // Prevent accidental browser back swipe while navigating board
    e.preventDefault();
    setPan((prev) => ({
      x: prev.x - e.deltaX,
      y: prev.y - e.deltaY,
    }));
  };

  const handleCardClick = (slug: string, e?: React.MouseEvent) => {
    // Suppress click if user was actively dragging/panning
    if (hasDraggedRef.current) {
      if (e) {
        e.preventDefault();
      }
      return;
    }
    router.push(`/hopr/${slug}`, { scroll: false });
  };

  // Organic 2D positions for the cards surrounding the center Header (CENTER_X = 1600, CENTER_Y = 1100)
  const cardCoordinates = [
    {
      // 0: Top-Center / Left (Hopr's Design System)
      left: 1390,
      top: 480,
      width: 390,
      rotation: -1.5,
      pinColor: 'brass' as const,
      attachment: 'pin-brass' as const,
      pinPos: { x: 1585, y: 480 },
    },
    {
      // 1: Top-Right (Support Deflection)
      left: 1950,
      top: 560,
      width: 380,
      rotation: 1.8,
      pinColor: 'terracotta' as const,
      attachment: 'pin-terracotta' as const,
      pinPos: { x: 2140, y: 560 },
    },
    {
      // 2: Bottom-Right (Auto Matches)
      left: 1960,
      top: 1250,
      width: 380,
      rotation: -1.2,
      pinColor: 'forest' as const,
      attachment: 'pin-forest' as const,
      pinPos: { x: 2150, y: 1250 },
    },
    {
      // 3: Bottom-Left (Safety Suite & Reporting flow)
      left: 1370,
      top: 1360,
      width: 390,
      rotation: 1.5,
      pinColor: 'steel' as const,
      attachment: 'pin-steel' as const,
      pinPos: { x: 1565, y: 1360 },
    },
    {
      // 4: Middle-Left (Flyover hop-ins)
      left: 810,
      top: 890,
      width: 390,
      rotation: -2.2,
      pinColor: 'dark' as const,
      attachment: 'pin-dark' as const,
      pinPos: { x: 1005, y: 890 },
    },
  ];

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      className={`fixed inset-0 w-screen h-screen h-[100dvh] overflow-hidden touch-none select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        backgroundColor: '#ded4c5',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* 
        Restrained Cork Board Background Texture
        Warm, tactile, highly readable surface using procedural SVG grain filter & warm gradients.
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(247, 243, 236, 0.65) 0%, rgba(214, 202, 185, 0.75) 100%),
            radial-gradient(circle at 20% 30%, rgba(197, 182, 162, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(188, 172, 151, 0.25) 0%, transparent 50%)
          `,
        }}
      >
        {/* Procedural Subtle SVG Noise Texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.038] mix-blend-multiply"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="cork-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#cork-grain)" />
        </svg>

        {/* Soft edge vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(145,125,100,0.22)]" />
      </div>

      {/* 
        Fixed Navigation & Controls (Never pan away with canvas)
      */}
      {/* Top Left: Back Control */}
      <div className="fixed top-5 left-5 sm:top-6 sm:left-6 z-40">
        <Link
          href="/"
          className="case-back-chip group hover:border-sand-6 hover:shadow-md transition-all flex items-center gap-1.5 text-[14px]"
        >
          <span className="text-sand-9 group-hover:-translate-x-0.5 transition-transform">
            ←
          </span>
          <span>Back to Portfolio</span>
        </Link>
      </div>

      {/* Top Right: Center Board Reset Button */}
      <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={centerView}
          className="inline-flex items-center gap-1.5 rounded-full border border-sand-4/80 bg-white/85 px-3.5 py-1.5 text-[12.5px] font-medium text-sand-11 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-sand-12 hover:border-sand-6"
          title="Recenter board on overview"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="2" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="2" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
          </svg>
          <span className="hidden sm:inline">Center Board</span>
        </button>
      </div>

      {/* Bottom Center: Drag Hint Instruction (Requirement 3) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none select-none">
        <div className="flex items-center gap-2 rounded-full border border-sand-4/80 bg-white/90 px-4 py-2 text-[13px] font-medium text-sand-11 shadow-sm backdrop-blur-md">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-sand-9"
          >
            <path d="M5 9l-3 3 3 3" />
            <path d="M9 5l3-3 3 3" />
            <path d="M19 9l3 3-3 3" />
            <path d="M9 19l3 3 3-3" />
            <path d="M2 12h20" />
            <path d="M12 2v20" />
          </svg>
          <span>You can drag to move around the page freely</span>
        </div>
      </div>

      {/* Bottom Right: Hit Like Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <HoprLikeButton />
      </div>

      {/* 
        Freeform Canvas Layer
        Pans freely in 2D space according to `pan.x` and `pan.y`
      */}
      <div
        className="absolute top-0 left-0 will-change-transform"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0)`,
          transition: !hasCentered || isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {/* 
          Connecting Studio Strings (Directly from Sketch 1)
          Radiating from center Header card's brass pin (1600, 970) to each card's pin
        */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        >
          {caseStudies.map((study, idx) => {
            const coord = cardCoordinates[idx] || cardCoordinates[0];
            // Bezier curve with gentle sag
            const startX = 1600;
            const startY = 970;
            const endX = coord.pinPos.x;
            const endY = coord.pinPos.y;
            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2 + 30; // 30px gravity sag

            return (
              <g
                key={study.slug || idx}
                style={
                  animationComplete
                    ? undefined
                    : {
                        opacity: isAnimated ? 1 : 0,
                        transition: isAnimated
                          ? `opacity 0.5s ease-out ${idx * 65 + 280}ms`
                          : 'none',
                      }
                }
              >
                {/* String shadow */}
                <path
                  d={`M ${startX} ${startY + 3} Q ${midX} ${midY + 3} ${endX} ${endY + 3}`}
                  fill="none"
                  stroke="rgba(0,0,0,0.12)"
                  strokeWidth="1.8"
                />
                {/* Tactile dashed string line */}
                <path
                  d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
                  fill="none"
                  stroke="#7c664f"
                  strokeWidth="1.3"
                  strokeDasharray="5 3.5"
                  opacity="0.65"
                />
              </g>
            );
          })}
        </svg>

        {/* 
          Center "Header" Card (Directly from Sketch 1)
          Positioned at the center of the canvas
        */}
        <div
          className="absolute z-20 rounded-2xl bg-[#faf8f5] border border-sand-5/90 p-6 sm:p-7 shadow-[0_12px_36px_rgba(0,0,0,0.11),0_2px_6px_rgba(0,0,0,0.05)] select-none"
          style={{
            left: 1390,
            top: 960,
            width: 420,
            ...(animationComplete
              ? {}
              : {
                  transform: isAnimated ? 'scale(1)' : 'scale(0.92)',
                  opacity: isAnimated ? 1 : 0,
                  transition: isAnimated
                    ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out'
                    : 'none',
                }),
          }}
        >
          {/* Center Brass Pushpin */}
          <div
            className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 z-30"
            aria-hidden="true"
          >
            <svg width="26" height="28" viewBox="0 0 26 28" fill="none">
              <ellipse cx="13" cy="25" rx="7" ry="3" fill="rgba(0,0,0,0.2)" />
              <line x1="13" y1="15" x2="13" y2="24" stroke="#777777" strokeWidth="2" strokeLinecap="round" />
              <circle cx="13" cy="11" r="8" fill="#c89933" />
              <circle cx="10.5" cy="8.5" r="2.8" fill="#f3d37a" opacity="0.85" />
              <circle cx="13" cy="11" r="7.5" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
            </svg>
          </div>

          {/* Header Card Contents */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-bold bg-[#85FFB3]/20 text-[#005224] border border-[#85FFB3]/60 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008f3f]" />
              Project 0 → 1
            </span>
            <span className="text-[12.5px] text-sand-10 font-medium">Rapido / Hopr</span>
          </div>

          <h1 className="text-[22px] font-extrabold text-sand-12 tracking-tight leading-tight mb-2">
            Hopr Carpool
          </h1>

          <p className="text-[14px] text-sand-11 mb-4 font-medium">
            An interactive studio wall documenting artifacts, explorations, trust architectures, and graveyard experiments from designing Hopr at Rapido
          </p>
          <p className="text-[14px] text-sand-11 mb-4 font-medium">
            If you&apos;re seeing this, you&apos;re on the test page. Please check back in a few days. I&apos;ll be updating this content soon.
          </p>

          <div className="flex items-center justify-between border-t border-sand-4/80 pt-3 text-[12.5px] text-sand-10">
            <span>{caseStudies.length} Pinned Artifacts</span>
            <span className="font-semibold text-black/50">Click any paper to inspect</span>
          </div>
        </div>

        {caseStudies.map((study, idx) => {
          const coord = cardCoordinates[idx] || cardCoordinates[0];
          const offsetX = CENTER_X - (coord.left + coord.width / 2);
          const offsetY = CENTER_Y - (coord.top + 200);

          return (
            <div
              key={study.slug}
              className="absolute z-20 will-change-transform"
              style={{
                left: coord.left,
                top: coord.top,
                width: coord.width,
                ...(animationComplete
                  ? {}
                  : {
                      transform: isAnimated
                        ? 'translate3d(0, 0, 0) scale(1)'
                        : `translate3d(${offsetX}px, ${offsetY}px, 0) scale(0.6)`,
                      opacity: isAnimated ? 1 : 0,
                      transition: isAnimated
                        ? `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 65 + 70}ms, opacity 0.45s ease-out ${idx * 65 + 70}ms`
                        : 'none',
                    }),
              }}
            >
              <PaperCard
                caseStudy={study}
                onClick={handleCardClick}
                isSelected={activeSlug === study.slug}
                rotation={coord.rotation}
                attachment={coord.attachment}
                priority={idx < 3}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
