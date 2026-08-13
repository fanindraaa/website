'use client';

import clsx from 'clsx';

export type SortOrder = 'newest' | 'oldest';

interface HoprSortProps {
  sortOrder: SortOrder;
  onChange: (newOrder: SortOrder) => void;
}

export function HoprSort({ sortOrder, onChange }: HoprSortProps) {
  return (
    <div className="flex items-center justify-end gap-2 pb-6">
      <span className="text-[0.9rem] font-semibold text-sand-9">Sort:</span>
      <div
        role="group"
        aria-label="Sort timeline entries"
        className="inline-flex rounded-full border border-sand-4 bg-sand-2 p-1 text-[0.875rem] font-semibold shadow-xs"
      >
        <button
          type="button"
          onClick={() => onChange('newest')}
          aria-pressed={sortOrder === 'newest'}
          className={clsx(
            'rounded-full px-3 py-1.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-sand-12',
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
            'rounded-full px-3 py-1.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-sand-12',
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
