import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['fakestoreapi.com'], // Allow images from this domain
    // For future image providers
    // 'images.unsplash.com',
  },
};

export default nextConfig;
