'use client';

export default function Footer() {
  const links = [
    {
      name: 'Twitter',
      url: 'http://x.com/fanindraaa',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/fanindra-m/',
    },
    {
      name: 'Behance',
      url: 'https://www.behance.net/fanindra',
    },
    {
      name: 'Resume',
      url: '/resume.pdf',
    },
  ];

  return (
    <footer className="mx-auto mt-10 flex w-full max-w-[1120px] flex-col gap-8 pb-10 text-[0.95rem] font-semibold md:flex-row md:items-center md:justify-between">
      <p>&copy;{new Date().getFullYear()} - Fanindra Maharana</p>
      <nav aria-label="Social links" className="flex flex-wrap gap-7">
        {links.map((link) => (
          <a href={link.url} key={link.name} target="_blank" rel="noreferrer">
            {link.name}
          </a>
        ))}
      </nav>
    </footer>
  );
}
