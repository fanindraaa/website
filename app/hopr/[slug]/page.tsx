import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllHoprCaseStudies, getHoprCaseStudyBySlug } from '@/lib/hopr';
import CaseStudySidebar from '@/components/hopr/case-study-sidebar';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const caseStudies = getAllHoprCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getHoprCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found · Hopr',
    };
  }

  return {
    title: `${caseStudy.title} · Hopr Case Study`,
    description: caseStudy.description,
    openGraph: {
      title: `${caseStudy.title} · Hopr`,
      description: caseStudy.description,
      images: [
        {
          url: caseStudy.cover,
          alt: caseStudy.title,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getHoprCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const allCaseStudies = getAllHoprCaseStudies();

  return (
    <CaseStudySidebar
      caseStudy={caseStudy}
      allCaseStudies={allCaseStudies}
    />
  );
}
