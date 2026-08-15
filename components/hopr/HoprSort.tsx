'use client';

import clsx from 'clsx';

export type SortOrder = 'newest' | 'oldest';

interface HoprSortProps {
  sortOrder: SortOrder;
  onChange: (newOrder: SortOrder) => void;
}

export function HoprSort({ sortOrder, onChange }: HoprSortProps) {
  return (
    <div className="fixed right-6 top-6 z-50 md:right-8 md:top-8">
      <span className="text-[0.875rem] font-semibold text-sand-9 mr-4">Sort:</span>
      <div
        role="group"
        aria-label="Sort timeline entries"
        className="inline-flex rounded-full p-1 text-[0.85rem] font-semibold"
      >
        <button
          type="button"
          onClick={() => onChange('newest')}
          aria-pressed={sortOrder === 'newest'}
          className={clsx(
            'rounded-full px-3 py-1.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-sand-12 cursor-pointer',
            sortOrder === 'newest'
              ? 'bg-white text-sand-12 shadow-xs'
              : 'text-sand-9 hover:text-sand-12'
          )}
        >
          Newest first
        </button>
        <button
          type="button"
          onClick={() => onChange('oldest')}
          aria-pressed={sortOrder === 'oldest'}
          className={clsx(
            'rounded-full px-3 py-1.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-sand-12 cursor-pointer',
            sortOrder === 'oldest'
              ? 'bg-white text-sand-12 shadow-xs'
              : 'text-sand-9 hover:text-sand-12'
          )}
        >
          Oldest first
        </button>
      </div>
    </div>
  );
}
