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
    <div className="w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-12 lg:gap-14 xl:gap-20 items-start text-[14px] pt-4">
      {/* Left Side Panel */}
      <aside className="w-full flex flex-col space-y-6 lg:sticky lg:top-8 lg:self-start">
        {/* Back button on top of left column */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-sand-9 hover:text-sand-12 no-underline transition-colors w-fit"
        >
          <span>←</span> Back to Work
        </Link>

        <div>
          <h1 className="text-[1.5rem] font-semibold tracking-tight text-sand-12 leading-tight">
            Hopr Carpool
          </h1>
          <time className="text-[13px] text-sand-9 mt-1 block font-normal">
            December 2025 – Present
          </time>
        </div>

        <div className="space-y-3 text-[13.5px] leading-relaxed text-sand-11">
          <p>
            I joined Hopr as an intern and now work as an Associate Professional, exploring how trust, behavior, and interaction design can shape adoption in an emerging shared-mobility category.
          </p>
          <blockquote className="border-l-2 border-sand-6 pl-3 py-1 text-sand-10 text-[13px] italic">
            Hopr is Rapido’s carpooling product, built and operated like a startup within Rapido.
          </blockquote>
        </div>

        {/* Nodes / Links */}
        <div className="pt-2 border-t border-sand-4">
          <h2 className="text-[12.5px] font-normal text-sand-9 mb-2.5">
            Nodes
          </h2>
          <ul className="space-y-1.5 text-[13.5px] list-none p-0 m-0">
            <li>
              <a
                href="https://www.rapido.bike/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-sand-12 no-underline hover:opacity-70 group py-0.5"
              >
                <span>Rapido Website</span>
                <span className="text-sand-9 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Right Column: Timeline Content */}
      <article className="case-study w-full">
        <HoprTimeline initialEntries={entries} />
      </article>
    </div>
  );
}
