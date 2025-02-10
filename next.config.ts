import type { NextConfig } from "next";
import withSvgr from 'next-svgr';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  output: 'export',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/addresses',
        permanent: false,
      },
    ];
  },
};

export default withSvgr(nextConfig);
