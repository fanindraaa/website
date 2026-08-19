import Image from 'next/image';
import Link from 'next/link';

export interface GalleryCardProps {
  name: string;
  year: string;
  description: string;
  tags?: string | string[];
  images?: string[];
  media?: string[];
  linkText?: string;
  linkUrl?: string;
  priority?: boolean;
}

const isVideo = (url: string) => {
  const videoExtensions = ['.webm', '.mp4', '.ogg', '.mov', '.m4v'];
  const cleanUrl = url.split('?')[0].toLowerCase();
  return videoExtensions.some((ext) => cleanUrl.endsWith(ext));
};

const isGif = (url: string) => {
  const cleanUrl = url.split('?')[0].toLowerCase();
  return cleanUrl.endsWith('.gif');
};

export default function GalleryCard({
  name,
  year,
  description,
  tags,
  images = [],
  media,
  linkText,
  linkUrl,
  priority = false,
}: GalleryCardProps) {
  const items = media && media.length > 0 ? media : images;

  const tagList = Array.isArray(tags)
    ? tags.map((t) => t.trim()).filter(Boolean)
    : typeof tags === 'string' && tags.trim().length > 0
    ? tags.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <article className="group flex flex-col w-full text-[14px]">
      {/* Name, Year, Description & Link */}
      <div className="flex flex-col gap-1.5 mb-3.5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-semibold text-sand-12 text-[15px] sm:text-[16px] leading-tight m-0">
            {name}
          </h3>
          <span className="text-[13px] text-sand-9 shrink-0 font-normal">
            {year}
          </span>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-between md:items-center gap-y-1 text-[13.5px] leading-relaxed">
          <span className="text-sand-11 max-w-[640px]">{description}</span>
          {linkText && (
            linkUrl ? (
              <a
                href={linkUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-0.5 text-sand-12 font-medium hover:underline shrink-0"
              >
                <span>{linkText}</span>
                <span className="text-sand-9 text-[12px]">↗</span>
              </a>
            ) : (
              <span className="text-black text-[12.5px]">
                ({linkText})
              </span>
            )
          )}
        </div>

        {tagList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tagList.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-[11.5px] font-medium bg-sand-3 text-sand-11 border border-sand-4/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Horizontal Gallery View */}
      <div className="relative w-full">
        <div className="flex w-full gap-3 sm:gap-4 overflow-x-auto pb-1 pt-0.5 no-scrollbar snap-x snap-mandatory focus:outline-none rounded-xl">
          {items.map((item, idx) => {
            const isVid = isVideo(item);
            const unoptimized = isGif(item);

            return (
              <div
                key={idx}
                className="relative flex-none h-[200px] sm:h-[450px] w-auto overflow-hidden rounded-xl bg-sand-2 border border-sand-4/80 snap-start shadow-sm transition-all duration-300 hover:border-sand-6 group/img"
              >
                {isVid ? (
                  <video
                    src={item}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-auto object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.02]"
                  />
                ) : (
                  <Image
                    src={item}
                    alt={`${name} preview ${idx + 1}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority={priority && idx === 0}
                    unoptimized={unoptimized}
                    style={{ width: 'auto', height: '100%' }}
                    className="h-full w-auto object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.02]"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}


