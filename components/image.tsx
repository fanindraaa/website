import NextImage, { ImageProps } from 'next/image';
import clsx from 'clsx';

export default function Image({
  src,
  width,
  height,
  alt,
  caption,
  className,
  ...props
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
} & ImageProps) {
  return (
    <figure className="case-study-image flex w-full flex-col gap-3">
      <NextImage
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={clsx(
          'w-full rounded-xl border border-sand-4 bg-sand-2 object-cover shadow-none',
          className
        )}
        {...props}
      />
      {caption && caption.length > 0 && (
        <figcaption className="text-center text-[.875rem] text-sand-9">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
