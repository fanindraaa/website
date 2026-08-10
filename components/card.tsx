import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  year: string;
  link: string;
}

const Card: React.FC<Props> = ({
  title,
  imageSrc,
  imageAlt,
  description,
  year,
  link,
}) => {
  return (
    <div className="mb-12 border-b border-sand-6 last:border-transparent last:mb-0">
      <Link
        href={link}
        className="block bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)] mb-4 ring-[#008CFF] ring-offset-2 focus-visible:ring-2"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          className="select-none"
          width={1500}
          height={1500}
          sizes="(max-width: 720px) 80vw, (max-width: 1080px) 50vw, 40vw"
          priority
        />
      </Link>

      <div className="flex flex-row justify-between mb-2">
        <h3 className='text-lg mt-0 font-semibold'>{title}</h3>
        <time>{year}</time>
      </div>

      <div className="flex flex-row justify-between mb-12">
      <p className="text-gray-500">{description}</p>
      
      <Link
          href={link}
          title={`Read case study -> ${title}`}
        >
          Read case study
        </Link>
      </div>

    </div>
  );
};

export default Card;
