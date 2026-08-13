import '../styles/base.css';
import type { Metadata } from 'next';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ClickSpark from '../components/clickspark';

export const metadata: Metadata = {
  title: {
    default: 'Fanindra Maharana',
    template: '%s · Fanindra',
  },
  description: 'Product Designer',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Fanindra Maharana',
    description: 'Product Designer',
    url: `https://fanindra.me`,
    siteName: 'Fanindra Maharana',
    locale: 'en-US',
    type: 'website',
    images: "/og.jpg",
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
      <body className="antialiased text-sand-12 bg-sand-1 text-[1rem] font-medium selection:bg-[#FFFF05] selection:text-[#000000] min-h-full flex flex-col">
        <script defer src="https://cloud.umami.is/script.js" data-website-id="f276e1ed-f3c3-4560-aa5c-53e7cf03f6fb"></script>
        <ClickSpark
          sparkColor="#000000"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <Navbar />

          <main className="transition-fade pt-12 md:pt-20 h-auto px-4 mb-auto lg:px-8 grid grid-cols-8 sm:grid-cols-16 gap-4 lg:gap-8">
            {children}
          </main>

          <Footer />
        </ClickSpark>
      </body>
    </html>
  );
}
