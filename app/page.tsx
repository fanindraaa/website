import Image from 'next/image';
import Link from 'next/link';

import { allProjects } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';

const filteredProjects = allProjects.filter((project) => !project.playground);
const projects = filteredProjects.sort((a, b) =>
  compareDesc(new Date(a.year), new Date(b.year))
);

export default function Home() {
  return (
    <div className="col-span-full mx-auto w-full max-w-[1120px]">
      <section className="grid min-h-[520px] grid-cols-1 items-center gap-12 pb-16 pt-12 md:grid-cols-[minmax(0,1fr)_360px] md:pt-20 lg:gap-20">
        <div className="max-w-[560px]">
          <h1 className="text-[2rem] font-semibold leading-none tracking-normal md:text-[2.25rem]">
            Fanindra Maharana
          </h1>
          <p className="mt-3 text-[1.75rem] leading-none text-sand-9 md:text-[2rem]">
            Product Designer
          </p>

          <div className="mt-8 flex gap-7" aria-hidden="true">
            <span className="h-6 w-24 rounded-sm bg-sand-4" />
            <span className="h-6 w-24 rounded-sm bg-sand-4" />
            <span className="h-6 w-24 rounded-sm bg-sand-4" />
          </div>

          <div className="mt-8 space-y-5 text-[1.03rem] leading-[1.55]">
            <p>
              Obsessed with building fast consumer products through interaction,
              systems and craft.
            </p>
            <p>
              Currently building{' '}
              <a
                href="https://hopr.mobi"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[#FFFF05] decoration-4 underline-offset-2"
              >
                Hopr
              </a>
              , Rapido&rsquo;s carpooling product, where I&rsquo;m defining new
              interaction models for an emerging mobility behavior.
            </p>
            <p>
              I&rsquo;m currently open for new roles, so if you think we&rsquo;d
              be a match please get in touch!
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              className="home-chip"
              href="https://www.linkedin.com/in/fanindra-m/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <span aria-hidden="true">&#8599;</span>
            </a>
            <a
              className="home-chip"
              href="http://x.com/fanindraaa"
              target="_blank"
              rel="noreferrer"
            >
              X (Twitter) <span aria-hidden="true">&#8599;</span>
            </a>
            <a className="home-chip" href="mailto:imfanindra@gmail.com">
              Email <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </div>

        <aside className="relative mx-auto h-[320px] w-full max-w-[360px] md:mx-0">
          <p className="absolute bottom-16 left-0 z-10 max-w-[145px] -rotate-[18deg] text-[1.6rem] font-semibold leading-[1.05]">
            Let me introduce myself
          </p>
          <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-sand-3 md:h-[330px] md:w-[330px]" />
          <Link
            href="/about"
            aria-label="Go to the about page"
            className="absolute bottom-12 right-16 grid h-[78px] w-[78px] place-items-center rounded-full bg-white shadow-[0_18px_35px_rgba(0,0,0,0.18)] no-underline transition-transform hover:scale-105"
          >
            <span className="ml-1 h-0 w-0 border-y-[13px] border-l-[20px] border-y-transparent border-l-black" />
          </Link>
        </aside>
      </section>

      <section className="space-y-16 pb-16 md:space-y-20">
        {projects.map((project) => (
          <article key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="block overflow-hidden rounded-xl border border-sand-4 bg-sand-2 no-underline transition-transform hover:scale-[1.005]"
            >
              <Image
                src={`/images/projects/${project.slug}/${project.image}`}
                alt={project.title}
                width={1600}
                height={1000}
                sizes="(max-width: 720px) 92vw, 1120px"
                className="aspect-[16/9] h-full w-full object-cover"
                priority
              />
            </Link>

            <div className="mt-8 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
              <div>
                <h2 className="m-0 text-[1.75rem] font-semibold leading-tight">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="no-underline"
                  >
                    {project.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-[880px] text-[1.16rem] leading-[1.5] text-sand-11">
                  {project.description}
                </p>
              </div>
              <time
                dateTime={project.year}
                className="text-[1.1rem] font-semibold text-sand-9 md:pt-1"
              >
                {format(parseISO(project.year), 'MMMM, yyyy')}
              </time>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
