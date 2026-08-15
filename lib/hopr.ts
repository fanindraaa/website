import { allHoprEntries, type HoprEntry } from 'contentlayer/generated';
import { format, parseISO, compareDesc, compareAsc } from 'date-fns';
import { generateSlug, generateUniqueSlug, type TOCItem } from '@/lib/toc';

export interface ProcessedHoprEntry {
  slug: string;
  date: string; // ISO date string e.g. "2025-12-15"
  formattedDate: string; // e.g. "December, 2025"
  title?: string;
  description?: string;
  code: string;
  raw: string;
  outerHeadingId?: string;
  headings?: TOCItem[];
}

export function parseSortableDate(dateStr: string): Date {
  if (!dateStr) return new Date(0);

  const parts = dateStr.split(/\s*(?:-|–|—|\bto\b)\s*/i);
  const targetStr = parts[0].trim();

  try {
    const parsed = parseISO(targetStr);
    if (!isNaN(parsed.getTime())) return parsed;
  } catch {}

  const timestamp = Date.parse(targetStr);
  if (!isNaN(timestamp)) {
    return new Date(timestamp);
  }

  return new Date(0);
}

function formatSingleDatePart(part: string): string {
  const trimmed = part.trim();
  if (!trimmed) return '';
  if (trimmed.toLowerCase() === 'present') return 'Present';

  try {
    const parsed = parseISO(trimmed);
    if (!isNaN(parsed.getTime())) {
      return format(parsed, 'MMMM yyyy');
    }
  } catch {}

  const timestamp = Date.parse(trimmed);
  if (!isNaN(timestamp)) {
    const d = new Date(timestamp);
    return format(d, 'MMMM yyyy');
  }

  return trimmed;
}

export function formatHoprDate(dateStr: string): string {
  if (!dateStr) return '';

  const rangeMatch = dateStr.match(/^(.+?)\s*(?:-|–|—|\bto\b)\s*(.+)$/i);
  if (rangeMatch) {
    const startFormatted = formatSingleDatePart(rangeMatch[1]);
    const endFormatted = formatSingleDatePart(rangeMatch[2]);
    return `${startFormatted} – ${endFormatted}`;
  }

  return formatSingleDatePart(dateStr);
}

export function getHoprEntries(sortOrder: 'newest' | 'oldest' = 'newest'): ProcessedHoprEntry[] {
  const processed: ProcessedHoprEntry[] = allHoprEntries.map((entry: HoprEntry) => {
    const formattedDate = formatHoprDate(entry.date);

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

  const sorted = sortHoprEntries(processed, sortOrder);
  buildHoprToc(sorted);
  return sorted;
}

export function sortHoprEntries(
  entries: ProcessedHoprEntry[],
  sortOrder: 'newest' | 'oldest' = 'newest'
): ProcessedHoprEntry[] {
  return [...entries].sort((a, b) => {
    const dateA = parseSortableDate(a.date);
    const dateB = parseSortableDate(b.date);
    return sortOrder === 'newest'
      ? compareDesc(dateA, dateB)
      : compareAsc(dateA, dateB);
  });
}

export function buildHoprToc(entries: ProcessedHoprEntry[]): TOCItem[] {
  const toc: TOCItem[] = [];
  const usedSlugs = new Set<string>();
  let globalIndex = 0;

  entries.forEach((entry) => {
    // 1. Outer date heading
    const outerHeadingId = generateUniqueSlug(entry.formattedDate, usedSlugs);
    entry.outerHeadingId = outerHeadingId;

    toc.push({
      level: 2,
      text: entry.formattedDate,
      id: outerHeadingId,
      index: globalIndex++,
    });

    // 2. Extract inner headings from entry.raw
    const innerHeadings: TOCItem[] = [];
    let inCodeBlock = false;
    let skippedFirstH1 = false;

    for (const line of entry.raw.split('\n')) {
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      if (inCodeBlock) continue;

      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (!match) continue;

      const level = match[1].length;
      const text = match[2].trim();

      if (level === 1 && !skippedFirstH1) {
        skippedFirstH1 = true;
        continue;
      }

      if (level > 3) continue;

      const headingId = generateUniqueSlug(text, usedSlugs);
      const item: TOCItem = {
        level,
        text,
        id: headingId,
        index: globalIndex++,
      };

      toc.push(item);
      innerHeadings.push(item);
    }

    entry.headings = innerHeadings;
  });

  return toc;
}
