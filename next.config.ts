import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        hostname: 'img.icons8.com',
        protocol: 'https'
      }
    ]
  }
};

export default nextConfig;
