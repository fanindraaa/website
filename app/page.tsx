import Link from 'next/link';
import GalleryCard from '@/components/gallery-card';

const galleryItems = [
  {
    name: 'Metalab Internship',
    year: '2025',
    description: 'Bringing a 0+1 B2B disruptor to life with one of Metalab\'s largest product teams.',
    image: '/images/projects/hopr-internship/boost-mockup-cover.jpg',
    href: '/projects/hopr',
    aspectRatio: 'aspect-[16/10]',
    priority: true,
  },
  {
    name: 'Figma Live Comments',
    year: '2025',
    description: 'Capturing creativity on-the-go with Figma mobile.',
    image: '/images/projects/hopr-internship/boost-holding-mockup.jpg',
    href: '/projects/hopr',
    aspectRatio: 'aspect-[3/4]',
    priority: true,
  },
  {
    name: 'Wonder',
    year: '2025',
    description: 'Creating what\'s next for human-AI interaction in designer workflows.',
    image: '/images/projects/cardtree/header.png',
    href: '/projects/cardtree',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    name: 'Procter & Gamble Internship',
    year: '2025',
    description: 'Designing digital products for the world\'s leading beauty and home care brands.',
    image: '/images/projects/cardtree/1_4.png',
    href: '/projects/cardtree',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    name: 'Bubble.fi',
    year: '2023',
    description: 'Harnessing creative play to turn procrastination into moments of delight.',
    image: '/images/projects/hopr-internship/boost-device.jpg',
    href: '/playground',
    aspectRatio: 'aspect-[3/4]',
  },
];

const leftColumnItems = [galleryItems[0], galleryItems[2], galleryItems[4]];
const rightColumnItems = [galleryItems[1], galleryItems[3]];

export default function Home() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-12 lg:gap-14 xl:gap-20 items-start text-[14px]">
      {/* Left Side Panel */}
      <aside className="w-full flex flex-col space-y-10">
        {/* Bio text */}
        <div className="space-y-4 text-[13.5px] leading-relaxed text-sand-11">
          <p>
            Fanindra Maharana is a designer with a love for storytelling and an obsessive commitment to craft. He is interested in creating meaningful and innately human digital experiences that make our interactions with the world more thoughtful and beautiful.
          </p>
          <p>
            Currently, he&rsquo;s designing and learning{' '}
            <a
              href="https://www.rapido.bike/"
              target="_blank"
              rel="noreferrer"
              className="text-sand-12 no-underline hover:underline"
            >
              @Rapido
            </a>{' '}
            (Hopr). Previously,{' '}
            <Link
              href="/projects/cardtree"
              className="text-sand-12 no-underline hover:underline"
            >
              @Cardtree
            </Link>
            , and{' '}
            <a
              href="https://thedouble.ai/"
              target="_blank"
              rel="noreferrer"
              className="text-sand-12 no-underline hover:underline"
            >
              @Double.ai
            </a>
            .
          </p>
        </div>

        {/* Table of Contents */}
        <div>
          <h2 className="text-[12.5px] font-normal text-sand-9 mb-2.5">
            Table of Contents
          </h2>
          <ul className="space-y-1.5 text-[13.5px] list-none p-0 m-0">
            <li>
              <Link
                href="/about"
                className="flex items-center justify-between text-sand-12 no-underline hover:opacity-70 group py-0.5"
              >
                <span>01. About Me</span>
                <span className="text-sand-9 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
            </li>
            <li>
              <a
                href="#work"
                className="flex items-center justify-between text-sand-12 no-underline hover:opacity-70 group py-0.5"
              >
                <span>02. Work</span>
                <span className="text-sand-9 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </a>
            </li>
            <li>
              <Link
                href="/playground"
                className="flex items-center justify-between text-sand-12 no-underline hover:opacity-70 group py-0.5"
              >
                <span>03. Playground</span>
                <span className="text-sand-9 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Nodes */}
        <div>
          <h2 className="text-[12.5px] font-normal text-sand-9 mb-2.5">
            Nodes
          </h2>
          <ul className="space-y-1.5 text-[13.5px] list-none p-0 m-0">
            <li>
              <a
                href="mailto:imfanindra@gmail.com"
                className="flex items-center justify-between text-sand-12 no-underline hover:opacity-70 group py-0.5"
              >
                <span>04. Email</span>
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
                <span>05. LinkedIn</span>
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
                <span>06. Twitter</span>
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
                <span>07. Résumé</span>
                <span className="text-sand-9 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Right Gallery Cards Section */}
      <div id="work" className="w-full">
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
          {galleryItems.map((item) => (
            <GalleryCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
