const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@no-surrender/common'],
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.resolve.alias['@no-surrender/common'] = path.resolve(__dirname, '../../packages/common');
    return config;
  },
};

module.exports = nextConfig;