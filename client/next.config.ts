import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    PRIVATE_GIPHY_API: process.env.PRIVATE_GIPHY_API,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol:'https',
        hostname: "*"
      }
    ]
  },
  devIndicators: {
    appIsrStatus:true,
    buildActivity: true,
    buildActivityPosition: "bottom-right"

  }
};
export default nextConfig