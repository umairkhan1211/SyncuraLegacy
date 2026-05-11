/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
  images: {
    domains: ["placehold.co"],

  },
    eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
