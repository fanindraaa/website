'use client';

import Image from '@/components/image';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import type { TOCItem } from '@/lib/toc';
import { HeadingIdProvider, h2, h3 } from '@/components/mdx-headings';
import { Sidenote, SidenoteProvider } from '@/components/sidenote';

const components = {
  Image,
  h2,
  h3,
  Sidenote,
};

interface MdxProps {
  code: string;
  headings?: TOCItem[];
}

export function Mdx({ code, headings = [] }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <HeadingIdProvider headings={headings}>
      <SidenoteProvider>
        <Component components={{ ...components }} />
      </SidenoteProvider>
    </HeadingIdProvider>
  );
}

