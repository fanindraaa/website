import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/playground',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
