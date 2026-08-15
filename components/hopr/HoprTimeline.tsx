'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Mdx } from '@/components/mdx';
import { TableOfContents } from '@/components/table-of-contents';
import { generateSlug } from '@/lib/toc';
import { ProcessedHoprEntry, sortHoprEntries, buildHoprToc } from '@/lib/hopr';
import { HoprSort, SortOrder } from './HoprSort';

interface HoprTimelineProps {
  initialEntries: ProcessedHoprEntry[];
}

export function HoprTimeline({ initialEntries }: HoprTimelineProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [entries, setEntries] = useState<ProcessedHoprEntry[]>(initialEntries);
  const shouldReduceMotion = useReducedMotion();

  const handleSortChange = (newOrder: SortOrder) => {
    if (newOrder === sortOrder) return;
    setSortOrder(newOrder);
    setEntries(sortHoprEntries(initialEntries, newOrder));
  };

  const toc = buildHoprToc(entries);

  return (
    <div className="relative w-full">
      {/* Existing TableOfContents component for the left-side rail */}
      <TableOfContents toc={toc} />

      {/* Top Right Sorting Control */}
      <HoprSort sortOrder={sortOrder} onChange={handleSortChange} />

      {/* Chronological Timeline Entries */}
      <section className="mt-8 space-y-16">
        <AnimatePresence mode="popLayout" initial={false}>
          {entries.map((entry) => {
            const headingId = entry.outerHeadingId || generateSlug(entry.formattedDate);
            return (
              <motion.article
                key={entry.slug}
                layout={!shouldReduceMotion}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 16 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -16 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.25,
                  ease: 'easeInOut',
                }}
                className="space-y-6"
              >
                <p className="text-[1.5rem] text-grey-500 font-semibold leading-tight pt-12 border-t border-sand-5"
                >
                  {entry.formattedDate}
                </p>
                <Mdx code={entry.code} headings={entry.headings} />
              </motion.article>
            );
          })}
        </AnimatePresence>
      </section>
    </div>
  );
}
