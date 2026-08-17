import Link from 'next/link';
import { allProjects } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx';
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
            {project.title}
          </h1>
          <time className="text-[13px] text-sand-9 mt-1 block font-normal">
            {format(parseISO(project.year), 'MMMM, yyyy')}
          </time>
        </div>

        <p className="text-[13.5px] leading-relaxed text-sand-11 max-w-none">
          {project.description}
        </p>

        {/* Table of Contents on the left */}
        {toc.length > 0 && (
          <div className="pt-4 border-t border-sand-4">
            <h2 className="text-[12.5px] font-normal text-sand-9 mb-2.5">
              Table of Contents
            </h2>
            <ul className="space-y-1.5 text-[13.5px] list-none p-0 m-0">
              {toc.map((item, idx) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="flex items-center justify-between text-sand-11 hover:text-sand-12 no-underline group py-0.5"
                  >
                    <span className="truncate">{`0${idx + 1}. ${item.text}`}</span>
                    <span className="text-sand-9 group-hover:translate-x-0.5 transition-transform ml-2 shrink-0">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Right Column: Project Content */}
      <article className="case-study w-full">
        <section>
          <Mdx code={project.body.code} headings={toc} />
        </section>
      </article>
    </div>
  );
}
