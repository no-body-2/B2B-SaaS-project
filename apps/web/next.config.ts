import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: path.resolve(__dirname, "../../"),
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "web.luminano.xyz",
          },
        ],
        destination: "https://www.luminano.xyz/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "luminano.xyz",
          },
        ],
        destination: "https://www.luminano.xyz/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
