import GalleryCard from '@/components/gallery-card';

const galleryItems = [
  {
    name: 'Hopr Carpool',
    year: '2025 - Present',
    description: "Bringing a 0+1 B2B disruptor to life with one of Metalab's largest product teams.",
    linkText: 'Case study coming soon',
    images: [
      '/Hopr Layout.png',
      '/images/Hopr1.png',
      '/images/Hopr 2.png',
      '/Homepage.png',
    ],
    priority: true,
  },
  {
    name: 'Internship at Cardtree',
    year: '2025',
    description: 'Capturing creativity on-the-go with Figma mobile.',
    linkText: 'Case study coming soon',
    images: [
      '/cardtree-1.webp',
      '/cardtree-2.webp',
      '/cardtree-3.webp',
      '/cardtree-4.webp',
      '/cardtree-5.webp',
      '/cardtree-6.webp',
      '/cardtree-7.webp',
      '/cardtree-8.webp',
    ],
    priority: true,
  },
  {
    name: 'Wonder',
    year: '2025',
    description: "Creating what's next for human-AI interaction in designer workflows.",
    linkText: 'Coming soon',
    images: [
      '/og.jpg',
      '/Hopr Layout.png',
      '/images/Hopr 2.png',
      '/Case Study Layout.png',
    ],
  },
  {
    name: 'Procter & Gamble Internship',
    year: '2025',
    description: "Designing digital products for the world's leading beauty and home care brands.",
    linkText: 'Coming soon',
    images: [
      '/images/Hopr 2.png',
      '/Case Study Layout.png',
      '/Homepage.png',
      '/og.jpg',
    ],
  },
  {
    name: 'Bubble.fi',
    year: '2023',
    description: 'Harnessing creative play to turn procrastination into moments of delight.',
    linkText: 'Coming soon',
    images: [
      '/images/Hopr1.png',
      '/Homepage.png',
      '/Hopr Layout.png',
      '/images/Hopr 2.png',
    ],
  },
];

export default function Home() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-12 lg:gap-14 xl:gap-20 items-start text-[14px]">
      {/* Left Side Panel */}
      <aside className="w-full flex flex-col space-y-10 lg:sticky lg:top-8">
        {/* Bio text */}
        <div className="space-y-4 text-[13.5px] leading-relaxed text-sand-11">
          <p>
            Hey, I&rsquo;m Fanindra. I&rsquo;m a Product Designer obsessed with building consumer products in fast-paced environments. I care about interaction, systems, and craft.
          </p>
          <p>
            Currently, I&rsquo;m designing{' '}
            <a
              href="https://hopr.mobi/"
              target="_blank"
              rel="noreferrer"
              className="text-sand-12 no-underline hover:underline"
            >
              Hopr
            </a>{' '}
            by{' '}
            <a
              href="https://www.rapido.bike/"
              target="_blank"
              rel="noreferrer"
              className="text-sand-12 no-underline hover:underline"
            >
              Rapido.
            </a>{' '}
            Previously, at{' '}
            <a
              href="https://thedouble.ai/"
              target="_blank"
              rel="noreferrer"
              className="text-sand-12 no-underline hover:underline"
            >
              Cardtree (now thedouble.ai)
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-[12.5px] font-normal text-sand-9 mb-2.5">
            Get in touch
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
                <span>Resume</span>
                <span className="text-sand-9 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Right Project List View Section */}
      <div id="work" className="w-full min-w-0">
        <div className="flex flex-col gap-12 sm:gap-14 md:gap-16 w-full">
          {galleryItems.map((item) => (
            <GalleryCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

