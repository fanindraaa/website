import '../styles/base.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '../components/footer';
import HeaderTime from '../components/header-time';
import ClickSpark from '../components/clickspark';

export const metadata: Metadata = {
  title: {
    default: 'Fanindra Maharana',
    template: '%s · Fanindra',
  },
  description: 'Product Designer',
  icons: {
    icon: [
      {
        url: '/light.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/dark.svg',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
  openGraph: {
    title: 'Fanindra Maharana',
    description: 'Product Designer',
    url: `https://fanindra.me`,
    siteName: 'Fanindra Maharana',
    locale: 'en-US',
    type: 'website',
    images: '/og.jpg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="antialiased text-sand-12 bg-sand-1 text-[14px] selection:bg-[#00FF5E] selection:text-black min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-4">
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="f276e1ed-f3c3-4560-aa5c-53e7cf03f6fb"
        ></script>
        <ClickSpark
          sparkColor="#000000"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          {/* Top Header Bar across all pages */}
          <header className="w-full flex items-center justify-between py-2 mb-6">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center text-sand-12 font-semibold no-underline hover:opacity-70 transition-opacity"
            >
              FM
            </Link>
            <HeaderTime />
          </header>

          <main className="transition-fade w-full flex-1">
            {children}
          </main>

          <Footer />
        </ClickSpark>
      </body>
    </html>
  );
}
