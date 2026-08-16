import type { Metadata } from 'next';
import Image from 'next/image';

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
      "Driving product evolution through city expansions, more user insights and iterations. Identifying new opportunities, addressing overlooked friction points, and designing experiences that improve trust and adoption",
    url: 'https://www.rapido.bike/',
    start: new Date('2026-06-01'),
  },
  {
    company: 'Product Design Intern at Rapido',
    description:
      "Designing Hopr, Rapido’s carpooling product. Exploring how trust and behavioral design can shape adoption in an emerging shared mobility category",
    url: 'https://www.rapido.bike/',
    start: new Date('2025-12-22'),
    end: new Date('2026-05-31'),
  },
];

const images: {
  src: string;
  alt: string;
}[] = [
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
    alt: 'me recording for an unrealesed podcast',
  },
  {
    src: '/images/about/4.jpeg',
    alt: 'me at a beach',
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="col-span-full grid grid-cols-subgrid gap-4 lg:gap-8">
        {images.map((image, key) => (
          <figure
            className="relative col-span-4 aspect-[4_/_5] h-full w-full overflow-hidden bg-sand-2 sm:col-span-8 md:col-span-4"
            key={key}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </figure>
        ))}
      </div>

      <header className="col-span-full md:col-span-12 lg:col-span-8 lg:sticky lg:top-8 lg:self-start mb-20 lg:mb-0">
        <h1>About Fanindra Maharana</h1>
        <p>B. 2003</p>
      </header>

      <section className="col-span-full md:col-span-12 lg:col-span-7 mb-8">
        <p>
          A Product Designer building thoughtful digital products around people, their needs, habits, and motivations.
        </p>
        <p>
        I recently completed my M. Des in IxD at JKLU, Jaipur. Prior to design, I studied computer science, but design caught my interest along the way and I wanted to pursue it full time. I still love to code, but design is where my heart is. Oh! they invented a term for this:  <span className='font-semibold'>&ldquo;vibe-coding&rdquo;</span>
        </p>
      </section>

      <section className="col-span-full lg:col-span-12 lg:col-start-5 border-t border-t-sand-6 pt-8 mt-8 grid grid-cols-16 lg:grid-cols-12 gap-4 md:gap-8 md:gap-y-8">
        <h2 className="col-span-8 lg:col-span-4">Experience</h2>

        {experiences.map((experience, key) => (
          <div
            className="col-span-full md:col-span-8 md:col-start-9 lg:col-start-5 grid grid-cols-8 gap-4 not-last:border-b not-last:border-sand-6 not-last:pb-12 not-last:md:pb-20"
            key={key}
          >
            <div className="col-span-full">
              <h3 className="col-span-4 font-semibold">
                {experience.url ? (
                  <a href={`${experience.url}`} target="_blank">
                    {experience.role && `${experience.role} at`}{' '}
                    {experience.company}
                  </a>
                ) : (
                  <>
                    {experience.role && `${experience.role} at`}{' '}
                    {experience.company}
                  </>
                )}
              </h3>
              <span className="block">
                {(experience.end && isAfter(experience.end, new Date())) ||
                !experience.end
                  ? `${format(experience.start, 'LLLL, yyyy')} – Ongoing`
                  : `${format(experience.start, 'LLLL, yyyy')} – ${format(experience.end, 'LLLL, yyyy')}`}
              </span>
            </div>

            {experience.description && (
              <p className="mt-4 col-span-full sm:col-span-6 max-w-none">
                {experience.description}
              </p>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
