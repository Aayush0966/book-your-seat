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
      },
      {
        hostname: 'd346azgjfhsciq.cloudfront.net',
        protocol: 'https'
      },
      {
        hostname: 'ia.media-imdb.com',
        protocol: 'https'
      }
    ]
  }
};

export default nextConfig;
