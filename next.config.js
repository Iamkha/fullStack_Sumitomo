/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.externals.push("canvas");
    return config;
  },
  experimental: {
    appDir: true,
  },
  fakeWorker: false,
  env: {
    apiUrl: "http://localhost:3000/",
  },
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
