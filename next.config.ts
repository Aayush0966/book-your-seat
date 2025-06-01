import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    nodeMiddleware: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  swcMinify: true,
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
  },
  async headers() {
    return [
      {
        source: '/(.*)',
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
