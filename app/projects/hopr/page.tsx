import Link from 'next/link';
import type { Metadata } from 'next';
import { getHoprEntries } from '@/lib/hopr';
import { HoprTimeline } from '@/components/hopr/HoprTimeline';

export const metadata: Metadata = {
  title: 'Hopr Carpool',
  description:
    'A timeline of my product design work on Hopr, Rapido’s carpooling product.',
  openGraph: {
    title: 'Hopr Carpool · Fanindra Maharana',
    description:
      'A timeline of my product design work on Hopr, Rapido’s carpooling product.',
    url: 'https://fanindra.me/projects/hopr',
  },
  alternates: {
    canonical: 'https://fanindra.me/projects/hopr',
  },
};

export default function HoprPage() {
  const entries = getHoprEntries('newest');

  return (
    <article className="case-study col-span-full mx-auto w-full max-w-[840px] pb-20 pt-24 md:pt-32">
      <Link href="/" className="case-back-chip fixed left-6 top-6 z-50 py-3 px-4 md:left-8 md:top-8">
        &lt; Go Back
      </Link>

      <header className="mb-10">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <h1 className="text-[1.75rem] font-semibold leading-tight md:text-[2rem]">
            Hopr Carpool
          </h1>
          <time className="pt-1 text-[1.05rem] font-semibold text-sand-9">
            December 2025 - Present
          </time>
        </div>
        <div className="mt-5 space-y-4 text-[1rem] leading-[1.5] text-sand-12">
          <p className="mb-4">
            <p>
              I joined Hopr as an intern and now work as an Associate Professional, exploring how trust, behavior, and interaction design can shape adoption in an emerging shared-mobility category.
            </p>
          </p>
          <blockquote className="border-l-2 border-l-sand-6 p-2 bg-yellow-100 pl-4">
            <p>
              Hopr is Rapido’s carpooling product, built and operated like a startup within Rapido. Here, design is rarely linear. Problems evolve, assumptions change, and ideas move quickly from exploration to production. Rather than forcing that work into a traditional case study, I’ve documented it as a timeline
              Sort, explore, and dive into the work that interests you.
            </p>
          </blockquote>
        </div>
      </header>

      <HoprTimeline initialEntries={entries} />
    </article>
  );
}
