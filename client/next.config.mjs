/** @type {import('next').NextConfig} */
const nextConfig = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;

    return config;
  },
  experimental: {
    externalDir: true,
  },
};
export default nextConfig;
