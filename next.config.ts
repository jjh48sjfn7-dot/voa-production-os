import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cap optimizer widths so 12MP venue PNGs stay under the ~50MB decode limit.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
  },
};

export default nextConfig;
