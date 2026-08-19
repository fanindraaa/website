import GalleryCard from '@/components/gallery-card';

const galleryItems = [
  {
    name: 'Hopr Carpool',
    year: 'Dec 2025 - Present',
    description: "At Rapido, I’ve started as an intern and now an Associate Product Designer. My work includes designing Hopr (Rapido’s carpooling product), while exploring how trust, behavioral design, and user needs can shape adoption in an emerging shared-mobility category. (Detailed Case Study coming soon)",
    tags: 'Product Design, Interaction Design, 0 → 1, Double-sided marketplace, Mobility',
    linkText: 'Check out Hopr',
    linkUrl: 'https://apps.apple.com/in/app/hopr-carpool-ride-share-app/id6745472733',
    images: [
      '/images/Hopr-1.webp',
      '/images/Hopr-2.webp',
      '/images/Hopr-3.webp',
    ],
    priority: true,
  },
  {
    name: 'Understanding the perception of X (Twitter) users',
    year: 'November 2025',
    description: "Conducted a usability study on X’s feed and verification changes, uncovering reduced trust, increased cognitive load, and a strong user preference for the Trending and Following feeds",
    tags: 'Academic Project, UX Research, Usability Study',
    linkText: 'Read full report',
    linkUrl: 'https://heyzine.com/flip-book/db4e4a7431.html',
    images: [
      '/images/x-1.webp',
    ],
  },
  {
    name: 'Internship at Cardtree (now thedouble.ai)',
    year: 'Jul 2025 - Nov 2025',
    description: 'As on of the founding designer at Cardtree, I shaped the core product and AI Twin, shipping new experiences, and collaborating closely with developers to ensure high-quality implementation',
    tags: 'Internship, Product Design, AI Experience',
    linkText: 'Case study coming soon',
    images: [
      '/images/cardtree-1.webp',
      '/images/cardtree-2.webp',
      '/images/cardtree-3.webp',
      '/images/cardtree-4.webp',
      '/images/cardtree-5.webp',
      '/images/cardtree-6.webp',
    ],
    priority: true,
  },
  {
    name: 'My Tags',
    year: 'May 2025',
    description: "MyTags is a utility-focused mobile app that helps users tag, track, and recover personal items through QR codes, enabling finders to easily contact owners.",
    tags: 'Client Project, App Redesign, Mobile App, UX Design',
    linkText: 'Case study coming soon',
    images: [
      '/images/mytags-1.webp',
      '/images/mytags-2.webp',
      '/images/mytags-3.webp',
      '/images/mytags-4.webp',
    ],
  },
  {
    name: 'Uberpool',
    year: 'March 2025',
    description: "Designed a trust-focused ride-sharing experience that lets Uber users opt into shared rides mid-journey, reducing anxiety while leveraging Uber’s existing network and safety infrastructure.",
    tags: 'Academic Project, Little Intervention',
    linkText: 'Read more on Behance',
    linkUrl: 'https://www.behance.net/gallery/220957463/Uber-Dynamic-Carpooling',
    images: [
      '/images/uberpool-1.webp',
      '/images/uberpool-2.webp',
      '/images/uberpool-3.webp',
      '/images/uberpool-4.webp',
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
          <h1 className="text-[16px] font-semibold text-sand-12 tracking-tight m-0">
            Fanindra Maharana
          </h1>
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
              
                <span>Resume</span>
                <span className="text-sand-9 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"> (Updating soon)
                </span>
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

