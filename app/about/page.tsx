import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format, isAfter } from 'date-fns';

export const metadata: Metadata = {
  title: 'About',
};

interface Experience {
  company: string;
  role?: string;
  start: Date;
  end?: Date;
  description?: string;
  url?: string;
}

const experiences: Experience[] = [
  {
    company: 'Associate Product Designer at Rapido',
    description:
      'Driving product evolution through city expansions, more user insights and iterations. Identifying new opportunities, addressing overlooked friction points, and designing experiences that improve trust and adoption.',
    url: 'https://www.rapido.bike/',
    start: new Date('2026-06-01'),
  },
  {
    company: 'Product Design Intern at Rapido',
    description:
      'Designing Hopr, Rapido’s carpooling product. Exploring how trust and behavioral design can shape adoption in an emerging shared mobility category.',
    url: 'https://www.rapido.bike/',
    start: new Date('2025-12-22'),
    end: new Date('2026-05-31'),
  },
  {
    company: 'Product Design Intern at Cardtree (now thedouble.ai)',
    description:
      'Designed and shipped multiple new widgets, including the AI Twin experience for both users and visitors, while refining legacy components to create a cohesive and scalable product. I built a unified brand identity, standardized interaction patterns, and strengthened design-dev collaboration by overseeing implementation quality, ensuring the product was polished and market-ready for launch.',
    url: 'https://www.rapido.bike/',
    start: new Date('2025-12-22'),
    end: new Date('2026-05-31'),
  },
];

const images = [
  {
    src: '/images/about/1.jpeg',
    alt: 'posing to click a picture',
  },
  {
    src: '/images/about/2.jpeg',
    alt: 'my most used photo everywhere',
  },
  {
    src: '/images/about/3.jpeg',
    alt: 'me recording for an unreleased podcast',
  },
  {
    src: '/images/about/3.jpeg',
    alt: 'me recording for an unreleased podcast',
  },
  {
    src: '/images/about/3.jpeg',
    alt: 'me recording for an unreleased podcast',
  },
  {
    src: '/images/about/4.jpeg',
    alt: 'me at a beach',
  },
];

const gear = [
  {
    category: 'Hardware',
    items: 'MacBook Pro 16" (M3 Max), Apple Studio Display, Keychron Q1 Pro, Logitech MX Master 3S, Sony WH-1000XM5.',
  },
  {
    category: 'Software & Tools',
    items: 'Figma, Cursor, Next.js, React, Tailwind CSS, Raycast, Linear, Notion.',
  },
];

const thingsILike = [
  {
    title: 'Craft & Interactions',
    description: 'Building micro-interactions, smooth UI animations, scalable design systems, and rapid web prototyping.',
  },
  {
    title: 'Beyond Design',
    description: 'Espresso brewing, sci-fi cinema, custom mechanical keyboards, synthwave ambient music, and night city walks.',
  },
];

export default function AboutPage() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-12 lg:gap-14 xl:gap-20 items-start text-[14px]">
      {/* Left Column: Intro & Bio */}
      <aside className="w-full flex flex-col space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-sand-9 hover:text-sand-12 no-underline transition-colors w-fit"
        >
          <span>←</span> Back to Work
        </Link>

        <div>
          <h1 className="text-[1.5rem] font-semibold tracking-tight text-sand-12 leading-tight">
            Fanindra Maharana
          </h1>
          <p className="text-[13px] text-sand-9 mt-1 font-normal">
            Product Designer · B. 2003
          </p>
        </div>

        <div className="space-y-4 text-[13.5px] leading-relaxed text-sand-11">
          <p>
            A Product Designer building thoughtful digital products around people, their needs, habits, and motivations.
          </p>
          <p>
            I recently completed my M. Des in IxD at JKLU, Jaipur. Prior to design, I studied computer science, but design caught my interest along the way and I wanted to pursue it full time. I still love to code, but design is where my heart is. Oh! they invented a term for this:{' '}
            <span className="font-semibold text-sand-12">&ldquo;vibe-coding&rdquo;</span>.
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
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-sand-12 no-underline hover:opacity-70 group py-0.5"
              >
                <span>Résumé</span>
                <span className="text-sand-9 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Right Column: Images, Experience, My Gear, Things I Like */}
      <div className="w-full flex flex-col space-y-16">
        {/* 2-Column Images Grid */}
        <div className="flex flex-row gap-6 w-full">
          {images.map((image, index) => (
            <figure
              key={index}
              className="relative aspect-[4/5] w-full overflow-hidden bg-sand-3 rounded-none"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 hover:scale-[1.015]"
              />
            </figure>
          ))}
        </div>

        <section className='flex flex-col lg:flex-row gap-16'>


        {/* Experience Section */}
        <section className="pt-6 border-t border-sand-4">
          <h2 className="text-[13px] font-semibold text-sand-12  mb-6">
            Experience
          </h2>
          <div className="flex flex-col space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="flex flex-col space-y-1.5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold text-[14px] text-sand-12">
                    {exp.url ? (
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noreferrer"
                        className="no-underline hover:underline"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                  </h3>
                  <span className="text-[13px] text-sand-9 shrink-0">
                    {(exp.end && isAfter(exp.end, new Date())) || !exp.end
                      ? `${format(exp.start, 'MMM yyyy')} – Ongoing`
                      : `${format(exp.start, 'MMM yyyy')} – ${format(exp.end, 'MMM yyyy')}`}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-[13.5px] leading-relaxed text-sand-10 max-w-none">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* My Gear Section */}
        <section className="pt-6 border-t border-sand-4">
          <h2 className="text-[13px] font-semibold text-sand-12  mb-6">
            My Gear
          </h2>
          <div className="flex flex-col gap-6">
            {gear.map((item, index) => (
              <div key={index} className="space-y-1">
                <h3 className="font-semibold text-[13.5px] text-sand-12">
                  {item.category}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-sand-10 max-w-none">
                  {item.items}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Things I Like Section */}
        <section className="pt-6 border-t border-sand-4">
          <h2 className="text-[13px] font-semibold text-sand-12  mb-6">
            Things I Like
          </h2>
          <div className="flex flex-col gap-6">
            {thingsILike.map((item, index) => (
              <div key={index} className="space-y-1">
                <h3 className="font-semibold text-[13.5px] text-sand-12">
                  {item.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-sand-10 max-w-none">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
                </section>

      </div>
    </div>
  );
}
