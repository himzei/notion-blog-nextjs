import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
    ],
  },
  // next-mdx-remote를 사용하므로 @next/mdx 설정 제거
  experimental: {
    mdxRs: false,
  },
};

export default nextConfig;
