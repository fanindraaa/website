import HeaderTime from '@/components/header-time';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-4">
      {/* Top Header Bar across portfolio pages */}
      <header className="w-full flex items-center justify-between py-2 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center text-sand-12 font-bold no-underline hover:opacity-70 transition-opacity"
          >
            FM
          </Link>
        </div>
        <HeaderTime />
      </header>

      <main className="transition-fade w-full flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
