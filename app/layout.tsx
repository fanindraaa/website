import '../styles/base.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '../components/footer';
import HeaderTime from '../components/header-time';
import ClickSpark from '../components/clickspark';

export const metadata: Metadata = {
  metadataBase: new URL('https://fanindra.me'),
  title: {
    default: 'Fanindra Maharana · Product Designer',
    template: '%s · Fanindra Maharana',
  },
  description:
    "Fanindra Maharana is a Product Designer based in India, currently working at Rapido on Hopr. He’s obsessed with building consumer products, crafting thoughtful experiences, and solving complex problems in fast-paced environments.",
  keywords: [
    'Fanindra Maharana',
    'Product Designer',
    'UX Designer',
    'UI Designer',
    'Portfolio',
    'Hopr',
    'Cardtree',
    'Interaction Design',
  ],
  authors: [{ name: 'Fanindra Maharana', url: 'https://fanindra.me' }],
  creator: 'Fanindra Maharana',
  alternates: {
    canonical: '/',
  },
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
    apple: '/light.svg',
  },
  openGraph: {
    title: 'Fanindra Maharana · Product Designer',
    description:
      "Fanindra Maharana is a Product Designer based in India, currently working at Rapido on Hopr. He’s obsessed with building consumer products, crafting thoughtful experiences, and solving complex problems in fast-paced environments.",
    url: 'https://fanindra.me',
    siteName: 'Fanindra Maharana',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Fanindra Maharana · Product Designer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fanindra Maharana · Product Designer',
    description:
      "Fanindra Maharana is a Product Designer based in India, currently working at Rapido on Hopr. He’s obsessed with building consumer products, crafting thoughtful experiences, and solving complex problems in fast-paced environments.",
    creator: '@fanindraaa',
    images: ['/og.jpg'],
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
