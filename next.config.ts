import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
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
      }
    ]
  }
};

export default nextConfig;
