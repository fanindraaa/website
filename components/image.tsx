import NextImage, { type ImageProps } from 'next/image';
import clsx from 'clsx';

type MdxImageProps = Omit<
  ImageProps,
  'src' | 'alt' | 'width' | 'height' | 'sizes' | 'className'
> & {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  className?: string;
  sizes?: string;
};

export default function Image({
  src,
  width,
  height,
  alt,
  caption,
  className,
  sizes = '(max-width: 840px) 100vw, 840px',
  ...props
}: MdxImageProps) {
  return (
    <figure className="case-study-image flex w-full flex-col gap-3">
      <NextImage
        src={src}
        width={width}
        height={height}
        alt={alt}
        sizes={sizes}
        className={clsx(
          'h-auto w-full rounded-xl border border-sand-4 bg-sand-2 shadow-none',
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
