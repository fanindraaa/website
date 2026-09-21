import { MetadataRoute } from 'next';
import { getAllHoprCaseStudies } from '@/lib/hopr';

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = getAllHoprCaseStudies();

  const caseStudyUrls = caseStudies.map((study) => ({
    url: `https://fanindra.me/hopr/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://fanindra.me',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://fanindra.me/hopr',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...caseStudyUrls,
  ];
}
