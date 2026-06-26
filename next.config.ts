import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`
      }
    ]
  }
};

export default nextConfig;
