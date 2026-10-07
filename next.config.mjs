/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: ['Rensyu2.local'],
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