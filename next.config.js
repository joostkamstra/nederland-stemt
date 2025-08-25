/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable strict mode for development issues
  reactStrictMode: false,

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable x-powered-by header
  poweredByHeader: false,

  // Simple image config
  images: {
    domains: [],
  },
};

module.exports = nextConfig;