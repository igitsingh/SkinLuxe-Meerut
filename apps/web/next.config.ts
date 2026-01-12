import type { NextConfig } from "next";

// Trigger rebuild

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/hydrafacial',
        destination: '/treatments/hydrafacial',
        permanent: true,
      },
      {
        source: '/chemical-peels',
        destination: '/treatments/chemical-peels',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
