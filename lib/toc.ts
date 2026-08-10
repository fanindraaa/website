export interface TOCItem {
  level: number;
  text: string;
  id: string;
  index: number;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function generateUniqueSlug(text: string, usedSlugs: Set<string>): string {
  const slug = generateSlug(text);
  let counter = 1;
  let uniqueSlug = slug;

  while (usedSlugs.has(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  usedSlugs.add(uniqueSlug);
  return uniqueSlug;
}

export function extractHeadings(raw: string): TOCItem[] {
  const headings: TOCItem[] = [];
  const usedSlugs = new Set<string>();
  let headingIndex = 0;
  let skippedFirstH1 = false;

  for (const line of raw.split('\n')) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].trim();

    if (level === 1 && !skippedFirstH1) {
      skippedFirstH1 = true;
      continue;
    }

    if (level > 3) continue;

    headings.push({
      level,
      text,
      id: generateUniqueSlug(text, usedSlugs),
      index: headingIndex++,
    });
  }

  return headings;
}
