import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/x6ec5hqm/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/muif2bou/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/tnvhh8yfa/public/**",
      },
    ],
  },
};

export default nextConfig;
