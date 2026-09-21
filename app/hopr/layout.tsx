import type { Metadata } from 'next';
import { getAllHoprCaseStudies } from '@/lib/hopr';
import CorkBoard from '@/components/hopr/cork-board';

export const metadata: Metadata = {
  title: 'My work at Hopr',
  description:
    'An interactive studio wall documenting artifacts, explorations, trust architectures, and graveyard experiments from designing Hopr at Rapido',
  openGraph: {
    title: 'Hopr Studio Wall · Fanindra Maharana',
    description:
      'An interactive studio wall documenting artifacts, explorations, trust architectures, and graveyard experiments from designing Hopr at Rapido',
    images: [
      {
        url: '/images/hopr/Hopr-1.webp',
        width: 1200,
        height: 630,
        alt: 'Hopr Studio Board',
      },
    ],
  },
};

export default function HoprLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const caseStudies = getAllHoprCaseStudies();

  return (
    <div className="fixed inset-0 w-screen h-screen h-[100dvh] overflow-hidden bg-[#ccbba4]">
      {/* Interactive Studio Cork Board Surface */}
      <CorkBoard caseStudies={caseStudies} />
      {children}
    </div>
  );
}
