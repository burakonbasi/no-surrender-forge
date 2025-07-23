/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@no-surrender/common'],
    experimental: {
      serverComponentsExternalPackages: ['mongoose']
    }
  };
  
  module.exports = nextConfig;