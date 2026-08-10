'use client';

import { createContext, useContext, useRef, type ReactNode } from 'react';
import { generateSlug, type TOCItem } from '@/lib/toc';

type HeadingContextType = {
  headings: TOCItem[];
  getNextHeading: (level: 2 | 3) => TOCItem | undefined;
};

const HeadingContext = createContext<HeadingContextType | null>(null);

export function getNodeText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join('');
  if (typeof node === 'object' && 'props' in node && (node as any).props) {
    return getNodeText((node as any).props.children);
  }
  return '';
}

export function HeadingIdProvider({
  headings,
  children,
}: {
  headings: TOCItem[];
  children: ReactNode;
}) {
  const counters = useRef({ 2: 0, 3: 0 });
  counters.current = { 2: 0, 3: 0 };

  const getNextHeading = (level: 2 | 3) => {
    const index = counters.current[level]++;
    const levelHeadings = headings.filter((h) => h.level === level);
    return levelHeadings[index];
  };

  return (
    <HeadingContext.Provider value={{ headings, getNextHeading }}>
      {children}
    </HeadingContext.Provider>
  );
}

function createHeading(level: 2 | 3) {
  return function Heading({
    children,
    id: explicitId,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) {
    const ctx = useContext(HeadingContext);
    
    const idRef = useRef<{ headings: TOCItem[] | undefined; id: string } | null>(null);

    if (!idRef.current || idRef.current.headings !== ctx?.headings) {
      let finalId = explicitId;

      if (!finalId && ctx) {
        const matched = ctx.getNextHeading(level);
        if (matched) {
          finalId = matched.id;
        }
      }

      if (!finalId) {
        const text = getNodeText(children).trim();
        finalId = generateSlug(text);
      }

      idRef.current = { headings: ctx?.headings, id: finalId };
    }

    const Tag = `h${level}` as const;

    return (
      <Tag id={idRef.current.id} className="scroll-mt-24" {...props}>
        {children}
      </Tag>
    );
  };
}

export const h2 = createHeading(2);
export const h3 = createHeading(3);
