/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
  images: {
    domains: ['cdn.sanity.io'],
  },
};

module.exports = nextConfig;
