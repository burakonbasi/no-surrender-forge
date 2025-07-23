/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@no-surrender/common'],
    images: {
      domains: ['localhost'],
    },
  };
  
  module.exports = nextConfig;