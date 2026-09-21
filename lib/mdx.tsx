'use client';

import React from 'react';
import Image from 'next/image';
import mdxStyles, {
  MDXGallery,
  MDXVideo,
  MDXPullQuote,
  MDXCallout,
  MDXDecision,
  MDXStatGrid,
  MDXComparison,
  MDXPrototype,
  MDXStylesWrapper,
} from '@/components/mdx-styles';

// Re-export styled components and style tokens for consumers
export {
  mdxStyles,
  MDXGallery as Gallery,
  MDXVideo as VideoPlayer,
  MDXPullQuote as PullQuote,
  MDXCallout as CalloutBox,
  MDXDecision as DecisionCard,
  MDXStatGrid as StatGrid,
  MDXComparison as Comparison,
  MDXPrototype as PrototypeEmbed,
  MDXStylesWrapper,
};

interface MDXRendererProps {
  content: string;
}

/* -------------------------------------------------------------
 * Inline Markdown Parser
 * ----------------------------------------------------------- */

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Markdown link: [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <a
          key={key++}
          href={linkMatch[2]}
          target="_blank"
          rel="noreferrer"
          className={mdxStyles.a}
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Bold & italic: ***text***
    const boldItalicMatch = remaining.match(/^\*\*\*([^*]+)\*\*\*/);
    if (boldItalicMatch) {
      parts.push(
        <strong key={key++} className={`${mdxStyles.strong} ${mdxStyles.em}`}>
          {boldItalicMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldItalicMatch[0].length);
      continue;
    }

    // Bold: **text**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      parts.push(
        <strong key={key++} className={mdxStyles.strong}>
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Italic: *text*
    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      parts.push(
        <em key={key++} className={mdxStyles.em}>
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Inline code: `code`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(
        <code key={key++} className={mdxStyles.inlineCode}>
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Regular plain text
    const nextSpecial = remaining.search(/[[*`]/);
    if (nextSpecial === -1) {
      parts.push(remaining);
      break;
    } else if (nextSpecial === 0) {
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      parts.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

/* -------------------------------------------------------------
 * Main MDX Renderer Component
 * ----------------------------------------------------------- */

export default function MDXRenderer({ content }: MDXRendererProps) {
  if (!content) return null;

  const lines = content.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let i = 0;
  let elementKey = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Custom Component: <Gallery ... />
    if (line.trim().startsWith('<Gallery')) {
      let block = line;
      while (!block.includes('/>') && i < lines.length - 1) {
        i++;
        block += ' ' + lines[i];
      }
      const imagesMatch = block.match(/images=\{?(\[[^\]]*\])\}?/);
      const captionMatch = block.match(/caption=(?:'([^']*)'|"([^"]*)")/);
      let images: string[] = [];
      if (imagesMatch) {
        try {
          images = JSON.parse(imagesMatch[1].replace(/'/g, '"'));
        } catch {
          images = imagesMatch[1]
            .replace(/[\[\]'"]/g, '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }
      const caption = captionMatch ? captionMatch[1] || captionMatch[2] : undefined;
      elements.push(<MDXGallery key={elementKey++} images={images} caption={caption} />);
      i++;
      continue;
    }

    // Custom Component: <Comparison ... />
    if (line.trim().startsWith('<Comparison')) {
      let block = line;
      while (!block.includes('/>') && i < lines.length - 1) {
        i++;
        block += ' ' + lines[i];
      }
      const beforeMatch = block.match(/before=(?:'([^']*)'|"([^"]*)")/);
      const afterMatch = block.match(/after=(?:'([^']*)'|"([^"]*)")/);
      const beforeLabelMatch = block.match(/beforeLabel=(?:'([^']*)'|"([^"]*)")/);
      const afterLabelMatch = block.match(/afterLabel=(?:'([^']*)'|"([^"]*)")/);
      const captionMatch = block.match(/caption=(?:'([^']*)'|"([^"]*)")/);

      elements.push(
        <MDXComparison
          key={elementKey++}
          before={beforeMatch ? beforeMatch[1] || beforeMatch[2] : ''}
          after={afterMatch ? afterMatch[1] || afterMatch[2] : ''}
          beforeLabel={beforeLabelMatch ? beforeLabelMatch[1] || beforeLabelMatch[2] : 'Before'}
          afterLabel={afterLabelMatch ? afterLabelMatch[1] || afterLabelMatch[2] : 'After'}
          caption={captionMatch ? captionMatch[1] || captionMatch[2] : undefined}
        />
      );
      i++;
      continue;
    }

    // Custom Component: <Video ... />
    if (line.trim().startsWith('<Video')) {
      let block = line;
      while (!block.includes('/>') && i < lines.length - 1) {
        i++;
        block += ' ' + lines[i];
      }
      const srcMatch = block.match(/src=(?:'([^']*)'|"([^"]*)")/);
      const captionMatch = block.match(/caption=(?:'([^']*)'|"([^"]*)")/);
      const posterMatch = block.match(/poster=(?:'([^']*)'|"([^"]*)")/);

      elements.push(
        <MDXVideo
          key={elementKey++}
          src={srcMatch ? srcMatch[1] || srcMatch[2] : ''}
          caption={captionMatch ? captionMatch[1] || captionMatch[2] : undefined}
          poster={posterMatch ? posterMatch[1] || posterMatch[2] : undefined}
        />
      );
      i++;
      continue;
    }

    // Custom Component: <Quote ... />
    if (line.trim().startsWith('<Quote')) {
      let block = line;
      while (!block.includes('/>') && i < lines.length - 1) {
        i++;
        block += ' ' + lines[i];
      }
      const textMatch = block.match(/text=(?:'([^']*)'|"([^"]*)")/);
      const authorMatch = block.match(/author=(?:'([^']*)'|"([^"]*)")/);
      const roleMatch = block.match(/role=(?:'([^']*)'|"([^"]*)")/);

      elements.push(
        <MDXPullQuote
          key={elementKey++}
          text={textMatch ? textMatch[1] || textMatch[2] : ''}
          author={authorMatch ? authorMatch[1] || authorMatch[2] : undefined}
          role={roleMatch ? roleMatch[1] || roleMatch[2] : undefined}
        />
      );
      i++;
      continue;
    }

    // Custom Component: <Callout ...>...</Callout>
    if (line.trim().startsWith('<Callout')) {
      let openTag = line;
      while (!openTag.includes('>') && i < lines.length - 1) {
        i++;
        openTag += ' ' + lines[i];
      }
      const titleMatch = openTag.match(/title=(?:'([^']*)'|"([^"]*)")/);
      const typeMatch = openTag.match(/type=(?:'([^']*)'|"([^"]*)")/);
      const type = (typeMatch ? typeMatch[1] || typeMatch[2] : 'note') as any;

      i++;
      const bodyLines: string[] = [];
      while (i < lines.length && !lines[i].includes('</Callout>')) {
        bodyLines.push(lines[i]);
        i++;
      }

      elements.push(
        <MDXCallout
          key={elementKey++}
          title={titleMatch ? titleMatch[1] || titleMatch[2] : undefined}
          type={type}
        >
          {bodyLines.map((b, idx) => (
            <p key={idx} className="m-0">
              {renderInline(b)}
            </p>
          ))}
        </MDXCallout>
      );
      i++;
      continue;
    }

    // Custom Component: <Decision ...>...</Decision>
    if (line.trim().startsWith('<Decision')) {
      let openTag = line;
      while (!openTag.includes('>') && i < lines.length - 1) {
        i++;
        openTag += ' ' + lines[i];
      }
      const titleMatch = openTag.match(/title=(?:'([^']*)'|"([^"]*)")/);
      const verdictMatch = openTag.match(/verdict=(?:'([^']*)'|"([^"]*)")/);
      const reasonMatch = openTag.match(/reason=(?:'([^']*)'|"([^"]*)")/);

      i++;
      const bodyLines: string[] = [];
      while (i < lines.length && !lines[i].includes('</Decision>')) {
        bodyLines.push(lines[i]);
        i++;
      }

      elements.push(
        <MDXDecision
          key={elementKey++}
          title={titleMatch ? titleMatch[1] || titleMatch[2] : 'Design Decision'}
          verdict={(verdictMatch ? verdictMatch[1] || verdictMatch[2] : 'shipped') as any}
          reason={reasonMatch ? reasonMatch[1] || reasonMatch[2] : undefined}
        >
          {bodyLines.map((b, idx) => (
            <p key={idx} className="m-0 mb-1">
              {renderInline(b)}
            </p>
          ))}
        </MDXDecision>
      );
      i++;
      continue;
    }

    // Custom Component: <StatGrid ... />
    if (line.trim().startsWith('<StatGrid')) {
      let block = line;
      while (!block.includes('/>') && i < lines.length - 1) {
        i++;
        block += ' ' + lines[i];
      }
      const itemsMatch = block.match(/items=\{?(\[[^\]]*\])\}?/);
      let items: any[] = [];
      if (itemsMatch) {
        try {
          items = JSON.parse(itemsMatch[1].replace(/'/g, '"'));
        } catch {
          // keep empty
        }
      }
      elements.push(<MDXStatGrid key={elementKey++} items={items} />);
      i++;
      continue;
    }

    // Custom Component: <Prototype ... />
    if (line.trim().startsWith('<Prototype')) {
      let block = line;
      while (!block.includes('/>') && i < lines.length - 1) {
        i++;
        block += ' ' + lines[i];
      }
      const titleMatch = block.match(/title=(?:'([^']*)'|"([^"]*)")/);
      const urlMatch = block.match(/url=(?:'([^']*)'|"([^"]*)")/);
      const captionMatch = block.match(/caption=(?:'([^']*)'|"([^"]*)")/);

      elements.push(
        <MDXPrototype
          key={elementKey++}
          title={titleMatch ? titleMatch[1] || titleMatch[2] : undefined}
          url={urlMatch ? urlMatch[1] || urlMatch[2] : undefined}
          caption={captionMatch ? captionMatch[1] || captionMatch[2] : undefined}
        />
      );
      i++;
      continue;
    }

    // Heading 1: #
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={elementKey++} className={mdxStyles.h1}>
          {renderInline(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // Heading 2: ##
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={elementKey++} className={mdxStyles.h2}>
          {renderInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // Heading 3: ###
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={elementKey++} className={mdxStyles.h3}>
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // Horizontal Rule: ---
    if (line.trim() === '---' || line.trim() === '***') {
      elements.push(<hr key={elementKey++} className={mdxStyles.hr} />);
      i++;
      continue;
    }

    // Markdown Image: ![alt](url)
    const mdImageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (mdImageMatch) {
      const alt = mdImageMatch[1];
      const src = mdImageMatch[2];
      elements.push(
        <figure key={elementKey++} className={mdxStyles.figure}>
          <div className={mdxStyles.imageWrapper}>
            <Image
              src={src}
              alt={alt || 'Case study illustration'}
              fill
              sizes="(max-width: 1024px) 100vw, 75vw"
              className={mdxStyles.image}
            />
          </div>
          {alt && (
            <figcaption className={mdxStyles.figcaption}>
              {alt}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    // Blockquote: >
    if (line.startsWith('> ')) {
      const quoteLines = [line.slice(2)];
      i++;
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote key={elementKey++} className={mdxStyles.blockquote}>
          {quoteLines.map((ql, qIdx) => (
            <p key={qIdx} className="m-0 mb-1">
              {renderInline(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Unordered List: - or *
    if (line.match(/^[\*\-]\s+/)) {
      const listItems: string[] = [line.replace(/^[\*\-]\s+/, '')];
      i++;
      while (i < lines.length && lines[i].match(/^[\*\-]\s+/)) {
        listItems.push(lines[i].replace(/^[\*\-]\s+/, ''));
        i++;
      }
      elements.push(
        <ul key={elementKey++} className={mdxStyles.ul}>
          {listItems.map((li, lIdx) => (
            <li key={lIdx} className={mdxStyles.li}>
              {renderInline(li)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered List: 1.
    if (line.match(/^\d+\.\s+/)) {
      const listItems: string[] = [line.replace(/^\d+\.\s+/, '')];
      i++;
      while (i < lines.length && lines[i].match(/^\d+\.\s+/)) {
        listItems.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={elementKey++} className={mdxStyles.ol}>
          {listItems.map((li, lIdx) => (
            <li key={lIdx} className={mdxStyles.li}>
              {renderInline(li)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Standard Paragraph: gather contiguous lines
    const paragraphLines = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('<') &&
      !lines[i].startsWith('> ') &&
      !lines[i].match(/^[\*\-]\s+/) &&
      !lines[i].match(/^\d+\.\s+/) &&
      lines[i].trim() !== '---'
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }

    elements.push(
      <p key={elementKey++} className={mdxStyles.p}>
        {renderInline(paragraphLines.join(' '))}
      </p>
    );
  }

  return <MDXStylesWrapper>{elements}</MDXStylesWrapper>;
}
