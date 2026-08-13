import { allHoprEntries, type HoprEntry } from 'contentlayer/generated';
import { format, parseISO, compareDesc, compareAsc } from 'date-fns';
import { generateSlug, type TOCItem } from '@/lib/toc';

export interface ProcessedHoprEntry {
  slug: string;
  date: string; // ISO date string e.g. "2025-12-15"
  formattedDate: string; // e.g. "December 2025"
  title?: string;
  description?: string;
  code: string;
  raw: string;
}

export function getHoprEntries(sortOrder: 'newest' | 'oldest' = 'newest'): ProcessedHoprEntry[] {
  const processed: ProcessedHoprEntry[] = allHoprEntries.map((entry: HoprEntry) => {
    let formattedDate = entry.date;
    try {
      formattedDate = format(parseISO(entry.date), 'MMMM, yyyy');
    } catch {
      // Fallback
    }

    return {
      slug: entry.slug,
      date: entry.date,
      formattedDate,
      title: entry.title,
      description: entry.description,
      code: entry.body.code,
      raw: entry.body.raw,
    };
  });

  return sortHoprEntries(processed, sortOrder);
}

export function sortHoprEntries(
  entries: ProcessedHoprEntry[],
  sortOrder: 'newest' | 'oldest' = 'newest'
): ProcessedHoprEntry[] {
  return [...entries].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'newest'
      ? compareDesc(dateA, dateB)
      : compareAsc(dateA, dateB);
  });
}

export function buildHoprToc(entries: ProcessedHoprEntry[]): TOCItem[] {
  const toc: TOCItem[] = [];

  entries.forEach((entry, index) => {
    const entryId = generateSlug(entry.formattedDate);
    toc.push({
      level: 2,
      text: entry.formattedDate,
      id: entryId,
      index,
    });
  });

  return toc;
}
