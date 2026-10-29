/** @type {import('next').NextConfig} */

//環境変数
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  /* config options here */
  output: "export",
  basePath: basePath,
  allowedDevOrigins: ["Rensyu2.local"],
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
      ignored: /node_modules/,
    };
    return config;
  },
};

export default nextConfig;
