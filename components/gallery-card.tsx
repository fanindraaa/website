import Image from 'next/image';
import Link from 'next/link';

export interface GalleryCardProps {
  image: string;
  name: string;
  year: string;
  description: string;
  href?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export default function GalleryCard({
  image,
  name,
  year,
  description,
  href,
  aspectRatio = 'aspect-[16/10]',
  priority = false,
}: GalleryCardProps) {
  const isVideoOrDark = name.toLowerCase().includes('metalab');

  const cardContent = (
    <div className="group flex flex-col w-full text-[14px]">
      <div className={`relative w-full ${aspectRatio} overflow-hidden rounded-none bg-[#eef0f2]`}>
        {isVideoOrDark ? (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            {/* Four-point star outline icon */}
            <svg
              className="w-12 h-12 text-white opacity-90 transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
        ) : (
          <Image
            src={image}
            alt={name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.015]"
          />
        )}
      </div>
      <div className="mt-2.5 flex items-baseline justify-between gap-4">
        <h3 className="font-semibold text-sand-12 text-[14px] leading-tight">
          {name}
        </h3>
        <span className="text-[13px] text-sand-9 shrink-0 font-normal">
          {year}
        </span>
      </div>
      <p className="mt-0.5 text-[13px] leading-relaxed text-sand-10 max-w-none">
        {description}
      </p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="no-underline block w-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
