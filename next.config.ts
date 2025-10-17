import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
   eslint: {
    // Permite compilar aunque haya errores o warnings de ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
