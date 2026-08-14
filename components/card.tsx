import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  year: string;
  link: string;
  priority?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  imageSrc,
  imageAlt,
  description,
  year,
  link,
  priority = false,
}) => {
  return (
    <article className="group mb-16 md:mb-20 last:mb-0">
      <Link
        href={link}
        className="block overflow-hidden rounded-xl border border-sand-4 bg-sand-2 no-underline transition-transform duration-200 hover:scale-[1.005] focus-visible:ring-2 focus-visible:ring-[#008CFF]"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1600}
          height={1000}
          priority={priority}
          sizes="(max-width: 720px) 92vw, 1120px"
          className="aspect-[16/9] h-full w-full object-cover select-none"
        />
      </Link>

      <div className="mt-8 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div>
          <h2 className="m-0 text-[1.75rem] font-semibold leading-tight">
            <Link
              href={link}
              className="no-underline hover:text-sand-11 transition-colors"
            >
              {title}
            </Link>
          </h2>
          <p className="mt-4 max-w-[880px] text-[1.16rem] leading-[1.5] text-sand-11">
            {description}
          </p>
        </div>
        <time className="text-[1.1rem] font-semibold text-sand-9 md:pt-1">
          {year}
        </time>
      </div>
    </article>
  );
};

export default Card;
