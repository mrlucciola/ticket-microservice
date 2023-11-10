/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: {
    watchOptions: {
      poll: 300,
    },
  },
  experimental: {
    externalDir: true,
  },
  output: "export", // Outputs a Single-Page Application (SPA)
  distDir: "./dist", // Changes the output directory `./dist/`
};
export default nextConfig;
