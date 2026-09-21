import fs from 'fs';
import path from 'path';

export type HoprStatus = 'shipped' | 'not_shipped' | 'graveyard';

export interface HoprFrontmatter {
  title: string;
  description: string;
  cover: string;
  status: HoprStatus;
  category?: string;
  timeline?: {
    start: string;
    end: string;
  };
  impact?: string[];
  order?: number;
  featured?: boolean;
}

export interface HoprCaseStudy extends HoprFrontmatter {
  slug: string;
  content: string;
}

const HOPR_CONTENT_PATH = path.join(process.cwd(), 'content', 'hopr');

/**
 * Lightweight, robust frontmatter parser for YAML-like metadata between '---' markers.
 */
function parseFrontmatter(rawContent: string): {
  frontmatter: Partial<HoprFrontmatter>;
  content: string;
} {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: rawContent };
  }

  const yamlBlock = match[1];
  const content = match[2].trim();
  const frontmatter: Record<string, any> = {};

  const lines = yamlBlock.split(/\r?\n/);
  let currentKey = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip blank lines or comments
    if (!line.trim() || line.trim().startsWith('#')) {
      continue;
    }

    // List item (e.g. "  - Impact statement")
    const listItemMatch = line.match(/^\s*-\s+(.*)$/);
    if (listItemMatch && currentKey) {
      if (!Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey] = [];
      }
      let val = listItemMatch[1].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      frontmatter[currentKey].push(val);
      continue;
    }

    // Nested object property (e.g. "  start: '2024'")
    const nestedPropMatch = line.match(/^\s{2,}([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (nestedPropMatch && currentKey) {
      if (!frontmatter[currentKey] || typeof frontmatter[currentKey] !== 'object' || Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey] = {};
      }
      const nestedKey = nestedPropMatch[1].trim();
      let nestedVal = nestedPropMatch[2].trim();
      if ((nestedVal.startsWith('"') && nestedVal.endsWith('"')) || (nestedVal.startsWith("'") && nestedVal.endsWith("'"))) {
        nestedVal = nestedVal.slice(1, -1);
      }
      frontmatter[currentKey][nestedKey] = nestedVal;
      continue;
    }

    // Top-level key: value (e.g. "title: 'Smart Route Matching'")
    const topMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (topMatch) {
      currentKey = topMatch[1].trim();
      let val = topMatch[2].trim();

      if (val === '') {
        // Will be populated by next lines (list or nested object)
        frontmatter[currentKey] = null;
      } else {
        // Unquote if needed
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        } else if (val === 'true') {
          val = true as any;
        } else if (val === 'false') {
          val = false as any;
        } else if (!isNaN(Number(val)) && val !== '') {
          val = Number(val) as any;
        }
        frontmatter[currentKey] = val;
      }
    }
  }

  // Normalize status if written as "not shipped" -> "not_shipped"
  if (frontmatter.status) {
    const rawStatus = String(frontmatter.status).toLowerCase().replace(/\s+/g, '_');
    if (rawStatus === 'not_shipped' || rawStatus === 'not-shipped') {
      frontmatter.status = 'not_shipped';
    } else if (rawStatus === 'graveyard') {
      frontmatter.status = 'graveyard';
    } else {
      frontmatter.status = 'shipped';
    }
  }

  return { frontmatter: frontmatter as Partial<HoprFrontmatter>, content };
}

/**
 * Discovers and parses all .mdx case studies from content/hopr
 */
export function getAllHoprCaseStudies(): HoprCaseStudy[] {
  if (!fs.existsSync(HOPR_CONTENT_PATH)) {
    return [];
  }

  const files = fs.readdirSync(HOPR_CONTENT_PATH);
  const mdxFiles = files.filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));

  const caseStudies: HoprCaseStudy[] = mdxFiles.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, '');
    const filePath = path.join(HOPR_CONTENT_PATH, filename);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, content } = parseFrontmatter(rawContent);

    return {
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || '',
      cover: frontmatter.cover || '/images/hopr/Hopr-1.webp',
      status: (frontmatter.status as HoprStatus) || 'shipped',
      category: frontmatter.category,
      timeline: frontmatter.timeline,
      impact: frontmatter.impact || [],
      order: typeof frontmatter.order === 'number' ? frontmatter.order : 99,
      featured: Boolean(frontmatter.featured),
      content,
    };
  });

  // Sort: by explicit order, then shipped first, then not_shipped, then graveyard
  return caseStudies.sort((a, b) => {
    if (a.order !== b.order) {
      return (a.order || 99) - (b.order || 99);
    }
    const statusWeight: Record<HoprStatus, number> = {
      shipped: 1,
      not_shipped: 2,
      graveyard: 3,
    };
    return (statusWeight[a.status] || 9) - (statusWeight[b.status] || 9);
  });
}

/**
 * Retrieves a single case study by slug
 */
export function getHoprCaseStudyBySlug(slug: string): HoprCaseStudy | null {
  const all = getAllHoprCaseStudies();
  return all.find((item) => item.slug === slug) || null;
}
