'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface LightboxModalProps {
  isOpen: boolean;
  items: string[];
  currentIndex: number;
  title?: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const isVideo = (url: string) => {
  const videoExtensions = ['.webm', '.mp4', '.ogg', '.mov', '.m4v'];
  const cleanUrl = url.split('?')[0].toLowerCase();
  return videoExtensions.some((ext) => cleanUrl.endsWith(ext));
};

const isGif = (url: string) => {
  const cleanUrl = url.split('?')[0].toLowerCase();
  return cleanUrl.endsWith('.gif');
};

export default function LightboxModal({
  isOpen,
  items,
  currentIndex,
  title,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrev = useCallback(() => {
    if (items.length <= 1) return;
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (items.length <= 1) return;
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Prevent scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!mounted || !isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex] || items[0];
  const isVid = isVideo(currentItem);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-black/90 backdrop-blur-md p-4 sm:p-6 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} image gallery` : 'Image gallery lightbox'}
    >
      {/* Top Bar Header */}
      <div
        className="w-full flex items-center justify-between max-w-6xl z-10 py-2 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 text-white/90">
          {title && (
            <span className="font-bold text-sm sm:text-base">
              {title}
            </span>
          )}
          {items.length > 1 && (
            <span className="text-xs sm:text-sm font-bold tabular-nums px-2.5 py-0.5 rounded-full bg-white/10 text-white/70">
              {currentIndex + 1} / {items.length}
            </span>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close lightbox"
          className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Main Content (Expanded Media View) */}
      <div
        className="relative flex-1 w-full max-w-6xl flex items-center justify-center my-auto min-h-0 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Nav Arrow */}
        {items.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            type="button"
            aria-label="Previous image"
            className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 hover:scale-105 border border-white/15 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Media Box */}
        <div className="relative flex items-center justify-center max-h-[78vh] sm:max-h-[82vh] max-w-full overflow-hidden rounded-lg shadow-2xl">
          {isVid ? (
            <video
              key={currentItem}
              src={currentItem}
              controls
              autoPlay
              loop
              muted
              playsInline
              className="max-h-[78vh] sm:max-h-[82vh] max-w-full w-auto h-auto object-contain rounded-lg"
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={currentItem}
              src={currentItem}
              alt={
                title
                  ? `${title} image ${currentIndex + 1}`
                  : `Gallery item ${currentIndex + 1}`
              }
              className="max-h-[78vh] sm:max-h-[82vh] max-w-full w-auto h-auto object-contain rounded-lg transition-transform duration-200"
            />
          )}
        </div>

        {/* Right Nav Arrow */}
        {items.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            type="button"
            aria-label="Next image"
            className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 hover:scale-105 border border-white/15 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Thumbnails Navigation Row at Bottom */}
      {items.length > 1 && (
        <div
          className="w-full max-w-4xl flex items-center justify-center gap-2 overflow-x-auto py-2 z-10 no-scrollbar select-none"
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item, idx) => {
            const isVidItem = isVideo(item);
            const isActive = idx === currentIndex;

            return (
              <button
                key={idx}
                onClick={() => onNavigate(idx)}
                type="button"
                aria-label={`View image ${idx + 1}`}
                className={`relative shrink-0 h-12 w-16 sm:h-14 sm:w-20 rounded-md overflow-hidden transition-all duration-200 border ${
                  isActive
                    ? 'ring-2 ring-white border-transparent scale-105 opacity-100'
                    : 'border-white/20 opacity-50 hover:opacity-90'
                }`}
              >
                {isVidItem ? (
                  <video
                    src={item}
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item}
                    alt={`Thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>,
    document.body
  );
}
