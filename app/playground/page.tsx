import type { Metadata } from 'next';
import Link from 'next/link';
import GalleryCard from '@/components/gallery-card';
import { allProjects } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';

export const metadata: Metadata = {
  title: 'Playground',
};

const filteredProjects = allProjects.filter((project) => project.playground);
const projects = filteredProjects.sort((a, b) =>
  compareDesc(new Date(a.year), new Date(b.year))
);

// Fallback card if empty, or map all playground projects
const cardItems = projects.map((project) => ({
  name: project.title,
  year: format(parseISO(project.year), 'yyyy'),
  description: project.description,
  image: `/images/projects/${project.slug}/${project.image}`,
  href: `/projects/${project.slug}`,
  aspectRatio: 'aspect-[4/3]',
}));

// If no playground items found in contentlayer, provide rich default items
const playgroundItems = cardItems.length > 0 ? cardItems : [
  {
    name: 'Bubble.fi Interactions',
    year: '2023',
    description: 'Harnessing creative play to turn procrastination into moments of delight.',
    image: '/images/projects/hopr-internship/boost-device.jpg',
    href: '/projects/hopr',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    name: 'Spatial Canvas Explorations',
    year: '2024',
    description: 'Experiments with multi-modal canvas interfaces and gesture controls.',
    image: '/images/projects/cardtree/header.png',
    href: '/projects/cardtree',
    aspectRatio: 'aspect-[16/10]',
  },
];

const leftColumnItems = playgroundItems.filter((_, idx) => idx % 2 === 0);
const rightColumnItems = playgroundItems.filter((_, idx) => idx % 2 === 1);

export default function Playground() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-12 lg:gap-14 xl:gap-20 items-start text-[14px]">
      {/* Left Column: Intro & Navigation */}
      <aside className="w-full flex flex-col space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-sand-9 hover:text-sand-12 no-underline transition-colors w-fit"
        >
          <span>←</span> Back to Work
        </Link>

        <div>
          <h1 className="text-[1.5rem] font-semibold tracking-tight text-sand-12 leading-tight">
            Playground
          </h1>
          <p className="text-[13px] text-sand-9 mt-1 font-normal">
            {playgroundItems.length} concepts & explorations
          </p>
        </div>

        <div className="space-y-4 text-[13.5px] leading-relaxed text-sand-11">
          <p>
            Besides my main projects, I explore different areas of interest in my free time.
          </p>
          <p>
            This is the best way to discover useful solutions, train my eyes for details, and develop more specific insights in certain topics.
          </p>
        </div>

        {/* Nodes / Links */}
        <div className="pt-2">
          <h2 className="text-[12.5px] font-normal text-sand-9 mb-2.5">
            Nodes
          </h2>
          <ul className="space-y-1.5 text-[13.5px] list-none p-0 m-0">
            <li>
              <a
                href="mailto:imfanindra@gmail.com"
                className="flex items-center justify-between text-sand-12 no-underline hover:opacity-70 group py-0.5"
              >
                <span>Email</span>
                <span className="text-sand-9 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/fanindra-m/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-sand-12 no-underline hover:opacity-70 group py-0.5"
              >
                <span>LinkedIn</span>
                <span className="text-sand-9 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </a>
            </li>
            <li>
              <a
                href="http://x.com/fanindraaa"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-sand-12 no-underline hover:opacity-70 group py-0.5"
              >
                <span>Twitter</span>
                <span className="text-sand-9 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Right Column: 2-column cards grid on desktop, 1-column on phone */}
      <div className="w-full">
        {/* Desktop 2-column grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-x-8 gap-y-12 items-start w-full">
          <div className="flex flex-col gap-12 w-full">
            {leftColumnItems.map((item) => (
              <GalleryCard key={item.name} {...item} />
            ))}
          </div>
          <div className="flex flex-col gap-12 w-full">
            {rightColumnItems.map((item) => (
              <GalleryCard key={item.name} {...item} />
            ))}
          </div>
        </div>

        {/* Phone / Mobile 1-column grid */}
        <div className="flex flex-col md:hidden gap-10 w-full">
          {playgroundItems.map((item) => (
            <GalleryCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
