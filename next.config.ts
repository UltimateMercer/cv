import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withContentlayer } from "next-contentlayer2";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
  /* config options here */
};

export default withNextIntl(withContentlayer(nextConfig));
