'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Navbar() {
  const currentRoute = usePathname();

  if (currentRoute?.startsWith('/projects/')) {
    return null;
  }

  const items = [
    {
      title: 'Work',
      href: '/',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Playground',
      href: '/playground',
    },
    {
      title: 'Contact',
      href: 'mailto:imfanindra@gmail.com',
    },
  ];

  return (
    <nav className="fixed left-0 right-0 top-8 z-50 flex justify-center px-4 py-4 select-none">
      <div className="flex rounded-full border border-sand-4 bg-white/90 px-5 py-5 shadow-[0_10px_28px_rgba(0,0,0,0.08)] backdrop-blur">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={clsx(
              'px-3 text-[0.95rem] font-semibold leading-none text-sand-12 no-underline md:px-4',
              currentRoute === item.href && 'text-sand-12'
            )}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
