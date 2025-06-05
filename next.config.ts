import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://gureuso.s3.ap-northeast-2.amazonaws.com/**')],
  },
};

export default nextConfig;
