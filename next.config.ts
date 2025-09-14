import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.APP_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  compress: true,
  images: {
    remotePatterns: [
      {
        hostname: 'img.icons8.com',
        protocol: 'https'
      },
      {
        hostname: 'inicinemas.com',
        protocol: 'https'
      },
      {
        hostname: 'image.tmdb.org',
        protocol: 'https'
      },
      {
        hostname: 'd346azgjfhsciq.cloudfront.net',
        protocol: 'https'
      },
      {
        hostname: 'ia.media-imdb.com',
        protocol: 'https'
      }
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    unoptimized: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
