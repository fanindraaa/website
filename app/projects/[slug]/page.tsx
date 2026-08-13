import Link from 'next/link';
import { allProjects } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx';
import { TableOfContents } from '@/components/table-of-contents';
import { extractHeadings } from '@/lib/toc';
import { format, parseISO } from 'date-fns';

export const generateStaticParams = async () =>
  allProjects.map((project: any) => ({ slug: project.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const project = allProjects.find((project: any) => project.slug === slug);
  return { title: project?.title };
};

export default async function ProjectLayout({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = allProjects.find((project: any) => project.slug === slug);

  if (!project) {
    return <h1>Project could not be found</h1>;
  }

  const toc = extractHeadings(project.body.raw);

  return (
    <article className="case-study col-span-full mx-auto w-full max-w-[840px] pb-20 pt-24 md:pt-32">
      <Link href="/" className="case-back-chip fixed left-8 top-8 py-3 px-4 z-50">
        &lt; Go Back
      </Link>

      <TableOfContents toc={toc} />

      <header className="mb-10">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <h1 className="text-[1.75rem] font-semibold leading-tight md:text-[2rem]">
            {project.title}
          </h1>
          <time
            dateTime={project.year}
            className="pt-1 text-[1.05rem] font-semibold text-sand-9"
          >
            {format(parseISO(project.year), 'MMMM, yyyy')}
          </time>
        </div>
        <p className="mt-5 max-w-none text-[1rem] leading-[1.5] text-sand-12">
          {project.description}
        </p>
      </header>

      <section>
        <Mdx code={project.body.code} headings={toc} />
      </section>
    </article>
  );
}
